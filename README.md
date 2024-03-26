---
name: Box Web App Integration Demo
slug: box-web-app-integration-demo
description: This template simplifies the development of web app integrations with Box, providing a seamless setup for OAuth 2.0 authorization, token management, and file operations.
deployUrl: https://vercel.com/new/clone?repository-url=https://github.com/box-community/box-web-app-integration-demo.git&project-name=box-web-app-integration-demo&env=CLIENT_ID,CLIENT_SECRET
---

# Box Web App Integration Demo

This demo showcases a web app integration with Box, leveraging Vercel for hosting and serverless functions. It demonstrates the OAuth 2.0 authorization flow, secure token exchange, and a file rename operation within Box, all orchestrated through a modern web interface.

## How It Works

### Frontend (`index.html`, `styles.css`, `scripts.js`)

- `index.html`: Provides the structure for the web application, including input fields for the new file name and a button to initiate the file rename operation.
- `styles.css`: Styles the web application, ensuring a modern and sophisticated look, including styling for the file renaming input and button.
- `scripts.js`: Handles client-side logic, including:
  - Extracting URL parameters to obtain the `auth_code`.
  - Invoking the `/api/exchange` serverless function to exchange the `auth_code` for an access token.
  - Providing a UI for renaming a file and invoking the `/api/renameFile` serverless function to carry out the operation.
  - Enhanced error handling to display meaningful error messages based on Box API responses.

### Serverless Functions (`api/exchange.js`, `api/renameFile.js`)

- `api/exchange.js`: A serverless function that exchanges an `auth_code` for an access token with Box. It securely handles credentials and communicates with Box's OAuth 2.0 token endpoint, returning the access token to the client-side application.
- `api/renameFile.js`: Another serverless function that uses the access token to rename a file in Box. It makes an authorized request to Box's `/files/:id` endpoint, carrying out the file rename operation as instructed by the client-side application.

## Setting Up Your Box Application

To use this demo, you'll need to configure an application in Box. Here's how:

1. **Create a Box Developer Account**: If you don't already have one, sign up at [Box Developers](https://account.box.com/signup/n/developer).

2. **Create a New Application**: Go to the [Box Developer Console](https://app.box.com/developers/console), click 'Create New App', choose 'Custom App' and then 'User Authentication with OAuth 2.0'. Name your app accordingly.

3. **Set Application Scopes**: Ensure your application has the necessary permissions, such as 'Read and write all files and folders stored in Box'.

4. **Configure Integrations Tab**: For detailed steps and additional configurations, refer to the [Box Web App Integrations Guide](https://developer.box.com/guides/applications/web-app-integrations/configure/).

## Deploying to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/box-community/box-web-app-integration-demo.git&project-name=box-web-app-integration-demo&env=CLIENT_ID,CLIENT_SECRET)

## Learn More

For detailed information on Box APIs and integration capabilities, visit the [Box Developer Documentation](https://developer.box.com/).

## License

This project is open source and available under the MIT License.
