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
`	,
bhagavad_gita_chapter_1_verse_21: `Bhagavad Gita Chapter 1, Verse 21:

"अर्जुन उवाच |
सेनयोरुभयोर्मध्ये रथं स्थापय मेऽच्युत || 1.21 ||"

arjuna uvācha 
senayor ubhayor madhye rathaṁ sthāpaya me ’chyuta

In English, it can be translated as:

Arjuna said, "O Krishna, place my chariot in the middle between the two armies, so that I may behold those who stand here, desirous to fight, and know with whom I must fight when the battle is about to commence."  
`	,
bhagavad_gita_chapter_1_verse_22: `Bhagavad Gita Chapter 1, Verse 22:

यावदेतान्निरीक्षेऽहं योद्धुकामानवस्थितान्। 
कैर्मया सह योद्धव्यमस्मिन्रणसमुद्यमे।।1.22।।

yāvadetān nirīkṣhe ’haṁ yoddhu-kāmān avasthitān 
kairmayā saha yoddhavyam asmin raṇa-samudyame

yāvat—as many as; etān—these; nirīkṣhe—look; aham—I; yoddhu-kāmān—for the battle; avasthitān—arrayed; kaiḥ—with whom; mayā—by me; saha—together; yoddhavyam—must fight; asmin—in this; raṇa-samudyame—great combat

Translation
Arjuna said, "O Krishna, place my chariot in the middle between the two armies, so that I may behold those who stand here, desirous to fight, and know with whom I must fight when the battle is about to commence."
`	,
bhagavad_gita_chapter_1_verse_23: `Bhagavad Gita Chapter 1, Verse 23:

योत्स्यमानानवेक्षेऽहं य एतेऽत्र समागताः। 
धार्तराष्ट्रस्य दुर्बुद्धेर्युद्धे प्रियचिकीर्षवः।।1.23।।

yotsyamānān avekṣhe ’haṁ ya ete ’tra samāgatāḥ 
dhārtarāṣhṭrasya durbuddher yuddhe priya-chikīrṣhavaḥ

yotsyamānān—those who have come to fight; avekṣhe aham—I desire to see; ye—who; ete—those; atra—here; samāgatāḥ—assembled; dhārtarāṣhṭrasya—of Dhritarashtra’s son; durbuddheḥ—evil-minded; yuddhe—in the fight; priya-chikīrṣhavaḥ—wishing to please

Translation:

For I desire to observe those who are assembled here to fight, wishing to please in battle the evil-minded Duryodhana—the son of Dhritarashtra.
`	,
bhagavad_gita_chapter_1_verse_24: `Bhagavad Gita Chapter 1, Verse 24:

संजय उवाच एवमुक्तो हृषीकेशो गुडाकेशेन भारत। 
सेनयोरुभयोर्मध्ये स्थापयित्वा रथोत्तमम्।।1.24।।

sañjaya uvācha evam ukto hṛiṣhīkeśho guḍākeśhena bhārata 
senayor ubhayor madhye sthāpayitvā rathottamam

sañjayaḥ uvācha—Sanjay said; evam—thus; uktaḥ—addressed; hṛiṣhīkeśhaḥ—Shree Krishna, the Lord of the senses; guḍākeśhena—by Arjun, the conqueror of sleep; bhārata—descendant of Bharat; senayoḥ—armies; ubhayoḥ—the two; madhye—between; sthāpayitvā—having drawn; ratha-uttamam—magnificent chariot

Translation
Sanjaya said, Thus addressed by Arjuna, Krishna stationed the best of chariots, O Dhritarashtra, in the midst of the two armies.
`	,

bhagavad_gita_chapter_1_verse_25: `Bhagavad Gita Chapter 1, Verse 25:

भीष्मद्रोणप्रमुखतः सर्वेषां च महीक्षिताम्। 
उवाच पार्थ पश्यैतान्समवेतान्कुरूनिति।।1.25।।

bhīṣhma-droṇa-pramukhataḥ sarveṣhāṁ cha mahī-kṣhitām 
uvācha pārtha paśhyaitān samavetān kurūn iti

bhīṣhma—Grandsire Bheeshma; droṇa—Dronacharya; pramukhataḥ—in the presence; sarveṣhām—all; cha—and; mahī-kṣhitām—other kings; uvācha—said; pārtha—Arjun, the son of Pritha; paśhya—behold; etān—these; samavetān—gathered; kurūn—descendants of Kuru; iti—thus

Translation
In front of Bhishma and Drona, and all the rulers of the earth, he said: "O Arjuna, son of Pritha, behold these Kurus gathered together."

