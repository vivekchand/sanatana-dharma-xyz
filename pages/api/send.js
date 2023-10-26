import { sql } from "@vercel/postgres";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;


export const config = {
  runtime: "edge"
};

function getMessageForTemplateName(templateName) {
  const templates = {
    bhagavad_gita_chapter_1_verse_1: `Bhagavad Gita Chapter 1, Verse 1 sets the stage for the epic conversation between Lord Krishna and Arjuna on the battlefield of Kurukshetra. Dhritarashtra, the blind king, asks his charioteer Sanjaya about the events on the battlefield. He wants to know what his sons, the Kauravas, and the Pandavas, the sons of Pandu, are doing as they prepare for battle. This verse serves as an introduction to the subsequent chapters where Lord Krishna imparts wisdom and guidance to Arjuna, who is torn by moral dilemmas. The dialogue between Lord Krishna and Arjuna forms the essence of the Bhagavad Gita, offering insights into life, duty, righteousness, and spirituality.

धृतराष्ट्र उवाच |
धर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः |
मामकाः पाण्डवाश्चैव किमकुर्वत सञ्जय ||
    
Transliteration:
Dhritarashtra Uvacha |
Dharmakshetre Kurukshetre Samaveta Yuyutsavah |
Mamakah Pandavaschaiva Kimakurvata Sanjaya ||`,
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

async function sendWhatsappMessage(template, phone) {
  try {
    const message = getMessageForTemplateName(template);
    console.log("inside sendWhatsappMessage");
    console.log(phone);
    console.log(template);
    console.log(message);
    const formData = new FormData();
    formData.append('From', "whatsapp:+13074486824");
    formData.append('To', "whatsapp:" + phone);
    formData.append('Body', message);
    
    // const response = client.messages
    //   .create({
    //      from: 'whatsapp:+13074486824',
    //      body: message,
    //      to: 'whatsapp:+'+phone
    //    })
    //   .then(message => console.log(message.sid));

    console.log(response);
    // const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`, {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Basic ${Buffer.from(`${accountSid}:${authToken}`).toString('base64')}`,
    //   },
    //   body: formData,
    // });

    const response = await fetch(`https://nest.messagebird.com/workspaces/e911edd7-3d66-48b4-9230-01bb55168b90/channels/d1a947d3-9330-427d-a686-17c0203101fe/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `AccessKey a6fnhhjJNFZFWUmtfgn8jo7Ie6l0wzvXhKQQ`,
      },
      body: {
          "receiver": {
            "contacts": [
              {
                "identifierValue": "+31622429582",
                "identifierKey": "phonenumber"
              }
            ]
          },
          "template": {
            "projectId": "7b3f9b21-a814-43c1-8d87-947fba583307",
            "version": "3957de57-4dab-462d-abf7-cd54bb6465bd",
            "locale": "en"
          }
        },
    });

    if (response.ok) {
      const data = await response.json();
      console.log("data is:");
      console.log(data);
      console.log("test 3");

      const isEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(phone);
      let insertQuery;
      console.log("test 4");

      if(isEmail) {
        console.log("test 5");
        insertQuery = sql`
        INSERT INTO subscriber (email, lastSentTemplate)
        VALUES (${phone}, ${template})
        ON CONFLICT (email) DO UPDATE
        SET lastSentTemplate = ${template}
        RETURNING id;
      `;
      } else {
        console.log("test 6");
        insertQuery = sql`
        INSERT INTO subscriber (phoneNumber, lastSentTemplate)
        VALUES (${phone},  ${template})
        ON CONFLICT (phoneNumber) DO UPDATE
        SET lastSentTemplate = ${template}
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
      console.error(response.body);
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
}


const handler = async (req, res) => {
  try {
    // Get query parameters from the request
    const phone = req.query.phone;
    const template = req.query.template;
    console.log("phone param: "+phone);
    console.log("template param: "+template);

    console.log("test 1");

    await sendWhatsappMessage(template, phone);

    console.log("Sent!");

    return res.status(200).send("Sent!!!");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error!!!");
  }
};

export default handler;
