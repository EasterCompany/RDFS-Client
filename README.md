# RDFS Cloud Storage
This is the client (frontend) repository for the RDFS Cloud Storage application. The client is a universal platform
solution for accessing, modifying and deleting files from an RDFS API.

## Supported Platforms
Below you will find the release schedule for supported platforms. A web application will be the first targeted release,
followed by an Android native application, then Windows, MacOS & Linux native applications, then finally a native iOS
application.

| Version | Web                 | Android            | Desktop            | iOS                |
| ------- | ------------------- | ------------------ | ------------------ | ------------------ |
| 1.2.x   | :white_check_mark:  | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| 1.1.x   | :white_check_mark:  | :white_check_mark: | :white_check_mark: | :x:                |
| 1.0.x   | :white_check_mark:  | :white_check_mark: | :x:                | :x:                |
| 0.0.x   | :white_check_mark:  | :x:                | :x:                | :x:                |

**Web** is a universally accessible platform, so it will always take priority over other versions.

**Android** is easy to deploy to, we don't need to go through the hassle of paying fees and getting accepted into an app
store, instead we can easily allow users to download an `.apk` file and install the app. Although we will eventually
target a Play Store release, to speed things up, we'll just release an APK first.

**Desktop** applications are third. They will most likely be an electron app (or something similar) which wraps
the original web version into a native application. Since users will already be able to install the web version as a
PWA, there isn't much value here. However it is worth doing eventually due to it's simplicity and accessability.

**iOS** is our last (but not least) priority due to the effort & cost involved in deploying an application to the App
Store.

## Membership & Subscriptions
Users will be able to use RDFS for free, using our tiered membership plan. The free tier will include a minimal 1GB of
storage. Each additional tier will grant an extra 10GB for a currently undetermined fee. (per GB costs are discounted
the higher the users tier is)

## Self Host Solutions
If a user would prefer to host their own files, then this application is available for free. Simply install it to an
[Overlord](https://github.com/EasterCompany/Overlord) based Server along with the
[RDFS-API](https://github.com/EasterCompany/RDFS-API) on your chosen solution and enjoy our hard work for nothing...

Because we love open-source and we wouldn't exist without it!
