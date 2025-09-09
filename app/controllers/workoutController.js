// Import the Workout class from our model file
import Workout from '../models/workoutModel.js';

// --- STATE ---
// Load workouts from localStorage when the app starts.
let workouts = loadWorkouts();

// --- DOM ELEMENTS ---
const workoutForm = document.getElementById('workout-form');
const workoutTypeInput = document.getElementById('workout-type');
const distanceInput = document.getElementById('distance');
const durationInput = document.getElementById('duration');
const dateInput = document.getElementById('date');
const workoutList = document.getElementById('workout-list');

// --- FUNCTIONS ---

/**
 * Renders the list of workouts to the page.
 */
function renderWorkouts() {
    workoutList.innerHTML = '';
    if (workouts.length > 0) {
        workoutList.innerHTML = '<h2 class="mb-4">Logged Workouts</h2>';
    }
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

/**
 * Saves the current workouts array to localStorage.
 */
function saveWorkouts() {
    // localStorage can only store strings, so we convert our array to a JSON string.
    localStorage.setItem('fitness-tracker-workouts', JSON.stringify(workouts));
}

/**
 * Loads workouts from localStorage.
 * @returns {Workout[]} An array of Workout instances.
 */
function loadWorkouts() {
    const savedWorkouts = localStorage.getItem('fitness-tracker-workouts');
    if (!savedWorkouts) {
        return []; // Return an empty array if nothing is saved
    }

    // Convert the JSON string back into a plain JavaScript array
    const parsedWorkouts = JSON.parse(savedWorkouts);

    // Convert the plain objects back into instances of our Workout class
    // This is important so they have access to methods like getSummary()
    return parsedWorkouts.map(w => new Workout(w.type, w.distance, w.duration, new Date(w.date)));
}

// --- INITIAL RENDER ---
// Display any saved workouts as soon as the page loads.
renderWorkouts();


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

    // 4. Save the updated array to localStorage
    saveWorkouts();

    // 5. Re-render the list
    renderWorkouts();

    // 6. Clear the form
    workoutForm.reset();
});