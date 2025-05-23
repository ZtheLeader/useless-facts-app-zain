# Useless Facts Explorer

📘 **If you'd like to know about my philosophy behind making certain decisions & experiences while developing this app, I highly encourage you to also read this [Thoughts behind Things](./THOUGHTS_BEHIND_THINGS.md) internal doc.**

## Overview

Welcome to the **Useless Facts Explorer**! This is a single-page Angular application designed to help users discover, save, and manage intriguing "useless facts" fetched from a public API. It's built with modern Angular practices and a modular architecture, intended as a foundation for a larger, scalable dashboard application.

## Features (Current)

* **Random Fact Viewer:** Fetches and displays a new random fact with the option to save it to your favorites.
* **Favorites Section:** Allows you to view your saved facts and remove them from your collection. Favorites persist across sessions using local storage.

## Technologies Used

* **Angular 19:** The latest stable version of the Angular framework, leveraging standalone components for a streamlined development experience.
* **Angular Material 19:** Provides high-quality, pre-built UI components for a polished and accessible user interface.
* **Tailwind CSS 3.4.17:** A utility-first CSS framework for flexible styling, responsive layouts, and efficient UI development.
* **RxJS:** For reactive programming and managing application state within services.
* **TypeScript:** Ensures strong typing, enhancing code quality and maintainability.
* **Local Storage:** For client-side data persistence of favorite facts.

## Getting Started

Follow these steps to get the application up and running on your local machine.

### Prerequisites

Make sure you have Node.js (v18.x or v20.x recommended) and npm installed.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/ZtheLeader/useless-facts-app-zain](https://github.com/ZtheLeader/useless-facts-app-zain) # Replace with your repo URL
    cd useless-facts-app
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```

### Running the Application

1.  **Start the development server:**
    ```bash
    ng serve -o
    ```
2.  Your browser will automatically open a new tab navigated to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.


<i>Made with ❤️ by [Zain](https://github.com/ZtheLeader/)</i>
