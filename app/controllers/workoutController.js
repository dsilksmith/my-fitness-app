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
// NEW: Get the canvas element and its 2D drawing context
const canvas = document.getElementById('workout-chart');
const ctx = canvas.getContext('2d');


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
    
    // UPDATED: Re-render the chart whenever the workout list is updated
    renderChart();
}

// NEW: Function to draw the workout chart on the canvas
function renderChart() {
    // 1. Clear the canvas before drawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 2. Get the last 5 workouts for the chart
    const chartData = workouts.slice(-5);
    if (chartData.length === 0) return; // Don't draw if there's no data

    // 3. Find the maximum distance to scale the bars
    const maxDistance = Math.max(...chartData.map(w => w.distance));
    
    // 4. Set chart parameters
    const barWidth = 40;
    const spacing = 30;
    const chartHeight = canvas.height - 20; // Leave space for text
    const startX = 30;

    // 5. Loop through the data and draw each bar
    chartData.forEach((workout, index) => {
        const barHeight = (workout.distance / maxDistance) * chartHeight;
        const x = startX + index * (barWidth + spacing);
        const y = canvas.height - barHeight - 10; // Position from the bottom up

        // Draw the bar
        ctx.fillStyle = '#0d6efd'; // A nice blue color
        ctx.fillRect(x, y, barWidth, barHeight);

        // Draw the distance text above the bar
        ctx.fillStyle = '#333';
        ctx.textAlign = 'center';
        ctx.fillText(`${workout.distance} km`, x + barWidth / 2, y - 5);
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

function deleteWorkout(id) {
    const workoutIndex = workouts.findIndex(workout => workout.id === id);
    if (workoutIndex > -1) {
        workouts.splice(workoutIndex, 1);
        saveWorkouts();
        renderWorkouts();
    }
}

// --- INITIAL RENDER ---
renderWorkouts();


// --- EVENT LISTENERS ---
// ... (No changes to the event listeners) ...
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

workoutList.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-btn')) {
        const workoutId = parseInt(event.target.dataset.id);
        deleteWorkout(workoutId);
    }
});