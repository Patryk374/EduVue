# build stage
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY EduVue.Api/*.csproj ./EduVue.Api/
RUN dotnet restore EduVue.Api/EduVue.Api.csproj
COPY EduVue.Api/ ./EduVue.Api/
RUN dotnet publish EduVue.Api/EduVue.Api.csproj -c Release -o /app/publish

# runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app

COPY --from=build /app/publish .
COPY EduVue.Api/appsettings.json ./

ENV ASPNETCORE_URLS=http://0.0.0.0:5001
EXPOSE 5001
ENTRYPOINT ["dotnet", "EduVue.Api.dll"]