`,
bhagavad_gita_chapter_1_verse_26: `Bhagavad Gita Chapter 1, Verse 26:

तत्रापश्यत्स्थितान्पार्थः पितृ़नथ पितामहान्। 
आचार्यान्मातुलान्भ्रातृ़न्पुत्रान्पौत्रान्सखींस्तथा।।1.26।।

tatrāpaśhyat sthitān pārthaḥ pitṝīn atha pitāmahān 
āchāryān mātulān bhrātṝīn putrān pautrān sakhīṁs tathā śhvaśhurān suhṛidaśh chaiva senayor ubhayor api

tatra—there; apaśhyat—saw; sthitān—stationed; pārthaḥ—Arjun; pitṝīn—fathers; atha—thereafter; pitāmahān—grandfathers; āchāryān—teachers; mātulān—maternal uncles; bhrātṝīn—brothers; putrān—sons; pautrān—grandsons; sakhīn—friends; tathā—also; śhvaśhurān—fathers-in-law; suhṛidaḥ—well-wishers; cha—and; eva—indeed; senayoḥ—armies; ubhayoḥ—in both armies; api—also

Translation
Then, Arjuna (son of Pritha) saw there (in the armies) stationed fathers, grandfathers, teachers, maternal uncles, brothers, sons, grandsons, and friends.

Commentary
1.26 तत्र there? अपश्यत् saw? स्थितान् stationed? पार्थः Partha? पितृ़न् fathers? अथ also? पितामहान्grandfathers? आचार्यान् teachers? मातुलान् maternal uncles? भ्रातृ़न् brothers? पुत्रान् sons? पौत्रान् grandsons? सखीन् friends? तथा too.No Commentary.

`,
bhagavad_gita_chapter_1_verse_27: `Bhagavad Gita Chapter 1, Verse 27:

श्वशुरान्सुहृदश्चैव सेनयोरुभयोरपि। 
तान्समीक्ष्य स कौन्तेयः सर्वान्बन्धूनवस्थितान्।।1.27।।

tān samīkṣhya sa kaunteyaḥ sarvān bandhūn avasthitān kṛipayā parayāviṣhṭo viṣhīdann idam abravīt

tān—these; samīkṣhya—on seeing; saḥ—they; kaunteyaḥ—Arjun, the son of Kunti; sarvān—all; bandhūn—relatives; avasthitān—present; kṛipayā—by compassion; parayā—great; āviṣhṭaḥ—overwhelmed; viṣhīdan—deep sorrow; idam—this; abravīt—spoke

Translation
He saw fathers-in-law and friends in both the armies. The son of Kunti, Arjuna, seeing all those kinsmen thus standing arrayed, spoke sorrowfully, deeply filled with pity.

Commentary
1.27 श्वशुरान् fathersinlaw? सुहृदः friends? च and? एव also? सेनयोः in armies? उभयोः (in) both? अपि also? तान् those? समीक्ष्य having seen? सः he? कौन्तेयः Kaunteya? सर्वान् all? बन्धून् relatives? अवस्थितान् standing (arrayed)? कृपया by pity? परया deep? आविष्टः filled? विषीदन् sorrowfully? इदम् this? अब्रवीत् said.No Commentary.

`,
bhagavad_gita_chapter_1_verse_28: `Bhagavad Gita Chapter 1, Verse 28:

अर्जुन उवाच कृपया परयाऽऽविष्टो विषीदन्निदमब्रवीत्। 
दृष्ट्वेमं स्वजनं कृष्ण युयुत्सुं समुपस्थितम्।।1.28।।

arjuna uvācha dṛiṣhṭvemaṁ sva-janaṁ kṛiṣhṇa yuyutsuṁ samupasthitam

arjunaḥ uvācha—Arjun said; dṛiṣhṭvā—on seeing; imam—these; sva-janam—kinsmen; kṛiṣhṇa—Krishna; yuyutsum—eager to fight; samupasthitam—present;

Translation
Arjuna said, "O Krishna, seeing my kinsmen arrayed here, eager to fight,

Commentary
1.28 दृष्ट्वा having seen? इमम् these? स्वजनम् kinsmen? कृष्ण O Krishna (the dark one? He who attracts)? युयुत्सुम् eager to fight? समुपस्थितम् arrayed.No Commentary.

`,
bhagavad_gita_chapter_1_verse_29: `Bhagavad Gita Chapter 1, Verse 29:

सीदन्ति मम गात्राणि मुखं च परिशुष्यति। वेपथुश्च शरीरे मे रोमहर्षश्च जायते।।1.29।।

