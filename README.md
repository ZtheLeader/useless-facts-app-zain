# Useless Facts Explorer

💡 **If you'd like to know about my philosophy behind making certain decisions & experiences while developing this app, I highly encourage you to also read this [Thoughts behind Things](./THOUGHTS_BEHIND_THINGS.md) internal doc.**

## Overview

Welcome to my **Useless Facts Explorer** application! This is a single-page Angular application designed to help users discover, save, and manage intriguing "useless facts" fetched from a public API. It's built as a foundation for a larger, scalable dashboard.

#### Some Features

* **Random Fact Viewer:** Fetches and displays a new random fact with the option to save it to favorites.
* **Favorites Section:** Displays all saved facts, allows removal, and includes a search with autocomplete functionality.
* **Persistence:** All favorite facts persist across browser sessions using local storage.
* **Search with Autocomplete:** A search input for saved facts suggests matches as the user types.

## Technologies Used

Built with: Angular 19, Angular Material 19, Tailwind CSS 3.4.17, RxJS, and TypeScript. Data persisted using Local Storage, fetched from the Useless Facts API. 
More details here: [Thoughts behind Things](./THOUGHTS_BEHIND_THINGS.md)


## Environment Configuration

The application uses Angular's environment system, supporting local development overrides.

* `src/environments/environment.ts`: Default development settings (committed).
* `src/environments/environment.prod.ts`: Production settings (committed).
* `src/environments/environment.local.ts`: **Ignored by Git**, for developer-specific local overrides.

**To use `environment.local.ts`:** You can simply create this file in `src/environments/` and define your local `export const environment = { ... };` overrides within it. The build system handles the file replacement automatically during development builds.

## Getting Started
Application is currently also deployed on https://github.com/ZtheLeader/useless-facts-app-zain via Github pages. However if your'd like to set it up on your local, follow these instructions:

### Prerequisites

* Node.js (v18.x or v20.x recommended)
* npm or yarn
* Angular CLI (install globally: `npm install -g @angular/cli`)
* **[Optional] Docker Desktop (or Docker Engine):** Required to run the application via Docker.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/ztheleader/useless-facts-app-zain.git
    cd useless-facts-app-zain
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **(Optional) Create Local Environment Overrides:** If you need specific local development settings (e.g., a different API URL for testing), create `src/environments/environment.local.ts` and populate it:
    ```typescript
    // src/environments/environment.local.ts
    export const environment = {
      production: false,
      apiUrl: 'YOUR_LOCAL_API_URL_HERE' // Or just leave it if defaults are fine
    };
    ```
    *(This file is already in `.gitignore`)*

### Running the Application

#### Via Node.js Development Server

1.  **Start the development server:**
    ```bash
    ng serve -o
    ```
    Your browser will automatically open a new tab navigated to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

#### Via Docker (Optional)

1.  **Build the Docker image:**
    ```bash
    docker build -t useless-facts-app-zain .
    ```
2.  **Run the Docker container:**
    ```bash
    docker run -p 8080:80 useless-facts-app-zain
    ```
3.  Open your browser and navigate to `http://localhost:8080/`.

### Running Tests
A comprehensive testing strategy includes extensive unit tests (Karma & Jasmine) and demonstrative end-to-end tests (Cypress).

* **Unit Tests (Karma & Jasmine):**
    ```bash
    ng test
    ```
    This will open a browser and run all unit tests.

* **End-to-End Tests (Cypress):**
    1.  Ensure your Angular development server is running in a separate terminal:
        ```bash
        ng serve
        ```
    2.  In a new terminal, open the Cypress Test Runner:
        ```bash
        npx cypress open
        ```
    3.  In the Cypress UI, select "E2E Testing" and then choose the spec file (e.g., `random-fact.cy.ts`) you wish to run. For demonstration, I have only created e2e tests for Random Fact module for now.

---

*Made with ❤️ by [Zain](https://github.com/ZtheLeader/)*
