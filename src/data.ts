import { Tour, BlogPost, Review } from './types';

export const TOURS_DATA: Tour[] = [
  {
    id: 'austria-alps',
    title: 'Austrijas Alpu Virsotnes',
    description: 'Dodies elpu aizraujošā pārgājienā pa gleznainākajām Tiroles takām, pieveicot virsotnes un nakšņojot kalnu mājiņās.',
    longDescription: 'Šis pārgājiens ir radīts aktīvās atpūtas cienītājiem, kuri vēlas izaicināt sevi un izbaudīt majestātiskos Alpu skatus. Mēs iesim pa slaveno Orla taku (Adlerweg), baudīsim autentisku Tiroles virtuvi, satiksim vietējos gānus un vērosim saulrietus vairāk nekā 2000 metru augstumā.',
    duration: '7 dienas',
    price: 890,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    category: 'hiking',
    difficulty: 'challenging',
    dates: ['2026-08-12', '2026-09-05'],
    included: [
      'Grupas vadītāja (Mārtiņa) un kalnu gida pakalpojumi',
      'Nakšņošana kalnu mājiņās un viesu namos',
      'Brokastis un vakariņas katru dienu',
      'Vietējie transporta izdevumi maršrutā',
      'Profesionālas fotogrāfijas no brauciena'
    ],
    notIncluded: [
      'Lidojums Rīga - Minhene - Rīga (palīdzam iegādāties)',
      'Personīgie izdevumi un pusdienas',
      'Ceļojumu apdrošināšana (obligāta)'
    ],
    itinerary: [
      { day: 1, title: 'Ierašanās un iepazīšanās Tiroles ielejā', description: 'Tikšanās lidostā, transfērs uz mājīgu Tiroles viesu namu. Kopīgas vakariņas, inventāra pārbaude un instruktāža.' },
      { day: 2, title: 'Pirmais kāpums: Pāreja uz kalnu mājiņu', description: 'Sākam mūsu pārgājienu cauri priežu mežiem līdz pirmajai kalnu patversmei (Hütte) 1900m augstumā. Kopējais kāpums: +800m.' },
      { day: 3, title: 'Virsotnes iekarošana: Gaisma virs mākoņiem', description: 'Agra rīta kāpums līdz tuvējai virsotnei (2450m), lai vērotu saullēktu. Tālāk mērojam ceļu gar kalnu kailajām korēm.' },
      { day: 4, title: 'Zalie ezeri un kalnu pļavas', description: 'Gleznains posms gar tirkīzziliem kalnu ezeriem. Pusdienu pikniks pļavā ar skatu uz ledājiem.' },
      { day: 5, title: 'Akmeņainais izaicinājums un augstkalnu nakts', description: 'Tehniskāks posms ar viegliem rāpšanās elementiem (nodrošināts drošības aprīkojums). Nakšņojam visaugstākajā takas punktā.' },
      { day: 6, title: 'Nolaišanās un svētku vakariņas', description: 'Lēna nolaišanās atpakaļ ielejā. Atgriešanās civilizācijā, atpūta vietējā SPA un svētku vakariņas.' },
      { day: 7, title: 'Mājupceļš', description: 'Pēdējie suvenīri, transfērs uz lidostu un lidojums mājup uz Rīgu.' }
    ],
    featured: true
  },
  {
    id: 'georgia-svaneti',
    title: 'Gruzijas Garšas un Svanetijas Kalni',
    description: 'Piedzīvojums Gruzijas augstākajos kalnos, savienojumā ar nepieredzētu viesmīlību, hačapuri un īstiem gruzīnu vīniem.',
    longDescription: 'Svanetija is viens no izolētākajiem un maģiskākajiem Gruzijas reģioniem, kas slavens ar saviem viduslaiku aizsardzības torņiem un milzīgajiem ledājiem. Šajā braucienā mēs apvienosim aktīvus pārgājienus ar bagātīgām gruzīnu viesībām (Supra), kur katrs tosts ir kā mākslas darbs.',
    duration: '8 dienas',
    price: 980,
    image: 'https://images.unsplash.com/photo-1568291886759-01f7f4c58a8f?auto=format&fit=crop&w=1200&q=80',
    category: 'cultural',
    difficulty: 'moderate',
    dates: ['2026-07-20', '2026-09-18'],
    included: [
      'Mārtiņa un vietējā gruzīnu gida vadība',
      'Visi iekšzemes transfēri ar privāto mikroautobusu',
      'Nakšņošana svanu ģimenes viesu namos (ļoti autentiski)',
      'Trīsreizēja ēdināšana ar bagātīgiem gruzīnu ēdieniem un vīnu',
      'Ieejas maksas apskates objektos un muzejos'
    ],
    notIncluded: [
      'Aviabiļetes Rīga - Kutaisi - Rīga',
      'Alkohols ārpus kopīgajām ēdienreizēm',
      'Apdrošināšana'
    ],
    itinerary: [
      { day: 1, title: 'Satikšanās Kutaisi un ceļš uz Mestiju', description: 'Ielidošana, tikšanās un tūlītējs ceļš uz Svanetijas sirdi - Mestiju. Pa ceļam apskatām milzīgo Enguri aizsprostu.' },
      { day: 2, title: 'Mestija un Čalaadi ledājs', description: 'Aklimatizācijas pārgājiens līdz Čalaadi ledājam. Šķērsosim iekaramo tiltu un iesim pa akmeņainu upes gultni.' },
      { day: 3, title: 'No Mestijas uz Žabeši', description: 'Sākam klasisko 4 dienu pārgājienu Mestija-Ušguli. Šodien ejam caur maziem kalnu ciematiem ar gleznainām pļavām.' },
      { day: 4, title: 'Žabeši - Adishi: Šķērsojot kalnu pārejas', description: 'Kāpums līdz slēpošanas kūrortam Tetnuldi, tālāk nolaišanās noslēpumainajā Adiši ciematā, kur laiks šķiet apstājies.' },
      { day: 5, title: 'Adiši - Iprali: Ledāja upes šķērsošana zirgu mugurās', description: 'Viens no iespaidīgākajiem posmiem. No rīta zirgu mugurās šķērsosim straujo kalnu upi un kāpsim Čhunderi pārejā (2700m).' },
      { day: 6, title: 'Ierašanās Ušguli - Eiropas augstākajā ciematā', description: 'Sasniedzam leģendāro Ušguli ciematu Šhara kalna (5193m) pakājē. Vērojam svanu torņus pret kalnu fonu.' },
      { day: 7, title: 'Atgriešanās Kutaisi un gruzīnu Supra', description: 'Transfērs atpakaļ uz Kutaisi. Vakarā rīkojam īstu atvadu ballīti ar gruzīnu daudzbalsu dziedāšanu un tostiem.' },
      { day: 8, title: 'Lidojums mājup', description: 'Transfērs uz lidostu un atgriešanās Rīgā ar siltām atmiņām.' }
    ],
    featured: true
  },
  {
    id: 'iceland-circle',
    title: 'Islandes Maģiskais Apis',
    description: 'Ceļojums apkārt uguns un ledus zemei. Geizeri, mutuļojoši dubļu katli, krāsaini kalni un varenākie Eiropas ūdenskritumi.',
    longDescription: 'Islande ir cita planēta. Mēs mērosim slaveno Ring Road (1. ceļu), piestājot pie ikoniskākajām vietām un dodoties slēptos maršrutos, kurus zina tikai retais. Redzēsim melno smilšu pludmales, peldēsimies karstajos avotos zem klajas debess un meklēsim vaļus Atlantijas okeānā.',
    duration: '9 dienas',
    price: 1450,
    image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=80',
    category: 'nature',
    difficulty: 'easy',
    dates: ['2026-06-15', '2026-07-10'],
    included: [
      'Mārtiņa (grupas vadītāja) un šofera pakalpojumi',
      '4x4 pilnpiedziņas auto noma, degviela un stāvvietas',
      'Mājīgu kotedžu un viesnīcu rezervācijas visā maršrutā',
      'Ieeja slavenajā Blue Lagoon vai līdzvērtīgā dabas SPA',
      'Brokastis katru dienu'
    ],
    notIncluded: [
      'Lidojums Rīga - Reikjavīka - Rīga',
      'Pusdienas un vakariņas (gatavojam kopā vai ēdam vietējos krodziņos)',
      'Vaļu vērošanas ekskursija (pēc izvēles)'
    ],
    itinerary: [
      { day: 1, title: 'Reikjavīka un Zelta loks', description: 'Ielidošana, auto saņemšana un slavenā Zelta loka (Thingvellir, Geysir, Gullfoss) apskate pirmajā dienā.' },
      { day: 2, title: 'Dienvidu krasts: Ūdenskritumi un melnās smiltis', description: 'Apskatām Seljalandsfoss un Skógafoss ūdenskritumus. Pastaiga pa pasaulslaveno Reynisfjara melno smilšu pludmali pie Vīkas.' },
      { day: 3, title: 'Ledāju lagūna un dimantu pludmale', description: 'Fjadrárgljúfur kanjons un vēlāk vizīte pie Jökulsárlón ledāja lagūnas, kur okeānā peld milzīgi ledus gabali.' },
      { day: 4, title: 'Austrumu fjordi: Kalni un zvejnieku ciemati', description: 'Gleznains brauciens gar austrumu fjordiem. Piestājam mazos mākslinieciskos ciematos un vērojam ziemeļbriežus.' },
      { day: 5, title: 'Mīvatna ezers un dubļu katli', description: 'Apceļojam gāzētos dubļu laukus, melnos lavas labirintus Dimmuborgir un peldamies dabas termālajos baseinos.' },
      { day: 6, title: 'Ūdens varenība un Akureiri', description: 'Apmeklējam Dettifoss - Eiropas jaudīgāko ūdenskritumu un vēlāk dodos uz Islandes ziemeļu galvaspilsētu Akureiri.' },
      { day: 7, title: 'Ziemeļu vaļi un lavas alas', description: 'Dienas pirmajā pusē vaļu vērošana Húsavík līcī (pēc izvēles). Pēcpusdienā ceļš gar rietumu fjordu malām.' },
      { day: 8, title: 'Atpakaļ uz dienvidiem: Snæfellsnes pussala', description: 'Apskatām ikonisko Kirkjufell kalnu un baudām pussalas mežonīgos vulkāniskos krastus.' },
      { day: 9, title: 'Transfērs uz lidostu un mājupceļš', description: 'Atgriešanās Reikjavīkā, suvenīru medības un transfērs uz Keflavik lidostu.' }
    ],
    featured: false
  },
  {
    id: 'morocco-sahara',
    title: 'Marokas Kontrasti un Tuksnesis',
    description: 'Piedzīvojums no krāsainajiem Marakešas tirgiem līdz Sahāras tuksneša kāpām, nakšņojot berberu teltīs.',
    longDescription: 'Maroka uzreiz apbur ar aromātiem, garšvielām un spilgtām krāsām. Mēs pāriesim pāri Augstajiem Atlasa kalniem, apmeklēsim sarkanos māla ciematus (Kasbah) un dosimies kamieļu mugurās dziļi Erg Chebbi tuksnesī, lai pavadītu nakti milzīgu kāpu ieskautā nometnē zem miljoniem zvaigžņu.',
    duration: '8 dienas',
    price: 850,
    image: 'https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?auto=format&fit=crop&w=1200&q=80',
    category: 'exotic',
    difficulty: 'easy',
    dates: ['2026-10-10', '2026-11-04'],
    included: [
      'Mārtiņa un vietējā berberu gida pavadība',
      'Nakšņošana tradicionālajās Riad viesnīcās un tuksneša teltīs',
      'Kamieļu pārgājiens Sahāras tuksnesī',
      'Bagātīgas berberu brokastis un vakariņas tuksnesī',
      'Visi transporta izdevumi ar ērtu privāto auto'
    ],
    notIncluded: [
      'Aviabiļetes Rīga - Marakeša - Rīga',
      'Pusdienas tirgū un pilsētās',
      'Dzeramnauda vietējiem gidiem (tradīcija Marokā)'
    ],
    itinerary: [
      { day: 1, title: 'Sveicināta Marakeša!', description: 'Ierašanās, iekārtošanās skaistā Riad vecpilsētas sirdī. Vakarā Jemaa el-Fna laukuma maģija ar čūsku dīdītājiem un ielu ēdienu.' },
      { day: 2, title: 'Augstie Atlasa kalni un Ait Ben Haddou', description: 'Gleznains brauciens pāri Tizi n\'Tichka pārejai kalnos. Slavenā UNESCO māla ciemata Ait Ben Haddou apmeklējums (šeit uzņemtas filmas "Gladiators", "Troņu spēles").' },
      { day: 3, title: 'Dades kanjons un rožu ieleja', description: 'Brauciens cauri iespaidīgajam Dades kanjonam ar tā unikālajām klinšu formām. Vakara pastaiga pa palmu oāzi.' },
      { day: 4, title: 'Ceļš uz Sahāras tuksnesi', description: 'Sasniedzam Merzougu - pēdējo apmetni pirms tuksneša. Sēžamies kamieļu mugurās un dodamies 1.5h braucienā kāpās saulrieta laikā.' },
      { day: 5, title: 'Tuksneša maģija un berberu mūzika', description: 'Vērojam fantastisku saullēktu virs kāpām. Dienu pavadām pētot tuksneša dzīvi, vakarā tradicionālās bungas pie ugunskura.' },
      { day: 6, title: 'Atpakaļ uz kalniem: Todras aiza', description: 'Atgriežamies no tuksneša un dodos uz Todras aizu ar tās 300 metrus augstajām vertikālajām klinšu sienām.' },
      { day: 7, title: 'Atgriešanās Marakešā: tirgus un dārzi', description: 'Transfērs atpakaļ uz Marakešu. Pēcpusdienā apmeklējam slaveno Majorelle dārzu un ļaujamies krāsaino tirgu (Souk) valdzinājumam.' },
      { day: 8, title: 'Atvadas no Marokas', description: 'Pēdējā piparmētru tēja, suvenīru iepirkšana un transfērs uz lidostu mājupceļam.' }
    ],
    featured: false
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'how-to-pack-hiking',
    title: 'Kā pareizi sakrāmēt mugursomu pārgājienam kalnos?',
    excerpt: 'Lasi manus pārbaudītos padomus, lai tava somas svars neradītu problēmas mugurai un viss nepieciešamais būtu viegli pieejams.',
    content: 'Dodoties kalnos, katram gramam mugursomā ir nozīme. Mana galvenā formula ir vienkārša - neņem neko tādu, bez kā tu reāli nevari iztikt vismaz divas reizes. Somas krāmēšanā jāievēro smaguma centra likums: smagākās lietas (piemēram, ūdens, pārtika) jānovieto pēc iespējas tuvāk mugurai un somas vidusdaļā. Guļammaisu un rezerves apģērbu, ko izmantosi tikai vakarā, liec somas pašā apakšā. Savukārt lietusjaku, aptieciņu un uzkodas vienmēr turi augšējā kabatā vai viegli pieejamā vistā. Neaizmirsti par somas lietus pārvalku, jo laika apstākļi kalnos mēdz mainīties dažu minūšu laikā!',
    date: '2026-05-18',
    author: 'Mārtiņš',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80',
    readTime: '5 min'
  },
  {
    id: 'georgian-hospitality-survival',
    title: 'Gruzīnu viesmīlība: Kā izdzīvot pie Supra galda?',
    excerpt: 'Gruzijas tostu kultūra un bagātīgās svinības ir leģendāras. Šeit ir 3 likumi, lai tu spētu godam izturēt vakaru un neapvainotu namatēvu.',
    content: 'Gruzijā galds un viesmīlība ir svēta lieta. Supra jeb tradicionālais gruzīnu mielasts nav vienkārši ēšana - tas ir rituāls, ko vada Tamada (galda vadītājs). Pirmais likums: nekad nedzer vīnu starp tostiem patstāvīgi! Vīnu dzer tikai tad, kad tosts ir pateikts un Tamada dod zīmi. Otrais likums: pat ja tev liekas, ka vairs nespēj ieēst ne kumosa, namatēvs vienmēr uzliks vēl vienu hačapuri šķēli. Pieņem to ar smaidu! Trešais likums: iemācies vismaz vienu sirsnīgu tostu par draudzību vai ģimeni - gruzīni to novērtēs no visas sirds un tu kļūsi par viņu labāko draugu uz mūžu.',
    date: '2026-06-02',
    author: 'Mārtiņš',
    image: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=600&q=80',
    readTime: '4 min'
  }
];

