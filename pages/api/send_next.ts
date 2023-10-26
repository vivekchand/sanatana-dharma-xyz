import { sql } from "@vercel/postgres";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

export const config = {
  runtime: "edge"
};

type TemplateInfo = {
  projectId: string;
  version: string;
};

const templateMap: Record<string, TemplateInfo> = {
  "namaste_first_message": {
    projectId: "5a496bd4-da99-4720-a2d6-267920df8562",
    version: "2b1b6682-e93c-4eb1-abe8-a8de08e307ee",
  },
  "ganapati_welcome": {
    projectId: "9a4267f2-c83d-4ccb-b320-e003c6ab809a",
    version: "0ab86a8a-05d0-4b2d-9568-d83ed2a8c41f",
  },
  "bhagavad_gita_chapter_1_verse_1": {
    projectId: "3c464709-c611-4ef0-b0cc-046cd4382bfe",
    version: "8ffc55f5-d654-4180-a01d-7436395197aa",
  },
  "bhagavad_gita_chapter_1_verse_2": {
    projectId: "50b10d35-a0ae-4254-9cb5-43d143344434",
    version: "8fe7f144-00f8-4521-8b77-25384014e1df",
  },
  "bhagavad_gita_chapter_1_verse_3": {
    projectId: "ca561c36-5292-4800-bc5a-d354430a422c",
    version: "93c32a85-ce8d-4026-b250-80b96e4e150e",
  },
  "bhagavad_gita_chapter_1_verse_4": {
    projectId: "a62d505c-f849-4829-bbe1-e2263b0ba442",
    version: "b5335128-3201-4402-9b46-399b64951f62",
  },
  "bhagavad_gita_chapter_1_verse_5": {
    projectId: "622ae003-369c-4ab9-8fe1-c5645f705f9b",
    version: "debb5003-5ed0-44da-9426-ef0072917fc0",
  },
  "bhagavad_gita_chapter_1_verse_6": {
    projectId: "e1ab1d3f-1904-476e-8ae6-cd5d3f9b121c",
    version: "97dbccba-fa46-466f-8987-1092e194047e",
  },
  "bhagavad_gita_chapter_1_verse_7": {
    projectId: "f10eb775-b8ea-4d53-bead-98172a0caa41",
    version: "3c0deb9d-b329-4efb-8fbb-fbf1df41ffdc",
  },
  "bhagavad_gita_chapter_1_verse_8": {
    projectId: "5bd19aff-e328-4f33-8193-9a2c7095a39e",
    version: "0f49131d-3dda-43f0-9247-cd41c1f92519",
  },
  "bhagavad_gita_chapter_1_verse_9": {
    projectId: "4da9396d-8b80-438a-9a8b-9d5400dd0814",
    version: "7205fdb9-56b6-47b8-9ab4-bc40eae1273a",
  },
  "bhagavad_gita_chapter_1_verse_10": {
    projectId: "d46f6d66-b59f-40de-b038-c8ae041604a0",
    version: "a23522ca-c88a-4c7b-8859-191648dd365e",
  },
  "bhagavad_gita_chapter_1_verse_11": {
    projectId: "0492435f-060d-4fbf-a2ef-3ad3c1624b4f",
    version: "f1c0e625-996a-4021-8acb-08356ccf8430",
  },
  "bhagavad_gita_chapter_1_verse_12": {
    projectId: "43e4d80d-9f61-4320-862b-a0e6097b68d0",
    version: "ea004c49-ac7e-403c-8751-c9983bb8077c",
  },
  "bhagavad_gita_chapter_1_verse_13": {
    projectId: "c4d4ca51-df46-425a-b9e3-8c7b960f0af8",
    version: "cc987a1c-a846-4e03-a96a-80de400e2c5b",
  },
  "bhagavad_gita_chapter_1_verse_14": {
    projectId: "2a210fe5-1ad5-43db-bd9c-0a73e3f27612",
    version: "093b98f2-4800-461c-8fb3-b724ae141803",
  },
  "bhagavad_gita_chapter_1_verse_15": {
    projectId: "69fc9f7a-1cd5-4932-8117-a429f188362a",
    version: "529f3307-ac0e-4dd2-b153-360a5efd050f",
  },
  "bhagavad_gita_chapter_1_verse_16": {
    projectId: "6efb321f-ad3c-4b88-9480-536637b6d2d1",
    version: "a584eb4f-2a8d-4f4e-9a58-550f75a71a90",
  },
  "bhagavad_gita_chapter_1_verse_17": {
    projectId: "892d9945-5c0f-41a1-b2d9-397dea7c960d",
    version: "3e18d4b3-c533-4e16-8f04-9b389e48b30e",
  },
  "bhagavad_gita_chapter_1_verse_18": {
    projectId: "a5dd8a89-583b-47a5-ac66-00a656ffab0f",
    version: "40f411c9-eff9-4c18-86e7-8fd39bd4a77d",
  },
  "bhagavad_gita_chapter_1_verse_19": {
    projectId: "049fca2c-bb90-45b3-8da5-2322ae3445e8",
    version: "a7f90b28-1a30-46d1-8fb1-c333a440619b",
  },
  "bhagavad_gita_chapter_1_verse_20": {
    projectId: "5c3d08d8-61e9-4dd3-8397-48267ac7d1b9",
    version: "aa86a5fd-d604-4c02-8307-4eb3e63472e7",
  },
  "bhagavad_gita_chapter_1_verse_21": {
    projectId: "d6dfcb0c-25f1-4eba-8a43-1c28f9cf6e8d",
    version: "534a4882-b6fe-4e04-a151-dc8a1c3c57a8",
  },
  "bhagavad_gita_chapter_1_verse_22": {
    projectId: "bdd67783-efd3-4b9a-a0ec-7495402c3a13",
    version: "035a90d3-a5fa-4d2a-b052-a777bd72142f",
  },
  "bhagavad_gita_chapter_1_verse_23": {
    projectId: "d4cad5bb-cdd2-48c2-902d-218d18887e8e",
    version: "03d1afc7-c6fa-4693-b009-4890f192ab02",
  },
  "bhagavad_gita_chapter_1_verse_24": {
    projectId: "7b3f9b21-a814-43c1-8d87-947fba583307",
    version: "3957de57-4dab-462d-abf7-cd54bb6465bd",
  },
};

