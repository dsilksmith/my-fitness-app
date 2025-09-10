# Fitness Tracker Application

A single-page web application designed to help athletes log, track, and visualize their workouts. This project is built with vanilla JavaScript and follows modern development practices.



## Project Status

**CRUD Prototype Complete:** The application has full Create, Read, Update, and Delete (CRUD) functionality, local data persistence, and a simple data visualization feature.

***

## Features

* **Log Workouts:** Add new workouts by specifying the type, distance, duration, and date.
* **View Workout List:** See a dynamically updated list of all logged workouts.
* **Update Existing Workouts:** Modify the details of any previously logged workout.
* **Delete Workouts:** Remove any workout from the list with a single click.
* **Persistent Storage:** All data is saved in the browser's `localStorage`.
* **Data Visualization:** A simple bar chart visualizes recent activity.

***

## Technology Stack

* **Frontend:** HTML5, CSS3 (with Bootstrap 5 for styling), JavaScript (ES6 Modules)
* **Architecture:** Model-View-Controller (MVC)
* **Visualization:** HTML5 Canvas API
* **Storage:** Browser `localStorage` API

***

## How It Works

The application follows a Model-View-Controller (MVC) architecture to keep the code organized and maintainable:

* **Model (`workoutModel.js`):** Defines the `Workout` JavaScript class, which acts as a blueprint for workout data.

* **View (`index.html`):** Provides the complete HTML structure, including the input form, the workout list container, and the `<canvas>` element for the chart.

* **Controller (`workoutController.js`):** Acts as the engine of the application. It listens for user events, manages the application's state (the array of workouts), and coordinates between the Model and the View. It handles form submissions for both creating new workouts and updating existing ones by managing an "edit mode". It also calls the render functions to update the UI whenever the data changes.

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