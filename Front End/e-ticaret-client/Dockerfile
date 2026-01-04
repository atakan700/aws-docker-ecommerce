FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY .  .

#apilerin env dosyasından güvenli çekilmesi için arg olarak atanıp .env dosyasında çekilmesi sağlanıyor

ARG VITE_CATEGORY_API_URL
ENV VITE_CATEGORY_API_URL=$VITE_CATEGORY_API_URL

ARG VITE_PRODUCT_URL
ENV VITE_PRODUCT_URL=$VITE_PRODUCT_URL

ARG VITE_FILE_SERVICE_URL
ENV VITE_FILE_SERVICE_URL=$VITE_FILE_SERVICE_URL

ARG VITE_CLOUDFRONT_URL
ENV VITE_CLOUDFRONT_URL=$VITE_CLOUDFRONT_URL

# npm paketlerini çalıştıracak cmd komutu
RUN npm run build 

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html 
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx","-g","daemon off;"]