sīdanti mama gātrāṇi mukhaṁ cha pariśhuṣhyati vepathuśh cha śharīre me roma-harṣhaśh cha jāyate

sīdanti—quivering; mama—my; gātrāṇi—limbs; mukham—mouth; cha—and; pariśhuṣhyati—is drying up vepathuḥ—shuddering; cha—and; śharīre—on the body; me—my; roma-harṣhaḥ—standing of bodily hair on end; cha—also; jāyate—is happening;

Translation
My limbs fail, my mouth is parched, my body quivers, and my hair stands on end.

Commentary
1.29 सीदन्ति fail? मम my? गात्राणि limbs? मुखम् mouth? च and? परिशुष्यति is parching? वेपथुः shivering? च and? शरीरे in body? मे my? रोमहर्षः horripilation? च and? जायते arises.No Commentary.

`,
bhagavad_gita_chapter_1_verse_30: `Bhagavad Gita Chapter 1, Verse 30:

गाण्डीवं स्रंसते हस्तात्त्वक्चैव परिदह्यते। न च शक्नोम्यवस्थातुं भ्रमतीव च मे मनः।।1.30।।

gāṇḍīvaṁ sraṁsate hastāt tvak chaiva paridahyate na cha śhaknomy avasthātuṁ bhramatīva cha me manaḥ

gāṇḍīvam—Arjun’s bow; sraṁsate—is slipping; hastāt—from (my) hand; tvak—skin; cha—and; eva—indeed; paridahyate—is burning all over; na—not; cha—and; śhaknomi—am able; avasthātum—remain steady; bhramati iva—whirling like; cha—and; me—my; manaḥ—mind;

Translation
The Gandiva slips from my hand, and my skin burns all over; I am unable to stand, and my mind is reeling, as it were.

Commentary
1.30 गाण्डीवम् Gandiva? स्रंसते slips? हस्तात् from (my) hand? त्वक् (my) skin? च and? एव also? परिदह्यते burns all over? न not? च and? शक्नोमि (I) am able? अवस्थातुम्? to stand? भ्रमति इव seems whirling? च and? मे my? मनः mind.No Commentary.

`,
bhagavad_gita_chapter_1_verse_31: `Bhagavad Gita Chapter 1, Verse 31:

निमित्तानि च पश्यामि विपरीतानि केशव। न च श्रेयोऽनुपश्यामि हत्वा स्वजनमाहवे।।1.31।।

nimittāni cha paśhyāmi viparītāni keśhava na cha śhreyo ’nupaśhyāmi hatvā sva-janam āhave

nimittāni—omens; cha—and; paśhyāmi—I see; viparītāni—misfortune; keśhava—Shree Krishna, killer of the Keshi demon; na—not; cha—also; śhreyaḥ—good; anupaśhyāmi—I foresee; hatvā—from killing; sva-janam—kinsmen; āhave—in battle

Translation
And I see ill omens, O Kesava. I do not see any good in slaying my kinsmen in battle.

Commentary
1.31 निमित्तानि omens? च and? पश्यामि I see? विपरीतानि adverse? केशव O Kesava? न not? च and? श्रेयः good? अनुपश्यामि (I) see? हत्वा killing? स्वजनम् our peope? आहवे in battle.Commentary Kesava means he who has fine or luxuriant hair.

`,
bhagavad_gita_chapter_1_verse_32: `Bhagavad Gita Chapter 1, Verse 32:

न काङ्क्षे विजयं कृष्ण न च राज्यं सुखानि च। किं नो राज्येन गोविन्द किं भोगैर्जीवितेन वा।।1.32।।

na kāṅkṣhe vijayaṁ kṛiṣhṇa na cha rājyaṁ sukhāni cha kiṁ no rājyena govinda kiṁ bhogair jīvitena vā

na—nor; kāṅkṣhe—do I desire; vijayam—victory; kṛiṣhṇa—Krishna; na—nor; cha—as well; rājyam—kingdom; sukhāni—happiness; cha—also; kim—what; naḥ—to us; rājyena—by kingdom; govinda—Krishna, he who gives pleasure to the senses, he who is fond of cows; kim—what?; bhogaiḥ—pleasures; jīvitena—life; vā—or;

Translation
I desire not victory, O Krishna, nor kingdom, nor pleasures. What use is dominion to us, O Krishna, or pleasures or even life?

Commentary
1.32 न not? काङ्क्षे (I) desire? विजयम् victory? कृष्ण O Krishna? न not? च and? राज्यम् kingdom? सुखानि pleasures? च and? किम् what? नः to us? राज्येन by kindom? गोविन्द O Govinda? किम् what? भोगैः by pleasures? जीवितेन life? वा or.No Commentary.

