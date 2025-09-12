# Fitness Tracker Application

A single-page web application designed to help athletes log, track, and visualize their workouts. This project is built with vanilla JavaScript and follows a professional, scalable application architecture.



## Project Status

**Frontend Complete:** The application is fully functional and has been refactored for a professional architecture. The data layer is cleanly separated, making the application ready for integration with a real backend API.

***

## Features

* **Full CRUD Functionality:** Log new workouts, view a dynamic list, update existing entries, and delete unwanted workouts.
* **Polished User Interface:** A custom design with a modern font, clean layout, and a cohesive color scheme.
* **Responsive Animations:** Smooth transitions provide satisfying visual feedback when adding new items to the workout list.
* **Light & Dark Mode:** A theme toggle allows users to switch between light and dark modes for comfortable viewing.
* **Persistent User Preferences:** The app remembers the user's theme choice between sessions.
* **Interactive Charting:** A responsive bar chart, powered by the Chart.js library, visualizes recent workout distances with interactive tooltips.

***

## Application Architecture

The application uses a **Model-View-Controller + Service (MVC-S)** architecture to ensure a clean **Separation of Concerns**. Each part of the application has a distinct responsibility:

* **Model (`workoutModel.js`):** Defines the `Workout` class. Its only job is to be the blueprint for our data.
* **View (`index.html`):** The user interface. It contains all the HTML and is responsible for displaying the application.
* **Controller (`workoutController.js`):** The "brain" of the application. It listens for user input from the View and decides what to do. It does **not** know how data is saved or loaded.
* **Service (`workoutService.js`):** The data manager. The Controller calls the Service to fetch or save workouts. The Service is the only part of the app that knows *how* and *where* the data is stored (currently in `localStorage`).

This structure makes the application easy to maintain and scale. For example, to switch from `localStorage` to a real online database, we would only need to change the code in the **Service** file.

### Project Structure

fitness-tracker/
└── app/
├── controllers/
│   └── workoutController.js
├── models/
│   └── workoutModel.js
├── services/
│   └── workoutService.js
└── views/
└── index.html
└── public/
└── css/
└── style.css

***

## Technology Stack

* **Frontend:** HTML5, CSS3 (with Google Fonts), JavaScript (ES6 Modules)
* **Architecture:** MVC-S (Model-View-Controller-Service)
* **Visualization:** Chart.js
* **Storage:** Browser `localStorage` API

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
    Right-click the `app/views/index.html` file and select "Open with Live Server".

