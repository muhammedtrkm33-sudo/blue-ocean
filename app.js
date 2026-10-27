(() => {
  "use strict";

  const config = window.BLUE_OCEAN_CONFIG || {};
  const regions = [
    { id: "mediterranean", name: { tr: "Akdeniz", en: "Mediterranean Sea" }, lat: 36, lon: 18, zoom: 4, description: { tr: "Üç kıtayı buluşturan yarı kapalı bir deniz. Isınma, habitat kaybı, aşırı avcılık ve plastik kirliliği bölge için önemli araştırma başlıklarıdır.", en: "A semi-enclosed sea bordered by three continents. Warming, habitat loss, overfishing and plastic pollution are important regional research topics." } },
    { id: "black-sea", name: { tr: "Karadeniz", en: "Black Sea" }, lat: 43, lon: 34, zoom: 5, description: { tr: "Akdeniz'e boğazlarla bağlanan, derin sularının büyük ölçümü oksijensiz olan kapalı bir havza. Kıyı baskıları ve ekosistem değişimleri yakından izleniyor.", en: "A basin connected to the Mediterranean by straits; most of its deep water is oxygen-poor. Coastal pressures and ecosystem changes are actively studied." } },
    { id: "aegean", name: { tr: "Ege Denizi", en: "Aegean Sea" }, lat: 38.5, lon: 25.5, zoom: 5, description: { tr: "Adaları ve kıyı habitatlarıyla zengin bir Akdeniz alt havzası. Deniz çayırları ve kıyı ekosistemlerinin korunması öne çıkıyor.", en: "A biodiverse Mediterranean sub-basin with extensive islands and coastal habitats. Seagrass and coastal ecosystem conservation are key priorities." } },
    { id: "marmara", name: { tr: "Marmara Denizi", en: "Sea of Marmara" }, lat: 40.7, lon: 28.2, zoom: 7, description: { tr: "Karadeniz ile Ege'yi bağlayan yoğun baskı altındaki geçiş denizi. Besin yükü, kirlilik, habitat değişimi ve müsilaj oluşumu araştırılıyor.", en: "A heavily pressured transition sea connecting the Black and Aegean seas. Nutrient loads, pollution, habitat change and mucilage are active research topics." } },
    { id: "north-sea", name: { tr: "Kuzey Denizi", en: "North Sea" }, lat: 56, lon: 3, zoom: 4, description: { tr: "Yoğun deniz taşımacılığı ve balıkçılığın yanında, açık deniz yenilenebilir enerji dönüşümünün de merkezinde yer alan deniz.", en: "A sea shaped by intensive shipping and fishing, and increasingly by the offshore renewable energy transition." } },
    { id: "caribbean", name: { tr: "Karayip Denizi", en: "Caribbean Sea" }, lat: 17, lon: -75, zoom: 4, description: { tr: "Mercan resiflerine, mangrovlara ve deniz çayırlarına ev sahipliği yapan tropikal havza. Deniz ısı dalgaları ve mercan beyazlaması önemli risklerdir.", en: "A tropical basin home to coral reefs, mangroves and seagrasses. Marine heatwaves and coral bleaching are significant risks." } },
    { id: "south-china", name: { tr: "Güney Çin Denizi", en: "South China Sea" }, lat: 13, lon: 114, zoom: 4, description: { tr: "Zengin deniz yaşamı, yoğun deniz trafiği ve kıyısal kalkınmanın kesiştiği büyük bir bölgesel deniz.", en: "A major regional sea where rich marine life intersects with intense shipping and coastal development." } },
    { id: "pacific", name: { tr: "Büyük Okyanus", en: "Pacific Ocean" }, lat: 0, lon: -155, zoom: 3, description: { tr: "Dünyanın en büyük okyanusu; çok çeşitli ekosistemleri, derin deniz habitatları ve uluslararası iş birliği gerektiren plastik kirliliğiyle öne çıkar.", en: "The world's largest ocean, spanning diverse ecosystems and deep-sea habitats, with plastic pollution requiring international cooperation." } },
    { id: "atlantic", name: { tr: "Atlas Okyanusu", en: "Atlantic Ocean" }, lat: 15, lon: -35, zoom: 3, description: { tr: "Kutup bölgelerinden tropiklere uzanan geniş bir okyanus. Okyanus dolaşımı ve ısı depolaması küresel iklim üzerinde etkilidir.", en: "A vast ocean from polar to tropical waters. Its circulation and heat storage influence the global climate." } },
    { id: "indian", name: { tr: "Hint Okyanusu", en: "Indian Ocean" }, lat: -18, lon: 78, zoom: 3, description: { tr: "Musonlardan ve sıcak su kütlelerinden etkilenen büyük bir okyanus havzası; kıyı ekosistemleri ve deniz yaşamı iklim değişiminden etkileniyor.", en: "A major ocean basin shaped by monsoons and warm waters; its coastal ecosystems and marine life face climate-related pressures." } },
    { id: "gulf-of-guinea", name: { tr: "Gine Körfezi", en: "Gulf of Guinea" }, lat: 1, lon: 4, zoom: 5, description: { tr: "Batı Afrika kıyılarındaki bu deniz alanında plastik atık, kentsel atık su, balıkçılık ve deniz taşımacılığı birlikte izlenmelidir. Bölgesel ölçümler ve kıyı koşulları ülkeler arasında farklılık gösterir; tek bir canlı kirlilik oranı yoktur.", en: "This West African marine region is affected by interacting pressures from plastic waste, urban wastewater, fishing and shipping. Monitoring and coastal conditions vary by country; there is no single live pollution rate." } },
    { id: "arctic", name: { tr: "Arktik Okyanusu", en: "Arctic Ocean" }, lat: 82, lon: 15, zoom: 3, description: { tr: "Hızla değişen deniz buzu, soğuk su ekosistemleri ve bölgesel kirlilik kaynakları iklim araştırmalarının odağında.", en: "Rapidly changing sea ice, cold-water ecosystems and regional pollution sources are central to Arctic climate research." } },
    { id: "southern", name: { tr: "Güney Okyanusu", en: "Southern Ocean" }, lat: -63, lon: 30, zoom: 3, description: { tr: "Antarktika çevresindeki okyanus; küresel dolaşım, karbon döngüsü ve penguenler ile kril gibi canlıların yaşam alanları için önemlidir.", en: "The ocean around Antarctica is vital for global circulation, the carbon cycle and habitats for species such as penguins and krill." } }
  ];
  const risks = [
    { name: { tr: "Büyük Pasifik Çöp Alanı (araştırma alanı)", en: "Great Pacific Garbage Patch (research area)" }, lat: 33, lon: -145, type: "risk" },
    { name: { tr: "Sargasso Denizi (araştırma alanı)", en: "Sargasso Sea (research area)" }, lat: 29, lon: -65, type: "risk" },
    { name: { tr: "Mercan resifleri (araştırma alanı)", en: "Coral reef research area" }, lat: -17, lon: 147, type: "risk" }
  ];
  const species = [
    { name: { tr: "Mavi balina", en: "Blue whale" }, scientific: "Balaenoptera musculus", status: { tr: "IUCN: Tehlikede", en: "IUCN: Endangered" }, img: "photo-1568430462989-44163eb1752f", detail: { tr: "Okyanusun en büyük hayvanı. Krille beslenir ve karbonun okyanusta depolanmasına katkıda bulunan deniz besin döngüsünde rol oynar. Tür genelinde IUCN kategorisi: Tehlikede (Endangered).", en: "The largest animal on Earth. It feeds on krill and plays a role in ocean nutrient cycles that help sequester carbon. Global IUCN status: Endangered." }, source: "https://www.iucnredlist.org/species/2477/156923585" },
    { name: { tr: "Caretta caretta", en: "Loggerhead turtle" }, scientific: "Caretta caretta", status: { tr: "IUCN: Hassas", en: "IUCN: Vulnerable" }, img: "photo-1559827260-dc66d52bef19", detail: { tr: "Akdeniz'de üreyen deniz kaplumbağalarından. Balıkçılık ekipmanlarına takılma, yuvalama sahalarının kaybı ve deniz kirliliği başlıca tehditler arasındadır. Bölgesel durumu popülasyona göre değişebilir.", en: "A sea turtle that nests around the Mediterranean. Entanglement in fishing gear, loss of nesting beaches and marine pollution are among its main threats. Regional status varies by population." }, source: "https://www.iucnredlist.org/species/3897/119333622" },
    { name: { tr: "Büyük beyaz köpek balığı", en: "Great white shark" }, scientific: "Carcharodon carcharias", status: { tr: "IUCN: Hassas", en: "IUCN: Vulnerable" }, img: "photo-1560275619-4662e36fa65c", detail: { tr: "Deniz besin ağının üst basamaklarında yer alan uzun ömürlü bir avcı. Aşırı avcılık ve istenmeden yakalanma, bölgesel popülasyonları etkileyebilir.", en: "A long-lived predator near the top of marine food webs. Overfishing and accidental bycatch can affect regional populations." }, source: "https://www.iucnredlist.org/species/3855/2878674" },
    { name: { tr: "Kızıl mercan", en: "Red coral" }, scientific: "Corallium rubrum", status: { tr: "IUCN: Hassas", en: "IUCN: Vulnerable" }, img: "photo-1546026423-cc4642628d2b", detail: { tr: "Akdeniz'e özgü, yavaş büyüyen bir mercan türü. Deniz tabanında habitat oluşturarak başka canlılara yaşam alanı sunar; aşırı toplama ve deniz ısınmasıyla karşı karşıyadır.", en: "A slow-growing Mediterranean endemic that provides habitat for other seafloor life. It faces pressure from harvesting and ocean warming." }, source: "https://www.iucnredlist.org/search?query=Corallium%20rubrum&searchType=species" },
    { name: { tr: "Afalina", en: "Bottlenose dolphin" }, scientific: "Tursiops truncatus", status: { tr: "IUCN: Asgari endişe", en: "IUCN: Least Concern" }, img: "photo-1607153333879-c174d265f1d2", detail: { tr: "Kıyısal ve açık deniz habitatlarında görülen sosyal bir yunus. Kirlilik, su altı gürültüsü ve balıkçılıkla etkileşimler belirli popülasyonları tehdit edebilir.", en: "A social dolphin found in coastal and offshore habitats. Pollution, underwater noise and fishing interactions threaten some local populations." }, source: "https://www.iucnredlist.org/species/22563/156932432" },
    { name: { tr: "Akdeniz foku", en: "Mediterranean monk seal" }, scientific: "Monachus monachus", status: { tr: "IUCN: Hassas", en: "IUCN: Vulnerable" }, img: "photo-1544551763-46a013bb70d5", detail: { tr: "Nesli tehlike altındaki nadir yüzgeçayaklılardan. Akdeniz'de kıyı mağaraları ve sessiz üreme alanlarının korunması hayati önem taşır. IUCN küresel kategori: Hassas (Vulnerable).", en: "One of the world's rarest pinnipeds. Protecting Mediterranean coastal caves and quiet breeding areas is essential. Global IUCN status: Vulnerable." }, source: "https://www.iucnredlist.org/species/13653/45227543" },
    { name: { tr: "Manta vatozu", en: "Giant manta ray" }, scientific: "Mobula birostris", status: { tr: "IUCN: Tehlikede", en: "IUCN: Endangered" }, img: "photo-1545670723-196ed0954986", detail: { tr: "Planktonla beslenen büyük bir vatoz türü. Hedefli avcılık ve ağlara takılma nedeniyle popülasyonları baskı altındadır.", en: "A large filter-feeding ray. Targeted fishing and accidental capture place populations under pressure." }, source: "https://www.iucnredlist.org/species/198921/68632946" },
    { name: { tr: "Posidonia deniz çayırı", en: "Neptune grass" }, scientific: "Posidonia oceanica", status: { tr: "IUCN: Hassas", en: "IUCN: Least Concern (as assessed)" }, img: "photo-1500375592092-40eb2168fd21", detail: { tr: "Akdeniz'e özgü deniz çiçekli bitkisi. Kıyıları korur, karbon depolar ve yavru balıklara habitat sunar; kıyı gelişimi ve demirlemeler çayırları zedeleyebilir. IUCN değerlendirmesi güncelliğe bağlıdır.", en: "A seagrass endemic to the Mediterranean. It protects coasts, stores carbon and provides fish habitat; coastal development and anchoring can damage meadows. Check the latest IUCN assessment." }, source: "https://www.iucnredlist.org/search?query=Posidonia%20oceanica&searchType=species" }
  ];
  const topics = [
    { id: "ocean", title: { tr: "Okyanuslar ölüyor mu?", en: "Are our oceans dying?" }, copy: { tr: "Denizlerin karşı karşıya olduğu iklim, habitat ve kirlilik baskılarını tanı.", en: "Explore the climate, habitat and pollution pressures on the world's seas." }, detail: { tr: "Okyanusların durumu tek bir başlıkla özetlenemez: ısınma, asitlenme, oksijensizleşme, habitat kaybı ve aşırı kullanım birbiriyle etkileşir. IPCC ve UNEP değerlendirmeleri bölgesel verilerle birlikte incelenmelidir.", en: "Ocean health cannot be summarized in one number. Warming, acidification, deoxygenation, habitat loss and overexploitation interact. Read regional evidence alongside IPCC and UNEP assessments." }, links: [["UNEP deniz ortamı", "https://www.unep.org/topics/ocean-seas-and-coasts"], ["IPCC", "https://www.ipcc.ch/"]], tag: "01" },
    { id: "microplastic", title: { tr: "Görünmez tehdit: Mikroplastikler", en: "The invisible threat: microplastics" }, copy: { tr: "Küçük parçacıkların deniz ekosistemlerine ulaşma yollarını öğren.", en: "Learn how tiny plastic particles reach marine ecosystems." }, detail: { tr: "Mikroplastikler, boyutu 5 mm'den küçük plastik parçacıklarıdır. Plastik ürünlerin parçalanması, tekstil lifleri ve lastik aşınması kaynaklar arasındadır. İnsan sağlığı üzerindeki etkiler araştırılmaktadır; belirsizlikler açıkça değerlendirilmelidir.", en: "Microplastics are plastic particles smaller than 5 mm. Sources include breakdown of plastic products, textile fibres and tyre wear. Health effects are still being studied and uncertainties matter." }, links: [["UNEP: Plastik kirliliği", "https://www.unep.org/plastic-pollution"], ["WHO", "https://www.who.int/publications/i/item/9789241516198"]], tag: "02" },
    { id: "garbage", title: { tr: "Büyük Pasifik Çöp Alanı", en: "The Great Pacific Garbage Patch" }, copy: { tr: "Okyanus akıntılarının plastik atıkları nasıl yoğunlaştırdığını keşfet.", en: "Discover how currents concentrate floating debris." }, detail: { tr: "Büyük Pasifik Çöp Alanı, Büyük Okyanus'ta akıntılarla taşınan yüzer atıkların biriktiği geniş bir bölgedir; katı bir çöp adası değildir. Büyük bölümü su yüzeyinde gözle görülmez küçük parçacıklardan oluşur. Alan ölçümleri kullanılan yöntem ve tarihe göre farklılık gösterir.", en: "The Great Pacific Garbage Patch is a broad zone where currents concentrate floating debris, not a solid island of trash. Much of it consists of small, hard-to-see fragments. Size estimates depend on sampling methods and dates." }, links: [["NOAA marine debris", "https://oceanservice.noaa.gov/hazards/marinedebris/"], ["The Ocean Cleanup research", "https://theoceancleanup.com/great-pacific-garbage-patch/"]], tag: "03" },
    { id: "extinction", title: { tr: "Deniz canlıları ve yok oluş riski", en: "Marine life under threat" }, copy: { tr: "Kaplumbağalar, balinalar, köpek balıkları ve resifler üzerindeki baskılar.", en: "Pressures on turtles, whales, sharks and coral reefs." }, detail: { tr: "Risk her tür ve popülasyon için farklıdır. IUCN Kırmızı Liste tür bazında küresel kategoriler sunar; yerel durum değişebilir. Başlıca baskılar arasında hedef dışı av, yaşam alanı kaybı, iklim değişikliği ve kirlilik vardır.", en: "Risk varies by species and population. The IUCN Red List provides global species assessments; local status can differ. Bycatch, habitat loss, climate change and pollution are key pressures." }, links: [["IUCN Kırmızı Liste", "https://www.iucnredlist.org/"], ["IPBES", "https://www.ipbes.net/"]], tag: "04" },
    { id: "plastic", title: { tr: "Okyanustaki plastik krizi", en: "The ocean plastic crisis" }, copy: { tr: "Plastiğin denizlere ulaşmasını önleyecek kaynak odaklı çözümler.", en: "Source-focused ways to stop plastic reaching the sea." }, detail: { tr: "Plastik atıklar rüzgâr, nehirler, yetersiz atık yönetimi ve deniz faaliyetleriyle su ortamına ulaşabilir. Atığı kaynağında azaltmak, yeniden kullanım ve toplama altyapısını geliştirmek; temizlik kadar önemlidir.", en: "Plastic can reach waters through wind, rivers, inadequate waste management and marine activities. Reducing use at source, reuse and better collection systems matter alongside cleanups." }, links: [["UNEP", "https://www.unep.org/plastic-pollution"], ["OECD", "https://www.oecd.org/environment/plastics/"]], tag: "05" },
    { id: "ghostnets", title: { tr: "Hayalet balık ağları", en: "Ghost fishing gear" }, copy: { tr: "Terk edilmiş av araçları deniz canlılarını tuzağa düşürmeye devam ediyor.", en: "Lost and abandoned fishing gear keeps trapping wildlife." }, detail: { tr: "Kaybolan veya terk edilen ağ, misina ve tuzaklar, bazı durumlarda avlanmayı sürdürür ve habitatlara zarar verebilir. Kayıp ekipmanı azaltma, işaretleme, toplama ve güvenli teslim programları önlemenin parçalarıdır.", en: "Lost or abandoned nets, lines and traps can continue catching animals and damaging habitats. Gear marking, reporting, retrieval and safe disposal are part of prevention." }, links: [["FAO: Abandoned fishing gear", "https://www.fao.org/responsible-fishing/marking-of-fishing-gear/en/"], ["NOAA", "https://oceanservice.noaa.gov/hazards/marinedebris/"]], tag: "06" },
    { id: "toxins", title: { tr: "Zehirlenen denizler", en: "Pollution in our seas" }, copy: { tr: "Petrol, kimyasallar ve atık suların deniz ekosistemlerine etkileri.", en: "How oil, chemicals and wastewater affect marine ecosystems." }, detail: { tr: "Deniz kirliliği farklı kirleticilerin, kaynakların ve maruz kalma yollarının bileşimidir. Petrol sızıntıları, tarımsal besin maddeleri, atık su ve kimyasallar için ölçüm ve risk değerlendirmesi bölgeye özgü olmalıdır.", en: "Marine pollution combines different pollutants, sources and exposure pathways. Oil spills, agricultural nutrients, wastewater and chemicals require region-specific monitoring and risk assessment." }, links: [["UNEP: Marine and coastal", "https://www.unep.org/topics/ocean-seas-and-coasts"], ["ITOPF", "https://www.itopf.org/"]], tag: "07" },
    { id: "health", title: { tr: "Okyanus ve insan sağlığı", en: "The ocean and human health" }, copy: { tr: "Deniz ürünlerinden kıyı yaşamına: temiz denizlerin önemi.", en: "From seafood safety to coastal wellbeing: why healthy seas matter." }, detail: { tr: "Deniz ekosistemleri gıda, geçim ve refah için önemlidir. Deniz ürünleri güvenliği; kirletici, tür, bölge ve tüketim koşullarına bağlıdır. Sağlık kararlarında ulusal yetkililerin güncel uyarıları izlenmelidir.", en: "Marine ecosystems support food, livelihoods and wellbeing. Seafood safety depends on contaminant, species, region and consumption. Follow up-to-date local public-health advice." }, links: [["WHO: Food safety", "https://www.who.int/health-topics/food-safety"], ["FAO: Fisheries", "https://www.fao.org/fishery/en"]], tag: "08" },
    { id: "cleanup", title: { tr: "Okyanus temizleme teknolojileri", en: "Ocean cleanup technologies" }, copy: { tr: "Uzaktan algılama, robotik ve atık önleme yöntemlerinin rolü.", en: "Remote sensing, robotics and preventing pollution at source." }, detail: { tr: "Uydu gözlemi, sensörler ve yapay zekâ araştırma ile izlemeyi destekleyebilir. Yüzer toplama sistemleri belirli makroplastiklere odaklanır; mikroplastikleri ve kaynağa yeni atık girişini tek başına çözmez. Önleme ve ekosistem koruması esastır.", en: "Satellites, sensors and AI can support research and monitoring. Floating collectors target certain macroplastics; they cannot solve microplastics or prevent new pollution alone. Prevention and ecosystem protection remain essential." }, links: [["NOAA marine debris", "https://oceanservice.noaa.gov/hazards/marinedebris/"], ["UNEP", "https://www.unep.org/plastic-pollution"]], tag: "09" },
    { id: "future", title: { tr: "Okyanusların geleceği", en: "The future of our oceans" }, copy: { tr: "Bilimsel riskler ve uygulanabilir, ölçülebilir çözümler.", en: "Evidence-based risks and practical, measurable solutions." }, detail: { tr: "Denizlerin geleceği emisyon azaltımı, etkili koruma alanları, sürdürülebilir balıkçılık ve kirliliğin önlenmesine bağlıdır. IPCC ve IPBES değerlendirmeleri kararlar için kapsamlı bilimsel sentez sunar.", en: "Ocean futures depend on emissions cuts, effective protected areas, sustainable fishing and pollution prevention. IPCC and IPBES assessments synthesize evidence for decision-makers." }, links: [["IPCC", "https://www.ipcc.ch/"], ["UN Ocean Decade", "https://oceandecade.org/"]], tag: "10" },
    { id: "responsibility", title: { tr: "Denizleri kim kirletiyor?", en: "Who is responsible?" }, copy: { tr: "Sorumluluğu bireylerden şirketlere ve uluslararası politikalara kadar izle.", en: "Trace responsibility from individual actions to industry and policy." }, detail: { tr: "Deniz kirliliğinin kaynakları, etkileri ve çözüm sorumluluğu sektörler ve bölgeler arasında farklılaşır. Etkili çözüm; üretici sorumluluğu, düzenleme, atık altyapısı, kurumsal şeffaflık ve bireysel tercihler gerektirir.", en: "Sources, impacts and responsibility for marine pollution vary across sectors and regions. Effective solutions combine producer responsibility, regulation, waste infrastructure, transparency and informed choices." }, links: [["UNEP", "https://www.unep.org/plastic-pollution"], ["OECD plastics", "https://www.oecd.org/environment/plastics/"]], tag: "11" },
    { id: "challenge", title: { tr: "Okyanusu kurtarma hareketi", en: "The save-the-ocean challenge" }, copy: { tr: "Plastiği azalt, kıyı etkinliklerine katıl, doğrulanmış bilgiyi paylaş.", en: "Reduce plastic, join local cleanups and share verified information." }, detail: { tr: "Yapabileceklerin: yeniden kullanılabilir ürün seç, doğru atık ayrıştır, yerel kıyı temizliğine katıl, deniz yaşamı ürünleri için sürdürülebilir tercihleri araştır ve güvenilir kaynakları paylaş. Yerel atık yönetimi önerilerini takip et.", en: "Choose reusable goods, sort waste correctly, join local coastal cleanups, check sustainable seafood guidance and share verified sources. Follow local waste-management advice." }, links: [["UN Ocean Decade", "https://oceandecade.org/"], ["UNEP", "https://www.unep.org/"]], tag: "12" }
  ];

  const translations = {
    en: {
      navMap: "Explore", navInsights: "Research", navLife: "Marine life", navStories: "Field guide", account: "My account",
      heroEyebrow: "GLOBAL OCEAN OBSERVATION · GROUNDED IN SCIENCE", heroTitle: "Explore the<br>depths of the <span>ocean.</span>", heroCopy: "Explore marine ecosystems, examine environmental change and help understand the future of our oceans.", exploreMap: "Explore the map", discoverMore: "Explore the topics", heroNote: "Evidence-led. Transparent sources. For the ocean.", heroTag1: "EXPLORE", heroTag2: "UNDERSTAND", heroTag3: "PROTECT",
      signal1Title: "A global perspective", signal1Sub: "The world's seas on one map", signal2Title: "Marine forecasts", signal2Sub: "Clearly labelled with source and time", signal3Title: "Scientific sources", signal3Sub: "Built on trusted research and institutions", signal4Title: "Made for everyone", signal4Sub: "Mobile, tablet and desktop",
      mapEyebrow: "EXPLORE THE WORLD", mapTitle: "One ocean.<br><span>Many stories.</span>", mapIntro: "Select a sea, explore its characteristics and view available marine forecasts. Map markers indicate research topics, not measured pollution boundaries.", mapLive: "GLOBAL MARINE MAP", mapReset: "World view ↗", mapFallback: "The map couldn't load. Choose a sea below to keep exploring.", legendSea: "Seas", legendRisk: "Research topics", regionEyebrow: "SELECTED REGION", statWaves: "Wave height", statTemp: "Sea surface temperature", marineDisclaimer: "Values are Open-Meteo model forecasts, not direct observations or pollution measurements.", regionDetails: "About this region",
      insightsEyebrow: "UNDERSTAND THROUGH DATA", insightsTitle: "The ocean's <span>pulse.</span>", insightsIntro: "Explore current model forecasts for the selected sea. Charts use actual API responses; missing data is never replaced with invented values.", chartTitle: "Sea conditions", chartMeta: "Open-Meteo Marine API · Hourly model forecast", filterMetric: "Measure", wavesOption: "Wave height", tempOption: "Surface temperature", filterPeriod: "Period", downloadData: "Download CSV ↓", createReport: "Create report ↗", loadingData: "Waiting for data", assistantButton: "Ask the ocean research guide →", indicatorPollution: "Marine pollution", indicatorPollutionCopy: "Pollution is not monitored live on this map. Visit regional reports and research sources.", eeaSource: "EEA research ↗", indicatorSeaLevel: "Sea level", indicatorSeaLevelCopy: "Long-term change is tracked using satellites and tide gauges, not presented as a live reading.", nasaSource: "NASA Sea Level ↗", indicatorPlastic: "Plastic waste", indicatorPlasticCopy: "Ocean-plastic estimates depend on study method and year; there is no single live global counter.", unepSource: "UNEP research ↗", reportData: "REPORTED DATA", satelliteData: "SATELLITE DATA", researchData: "RESEARCH", chartForecastNote: "Model forecast — not a measurement station reading",
      impactEyebrow: "POLLUTION · EVIDENCE · ACTION", impactTitle: "Pollution has <span>many sources.</span>", impactIntro: "Published global estimates describe different things and years. They are not live readings or directly comparable regional pollution scores.", impactScope: "HOW TO READ THE NUMBERS", impactScopeCopy: "These figures use different scopes: plastic leakage into aquatic ecosystems includes freshwater; river studies model only river-borne plastic; ship emissions measure greenhouse gases. None is a sensor reading for the selected sea.", impactStat1Title: "Plastic entering aquatic ecosystems", impactStat1Copy: "UNEP estimates 19–23 million tonnes of plastic waste leak into aquatic ecosystems each year. This includes rivers, lakes and seas—not just direct ocean input.", impactStat2Title: "River-borne plastic", impactStat2Copy: "A 2021 model found around 1,000 rivers account for about 80% of global annual riverine plastic emissions to the ocean. This is a modeled river-input estimate, not all marine litter.", impactStat3Title: "Plastic in marine litter", impactStat3Copy: "UNEP reports plastic makes up about 85% of marine litter. Composition varies by location, sampling method and survey period.", impactStat4Title: "Shipping emissions", impactStat4Copy: "The IMO estimated shipping produced 2.89% of global anthropogenic CO₂ emissions in 2018. This is a historical estimate, not a current vessel-by-vessel measurement.", impactDataLabel: "PUBLISHED ESTIMATE", impactAfricaTitle: "Regional research areas", impactAfricaCopy: "The Gulf of Guinea and other African coasts face locally distinct pressures from land-based waste, wastewater, fishing and shipping. South and Southeast Asian river outlets, the Mediterranean and the North Pacific gyre are also important research areas. These examples are not a ranked pollution map; monitoring coverage and methods differ.", impactRegionGuinea: "Explore the Gulf of Guinea ↗", impactRegionIndian: "Explore the Indian Ocean ↗", impactRegionMediterranean: "Explore the Mediterranean ↗", impactSpeciesTitle: "Wildlife and people", impactSpeciesCopy: "Wildlife can ingest plastic, become entangled in lost gear, or lose healthy habitat. Turtles, seabirds and marine mammals face different risks; pollutants can also move through food webs. People depend on the sea for food, jobs and wellbeing, while unsafe wastewater and contaminated seafood can create health risks. Effects depend on the pollutant, species, place and exposure—follow local food-safety guidance.", impactShipsTitle: "Ships: benefits and pressures", impactShipsCopy: "Maritime transport moves most international trade by volume and supports access to food, medicine and livelihoods. At the same time, vessels contribute greenhouse-gas and air emissions, underwater noise, collision risks, invasive species and pollution from spills or waste. Cleaner fuels, efficient routing, safer operations, waste reception and international standards reduce these pressures.", impactSolutionsTitle: "Solutions and global goals", impactSolutionsCopy: "Prevent waste at source; improve reuse, collection and wastewater treatment; reduce lost fishing gear; monitor coasts consistently; protect and restore habitats; and enforce ship-pollution rules. Track progress against UN Sustainable Development Goal 14—especially targets 14.1 (marine pollution), 14.2 (ecosystems), 14.4 (fisheries) and 14.5 (protected areas)—alongside local targets.", impactSourceUnep: "UNEP · Turning off the Tap ↗", impactSourceRivers: "Meijer et al. · Science Advances (2021) ↗", impactSourceShipping: "IMO · Fourth GHG Study ↗", impactSourceAfrica: "UNEP · Regional Seas ↗", impactSourceAbidjan: "Abidjan Convention ↗", impactSourceIucn: "IUCN Red List ↗", impactSourceSdg: "UN · Sustainable Development Goal 14 ↗",
      lifeEyebrow: "LIFE IN COMMON", lifeTitle: "Life in <span>blue.</span>", lifeCopy: "Every species plays a role in the marine ecosystem. Conservation status can vary by species and population; check the IUCN record for details.", iucnButton: "IUCN Red List ↗",
      topicsEyebrow: "UNDERSTAND THE OCEAN", topicsTitle: "Go deeper. <span>Make a difference.</span>", topicsIntro: "Learn about major environmental issues, continue with trusted sources and discover everyday actions.", actionEyebrow: "WE CAN MAKE A DIFFERENCE TOGETHER", actionTitle: "One small step.<br><span>A bluer future.</span>", actionCopy: "Reduce single-use plastic, join a local cleanup and share what you learn about marine life.", actionButton: "Take action today",
      footerSlogan: "UNDERSTAND THE SEA. PROTECT OUR FUTURE.", footerCopy: "Inspired by science. Working for our seas.", footerRights: "· Sources belong to their respective owners.",
      assistantEyebrow: "OCEAN RESEARCH GUIDE", assistantTitle: "Ask a question.<br><span>Explore the evidence.</span>", assistantCopy: "Sea-temperature and wave questions use Open-Meteo model forecasts when available. Other research questions use Claude when the protected server API is configured, or the clearly labelled source guide.", assistantLabel: "What would you like to know about the sea?", assistantPlaceholder: "E.g. What are the main environmental pressures on the Sea of Marmara?", assistantAsk: "Explore", accountEyebrow: "PERSONAL RESEARCH SPACE", accountTitle: "Save what you <span>discover.</span>", accountCopy: "With Supabase configured, a verification code is sent to your email. Email verification is unavailable until the project is configured.", emailLabel: "Email", passwordLabel: "Password", passwordHint: "(8–128 characters)", signIn: "Sign in", signUp: "Create account", signOut: "Sign out", verificationCodeLabel: "Email verification code", verificationCodeHint: "Enter the 6-digit code sent to your email.", verifyEmail: "Verify email", resendCode: "Resend code", changeEmail: "Change email", accountSections: "Explore the site", drawerTitle: "Explore BLUE OCEAN", drawerCopy: "Choose a section to continue exploring.", feedbackLinksTitle: "Make a difference", feedbackIdeas: "Share an idea or project", feedbackRequests: "Requests and complaints", feedbackDialogEyebrow: "YOUR VOICE FOR THE OCEAN", feedbackTitle: "Share what you have in mind.", feedbackIntro: "Share an idea, project, request or complaint about protecting our waters and seas.", feedbackTypeLabel: "What would you like to share?", feedbackIdeaOption: "Idea or project", feedbackRequestOption: "Request", feedbackComplaintOption: "Complaint", feedbackNameLabel: "Your name (optional)", feedbackNamed: "I would like to include my name", feedbackAnonymous: "I prefer not to share my name", feedbackFullNameLabel: "First and last name", feedbackMessageLabel: "Your idea, request or complaint", feedbackMessagePlaceholder: "Write your idea, project, request or complaint here…", feedbackPrivacy: "Please do not include passwords, financial details or other sensitive personal information.", feedbackSubmit: "Send", feedbackSending: "Sending…", feedbackSent: "Thank you. Your submission has been received.", feedbackMissingConfig: "Submissions are not connected yet. Please try again later.", feedbackError: "Your submission could not be sent. Please try again later."
    }
  };
  const accountTranslations = {
    tr: {
      account: "Hesabım",
      signUp: "Hesap oluştur",
      profileEyebrow: "HESABIM",
      profileButton: "Profilim",
      visitSite: "Siteyi ziyaret et",
      profilePhotoNote: "Fotoğrafın bu cihazda saklanır.",
      settingsTitle: "Ayarlar",
      languageLabel: "Site dili",
      fullNameLabel: "Ad soyad",
      forgotPassword: "Şifremi unuttum",
      recoveryCodeLabel: "E-posta kurtarma kodu",
      recoveryCodeHint: "E-postana gelen 6 haneli kodu gir.",
      newPasswordLabel: "Yeni parola",
      sendRecoveryCode: "Kurtarma kodu gönder",
      updatePassword: "Yeni parolayı kaydet",
      backToSignIn: "Girişe dön",
      signupAction: "Kayıt ol",
      signIn: "Giriş yap",
      profileNameFallback: "BLUE OCEAN üyesi",
      recoverySent: "6 haneli kurtarma kodu e-posta adresine gönderildi.",
      recoveryUpdated: "Parolan güncellendi. Giriş yaptın.",
      recoveryUnavailable: "Şifre kurtarma için önce Supabase ayarlarını tamamla.",
      recoveryFailed: "Kurtarma isteği tamamlanamadı. E-posta adresini ve kodu kontrol et."
    },
    en: {
      account: "My account",
      signUp: "Create account",
      profileEyebrow: "MY PROFILE",
      profileButton: "My profile",
      visitSite: "Visit the site",
      profilePhotoNote: "Your photo is stored on this device.",
      settingsTitle: "Settings",
      languageLabel: "Site language",
      fullNameLabel: "Full name",
      forgotPassword: "Forgot password?",
      recoveryCodeLabel: "Email recovery code",
      recoveryCodeHint: "Enter the 6-digit code sent to your email.",
      newPasswordLabel: "New password",
      sendRecoveryCode: "Send recovery code",
      updatePassword: "Save new password",
      backToSignIn: "Back to sign in",
      signupAction: "Sign up",
      signIn: "Sign in",
      profileNameFallback: "BLUE OCEAN member",
      recoverySent: "A 6-digit recovery code was sent to your email.",
      recoveryUpdated: "Your password was updated and you are signed in.",
      recoveryUnavailable: "Configure Supabase before using password recovery.",
      recoveryFailed: "Password recovery failed. Check your email and code."
    }
  };
  Object.assign(translations.en, {
    navImpact: "Impact & action",
    impactUnitMillionTonnes: "Mt / year",
    impactUnitRivers: "rivers",
    impactValueShipping: "2.89%",
    impactHistoricalLabel: "2018 DATA",
    impactSourceUnepReport: "UNEP · Turning off the Tap (2023) ↗",
    impactFootnote: "Note: These published figures use different definitions, geographic scopes and years. Selecting a sea on the map does not turn them into local measurements; this page does not provide live pollution-sensor data."
  });
  let language = localStorage.getItem("bo-language") === "en" ? "en" : "tr";
  let pendingVerificationEmail = "";
  let signupMode = false;
  let recoveryCodeSent = false;
  let selectedRegion = regions[0];
  let liveData = null;
  let map = null;
  let markerLayer = null;
  let tileLayer = null;
  let tileErrors = 0;
  let usingAlternateTiles = false;
  let toastTimer = null;
  let marineController = null;
  let lastMarineRefreshAt = 0;
  let saved = readJSON("bo-saved", { regions: [], topics: [] });
  const userLibrary = readJSON("bo-library", { favorites: [], lists: [] });
  const $ = (selector, parent = document) => parent.querySelector(selector);
  const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];
  const text = (key) => {
    if (language === "en" && translations.en[key]) return translations.en[key];
    if (accountTranslations[language]?.[key]) return accountTranslations[language][key];
    const turkish = {
      feedbackSubmit: "Gönder",
      feedbackSending: "Gönderiliyor…",
      feedbackSent: "Teşekkürler. Gönderin alındı.",
      feedbackMissingConfig: "Gönderim sistemi henüz bağlı değil. Lütfen daha sonra tekrar dene.",
      feedbackError: "Gönderin iletilemedi. Lütfen daha sonra tekrar dene."
    };
    return turkish[key] || key;
  };
  const local = (value) => typeof value === "object" ? (value[language] || value.tr) : value;
  function readJSON(key, fallback) { try { const value = JSON.parse(localStorage.getItem(key)); return value && typeof value === "object" ? value : fallback; } catch { return fallback; } }
  function escapeHTML(value) { return String(value).replace(/[&<>"']/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch]); }
  function notify(message) { const toast = $("#toast"); toast.textContent = message; toast.classList.add("show"); clearTimeout(toastTimer); toastTimer = setTimeout(() => toast.classList.remove("show"), 2600); }
  function setLanguage(next) {
    language = next; localStorage.setItem("bo-language", language); document.documentElement.lang = language; document.title = language === "tr" ? "BLUE OCEAN — Denizleri Anla, Geleceği Koru" : "BLUE OCEAN — Understand the Sea, Protect Our Future";
    $$("[data-i18n]").forEach(el => { const value = translations[language]?.[el.dataset.i18n] || accountTranslations[language]?.[el.dataset.i18n]; if (value) el.innerHTML = value; });
    $$("[data-i18n-placeholder]").forEach(el => { const value = translations[language]?.[el.dataset.i18nPlaceholder] || accountTranslations[language]?.[el.dataset.i18nPlaceholder]; if (value) el.placeholder = value; });
    $("#language-switch").textContent = language === "tr" ? "EN" : "TR"; $("#profile-language").value = language; renderRegions(); renderSpecies(); renderTopics(); updateRegionPanel(); renderChart(); renderSavedCount(); updateAccountUI(); if (map) refreshMarkers(); if (!$("#map-fallback").hidden) $("#map-reset").textContent = language === "tr" ? "Haritayı yeniden dene ↻" : "Retry map ↻";
  }
  function initMap() {
    if (!window.L || !$("#ocean-map")) { showMapFallback(); return; }
    try {
      map = L.map("ocean-map", { zoomControl: false, scrollWheelZoom: false, worldCopyJump: true, minZoom: 2 }).setView([15, 4], 2);
      addPrimaryTileLayer();
      L.control.zoom({ position: "topright" }).addTo(map);
      markerLayer = L.layerGroup().addTo(map);
      map.on("click", () => { map.scrollWheelZoom.enable(); });
      refreshMarkers();
      map.setView([selectedRegion.lat, selectedRegion.lon], selectedRegion.zoom);
      setTimeout(() => map?.invalidateSize(), 100);
    } catch (error) { console.error("Map initialization failed:", error); showMapFallback(); }
  }
  function addPrimaryTileLayer() {
    tileLayer?.off("tileerror", handleTileError);
    tileLayer?.remove();
    tileErrors = 0;
    usingAlternateTiles = false;
    $("#map-attribution").textContent = "© Esri · GEBCO · NOAA";
    tileLayer = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}", {
      maxZoom: 9,
      attribution: "Tiles &copy; Esri — Sources: Esri, GEBCO, NOAA, National Geographic, and other contributors"
    });
    tileLayer.on("tileerror", handleTileError);
    tileLayer.addTo(map);
  }
  function handleTileError() {
    tileErrors += 1;
    if (tileErrors < 4) return;
    tileErrors = 0;
    if (map && !usingAlternateTiles) {
      usingAlternateTiles = true;
      tileLayer?.off("tileerror", handleTileError);
      tileLayer?.remove();
      tileLayer = L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
        subdomains: "abcd",
        maxZoom: 9,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a> &copy; <a href="https://carto.com/">CARTO</a>'
      });
      $("#map-attribution").textContent = "© OpenStreetMap · CARTO";
      tileLayer.on("tileerror", handleTileError);
      tileLayer.addTo(map);
      notify(language === "tr" ? "Harita alternatif veri kaynağına geçti." : "Map switched to an alternate tile provider.");
      return;
    }
    if (usingAlternateTiles) {
      tileLayer?.off("tileerror", handleTileError);
      tileLayer?.remove();
      tileLayer = null;
      showMapFallback();
      notify(language === "tr" ? "Harita sağlayıcıları yanıt vermiyor. Bölge listesini kullanabilirsin." : "Map providers are unavailable. Use the region list instead.");
    }
  }
  function showMapFallback() {
    tileLayer?.off("tileerror", handleTileError);
    tileLayer?.remove();
    tileLayer = null;
    $("#ocean-map").hidden = true; $("#map-fallback").hidden = false;
    $("#map-attribution").textContent = "";
    $("#map-reset").textContent = language === "tr" ? "Haritayı yeniden dene ↻" : "Retry map ↻";
    $("#fallback-regions").innerHTML = regions.map(r => `<button type="button" data-region="${r.id}">${escapeHTML(local(r.name))}</button>`).join("");
    $$("#fallback-regions button").forEach(button => button.addEventListener("click", () => selectRegion(button.dataset.region)));
  }
  function retryMap() {
    if (!window.L) { notify(language === "tr" ? "Harita kitaplığı henüz yüklenmedi." : "The map library has not loaded yet."); return; }
    if (!map) { initMap(); return; }
    $("#ocean-map").hidden = false;
    $("#map-fallback").hidden = true;
    $("#map-reset").textContent = text("mapReset");
    addPrimaryTileLayer();
    map.invalidateSize();
  }
  function refreshMarkers() {
    if (!map || !markerLayer) return;
    markerLayer.clearLayers();
    regions.forEach(region => {
      const icon = L.divIcon({ className: "", html: '<span class="ocean-marker"></span>', iconSize: [14, 14], iconAnchor: [7, 7] });
      L.marker([region.lat, region.lon], { icon, title: local(region.name), alt: local(region.name) }).bindPopup(`<strong>${escapeHTML(local(region.name))}</strong><br><span>${language === "tr" ? "Bölge bilgisini görüntüle" : "View region information"}</span>`).on("click", () => selectRegion(region.id, false)).addTo(markerLayer);
    });
    risks.forEach(risk => {
      const icon = L.divIcon({ className: "", html: '<span class="risk-marker"></span>', iconSize: [13, 13], iconAnchor: [7, 7] });
      L.marker([risk.lat, risk.lon], { icon, title: local(risk.name) }).bindPopup(`<strong>${escapeHTML(local(risk.name))}</strong><br><span>${language === "tr" ? "Şematik araştırma alanı · kirlilik sınırı değildir." : "Illustrative research area · not a pollution boundary."}</span>`).addTo(markerLayer);
    });
  }
  function renderRegions() {
    $("#region-chips").innerHTML = regions.map(region => `<button type="button" class="region-chip${region.id === selectedRegion.id ? " active" : ""}" data-region="${region.id}" aria-pressed="${region.id === selectedRegion.id}">${escapeHTML(local(region.name))}</button>`).join("");
    $$(".region-chip").forEach(button => button.addEventListener("click", () => selectRegion(button.dataset.region)));
  }
  function selectRegion(id, pan = true) {
    const region = regions.find(item => item.id === id);
    if (!region) return;
    selectedRegion = region; renderRegions(); updateRegionPanel(); loadMarineData(); renderChart();
    if (pan && map) map.flyTo([region.lat, region.lon], region.zoom, { duration: .7 });
  }
  function updateRegionPanel() {
    $("#region-name").textContent = local(selectedRegion.name); $("#region-description").textContent = local(selectedRegion.description);
    $("#save-region").classList.toggle("is-saved", saved.regions.includes(selectedRegion.id)); $("#save-region").textContent = saved.regions.includes(selectedRegion.id) ? "♥" : "♡";
  }
  async function loadMarineData() {
    if (marineController) marineController.abort(); marineController = new AbortController();
    lastMarineRefreshAt = Date.now();
    $("#wave-value").textContent = "—"; $("#temp-value").textContent = "—"; $("#wave-time").textContent = language === "tr" ? "Veri yükleniyor" : "Loading data"; $("#temp-time").textContent = language === "tr" ? "Veri yükleniyor" : "Loading data";
    $("#chart-updated").textContent = text("loadingData"); $("#chart-current").textContent = "—"; liveData = null; renderChart();
    const url = `https://marine-api.open-meteo.com/v1/marine?latitude=${selectedRegion.lat}&longitude=${selectedRegion.lon}&hourly=wave_height,sea_surface_temperature&forecast_days=7&past_days=7&timezone=UTC`;
    try {
      const response = await fetch(url, { signal: marineController.signal, headers: { Accept: "application/json" } });
      if (!response.ok) throw new Error(`Marine API returned ${response.status}`);
      const payload = await response.json();
      if (!payload.hourly || !Array.isArray(payload.hourly.time)) throw new Error("Marine API response has no hourly series");
      liveData = { payload, receivedAt: new Date().toISOString() };
      const times = payload.hourly.time, currentIndex = times.findIndex(time => new Date(time).getTime() >= Date.now());
      showMetric("wave", currentIndex >= 0 ? currentIndex : 0); showMetric("temp", currentIndex >= 0 ? currentIndex : 0);
      $("#chart-updated").textContent = `${language === "tr" ? "API yanıtı" : "API response"} · ${formatDate(liveData.receivedAt)}`; $("#chart-meta").textContent = `Open-Meteo Marine API · ${payload.hourly_units?.time || "local"} · ${language === "tr" ? "tahmin ve arşiv" : "forecast and archive"}`;
      renderChart();
    } catch (error) {
      if (error.name === "AbortError") return;
      console.error("Unable to load marine forecast:", error);
      $("#wave-time").textContent = $("#temp-time").textContent = language === "tr" ? "Veri şu an alınamıyor" : "Data unavailable";
      $("#chart-updated").textContent = language === "tr" ? "Kaynağa ulaşılamıyor" : "Source unavailable"; $("#chart-state").textContent = language === "tr" ? "Canlı API verisi şu an kullanılamıyor." : "Live API data is currently unavailable.";
      $("#chart-meta").textContent = language === "tr" ? "Open-Meteo Marine API · bağlantı bekleniyor" : "Open-Meteo Marine API · connection pending"; renderChart();
    }
  }
  function formatDate(value) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return new Intl.DateTimeFormat(language === "tr" ? "tr-TR" : "en-GB", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit", timeZone: "UTC" }).format(date) + " UTC";
  }
  function showMetric(metric, index) {
    if (!liveData) return;
    const { hourly, hourly_units: units = {} } = liveData.payload;
    const key = metric === "wave" ? "wave_height" : "sea_surface_temperature";
    const value = hourly[key]?.[index]; const unit = units[key] || (metric === "wave" ? "m" : "°C");
    const formatted = typeof value === "number" ? `${value.toFixed(1)} ${unit}` : "—";
    if (metric === "wave") { $("#wave-value").textContent = formatted; $("#wave-time").textContent = value == null ? (language === "tr" ? "Bu konum için veri yok" : "No data for this location") : formatDate(hourly.time[index]); }
    else { $("#temp-value").textContent = formatted; $("#temp-time").textContent = value == null ? (language === "tr" ? "Bu konum için veri yok" : "No data for this location") : formatDate(hourly.time[index]); }
  }
  function renderChart() {
    const svg = $("#data-chart"), metric = $("#chart-metric").value, period = Number($("#chart-period").value), data = liveData?.payload?.hourly;
    const key = metric === "wave" ? "wave_height" : "sea_surface_temperature", unit = liveData?.payload?.hourly_units?.[key] || (metric === "wave" ? "m" : "°C");
    $("#chart-kicker").textContent = `${metric === "wave" ? text("wavesOption") : text("tempOption")} · ${unit}`.toLocaleUpperCase(language === "tr" ? "tr-TR" : "en");
    $("#chart-units").textContent = `${language === "tr" ? "Birim" : "Unit"}: ${unit}`;
    $("#chart-source").textContent = `${language === "tr" ? "Kaynak" : "Source"}: Open-Meteo Marine API · ${language === "tr" ? "model verisi" : "model data"}`;
    if (!data || !Array.isArray(data[key])) { $("#chart-current").textContent = "—"; svg.innerHTML = `<text x="50%" y="50%" fill="#91aab1" font-size="12" text-anchor="middle" dominant-baseline="middle">${escapeHTML(language === "tr" ? "Kaynak verisi kullanılabilir olduğunda grafik burada gösterilir." : "The chart will appear here when source data is available.")}</text>`; return; }
    const start = Math.max(0, data.time.length - period), allValues = data[key].slice(start).map((v, i) => ({ value: v, time: data.time[start + i] })).filter(point => typeof point.value === "number" && Number.isFinite(point.value));
    if (!allValues.length) { $("#chart-current").textContent = "—"; svg.innerHTML = `<text x="50%" y="50%" fill="#91aab1" font-size="12" text-anchor="middle" dominant-baseline="middle">${escapeHTML(language === "tr" ? "Seçili dönem için sayısal veri yok." : "No numeric values for this period.")}</text>`; return; }
    const current = allValues.find(point => new Date(point.time).getTime() >= Date.now()) || allValues[0];
    $("#chart-current").textContent = `${current.value.toFixed(1)} ${unit}`;
    $("#chart-state").textContent = `${local(selectedRegion.name)} · ${language === "tr" ? "tahmin serisi" : "forecast series"} · ${formatDate(current.time)}`;
    const min = Math.min(...allValues.map(p => p.value)), max = Math.max(...allValues.map(p => p.value)), padding = Math.max((max - min) * .16, .2), low = metric === "wave" ? Math.max(0, min - padding) : min - padding, high = max + padding;
    const x0 = 45, x1 = 745, y0 = 18, y1 = 188, points = allValues.map((point, index) => `${(x0 + index / Math.max(allValues.length - 1, 1) * (x1 - x0)).toFixed(2)},${(y1 - ((point.value - low) / (high - low)) * (y1 - y0)).toFixed(2)}`).join(" ");
    const labels = [0, .33, .66, 1].map((fraction, i) => {
      const index = Math.min(Math.round(fraction * (allValues.length - 1)), allValues.length - 1);
      return `<text x="${(x0 + fraction * (x1 - x0)).toFixed(1)}" y="218" fill="#829ca4" font-size="9" text-anchor="${i === 0 ? "start" : i === 3 ? "end" : "middle"}">${escapeHTML(new Intl.DateTimeFormat(language === "tr" ? "tr-TR" : "en-GB", { day: "2-digit", month: "short", hour: "2-digit", timeZone: "UTC" }).format(new Date(allValues[index].time)))}</text>`;
    }).join("");
    const grid = [0, 1, 2, 3].map(i => { const y = y0 + i * (y1 - y0) / 3; const val = high - i * (high - low) / 3; return `<line x1="${x0}" x2="${x1}" y1="${y}" y2="${y}" stroke="#234354" stroke-width="1"/><text x="4" y="${y + 3}" fill="#829ca4" font-size="9">${val.toFixed(1)}</text>`; }).join("");
    svg.innerHTML = `<defs><linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stop-color="#59d7c6" stop-opacity=".24"/><stop offset="100%" stop-color="#59d7c6" stop-opacity="0"/></linearGradient></defs>${grid}<polygon points="${x0},${y1} ${points} ${x1},${y1}" fill="url(#chartFill)"/><polyline points="${points}" fill="none" stroke="#59d7c6" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"/>${labels}`;
  }
  function downloadCSV() {
    const series = liveData?.payload?.hourly, metric = $("#chart-metric").value, key = metric === "wave" ? "wave_height" : "sea_surface_temperature";
    if (!series || !Array.isArray(series[key])) { notify(language === "tr" ? "İndirilecek canlı veri yok." : "No live data to download."); return; }
    const csv = ["timestamp_utc,value,unit,region,source,series", ...series.time.map((time, i) => `${time},${series[key][i] ?? ""},${liveData.payload.hourly_units?.[key] || ""},"${local(selectedRegion.name).replaceAll('"', '""')}",Open-Meteo,"${series[key][i] == null ? "unavailable" : "model forecast or archive"}"`)].join("\r\n");
    const link = document.createElement("a"); link.href = URL.createObjectURL(new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" })); link.download = `blue-ocean-${selectedRegion.id}-${key}-${new Date().toISOString().slice(0, 10)}.csv`; link.click(); URL.revokeObjectURL(link.href);
  }
  function toggleSaved() {
    const list = saved.regions, index = list.indexOf(selectedRegion.id);
    if (index >= 0) list.splice(index, 1); else list.push(selectedRegion.id);
    persistSaved(); updateRegionPanel(); renderSavedCount(); syncCloudLibrary();
    notify(language === "tr" ? (index >= 0 ? "Favorilerinden çıkarıldı." : "Deniz favorilerine eklendi.") : (index >= 0 ? "Removed from favourites." : "Sea added to favourites."));
  }
  function renderSavedCount() { $("#saved-count").textContent = saved.regions.length + saved.topics.length; }
  function renderSpecies() {
    $("#species-grid").innerHTML = species.map((item, i) => `<article class="species-card"><div class="species-image" role="img" aria-label="${escapeHTML(local(item.name))}" style="background-image:url('https://images.unsplash.com/${item.img}?auto=format&fit=crop&w=640&q=75')"></div><div class="species-content"><h3>${escapeHTML(local(item.name))}</h3><em>${escapeHTML(item.scientific)}</em><br><span class="species-status">${escapeHTML(local(item.status))}</span><button class="species-detail text-button" data-species="${i}">${language === "tr" ? "Tür bilgisi →" : "Species details →"}</button></div></article>`).join("");
    $$(".species-detail").forEach(button => button.addEventListener("click", () => openSpecies(Number(button.dataset.species))));
  }
  function renderTopics() {
    $("#topics-grid").innerHTML = topics.map(item => `<button type="button" class="topic-card" data-topic="${item.id}"><span class="topic-number"><span>${item.tag}</span><span aria-hidden="true">↗</span></span><h3>${escapeHTML(local(item.title))}</h3><p>${escapeHTML(local(item.copy))}</p></button>`).join("");
    $$(".topic-card").forEach(button => button.addEventListener("click", () => openTopic(button.dataset.topic)));
  }
  function openDetail(title, copy, links, saveId, isSaved) {
    $("#detail-content").innerHTML = `<p class="eyebrow section-eyebrow">${language === "tr" ? "BİLİMSEL KEŞİF REHBERİ" : "SCIENTIFIC FIELD GUIDE"}</p><h2>${escapeHTML(title)}</h2><p class="dialog-copy">${escapeHTML(copy)}</p><div class="dialog-sources">${links.map(([label, url]) => `<a href="${escapeHTML(url)}" target="_blank" rel="noreferrer">${escapeHTML(label)} ↗</a>`).join("")}</div><button class="text-button detail-save" data-save-id="${escapeHTML(saveId)}">${isSaved ? (language === "tr" ? "Araştırma listemden çıkar −" : "Remove from research list −") : (language === "tr" ? "Araştırma listeme ekle +" : "Add to research list +")}</button>`;
    $("#detail-dialog").showModal();
    $(".detail-save").addEventListener("click", event => {
      const id = event.currentTarget.dataset.saveId, idx = saved.topics.indexOf(id);
      if (idx >= 0) saved.topics.splice(idx, 1); else saved.topics.push(id);
      persistSaved(); renderSavedCount(); syncCloudLibrary();
      event.currentTarget.textContent = idx >= 0 ? (language === "tr" ? "Araştırma listeme ekle +" : "Add to research list +") : (language === "tr" ? "Araştırma listemden çıkar −" : "Remove from research list −");
      notify(language === "tr" ? (idx >= 0 ? "Araştırma listesinden çıkarıldı." : "Araştırma listene eklendi.") : (idx >= 0 ? "Removed from research list." : "Added to research list."));
    });
  }
  function openTopic(id) { const item = topics.find(topic => topic.id === id); if (item) openDetail(local(item.title), local(item.detail), item.links, item.id, saved.topics.includes(item.id)); }
  function openSpecies(index) { const item = species[index]; if (item) openDetail(local(item.name), `${item.scientific}\n\n${local(item.detail)}`, [["IUCN Red List", item.source]], `species-${index}`, saved.topics.includes(`species-${index}`)); }
  function openRegionDetails() {
    openDetail(local(selectedRegion.name), local(selectedRegion.description), [["NOAA Ocean Service", "https://oceanservice.noaa.gov/"], ["UN Ocean Decade", "https://oceandecade.org/"]], `region-${selectedRegion.id}`, saved.topics.includes(`region-${selectedRegion.id}`));
  }
  function openSavedList() {
    const list = [
      ...saved.regions.map(id => {
        const item = regions.find(region => region.id === id);
        return item ? `<button class="topic-card saved-item" data-region="${item.id}"><span class="topic-number">♡</span><h3>${escapeHTML(local(item.name))}</h3><p>${escapeHTML(local(item.description))}</p></button>` : "";
      }),
      ...saved.topics.map(id => {
        const topic = topics.find(item => item.id === id);
        if (topic) return `<button class="topic-card saved-item" data-topic="${topic.id}"><span class="topic-number">${topic.tag}</span><h3>${escapeHTML(local(topic.title))}</h3><p>${escapeHTML(local(topic.copy))}</p></button>`;
        const speciesMatch = /^species-([0-7])$/.exec(id);
        if (speciesMatch) {
          const item = species[Number(speciesMatch[1])];
          return `<button class="topic-card saved-item" data-species="${Number(speciesMatch[1])}"><span class="topic-number">IUCN</span><h3>${escapeHTML(local(item.name))}</h3><p>${escapeHTML(item.scientific)}</p></button>`;
        }
        const regionMatch = /^region-(.+)$/.exec(id), region = regionMatch && regions.find(item => item.id === regionMatch[1]);
        return region ? `<button class="topic-card saved-item" data-region-detail="${region.id}"><span class="topic-number">↗</span><h3>${escapeHTML(local(region.name))}</h3><p>${escapeHTML(local(region.description))}</p></button>` : "";
      })
    ].filter(Boolean);
    $("#detail-content").innerHTML = `<p class="eyebrow section-eyebrow">${language === "tr" ? "KİŞİSEL ARAŞTIRMA ALANI" : "PERSONAL RESEARCH SPACE"}</p><h2>${language === "tr" ? "Kaydettiklerin" : "Your saved list"}</h2><p class="dialog-copy">${language === "tr" ? "Bu liste bu tarayıcıda saklanır." : "This list is saved in this browser."}</p><div class="topics-grid">${list.length ? list.join("") : `<p class="dialog-copy">${language === "tr" ? "Henüz kayıt yok. Bir denizi veya araştırma konusunu kaydet." : "Nothing saved yet. Save a sea or research topic."}</p>`}</div>`;
    $("#detail-dialog").showModal();
  }
  function createReport() {
    const metric = $("#chart-metric").value, seriesKey = metric === "wave" ? "wave_height" : "sea_surface_temperature";
    const unit = liveData?.payload?.hourly_units?.[seriesKey] || (metric === "wave" ? "m" : "°C");
    const value = $("#chart-current").textContent;
    const snapshot = new Date().toLocaleString(language === "tr" ? "tr-TR" : "en-GB", { dateStyle: "long", timeStyle: "short", timeZone: "UTC" }) + " UTC";
    const report = document.createElement("article");
    report.id = "print-report";
    report.innerHTML = `<p class="eyebrow">${language === "tr" ? "BLUE OCEAN · DENİZ ARAŞTIRMA ÖZETİ" : "BLUE OCEAN · MARINE RESEARCH SUMMARY"}</p><h1>${escapeHTML(local(selectedRegion.name))}</h1><p>${escapeHTML(local(selectedRegion.description))}</p><h2>${language === "tr" ? "Mevcut model verisi" : "Available model data"}</h2><p><strong>${escapeHTML(metric === "wave" ? text("wavesOption") : text("tempOption"))}:</strong> ${escapeHTML(value)} <span>${escapeHTML(unit)}</span></p><p><strong>${language === "tr" ? "Tahmin zaman serisi:" : "Forecast time series:"}</strong> ${escapeHTML($("#chart-state").textContent)}</p><p>${language === "tr" ? "Veri kaynağı: Open-Meteo Marine API. Model tahmini; doğrudan istasyon ölçümü veya kirlilik verisi değildir." : "Source: Open-Meteo Marine API. Model forecast; not a direct station observation or pollution measurement."}</p><p><strong>${language === "tr" ? "Hazırlanma zamanı:" : "Report generated:"}</strong> ${escapeHTML(snapshot)}</p><h2>${language === "tr" ? "Kaynaklar" : "Sources"}</h2><p>https://open-meteo.com/en/docs/marine-weather-api</p><p>https://www.unep.org/topics/ocean-seas-and-coasts</p><p>https://www.iucnredlist.org/</p><small>BLUE OCEAN · ${escapeHTML(language === "tr" ? "Denizleri Anla, Geleceği Koru." : "Understand the Sea, Protect Our Future.")}</small>`;
    $("#print-report")?.remove();
    document.body.append(report);
    window.print();
    window.addEventListener("afterprint", () => report.remove(), { once: true });
  }
  function assistantResponse(question) {
    const q = question.toLocaleLowerCase("tr-TR");
    if (/marmara|müsilaj/.test(q)) return language === "tr" ? "Marmara Denizi için araştırılan başlıca baskılar arasında yüksek besin ve atık su yükü, kıyı habitatlarının değişimi, yoğun deniz trafiği ve zaman zaman görülen müsilaj olayları bulunur. Etkiler bölgeye ve döneme göre farklılaşır; tek bir gösterge bütün denizin durumunu açıklamaz.\n\nKaynak: T.C. Çevre, Şehircilik ve İklim Değişikliği Bakanlığı, Marmara Denizi Eylem Planı; Avrupa Çevre Ajansı." : "Key pressures studied in the Sea of Marmara include nutrient and wastewater loads, changing coastal habitats, heavy shipping and episodic mucilage. Impacts vary by place and time; no single indicator describes the whole sea.\n\nSources: Türkiye Ministry of Environment, Marmara Sea Action Plan; European Environment Agency.";
    if (/mikroplast|microplastic|sağlık|health|insan/.test(q)) return language === "tr" ? "Mikroplastikler 5 mm'den küçük plastik parçacıklarıdır ve besin ağlarında bulunabilir. İnsan maruziyetinin olası yolları ve etkileri araştırılmaya devam ediyor; mevcut kanıtlar belirsizlik içeriyor. Kesin sağlık sonucu iddia etmek doğru değildir. Plastik kullanımını kaynağında azaltmak ve atık yönetimini iyileştirmek temel önlemlerdendir.\n\nKaynaklar: UNEP Plastic Pollution; WHO, Microplastics in drinking-water (2019)." : "Microplastics are plastic particles under 5 mm and can be found in food webs. Possible human exposure routes and effects are still being studied, and evidence remains uncertain. It is not appropriate to claim a definite health outcome. Reducing plastic use at source and improving waste management are key measures.\n\nSources: UNEP Plastic Pollution; WHO, Microplastics in drinking-water (2019).";
    if (/kaplumba|balina|köpek.?bal|mercan|tür|canlı|species|wildlife|shark|whale|turtle|coral/.test(q)) return language === "tr" ? "Deniz türlerinin durumu tür ve popülasyona göre değişir. Hedef dışı avcılık, habitat kaybı, deniz ısınması, kirlilik ve su altı gürültüsü önemli baskılardır. Güncel ve türe özgü korunma kategorileri için IUCN Kırmızı Liste kayıtlarını kontrol et.\n\nKaynak: IUCN Red List of Threatened Species." : "Status varies by species and population. Bycatch, habitat loss, ocean warming, pollution and underwater noise are important pressures. Check the IUCN Red List for current, species-specific assessments.\n\nSource: IUCN Red List of Threatened Species.";
    if (/plastik|garbage|çöp|atık|plastic|patch/.test(q)) return language === "tr" ? "Plastik atıklar yetersiz toplama ve yönetim, nehir taşınımı, rüzgâr ve deniz faaliyetleriyle okyanusa ulaşabilir. Akıntılar yüzer atıkları bazı bölgelerde yoğunlaştırır; Büyük Pasifik Çöp Alanı katı bir ada değil, geniş ve dinamik bir birikim bölgesidir. Atığı kaynağında önlemek ve yeniden kullanım önemlidir.\n\nKaynaklar: NOAA Marine Debris; UNEP." : "Plastic reaches the ocean through inadequate collection and management, rivers, wind and marine activities. Currents concentrate floating debris in some areas; the Great Pacific Garbage Patch is a broad, dynamic accumulation zone, not a solid island. Preventing waste at source and reuse matter.\n\nSources: NOAA Marine Debris; UNEP.";
    if (/sıcak|ısı|iklim|temperature|climate/.test(q)) return language === "tr" ? "Deniz suyu sıcaklıkları mevsimler, enlem, akıntılar, rüzgâr ve hava koşullarıyla değişir. Uzun dönemli deniz ısınması iklim değişikliğiyle ilişkilidir; gözlem ve model tahminlerini ayırmak gerekir. Bu sayfadaki Open-Meteo değerleri model tahminidir, doğrudan ölçüm değildir.\n\nKaynaklar: IPCC; Open-Meteo Marine API." : "Sea surface temperatures vary with seasons, latitude, currents, wind and weather. Long-term ocean warming is linked to climate change; observations and forecasts should be distinguished. Open-Meteo values shown here are model forecasts, not direct measurements.\n\nSources: IPCC; Open-Meteo Marine API.";
    if (/koru|çözüm|yapabil|method|protect|solution/.test(q)) return language === "tr" ? "Etkili adımlar arasında tek kullanımlık plastikleri azaltmak, doğru atık yönetimi, sürdürülebilir balıkçılık, kritik habitatları korumak, deniz koruma alanlarını bilimsel olarak tasarlamak ve sera gazı emisyonlarını düşürmek yer alır. En uygun adım yerel kaynaklara ve koşullara bağlıdır.\n\nKaynaklar: UNEP; UN Ocean Decade; IUCN." : "Effective actions include reducing single-use plastics, better waste management, sustainable fisheries, protecting critical habitats, scientifically designed marine protected areas and cutting greenhouse gas emissions. The best action depends on local conditions.\n\nSources: UNEP; UN Ocean Decade; IUCN.";
    return language === "tr" ? "Sorunu güvenilir bilimsel kaynaklarla yanıtlamak önemli. Bu konuda başlangıç için IPCC'nin okyanus ve kriyosfer raporlarını, UNEP'in deniz ortamı araştırmalarını, NOAA Ocean Service kaynaklarını veya IUCN Kırmızı Liste'yi inceleyebilirsin. Bu çevrimdışı rehber genel bilgilendirme sunar; yapılandırılmış araştırma API'si olmadan yapay zekâ yanıtı üretmez." : "Reliable scientific sources are important for answering that question. Start with IPCC reports on oceans and cryosphere, UNEP marine research, NOAA Ocean Service or the IUCN Red List. This offline guide provides general information and does not generate AI answers unless a research API is configured.";
  }
  function showResearchGuide(question, notice = "") {
    const answer = $("#assistant-answer");
    const references = [
      ["UNEP", "https://www.unep.org/topics/ocean-seas-and-coasts"],
      ["NOAA", "https://oceanservice.noaa.gov/hazards/marinedebris/"],
      ["IUCN", "https://www.iucnredlist.org/"],
      ["IPCC", "https://www.ipcc.ch/"]
    ];
    const login = authConfigReady() && !currentSession()
      ? `<button class="text-button assistant-login" type="button">${language === "tr" ? "Claude için giriş yap →" : "Sign in for Claude →"}</button>`
      : "";
    answer.innerHTML = `${notice ? `<p class="assistant-notice">${escapeHTML(notice)}</p>` : ""}<strong>${language === "tr" ? "Kaynak rehberi · Yapay zekâ yanıtı değil." : "Source guide · Not an AI-generated answer."}</strong><br>${escapeHTML(assistantResponse(question))}<br><br>${language === "tr" ? "Daha fazla okuma: " : "Further reading: "}${references.map(([label, url]) => `<a href="${url}" target="_blank" rel="noopener noreferrer">${label} ↗</a>`).join(" · ")}${login}`;
    $(".assistant-login", answer)?.addEventListener("click", () => {
      $("#assistant-dialog").close();
      $("#account-button").click();
    });
  }
  function marineForecastAnswer(question) {
    if (!liveData) return null;
    const query = question.toLocaleLowerCase("tr-TR");
    const requestsCurrentValue = /(kaç|ne kadar|güncel|şu an|bugün|tahmin|current|right now|today|forecast|how high|how warm|what(?:'s| is))/.test(query)
      || /(sıcaklığı?|dalga yüksekliği|temperature|wave height)\s*\?$/i.test(query);
    const asksWaves = /(dalga|wave)/i.test(query);
    const asksTemperature = /(sıcak|temperat|°c|derece|degree)/i.test(query);
    if (!requestsCurrentValue || (!asksWaves && !asksTemperature)) return null;

    const hourly = liveData.payload.hourly;
    const index = hourly.time.findIndex(time => new Date(time).getTime() >= Date.now());
    if (index < 0) return null;
    const values = [];
    if (asksWaves && Number.isFinite(hourly.wave_height?.[index])) {
      values.push(`${language === "tr" ? "Dalga yüksekliği" : "Wave height"}: ${hourly.wave_height[index].toFixed(1)} ${liveData.payload.hourly_units?.wave_height || "m"}`);
    }
    if (asksTemperature && Number.isFinite(hourly.sea_surface_temperature?.[index])) {
      values.push(`${language === "tr" ? "Deniz yüzeyi sıcaklığı" : "Sea-surface temperature"}: ${hourly.sea_surface_temperature[index].toFixed(1)} ${liveData.payload.hourly_units?.sea_surface_temperature || "°C"}`);
    }
    if (!values.length) return null;

    const heading = language === "tr"
      ? "Open-Meteo Marine API · model tahmini, yapay zekâ yanıtı değil."
      : "Open-Meteo Marine API · model forecast, not an AI-generated answer.";
    const details = language === "tr"
      ? `${local(selectedRegion.name)} için ${formatDate(hourly.time[index])} tahmini: ${values.join(" · ")}. Bu bir model tahminidir; istasyon ölçümü, kirlilik ölçümü veya gerçek zamanlı sensör verisi değildir.`
      : `${values.join(" · ")} for ${local(selectedRegion.name)}, forecast for ${formatDate(hourly.time[index])}. This is a model forecast, not a station observation, pollution measurement or real-time sensor reading.`;
    return { heading, details };
  }
  async function askResearch(question) {
    const answer = $("#assistant-answer"); answer.textContent = language === "tr" ? "Güvenilir kaynaklar taranıyor…" : "Checking trusted sources…";
    const marineForecast = marineForecastAnswer(question);
    if (marineForecast) {
      showResearchGuide(question);
      answer.innerHTML = `<strong>${escapeHTML(marineForecast.heading)}</strong><br>${escapeHTML(marineForecast.details)}<br><br><a href="https://open-meteo.com/en/docs/marine-weather-api" target="_blank" rel="noopener noreferrer">Open-Meteo Marine API ↗</a>`;
      return;
    }
    if (currentLocalSession()) {
      showResearchGuide(question, language === "tr"
        ? "Bu cihazdaki yerel profil Claude girişinin yerine geçmez. Claude için doğrulanmış Supabase hesabı gerekir."
        : "A local profile does not sign you in to Claude. A verified Supabase account is required for Claude.");
      return;
    }
    if (authConfigReady() && !currentSession()) {
      showResearchGuide(question, language === "tr" ? "Hesabınla giriş yapmadan Claude araştırma servisi kullanılamaz." : "Sign in to your account to use Claude research.");
      return;
    }
    if (config.researchEndpoint && location.protocol !== "file:") {
      try {
        const session = currentSession();
        const response = await fetch(config.researchEndpoint, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json", ...(session?.access_token ? { Authorization: `Bearer ${session.access_token}` } : {}) }, body: JSON.stringify({ question, region: local(selectedRegion.name), language }) });
        const payload = await response.json().catch(() => ({}));
        if (response.ok && typeof payload.answer === "string" && payload.answer.trim()) {
          answer.textContent = payload.answer;
          if (Array.isArray(payload.relatedReading)) {
            const links = payload.relatedReading.filter(item => typeof item?.url === "string" && /^https:\/\/[a-z0-9.-]+(?:\/|$)/i.test(item.url) && typeof item.title === "string");
            if (links.length) answer.innerHTML = `${escapeHTML(payload.answer)}<br><br>${language === "tr" ? "İlgili okuma önerileri (Claude'un incelediği kaynaklar değildir)" : "Related reading (not sources consulted by Claude)"}: ${links.map(source => `<a href="${escapeHTML(source.url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(source.title)}</a>`).join(" · ")}`;
          }
          return;
        }
        if (response.status === 401) {
          showResearchGuide(question, language === "tr" ? "Claude servisini kullanmak için doğrulanmış bir kullanıcı hesabıyla giriş yap." : "Sign in with a verified account to use Claude research.");
          return;
        }
        if (response.status === 429) {
          showResearchGuide(question, language === "tr" ? "Araştırma isteği sınırına ulaşıldı. Biraz bekleyip yeniden deneyebilirsin." : "The research request limit has been reached. Wait a moment and try again.");
          return;
        }
        if (response.status === 503) {
          showResearchGuide(question, language === "tr" ? "Claude servisi geçici olarak kullanılamıyor. Güvenlik kontrolleri başarısız olduğunda ücretli sağlayıcıya istek gönderilmez." : "The Claude service is temporarily unavailable. If security checks fail, no request is sent to the paid provider.");
          return;
        }
        if (response.status !== 404 && response.status !== 501) console.warn("Research service returned an error:", response.status);
      } catch (error) { console.warn("Research endpoint unavailable; using source guide:", error.name || "request_error"); }
    }
    showResearchGuide(question);
  }
  function openAssistant(question = "") { $("#assistant-question").value = question; $("#assistant-answer").textContent = ""; $("#assistant-dialog").showModal(); if (!question) setTimeout(() => $("#assistant-question").focus(), 100); }
  function authConfigReady() { return typeof config.supabaseUrl === "string" && /^https:\/\/[a-zA-Z0-9.-]+$/.test(config.supabaseUrl) && typeof config.supabaseAnonKey === "string" && config.supabaseAnonKey.length > 10; }
  async function supabaseRequest(path, options = {}) {
    const response = await fetch(`${config.supabaseUrl.replace(/\/$/, "")}/auth/v1/${path}`, { ...options, headers: { apikey: config.supabaseAnonKey, "Content-Type": "application/json", ...(options.headers || {}) } });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.msg || data.message || data.error_description || data.error || (language === "tr" ? "Kimlik sağlayıcı isteği başarısız." : "Identity provider request failed."));
    return data;
  }
  function currentSession() { const session = readJSON("bo-session", null); return session && session.access_token && session.expires_at > Date.now() / 1000 ? session : null; }
  function currentLocalSession() {
    const session = readJSON("bo-local-session-v1", null);
    return session?.localOnly === true && typeof session.user?.id === "string" && typeof session.user?.email === "string" ? session : null;
  }
  function currentAccount() { return currentSession() || currentLocalSession(); }
  function accountDisplayName(account = currentAccount()) {
    const user = account?.user;
    const fullName = user?.user_metadata?.full_name || user?.user_metadata?.name || user?.full_name;
    if (typeof fullName === "string" && fullName.trim()) return fullName.trim();
    return user?.email?.split("@")[0] || text("profileNameFallback");
  }
  function updateSignupMode(enabled) {
    signupMode = enabled;
    $("#account-name-field").hidden = !enabled;
    $("#account-name").required = enabled;
    $("#account-password").autocomplete = enabled ? "new-password" : "current-password";
    $("#sign-up-button").textContent = text(enabled ? "signupAction" : "signUp");
    $("#forgot-password").hidden = enabled;
  }
  function libraryStorageKey() { const userId = currentAccount()?.user?.id; return userId ? `bo-saved-${userId}` : "bo-saved"; }
  function persistSaved() { localStorage.setItem(libraryStorageKey(), JSON.stringify(saved)); }
  function loadLocalAccountLibrary() { saved = readJSON(libraryStorageKey(), { regions: [], topics: [] }); renderSavedCount(); updateRegionPanel(); }
  function deriveLocalPasswordHash(password, saltHex) {
    if (!globalThis.crypto?.subtle || !globalThis.crypto?.getRandomValues) {
      throw new Error(language === "tr" ? "Güvenli yerel kayıt için siteyi HTTPS üzerinden veya güncel bir tarayıcıda açın." : "Secure local signup requires HTTPS or a modern browser.");
    }
    const salt = Uint8Array.from(saltHex.match(/.{2}/g), byte => Number.parseInt(byte, 16));
    return crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveBits"])
      .then(key => crypto.subtle.deriveBits({ name: "PBKDF2", salt, iterations: 210_000, hash: "SHA-256" }, key, 256))
      .then(bits => Array.from(new Uint8Array(bits), byte => byte.toString(16).padStart(2, "0")).join(""));
  }
  function localAccounts() {
    const accounts = readJSON("bo-local-accounts-v1", []);
    return Array.isArray(accounts) ? accounts : [];
  }
  function saveLocalSession(email) {
    const session = { localOnly: true, user: { id: `local-${crypto.randomUUID()}`, email } };
    localStorage.setItem("bo-local-session-v1", JSON.stringify(session));
    loadLocalAccountLibrary();
    updateAccountUI();
  }
  function localAccountNotice() {
    return language === "tr"
      ? "Yerel profil bu tarayıcıya kaydedildi. Başka cihazlarla eşitlenmez; Claude üyeliği değildir."
      : "Local profile saved in this browser. It does not sync to other devices or grant Claude access.";
  }
  async function handleSignIn(event) {
    event.preventDefault(); const message = $("#account-message"), email = $("#account-email").value.trim(), password = $("#account-password").value;
    updateSignupMode(false);
    if (!authConfigReady()) {
      const account = localAccounts().find(item => item.email === email.toLocaleLowerCase("en-US"));
      if (!account) { message.textContent = language === "tr" ? "Bu tarayıcıda bu e-posta için yerel profil bulunamadı." : "No local profile for this email was found in this browser."; return; }
      message.textContent = language === "tr" ? "Yerel profil doğrulanıyor…" : "Checking local profile…";
      try {
        const candidate = await deriveLocalPasswordHash(password, account.salt);
        if (candidate !== account.passwordHash) { message.textContent = language === "tr" ? "E-posta veya parola hatalı." : "Email or password is incorrect."; return; }
        saveLocalSession(account.email);
        message.textContent = localAccountNotice();
      } catch (error) { message.textContent = error.message; }
      return;
    }
    message.textContent = language === "tr" ? "Giriş yapılıyor…" : "Signing in…";
    try { const session = await supabaseRequest("token?grant_type=password", { method: "POST", body: JSON.stringify({ email, password }) }); saveSession(session); loadLocalAccountLibrary(); message.textContent = language === "tr" ? "Giriş başarılı. Favorilerin yükleniyor." : "Signed in. Loading your saved list."; updateAccountUI(); await loadCloudLibrary(); }
    catch (error) { message.textContent = error.message; }
  }
  async function handleSignUp(event) {
    const message = $("#account-message"), email = $("#account-email").value.trim(), password = $("#account-password").value;
    event?.preventDefault();
    if (!signupMode) {
      updateSignupMode(true);
      $("#account-name").focus();
      return;
    }
    if (!$("#account-form").reportValidity()) return;
    const fullName = $("#account-name").value.trim();
    if (!fullName) {
      $("#account-message").textContent = language === "tr" ? "Ad soyad alanını doldur." : "Enter your full name.";
      $("#account-name").focus();
      return;
    }
    if (password.length < 8 || password.length > 128) { message.textContent = language === "tr" ? "Parola 8–128 karakter arasında olmalıdır." : "Password must be 8–128 characters."; return; }
    if (!authConfigReady()) {
      message.textContent = language === "tr"
        ? "E-posta doğrulamalı kayıt için Supabase ayarlarını config.js dosyasına ekleyin. Ayarlar yokken yeni hesap oluşturulamaz."
        : "Configure Supabase in config.js to enable email-verified signup. New accounts cannot be created until it is configured.";
      return;
    }
    message.textContent = language === "tr" ? "Hesap oluşturuluyor…" : "Creating account…";
    try {
      const result = await supabaseRequest("signup", { method: "POST", body: JSON.stringify({ email, password, data: { full_name: fullName } }) });
      if (result.access_token) {
        if (!result.user?.email_confirmed_at && !result.user?.confirmed_at) {
          localStorage.removeItem("bo-session");
          message.textContent = language === "tr"
            ? "E-posta doğrulaması kapalı görünüyor. Supabase Authentication ayarlarında Confirm email seçeneğini açıp 6 haneli kod şablonunu ayarla."
            : "Email confirmation appears to be disabled. Enable Confirm email in Supabase Authentication and configure the 6-digit code template.";
          return;
        }
        saveSession(result); loadLocalAccountLibrary(); updateAccountUI(); await loadCloudLibrary();
        message.textContent = language === "tr" ? "Hesabın oluşturuldu ve e-postan doğrulandı." : "Your account is created and your email is verified.";
        return;
      }
      if (!result.user?.id) throw new Error(language === "tr" ? "Hesap oluşturulamadı. E-posta adresini kontrol edip yeniden dene." : "The account could not be created. Check the email address and try again.");
      pendingVerificationEmail = email;
      $("#account-form").hidden = true;
      $("#account-verification").hidden = false;
      $("#account-otp").value = "";
      $("#account-otp").focus();
      message.textContent = language === "tr" ? `${email} adresine 6 haneli doğrulama kodu gönderildi.` : `A 6-digit verification code was sent to ${email}.`;
    }
    } catch (error) { message.textContent = error.message; }
  }
  function openPasswordRecovery() {
    if (!authConfigReady()) {
      $("#account-message").textContent = text("recoveryUnavailable");
      return;
    }
    $("#account-form").hidden = true;
    $("#account-verification").hidden = true;
    $("#account-recovery").hidden = false;
    $("#recovery-email").value = $("#account-email").value.trim();
    $("#recovery-code-fields").hidden = true;
    $("#recovery-otp").required = false;
    $("#recovery-password").required = false;
    $("#recovery-submit").textContent = text("sendRecoveryCode");
    recoveryCodeSent = false;
    $("#account-message").textContent = "";
    $("#recovery-email").focus();
  }
  function closePasswordRecovery() {
    $("#account-recovery").reset();
    $("#account-recovery").hidden = true;
    $("#account-form").hidden = false;
    recoveryCodeSent = false;
    $("#account-message").textContent = "";
    updateSignupMode(false);
    $("#account-email").focus();
  }
  async function handlePasswordRecovery(event) {
    event.preventDefault();
    const form = $("#account-recovery");
    const message = $("#account-message");
    if (!authConfigReady()) {
      message.textContent = text("recoveryUnavailable");
      return;
    }
    if (!recoveryCodeSent) {
      if (!$("#recovery-email").reportValidity()) return;
      message.textContent = language === "tr" ? "Kurtarma kodu gönderiliyor…" : "Sending recovery code…";
      try {
        await supabaseRequest("recover", { method: "POST", body: JSON.stringify({ email: $("#recovery-email").value.trim() }) });
        recoveryCodeSent = true;
        $("#recovery-code-fields").hidden = false;
        $("#recovery-otp").required = true;
        $("#recovery-password").required = true;
        $("#recovery-submit").textContent = text("updatePassword");
        message.textContent = text("recoverySent");
        $("#recovery-otp").focus();
      } catch (error) {
        console.error("Password recovery code could not be sent:", error);
        message.textContent = error.message || text("recoveryFailed");
      }
      return;
    }
    if (!form.reportValidity()) return;
    const email = $("#recovery-email").value.trim();
    const token = $("#recovery-otp").value.trim();
    const password = $("#recovery-password").value;
    if (!/^\d{6}$/.test(token)) {
      message.textContent = language === "tr" ? "Kurtarma kodu 6 rakamdan oluşmalıdır." : "The recovery code must contain 6 digits.";
      return;
    }
    message.textContent = language === "tr" ? "Yeni parola kaydediliyor…" : "Saving new password…";
    try {
      const session = await supabaseRequest("verify", { method: "POST", body: JSON.stringify({ type: "recovery", email, token }) });
      if (!session.access_token) throw new Error(language === "tr" ? "Kod doğrulandı ancak oturum açılamadı." : "The code was verified, but a session could not be started.");
      await supabaseRequest("user", {
        method: "PUT",
        headers: { Authorization: `Bearer ${session.access_token}` },
        body: JSON.stringify({ password })
      });
      saveSession(session);
      form.reset();
      form.hidden = true;
      $("#recovery-code-fields").hidden = true;
      $("#account-form").hidden = false;
      recoveryCodeSent = false;
      updateAccountUI();
      loadLocalAccountLibrary();
      message.textContent = text("recoveryUpdated");
      await loadCloudLibrary();
    } catch (error) {
      console.error("Password recovery failed:", error);
      message.textContent = error.message || text("recoveryFailed");
    }
  }
  async function verifySignupEmail(event) {
    event.preventDefault();
    const form = $("#account-verification"), message = $("#account-message"), token = $("#account-otp").value.trim();
    if (!form.reportValidity() || !pendingVerificationEmail) return;
    if (!/^\d{6}$/.test(token)) {
      message.textContent = language === "tr" ? "Doğrulama kodu 6 rakamdan oluşmalıdır." : "The verification code must contain 6 digits.";
      return;
    }
    message.textContent = language === "tr" ? "E-posta doğrulanıyor…" : "Verifying email…";
    try {
      const session = await supabaseRequest("verify", { method: "POST", body: JSON.stringify({ type: "signup", email: pendingVerificationEmail, token }) });
      if (!session.access_token) throw new Error(language === "tr" ? "Kod doğrulandı ancak oturum açılamadı. Giriş yapmayı dene." : "The code was verified, but a session could not be started. Try signing in.");
      pendingVerificationEmail = "";
      form.hidden = true;
      form.reset();
      $("#account-form").hidden = false;
      updateSignupMode(false);
      saveSession(session); loadLocalAccountLibrary(); updateAccountUI();
      message.textContent = language === "tr" ? "E-posta doğrulandı. Hesabın açıldı." : "Email verified. You are signed in.";
      await loadCloudLibrary();
    } catch (error) { message.textContent = error.message; }
  }
  async function resendSignupCode() {
    const message = $("#account-message");
    if (!pendingVerificationEmail || !authConfigReady()) return;
    message.textContent = language === "tr" ? "Yeni kod gönderiliyor…" : "Sending a new code…";
    try {
      await supabaseRequest("resend", { method: "POST", body: JSON.stringify({ type: "signup", email: pendingVerificationEmail }) });
      message.textContent = language === "tr" ? "Yeni 6 haneli kod e-postana gönderildi." : "A new 6-digit code was sent to your email.";
    } catch (error) { message.textContent = error.message; }
  }
  function changeSignupEmail() {
    pendingVerificationEmail = "";
    $("#account-verification").reset();
    $("#account-verification").hidden = true;
    $("#account-form").hidden = false;
    updateSignupMode(false);
    $("#account-message").textContent = "";
    $("#account-email").focus();
  }
  function updateFeedbackNameField() {
    const includeName = $("#feedback-named").checked;
    $("#feedback-name-field").hidden = !includeName;
    $("#feedback-name").required = includeName;
  }
  function openFeedback(type) {
    const form = $("#feedback-form");
    form.reset();
    $("#feedback-type").value = ["idea", "request", "complaint"].includes(type) ? type : "request";
    $("#feedback-anonymous").checked = true;
    $("#feedback-message").textContent = "";
    $("#feedback-submit").disabled = false;
    updateFeedbackNameField();
    $("#feedback-dialog").showModal();
  }
  async function submitFeedback(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    if (form.elements.website.value) return;
    if (!authConfigReady()) {
      $("#feedback-message").textContent = text("feedbackMissingConfig");
      return;
    }
    if ($("#feedback-named").checked && !$("#feedback-name").value.trim()) {
      $("#feedback-message").textContent = language === "tr" ? "Adını paylaşmayı seçtiysen ad soyad alanını doldur." : "Enter your name if you chose to share it.";
      $("#feedback-name").focus();
      return;
    }

    const submitButton = $("#feedback-submit");
    submitButton.disabled = true;
    submitButton.textContent = text("feedbackSending");
    $("#feedback-message").textContent = "";
    const isAnonymous = $("#feedback-anonymous").checked;
    const submission = {
      category: $("#feedback-type").value,
      is_anonymous: isAnonymous,
      display_name: isAnonymous ? null : $("#feedback-name").value.trim(),
      message: $("#feedback-text").value.trim()
    };

    try {
      const response = await fetch(`${config.supabaseUrl.replace(/\/$/, "")}/rest/v1/community_submissions`, {
        method: "POST",
        headers: {
          apikey: config.supabaseAnonKey,
          "Content-Type": "application/json",
          Prefer: "return=minimal"
        },
        body: JSON.stringify(submission)
      });
      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.message || `Submission returned ${response.status}`);
      }
      form.reset();
      $("#feedback-anonymous").checked = true;
      updateFeedbackNameField();
      $("#feedback-message").textContent = text("feedbackSent");
      notify(text("feedbackSent"));
    } catch (error) {
      console.error("Community submission failed:", error);
      $("#feedback-message").textContent = text("feedbackError");
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = text("feedbackSubmit");
    }
  }
  function setupAccountDrawer() {
    const oldNav = $("#account-dialog .account-nav");
    const trigger = document.createElement("button");
    trigger.type = "button";
    trigger.id = "account-explore-button";
    trigger.className = "account-explore-trigger";
    trigger.setAttribute("aria-haspopup", "dialog");
    trigger.setAttribute("aria-controls", "site-explore-drawer");
    trigger.setAttribute("aria-expanded", "false");
    trigger.innerHTML = '<span data-i18n="accountSections">Siteyi keşfet</span><span class="account-explore-arrow" aria-hidden="true">↗</span>';
    oldNav.replaceWith(trigger);

    const backdrop = document.createElement("button");
    backdrop.type = "button";
    backdrop.className = "site-drawer-backdrop";
    backdrop.setAttribute("aria-label", language === "tr" ? "Menüyü kapat" : "Close menu");
    backdrop.tabIndex = -1;
    backdrop.hidden = true;

    const drawer = document.createElement("aside");
    drawer.id = "site-explore-drawer";
    drawer.className = "site-explore-drawer";
    drawer.setAttribute("role", "dialog");
    drawer.setAttribute("aria-modal", "true");
    drawer.setAttribute("aria-labelledby", "site-explore-title");
    drawer.setAttribute("aria-hidden", "true");
    drawer.tabIndex = -1;

    const header = document.createElement("div");
    header.className = "site-drawer-header";
    const heading = document.createElement("div");
    const eyebrow = document.createElement("p");
    eyebrow.className = "eyebrow";
    eyebrow.textContent = language === "tr" ? "SİTE BÖLÜMLERİ" : "SITE SECTIONS";
    const title = document.createElement("h2");
    title.id = "site-explore-title";
    title.dataset.i18n = "drawerTitle";
    title.textContent = "BLUE OCEAN'ı keşfet";
    const copy = document.createElement("p");
    copy.className = "site-drawer-copy";
    copy.dataset.i18n = "drawerCopy";
    copy.textContent = "Keşfetmeye devam etmek için bir bölüm seç.";
    heading.append(eyebrow, title, copy);

    const closeButton = document.createElement("button");
    closeButton.type = "button";
    closeButton.className = "site-drawer-close";
    closeButton.setAttribute("aria-label", language === "tr" ? "Menüyü kapat" : "Close menu");
    closeButton.textContent = "×";
    header.append(heading, closeButton);

    const links = document.createElement("nav");
    links.className = "site-drawer-links";
    links.setAttribute("aria-label", language === "tr" ? "Site bölümleri" : "Site sections");
    $$("#main-nav a").forEach((link, index) => {
      const drawerLink = link.cloneNode(true);
      drawerLink.dataset.drawerIndex = String(index + 1).padStart(2, "0");
      links.append(drawerLink);
    });
    const feedbackHeading = document.createElement("p");
    feedbackHeading.className = "drawer-feedback-heading";
    feedbackHeading.dataset.i18n = "feedbackLinksTitle";
    feedbackHeading.textContent = language === "tr" ? "Denizler için söz sende" : "Make a difference";
    const feedbackActions = document.createElement("div");
    feedbackActions.className = "drawer-feedback-actions";
    [
      ["idea", "feedbackIdeas", "✳"],
      ["request", "feedbackRequests", "↗"]
    ].forEach(([type, key, icon]) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "drawer-feedback-link";
      button.dataset.feedbackType = type;
      button.innerHTML = `<span class="drawer-feedback-icon" aria-hidden="true">${icon}</span><span data-i18n="${key}">${language === "tr" ? (type === "idea" ? "Fikir veya proje paylaş" : "İstek ve şikayet bildir") : translations.en[key]}</span><span class="drawer-link-arrow" aria-hidden="true">↗</span>`;
      feedbackActions.append(button);
    });
    drawer.append(header, links, feedbackHeading, feedbackActions);
    document.body.append(backdrop, drawer);

    let returnFocus = null;
    let inertElements = [];
    const closeDrawer = (restoreFocus = true) => {
      drawer.classList.remove("is-open");
      backdrop.classList.remove("is-open");
      drawer.setAttribute("aria-hidden", "true");
      backdrop.hidden = true;
      document.body.classList.remove("site-drawer-open");
      inertElements.forEach(element => { element.inert = false; });
      inertElements = [];
      trigger.setAttribute("aria-expanded", "false");
      if (restoreFocus) (returnFocus?.isConnected ? returnFocus : $("#account-button")).focus();
    };
    const openDrawer = () => {
      returnFocus = $("#account-button");
      $("#account-dialog").close();
      backdrop.hidden = false;
      drawer.setAttribute("aria-hidden", "false");
      document.body.classList.add("site-drawer-open");
      inertElements = [...document.body.children].filter(element => element !== backdrop && element !== drawer);
      inertElements.forEach(element => { element.inert = true; });
      trigger.setAttribute("aria-expanded", "true");
      requestAnimationFrame(() => {
        drawer.classList.add("is-open");
        backdrop.classList.add("is-open");
        window.setTimeout(() => {
          if (drawer.classList.contains("is-open")) drawer.focus();
        }, 80);
      });
    };

    trigger.addEventListener("click", openDrawer);
    closeButton.addEventListener("click", () => closeDrawer());
    backdrop.addEventListener("click", () => closeDrawer());
    links.addEventListener("click", event => {
      const link = event.target.closest("a");
      if (!link) return;
      closeDrawer(false);
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
        requestAnimationFrame(() => target.focus({ preventScroll: true }));
      }
    });
    feedbackActions.addEventListener("click", event => {
      const button = event.target.closest("[data-feedback-type]");
      if (!button) return;
      closeDrawer(false);
      openFeedback(button.dataset.feedbackType);
    });
    drawer.addEventListener("keydown", event => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeDrawer();
      } else if (event.key === "Tab") {
        const focusable = $$("a, button", drawer).filter(item => !item.disabled);
        const first = focusable[0], last = focusable[focusable.length - 1];
        if (document.activeElement === drawer) {
          event.preventDefault();
          (event.shiftKey ? last : first).focus();
        } else if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    });
    $("#account-dialog").addEventListener("close", () => {
      if (drawer.classList.contains("is-open")) closeDrawer(false);
    });
    document.addEventListener("keydown", event => {
      if (event.key === "Escape" && drawer.classList.contains("is-open")) {
        event.preventDefault();
        closeDrawer();
      }
    });
  }
  function saveSession(data) { if (data.access_token) { data.expires_at = data.expires_at || Math.floor(Date.now() / 1000) + (data.expires_in || 3600); localStorage.setItem("bo-session", JSON.stringify(data)); } }
  async function signOut() {
    const session = currentSession();
    if (session) {
      try { await supabaseRequest("logout", { method: "POST", headers: { Authorization: `Bearer ${session.access_token}` } }); }
      catch (error) { console.warn("Remote sign-out could not be confirmed:", error); }
    }
    localStorage.removeItem("bo-session");
    localStorage.removeItem("bo-local-session-v1");
    pendingVerificationEmail = "";
    $("#account-verification").reset();
    $("#account-verification").hidden = true;
    $("#account-form").hidden = false;
    $("#account-recovery").reset();
    $("#account-recovery").hidden = true;
    $("#recovery-code-fields").hidden = true;
    updateSignupMode(false);
    recoveryCodeSent = false;
    saved = readJSON("bo-saved", { regions: [], topics: [] });
    updateAccountUI(); renderSavedCount(); updateRegionPanel();
    $("#account-message").textContent = language === "tr" ? "Çıkış yapıldı." : "Signed out.";
  }
  function updateAccountUI() {
    const account = currentAccount();
    const isSignedIn = !!account;
    const displayName = accountDisplayName(account);
    const initials = displayName.split(/\s+/).filter(Boolean).slice(0, 2).map(part => part[0]).join("").toLocaleUpperCase(language === "tr" ? "tr-TR" : "en");
    $("#account-profile").hidden = !isSignedIn;
    $("#account-auth").hidden = isSignedIn;
    $("#account-dialog").classList.toggle("profile-drawer", isSignedIn);
    $("#profile-name").textContent = displayName;
    $("#profile-email").textContent = account?.user?.email || "";
    $("#profile-avatar").textContent = initials || "BO";
    const avatarImage = $("#profile-avatar-image");
    const savedAvatar = account?.user?.id ? localStorage.getItem(`bo-avatar-${account.user.id}`) : null;
    avatarImage.hidden = !savedAvatar;
    if (savedAvatar) avatarImage.src = savedAvatar;
    $("#account-button").dataset.i18n = isSignedIn ? "profileButton" : "account";
    $("#account-button").innerHTML = `${text(isSignedIn ? "profileButton" : "account")} <span aria-hidden="true">↗</span>`;
    $("#profile-language").value = language;
    $("#language-switch").textContent = language === "tr" ? "EN" : "TR";
    $("#sign-out-button").hidden = !account;
    $("#sign-in-button").disabled = !!account;
    $("#sign-up-button").disabled = !!account;
    if (account?.user?.email) {
      $("#account-message").textContent = account.localOnly === true
        ? `${language === "tr" ? "Bu cihazda yerel profil" : "Local profile on this device"}: ${account.user.email}`
        : `${language === "tr" ? "Oturum açık" : "Signed in"}: ${account.user.email}`;
    }
  }
  async function syncCloudLibrary() {
    const session = currentSession();
    if (!session || !authConfigReady()) return;
    const headers = { Authorization: `Bearer ${session.access_token}`, apikey: config.supabaseAnonKey, "Content-Type": "application/json" };
    try {
      const response = await fetch(`${config.supabaseUrl.replace(/\/$/, "")}/rest/v1/user_library?on_conflict=user_id`, { method: "POST", headers: { ...headers, Prefer: "resolution=merge-duplicates,return=minimal" }, body: JSON.stringify({ user_id: session.user.id, favorites: saved.regions, research_list: saved.topics, updated_at: new Date().toISOString() }) });
      if (!response.ok) { const body = await response.json().catch(() => ({})); throw new Error(body.message || `Library sync returned ${response.status}`); }
    } catch (error) { console.warn("Cloud library sync failed:", error); }
  }
  async function loadCloudLibrary() {
    const session = currentSession();
    if (!session || !authConfigReady()) return;
    const headers = { Authorization: `Bearer ${session.access_token}`, apikey: config.supabaseAnonKey };
    try {
      const response = await fetch(`${config.supabaseUrl.replace(/\/$/, "")}/rest/v1/user_library?select=favorites,research_list&user_id=eq.${encodeURIComponent(session.user.id)}`, { headers });
      if (!response.ok) { const body = await response.json().catch(() => ({})); throw new Error(body.message || `Library load returned ${response.status}`); }
      const rows = await response.json();
      if (rows.length) {
        saved.regions = [...new Set([...saved.regions, ...(Array.isArray(rows[0].favorites) ? rows[0].favorites : [])])].filter(id => regions.some(region => region.id === id));
        saved.topics = [...new Set([...saved.topics, ...(Array.isArray(rows[0].research_list) ? rows[0].research_list : [])])].filter(id => topics.some(topic => topic.id === id) || /^species-[0-7]$/.test(id) || regions.some(region => id === `region-${region.id}`));
        persistSaved(); renderSavedCount(); updateRegionPanel();
      }
      await syncCloudLibrary();
    } catch (error) { console.error("Cloud library could not be loaded:", error); $("#account-message").textContent = language === "tr" ? "Hesap açıldı ancak liste sunucudan alınamadı. Yerel listen korunuyor." : "Signed in, but the saved list could not be loaded. Your local list is unchanged."; }
  }
  function wireEvents() {
    $("#mobile-menu-button").addEventListener("click", event => { const button = event.currentTarget, open = $("#main-nav").classList.toggle("open"); button.setAttribute("aria-expanded", String(open)); });
    $$("#main-nav a").forEach(link => link.addEventListener("click", () => $("#main-nav").classList.remove("open")));
    $("#language-switch").addEventListener("click", () => setLanguage(language === "tr" ? "en" : "tr"));
    $("#profile-language").addEventListener("change", event => setLanguage(event.currentTarget.value));
    $("#profile-avatar-file").addEventListener("change", event => {
      const file = event.currentTarget.files?.[0];
      const account = currentAccount();
      if (!file || !account?.user?.id) return;
      if (!/^image\/(jpeg|png|webp)$/.test(file.type) || file.size > 1024 * 1024) {
        $("#account-message").textContent = language === "tr" ? "JPG, PNG veya WebP biçiminde, en fazla 1 MB boyutunda bir fotoğraf seç." : "Choose a JPG, PNG or WebP image up to 1 MB.";
        event.currentTarget.value = "";
        return;
      }
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        if (typeof reader.result !== "string") return;
        try {
          localStorage.setItem(`bo-avatar-${account.user.id}`, reader.result);
          updateAccountUI();
          $("#account-message").textContent = language === "tr" ? "Profil fotoğrafın bu cihaza kaydedildi." : "Your profile photo was saved on this device.";
        } catch (error) {
          console.error("Profile photo could not be stored:", error);
          $("#account-message").textContent = language === "tr" ? "Fotoğraf tarayıcıya kaydedilemedi. Daha küçük bir dosya seç." : "The photo could not be saved in this browser. Choose a smaller file.";
        }
      });
      reader.addEventListener("error", () => {
        $("#account-message").textContent = language === "tr" ? "Fotoğraf okunamadı. Başka bir dosya dene." : "The photo could not be read. Try another file.";
      });
      reader.readAsDataURL(file);
    });
    $("#save-region").addEventListener("click", toggleSaved); $("#map-reset").addEventListener("click", () => { if (!$("#map-fallback").hidden) retryMap(); else if (map) map.flyTo([20, 0], 2, { duration: .7 }); });
    $("#region-details").addEventListener("click", openRegionDetails); $("#chart-metric").addEventListener("change", renderChart); $("#chart-period").addEventListener("change", renderChart); $("#download-data").addEventListener("click", downloadCSV); $("#create-report").addEventListener("click", createReport);
    $$(".impact-region-link").forEach(link => link.addEventListener("click", event => selectRegion(event.currentTarget.dataset.region)));
    $("#saved-shortcut").addEventListener("click", openSavedList);
    $("#assistant-form").addEventListener("submit", event => { event.preventDefault(); const question = $("#assistant-question").value.trim(); if (question) askResearch(question); });
    $("#open-assistant").addEventListener("click", () => openAssistant());
    $$("[data-question]").forEach(button => button.addEventListener("click", () => openAssistant(button.dataset.question)));
    $("#account-button").addEventListener("click", () => { updateAccountUI(); $("#account-dialog").showModal(); });
    $("#forgot-password").addEventListener("click", openPasswordRecovery);
    $("#account-recovery").addEventListener("submit", handlePasswordRecovery);
    $("#cancel-recovery").addEventListener("click", closePasswordRecovery);
    $("#recovery-otp").addEventListener("input", event => { event.currentTarget.value = event.currentTarget.value.replace(/\D/g, "").slice(0, 6); });
    $("#profile-visit-link").addEventListener("click", () => $("#account-dialog").close());
    $("#feedback-form").addEventListener("submit", submitFeedback);
    $$('input[name="feedback-name-choice"]').forEach(input => input.addEventListener("change", updateFeedbackNameField));
    $("#account-form").addEventListener("submit", event => signupMode ? handleSignUp(event) : handleSignIn(event)); $("#sign-up-button").addEventListener("click", handleSignUp); $("#account-verification").addEventListener("submit", verifySignupEmail); $("#resend-code").addEventListener("click", resendSignupCode); $("#change-email").addEventListener("click", changeSignupEmail); $("#account-otp").addEventListener("input", event => { event.currentTarget.value = event.currentTarget.value.replace(/\D/g, "").slice(0, 6); }); $("#sign-out-button").addEventListener("click", signOut);
    $$("[data-close-dialog]").forEach(button => button.addEventListener("click", () => button.closest("dialog").close()));
    $$("dialog").forEach(dialog => { dialog.addEventListener("click", event => { if (event.target === dialog) dialog.close(); }); });
    $("#detail-dialog").addEventListener("click", event => { const item = event.target.closest(".saved-item"); if (item) { $("#detail-dialog").close(); if (item.dataset.region) selectRegion(item.dataset.region); else if (item.dataset.regionDetail) { selectRegion(item.dataset.regionDetail); openRegionDetails(); } else if (item.dataset.species !== undefined) openSpecies(Number(item.dataset.species)); else if (item.dataset.topic) openTopic(item.dataset.topic); } });
  }
  function init() {
    if (currentAccount()) loadLocalAccountLibrary();
    $("#year").textContent = new Date().getFullYear(); setupAccountDrawer(); wireEvents(); renderRegions(); renderSpecies(); renderTopics(); updateRegionPanel(); renderSavedCount(); updateAccountUI();
    $$("[data-i18n]").forEach(element => {
      const value = translations[language]?.[element.dataset.i18n] || accountTranslations[language]?.[element.dataset.i18n];
      if (value) element.innerHTML = value;
    });
    $$("[data-i18n-placeholder]").forEach(element => {
      const value = translations[language]?.[element.dataset.i18nPlaceholder] || accountTranslations[language]?.[element.dataset.i18nPlaceholder];
      if (value) element.placeholder = value;
    });
    $("#language-switch").textContent = language === "tr" ? "EN" : "TR";
    $("#profile-language").value = language;
    if (language === "en") setLanguage("en");
    initMap(); loadMarineData();
    window.setInterval(() => {
      if (document.visibilityState === "visible" && Date.now() - lastMarineRefreshAt >= 60 * 60 * 1000) loadMarineData();
    }, 60 * 1000);
    if (config.supabaseUrl && config.supabaseAnonKey && currentSession()) loadCloudLibrary();
    window.addEventListener("online", () => { if (!liveData || Date.now() - lastMarineRefreshAt >= 60 * 60 * 1000) loadMarineData(); });
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible" && Date.now() - lastMarineRefreshAt >= 60 * 60 * 1000) loadMarineData();
    });
  }
  init();
})();