`,
bhagavad_gita_chapter_1_verse_33: `Bhagavad Gita Chapter 1, Verse 33:

येषामर्थे काङ्क्षितं नो राज्यं भोगाः सुखानि च। त इमेऽवस्थिता युद्धे प्राणांस्त्यक्त्वा धनानि च।।1.33।।

yeṣhām arthe kāṅkṣhitaṁ no rājyaṁ bhogāḥ sukhāni cha ta ime ’vasthitā yuddhe prāṇāṁs tyaktvā dhanāni cha

yeṣhām—for whose; arthe—sake; kāṅkṣhitam—coveted for; naḥ—by us; rājyam—kingdom; bhogāḥ—pleasures; sukhāni—happiness; cha—also; te—they; ime—these; avasthitāḥ—situated; yuddhe—for battle; prāṇān—lives; tyaktvā—giving up; dhanāni—wealth; cha—also

Translation
Those for whose sake we desire kingdom, enjoyments, and pleasures stand here in battle, having renounced life and wealth.

Commentary
1.33 येषाम् of whose? अर्थे sake? काङ्क्षितम् (is) desired? नः by us? राज्यम् kingdom? भोगाः enjoyment? सुखानि pleasures? च and? ते they? इमे these? अवस्थिताः stand? युद्धे in battle? प्राणान् life? त्यक्त्वा having abandoned? धनानि wealth? च and.No Commentary.

`,
bhagavad_gita_chapter_1_verse_34: `Bhagavad Gita Chapter 1, Verse 34:

आचार्याः पितरः पुत्रास्तथैव च पितामहाः। मातुलाः श्चशुराः पौत्राः श्यालाः सम्बन्धिनस्तथा।।1.34।।

āchāryāḥ pitaraḥ putrās tathaiva cha pitāmahāḥ mātulāḥ śhvaśhurāḥ pautrāḥ śhyālāḥ sambandhinas tathā

āchāryāḥ—teachers; pitaraḥ—fathers; putrāḥ—sons; tathā—as well; eva—indeed; cha—also; pitāmahāḥ—grandfathers; mātulāḥ—maternal uncles; śhvaśhurāḥ—fathers-in-law; pautrāḥ—grandsons; śhyālāḥ—brothers-in-law; sambandhinaḥ—kinsmen; tathā—as well;

Translation
Teachers, fathers, sons, and grandfathers, maternal uncles, fathers-in-law, grandsons, brothers-in-law, and other relatives—

Commentary
1.34 आचार्याः teachers? पितरः fathers? पुत्राः sons? तथा thus? एव also? च and? पितामहाः grandfathers? मातुलाः maternal uncles? श्वशुराः fathersinlaw? पौत्राः grandsons? श्यालाः brothersinlaw? सम्बन्धिनः relatives? तथा as well as.No Commentary.

`,
bhagavad_gita_chapter_1_verse_35: `Bhagavad Gita Chapter 1, Verse 35:

एतान्न हन्तुमिच्छामि घ्नतोऽपि मधुसूदन। अपि त्रैलोक्यराज्यस्य हेतोः किं नु महीकृते।।1.35।।

etān na hantum ichchhāmi ghnato ’pi madhusūdana api trailokya-rājyasya hetoḥ kiṁ nu mahī-kṛite

etān—these; na—not; hantum—to slay; ichchhāmi—I wish; ghnataḥ—killed; api—even though; madhusūdana—Shree Krishna, killer of the demon Madhu; api—even though; trai-lokya-rājyasya—dominion over three worlds; hetoḥ—for the sake of; kim nu—what to speak of; mahī-kṛite—for the earth

Translation
These I do not wish to kill, O Krishna, even though they kill me, for the sake of dominion over the three worlds; leave alone killing them for the sake of the earth."

Commentary
1.35 एतान् these? न not? हन्तुम् to kill? इच्छामि (I) wish? घ्नतःअपि even if they kill me? मधुसूदन O Madhusudana (the slayer of Madhu? a demon)? अपि even? त्रैलोक्यराज्यस्य dominion over the three worlds? हेतोः for the sake of? किम् how? नु then? महीकृते for the sake of the earth.No Commentary.

`,
bhagavad_gita_chapter_1_verse_36: `Bhagavad Gita Chapter 1, Verse 36:

निहत्य धार्तराष्ट्रान्नः का प्रीतिः स्याज्जनार्दन। पापमेवाश्रयेदस्मान्हत्वैतानाततायिनः।।1.36।।

