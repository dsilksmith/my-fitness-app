// Import the Workout class from our model file
import Workout from '../models/workoutModel.js';

// --- STATE ---
let workouts = loadWorkouts();

// --- DOM ELEMENTS ---
const workoutForm = document.getElementById('workout-form');
const workoutTypeInput = document.getElementById('workout-type');
const distanceInput = document.getElementById('distance');
const durationInput = document.getElementById('duration');
const dateInput = document.getElementById('date');
const workoutList = document.getElementById('workout-list');

// --- FUNCTIONS ---

function renderWorkouts() {
    workoutList.innerHTML = '';
    if (workouts.length > 0) {
        workoutList.innerHTML = '<h2 class="mb-4">Logged Workouts</h2>';
    }
    workouts.forEach(workout => {
        const workoutElement = document.createElement('div');
        workoutElement.classList.add('card', 'mb-3');
        workoutElement.innerHTML = `
            <div class="card-body d-flex justify-content-between align-items-center">
                <div>
                    <h5 class="card-title">${workout.type}</h5>
                    <p class="card-text mb-0">${workout.getSummary()}</p>
                </div>
                <button class="btn btn-danger btn-sm delete-btn" data-id="${workout.id}">Delete</button>
            </div>
        `;
        workoutList.appendChild(workoutElement);
    });
}

function saveWorkouts() {
    localStorage.setItem('fitness-tracker-workouts', JSON.stringify(workouts));
}

function loadWorkouts() {
    const savedWorkouts = localStorage.getItem('fitness-tracker-workouts');
    if (!savedWorkouts) return [];
    const parsedWorkouts = JSON.parse(savedWorkouts);
    return parsedWorkouts.map(w => new Workout(w.type, w.distance, w.duration, new Date(w.date)));
}

// NEW: Function to delete a workout by its ID
function deleteWorkout(id) {
    // Find the index of the workout to delete
    const workoutIndex = workouts.findIndex(workout => workout.id === id);

    // If found, remove it from the array
    if (workoutIndex > -1) {
        workouts.splice(workoutIndex, 1);
        saveWorkouts(); // Save the updated array
        renderWorkouts(); // Re-render the list
    }
}

// --- INITIAL RENDER ---
renderWorkouts();


// --- EVENT LISTENERS ---
workoutForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const type = workoutTypeInput.value;
    const distance = parseFloat(distanceInput.value);
    const duration = parseInt(durationInput.value);
    const date = new Date(dateInput.value);

    const newWorkout = new Workout(type, distance, duration, date);
    workouts.push(newWorkout);
    saveWorkouts();
    renderWorkouts();
    workoutForm.reset();
});

// NEW: Event listener for the entire workout list (Event Delegation)
workoutList.addEventListener('click', function(event) {
    // Check if a delete button was clicked
    if (event.target.classList.contains('delete-btn')) {
        // Get the id from the data-id attribute
        const workoutId = parseInt(event.target.dataset.id);
        deleteWorkout(workoutId);
    }
});