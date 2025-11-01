# Build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY ["ProductServices.csproj", "./"]
RUN dotnet restore "ProductServices.csproj"

COPY . ./

# KRİTİK DÜZELTME: migrate.sh'ı kopyala ve izinleri ver
# Bu dosyayı doğrudan /src içine kopyalıyoruz
COPY migrate.sh .
RUN chmod +x migrate.sh

# dotnet publish komutunun çıktısı olan /app/publish içine migrate.sh'ı dahil etmiyoruz.
# Çalıştırılabilir dosyaları /app/publish'e koyuyoruz.

RUN dotnet publish "ProductServices.csproj" -c Release -o /app/publish

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app

# YALNIZCA publish çıktısını kopyala
COPY --from=build /app/publish .

# KRİTİK DÜZELTME: migrate.sh'ı doğrudan Runtime /app dizinine kopyala.
# Bu dosya publish çıktısında olmadığı için, ayrıca kopyalanmalıdır.
COPY --from=build /src/migrate.sh .
RUN chmod +x migrate.sh

ENV ASPNETCORE_URLS=http://+:8080

# ENTRYPOINT'i migrate script'i ile değiştir
ENTRYPOINT ["./migrate.sh"]
