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
    bhagavad_gita_chapter_2_verse_1: `Bhagavad Gita Chapter 2, Verse 1
      
    सञ्जय उवाच तं तथा कृपयाऽविष्टमश्रुपूर्णाकुलेक्षणम्। विषीदन्तमिदं वाक्यमुवाच मधुसूदनः।।2.1।।
    
    sañjaya uvācha taṁ tathā kṛipayāviṣhṭamaśhru pūrṇākulekṣhaṇam viṣhīdantamidaṁ vākyam uvācha madhusūdanaḥ
    
    sañjayaḥ uvācha—Sanjay said; tam—to him (Arjun); tathā—thus; kṛipayā—with pity; āviṣhṭam—overwhelmed; aśhru-pūrṇa—full of tears; ākula—distressed; īkṣhaṇam—eyes; viṣhīdantam—grief-stricken; idam—these; vākyam—words; uvācha—said; madhusūdanaḥ—Shree Krishn, slayer of the Madhu demon
    
    Translation
    Sanjaya said: To him, who was thus overcome with pity, despondent, with eyes full of tears and agitated, Madhusudana (the destroyer of Madhu) or Krishna spoke these words.
    
    Commentary
    2.1 तम् to him? तथा thus? कृपया with pity? आविष्टम् overcome? अश्रुपूर्णाकुलेक्षणम् with eyes filled with tears and agitated? विषीदन्तम् despondent? इदम् this? वाक्यम् speech? उवाच spoke? मघुसूदनः Madhusudana.No commentary.`,
          bhagavad_gita_chapter_2_verse_2: `BG 2.2
          
    श्री भगवानुवाच कुतस्त्वा कश्मलमिदं विषमे समुपस्थितम्। अनार्यजुष्टमस्वर्ग्यमकीर्तिकरमर्जुन।।2.2।।
    
    śhrī bhagavān uvācha kutastvā kaśhmalamidaṁ viṣhame samupasthitam anārya-juṣhṭamaswargyam akīrti-karam arjuna
    
    śhrī-bhagavān uvācha—the Supreme Lord said; kutaḥ—wherefrom; tvā—to you; kaśhmalam—delusion; idam—this; viṣhame—in this hour of peril; samupasthitam—overcome; anārya—crude person; juṣhṭam—practiced; aswargyam—which does not lead to the higher abodes; akīrti-karam—leading to disgrace; arjuna—Arjun
    
    Translation
    The Blessed Lord said, "From whence has this perilous strait come upon you, this dejection which is unworthy of you, disgraceful, and which will close the gates of heaven upon you, O Arjuna?"
    
    Commentary
    2.2 कुतः whence? त्वा upon thee? कश्मलम् dejection? इदम् this? विषमे in perilous strait? समुपस्थितम् comes? अनार्यजुष्टम् unworthy (unaryanlike)? अस्वर्ग्यम् heavenexcluding? अकीर्तिकरम् disgraceful? अर्जुन O Arjuna.No commentary.`,
          bhagavad_gita_chapter_2_verse_3: `BG 2.3
    क्लैब्यं मा स्म गमः पार्थ नैतत्त्वय्युपपद्यते। क्षुद्रं हृदयदौर्बल्यं त्यक्त्वोत्तिष्ठ परन्तप।।2.3।।
    
    klaibyaṁ mā sma gamaḥ pārtha naitat tvayyupapadyate kṣhudraṁ hṛidaya-daurbalyaṁ tyaktvottiṣhṭha parantapa
    
    klaibyam—unmanliness; mā sma—do not; gamaḥ—yield to; pārtha—Arjun, the son of Pritha; na—not; etat—this; tvayi—to you; upapadyate—befitting; kṣhudram—petty; hṛidaya—heart; daurbalyam—weakness; tyaktvā—giving up; uttiṣhṭha—arise; param-tapa—conqueror of enemies
    
    Translation
    Do not yield to impotence, O Arjuna, son of Pritha. It does not befit you. Cast off this mean weakness of the heart! Stand up, O conqueror of foes!
    
    Commentary
    2.3 क्लैब्यम् impotence? मा स्म गमः do not get? पार्थ O Partha? न not? एतत् this? त्वयि in thee? उपपद्यते is fitting? क्षुद्रम् mean? हृदयदौर्बल्यम् weakness of the heart? त्यक्त्वा having abandoned? उत्तिष्ठ stand up? परन्तप O scorcher of the foes.No commentary.`,
          bhagavad_gita_chapter_2_verse_4: `BG 2.4
    अर्जुन उवाच कथं भीष्ममहं संख्ये द्रोणं च मधुसूदन। इषुभिः प्रतियोत्स्यामि पूजार्हावरिसूदन।।2.4।।
    
    arjuna uvācha kathaṁ bhīṣhmam ahaṁ sankhye droṇaṁ cha madhusūdana iṣhubhiḥ pratiyotsyāmi pūjārhāvari-sūdana
    
    arjunaḥ uvācha—Arjun said; katham—how; bhīṣhmam—Bheeshma; aham—I; sankhye—in battle; droṇam—Dronacharya; cha—and; madhu-sūdana—Shree Krishn, slayer of the Madhu demon; iṣhubhiḥ—with arrows; pratiyotsyāmi—shall I shoot; pūjā-arhau—worthy of worship; ari-sūdana—destroyer of enemies
    
    Translation
    Arjuna said, "O Madhusudana, how can I fight in battle with arrows against Bhishma and Drona, who are worthy of being worshipped, O destroyer of enemies?"
    
    Commentary
    2.4 कथम् how? भीष्मम् Bhishma? अहम् I? संख्ये in battle? द्रोणम् Drona? च and? मधुसूदन O Madhusudana? इषुभिः with arrows? प्रतियोत्स्यामि shall fight? पूजार्हौ worthy to be worshipped? अरिसूदन O destroyer of enemies.No commentary.`,
          bhagavad_gita_chapter_2_verse_5: `BG 2.5
    गुरूनहत्वा हि महानुभावान् श्रेयो भोक्तुं भैक्ष्यमपीह लोके। हत्वार्थकामांस्तु गुरूनिहैव भुञ्जीय भोगान् रुधिरप्रदिग्धान्।।2.5।।
    
    gurūnahatvā hi mahānubhāvān śhreyo bhoktuṁ bhaikṣhyamapīha loke hatvārtha-kāmāṁstu gurūnihaiva bhuñjīya bhogān rudhira-pradigdhān
    
    gurūn—teachers; ahatvā—not killing; hi—certainly; mahā-anubhāvān—noble elders; śhreyaḥ—better; bhoktum—to enjoy life; bhaikṣhyam—by begging; api—even; iha loke—in this world; hatvā—killing; artha—gain; kāmān—desiring; tu—but; gurūn—noble elders; iha—in this world; eva—certainly; bhuñjīya—enjoy; bhogān—pleasures; rudhira—blood; pradigdhān—tainted with
    
    Translation
    Better it is, indeed, in this world to accept alms than to slay the most noble teachers. But if I were to kill them, even in this world, all my enjoyments of wealth and fulfilled desires would be stained with their blood.
    
    Commentary
    2.5 गुरून् the Gurus (teachers)? अहत्वा instead of slaying? हि indeed? महानुभावान् most noble? श्रेयः better? भोक्तुम् to eat? भैक्ष्यम् alms? अपि even? इह here? लोके in the world? हत्वा having slain? अर्थकामान् desirous of wealth? तु indeed? गुरून् Gurus? इह here? एव also? भुञ्जीय enjoy? भोगान् enjoyments? रुधिरप्रदिग्धान् stained with blood.No commentary.`,
          bhagavad_gita_chapter_2_verse_6: `BG 2.6
    न चैतद्विद्मः कतरन्नो गरीयो यद्वा जयेम यदि वा नो जयेयुः। यानेव हत्वा न जिजीविषाम स्तेऽवस्थिताः प्रमुखे धार्तराष्ट्राः।।2.6।।
    
    na chaitadvidmaḥ kataranno garīyo yadvā jayema yadi vā no jayeyuḥ yāneva hatvā na jijīviṣhāmas te ’vasthitāḥ pramukhe dhārtarāṣhṭrāḥ
    
    na—not; cha—and; etat—this; vidmaḥ—we know; katarat—which; naḥ—for us; garīyaḥ—is preferable; yat vā—whether; jayema—we may conquer; yadi—if; vā—or; naḥ—us; jayeyuḥ—they may conquer; yān—whom; eva—certainly; hatvā—after killing; na—not; jijīviṣhāmaḥ—we desire to live; te—they; avasthitāḥ—are standing; pramukhe—before us; dhārtarāṣhṭrāḥ—the sons of Dhritarashtra
    
    Translation
    I can hardly tell which would be better, that we should conquer them or that they should conquer us. Even the sons of Dhritarashtra, whom we do not wish to slay, stand facing us.
    
    Commentary
    2.6 न not? च and? एतत् this? विद्मः (we) know? कतरत् which? नः for us? गरीयः better? यत् that? वा or? जयेम we should coner? यदि if? वा or? नः us? जयेयुः they should coner? यान् whom? एव even? हत्वा having slain? न not? जिजीविषामः we wish to live? ते those? अवस्थिताः (are) standing? प्रमुखे in face? धार्तराष्ट्राः sons of Dhritarashtra.No commentary.`,
          bhagavad_gita_chapter_2_verse_7: `BG 2.7
          
    कार्पण्यदोषोपहतस्वभावः पृच्छामि त्वां धर्मसंमूढचेताः। यच्छ्रेयः स्यान्निश्िचतं ब्रूहि तन्मे शिष्यस्तेऽहं शाधि मां त्वां प्रपन्नम्।।2.7।।
    
    kārpaṇya-doṣhopahata-svabhāvaḥ pṛichchhāmi tvāṁ dharma-sammūḍha-chetāḥ yach-chhreyaḥ syānniśhchitaṁ brūhi tanme śhiṣhyaste ’haṁ śhādhi māṁ tvāṁ prapannam
    
    kārpaṇya-doṣha—the flaw of cowardice; upahata—besieged; sva-bhāvaḥ—nature; pṛichchhāmi—I am asking; tvām—to you; dharma—duty; sammūḍha—confused; chetāḥ—in heart; yat—what; śhreyaḥ—best; syāt—may be; niśhchitam—decisively; brūhi—tell; tat—that; me—to me; śhiṣhyaḥ—disciple; te—your; aham—I; śhādhi—please instruct; mām—me; tvām—unto you; prapannam—surrendered
    
    Translation
    My heart is overpowered by the taint of pity; my mind is confused as to my duty. I ask Thee: Tell me decisively what is good for me. I am Thy disciple; instruct me, who has taken refuge in Thee.
    
    Commentary
    2.7 कार्पण्यदोषोपहतस्वभावः with nature overpowered by the taint of pity? पृच्छामि I ask? त्वाम् Thee? धर्मसंमूढचेताः with a mind in confusion about duty? यत् which? श्रेयः good? स्यात् may be? निश्चितम् decisively? ब्रूहि say? तत् that? मे for me? शिष्यः disciple? ते Thy? अहम् I? शाधि teach? माम् me? त्वाम् to Thee? प्रपन्नम् taken refuge.No commentary.`,
          bhagavad_gita_chapter_2_verse_8: `BG 2.8
          
    न हि प्रपश्यामि ममापनुद्या द्यच्छोकमुच्छोषणमिन्द्रियाणाम्। अवाप्य भूमावसपत्नमृद्धम् राज्यं सुराणामपि चाधिपत्यम्।।2.8।।
    
    na hi prapaśhyāmi mamāpanudyād yach-chhokam uchchhoṣhaṇam-indriyāṇām avāpya bhūmāv-asapatnamṛiddhaṁ rājyaṁ surāṇāmapi chādhipatyam
    
    na—not; hi—certainly; prapaśhyāmi—I see; mama—my; apanudyāt—drive away; yat—which; śhokam—anguish; uchchhoṣhaṇam—is drying up; indriyāṇām—of the senses; avāpya—after achieving; bhūmau—on the earth; asapatnam—unrivalled; ṛiddham—prosperous; rājyam—kingdom; surāṇām—like the celestial gods; api—even; cha—also; ādhipatyam—sovereignty
    
    Translation
    I do not see that this sorrow that burns up my senses would be removed, even if I were to attain prosperous and unrivaled dominion on earth or lordship over the gods.
    
    Commentary
    2.8 न हि not? प्रपश्यामि I see? मम my? अपनुद्यात् would remove? यत् that? शोकम् grief? उच्छोषणम् drying up? इन्द्रियाणाम् of my senses? अवाप्य having obtained? भूमौ on the earth? असपत्नम् unrivalled? ऋद्धम् prosperous? राज्यम् dominion? सुराणाम् over the gods? अपि even? च and? आधिपत्यम् lordship.No commentary.`,
          bhagavad_gita_chapter_2_verse_9: `BG 2.9
    सञ्जय उवाच एवमुक्त्वा हृषीकेशं गुडाकेशः परन्तप। न योत्स्य इति गोविन्दमुक्त्वा तूष्णीं बभूव ह।।2.9।।
    
    sañjaya uvācha evam-uktvā hṛiṣhīkeśhaṁ guḍākeśhaḥ parantapa na yotsya iti govindam uktvā tūṣhṇīṁ babhūva ha
    
    sañjayaḥ uvācha—Sanjay said; evam—thus; uktvā—having spoken; hṛiṣhīkeśham—to Shree Krishna, the master of the mind and senses; guḍākeśhaḥ—Arjun, the conquerer of sleep; parantapaḥ—Arjun, the chastiser of the enemies; na yotsye—I shall not fight; iti—thus; govindam—Krishna, the giver of pleasure to the senses; uktvā—having addressed; tūṣhṇīm—silent; babhūva—became ha
    
    Translation
    Sanjaya said: Having spoken thus to Hrishikesha, the Lord of the senses, Arjuna, the conqueror of sleep and destroyer of foes, said, "I will not fight," and became silent.
    
    Commentary
    2.9 एवम् thus? उक्त्वा having spoken? हृषीकेशम् to Hrishikesha? गुडाकेशः Arjuna (the coneror of sleep)? परन्तप destroyer of foes? न योत्स्ये I will not fight? इति thus? गोविन्दम् to Govinda? उक्त्वा having said? तूष्णीम् silent? बभूव ह became.No commentary.`,
          bhagavad_gita_chapter_2_verse_10: `BG 2.10
    तमुवाच हृषीकेशः प्रहसन्निव भारत। सेनयोरुभयोर्मध्ये विषीदन्तमिदं वचः।।2.10।।
    
    tam-uvācha hṛiṣhīkeśhaḥ prahasanniva bhārata senayorubhayor-madhye viṣhīdantam-idaṁ vachaḥ
    
    tam—to him; uvācha—said; hṛiṣhīkeśhaḥ—Shree Krishna, the master of mind and senses; prahasan—smilingly; iva—as if; bhārata—Dhritarashtra, descendant of Bharat; senayoḥ—of the armies; ubhayoḥ—of both; madhye—in the midst of; viṣhīdantam—to the grief-stricken; idam—this; vachaḥ—words
    
    Translation
    To him who was despondent in the midst of the two armies, Krishna, smiling, O Bharata, spoke these words.
    
    Commentary
    2.10 तम् to him? उवाच spoke? हृषीकेशः Hrishikesha? प्रहसन् smiling? इव as it were? भारत O Bharata? सेनयोः of the armies? उभयोः (of) both? मध्ये in the middle? विषीदन्तम् despondent? इदम् this? वचः word.No commentary.`,
          bhagavad_gita_chapter_2_verse_11: `BG 2.11
          
    श्री भगवानुवाच अशोच्यानन्वशोचस्त्वं प्रज्ञावादांश्च भाषसे। गतासूनगतासूंश्च नानुशोचन्ति पण्डिताः।।2.11।।
    
    śhrī bhagavān uvācha aśhochyān-anvaśhochas-tvaṁ prajñā-vādānśh cha bhāṣhase gatāsūn-agatāsūnśh-cha nānuśhochanti paṇḍitāḥ
    
    śhrī-bhagavān uvācha—the Supreme Lord said; aśhochyān—not worthy of grief; anvaśhochaḥ—are mourning; tvam—you; prajñā-vādān—words of wisdom; cha—and; bhāṣhase—speaking; gata āsūn—the dead; agata asūn—the living; cha—and; na—never; anuśhochanti—lament; paṇḍitāḥ—the wise
    
    Translation
    The Blessed Lord said, "You have grieved for those who should not be grieved for; yet, you speak words of wisdom. The wise grieve neither for the living nor for the dead."
    
    Commentary
    2.11 अशोच्यान् those who should not be grieved for? अन्वशोचः hast grieved? त्वम् thou? प्रज्ञावादान् words of wisdom? च and? भाषसे speakest? गतासून् the dead? अगतासून् the living? च and? न अनुशोचन्ति grieve not? पण्डिताः the wise.Commentary -- The philosophy of the Gita begins from this verse.Bhishma and Drona deserve no grief because they are eternal in their real nature and they are virtuous men
    
    who possess very good conduct. Though you speak words of wisdom? you are unwise because you grieve for those who are really eternal and who deserve no grief. They who are endowed with the knowledge of the Self are wise men. They will not grieve for the living or for the dead because they know well that the Self is immortal and that It is unborn. They also know that there is no such a thing as death?
    
    that it is a separation of the astral body from the physical? that death is nothing more than a disintegration of matter and that the five elements of which the body is composed return to their source. Arjuna had forgotten the eternal nature of the Soul and the changing nature of the body. Because of his ignorance? he began to act as if the temporary relations with kinsmen? teachers? etc.? were permanent.
    
    He forgot that his relations with this world in his present life were the results of past actions. These? when exhausted? end all relationship and new ones ones crop up when one takes on another body.The result of past actions is known as karm and that portion of the karma which gave rise to the present incarnation is known as prarabdha karma.`,
          bhagavad_gita_chapter_2_verse_12: `BG 2.12
          
    न त्वेवाहं जातु नासं न त्वं नेमे जनाधिपाः। न चैव न भविष्यामः सर्वे वयमतः परम्।।2.12।।
    
    na tvevāhaṁ jātu nāsaṁ na tvaṁ neme janādhipāḥ na chaiva na bhaviṣhyāmaḥ sarve vayamataḥ param
    
    na—never; tu—however; eva—certainly; aham—I; jātu—at any time; na—nor; āsam—exist; na—nor; tvam—you; na—nor; ime—these; jana-adhipāḥ—kings; na—never; cha—also; eva—indeed; na bhaviṣhyāmaḥ—shall not exist; sarve vayam—all of us; ataḥ—from now; param—after
    
    Translation
    Nor, at any time, was I not, nor thou, nor these rulers of men; nor, verily, shall we ever cease to be hereafter.
    
    Commentary
    2.12 न not? तु indeed? एव also? अहम् I? जातु at any time? न not? आसम् was? न not? त्वम् thou? न not? इमे these? जनाधिपाः rulers of men? न not? च and? एव also? न not? भविष्यामः shall be? सर्वे all? वयम् we? अतः from this time? परम् after.Commentary -- Lord Krishna speaks here of the immortality of the Soul or the imperishable nature of the Self (Atman). The Soul exists in the three periods of time (past? present and future). Man continues to exist even after the death of the physical body. There is life beyond.`,
          bhagavad_gita_chapter_2_verse_13 : `BG 2.13
देहिनोऽस्मिन्यथा देहे कौमारं यौवनं जरा। तथा देहान्तरप्राप्तिर्धीरस्तत्र न मुह्यति।।2.13।।

dehino ’smin yathā dehe kaumāraṁ yauvanaṁ jarā tathā dehāntara-prāptir dhīras tatra na muhyati

dehinaḥ—of the embodied; asmin—in this; yathā—as; dehe—in the body; kaumāram—childhood; yauvanam—youth; jarā—old age; tathā—similarly; deha-antara—another body; prāptiḥ—achieves; dhīraḥ—the wise; tatra—thereupon; na muhyati—are not deluded

Translation
Just as the embodied soul passes through childhood, youth, and old age in this body, so too does it pass into another body; the steadfast one does not grieve over this.

Commentary
2.13 देहिनः of the embodied (soul)? अस्मिन् in this? यथा as? देहे in body? कौमारम् childhood? यौवनम् youth? जरा old age? तथा so also? देहान्तरप्राप्तिः the attaining of another body? धीरः the firm? तत्र thereat? न not? मुह्यति grieves.Commentary -- Just as there is no interruption in the passing of childhood into youth and youth into old age in this body? so also there is no interruption by death

in the continuity of the ego. The Self is not dead at the termination of the stage? viz.? childhood. It is certainly not born again at the beginning of the second stage? viz.? youth. Just as the Self passes unchanged from childhood to youth and from yourth to old age? so also the Self passes unchanged from one body into,another. Therefore? the wise man is not at all distressed about it.`,
          bhagavad_gita_chapter_2_verse_14 : `BG 2.14
मात्रास्पर्शास्तु कौन्तेय शीतोष्णसुखदुःखदाः। आगमापायिनोऽनित्यास्तांस्तितिक्षस्व भारत।।2.14।।

mātrā-sparśhās tu kaunteya śhītoṣhṇa-sukha-duḥkha-dāḥ āgamāpāyino ’nityās tans-titikṣhasva bhārata

mātrā-sparśhāḥ—contact of the senses with the sense objects; tu—indeed; kaunteya—Arjun, the son of Kunti; śhīta—winter; uṣhṇa—summer; sukha—happiness; duḥkha—distress; dāḥ—give; āgama—come; apāyinaḥ—go; anityāḥ—non-permanent; tān—them; titikṣhasva—tolerate; bhārata—descendant of the Bharat

Translation
The contact of the senses with the objects, O son of Kunti, which causes heat and cold, pleasure and pain, has a beginning and an end; they are impermanent; endure them bravely, O Arjuna.

Commentary
2.14 मात्रास्पर्शाः contacts of senses with objects? तु indeed? कौन्तेय O Kaunteya (son of Kunti)? शीतोष्णसुखदुःखदाः producers of cold and heat? pleasure and pain? आगमापायिनः with beginning and end? अनित्याः impermanent? तान् them? तितिक्षस्व bear (thou)? भारत O Bharata.Commentary -- Cold is pleasant at one time and painful at another. Heat is pleasant in winter but painful in summer. The same object

that gives pleasure at one time gives pain at another time. So the sensecontacts that give rise to the sensations of heat and cold? pleasure and pain come and go. Therefore? they are impermanent in nature. The objects come in contact with the senses or the Indriyas? viz.? skin? ear? eye? nose? etc.? and the sensations are carried by the nerves to the mind which has its seat in the brain. It is the mind that feels pleasure and pain. One should try to bear patiently heat and cold? pleasure and pain and develop a balanced state of mind. (Cf.V.22)`,
          bhagavad_gita_chapter_2_verse_15 : `BG 2.15
यं हि न व्यथयन्त्येते पुरुषं पुरुषर्षभ। समदुःखसुखं धीरं सोऽमृतत्वाय कल्पते।।2.15।।

yaṁ hi na vyathayantyete puruṣhaṁ puruṣharṣhabha sama-duḥkha-sukhaṁ dhīraṁ so ’mṛitatvāya kalpate

yam—whom; hi—verily; na—not; vyathayanti—distressed; ete—these; puruṣham—person; puruṣha-ṛiṣhabha—the noblest amongst men, Arjun; sama—equipoised; duḥkha—distress; sukham—happiness; dhīram—steady; saḥ—that person; amṛitatvāya—for liberation; kalpate—becomes eligible

Translation
That firm man, whom surely these afflictions do not, O chief among men, to whom pleasure and pain are the same, is fit for attaining immortality.

Commentary
2.15 यम् whom? हि surely? न व्यथयन्ति afflict not? एते these? पुरुषम् man? पुरुषर्षभ chief among men? समदुःखसुखम् same in pleasure and pain? धीरम् firm man? सः he? अमृतत्वाय for immortality? कल्पते is fit.Commentary -- Dehadhyasa or identification of the Self with the body is the cause of pleasure and pain. The more you are able to identify yourself with the immortal? allpervading Self? the less will

you be affected by the pairs of opposites (Dvandvas? pleasure and pain? etc.)Titiksha or the power of endurance develops the willpower. Calm endurance in pleasure and pain? and heat and cold is one of the alifications of an aspirant on the path of Jnana Yoga. It is one of the Shatsampat or sixfold virtues. It is a condition of right knowledge. Titiksha by itself cannot give you Moksha or liberation?

but still? when coupled with discrimination and dispassion? it becomes a means to the attainment of Immortality or knowledge of the Self. (Cf.XVII.53)`,
          bhagavad_gita_chapter_2_verse_16 : `BG 2.16
नासतो विद्यते भावो नाभावो विद्यते सतः। उभयोरपि दृष्टोऽन्तस्त्वनयोस्तत्त्वदर्शिभिः।।2.16।।

nāsato vidyate bhāvo nābhāvo vidyate sataḥ ubhayorapi dṛiṣhṭo ’nta stvanayos tattva-darśhibhiḥ

na—no; asataḥ—of the temporary; vidyate—there is; bhāvaḥ—is; na—no; abhāvaḥ—cessation; vidyate—is; sataḥ—of the eternal; ubhayoḥ—of the two; api—also; dṛiṣhṭaḥ—observed; antaḥ—conclusion; tu—verily; anayoḥ—of these; tattva—of the truth; darśhibhiḥ—by the seers

Translation
The unreal has no being; there is no non-being of the real; the truth about both has been seen by the knowers of the truth (or the seers of the essence).

Commentary
2.16 न not? असतः of the unreal? विद्यते is? भावः being? न not? अभावः nonbeing? विद्यते is? सतः of the real? उभयोः of the two? अपि also? दृष्टः (has been) seen? अन्तः the final truth? तु indeed? अनयोः of these? तत्त्वदर्शिभिः by the knowers of the Truth.Commentary -- The changeless? homogeneous Atman or the Self always exists. It is the only solid Reality. This phenomenal world of names and forms is

ever changing. Hence it is unreal. The sage or the Jivanmukta is fully aware that the Self always exists and that this world is like a mirage. Through his Jnanachakshus or the eye of intuition? he directly cognises the Self. This world vanishes for him like the snake in the rope? after it has been seen that only the rope exists. He rejects the names and forms and takes the underlying Essence in all

the names and forms? viz.? AstiBhatiPriya or Satchidananda or ExistenceKnowledgeBliss Absolute. Hence he is a Tattvadarshi or a knower of the Truth or the Essence.What is changing must be unreal. What is constant or permanent must be real.`,
          bhagavad_gita_chapter_2_verse_17 : `BG 2.17
अविनाशि तु तद्विद्धि येन सर्वमिदं ततम्। विनाशमव्ययस्यास्य न कश्चित् कर्तुमर्हति।।2.17।।

avināśhi tu tadviddhi yena sarvam idaṁ tatam vināśham avyayasyāsya na kaśhchit kartum arhati

avināśhi—indestructible; tu—indeed; tat—that; viddhi—know; yena—by whom; sarvam—entire; idam—this; tatam—pervaded; vināśham—destruction; avyayasya—of the imperishable; asya—of it; na kaśhchit—no one; kartum—to cause; arhati—is able

Translation
Know that to be indestructible, by which all this is pervaded. No one can cause the destruction of that, the Imperishable.`,
          bhagavad_gita_chapter_2_verse_18 : `BG 2.18
अन्तवन्त इमे देहा नित्यस्योक्ताः शरीरिणः। अनाशिनोऽप्रमेयस्य तस्माद्युध्यस्व भारत।।2.18।।

antavanta ime dehā nityasyoktāḥ śharīriṇaḥ anāśhino ’prameyasya tasmād yudhyasva bhārata

anta-vantaḥ—having an end; ime—these; dehāḥ—material bodies; nityasya—eternally; uktāḥ—are said; śharīriṇaḥ—of the embodied soul; anāśhinaḥ—indestructible; aprameyasya—immeasurable; tasmāt—therefore; yudhyasva—fight; bhārata—descendant of Bharat, Arjun

Translation
These bodies of the embodied Self, which are eternal, indestructible, and immeasurable, are said to have an end. Therefore, fight, O Arjuna.

Commentary
2.18 अन्तवन्तः having an end? इमे these? देहाः bodies? नित्यस्य of the everlasting? उक्ताः are said? शरीरिणः of the embodied? अनाशिनः of the indestructible? अप्रमेयस्य of the immesaurable? तस्मात् therefore? युध्यस्व fight? भारत O Bharata.Commentary -- Lord Krishna explains to Arjuna the nature of the allpervading? immortal Self in a variety of ways and thus induces him to fight by removing his delusion? grief and despondency which are born of ignorance.`,
          bhagavad_gita_chapter_2_verse_19 : `BG 2.19
य एनं वेत्ति हन्तारं यश्चैनं मन्यते हतम्। उभौ तौ न विजानीतो नायं हन्ति न हन्यते।।2.19।।

ya enaṁ vetti hantāraṁ yaśh chainaṁ manyate hatam ubhau tau na vijānīto nāyaṁ hanti na hanyate

yaḥ—one who; enam—this; vetti—knows; hantāram—the slayer; yaḥ—one who; cha—and; enam—this; manyate—thinks; hatam—slain; ubhau—both; tau—they; na—not; vijānītaḥ—in knowledge; na—neither; ayam—this; hanti—slays; na—nor; hanyate—is killed

Translation
He who takes the Self to be the slayer and he who thinks it is slain, neither of them knows. It does not slay, nor is it slain.

Commentary
2.19 यः he who? एनम् this (Self)? वेत्ति knows? हन्तारम् slayer? यः he who? च and? एनम् this? मन्यते thinks? हतम् slain? उभौ both? तौ those? न not? विजानीतः know? न not? अयम् this? हन्ति slays? न not? हन्यते is slain.Commentary -- The Self is nondoer (Akarta) and as It is immutable? It is neither the agent nor the object of the act of slaying. He who thinks I slay or I am slain with the body or the

Ahamkara (ego)? he does not really comprehend the true nature of the Self. The Self is indestructible. It exists in the three periods of time. It is Sat (Existence). When the body is destroyed? the Self is not destroyed. The body has to undergo change in any case. It is inevitable. But the Self is not at all affected by it. Verses 19? 20? 21? 23 and 24 speak of the immortality of the Self or Atman. (Cf.XVIII.17)

`,
          bhagavad_gita_chapter_2_verse_20 : `BG 2.20
न जायते म्रियते वा कदाचि न्नायं भूत्वा भविता वा न भूयः। अजो नित्यः शाश्वतोऽयं पुराणो न हन्यते हन्यमाने शरीरे।।2.20।।

na jāyate mriyate vā kadāchin nāyaṁ bhūtvā bhavitā vā na bhūyaḥ ajo nityaḥ śhāśhvato ’yaṁ purāṇo na hanyate hanyamāne śharīre

na jāyate—is not born; mriyate—dies; vā—or; kadāchit—at any time; na—not; ayam—this; bhūtvā—having once existed; bhavitā—will be; vā—or; na—not; bhūyaḥ—further; ajaḥ—unborn; nityaḥ—eternal; śhāśhvataḥ—immortal; ayam—this; purāṇaḥ—the ancient; na hanyate—is not destroyed; hanyamāne—is destroyed; śharīre—when the body

Translation
It is not born, nor does it ever die; after having been, it again does not cease to be; unborn, eternal, changeless, and ancient, it is not killed when the body is killed.

Commentary
2.20 न not? जायते is born? म्रियते dies? वा or? कदाचित् at any time? न not? अयम् this (Self)? भूत्वा having been? भविता will be? वा or? न not? भूयः (any) more? अजः unborn? नित्यः eternal? शाश्वतः changeless? अयम् this? पुराणः ancient? न not? हन्यते is killed? हन्यमाने being killed? शरीरे in body.Commentary This Self (Atman) is destitute of the six types of transformation or BhavaVikaras such as birth?

existence? growth? transformation? decline and death. As It is indivisible (Akhanda). It does not diminish in size. It neither grows nor does It decline. It is ever the same. Birth and death are for the physical body only. Birth and death cannot touch the immortal? allpervading Self.`,
          bhagavad_gita_chapter_2_verse_21 : `BG 2.21
वेदाविनाशिनं नित्यं य एनमजमव्ययम्। कथं स पुरुषः पार्थ कं घातयति हन्ति कम्।।2.21।।

vedāvināśhinaṁ nityaṁ ya enam ajam avyayam kathaṁ sa puruṣhaḥ pārtha kaṁ ghātayati hanti kam

veda—knows; avināśhinam—imperishable; nityam—eternal; yaḥ—who; enam—this; ajam—unborn; avyayam—immutable; katham—how; saḥ—that; puruṣhaḥ—person; pārtha—Parth; kam—whom; ghātayati—causes to be killed; hanti—kills; kam—whom

Translation
Whoever knows it to be indestructible, eternal, unborn, and inexhaustible, how can that person slay, O Arjuna, or cause to be slain?

Commentary
2.21 वेद knows? अविनाशिनम् indestructible? नित्यम् eternal? यः who? एनम् this (Self)? अजम् unborn? अव्ययम् inexhaustible? कथम् how? सः he (that)? पुरुषः man? पार्थ O Partha (son of Pritha)? कम् whom? घातयति causes to be slain? हन्ति kills? कम् whom.Commentary The enlightened sage who knows the immutable and indestructible Self through direct cognition or spiritual Anubhava (experience) cannot do the act of slaying. He cannot cause another to slay also.`,
          bhagavad_gita_chapter_2_verse_22 : `BG 2.22
वासांसि जीर्णानि यथा विहाय नवानि गृह्णाति नरोऽपराणि। तथा शरीराणि विहाय जीर्णा न्यन्यानि संयाति नवानि देही।।2.22।।

vāsānsi jīrṇāni yathā vihāya navāni gṛihṇāti naro ’parāṇi tathā śharīrāṇi vihāya jīrṇānya nyāni sanyāti navāni dehī

vāsānsi—garments; jīrṇāni—worn-out; yathā—as; vihāya—sheds; navāni—new; gṛihṇāti—accepts; naraḥ—a person; aparāṇi—others; tathā—likewise; śharīrāṇi—bodies; vihāya—casting off; jirṇāni—worn-out; anyāni—other; sanyāti—enters; navāni—new; dehī—the embodied soul

Translation
Just as a man casts off worn-out clothes and puts on new ones, so too the embodied Self casts off worn-out bodies and enters others that are new.

Commentary
2.22 वासांसि clothes? जीर्णानि worn out? यथा as? विहाय having cast away? नवानि new? गृह्णाति takes? नरः man? अपराणि others? तथा so? शरीराणि bodies? विहाय having cast away? जीर्णानि wornout? अन्यानि others? संयाति enters? नवानि new? देही the embodied (one).No commentary.`,
          bhagavad_gita_chapter_2_verse_23 : `BG 2.23
नैनं छिन्दन्ति शस्त्राणि नैनं दहति पावकः। न चैनं क्लेदयन्त्यापो न शोषयति मारुतः।।2.23।।

nainaṁ chhindanti śhastrāṇi nainaṁ dahati pāvakaḥ na chainaṁ kledayantyāpo na śhoṣhayati mārutaḥ

na—not; enam—this soul; chhindanti—shred; śhastrāṇi—weapons; na—nor; enam—this soul; dahati—burns; pāvakaḥ—fire; na—not; cha—and; enam—this soul; kledayanti—moisten; āpaḥ—water; na—nor; śhoṣhayati—dry; mārutaḥ—wind

Translation
Weapons cannot cut it, fire cannot burn it, water cannot wet it, wind cannot dry it.

Commentary
2.23 न not? एनम् this (Self)? छिन्दन्ति cut? शस्त्राणि weapons? न not? एनम् this? दहति burns? पावकः fire? न not?,च and? एनम् this? क्लेदयन्ति wet? आपः waters? न not? शोषयति dries? मारुतः wind.Commentary The Self is indivisible. It has no parts. It is extremely subtle. It is infinite. Therefore? sword cannot cut It fire cannot burn It water cannot wet It wind cannot dry It.`,
          bhagavad_gita_chapter_2_verse_24 : `BG 2.24
अच्छेद्योऽयमदाह्योऽयमक्लेद्योऽशोष्य एव च। नित्यः सर्वगतः स्थाणुरचलोऽयं सनातनः।।2.24।।

achchhedyo ’yam adāhyo ’yam akledyo ’śhoṣhya eva cha nityaḥ sarva-gataḥ sthāṇur achalo ’yaṁ sanātanaḥ

achchhedyaḥ—unbreakable; ayam—this soul; adāhyaḥ—incombustible; ayam—this soul; akledyaḥ—cannot be dampened; aśhoṣhyaḥ—cannot be dried; eva—indeed; cha—and; nityaḥ—everlasting; sarva-gataḥ—all-pervading; sthāṇuḥ—unalterable; achalaḥ—immutable; ayam—this soul; sanātanaḥ—primordial

Translation
This Self cannot be cut, burned, wetted, nor dried up; it is eternal, all-pervasive, stable, immovable, and ancient.

Commentary
2.24 अच्छेद्यः cannot be cut? अयम् this (Self)? अदाह्यः cannot be burnt? अयम् this? अक्लेद्यः cannot be wetted? अशोष्यः cannot be died? एव also? च and? नित्यः eternal? सर्वगतः allpervading? स्थाणुः stable? अचलः immovable? अयम् this? सनातनः ancient.Commentary The Self is very subtle. It is beyond the reach of speech and mind. It is very difficult to understand this subtle Self. So Lord Krishna explains

the nature of the immortal Self in a variety of ways with various illustrations and examples? so that It can be grasped by the people.Sword cannot cut this Self. It is eternal. Because It is eternal? It is allpervading. Because It is allpervading? It is stable like a stature. Because It is stable? It is immovable. It is everlasting. Therefore? It is not produced out of any cause. It is not new. It is ancient.`,
          bhagavad_gita_chapter_2_verse_25 : `BG 2.25
अव्यक्तोऽयमचिन्त्योऽयमविकार्योऽयमुच्यते। तस्मादेवं विदित्वैनं नानुशोचितुमर्हसि।।2.25।।

avyakto ’yam achintyo ’yam avikāryo ’yam uchyate tasmādevaṁ viditvainaṁ nānuśhochitum arhasi

avyaktaḥ—unmanifested; ayam—this soul; achintyaḥ—inconceivable; ayam—this soul; avikāryaḥ—unchangeable; ayam—this soul; uchyate—is said; tasmāt—therefore; evam—thus; viditvā—having known; enam—this soul; na—not; anuśhochitum—to grieve; arhasi—befitting

Translation
This Self is said to be unmanifested, unthinkable, and unchangeable. Therefore, knowing this to be so, you should not grieve.

Commentary
2.25 अव्यक्तः unmanifested? अयम् this (Self)? अचिन्त्यः unthinkable? अयम् this? अविकार्यः unchangeable? अयम् this? उच्यते is said? तस्मात् therefore? एवम् thus? विदित्वा having known? एनम् this? न not? अनुशोचितुम् to grieve? अर्हसि (thou) oughtest.Commentary The Self is not an object of perception. It can hardly be seen by the physical eyes. Therefore? the Self is unmanifested. That which is seen

by the eyes becomes an object of thought. As the Self cannot be perceived by the eyes? It is unthinkable. Milk when mixed with buttermilk changes its form. The Self cannot change Its form like milk. Hence? It is changeless and immutable. Therefore? thus understanding the Self? thou shouldst not mourn. Thou shouldst not think also that thou art their slayer and that they are killed by thee.`,
          bhagavad_gita_chapter_2_verse_26 : `BG 2.26
अथ चैनं नित्यजातं नित्यं वा मन्यसे मृतम्। तथापि त्वं महाबाहो नैवं शोचितुमर्हसि।।2.26।।

atha chainaṁ nitya-jātaṁ nityaṁ vā manyase mṛitam tathāpi tvaṁ mahā-bāho naivaṁ śhochitum arhasi

atha—if, however; cha—and; enam—this soul; nitya-jātam—taking constant birth; nityam—always; vā—or; manyase—you think; mṛitam—dead; tathā api—even then; tvam—you; mahā-bāho—mighty-armed one, Arjun; na—not; evam—like this; śhochitum—grieve; arhasi—befitting

Translation
But even if thou thinkest of It as constantly being born and constantly dying, even then, O mighty-armed one, thou shouldst not grieve.

Commentary
2.26 अथ now? च and? एनम् this (Self)? नित्यजातम् constantly born? नित्यम् constantly? वा or? मन्यसे thinkest? मृतम् dead? तथापि even then? त्वम् thou? महाबाहो mightyarmed? न not? एवम् thus? शोचितुम् to grieve? अर्हसि (thou) oughtest.Commentary Lord Krishna here? for the sake of argument? takes up the popular supposition. Granting that the Self is again and again born whenever a body comes into being?

and again and again dies whenever the body dies? O mightyarmed (O Arjuna of great valour and strength)? thou shouldst not grieve thus? because birth is inevitable to want is dead and death is inevitable to what is born. This is the inexorable or unrelenting Law of Nature.`,
          bhagavad_gita_chapter_2_verse_27 : `BG 2.27
जातस्य हि ध्रुवो मृत्युर्ध्रुवं जन्म मृतस्य च। तस्मादपरिहार्येऽर्थे न त्वं शोचितुमर्हसि।।2.27।।

jātasya hi dhruvo mṛityur dhruvaṁ janma mṛitasya cha tasmād aparihārye ’rthe na tvaṁ śhochitum arhasi

jātasya—for one who has been born; hi—for; dhruvaḥ—certain; mṛityuḥ—death; dhruvam—certain; janma—birth; mṛitasya—for the dead; cha—and; tasmāt—therefore; aparihārye arthe—in this inevitable situation; na—not; tvam—you; śhochitum—lament; arhasi—befitting

Translation
For the born, death is certain, and for the dead, birth is certain; therefore, you should not grieve over the inevitable.

Commentary
2.27 जातस्य of the born? हि for? ध्रुवः certain? मृत्युः death? ध्रुवम् certain? जन्म birth? मृतस्य of the dead? च and? तस्मात् therefore? अपरिहार्ये inevritable? अर्थे in matter? न not? त्वम् thou? शोचितुम् to grieve? अर्हसि (thou) oughtest.Commentary Birth is sure to happen to that which is dead death is sure to happen to what which is born. Birth and death are certainly unavoidable. Therefore? you should not grieve over an inevitable matter.`,
          bhagavad_gita_chapter_2_verse_28 : `BG 2.28
अव्यक्तादीनि भूतानि व्यक्तमध्यानि भारत। अव्यक्तनिधनान्येव तत्र का परिदेवना।।2.28।।

avyaktādīni bhūtāni vyakta-madhyāni bhārata avyakta-nidhanānyeva tatra kā paridevanā

avyakta-ādīni—unmanifest before birth; bhūtāni—created beings; vyakta—manifest; madhyāni—in the middle; bhārata—Arjun, scion of Bharat; avyakta—unmanifest; nidhanāni—on death; eva—indeed; tatra—therefore; kā—why; paridevanā—grieve

Translation
Beings are unmanifest in their beginning, manifest in their middle state, O Arjuna, and unmanifest again in their end. What is there to grieve about?

Commentary
2.28 अव्यक्तादीनि unmanifested in the beginning? भूतानि beings? व्यक्तमध्यानि manifested in their middle state? भारत O Bharata? अव्यक्तनिधनानि unmanifested again in the end? एव also? तत्र there? का what? परिदेवना grief.Commentary The physical body is a combination of the five elements. It is seen by the physical eyes only after the five elements have entered into such combination. After death? the

body disintegrates and the five elements go back to their source it cannot be seen. Therefore? the body can be seen only in the middle state. The relationship as son? friend? teacher? father? mother? wife? brother and sister is formed through the body on account of attachment and Moha (delusion). Just as planks unite and separate in a river? just as pilgrims unite and separate in a public inn? so

also fathers? mothers? sons and brothers unite and separate in this world. This world is a very big public inn. People unite and separate.There is no pot in the beginning and in the end. Even if you see the pot in the middle? you should think and feel that it is illusory and does not really exist. So also there is no body in the beginning and in the end. That which does not exist in the beginning

and in the end must be illusory in the middle also. You must think and feel that the body does not really exist in the middle as well.He who thus understands the nature of the body and all human relationships based on it? will not grieve.`,
          bhagavad_gita_chapter_2_verse_29 : `BG 2.29
आश्चर्यवत्पश्यति कश्चिदेन माश्चर्यवद्वदति तथैव चान्यः। आश्चर्यवच्चैनमन्यः श्रृणोति श्रुत्वाप्येनं वेद न चैव कश्चित्।।2.29।।

āśhcharya-vat paśhyati kaśhchid enan āśhcharya-vad vadati tathaiva chānyaḥ āśhcharya-vach chainam anyaḥ śhṛiṇoti śhrutvāpyenaṁ veda na chaiva kaśhchit

āśhcharya-vat—as amazing; paśhyati—see; kaśhchit—someone; enam—this soul; āśhcharya-vat—as amazing; vadati—speak of; tathā—thus; eva—indeed; cha—and; anyaḥ—other; āśhcharya-vat—similarly amazing; cha—also; enam—this soul; anyaḥ—others; śhṛiṇoti—hear; śhrutvā—having heard; api—even; enam—this soul; veda—understand; na—not; cha—and; eva—even; kaśhchit—some

Translation
One sees this (the Self) as a wonder; another speaks of it as a wonder; another hears of it as a wonder; yet, having heard, none understands it at all.

Commentary
2.29 आश्चर्यवत् as a wonder? पश्यति sees? कश्चित् sone one? एनम् this (Self)? आश्चर्यवत् as a wonder? वदति speaks of? तथा so? एव also? च and? अन्यः another? आश्चर्यवत् as a wonder? च and? एनम् this? अन्यः another? श्रृणोति hears? श्रुत्वा having heard? अपि even? एनम् this? वेद knows? न not? च and? एव also? कश्चित् any one.Commentary The verse may also be interpreted in this manner. He that sees? hears and speaks of the Self is a wonderful man. Such a man is very rare. He is one among many thousands. Thus the Self is very hard to understand.`,
          bhagavad_gita_chapter_2_verse_30 : `BG 2.30
देही नित्यमवध्योऽयं देहे सर्वस्य भारत। तस्मात्सर्वाणि भूतानि न त्वं शोचितुमर्हसि।।2.30।।

dehī nityam avadhyo ’yaṁ dehe sarvasya bhārata tasmāt sarvāṇi bhūtāni na tvaṁ śhochitum arhasi

dehī—the soul that dwells within the body; nityam—always; avadhyaḥ—immortal; ayam—this soul; dehe—in the body; sarvasya—of everyone; bhārata—descendant of Bharat, Arjun; tasmāt—therefore; sarvāṇi—for all; bhūtāni—living entities; na—not; tvam—you; śhochitum—mourn; arhasi—should

Translation
This indweller in the body of everyone is ever indestructible, O Arjuna; therefore, you should not grieve for any creature.

Commentary
2.30 देही indweller? नित्यम् always? अवध्यः indestructible? अयम् this? देहे in the body? सर्वस्य of all? भारत O Bharata? तस्मात् therefore? सर्वाणि (for) all? भूतानि creatures? न not? त्वम् thou? शोचितुम् to grieve? अर्हसि (thou) shouldst.Commentary The body of any creature may be destroyed but the Self cannot be killed. Therefore you should not grieve regarding any creature whatever? Bhishma or anybody else.`,
          bhagavad_gita_chapter_2_verse_31 : `BG 2.31
स्वधर्ममपि चावेक्ष्य न विकम्पितुमर्हसि। धर्म्याद्धि युद्धाछ्रेयोऽन्यत्क्षत्रियस्य न विद्यते।।2.31।।

swa-dharmam api chāvekṣhya na vikampitum arhasi dharmyāddhi yuddhāch chhreyo ’nyat kṣhatriyasya na vidyate

swa-dharmam—one’s duty in accordance with the Vedas; api—also; cha—and; avekṣhya—considering; na—not; vikampitum—to waver; arhasi—should; dharmyāt—for righteousness; hi—indeed; yuddhāt—than fighting; śhreyaḥ—better; anyat—another; kṣhatriyasya—of a warrior; na—not; vidyate—exists

Translation
Further, having regard to your duty, you should not waver, for there is nothing higher for a Kshatriya than a righteous war.

Commentary
2.31 स्वधर्मम् own duty? अपि also? च and? अवेक्ष्य looking at? न not? विकम्पितुम् to waver? अर्हसि (thou) oughtest? धर्म्यात् than righteous? हि indeed? युद्धात् than war? श्रेयः higher? अन्यत् other? क्षत्रियस्य of a Kshatriya? न not? विद्यते is.Commentary Lord Krishna now gives to Arjuna wordly reasons for fighting. Up to this time? He talked to Arjuna on the immortality of the Self and gave him

philosophical reasons. Now He says to Arjuna? O Arjuna Fighting is a Kshatriyas own duty. You ought not to swerve from that duty. To a Kshatriyta (one born in the warrior or ruling class) nothing is more welcome than a righteous war. A warrior should fight.`,
          bhagavad_gita_chapter_2_verse_32 : `BG 2.32
यदृच्छया चोपपन्नं स्वर्गद्वारमपावृतम्। सुखिनः क्षत्रियाः पार्थ लभन्ते युद्धमीदृशम्।।2.32।।

yadṛichchhayā chopapannaṁ swarga-dvāram apāvṛitam sukhinaḥ kṣhatriyāḥ pārtha labhante yuddham īdṛiśham

yadṛichchhayā—unsought; cha—and; upapannam—come; swarga—celestial abodes; dvāram—door; apāvṛitam—wide open; sukhinaḥ—happy; kṣhatriyāḥ—warriors; pārtha—Arjun, the son of Pritha; labhante—obtain; yuddham—war; īdṛiśham—such

Translation
Happy are the Kshatriyas, O Arjuna! who are called to fight in such a battle that comes of its own accord as an open door to heaven.

Commentary
2.32 यदृच्छया of itself? च and? उपपन्नम् come? स्वर्गद्वारम् the gate of heaven? अपावृतम् opened? सुखिनः happy? क्षत्रियाः Kshatriyas? पार्थ O Partha? लभन्ते obtain? युद्धम् battle? ईदृशम् such.Commentary The scriptures declare that if a Kshatriya dies for a righteous cause on the battlefield? he at once goes to heaven.`,
          bhagavad_gita_chapter_2_verse_33 : `BG 2.33
अथ चैत्त्वमिमं धर्म्यं संग्रामं न करिष्यसि। ततः स्वधर्मं कीर्तिं च हित्वा पापमवाप्स्यसि।।2.33।।

atha chet tvam imaṁ dharmyaṁ saṅgrāmaṁ na kariṣhyasi tataḥ sva-dharmaṁ kīrtiṁ cha hitvā pāpam avāpsyasi

atha chet—if, however; tvam—you; imam—this; dharmyam saṅgrāmam—righteous war; na—not; kariṣhyasi—act; tataḥ—then; sva-dharmam—one’s duty in accordance with the Vedas; kīrtim—reputation; cha—and; hitvā—abandoning; pāpam—sin; avāpsyasi—will incur

Translation
But if you will not fight this righteous war, then having abandoned your own duty and reputation, you will incur sin.

Commentary
2.33 अथ चेत् but if? त्वम् thou? इमम् this? धर्म्यम् righteous? संग्रामम् warfare? न not? करिष्यसि will do? ततः,then? स्वधर्मम् own duty? कीर्तिम् fame? च and? हित्वा having abandoned? पापम् sin? अवाप्स्यसि shall incur.Commentary The Lord reminds Arjuna of the fame he had already earned and which he would now lose if he refused to fight. Arjuna had acired great fame by fighting with Lord Siva. Arjuna

proceeded on a pilgrimage to the Himalayas. He fought with Siva Who appeared in the guise of a mountaineer (Kirata) and got from Him the Pasupatastra? a celestial weapon.`,
          bhagavad_gita_chapter_2_verse_34 : `BG 2.34
अकीर्तिं चापि भूतानि कथयिष्यन्ति तेऽव्ययाम्। संभावितस्य चाकीर्तिर्मरणादतिरिच्यते।।2.34।।

akīrtiṁ chāpi bhūtāni kathayiṣhyanti te ’vyayām sambhāvitasya chākīrtir maraṇād atirichyate

akīrtim—infamy; cha—and; api—also; bhūtāni—people; kathayiṣhyanti—will speak; te—of your; avyayām—everlasting; sambhāvitasya—of a respectable person; cha—and; akīrtiḥ—infamy; maraṇāt—than death; atirichyate—is greater

Translation
People will also recount your everlasting dishonor; and for one who has been honored, dishonor is worse than death.

Commentary
2.34 अकीर्तिम् dishonour? च and? अपि also? भूतानि beings? कथयिष्यन्ति will tell? ते thy? अव्ययाम् everlasting? संभावितस्य of the honoured? च and? अकीर्तिः dishonour? मरणात् than death? अतिरिच्यते exceeds.Commentary The world also will ever recount thy infamy which will survive thee for a long time. Death is really preferable to disgrace to one who has been honoured as a great hero and mighty warrior with noble alities.`,
          bhagavad_gita_chapter_2_verse_35 : `BG 2.35
भयाद्रणादुपरतं मंस्यन्ते त्वां महारथाः। येषां च त्वं बहुमतो भूत्वा यास्यसि लाघवम्।।2.35।।

bhayād raṇād uparataṁ mansyante tvāṁ mahā-rathāḥ yeṣhāṁ cha tvaṁ bahu-mato bhūtvā yāsyasi lāghavam

bhayāt—out of fear; raṇāt—from the battlefield; uparatam—have fled; maṁsyante—will think; tvām—you; mahā-rathāḥ—warriors who could single handedly match the strength of ten thousand ordinary warriors; yeṣhām—for whom; cha—and; tvam—you; bahu-mataḥ—high esteemed; bhūtvā—having been; yāsyasi—you will loose; lāghavam—decreased in value

Translation
The great chariot-warriors will think that you have withdrawn from the battle out of fear, and you will be held in low esteem by those who have held you in high regard.

Commentary
2.35 भयात् from fear? रणात् from the battle? उपरतम् withdrawn? मंस्यन्ते will think? त्वाम् thee? महारथाः the great carwarriors? येषाम् of whom? च and? त्वम् thou? बहुमतः much thought of? भूत्वा having been? यास्यसि will receive? लाघवम् lightness.Commentary Duryodhana and others will certainly think that you have fled from the battle from fear of Karna and others? but not through compassion and reverence

for elders and teachers. Duryodhana and others who have shown great esteem to you on account of your chivalry? bravery and other noble alities? will think very lightly of you and treat you with contempt.`,
          bhagavad_gita_chapter_2_verse_36 : `BG 2.36
अवाच्यवादांश्च बहून् वदिष्यन्ति तवाहिताः। निन्दन्तस्तव सामर्थ्यं ततो दुःखतरं नु किम्।।2.36।।

avāchya-vādānśh cha bahūn vadiṣhyanti tavāhitāḥ nindantastava sāmarthyaṁ tato duḥkhataraṁ nu kim

avāchya-vādān—using harsh words; cha—and; bahūn—many; vadiṣhyanti—will say; tava—your; ahitāḥ—enemies; nindantaḥ—defame; tava—your; sāmarthyam—might; tataḥ—than that; duḥkha-taram—more painful; nu—indeed; kim—what

Translation
Your enemies, scoffing at your power, will speak many abusive words—what could be more painful than this?

Commentary
2.36 अवाच्यवादान् words that are improper to be spoken? च and? बहून् many? वदिष्यन्ति will say? तव thy? अहिताः enemies? निन्दन्तः cavilling? तव thy? सामर्थ्यम् power? ततः than this? दुःखतरम् more painful? नु indeed? किम् what.Commentary There is really no pain more unbearable and tormenting that that of slander thus incurred.`,
          bhagavad_gita_chapter_2_verse_37 : `BG 2.37
हतो वा प्राप्स्यसि स्वर्गं जित्वा वा भोक्ष्यसे महीम्। तस्मादुत्तिष्ठ कौन्तेय युद्धाय कृतनिश्चयः।।2.37।।

hato vā prāpsyasi swargaṁ jitvā vā bhokṣhyase mahīm tasmād uttiṣhṭha kaunteya yuddhāya kṛita-niśhchayaḥ

hataḥ—slain; vā—or; prāpsyasi—you will attain; swargam—celestial abodes; jitvā—by achieving victory; vā—or; bhokṣhyase—you shall enjoy; mahīm—the kingdom on earth; tasmāt—therefore; uttiṣhṭha—arise; kaunteya—Arjun, the son of Kunti; yuddhāya—for fight; kṛita-niśhchayaḥ—with determination

Translation
Slain, you will obtain heaven; victorious, you will enjoy the earth; therefore, stand up, O son of Kunti, resolved to fight.

Commentary
2.37 हतः slain? वा or? प्राप्स्यसि (thou) wilt obtain? स्वर्गम् heaven? जित्वा having conered? वा or? भोक्ष्यसे (thou) wilt enjoy? महीम् the earth? तस्मात् therefore? उत्तिष्ठ stand up? कौन्तेय O son of Kunti? युद्धाय for fight? कृतनिश्चयः resolved.Commentary In either case you will be benefited. Therefore? stand up with the firm resolution I will coner the enemy or die.`,
          bhagavad_gita_chapter_2_verse_38 : `BG 2.38
सुखदुःखे समे कृत्वा लाभालाभौ जयाजयौ। ततो युद्धाय युज्यस्व नैवं पापमवाप्स्यसि।।2.38।।

sukha-duḥkhe same kṛitvā lābhālābhau jayājayau tato yuddhāya yujyasva naivaṁ pāpam avāpsyasi

sukha—happiness; duḥkhe—in distress; same kṛitvā—treating alike; lābha-alābhau—gain and loss; jaya-ajayau—victory and defeat; tataḥ—thereafter; yuddhāya—for fighting; yujyasva—engage; na—never; evam—thus; pāpam—sin; avāpsyasi—shall incur

Translation
Having made pleasure and pain, gain and loss, victory and defeat equal, engage in battle for the sake of battle; thus, you shall not incur sin.

Commentary
2.38 सुखदुःखे pleasure and pain? समे same? कृत्वा having made? लाभालाभौ gain and loss? जयाजयौ victory and defeat? ततः then? युद्धाय for battle? युज्यस्व engage thou? न not? एवम् thus? पापम् sin? अवाप्स्यसि shalt incur.Commentary This is the Yoga of eanimity or the doctrine of poise in action. If anyone does any action with the above mental attitude or balanced state of mind he will not reap the fruits

of his action. Such an action will lead to the purification of his heart and freedom from birth and death. One has to develop such a balanced state of mind through continous struggle and vigilant efforts.`,
          bhagavad_gita_chapter_2_verse_39 : `BG 2.39
एषा तेऽभिहिता सांख्ये बुद्धिर्योगे त्विमां श्रृणु। बुद्ध्यायुक्तो यया पार्थ कर्मबन्धं प्रहास्यसि।।2.39।।

eṣhā te ’bhihitā sānkhye buddhir yoge tvimāṁ śhṛiṇu buddhyā yukto yayā pārtha karma-bandhaṁ prahāsyasi

eṣhā—hitherto; te—to you; abhihitā—explained; sānkhye—by analytical knowledge; buddhiḥ yoge—by the yog of intellect; tu—indeed; imām—this; śhṛiṇu—listen; buddhyā—by understanding; yuktaḥ—united; yayā—by which; pārtha—Arjun, the son of Pritha; karma-bandham—bondage of karma; prahāsyasi—you shall be released from

Translation
This, which has been taught to you, is wisdom concerning Sankhya. Now listen to wisdom concerning Yoga, endowed with which, O Arjuna, you shall cast off the bonds of action.

Commentary
2.39 एषा this? ते to thee? अभिहिता (is) declared? सांख्ये in Sankhya? बुद्धिः wisdom? योगे in the Yoga? तु indeed? इमाम् this? श्रृणु hear? बुद्ध्या with wisdom? युक्तः endowed with? यया which? पार्थ O Partha? कर्मबन्धम् bondage of Karma? प्रहास्यसि (thou) shalt cast off.Commentary Lord Krishna taught Jnana (knowledge) to Arjuna till now. (Sankhya Yoga is the path of Vedanta or Jnana Yoga? which treats

of the nature of the Atman or the Self and the methods to attain Selfrealisation. It is not the Sankhya philosophy of sage Kapila.) He is now giving to teach Arjuna the technie or secret of Karma Yoga endowed with which he (or anybody else) can break through the bonds of Karma. The Karma Yogi should perform work without expectation of fruits of his actions? without the idea of agency (or the notin

I do this)? without attachment? after annihilating or going beyond all the pairs of opposites such as heat and cold? gain and loss? victoyr and defeat? etc. Dharma and Adharma? or merit and demerit will not touch that Karma Yogi who works without attachment and egoism. The Karma Yogi consecrates all his works and their fruits as offerings unto the Lord (Isvararpanam) and thus obtains the grace of the Lord (Isvaraprasada).`,
          bhagavad_gita_chapter_2_verse_40 : `BG 2.40
नेहाभिक्रमनाशोऽस्ति प्रत्यवायो न विद्यते। स्वल्पमप्यस्य धर्मस्य त्रायते महतो भयात्।।2.40।।

nehābhikrama-nāśho ’sti pratyavāyo na vidyate svalpam apyasya dharmasya trāyate mahato bhayāt

na—not; iha—in this; abhikrama—efforts; nāśhaḥ—loss; asti—there is; pratyavāyaḥ—adverse result; na—not; vidyate—is; su-alpam—a little; api—even; asya—of this; dharmasya—occupation; trāyate—saves; mahataḥ—from great; bhayāt—danger

Translation
In this, there is no loss of effort, nor is there any harm produced, nor any transgression. Even a little of this knowledge protects one from great fear.

Commentary
2.40 न not? इह in this? अभिक्रमनाशः loss of effort? अस्ति is? प्रत्यवायः production of contrary results? न not? विद्यते is? स्वल्पम् very little? अपि even? अस्य of this? धर्मस्य duty? त्रायते protects? महतः (from) great? भयात् fear.Commentary If a religious ceremony is left uncompleted? it is a wastage as the performer cannot realise the fruits. But it is not so in the case of Karma Yoga because every

action causes immediate purification of the heart.In agriculture there is uncertainty. The farmer may till the land? plough and sow the seed but he may not get a crop if there is no rain. This is not so in Karma Yoga. There is no uncertainty at all. Further? there is no chance of any harm coming out of it. In the case of medical treatment great harm will result from the doctors injudicious treatment

if he uses a wrong medicine. But it is not so in the case of Karma Yoga. Anything done? however little it may be? in this path of Yoga? the Yoga of action? saves one from great fear of being caught in the wheel of birth and death. Lord Krishna here extols Karma Yoga in order to create interest in Arjuna in this Yoga.`,
          bhagavad_gita_chapter_2_verse_41 : `BG 2.41
व्यवसायात्मिका बुद्धिरेकेह कुरुनन्दन। बहुशाखा ह्यनन्ताश्च बुद्धयोऽव्यवसायिनाम्।।2.41।।

vyavasāyātmikā buddhir ekeha kuru-nandana bahu-śhākhā hyanantāśh cha buddhayo ’vyavasāyinām

vyavasāya-ātmikā—resolute; buddhiḥ—intellect; ekā—single; iha—on this path; kuru-nandana—descendent of the Kurus; bahu-śhākhāḥ—many-branched; hi—indeed; anantāḥ—endless; cha—also; buddhayaḥ—intellect; avyavasāyinām—of the irresolute

Translation
Here, O joy of the Kurus, there is only one single-pointed determination; many-branched and endless are the thoughts of the indecisive.

Commentary
2.41 व्यवसायात्मिका onepointed? बुद्धिः determination? एका single? इह here? कुरुनन्दन O joy of the Kurus? बहुशाखाः manybranched? हि indeed? अनन्ताः endless? च and? बुद्धयः thoughts? अव्यवसायिनाम् of the irresoulte.Commentary Here? in this path to Bliss there is only one thought of a resolute nature there is singleminded determination. This single thought arises from the right source of knowledge.

The student of Yoga collects all the dissipated rays of the mind. He gathers all of them through discrimination? dispassion and concentration. He is free from wavering or vacillation of the mind.The worldlyminded man who is suck in the mire of Samsara has no singleminded determination. He entertains countless thoughts. His mind is always unsteady and vacillating.If thoughts cease? Samsara also ceases.

Mind generates endless thoughts and this world comes into being. Thoughts? and names and forms are inseparable. If the thoughts are controlled? the mind is controlled and the Yogi is liberated.`,
          bhagavad_gita_chapter_2_verse_42 : `BG 2.42
यामिमां पुष्पितां वाचं प्रवदन्त्यविपश्चितः। वेदवादरताः पार्थ नान्यदस्तीति वादिनः।।2.42।।

yāmimāṁ puṣhpitāṁ vāchaṁ pravadanty-avipaśhchitaḥ veda-vāda-ratāḥ pārtha nānyad astīti vādinaḥ kāmātmānaḥ swarga-parā janma-karma-phala-pradām kriyā-viśheṣha-bahulāṁ bhogaiśhwarya-gatiṁ prati

yām imām—all these; puṣhpitām—flowery; vācham—words; pravadanti—speak; avipaśhchitaḥ—those with limited understanding; veda-vāda-ratāḥ—attached to the flowery words of the Vedas; pārtha—Arjun, the son of Pritha; na anyat—no other; asti—is; iti—thus; vādinaḥ—advocate; kāma-ātmānaḥ—desirous of sensual pleasure; swarga-parāḥ—aiming to achieve the heavenly planets; janma-karma-phala—high birth and fruitive results; pradāṁ—awarding; kriyā-viśheṣha—pompous ritualistic ceremonies; bahulām—various; bhoga—gratification; aiśhwarya—luxury; gatim—progress; prati—toward

Translation
The unwise, taking pleasure in the eulogizing words of the Vedas, utter flowery speech, saying, "There is nothing else," O Arjuna.

Commentary
2.42 याम which? इमाम् this? पुष्पिताम् flowery? वाचम् speech? प्रवदन्ति utter? अविपश्चितः the unwise? वेदवादरताः takign pleasure in the eulogising words of the Vedas? पार्थ O Partha? न not? अन्यत् other? अस्ति is? इति thus? वादिनः saying.Commentary Unwise people who are lacking in discrimination lay great stress upon the Karma Kanda or the ritualistic portion of the Vedas? which lays down specific

rules for specific actions for,the attainment of specific fruits and ectol these actions and rewards unduly. They are highly enamoured of such Vedic passages which prescribe ways for the attainment of heavenly enjoyments. They say that there is nothing else beyond the sensual enjoyments in Svarga (heaven) which can be obtained by performing the rites of the Karma Kanda of the Vedas.There are two main

divisions of the Vedas -- Karma Kanda (the section dealing with action) and Jnana Kanda (the section dealing with knowledge). The Karma Kanda comprises the Brahmanas and the Samhitas. This is the authority for the Purvamimamsa school founded by Jaimini. The followers of this school deal with rituals and prescribe many of them for attaining enjoyments and power here and happiness in heaven. They regard

this as the ultimate object of human existence. Ordinary people are attracted by their panegyrics. The Jnana Kanda comprises the Aranyakas and the Upanishads which deal with the nature of Brahman or the Supreme Self.Life in heaven is also transitory. After the fruits of the good actions are exhausted? one has to come back to this earthplane. Liberatio or Moksha can only be attained by knowledge of

the Self but not by performing a thousand and one sacrifices.Lord Krishna assigns a comparatively inferior position to the doctrine of the Mimamsakas of performing Vedic sacrifices for obtaining heaven? power and lordship in this world as they cannot give us final liberation.`,
          bhagavad_gita_chapter_2_verse_43 : `BG 2.43
कामात्मानः स्वर्गपरा जन्मकर्मफलप्रदाम्। क्रियाविशेषबहुलां भोगैश्वर्यगतिं प्रति।।2.43।।

kāmātmānaḥ svarga-parā janma-karma-phala-pradām kriyā-viśeṣa-bahulāṁ bhogaiśvarya-gatiṁ prati

kāmaātmānaḥ—desirous of sense gratification; svarga-parāḥ—aiming to achieve heavenly planets; janma-karma-phala-pradām—resulting in fruitive action, good birth, etc.; kriyā-viśeṣa—pompous ceremonies; bahulām—various; bhoga—sense enjoyment; aiśvarya—opulence; gatim—progress; prati—towards.

Translation
Full of desires, with heaven as their goal, (they speak words that are directed to ends) leading to new births as the result of their works, and prescribe various methods abounding in specific actions, for the attainment of pleasure and power.

Commentary
2.43 कामात्मानः full of desires? स्वर्गपराः with heaven as their highest goal? जन्मकर्मफलप्रदाम् leading to (new) births as the result of their works? क्रियाविशेषबहुलाम् exuberant with various specifi actions? भोगैश्वर्यगतिम् प्रति for the attainment of pleasure and lordship.No commentary.`,
          bhagavad_gita_chapter_2_verse_44 : `BG 2.44
भोगैश्वर्यप्रसक्तानां तयापहृतचेतसाम्। व्यवसायात्मिका बुद्धिः समाधौ न विधीयते।।2.44।।

bhogaiśwvarya-prasaktānāṁ tayāpahṛita-chetasām vyavasāyātmikā buddhiḥ samādhau na vidhīyate

bhoga—gratification; aiśhwarya—luxury; prasaktānām—whose minds are deeply attached; tayā—by that; apahṛita-chetasām—bewildered in intellect; vyavasāya-ātmikā—resolute; buddhiḥ—intellect; samādhau—fulfilment; na—never; vidhīyate—occurs

Translation
For those who are attached to pleasure and power, whose minds are drawn away by such teachings, their determinate reason is not formed which is steadily bent on meditation and Samadhi (superconscious state).

Commentary
2.44 भोगैश्वर्यप्रसक्तानाम् of the people deeply attached to pleasure and lordship? तया by that? अपहृतचेतसाम् whose minds are drawn away? व्यवसायात्मिका determinate? बुद्धिः reason? समाधौ in Samadhi? न not? विधीयते is fixed.Commentary Those who cling to pleasure and power cannot have steadiness of mind. They cannot concentrate or meditate. They are ever busy in planning projects for the acisition of wealth and power. Their minds are ever restless. They have no poised understanding.`,
          bhagavad_gita_chapter_2_verse_45 : `BG 2.45
त्रैगुण्यविषया वेदा निस्त्रैगुण्यो भवार्जुन। निर्द्वन्द्वो नित्यसत्त्वस्थो निर्योगक्षेम आत्मवान्।।2.45।।

trai-guṇya-viṣhayā vedā nistrai-guṇyo bhavārjuna nirdvandvo nitya-sattva-stho niryoga-kṣhema ātmavān

trai-guṇya—of the three modes of material nature; viṣhayāḥ—subject matter; vedāḥ—Vedic scriptures; nistrai-guṇyaḥ—above the three modes of material nature, transcendental; bhava—be; arjuna—Arjun; nirdvandvaḥ—free from dualities; nitya-sattva-sthaḥ—eternally fixed in truth; niryoga-kṣhemaḥ—unconcerned about gain and preservation; ātma-vān—situated in the self

Translation
The Vedas deal with the three attributes; be thou above these three attributes. O Arjuna, free yourself from the pairs of opposites and ever remain in the quality of Sattva, freed from acquisition and preservation, and be established in the Self.

Commentary
2.45 त्रैगुण्यविषयाः deal with the three attributes? वेदाः the Vedas? निस्त्रैगुण्यः without these three attributes? भव be? अर्जुन O Arjuna निर्द्वन्द्वः free from the pairs of opposites? नित्यसत्त्वस्थः ever remaining in the Sattva (goodness)? निर्योगक्षेमः free from (the thought of) acisition and preservation? आत्मवान् established in the Self.Commentary Guna means attribute or ality. It is substance

as well as ality. Nature (Prakriti) is made up of three Gunas? viz.? Sattva (purity? light or harmony)? Rajas (passion or motion) and Tamas (darkness or inertia). The pairs of opposites are heat and cold? pleasure and pain? gain and loss? victory and defeat? honour and dishonour? praise and censure. He who is anxious about new acuqisitions or about the preservation of his old possessions cannot have

peace of mind. He is ever restless. He cannot concentrate or meditate on the Self. He cannot practise virtue. Therefore? Lord Krishna advises Arjuna that he should be free from the thought of acisition and preservation of things. (Cf.IX.20?21).`,
    
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
          namaste_first_message: `Namaste 🙏
    
    Welcome to SanatanaDharma.xyz! Your subscription ensures daily wisdom from the Bhagavad Gita, Vedas, and Upanishads, guiding you on a transformative journey.
          
    Sanatana Dharma is more than philosophy; it's a way of life. Reflect on each verse, meditate on its meaning, and let it resonate with your inner self. May this daily practice inspire you, drawing you closer to the essence of Sanatana Dharma and your spiritual path.
          
    Thank you for joining us on this enlightening journey. May each verse be a beacon on your spiritual path, enriching your life with timeless wisdom.
          
    Best wishes,
    Team SanatanaDharma.xyz
          `,
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
      `,
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
    for (let i = 1; i < 47; i++) {
      let currentVerse = `bhagavad_gita_chapter_1_verse_${i}`;
      let nextVerse = `bhagavad_gita_chapter_1_verse_${i + 1}`;
      templates[currentVerse] = nextVerse;
    }
    templates["bhagavad_gita_chapter_1_verse_47"] = "bhagavad_gita_chapter_2_verse_1";
    for (let i = 1; i < 72; i++) {
      let currentVerse = `bhagavad_gita_chapter_2_verse_${i}`;
      let nextVerse = `bhagavad_gita_chapter_2_verse_${i + 1}`;
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
      if(row.phonenumber) {
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
