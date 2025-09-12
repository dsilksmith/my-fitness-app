# Fitness Tracker Application

A single-page web application designed to help athletes log, track, and visualize their workouts. This project is built with vanilla JavaScript and follows modern development practices.



## Project Status

**Frontend Prototype Complete & Stable:** The application is fully functional with all core features implemented, including a stable charting component. The next phase will be refactoring for a backend connection.

***

## Features

* **Full CRUD Functionality:** Log new workouts, view a dynamic list, update existing entries, and delete unwanted workouts.
* **Polished User Interface:** A custom design with a modern font, clean layout, and a cohesive color scheme.
* **Responsive Animations:** Smooth transitions provide satisfying visual feedback when adding new items to the workout list.
* **Light & Dark Mode:** A theme toggle allows users to switch between light and dark modes for comfortable viewing.
* **Persistent User Preferences:** The app remembers the user's theme choice between sessions using `localStorage`.
* **Interactive Charting:** A responsive bar chart, powered by the Chart.js library, visualizes recent workout distances with interactive tooltips.

***

## Technology Stack

* **Frontend:** HTML5, CSS3 (with Google Fonts), JavaScript (ES6 Modules)
* **Styling:** Bootstrap 5 (base), Custom CSS Properties (Variables)
* **Architecture:** Model-View-Controller (MVC)
* **Visualization:** Chart.js
* **Storage:** Browser `localStorage` API

***

## How It Works

The application follows a Model-View-Controller (MVC) architecture:

* **Model (`workoutModel.js`):** Defines the `Workout` JavaScript class, which acts as a blueprint for workout data.

* **View (`index.html`):** Provides the complete HTML structure, including the input form, theme toggle, workout list container, and the `<canvas>` element for the chart.

* **Controller (`workoutController.js`):** Acts as the engine of the application. It listens for user events, manages the application's state (the array of workouts), and coordinates between the Model and the View. It handles all CRUD logic, saves data to `localStorage`, and dynamically updates the Chart.js instance.

***

## Getting Started

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/YOUR_USERNAME/fitness-tracker.git](https://github.com/YOUR_USERNAME/fitness-tracker.git)
    ```

2.  **Open in VS Code:**
    Navigate to the project folder and open it in your code editor.

3.  **Install the Live Server Extension:**
    If you don't have it, go to the Extensions view in VS Code and install **Live Server** by Ritwick Dey.

4.  **Run the Application:**
    Right-click the `app/views/index.html` file and select "Open with Live Server". The application will open in your default web browser.