export const REVIEWS_DATA: Review[] = [
  {
    id: 'rev-1',
    name: 'Jānis Ozols',
    tourName: 'Austrijas Alpu Virsotnes',
    rating: 5,
    comment: 'Lieliskākais pārgājiens manā mūžā! Mārtiņš perfekti zina maršrutu, drosmīgi mūs veda pa drošākajām takām un vakaros gatavoja izcilas tējas no kalnu pļavu zālītēm. Grupa saliedējās jau pirmajā vakarā. Noteikti ceļošu vēl!',
    date: '2025-09-12',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80'
  },
  {
    id: 'rev-2',
    name: 'Linda Kalniņa',
    tourName: 'Gruzijas Garšas un Svanetijas Kalni',
    rating: 5,
    comment: 'Skaistums, kas paveras Svanetijā, nav aprakstāms vārdos. Bet tieši Mārtiņa organizācija padarīja šo braucienu tik īpašu un drošu. Mēs redzējām tādas vietas, kur parastie tūristi netiek, un ēdām visgardākos mājas ēdienus kalnu ciematos. Paldies!',
    date: '2025-10-02',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80'
  },
  {
    id: 'rev-3',
    name: 'Kārlis un Laura',
    tourName: 'Islandes Maģiskais Apis',
    rating: 5,
    comment: 'Bijām nedaudz bažīgi par neparedzamajiem Islandes laika apstākļiem, bet viss bija pārdomāts līdz sīkumam. Komfortabli 4x4 auto, ļoti mājīgas mājiņas ar karstajiem kubliem vakarā un neaizmirstami dabas skati katru dienu. 10/10 iesakām!',
    date: '2025-07-15',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&h=100&q=80'
  }
];
