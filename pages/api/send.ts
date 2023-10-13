import { OpenAIStream } from "@/utils";
import { kv } from "@vercel/kv";
import { Mutex } from "async-mutex";
import twilio from "twilio";
import { sql } from "@vercel/postgres";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

interface TwilioMessage {
  sid: string;
  // Add other properties as needed
}


export const config = {
  runtime: "edge"
};
const emailMutex = new Mutex();


function getMessageForTemplateName(templateName: string): string {
  const templates: Record<string, string> = {
    bhagavad_gita_chapter_1_verse_1: `Bhagavad Gita Chapter 1, Verse 1 sets the stage for the epic conversation between Lord Krishna and Arjuna on the battlefield of Kurukshetra. Dhritarashtra, the blind king, asks his charioteer Sanjaya about the events on the battlefield. He wants to know what his sons, the Kauravas, and the Pandavas, the sons of Pandu, are doing as they prepare for battle. This verse serves as an introduction to the subsequent chapters where Lord Krishna imparts wisdom and guidance to Arjuna, who is torn by moral dilemmas. The dialogue between Lord Krishna and Arjuna forms the essence of the Bhagavad Gita, offering insights into life, duty, righteousness, and spirituality.

    धृतराष्ट्र उवाच |
    धर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः |
    मामकाः पाण्डवाश्चैव किमकुर्वत सञ्जय ||
    
    Transliteration:
    Dhritarashtra Uvacha |
    Dharmakshetre Kurukshetre Samaveta Yuyutsavah |
    Mamakah Pandavaschaiva Kimakurvata Sanjaya ||
    `,
    bhagavad_gita_chapter_1_verse_2: "Bhagavad Gita Chapter 1, Verse 2 continues the conversation between Dhritarashtra and Sanjaya. Sanjaya informs Dhritarashtra that after seeing the Pandava army in battle formation, King Duryodhana approaches his teacher, Dronacharya, seeking guidance. This verse sets the stage for the subsequent events in the Bhagavad Gita, where Duryodhana's actions and mindset are contrasted with Arjuna's dilemma and Lord Krishna's teachings on duty, righteousness, and the path to spiritual enlightenment.\n\nसञ्जय उवाच |\nदृष्ट्वा तु पाण्डवानीकं व्यूढं दुर्योधनस्तदा |\nआचार्यमुपसङगम्य राजा वचनमब्रवीत् ||\nTransliteration:\nSanjaya Uvacha |\nDrishtva tu Pandavanikam vyudham Duryodhanas tada |\nAcharyam upasangamya raja vachanamabravit ||",
    bhagavad_gita_chapter_1_verse_3: "Bhagavad Gita Chapter 1, Verse 3:\n\nIn this verse, Duryodhana addresses his teacher, Dronacharya, and draws attention to the mighty army of the Pandavas, led by their intelligent disciple, Dhrishtadyumna, the son of Drupada. Duryodhana acknowledges the strength and organization of the Pandava army, highlighting their formidable presence on the battlefield.\n\nThis verse sets the stage for the subsequent chapters, where the dialogue between Lord Krishna and Arjuna unfolds, delving into profound philosophical and spiritual teachings. The Bhagavad Gita explores various aspects of life, duty, righteousness, and the path to self-realization.\n\nपश्यैतां पाण्डुपुत्राणामाचार्य महतीं चमूम् |\nव्यूढां द्रुपदपुत्रेण तव शिष्येण धीमता ||\nTransliteration:\nPashyaitam Pandu-putranam Acharya mahatim chamoom |\nVyudham drupada-putrena tava shishyena dheemata ||",
    ganapati_welcome: "🙏 Om Gam Ganapataye Namaha 🐘\n\nOn this auspicious day, let us begin our journey by offering our heartfelt prayers to Lord Ganapati, the remover of obstacles and the embodiment of wisdom. May his divine presence guide us on this path of exploration and discovery. 🙏\n\nLet's dive into the ocean of knowledge and wisdom that Sanatana Dharma offers. From the Vedas to the Bhagavad Gita, yoga to meditation, there is much to explore.\n\nRemember the power of sacred mantras. One such mantra is \"ॐ गं गणपतये नमः\" (Om Gam Ganapataye Namaha). Chant it with devotion to seek Lord Ganapati's blessings and overcome challenges.\n\nHave questions about dharma, rituals, yoga, or anything related to Sanatana Dharma? Ask SanatanaDharma.xyz chatbot for guidance.\n\nEmbrace this journey with an open mind. May it bring us closer to our true selves and lead us to a life filled with purpose, peace, and spiritual growth.",
    reply_first_message: "Namaste 🙏 Welcome to the sacred journey with SanatanaDharma.xyz. You're now subscribed to receive one verse a day from the Bhagavad Gita, Vedas, Upanishads. Let the transformation begin! Please reply with \"yes\" or \"subscribe\" to receive daily messages.",
    namaste_with_book_intro: "Welcome to the enlightening journey! You're now subscribed to receive one verse a day from the Bhagavad Gita, Vedas, Upanishads. Let the transformation begin! 🙏📖✨",
    namaste_first_message: "Namaste 🙏 Welcome to the sacred journey with SanatanaDharma.xyz. You're now subscribed to receive one verse a day from the Bhagavad Gita, Vedas, Upanishads. Let the transformation begin!",
    first_message_on_subscription: "Welcome to the enlightening journey! You're now subscribed with SanatanaDharma.xyz to receive one verse a day from the Bhagavad Gita, Vedas, Upanishads. Let the transformation begin!"
  };

  return templates[templateName] || "Template not found.";
}

async function sendWhatsappMessage(template:string, email:string) {
  try {
    const message = getMessageForTemplateName(template);
    const formData = new FormData();
    formData.append('From', "whatsapp:+13074486824");
    formData.append('To', "whatsapp:" + email);
    formData.append('Body', message);
    
    const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${Buffer.from(`${accountSid}:${authToken}`).toString('base64')}`,
      },
      body: formData,
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log("data is:");
      console.log(data);
      console.log("test 3");

      const isEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);
      let insertQuery;
      console.log("test 4");

      if(isEmail) {
        console.log("test 5");
        insertQuery = sql`
        INSERT INTO subscriber (email, lastSentMessage, lastSentTemplate)
        VALUES (${email}, ${message}, ${template})
        RETURNING id;
      `;
      } else {
        console.log("test 6");
        insertQuery = sql`
        INSERT INTO subscriber (phoneNumber, lastSentMessage, lastSentTemplate)
        VALUES (${email}, ${message}, ${template})
        RETURNING id;
      `;
      }
      console.log("test 7");
      const { rows } = await insertQuery;
      console.log("test 8");
      const insertedSubscriberId = rows[0].id;
      console.log("test 9");
      console.log("subscriber id:"+ insertedSubscriberId);
    } else {
      console.error("Fetch request failed with status " + response.status);
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
}


const handler = async (req: Request): Promise<Response> => {
  try {
    // Get query parameters from the request
    const params = new URL(req.url).searchParams;
    const template = params.get('template');
    const phone = params.get('phone');

    if (!template || !phone) {
      return new Response("Missing required parameters", { status: 400 });
    }

    console.log("test 1");

    await sendWhatsappMessage(template, phone);

    console.log("Sent!");

    return new Response("Sent!!!");
  } catch (error) {
    console.error(error);
    return new Response("Error", { status: 500 });
  }
};

export default handler;
