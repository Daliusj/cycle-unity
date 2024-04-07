# Cycle Unity - A Vue 3 Project

Cycle Unity is a web application built with Vue 3 Composition API, designed for cyclists who want to share and discover cycling events and routes. Utilizing Firebase for authentication, database, and storage, it provides a robust backend for managing user data, events, and routes. The app features a dark mode toggle, a responsive design for various screen sizes, and integration with Firebase Firestore and Authentication.

## Features

- **User Authentication**: Secure signup and login functionality with Firebase Authentication.
- **Events and Routes Management**: Users can create, edit, and delete their cycling events and routes. Events can include date, time, and location details, while routes support GPX file uploads for mapping.
- **Real-time Database**: Utilizes Firebase Firestore for real-time data storage and retrieval, ensuring that event and route information is always up-to-date.
- **Responsive Design**: Adapts smoothly to different screen sizes, enhancing the user experience across devices.
- **Dark Mode**: A toggleable dark mode for user preference.
- **Vue 3 Composition API**: For better code organization and readability.

## Tech Stack

- **Build Tool**: Vite
- **Frontend**: Vue 3, Pinia, Vue Router
- **Backend**: Firebase (Firestore, Authentication)
- **Styling**: CSS with scoped styles for component-level styling
- **Other Libraries**: Vueuse for utility functions, Leaflet for map integration

## E2E Testing

End-to-End testing is implemented using Playwright. This test suite automates a user flow including login, profile update, join and decline event, event creation and deletion, and sign-out.

Ensure you have the required environment variables for the test user's email and password in a `.env` file at the root of your project.

```env
TEST_USER_EMAIL=your_test_user_email
TEST_USER_PASSWORD=your_test_user_password
```

To run the E2E tests, execute:

```bash
npm run test:e2e
```

## Continuous Integration and Deployment

This project is set up with GitHub Actions for continuous integration, including linting, unit tests, and E2E tests with Playwright. Upon push to the `main` branch or manually via the Actions tab, the workflow will automatically run.

### Deployment to Netlify

The application is deployed on Netlify. You can visit the live site here: [Cycle Unity](https://cycle-unity.netlify.app/).

## Project Setup

To run the project locally, follow these steps:

1. Clone the repository and navigate to the project directory.
2. Install dependencies using `npm install`.
3. Create a `.env` file for environment variables as mentioned above.
4. Serve the project locally with `npm run dev`.

## Contributing

Contributions are welcome! If you'd like to contribute, please fork the repository, create a new branch for your changes, and submit a pull request.

## License

This project is licensed under the MIT License
