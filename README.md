# BLUE OCEAN

**Denizleri Anla, Geleceği Koru.**

Türkçe ve İngilizce bir deniz araştırma ve keşif arayüzü. HTML, CSS ve tarayıcı JavaScript'i ile hazırlanmıştır; ön yüzü derlemek veya bağımlılık yüklemek gerekmez.

## Başlatma

1. Bu depoyu GitHub'a yükleyin veya bilgisayarınıza klonlayın.
2. `index.html` dosyasını modern bir tarayıcıda açın. En iyi deneyim ve API istekleri için bir yerel web sunucusu veya Vercel dağıtımı kullanın.
3. Harita, Esri'nin okyanus altlığını ilk sırada kullanır; Esri erişilemezse OpenStreetMap verisini kullanan CARTO koyu altlığına geçer. İki sağlayıcı da kullanılamazsa bölge listesi çalışmaya devam eder ve kırık kutucuklar gösterilmez.
4. Saatlik deniz tahminleri Open-Meteo Marine API'den yüklenir. Kaynak kullanılamadığında uydurma canlı veri gösterilmez.

### Vercel ile dağıtım ve Claude araştırma asistanı

Vercel, `index.html` dosyasını statik site, `api/research.js` dosyasını sunucu taraflı işlev olarak dağıtabilir. GitHub deponuzu Vercel'e bağlayıp dağıtım sonrası şu ortam değişkenlerini ekleyin:

- `ANTHROPIC_API_KEY`: Claude API anahtarı. Sunucu tarafında saklayın; `config.js` veya tarayıcı koduna **eklemeyin**.
- `SUPABASE_URL` ve `SUPABASE_ANON_KEY`: Sunucu, araştırma isteği yapan hesabın token'ını Supabase Auth üzerinden doğrular.
- `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` ve `RATE_LIMIT_HASH_SECRET`: Tüm çalışanlar arasında paylaşılan istek/bütçe limiti.

