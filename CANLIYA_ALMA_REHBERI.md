# 🚀 Karaca Lux Taşımacılık - Canlıya Alma ve Dağıtım Rehberi

Bu rehber, **Karaca Lux Taşımacılık & Lojistik** web sitesini Docker, VPS, cPanel veya Bulut platformlarında en yüksek hız, güvenlik ve SEO performansıyla canlıya almanız için hazırlanmıştır.

---

## 📁 Hazırlanan Dağıtım Dosyaları

| Dosya Adı | Açıklama |
|---|---|
| `Dockerfile` | Alpine Nginx tabanlı, hafif, güvenli ve ultra-hızlı Docker imajı. |
| `docker-compose.yml` | Tek komutla ayağa kaldıran konteyner yapılandırması. |
| `nginx.conf` | Gzip sıkıştırması, 1 yıllık görsel önbellekleme ve güvenlik başlıkları içeren Nginx ayarları. |
| `.dockerignore` | Gereksiz dosyaları Docker derlemesinden hariç tutan filtre. |
| `404.html` | Özel Karaca Lux kurumsal tasarımlı hata sayfası. |
| `.htaccess` | cPanel / Apache / LiteSpeed sunucuları için HTTPS yönlendirmesi ve önbellekleme ayarları. |
| `robots.txt` & `sitemap.xml` | Google arama motoru indeksleme ve SEO haritaları. |

---

## 🐳 Seçenek 1: Docker / Docker Compose ile Yayına Alma (Önerilen)

Docker kurulu olan herhangi bir sunucuda (Ubuntu, Debian, CentOS vb.) aşağıdaki tek komutla siteyi canlıya alabilirsiniz:

```bash
# 1. Proje dizinine gidin
cd /path/to/karaca-lux-tasimacilik

# 2. Docker konteynerini arka planda derleyin ve çalıştırın
docker-compose up -d --build
```

### Konteyner Durumunu Kontrol Etme:
```bash
docker ps
docker logs -f karaca-lux-web
```

Site artık `http://sunucu-ip-adresiniz` veya `http://karacaluxnakliyat.com` üzerinde yayında olacaktır.

---

## 🌐 Seçenek 2: Ubuntu / Debian VPS Üzerinde Nginx + Ücretsiz SSL (Certbot)

Kendi sanal sunucunuzda (DigitalOcean, Hetzner, AWS, Linode vb.) Docker'sız doğrudan Nginx ile yayınlamak isterseniz:

```bash
# 1. Nginx ve Certbot kurulumu
sudo apt update
sudo apt install nginx certbot python3-certbot-nginx -y

# 2. Proje dosyalarını web kök dizinine kopyalayın
sudo cp -r /path/to/karaca-lux-tasimacilik/* /var/www/karacaluxnakliyat/
sudo chown -R www-data:www-data /var/www/karacaluxnakliyat/

# 3. SSL Sertifikasını tek komutla kurun (Let's Encrypt)
sudo certbot --nginx -d karacaluxnakliyat.com -d www.karacaluxnakliyat.com
```

---

## 🗄️ Seçenek 3: cPanel / Plesk / FTP ile Yayına Alma

Eğer standart bir web hosting (cPanel/Plesk) kullanıyorsanız:
1. cPanel > **Dosya Yöneticisi (File Manager)** bölümünü açın.
2. `public_html` klasörüne girin.
3. Projedeki tüm HTML dosyalarını, `style.css`, `script.js`, `.htaccess`, `robots.txt`, `sitemap.xml` ve `images/` klasörünü `public_html` içine yükleyin.
4. `.htaccess` dosyanız otomatik olarak HTTPS yönlendirmesi ve GZIP hızlandırmasını devreye sokacaktır.

---

## ⚡ Seçenek 4: Cloudflare Pages / Vercel / Netlify (Ücretsiz & Küresel CDN)

Site saf HTML, CSS, Vanilla JS yapısında olduğu için hiçbir derleme gerektirmez:
- **Vercel / Netlify:** Proje klasörünü GitHub'a yükleyip tek tıkla bağlayabilirsiniz.
- **Cloudflare Pages:** Proje dosyalarını doğrudan sürükleyip bırakarak dünya genelinde 0ms gecikmeyle yayınlayabilirsiniz.

---

## 🔍 Canlı Öncesi Kontrol Listesi (Checklist)

- [x] Tüm ana sayfalar ve rota sayfaları (`ankara-diyarbakir`, `ankara-mardin`, `ankara-sanliurfa`, `ankara-gaziantep`, `asansorlu-nakliyat`) hazır.
- [x] Yasal sayfalar (`gizlilik-politikasi.html`, `kvkk-aydinlatma.html`, `tasima-sozlesmesi.html`) hazır.
- [x] WhatsApp hatları (`0533 705 44 08` ve `0501 083 44 08`) tüm formlara ve butonlara bağlı.
- [x] Instagram hesabı (`https://www.instagram.com/karaca_lux/`) aktif.
- [x] Schema.org (LocalBusiness, MovingCompany, FAQPage) mikro verileri yapılandırıldı.
- [x] `sitemap.xml` ve `robots.txt` Google arama motoruna hazır.
- [x] 404 özel hata sayfası hazır.
- [x] Gzip sıkıştırma ve 1 yıllık görsel önbellekleme tanımlandı.
