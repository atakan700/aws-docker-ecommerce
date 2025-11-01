# Build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY ["FileServices.csproj", "./"]
RUN dotnet restore "FileServices.csproj"

COPY . ./
RUN dotnet publish "FileServices.csproj" -c Release -o /app/publish

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/publish .

ENTRYPOINT ["dotnet", "FileServices.dll"]