Claude Haiku 5.5 herkese açık Anthropic model kimliğidir; güncel model durumu ve ücretler için [Anthropic model belgelerini](https://platform.claude.com/docs/en/models/haiku-5-5/overview), Messages API ayrıntıları için [API belgelerini](https://platform.claude.com/docs/en/api/messages) kontrol edin.

Gerçek Claude yanıtları Anthropic API hesabı, sunucu anahtarı, kota ve ücret gerektirir. Yalnızca sunucu API anahtarını eklemek **yeterli değildir**; doğrulanmış bir Supabase hesabı ve paylaşımlı Upstash Redis rate limiter da zorunludur. Bu güvenlik kontrolleri eksik veya ulaşılamazsa istek Claude'a iletilmez. `file://` ile açılan sayfa da güvenlik nedeniyle Claude sunucu işlevine istek yapmaz; Claude için Vercel'de HTTPS üzerinden yayımlayın. Kullanıcı araştırma rehberindeki genel yanıtları kullanabilir; bunlar “Yapay zekâ yanıtı değil” olarak işaretlenir.

`api/research.js`, Claude Messages API'yi yalnızca doğrulanmış, e-posta veya telefonu onaylanmış hesaplar için sunucudan çağırır. İstekler aynı origin kontrolünden geçer ve Supabase sunucu tarafından doğrular; Upstash Redis, dağıtım örnekleri arasında atomik sınırlar uygular: kullanıcı doğrulamasından önce IP başına dakikada 20 / günde 100 istek ve tüm siteye dakikada 300 / günde 5.000 doğrulama denemesi; hesap doğrulamasından sonra hesap başına dakikada 5 / saatte 20 / günde 60, IP başına dakikada 20 / günde 100 ve tüm site için günde en fazla 500 Claude isteği. Sayaç anahtarları HMAC ile gizlenir. Claude yanıtı en fazla 350 token ile sınırlandırılır.

Vercel ortam değişkenlerini [.env.example](./.env.example) örneğine göre **Vercel Project → Settings → Environment Variables** bölümüne girin. `SUPABASE_URL` ve `SUPABASE_ANON_KEY` değerleri projeyle aynı olmalı; `SUPABASE_ANON_KEY` yalnızca public/anon anahtardır, `service_role` **değildir**. Supabase Authentication ayarlarında e-posta doğrulamayı etkinleştirin. Upstash'te ayrı bir Redis veritabanı oluşturup REST URL/token değerlerini gizli ortam değişkeni olarak kullanın. `RATE_LIMIT_HASH_SECRET` değeri en az 32 rastgele bayt olmalı; PowerShell örneği `.env.example` içindedir. Bu değerleri GitHub'a, tarayıcı ayarına veya herkese açık loglara koymayın.

Ücret sürprizlerini önlemek için uç nokta Anthropic modelini sunucuda sabit olarak `claude-haiku-5-5` kullanır ve kullanıcıdan model seçimi almaz. Bölgesel hesaplarında bu model kimliği sunulmuyorsa, deploy etmeden önce kodda hesabınızda kullanılabilir, maliyet sınırı belirlenmiş Haiku modeliyle güncelleyin.

### Gerçek kullanıcı üyeliği (isteğe bağlı Supabase)

Örnek ayarlar `config.js` içindedir. Supabase Dashboard'dan proje URL'sini ve **anon/public** anahtarını buraya girin. Bu anahtar tarayıcı uygulamalarında herkese açık kullanım içindir; erişimi RLS ve Auth politikaları denetler. Service-role anahtarını asla tarayıcıya koymayın. Sunucu tarafındaki korumalı Claude API için aynı Supabase URL ve public anahtarı Vercel'e ayrıca `SUPABASE_URL` ve `SUPABASE_ANON_KEY` olarak tanımlayın. Supabase SQL Editor'de `supabase-setup.sql` komutlarını çalıştırıp e-posta doğrulama politikasını yapılandırın. Supabase ayarlıysa üyelik Supabase Auth üzerinden oluşturulur ve doğrulanır; kişisel araştırma listesi kullanıcıya ait satırlar ve RLS politikalarıyla senkronize edilir.

Supabase ayarlı değilse kayıt ve giriş bu tarayıcıda yerel profil olarak çalışır. Parola düz metin yerine tarayıcıda PBKDF2-SHA-256 ile türetilmiş hash ve rastgele salt olarak saklanır; aynı tarayıcıda oturum ve ayrı favori listesi sağlar. Bu, sunucu tarafından doğrulanan veya başka cihazlara eşitlenen gerçek üyelik değildir; parola sıfırlama/yedekleme yoktur, tarayıcı depolaması temizlenirse profil silinir ve yerel profil Claude API'sinde oturum açmaz. Yerel profil için tekrar kullanmadığınız bir parola seçin. Gerçek üyelik ve Claude için Supabase'i yapılandırın.

Supabase Auth parolaları doğrular; yerel profilde yalnızca türetilmiş hash tutulur. API anahtarı hiçbir zaman tarayıcıya gönderilmez. Supabase tablo şemasını değiştirirseniz proje API şeması önbelleğini yenileyin.

### GitHub Pages

GitHub'da yeni bir depoya `main` dalını gönderip **Settings → Pages → Source: GitHub Actions** seçin. `.github/workflows/deploy-pages.yml` dosyası statik dosyaları otomatik yayınlar. Harita ve Open-Meteo Marine API özellikleri çalışır; GitHub Pages statik olduğu için `api/research.js` sunucu işlevini çalıştırmaz. Claude AI asistanı için `ANTHROPIC_API_KEY` gizli anahtarı ile Vercel gibi bir sunucu işlevi destekleyen dağıtım kullanın.

## Veri doğruluğu ve kaynaklar

- **Deniz suyu yüzey sıcaklığı ve dalga yüksekliği:** Open-Meteo Marine API. Arayüz mevcut değerleri *model tahmini* olarak etiketler, birim ve API yanıt zamanını gösterir. Bu değerler istasyon ölçümü veya kirlilik ölçümü değildir. Bazı konum veya modeller için alanlar eksik olabilir.
- Araştırma asistanına güncel deniz sıcaklığı veya dalga tahmini sorulduğunda, mevcut Open-Meteo yanıtından değerleri ve tahmin zamanını gösterir. Bu yanıt API verisidir; istasyon ölçümü veya Claude tarafından üretilen yanıt değildir. Diğer araştırma sorularında yapılandırılmış Claude API'si yoksa kaynak rehberi kullanılır.
- **Harita:** Esri okyanus altlığı önceliklidir; Esri yanıt vermezse OpenStreetMap verisini kullanan CARTO koyu haritasına geçilir. Her iki sağlayıcı başarısız olursa 13 deniz/okyanus bölgesi için seçim listesi kullanılabilir; bunlara Afrika kıyılarındaki Gine Körfezi de dahildir. Katkıcı/sağlayıcı atıfları harita üzerinde görünür. Haritadaki atık birikimi ve araştırma noktaları yaklaşık, bilgilendirme amaçlı konumlardır; kirlilik sınırı veya gerçek zamanlı sensör değildir.
- **Okyanus seviyesi:** NASA Sea Level Project bağlantısı. Uygulamada canlı deniz seviyesi değeri iddia edilmez.
- **Kirlilik / plastik:** Araştırma bölümündeki 19–23 milyon ton/yıl su ekosistemlerine plastik sızıntısı tahmini (tatlı suları da kapsar), nehir kaynaklı deniz plastiğine ilişkin 2021 modellemesi, deniz çöplerindeki plastik payına ilişkin UNEP tahmini ve 2018 gemi CO₂ tahmini kaynak bağlantılarıyla sunulur. Bunlar farklı kapsam ve yıllara aittir; seçili kıyının ölçümü, karşılaştırılabilir kirlilik oranı veya gerçek zamanlı gösterge değildir. Gine Körfezi ve diğer kıyılar izleme/araştırma alanı olarak işaretlenir; verisi olmayan bölge için sayısal sıralama uydurulmaz.
- **İnsanlar, deniz canlıları ve gemiler:** Kirliliğin yutulma, takılma, habitat kaybı, besin ağı ve sağlıkla ilişkili yolları; deniz taşımacılığının gıda/ilaç/ticaret erişimine katkısı ve emisyon, gürültü, çarpışma ve atık baskıları kaynaklarla özetlenir. Çözümler BM Sürdürülebilir Kalkınma Amacı 14'ün 14.1, 14.2, 14.4 ve 14.5 hedefleriyle eşleştirilir.
- **Bölgesel araştırma:** Gine Körfezi için UNEP Bölgesel Denizler Programı ve Abidjan Sözleşmesi; küresel plastik tahminleri için [UNEP Turning off the Tap](https://www.unep.org/resources/report/turning-off-tap-how-world-can-end-plastic-pollution-and-create-circular-economy) ve nehir kaynaklı plastik modeli için [Meijer ve arkadaşları (2021)](https://doi.org/10.1126/sciadv.aaz5803) kullanılır. Bu yayınlar tek bir ortak ölçüm yöntemi veya canlı bölgesel skor sağlamaz.
- **Deniz canlıları ve korunma durumu:** IUCN Red List bağlantıları. Genel kategori küresel ölçekte olabilir; bölgesel popülasyonların durumu farklılaşır. Bu içerik bilgilendirme amaçlıdır.
- **Araştırma rehberi:** UNEP, NOAA, WHO, FAO, IPCC, IUCN, NASA ve OECD kaynak bağlantıları. Claude işlevi açılırsa sunucu istemi uydurma ölçüm veya atıf üretmemesini ve doğrulanmamış bağlantıları kullanmamasını belirtir.
- **Görseller:** Unsplash kaynaklarından yüklenir; fotoğraflar tür teşhisinde kanıt olarak kullanılmamalıdır.

## Kullanıcı özellikleri

Favori denizler ve araştırma listeleri, CSV indirme ve yazdırılabilir rapor/gezgin tarayıcı işlevleri dahildir. Supabase etkinse giriş/kayıt ve kullanıcıya özel araştırma listesi senkronizasyonu açılır. Kimlik, parola, AI anahtarı veya canlı veri olmadan kullanıcıya yanıltıcı başarı gösterilmez.

## Teknik notlar

- Harita Leaflet ile Esri okyanus karolarını ve CARTO koyu haritasını yedek olarak kullanır; iki sağlayıcı da erişilemezse 13 deniz/okyanus bölgesi için metin tabanlı yedek liste açılır.
- Grafik SVG ile çizilir ve kaynak API'den dönen saatlik verilerle güncellenir; dönem, deniz ve ölçüm seçilebilir.
- Harici servis kesintisi ve veri eksikliği görünür şekilde ele alınır.
- İstemci tarafı ayar dosyası yalnızca herkese açık Supabase URL/anon anahtarını ve aynı-origin API yolunu içerir.

## Raporlar ve yerel doğrulama

Gösterge panelindeki **Rapor oluştur** düğmesi seçili bölge, o anda seçili ölçüm ve gerçek API yanıtı (varsa) ile yazdırılabilir bir özet açar. API bağlantısı yoksa rapor bu durumu açıkça gösterir. Ön yüz, üçüncü taraf bağlantılar olmadan da açılır; deniz API'si, harita kutucukları, yazı tipleri ve görseller internet erişimi gerektirir. Open-Meteo Marine API, anahtar gerektirmeyen açık bir hizmettir ve deniz tahminlerini sağlar. Claude için Anthropic hesabı/API anahtarı ile Vercel sunucu işlevi, Supabase doğrulaması ve Upstash paylaşımlı istek limiti gerekir; bunlar hazır olmadan canlı Claude yanıtı verilemez. Yerel denemede çevrimdışı araştırma rehberi ve alınmışsa Open-Meteo tahminleri çalışmaya devam eder.
