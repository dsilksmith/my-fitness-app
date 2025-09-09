// Import the Workout class from our model file
import Workout from '../models/workoutModel.js';

// --- STATE ---
// An array to hold all our workout objects. This acts as our in-memory "database".
const workouts = [];

// --- DOM ELEMENTS ---
const workoutForm = document.getElementById('workout-form');
const workoutTypeInput = document.getElementById('workout-type');
const distanceInput = document.getElementById('distance');
const durationInput = document.getElementById('duration');
const dateInput = document.getElementById('date');
const workoutList = document.getElementById('workout-list'); // Get the container for our list

// --- FUNCTIONS ---
/**
 * Renders the list of workouts to the page.
 */
function renderWorkouts() {
    // 1. Clear the existing list to prevent duplicates
    workoutList.innerHTML = '';

    // 2. Add a title for the workout list
    if (workouts.length > 0) {
        workoutList.innerHTML = '<h2 class="mb-4">Logged Workouts</h2>';
    }

    // 3. Loop through each workout and create the HTML for it
    workouts.forEach(workout => {
        const workoutElement = document.createElement('div');
        workoutElement.classList.add('card', 'mb-3');
        workoutElement.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${workout.type}</h5>
                <p class="card-text">${workout.getSummary()}</p>
            </div>
        `;
        workoutList.appendChild(workoutElement);
    });
}


// --- EVENT LISTENER ---
workoutForm.addEventListener('submit', function(event) {
    event.preventDefault();

    // 1. Get user input
    const type = workoutTypeInput.value;
    const distance = parseFloat(distanceInput.value);
    const duration = parseInt(durationInput.value);
    const date = new Date(dateInput.value);

    // 2. Create a new workout instance
    const newWorkout = new Workout(type, distance, duration, date);

    // 3. Add the new workout to our array
    workouts.push(newWorkout);

    // 4. Re-render the list of workouts on the page
    renderWorkouts();

    // 5. Clear the form
    workoutForm.reset();
});