nihatya dhārtarāṣhṭrān naḥ kā prītiḥ syāj janārdana pāpam evāśhrayed asmān hatvaitān ātatāyinaḥ

nihatya—by killing; dhārtarāṣhṭrān—the sons of Dhritarashtra; naḥ—our; kā—what; prītiḥ—pleasure; syāt—will there be; janārdana—he who looks after the public, Shree Krishna; pāpam—vices; eva—certainly; āśhrayet—must come upon; asmān—us; hatvā—by killing; etān—all these; ātatāyinaḥ—aggressors;

Translation
By killing these sons of Dhritarashtra, what pleasure could be ours, O Janardana? Only sin would accrue to us from killing these felons.

Commentary
1.36 निहत्य having slain? धार्तराष्ट्रान् sons of Dhritarashtra? नः to us? का what? प्रीतिः pleasure? स्यात् may be? जनार्दन O Janardana? पापम् sin? एव only? आश्रयेत् would take hold? अस्मान् to us? हत्वा having killed? एतान् these? आततायिनः felons.Commentary Janardana means one who is worshipped by all for prosperity and salvation -- Krishna.He who sets fire to the house of another? who gives poision?

who runs with sword to kill? who has plundered wealth and lands? and who has taken hold of the wife of somody else is an atatayi. Duryodhana had done all these evil actions.

`,
bhagavad_gita_chapter_1_verse_37: `Bhagavad Gita Chapter 1, Verse 37:

तस्मान्नार्हा वयं हन्तुं धार्तराष्ट्रान्स्वबान्धवान्। स्वजनं हि कथं हत्वा सुखिनः स्याम माधव।।1.37।।

tasmān nārhā vayaṁ hantuṁ dhārtarāṣhṭrān sa-bāndhavān sva-janaṁ hi kathaṁ hatvā sukhinaḥ syāma mādhava

tasmāt—hence; na—never; arhāḥ—behoove; vayam—we; hantum—to kill; dhārtarāṣhṭrān—the sons of Dhritarashtra; sva-bāndhavān—along with friends; sva-janam—kinsmen; hi—certainly; katham—how; hatvā—by killing; sukhinaḥ—happy; syāma—will we become; mādhava—Shree Krishna, the husband of Yogmaya

Translation
Therefore, we should not kill the sons of Dhritarashtra, our relatives; for how can we be happy by killing our own kin, O Madhava (Krishna)?

Commentary
1.37 तस्मात् therefore? न (are) not? अर्हाः justified? वयम् we? हन्तुम् to kill? धार्तराष्ट्रान् the sons of Dhritarashtra? स्वबान्धवान् our relatives? स्वजनम् kinsmen? हि indeed? कथम् how? हत्वा having killed? सुखिनः happy? स्याम may (we) be? माधव O Madhava.No Commentary.

`,
bhagavad_gita_chapter_1_verse_38: `Bhagavad Gita Chapter 1, Verse 38:

यद्यप्येते न पश्यन्ति लोभोपहतचेतसः। कुलक्षयकृतं दोषं मित्रद्रोहे च पातकम्।।1.38।।

yady apy ete na paśhyanti lobhopahata-chetasaḥ kula-kṣhaya-kṛitaṁ doṣhaṁ mitra-drohe cha pātakam

yadi api—even though; ete—they; na—not; paśhyanti—see; lobha—greed; upahata—overpowered; chetasaḥ—thoughts; kula-kṣhaya-kṛitam—in annihilating their relatives; doṣham—fault; mitra-drohe—to wreak treachery upon friends; cha—and; pātakam—sin;

Translation
Though they, with intelligence overpowered by greed, see no evil in the destruction of families and no sin in hostility to friends,

Commentary
1.38 यद्यपि though? एते these? न not? पश्यन्ति see? लोभोपहतचेतसः with intelligence overpowered by greed? कुलक्षयकृतम् in the destruction of families? दोषम् evil? मित्रद्रोहे in hostility to friends? च and? पातकम् sin.No Commentary.

`,
bhagavad_gita_chapter_1_verse_39: `Bhagavad Gita Chapter 1, Verse 39:

कथं न ज्ञेयमस्माभिः पापादस्मान्निवर्तितुम्। कुलक्षयकृतं दोषं प्रपश्यद्भिर्जनार्दन।।1.39।।

kathaṁ na jñeyam asmābhiḥ pāpād asmān nivartitum kula-kṣhaya-kṛitaṁ doṣhaṁ prapaśhyadbhir janārdana

katham—why; na—not; jñeyam—should be known; asmābhiḥ—we; pāpāt—from sin; asmāt—these; nivartitum—to turn away; kula-kṣhaya—killing the kindered; kṛitam—done; doṣham—crime; prapaśhyadbhiḥ—who can see; janārdana—he who looks after the public, Shree Krishna

