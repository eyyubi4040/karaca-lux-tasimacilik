# ==============================================================================
# Karaca Lux Taşımacılık - Production Dockerfile (Alpine Nginx)
# ==============================================================================
FROM nginx:1.27-alpine AS production

# Set working directory to Nginx html folder
WORKDIR /usr/share/nginx/html

# Remove default Nginx website
RUN rm -rf /usr/share/nginx/html/* /etc/nginx/conf.d/default.conf

# Copy custom high-performance Nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy static website assets to web root
COPY index.html ./
COPY tesekkurler.html ./
COPY ankara-diyarbakir-nakliyat.html ./
COPY ankara-mardin-nakliyat.html ./
COPY ankara-sanliurfa-nakliyat.html ./
COPY ankara-gaziantep-nakliyat.html ./
COPY asansorlu-nakliyat.html ./
COPY hakkimizda.html ./
COPY iletisim.html ./
COPY gizlilik-politikasi.html ./
COPY kvkk-aydinlatma.html ./
COPY tasima-sozlesmesi.html ./
COPY 404.html ./
COPY style.css ./
COPY script.js ./
COPY robots.txt ./
COPY sitemap.xml ./
COPY images/ ./images/

# Grant appropriate read permissions
RUN chmod -R 755 /usr/share/nginx/html

# Expose HTTP port
EXPOSE 80

# Health check to ensure Nginx is healthy
HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/health || exit 1

# Launch Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
