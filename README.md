# Viko - Personal Productivity App

## 🎯 About the Application

**Viko** is a minimalist and aesthetic all-in-one productivity workspace web application. It is specifically designed to provide users with a distraction-free, highly focused personal environment by seamlessly integrating three essential pillars of productivity—task management, time management, and focus ambience—into a single, unified dashboard.

Unlike traditional productivity tools, CozySpace utilizes a **Personalized Space** concept. Upon first entering the application, users are prompted to name their own custom workspace. This name is securely stored using client-side cookies, which automatically provisions a unique, dedicated URL (`/spaceName`). Within this personal space, all productive activities take place, offering a truly private digital workspace experience.

### 🌊 User Journey
1. **Workspace Creation:** The user lands on the main gateway page and types in their desired space name (e.g., `study-room` or `deep-work`).
2. **Instant Authentication:** The system captures the input, saves it into the browser's cookies (default duration: 365 days), and triggers an automatic programmatic redirect.
3. **Centralized Dashboard:** The user is immediately presented with a full-screen dashboard containing a **To-Do List** to track objectives, a **Pomodoro Timer** to segment deep work blocks, and a **Music Corner** playing soothing Lo-Fi background tracks.

---

## 🚀 Core Features

1. **Dynamic Space Access (Cookie-based Routing)**
   * Secured using Vue Router Navigation Guards. If a user attempts to bypass the gateway and access the dashboard directly without a configured space cookie, they are instantly redirected back to the landing page.
   * Supports flexible workspace shifting by clearing cookies to set up a new space safely.

2. **Reactive To-Do List (Pinia Store)**
   * A highly responsive task management system allowing users to add, delete, and toggle tasks with clean visual feedback.
   * State is managed centrally via a Pinia Store to maintain a scalable and modular codebase.

3. **Smart Pomodoro Timer**
   * Built-in interval timer featuring standard 25-minute focus blocks alternating with 5-minute short break sessions.
   * Complete playback controls (Play, Pause, Reset) with seamless, automated session transitions and an audio alert cue when a session concludes.

4. **Integrated Music Corner**
   * An embedded Lo-Fi audio player operating entirely on the HTML5 Audio API.
   * Offers built-in playback navigation (Next/Previous tracks), Play/Pause state handling, and a dedicated volume slider directly accessible within the workspace.

---

## 🛠️ Tech Stack

* **Framework:** Vue 3 (Composition API)
* **Build Tool:** Vite
* **State Management:** Pinia
* **Routing:** Vue Router
* **Styling:** Tailwind CSS
* **Cookie Helper:** js-cookie

---

## 💻 Installation & Getting Started

### Prerequisites
Make sure you have **Node.js** (version 16 or higher) and **npm** installed on your local machine.

1. **Clone the Repository**
   ```bash
   git clone [https://github.com/EriyaDev/viko-app.git](https://github.com/EriyaDev/viko-app.git)
   cd cozyspace-productivity-app

2. **Install Dependencies**
    ```bash
    npm install

3. **Run the Local Development Server**
    ```bash
    npm run dev

4. **Build for Production**
    ```bash
    npm run build

---

## 📂 Project Folder Structure

src/
├── assets/          # Alarm audio files & static visual assets
├── components/      # Core widget components (TodoList.vue, PomodoroTimer.vue, MusicCorner.vue)
├── router/          # Vue Router configuration & Navigation Guards
├── stores/          # Pinia state management modules for the To-Do list
├── views/           # Primary page views (LandingPage.vue & SpaceWorkspace.vue)
├── App.vue          # Root component
└── main.js          # Application entry point


## 📄 License

This project is licensed under the MIT License.