function getMessageForTemplateName(templateName: string): string {
  const templates: Record<string, string> = {
    bhagavad_gita_chapter_1_verse_1: `Bhagavad Gita Chapter 1, Verse 1 sets the stage for the epic conversation between Lord Krishna and Arjuna on the battlefield of Kurukshetra. Dhritarashtra, the blind king, asks his charioteer Sanjaya about the events on the battlefield. He wants to know what his sons, the Kauravas, and the Pandavas, the sons of Pandu, are doing as they prepare for battle. This verse serves as an introduction to the subsequent chapters where Lord Krishna imparts wisdom and guidance to Arjuna, who is torn by moral dilemmas. The dialogue between Lord Krishna and Arjuna forms the essence of the Bhagavad Gita, offering insights into life, duty, righteousness, and spirituality.

धृतराष्ट्र उवाच |
धर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः |
मामकाः पाण्डवाश्चैव किमकुर्वत सञ्जय ||
    
Transliteration:
Dhritarashtra Uvacha |
Dharmakshetre Kurukshetre Samaveta Yuyutsavah |
Mamakah Pandavaschaiva Kimakurvata Sanjaya ||`,
    bhagavad_gita_chapter_1_verse_2: `Bhagavad Gita Chapter 1, Verse 2 continues the conversation between Dhritarashtra and Sanjaya. Sanjaya informs Dhritarashtra that after seeing the Pandava army in battle formation, King Duryodhana approaches his teacher, Dronacharya, seeking guidance. This verse sets the stage for the subsequent events in the Bhagavad Gita, where Duryodhana's actions and mindset are contrasted with Arjuna's dilemma and Lord Krishna's teachings on duty, righteousness, and the path to spiritual enlightenment.

सञ्जय उवाच |
दृष्ट्वा तु पाण्डवानीकं व्यूढं दुर्योधनस्तदा |
आचार्यमुपसङ्गम्य राजा वचनमब्रवीत् ||
    
Transliteration:
Sanjaya Uvacha |
Drishtva tu Pandavanikam vyudham Duryodhanas tada |
Acharyam upasangamya raja vachanamabravit ||`,
    bhagavad_gita_chapter_1_verse_3: `Bhagavad Gita Chapter 1, Verse 3:  

In this verse, Duryodhana addresses his teacher, Dronacharya, and draws attention to the mighty army of the Pandavas, led by their intelligent disciple, Dhrishtadyumna, the son of Drupada. Duryodhana acknowledges the strength and organization of the Pandava army, highlighting their formidable presence on the battlefield.

This verse sets the stage for the subsequent chapters, where the dialogue between Lord Krishna and Arjuna unfolds, delving into profound philosophical and spiritual teachings. The Bhagavad Gita explores various aspects of life, duty, righteousness, and the path to self-realization.

पश्यैतां पाण्डुपुत्राणामाचार्य महतीं चमूम् |
व्यूढां द्रुपदपुत्रेण तव शिष्येण धीमता ||

Transliteration:
Pashyaitam Pandu-putranam Acharya mahatim chamoom |
Vyudham drupada-putrena tava shishyena dheemata ||

Have questions about dharma, rituals, yoga, or anything related to Sanatana Dharma? Ask SanatanaDharma.xyz chatbot for guidance.`,
    bhagavad_gita_chapter_1_verse_4: `Bhagavad Gita Chapter 1, Verse 4:

In this verse, Sanjaya describes the Pandava army, led by their valiant warriors, marching forward with great enthusiasm and determination. The army is divinely protected and compared to a great military formation. Dhrishtadyumna, the wise disciple of Dronacharya and son of King Drupada, leads the army.

This verse sets the stage for the epic battle between the Pandavas and the Kauravas. It highlights the strength and determination of the Pandava army, which plays a significant role in the subsequent teachings and discussions presented in the Bhagavad Gita.

पाण्डवानीकं दैवतेष्वतीव सेनं पाण्डुपुत्राणामाचार्य महतीं चमूम् |
व्यूढां द्रुपदपुत्रेण तव शिष्येण धीमता ||

Transliteration:
Pandavanikam daivateshvati va senam Panduputranam acharya mahatim chamum |
Vyudham drupadaputrena tava shishyena dheemata ||`,
    bhagavad_gita_chapter_1_verse_3_tamil: `பகவத் கீதை அத்யாயம் 1, பாடம் 3:

இந்த பாடத்தில், துர்யோதனன் தன் ஆசார்யரான த்ரோணாசார்யருக்கு பேசி, பாண்டவர்களின் பலமும், அவர்களால் தரிசனம் செய்யப்படும் திரிஷ்டத்யும்னன் என்ற விவேகியான மடிப்பாளரான திருபதன் மகனான திரிஷ்டத்யும்னன் ஆகியோரை குறிப்பிடுகிறார். துர்யோதனன் பாண்டவர்களின் படையின் வலிமையையும், அவர்களின் அமைப்பையும் உணர்ந்து, அவர்களின் போர்வையை மிகுந்தமாக குறிப்பிடுகிறார்.

இந்த பாடம் பின்னர் வந்த அதிகாரங்களில், கிருஷ்ணா அர்ஜுனனுடன் நடக்கும் உரைப்பாட்டின் மூலம், ஆன்மீக மற்றும் தத்துவ பாடங்களைப் பற்றி ஆராய்ந்து கொண்டு வருகின்றது. பகவத் கீதை மனித வாழ்க்கையின் வேறுபாடுகள், கடமைகள்

पश्यैतां पाण्डुपुत्राणामाचार्य महतीं चमूम् |
व्यूढां द्रुपदपुत्रेण तव शिष्येण धीमता ||

Transliteration:
Pashyaitam Pandu-putranam Acharya mahatim chamoom |
Vyudham drupada-putrena tava shishyena dheemata ||`,
    bhagavad_gita_chapter_1_verse_4_tamil: `பகவத் கீதை அத்யாயம் 1, பாடம் 4:

இந்த பதிகம் சஞ்சயா பாண்டவ சேனையைக் குறிப்பிடுகிறார். அவர்கள் தைவத்தால் பாதுகாக்கப்பட்ட மஹாசேனையாக இருக்கின்றது. த்ரிஷ்டத்யும்னா, த்ரோணாசார்யரின் ஞானமான மட்டுமே அல்லது ராஜா த்ருபதன் மகனான த்ருபதபுத்ரனானவரால் இந்த சேனை தலைமையாக நடந்துகொள்ளுகின்றது.

पाण्डवानीकं दैवतेष्वतीव सेनं पाण्डुपुत्राणामाचार्य महतीं चमूम् |
व्यूढां द्रुपदपुत्रेण तव शिष्येण धीमता ||

ஒலிபெயர்ப்பு:
பாண்டவானீகம் தைவதேஷ்வதீவ சேனம் பாண்டுபுத்ராணாமாசார்ய மஹதீம் சமூம் |
வ்யூதாம் த்ருபதபுத்ரேண தவ சிஷ்யேண தீமதா ||`,
    bhagavad_gita_chapter_1_verse_5: `Bhagavad Gita Chapter 1, Verse 5

In this verse, Sanjaya describes the Pandava army, divinely protected and led by valiant warriors. The formation, called "Pandavanikam," is compared to a great army. Dhrishtadyumna, the wise disciple of Dronacharya and son of King Drupada, leads the army. This verse sets the stage for the epic battle between the Pandavas and Kauravas, highlighting the strength and determination of the Pandava army. It signifies the beginning of the moral dilemmas faced by Arjuna, leading to Lord Krishna's teachings in the subsequent chapters of the Bhagavad Gita.

पाण्डवानीकं दैवतेष्वतीव सेनं पाण्डुपुत्राणामाचार्य महतीं चमूम् |
व्यूढां द्रुपदपुत्रेण तव शिष्येण धीमता ||

Transliteration:
Pāṇḍavānīkaṁ daivateṣvatīva senaṁ pāṇḍuputrāṇām ācārya mahatīṁ chamūm |
Vyūḍhāṁ drupadaputreṇa tava śiṣyeṇa dhīmatā ||`,
    ganapati_welcome: `🙏 Om Gam Ganapataye Namaha 🐘
    
On this auspicious day, let us begin our journey by offering our heartfelt prayers to Lord Ganapati, the remover of obstacles and the embodiment of wisdom. May his divine presence guide us on this path of exploration and discovery. 🙏

Let's dive into the ocean of knowledge and wisdom that Sanatana Dharma offers. From the Vedas to the Bhagavad Gita, yoga to meditation, there is much to explore.

Remember the power of sacred mantras. One such mantra is \"ॐ गं गणपतये नमः\" (Om Gam Ganapataye Namaha). Chant it with devotion to seek Lord Ganapati's blessings and overcome challenges.

Have questions about dharma, rituals, yoga, or anything related to Sanatana Dharma? Ask SanatanaDharma.xyz chatbot for guidance.

Embrace this journey with an open mind. May it bring us closer to our true selves and lead us to a life filled with purpose, peace, and spiritual growth.`,
    reply_first_message: "Namaste 🙏 Welcome to the sacred journey with SanatanaDharma.xyz. You're now subscribed to receive one verse a day from the Bhagavad Gita, Vedas, Upanishads. Let the transformation begin! Please reply with \"yes\" or \"subscribe\" to receive daily messages.",
    namaste_with_book_intro: "Welcome to the enlightening journey! You're now subscribed to receive one verse a day from the Bhagavad Gita, Vedas, Upanishads. Let the transformation begin! 🙏📖✨",
    namaste_first_message: "Namaste 🙏 Welcome to the sacred journey with SanatanaDharma.xyz. You're now subscribed to receive one verse a day from the Bhagavad Gita, Vedas, Upanishads. Let the transformation begin!",
    first_message_on_subscription: "Welcome to the enlightening journey! You're now subscribed with SanatanaDharma.xyz to receive one verse a day from the Bhagavad Gita, Vedas, Upanishads. Let the transformation begin!",
    bhagavad_gita_chapter_1_verse_6	: `Bhagavad Gita Chapter 1, Verse 6:

युधामन्युश्च विक्रान्त उत्तमौजाश्च वीर्यवान्। 
सौभद्रो द्रौपदेयाश्च सर्व एव महारथाः।।1.6।।

saubhadro draupadeyāśhcha sarva eva mahā-rathāḥ

saubhadraḥ—the son of Subhadra; draupadeyāḥ—the sons of Draupadi; cha—and; sarve—all; eva—indeed; mahā-rathāḥ—warriors who could single handedly match the strength of ten thousand ordinary warriors

Translation:
The strong Yudhamanyu and the brave Uttamaujas, the son of Subhadra (Abhimanyu, the son of Subhadra and Arjuna), and the sons of Draupadi, all of them are great charioteers (great heroes).
`,
    bhagavad_gita_chapter_1_verse_7: `Bhagavad Gita Chapter 1 v7
अस्माकं तु विशिष्टा ये तान्निबोध द्विजोत्तम। 
नायका मम सैन्यस्य संज्ञार्थं तान्ब्रवीमि ते।

asmākaṁ tu viśhiṣhṭā ye tānnibodha dwijottama nāyakā 
mama sainyasya sanjñārthaṁ tānbravīmi te

In this verse, Sanjaya describes the actions of Dronacharya, the preeminent teacher and commander of the Kaurava army. Dronacharya is leading the Kaurava formation, which is compared to a mighty army formation, much like the one described in the previous verse for the Pandavas. He is being guided and supported by his wise disciple, Dhrishtadyumna, who is the son of King Drupada.

The verse highlights the pivotal role of Dronacharya as a teacher and commander. His expertise in warfare and his strategic skills are emphasized as he prepares the Kaurava forces for battle. The term "mātparaṁ" suggests that Dronacharya was dedicated to achieving the welfare and victory of the Kauravas. The verse serves to underscore the significance of the respective commanders and their roles in the impending conflict.
`,
    bhagavad_gita_chapter_1_verse_8: `Bhagavad Gita Chapter 1, Verse 8:

Verse (Sanskrit):
भवान्भीष्मश्च कर्णश्च कृपश्च समितिञ्जयः। 
अश्वत्थामा विकर्णश्च सौमदत्तिस्तथैव च।।1.8।।

bhavānbhīṣhmaśhcha karṇaśhcha kṛipaśhcha samitiñjayaḥ 
aśhvatthāmā vikarṇaśhcha saumadattis tathaiva cha

bhavān—yourself; bhīṣhmaḥ—Bheeshma; cha—and; karṇaḥ—Karna; cha—and; kṛipaḥ—Kripa; cha—and; samitim-jayaḥ—victorious in battle; aśhvatthāmā—Ashvatthama; vikarṇaḥ—Vikarna; cha—and; saumadattiḥ—Bhurishrava; tathā—thus; eva—even; cha—also

Translation
"Thou thyself, Bhishma, Karna, Kripa, the victorious in war, Asvatthama, Vikarna, and Bhurisrava, the son of Somadatta—all these are ready for battle."
`,
    bhagavad_gita_chapter_1_verse_9: `Bhagavad Gita Chapter 1, Verse 9:

अन्ये च बहवः शूरा मदर्थे त्यक्तजीविताः। 
नानाशस्त्रप्रहरणाः सर्वे युद्धविशारदाः।।1.9।।

anye cha bahavaḥ śhūrā madarthe tyaktajīvitāḥ nānā-śhastra-praharaṇāḥ sarve yuddha-viśhāradāḥ

anye—others; cha—also; bahavaḥ—many; śhūrāḥ—heroic warriors; mat-arthe—for my sake; tyakta-jīvitāḥ—prepared to lay down their lives; nānā-śhastra-praharaṇāḥ—equipped with various kinds of weapons; sarve—all; yuddha-viśhāradāḥ—skilled in the art of warfare

Translation
And also many other heroes, ready to give up their lives for my sake, armed with various weapons and missiles, all well-skilled in battle.
`,
    bhagavad_gita_chapter_1_verse_10: `Bhagavad Gita Chapter 1, Verse 10:

अपर्याप्तं तदस्माकं बलं भीष्माभिरक्षितम्। 
पर्याप्तं त्विदमेतेषां बलं भीमाभिरक्षितम्।।1.10।।

aparyāptaṁ tadasmākaṁ balaṁ bhīṣhmābhirakṣhitam 
paryāptaṁ tvidameteṣhāṁ balaṁ bhīmābhirakṣhitam

aparyāptam—unlimited; tat—that; asmākam—ours; balam—strength; bhīṣhma—by Grandsire Bheeshma; abhirakṣhitam—safely marshalled; paryāptam—limited; tu—but; idam—this; eteṣhām—their; balam—strength; bhīma—Bheem; abhirakṣhitam—carefully marshalled

Translation
Our army, marshalled by Bhishma, is insufficient, whereas theirs, marshalled by Bhima, is sufficient.
`,
    bhagavad_gita_chapter_1_verse_11: `Bhagavad Gita Chapter 1, Verse 11:

अयनेषु च सर्वेषु यथाभागमवस्थिताः। 
भीष्ममेवाभिरक्षन्तु भवन्तः सर्व एव हि।।1.11।।

ayaneṣhu cha sarveṣhu yathā-bhāgamavasthitāḥ 
bhīṣhmamevābhirakṣhantu bhavantaḥ sarva eva hi

ayaneṣhu—at the strategic points; cha—also; sarveṣhu—all; yathā-bhāgam—in respective position; avasthitāḥ—situated; bhīṣhmam—to Grandsire Bheeshma; eva—only; abhirakṣhantu—defend; bhavantaḥ—you; sarve—all; eva hi—even as

Translation
Therefore, do all of you, stationed in your respective positions in the several divisions of the army, protect Bhishma alone.
`,
    bhagavad_gita_chapter_1_verse_12: `Bhagavad Gita Chapter 1, Verse 12:

तस्य संजनयन्हर्षं कुरुवृद्धः पितामहः। सिंहनादं विनद्योच्चैः शङ्खं दध्मौ प्रतापवान्।।1.12।।

tasya sañjanayan harṣhaṁ kuru-vṛiddhaḥ pitāmahaḥ siṁha-nādaṁ vinadyochchaiḥ śhaṅkhaṁ dadhmau pratāpavān

tasya—his; sañjanayan—causing; harṣham—joy; kuru-vṛiddhaḥ—the grand old man of the Kuru dynasty (Bheeshma); pitāmahaḥ—grandfather; sinha-nādam—lion’s roar; vinadya—sounding; uchchaiḥ—very loudly; śhaṅkham—conch shell; dadhmau—blew; pratāpa-vān—the glorious

Translation
His glorious grandsire, the oldest of the Kauravas, roared like a lion to cheer Duryodhana and blew his conch.
`,
    bhagavad_gita_chapter_1_verse_13: `Bhagavad Gita Chapter 1, Verse 13:

ततः शङ्खाश्च भेर्यश्च पणवानकगोमुखाः। 
सहसैवाभ्यहन्यन्त स शब्दस्तुमुलोऽभवत्।।1.13।।

tataḥ śhaṅkhāśhcha bheryaśhcha paṇavānaka-gomukhāḥ 
sahasaivābhyahanyanta sa śhabdastumulo ’bhavat

tataḥ—thereafter; śhaṅkhāḥ—conches; cha—and; bheryaḥ—bugles; cha—and; paṇava-ānaka—drums and kettledrums; go-mukhāḥ—trumpets; sahasā—suddenly; eva—indeed; abhyahanyanta—blared forth; saḥ—that; śhabdaḥ—sound; tumulaḥ—overwhelming; abhavat—was

Translation
Then, suddenly, conches, kettledrums, tabors, drums, and cow horns blared forth from the Kaurava side, and the sound was tremendous.
`,
    bhagavad_gita_chapter_1_verse_14: `Bhagavad Gita Chapter 1, Verse 14:

ततः श्वेतैर्हयैर्युक्ते महति स्यन्दने स्थितौ। 
माधवः पाण्डवश्चैव दिव्यौ शङ्खौ प्रदध्मतुः।।1.14।।

tataḥ śhvetairhayairyukte mahati syandane sthitau mādhavaḥ pāṇḍavaśhchaiva divyau śhaṅkhau pradadhmatuḥ

tataḥ—then; śhvetaiḥ—by white; hayaiḥ—horses; yukte—yoked; mahati—glorious; syandane—chariot; sthitau—seated; mādhavaḥ—Shree Krishna, the husband of the goddess of fortune, Lakshmi; pāṇḍavaḥ—Arjun; cha—and; eva—also; divyau—Divine; śhaṅkhau—conch shells; pradadhmatuḥ—blew

Translation
Then, Madhava (Krishna) and the son of Pandu (Arjuna), seated in the magnificent chariot yoked with white horses, blew divine conches.
`,
    bhagavad_gita_chapter_1_verse_15	: `Bhagavad Gita Chapter 1, Verse 15:

पाञ्चजन्यं हृषीकेशो देवदत्तं धनंजयः। 
पौण्ड्रं दध्मौ महाशङ्खं भीमकर्मा वृकोदरः।।1.15।।

pāñchajanyaṁ hṛiṣhīkeśho devadattaṁ dhanañjayaḥ 
pauṇḍraṁ dadhmau mahā-śhaṅkhaṁ bhīma-karmā vṛikodaraḥ

pāñchajanyam—the conch shell named Panchajanya; hṛiṣhīka-īśhaḥ—Shree Krishna, the Lord of the mind and senses; devadattam—the conch shell named Devadutta; dhanam-jayaḥ—Arjun, the winner of wealth; pauṇḍram—the conch named Paundra; dadhmau—blew; mahā-śhaṅkham—mighty conch; bhīma-karmā—one who performs herculean tasks; vṛika-udaraḥ—Bheem, the voracious eater

Translation
Hrishikesha blew the Panchajanya, Arjuna blew the Devadatta, and Bhima, the wolf-bellied doer of terrible deeds, blew the great conch Paundra.
`,
    bhagavad_gita_chapter_1_verse_16: `Bhagavad Gita Chapter 1, Verse 16:

अनन्तविजयं राजा कुन्तीपुत्रो युधिष्ठिरः। नकुलः सहदेवश्च सुघोषमणिपुष्पकौ।।1.16।।

anantavijayaṁ rājā kuntī-putro yudhiṣhṭhiraḥ nakulaḥ sahadevaśhcha sughoṣha-maṇipuṣhpakau

ananta-vijayam—the conch named Anantavijay; rājā—king; kuntī-putraḥ—son of Kunti; yudhiṣhṭhiraḥ—Yudhishthir; nakulaḥ—Nakul; sahadevaḥ—Sahadev; cha—and; sughoṣha-maṇipuṣhpakau—the conche shells named Sughosh and Manipushpak;

Translation
King Yudhishthira, the son of Kunti, blew the Anantavijaya; Nakula and Sahadeva blew the Sughosha and the Manipushpaka.
`,
    bhagavad_gita_chapter_1_verse_17: `Bhagavad Gita Chapter 1, Verse 17:

काश्यश्च परमेष्वासः शिखण्डी च महारथः। 
धृष्टद्युम्नो विराटश्च सात्यकिश्चापराजितः।।1.17।।

kāśhyaśhcha parameṣhvāsaḥ śhikhaṇḍī cha mahā-rathaḥ dhṛiṣhṭadyumno virāṭaśhcha sātyakiśh chāparājitaḥ

kāśhyaḥ—King of Kashi; cha—and; parama-iṣhu-āsaḥ—the excellent archer; śhikhaṇḍī—Shikhandi; cha—also; mahā-rathaḥ—warriors who could single handedly match the strength of ten thousand ordinary warriors; dhṛiṣhṭadyumnaḥ—Dhrishtadyumna; virāṭaḥ—Virat; cha—and; sātyakiḥ—Satyaki; cha—and; aparājitaḥ—invincible;

Translation
The king of Kasi, an excellent archer, Sikhandi, the mighty car-warrior, Dhrishtadyumna, Virata, and Satyaki, the unconquered.
`,
    bhagavad_gita_chapter_1_verse_18: `Bhagavad Gita Chapter 1, Verse 18:

द्रुपदो द्रौपदेयाश्च सर्वशः पृथिवीपते। 
सौभद्रश्च महाबाहुः शङ्खान्दध्मुः पृथक्पृथक्।।1.18।।

drupado draupadeyāśhcha sarvaśhaḥ pṛithivī-pate saubhadraśhcha mahā-bāhuḥ śhaṅkhāndadhmuḥ pṛithak pṛithak

drupadaḥ—Drupad; draupadeyāḥ—the five sons of Draupadi; cha—and; sarvaśhaḥ—all; pṛithivī-pate—Ruler of the earth; saubhadraḥ—Abhimanyu, the son of Subhadra; cha—also; mahā-bāhuḥ—the mighty-armed; śhaṅkhān—conch shells; dadhmuḥ—blew; pṛithak pṛithak—individually

Translation
Drupada and the sons of Draupadi, O Lord of the Earth, and the son of Subhadra, the mighty-armed, blew their conches each separately.
`,
    bhagavad_gita_chapter_1_verse_19: `Bhagavad Gita Chapter 1, Verse 19:

स घोषो धार्तराष्ट्राणां हृदयानि व्यदारयत्। 
नभश्च पृथिवीं चैव तुमुलो व्यनुनादयन्।।1.19।।

sa ghoṣho dhārtarāṣhṭrāṇāṁ hṛidayāni vyadārayat 
nabhaśhcha pṛithivīṁ chaiva tumulo nunādayan

saḥ—that; ghoṣhaḥ—sound; dhārtarāṣhṭrāṇām—of Dhritarashtra’s sons; hṛidayāni—hearts; vyadārayat—shattered; nabhaḥ—the sky; cha—and; pṛithivīm—the earth; cha—and; eva—certainly; tumulaḥ—terrific sound; abhyanunādayan—thundering

Translation
The tumultuous sound rent the hearts of Dhritarashtra's party, reverberating through both heaven and earth.
`,
    bhagavad_gita_chapter_1_verse_20: `Bhagavad Gita Chapter 1, Verse 20:

अथ व्यवस्थितान्दृष्ट्वा धार्तराष्ट्रान् कपिध्वज: |
प्रवृत्ते शस्त्रसम्पाते धनुरुद्यम्य पाण्डव: ||20||
हृषीकेशं तदा वाक्यमिदमाह महीपते |

atha vyavasthitān dṛiṣhṭvā dhārtarāṣhṭrān kapi-dhwajaḥ 
pravṛitte śhastra-sampāte dhanurudyamya pāṇḍavaḥ 
hṛiṣhīkeśhaṁ tadā vākyam idam āha mahī-pate

atha—thereupon; vyavasthitān—arrayed; dṛiṣhṭvā—seeing; dhārtarāṣhṭrān—Dhritarashtra’s sons; kapi-dwajaḥ—the Monkey Bannered; pravṛitte—about to commence; śhastra-sampāte—to use the weapons; dhanuḥ—bow; udyamya—taking up; pāṇḍavaḥ—Arjun, the son of Pandu; hṛiṣhīkeśham—to Shree Krishna; tadā—at that time; vākyam—words; idam—these; āha—said; mahī-pate—King

Translation
Then, seeing the people of Dhritarashtra's party standing arrayed and the discharge of weapons about to begin, Arjuna, the son of Pandu whose ensign was a monkey, took up his bow and said the following to Krishna, O Lord of the Earth.
`	













  };

  return templates[templateName] || "Template not found.";
}

