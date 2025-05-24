# 🌟 Thoughts Behind Things 🌟

The intention of writing this document is to share in-depth insights into my development decisions and experiences. I am sure it will serve the task evaluation process well. I'll try to be precise and thorough.



## 🚀 How did I plan to work on the project when I received it?
The moment I received the assignment, I read the problem statement like for 3 times. Then I drew an image in my mind about what the architecture of the application should be. Even though it was a small project, I had to architect it to be scale-able. With the help of some AI, I was able to complete a technical blueprint document. After some iterations, I locked this document and decided to follow it as my source of requirements.

Then I decided to start working on it over the weekend with proper breaks. I also decided to do frequent commit messages to keep my progress trackable.


## 💻 What is the Tech Stack and why did I pick it?
Throughout my career, I've worked on and experimented with various tech stacks. I strongly believe that a developer's chosen stack speaks volumes about their development style and experience.
**Tech Stack for this Project:**
1.  **[Angular v19](https://angular.dev/)**: I know Angular from when it used to be AngularJS. I decided to work on the latest version this time because I wanted to try out the full potential of the framework and see how much it has evolved.
2.  **[Typescript](https://www.typescriptlang.org/)**: Though Angular comes natively with TS support now, TS has almost become an industry standard. They say, once you go TS, there's no going back to JS.
3.  **[Angular Material UI](https://material.angular.io/)**: Material UI from Google almost goes hand in hand with Angular, so it was my first choice as a design system for my application.
4.  **[Tailwind CSS](https://tailwindcss.com/)**: I used it as it offers handy utility classes that enhance my development speed.
5.  **[RxJS](https://rxjs.dev/)**: I have always been interested in how the Angular ecosystem handles state natively and I must say it is fascinating and quite unique compared to my other experiences with Redux, Vuex, Tanstack and similar state management solutions.
6.  **[Web Storage (localStorage)](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)**: Local storage is the simplest and easiest option to implement in-browser memory and persistence across sessions. I picked it to align with my core project requirements.
7.  **[Karma](https://karma-runner.github.io/) & [Jasmine](https://jasmine.github.io/)**: As Angular's default testing tools, these were my choice for implementing comprehensive unit tests.
8.  **[Cypress](https://www.cypress.io/)**: I picked Cypress for E2E tests because it adds an additional layer of predictability to your application's flow. This way I could ensure not only the functional behavior via unit tests but also the overall flow and predictability via Cypress.
9.  **Angular Environment Files (`environment.ts`, `environment.prod.ts`, `environment.local.ts`)**: By using environment variables, one can use their own API keys or change the fact base URL to fetch facts from other sources. Using environment variables is also a standard approach wherever secrets are dealt with.


## 🤔 What was the most challenging part while working on it?
 ### Non-Functional Challenges:
 1. I have been out of the touch with Angular ecosystem for some years. I have been a React person lately. When I got this assignment, I was excited that now I have a chance to refresh my Angular concepts but coming out of React mindset and adopting Angular's way of doing things took some time.
2. Dockerization, that I decided to do voluntarily also took a lot of time. It took it as challenge and was able to resolve it.
3. Additionally, setting up **environment variables for local overrides** (`environment.local.ts`) exposed a subtle challenge. The `angular.json` file replacement mechanism expecting `environment.local.ts` to exist by default led to compilation errors (`path does not exist`) on fresh clones. Resolving this required adjusting `angular.json` to make `environment.local.ts` truly optional by setting up a separate `local` build configuration, ensuring `ng serve` works out-of-the-box for new developers.

 ### Functional Challenges: 
Additionally, working on unit tests was quite tricky.

## 🔍 Did I follow SOLID and KISS rules? If yes, where?
I used these and couple of other best practices. For example:
- My services use the Singleton pattern.
- My Fact card uses the reusability principles.
- My smart and dumb components are separate which keeps things manageable and keep the concerns separate.

Additionally, I used simple, to the point naming conventions and a scalable project structure.


## 📱 Is the application responsive?
Yes. That is a must to have for web apps these days. Though the application is a simple two page one, I still kept it responsive. Thanks to Angular Material and tailwindcss, it was not a big problem.


## 🔄 Some insights about version control:
- I made frequent commits while working on this app so that my history and timeline are well-documented, allowing the reviewer to see my progress over time.
- My commit messages are inspired by commit-style suggested in [this discussion](https://stackoverflow.com/a/3580764/7466073).  
tldr: I use **Present Tense Imperative** while writing my commit message. It starts with the type of commit eg, `feat`, `chore`, `refactor`, `fix` etc. 
- I didn't use PR based work as I was the only one working on this project. However I'm well aware of PRs and review system.

## 🛠️ Project Structure Insights:

A clean, modular project structure is crucial for scalability and maintainability. I aimed for this even in a small app, as it's a foundation for a larger dashboard. You'll find distinct folders:

* **`features/`**: Each main feature (e.g., 'Random Fact', 'Favorites') has its own dedicated space. This ensures clear organization, easy addition of new functionalities, and enables lazy loading for performance.
* **`core/`**: Holds app-wide singletons and fundamental services, like data fetching and global state management.
* **`shared/`**: Contains reusable UI components, pipes, and directives, designed for easy reuse across features.

I followed the Container/Presentational component pattern: 'smart' components manage data and logic, passing it to 'dumb' components purely for rendering. 
All complex logic is encapsulated within services, keeping components lean and focused on display. This structure emphasizes clear separation of concerns, reusability, and scalable code.


## ❌ What does the project lack with respect to requirements?
I think it doesn't lack anything from the given requirements.


## ⏳ What would I add more to the application if I had more time?
- I'm a frontend guy and I wanted to make the application much more better in terms of look and feel but also user experience. I would add ARIA standard accessability, support of dark/light theme probably more animations.
- Also, I'm not 100% with the way my search bar works. It does the job but I have some more ideas for it.
- Though I was initially satisfied with Material design, later I felt that I could have created an even better experience with [PrimeNG](https://primeng.org/)


## 🤖 Did I take help from ChatGPT/Gemini?
I'd be lying if I say "No". :) 
