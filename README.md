Muurrbuy Information App (PWA)
This project is a front-end prototype for a mobile-first Progressive Web App (PWA) developed for the Muurrbuy Aboriginal Language and Culture Co-operative. The goal of this application is to strengthen community connection, promote cultural events, and support language revival through an accessible, modern, and user-friendly digital platform.
This prototype was built using React and Tailwind CSS, focusing on a clean UI and a responsive, mobile-first design.
Key Features
The current prototype includes the following features:
* Home Page: An introduction to the Muurrbuy Co-operative, its mission, and a quick link to the event calendar.
* Events Calendar: An interactive calendar to display upcoming community and cultural events.
* Event Details Page: A detailed view for each event, including time, location, host, and other cultural information.
* Google Maps Integration: A "Map" button on the event details page that opens Google Maps with the event's location.
* Cultural Voice Notes: A feature allowing users to record audio notes using their device's microphone, with a permission request flow.
* Community Hub: A section for users to sign up for newsletters or register their interest in volunteering.
* Donations Page: A dedicated page for supporting the co-operative's mission.
* Mobile-First Design: A fully responsive layout with a bottom navigation bar for easy access on mobile devices.
* Offline Placeholders: Sections ready for PWA offline capabilities to be fully implemented.
Technology Stack
* Frontend:
   * React: A JavaScript library for building user interfaces.
   * Vite: A modern, fast build tool for front-end development.
   * Tailwind CSS: A utility-first CSS framework for rapid UI development.
* Planned Backend:
   * Firebase: For backend services including authentication, Firestore database, and hosting.
* Planned Payments:
   * Stripe: For secure and reliable donation processing.
Getting Started
Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.
Prerequisites
You need to have Node.js (version 18.0 or later) and npm installed on your computer. You can verify your installation by running:
node -v
npm -v

Installation & Setup
1. Clone the repository:
git clone <your-repository-url>
cd muurrbuy-app

2. Install project dependencies:
This will install React, Tailwind CSS, and all other necessary packages.
npm install

3. Run the development server:
This command starts the Vite development server.
npm run dev

4. Open the app in your browser:
Navigate to http://localhost:5173 (or the address shown in your terminal) to see the application live.
Project Status
This repository currently contains the v1.0 front-end prototype. The UI and core client-side functionalities are in place.
The next steps for this project involve:
   * Integrating Firebase for backend services (user authentication, event data storage).
   * Connecting the donations page to the Stripe API.
   * Implementing service workers to enable full PWA offline capabilities.