function getNextTemplate(template_name: string, lang:string) {
  if(lang == 'en') {
    const templates: Record<string, string> = {
      first_message_on_subscription: "ganapati_welcome",
      namaste_first_message: "ganapati_welcome",
      namaste_with_book_intro: "ganapati_welcome",
      reply_first_message: "ganapati_welcome",
      ganapati_welcome: "bhagavad_gita_chapter_1_verse_1",
      bhagavad_gita_chapter_1_verse_1: "bhagavad_gita_chapter_1_verse_2",
      bhagavad_gita_chapter_1_verse_2: "bhagavad_gita_chapter_1_verse_3",
      bhagavad_gita_chapter_1_verse_3: "bhagavad_gita_chapter_1_verse_4",
      bhagavad_gita_chapter_1_verse_4: "bhagavad_gita_chapter_1_verse_5",
      bhagavad_gita_chapter_1_verse_5: "bhagavad_gita_chapter_1_verse_6",
      bhagavad_gita_chapter_1_verse_6: "bhagavad_gita_chapter_1_verse_7",
      bhagavad_gita_chapter_1_verse_7: "bhagavad_gita_chapter_1_verse_8",
      bhagavad_gita_chapter_1_verse_8: "bhagavad_gita_chapter_1_verse_9",
      bhagavad_gita_chapter_1_verse_9: "bhagavad_gita_chapter_1_verse_10",
      bhagavad_gita_chapter_1_verse_10: "bhagavad_gita_chapter_1_verse_11",
      bhagavad_gita_chapter_1_verse_11: "bhagavad_gita_chapter_1_verse_12",
      bhagavad_gita_chapter_1_verse_12: "bhagavad_gita_chapter_1_verse_13",
      bhagavad_gita_chapter_1_verse_13: "bhagavad_gita_chapter_1_verse_14",
      bhagavad_gita_chapter_1_verse_14: "bhagavad_gita_chapter_1_verse_15",
      bhagavad_gita_chapter_1_verse_15: "bhagavad_gita_chapter_1_verse_16",
      bhagavad_gita_chapter_1_verse_16: "bhagavad_gita_chapter_1_verse_17",
      bhagavad_gita_chapter_1_verse_17: "bhagavad_gita_chapter_1_verse_18",
      bhagavad_gita_chapter_1_verse_18: "bhagavad_gita_chapter_1_verse_19",
      bhagavad_gita_chapter_1_verse_19: "bhagavad_gita_chapter_1_verse_20",
      bhagavad_gita_chapter_1_verse_20: "bhagavad_gita_chapter_1_verse_21",
      bhagavad_gita_chapter_1_verse_21: "bhagavad_gita_chapter_1_verse_22",
    };
    return templates[template_name];
  } else if(lang == 'ta') {
    const templates: Record<string, string> = {
      bhagavad_gita_chapter_1_verse_2: "bhagavad_gita_chapter_1_verse_3_tamil",
      bhagavad_gita_chapter_1_verse_3_tamil: "bhagavad_gita_chapter_1_verse_4_tamil",
      bhagavad_gita_chapter_1_verse_4_tamil: "bhagavad_gita_chapter_1_verse_5",
      bhagavad_gita_chapter_1_verse_5: "bhagavad_gita_chapter_1_verse_6",
      bhagavad_gita_chapter_1_verse_7: "bhagavad_gita_chapter_1_verse_8",
      bhagavad_gita_chapter_1_verse_8: "bhagavad_gita_chapter_1_verse_9",
      bhagavad_gita_chapter_1_verse_9: "bhagavad_gita_chapter_1_verse_10",
      bhagavad_gita_chapter_1_verse_10: "bhagavad_gita_chapter_1_verse_11",
      bhagavad_gita_chapter_1_verse_11: "bhagavad_gita_chapter_1_verse_12",
      bhagavad_gita_chapter_1_verse_12: "bhagavad_gita_chapter_1_verse_13",
      bhagavad_gita_chapter_1_verse_13: "bhagavad_gita_chapter_1_verse_14",
      bhagavad_gita_chapter_1_verse_14: "bhagavad_gita_chapter_1_verse_15",
      bhagavad_gita_chapter_1_verse_15: "bhagavad_gita_chapter_1_verse_16",
      bhagavad_gita_chapter_1_verse_16: "bhagavad_gita_chapter_1_verse_17",
      bhagavad_gita_chapter_1_verse_17: "bhagavad_gita_chapter_1_verse_18",
      bhagavad_gita_chapter_1_verse_18: "bhagavad_gita_chapter_1_verse_19",
      bhagavad_gita_chapter_1_verse_19: "bhagavad_gita_chapter_1_verse_20",
    }
    return templates[template_name];
  }
  return "";
}

