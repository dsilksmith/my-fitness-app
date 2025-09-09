# Fitness Tracker Application

A single-page web application designed to help athletes log, track, and visualize their workouts. This project is built with vanilla JavaScript and follows modern development practices.



## Project Status

**Prototype Complete:** The application has full Create, Read, and Delete (CRD) functionality, local data persistence, and a simple data visualization feature.

***

## Features

* **Log Workouts:** Add new workouts by specifying the type (e.g., Running, Cycling), distance, duration, and date.
* **View Workout List:** See a dynamically updated list of all logged workouts.
* **Delete Workouts:** Remove any workout from the list with a single click.
* **Persistent Storage:** All data is saved in the browser's `localStorage`, so your workouts are still there even after you close the page.
* **Data Visualization:** A simple bar chart, drawn with the HTML5 Canvas, displays the distances of your last five activities.

***

## Technology Stack

* **Frontend:** HTML5, CSS3 (with Bootstrap 5 for styling), JavaScript (ES6 Modules)
* **Architecture:** Model-View-Controller (MVC)
* **Visualization:** HTML5 Canvas API
* **Storage:** Browser `localStorage` API

***

## How It Works

The application follows a Model-View-Controller (MVC) architecture to keep the code organized and maintainable:

* **Model (`workoutModel.js`):** Defines the `Workout` JavaScript class. This class acts as a blueprint, specifying the data structure for a single workout (e.g., `id`, `type`, `distance`).

* **View (`index.html`):** Provides the complete HTML structure for the user interface. This includes the input form for logging new workouts, the container where the list of workouts is displayed, and the `<canvas>` element for the chart.

* **Controller (`workoutController.js`):** Acts as the engine of the application. It listens for user events (like form submissions and button clicks), manages the application's state (the array of workouts), and coordinates between the Model and the View. It is responsible for:
    1.  Handling form input to create new `Workout` instances (Model).
    2.  Saving, loading, and deleting workouts from `localStorage`.
    3.  Calling the render functions to update the workout list (View) and the chart (Canvas) whenever the data changes.

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