Translation
Why should we not, who clearly see the evil in the destruction of families, learn to turn away from this sin, O Janardana (Krishna)?

Commentary
1.39 कथम् why? न not? ज्ञेयम् should be learnt? अस्माभिः by us? पापात् from sin? अस्मात् this? निवर्तितुम् to turn away? कुलक्षयकृतम् in the destruction of families? दोषम् evil? प्रपश्यद्भिः clearly seeing? जनार्दन O Janardana.Commentary Ignorance of law is no excuse but wanton sinful conduct is a grave crime? unworthy of us? who are wiser.

`,
bhagavad_gita_chapter_1_verse_40: `Bhagavad Gita Chapter 1, Verse 40:

कुलक्षये प्रणश्यन्ति कुलधर्माः सनातनाः। धर्मे नष्टे कुलं कृत्स्नमधर्मोऽभिभवत्युत।।1.40।।

kula-kṣhaye praṇaśhyanti kula-dharmāḥ sanātanāḥ dharme naṣhṭe kulaṁ kṛitsnam adharmo ’bhibhavaty uta

kula-kṣhaye—in the destruction of a dynasty; praṇaśhyanti—are vanquished; kula-dharmāḥ—family traditions; sanātanāḥ—eternal; dharme—religion; naṣhṭe—is destroyed; kulam—family; kṛitsnam—the whole; adharmaḥ—irreligion; abhibhavati—overcome; uta—indeed

Translation
In the destruction of a family, the immemorial religious rites of that family perish; on the destruction of spirituality, impiety indeed, overwhelms the whole family.

Commentary
1.40 कुलक्षये in the destruction of a family? प्रणश्यन्ति perish? कुलधर्माः family religious rites? सनातनाः immemorial? धर्मे spirituality? नष्टे being destroyed? कुलम् कृत्स्नम् the whole family? अधर्मः impiety? अभिभवति overcomes? उत indeed.Commentary Dharma -- the duties and ceremonies practised by the family in accordance with the injunctions of the scriptures.

`,
bhagavad_gita_chapter_1_verse_41: `Bhagavad Gita Chapter 1, Verse 41:

अधर्माभिभवात्कृष्ण प्रदुष्यन्ति कुलस्त्रियः। स्त्रीषु दुष्टासु वार्ष्णेय जायते वर्णसङ्करः।।1.41।।

adharmābhibhavāt kṛiṣhṇa praduṣhyanti kula-striyaḥ strīṣhu duṣhṭāsu vārṣhṇeya jāyate varṇa-saṅkaraḥ

adharma—irreligion; abhibhavāt—preponderance; kṛiṣhṇa—Shree Krishna; praduṣhyanti—become immoral; kula-striyaḥ—women of the family; strīṣhu—of women; duṣhṭāsu—become immoral; vārṣhṇeya—descendant of Vrishni; jāyate—are born; varṇa-saṅkaraḥ—unwanted progeny

Translation
O Krishna, by the prevalence of impiety, the women of the family become corrupt; and, when women are corrupted, O Varshenya (descendant of Vrishni), intermingling of castes arises.

Commentary
1.41 अधर्माभिभवात् from the prevalence of impiety? कृष्ण O Krishna? प्रदुष्यन्ति become corrupt? कुलस्त्रियः the women of the family? स्त्रीषु in women? दुष्टासु (being) corrupt? वार्ष्णेय O Varshneya? जायते arises? वर्णसङ्करः casteadmixture.No Commentary.

`,
bhagavad_gita_chapter_1_verse_42: `Bhagavad Gita Chapter 1, Verse 42:

सङ्करो नरकायैव कुलघ्नानां कुलस्य च। पतन्ति पितरो ह्येषां लुप्तपिण्डोदकक्रियाः।।1.42।।

saṅkaro narakāyaiva kula-ghnānāṁ kulasya cha patanti pitaro hy eṣhāṁ lupta-piṇḍodaka-kriyāḥ

saṅkaraḥ—unwanted children; narakāya—hellish; eva—indeed; kula-ghnānām—for those who destroy the family; kulasya—of the family; cha—also; patanti—fall; pitaraḥ—ancestors; hi—verily; eṣhām—their; lupta—deprived of; piṇḍodaka-kriyāḥ—performances of sacrificial offerings

Translation
Confusion of castes leads to hell for the slayers of the family, for their forebears fall, deprived of the offerings of rice-balls and libations of water.

