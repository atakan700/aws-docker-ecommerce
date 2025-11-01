# E-Ticaret Mikroservis Projesi

Bu proje, Docker Compose ile orkestrasyonu yapılan mikroservis tabanlı bir e-ticaret uygulamasıdır. Proje halen geliştirilme aşamasındadır; bazı servisler tamamlanmamış ve ilerleyen versiyonlarda eksik özellikler eklenecektir.

## Proje Hakkında

- Her servis kendi Dockerfile’ına sahiptir ve Docker Compose ile lokal ortamda çalıştırılabilir.
- FileService servisi, ürün resimlerini AWS S3 bucket’a ürün ID’lerine göre depolar.
- Hedef, mikroservis yönetimi, containerization ve bulut servis entegrasyonu konularında **pratik deneyim kazanmak**.

## Teknolojiler

- Docker, Docker Compose
- AWS (S3 , !! ilerleyen versiyonlarda(Lambda, API Gateway))
- React, Node.js / ASP.NET Core
- MSSQL

## Kurulum

1. Depoyu klonlayın:
   ```bash
   git clone https://github.com/username/repo.git
   cd repo
2. Docker-compose dosyasının bulunduğu dizinde :
   ```bash
    docker-compose up --build
komutu ile proje çalıştırılabilir.