async function sendNextEmail(email:string, template:string) {
  const response = await fetch("https://sanatanadharma.xyz/api/send_email?template="+template+"&lang=en&email="+email, {
    method: 'GET'
  });
  console.log("The response is:");
  console.log(response);
  if(response.ok) {
    console.log("Response was ok, updating db");
    const insertQuery = sql`
      INSERT INTO subscriber (email, lastSentTemplate, Preferred_language, lastSentTime)
      VALUES (${email}, ${template}, 'en', timezone('CET', NOW()))
      ON CONFLICT (email) DO UPDATE
      SET lastSentTemplate = ${template},
          lastSentTime = timezone('CET', NOW())
      RETURNING id;
    `;
    const { rows } = await insertQuery;
    console.log("updated db!");
    console.log(rows);
  } else {
    console.log("Response was not ok!");
  }
}


async function sendWhatsappMessage() {
  try {
    const selectQuery = sql`
      SELECT * FROM subscriber;
    `;
    const { rows } = await selectQuery;
    for (const row of rows) {
      const lastSentTime = new Date(row.lastsenttime);
      const current_time = new Date();
      const twelveHoursAgo: Date = new Date(current_time.getTime() - 12 * 60 * 60 * 1000);

      if (!row.lastsenttime || lastSentTime < twelveHoursAgo) {
        console.log('Need to send message now!');
        const oldTemplate = row.lastsenttemplate.trim();
        console.log(oldTemplate);
        const template = getNextTemplate(oldTemplate, row.preferred_language);
        console.log(template);
        const message = getMessageForTemplateName(template);
        if(message.includes("Template not found") || template.includes("Template not found")) {
          console.log("Template not found!!!");
          continue;
        }

        if(row.email) {
          // email
          await sendNextEmail(row.email, template);
          continue;
        }

        console.log(row);
        const phone = row.phonenumber;
        console.log("inside sendWhatsappMessage");
        console.log(phone);
        console.log(template);
        console.log(message);
        const formData = new FormData();
        formData.append('From', "whatsapp:+13074486824");
        console.log(formData);
        formData.append('To', "whatsapp:" + phone);
        console.log(formData);
        formData.append('Body', message);
        console.log(formData);
        console.log("form data:");
        console.log(formData);
        console.log("To: "+phone);
        console.log("Message: "+message);
        const url = "https://nest.messagebird.com/workspaces/e911edd7-3d66-48b4-9230-01bb55168b90/channels/d1a947d3-9330-427d-a686-17c0203101fe/messages";
        const headers = new Headers({
          'Authorization': 'AccessKey a6fnhhjJNFZFWUmtfgn8jo7Ie6l0wzvXhKQQ',
          'Content-Type': 'application/json',
        });

        const templateInfo: TemplateInfo = templateMap[template];
        if(templateInfo) {
          const body = JSON.stringify({
            "receiver": {
              "contacts": [
                {
                  "identifierValue": phone,
                  "identifierKey": "phonenumber"
                }
              ]
            },
            "template": {
              "projectId": templateInfo["projectId"],
              "version": templateInfo["version"],
              "locale": "en"
            }
          });
          
          const options: RequestInit = {
            method: 'POST',
            headers: headers,
            body: body,
          };

          const response = await fetch(url, options);

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
              INSERT INTO subscriber (email, lastSentTemplate, lastSentTime)
              VALUES (${phone}, ${template}, timezone('CET', NOW()))
              ON CONFLICT (email) DO UPDATE
              SET lastSentTemplate = ${template},
              lastSentTime = timezone('CET', NOW())
                RETURNING id;
            `;
            } else {
              console.log("test 6");
              insertQuery = sql`
              INSERT INTO subscriber (phoneNumber, lastSentTemplate, lastSentTime)
              VALUES (${phone},  ${template}, timezone('CET', NOW()))
              ON CONFLICT (phoneNumber) DO UPDATE
              SET lastSentTemplate = ${template},
              lastSentTime = timezone('CET', NOW())
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
            console.error(response);
            console.error(formData);
          }

        }
        
        
        // const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`, {
        //   method: 'POST',
        //   headers: {
        //     'Authorization': `Basic ${Buffer.from(`${accountSid}:${authToken}`).toString('base64')}`,
        //   },
        //   body: formData,
        // });    

      } else {
      }

    }

  } catch (error) {
    console.error("An error occurred:", error);
  }
}


const handler = async (req: Request): Promise<Response> => {
  try {
    // Get query parameters from the request
    await sendWhatsappMessage();
    return new Response("Sent!!!");
  } catch (error) {
    console.error(error);
    return new Response("Error", { status: 500 });
  }
};

export default handler;