Commentary
1.42 सङ्करः confusion of castes? नरकाय for the hell? एव also? कुलघ्नानाम् of the slayers of the family?कुलस्य of the family? च and? पतन्ति fall? पितरः the forefathers? हि verily? एषां their? लुप्तपिण्डोदकक्रियाः deprived of the offerings of ricall and water.No Commentary.

`,
bhagavad_gita_chapter_1_verse_43: `Bhagavad Gita Chapter 1, Verse 43:

दोषैरेतैः कुलघ्नानां वर्णसङ्करकारकैः। उत्साद्यन्ते जातिधर्माः कुलधर्माश्च शाश्वताः।।1.43।।

doṣhair etaiḥ kula-ghnānāṁ varṇa-saṅkara-kārakaiḥ utsādyante jāti-dharmāḥ kula-dharmāśh cha śhāśhvatāḥ

doṣhaiḥ—through evil deeds; etaiḥ—these; kula-ghnānām—of those who destroy the family; varṇa-saṅkara—unwanted progeny; kārakaiḥ—causing; utsādyante—are ruined; jāti-dharmāḥ—social and family welfare activities; kula-dharmāḥ—family traditions; cha—and; śhāśhvatāḥ—eternal

Translation
By these evil deeds of the destroyers of the family, which cause confusion of castes, the eternal religious rites of the caste and the family are destroyed.

Commentary
1.43 दोषैः by evil deeds? एतैः (by) these? कुलघ्नानाम् of the family destroyers? वर्णसङ्करकारकैः causing intermingling of castes? उत्साद्यन्ते are destroyed? जातिधर्माः religious rites of the caste? कुलधर्माः family religious rites? च and? शाश्वताः eternal.No Commentary.

`,
bhagavad_gita_chapter_1_verse_44: `Bhagavad Gita Chapter 1, Verse 44:

उत्सन्नकुलधर्माणां मनुष्याणां जनार्दन। नरकेऽनियतं वासो भवतीत्यनुशुश्रुम।।1.44।।

utsanna-kula-dharmāṇāṁ manuṣhyāṇāṁ janārdana narake ‘niyataṁ vāso bhavatītyanuśhuśhruma

utsanna—destroyed; kula-dharmāṇām—whose family traditions; manuṣhyāṇām—of such human beings; janārdana—he who looks after the public, Shree Krishna; narake—in hell; aniyatam—indefinite; vāsaḥ—dwell; bhavati—is; iti—thus; anuśhuśhruma—I have heard from the learned

Translation
We have heard, O Janardana, that those men in whose families the religious practices have been destroyed are inevitably destined to dwell in hell for an unknown period.

Commentary
1.44 उत्सन्नकुलधर्माणाम् whose family religious practices are destroyed? मनुष्याणाम् of the men? जनार्दन O Janardana? नरके in hell? अनियतं for unknown period? वासः dwelling? भवति is? इति thus? अनुशुश्रुम we have heard.No Commentary.

`,
bhagavad_gita_chapter_1_verse_45: `Bhagavad Gita Chapter 1, Verse 45: 

अहो बत महत्पापं कर्तुं व्यवसिता वयम्। यद्राज्यसुखलोभेन हन्तुं स्वजनमुद्यताः।।1.45।।

aho bata mahat pāpaṁ kartuṁ vyavasitā vayam yad rājya-sukha-lobhena hantuṁ sva-janam udyatāḥ

aho—alas; bata—how; mahat—great; pāpam—sins; kartum—to perform; vyavasitāḥ—have decided; vayam—we; yat—because; rājya-sukha-lobhena—driven by the desire for kingly pleasure; hantum—to kill; sva-janam—kinsmen; udyatāḥ—intending;

Translation
Alas! We are involved in a great sin, for we are prepared to kill our kinsmen, out of greed for the pleasures of a kingdom.

Commentary
1.45 अहो बत alas? महत् great? पापम् sin? कर्तुम् to do? व्यवसिताः prepared? वयम् we? यत् that? राज्यसुखलोभेन by the greed of pleasure of kingdom? हन्तुम् to kill? स्वजनम् kinsmen? उद्यताः prepared.No Commentary.

`,
bhagavad_gita_chapter_1_verse_46: `Bhagavad Gita Chapter 1, Verse 46:

यदि मामप्रतीकारमशस्त्रं शस्त्रपाणयः। धार्तराष्ट्रा रणे हन्युस्तन्मे क्षेमतरं भवेत्।।1.46।।

yadi mām apratīkāram aśhastraṁ śhastra-pāṇayaḥ dhārtarāṣhṭrā raṇe hanyus tan me kṣhemataraṁ bhavet

