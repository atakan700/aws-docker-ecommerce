#!/bin/bash

DB_CONNECTION="Server=product-db;Database=ProductDb;User Id=sa;Password=NotBad!Passw0rd;TrustServerCertificate=True;"

echo "SQL Server'ın tam olarak başlatılması bekleniyor (yaklaşık 45 saniye)..."
sleep 45

echo "Veritabanı oluşturuluyor ve migration'lar uygulanıyor..."

# 1. Veritabanını yoksa oluştur
/usr/bin/env dotnet ef database ensure created --project /app/ProductServices.csproj --connection "$DB_CONNECTION"

# 2. Migration'ları uygula (tabloları oluşturur)
/usr/bin/env dotnet ef database update --project /app/ProductServices.csproj --connection "$DB_CONNECTION"

echo "Veritabanı migration'ları başarıyla uygulandı ve tablolar oluşturuldu."

# Uygulamayı başlat
/usr/bin/env dotnet ProductServices.dll
```

Lütfen **`ProductServices/migrate.sh`** dosyanızı yukarıdaki **temiz ve basit** betikle güncelleyin ve tekrar çalıştırın:

```bash
docker compose up -d --build
