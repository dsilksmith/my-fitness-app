// Import the Workout class from our model file
import Workout from '../models/workoutModel.js';

// --- DOM ELEMENTS ---
// Get the form and input fields from the HTML
const workoutForm = document.getElementById('workout-form');
const workoutTypeInput = document.getElementById('workout-type');
const distanceInput = document.getElementById('distance');
const durationInput = document.getElementById('duration');
const dateInput = document.getElementById('date');

// --- EVENT LISTENER ---
// Listen for when the user submits the form
workoutForm.addEventListener('submit', function(event) {
    // Prevent the default browser action of refreshing the page
    event.preventDefault();

    // 1. Get user input from the form fields
    const type = workoutTypeInput.value;
    const distance = parseFloat(distanceInput.value);
    const duration = parseInt(durationInput.value);
    const date = new Date(dateInput.value);

    // 2. Create a new workout instance using our Model
    const newWorkout = new Workout(type, distance, duration, date);

    // 3. For now, just log the new workout to the console
    console.log('New workout created:', newWorkout);
    console.log('Workout Summary:', newWorkout.getSummary());

    // 4. Clear the form fields for the next entry
    workoutForm.reset();
});