yadi—if; mām—me; apratīkāram—unresisting; aśhastram—unarmed; śhastra-pāṇayaḥ—those with weapons in hand; dhārtarāṣhṭrāḥ—the sons of Dhritarashtra; raṇe—on the battlefield; hanyuḥ—shall kill; tat—that; me—to me; kṣhema-taram—better; bhavet—would be

Translation
If the sons of Dhritarashtra, with weapons in hand, should slay me in battle, unresisting and unarmed, that would be better for me.

Commentary
1.46 यदि if? माम् me? अप्रतीकारम् unresisting? अशस्त्रम् unarmed? शस्त्रपाणयः with weapons in hand? धार्तराष्ट्राः the sons of Dhritarashtra? रणे in the battle हन्युः should slay? तत् that? मे of me? क्षेमतरम् better? भवेत् would be.No Commentary.

`,
bhagavad_gita_chapter_1_verse_47: `Bhagavad Gita Chapter 1, Verse 47:

सञ्जय उवाच एवमुक्त्वाऽर्जुनः संख्ये रथोपस्थ उपाविशत्। विसृज्य सशरं चापं शोकसंविग्नमानसः।।1.47।।

sañjaya uvācha evam uktvārjunaḥ saṅkhye rathopastha upāviśhat visṛijya sa-śharaṁ chāpaṁ śhoka-saṁvigna-mānasaḥ

sañjayaḥ uvācha—Sanjay said; evam uktvā—speaking thus; arjunaḥ—Arjun; saṅkhye—in the battlefield; ratha upasthe—on the chariot; upāviśhat—sat; visṛijya—casting aside; sa-śharam—along with arrows; chāpam—the bow; śhoka—with grief; saṁvigna—distressed; mānasaḥ—mind

Translation
Sanjaya said, Having thus spoken in the midst of the battlefield, Arjuna cast away his bow and arrow and, his mind overwhelmed with sorrow, sat down on the seat of the chariot.

Commentary
1.47 एवम् thus? उक्त्वा having said? अर्जुनः Arjuna? संख्ये in the battle? रथोपस्थे on the seat of the chariot? उपाविशत् sat down? विसृज्य having cast away? सशरम् with arrow? चापम् bow? शोकसंविग्नमानसः with a mind distressed with sorrow.Thus in the Upanishads of the glorious Bhagavad Gita? the science of the Eternal? the scripture of Yoga? the dialogue between Sri Krishna and Arjuna? ends the first discourse entitledThe Yoga of the Despondency of Arjuna.

`,












  };

  return templates[templateName] || "Template not found.";
}

function getNextTemplate(template_name: string, lang:string) {
  if(lang == 'en') {
    let templates : Record<string, string> = {
      first_message_on_subscription: "ganapati_welcome",
      namaste_first_message: "ganapati_welcome",
      namaste_with_book_intro: "ganapati_welcome",
      reply_first_message: "ganapati_welcome",
      ganapati_welcome: "bhagavad_gita_chapter_1_verse_1",
    };
    for (let i = 1; i <= 47; i++) {
        const currentVerse = `bhagavad_gita_chapter_1_verse_${i}`;
        const nextVerse = `bhagavad_gita_chapter_1_verse_${i + 1}`;
        templates[currentVerse] = nextVerse;
    }
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
      bhagavad_gita_chapter_1_verse_20: "bhagavad_gita_chapter_1_verse_21",
      bhagavad_gita_chapter_1_verse_21: "bhagavad_gita_chapter_1_verse_22",
      bhagavad_gita_chapter_1_verse_22: "bhagavad_gita_chapter_1_verse_23",
      bhagavad_gita_chapter_1_verse_23: "bhagavad_gita_chapter_1_verse_24",
      bhagavad_gita_chapter_1_verse_24: "bhagavad_gita_chapter_1_verse_25",
      bhagavad_gita_chapter_1_verse_25: "bhagavad_gita_chapter_1_verse_26",
      bhagavad_gita_chapter_1_verse_26: "bhagavad_gita_chapter_1_verse_27",
      bhagavad_gita_chapter_1_verse_27: "bhagavad_gita_chapter_1_verse_28",
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
      const dayAgo: Date = new Date(current_time.getTime() - 24 * 60 * 60 * 1000);
      if(row.phoneNumber) {
        continue;
      }

      if (!row.lastsenttime || lastSentTime < dayAgo) {
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
        const url = "https://nest.messagebird.com/workspaces/e911edd7-3d66-48b4-9230-01bb55168b90/channels/3e56e945-c566-4527-a247-743f42ec4abe/messages";
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
