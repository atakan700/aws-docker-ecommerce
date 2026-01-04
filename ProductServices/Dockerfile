# Build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY ["ProductServices.csproj", "./"]
RUN dotnet restore "ProductServices.csproj"

COPY . ./

# migrate.sh ile ilgili her şeyi kaldırdık.
# Sadece uygulamayı publish ediyoruz.
RUN dotnet publish "ProductServices.csproj" -c Release -o /app/publish

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app

# Sadece publish edilen dosyaları kopyalıyoruz
COPY --from=build /app/publish .

ENV ASPNETCORE_URLS=http://+:8080

# ENTRYPOINT artık doğrudan uygulamanın kendisi
ENTRYPOINT ["dotnet", "ProductServices.dll"]