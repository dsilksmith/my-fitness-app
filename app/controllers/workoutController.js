import Workout from '../models/workoutModel.js';

// --- STATE ---
let workouts = loadWorkouts();

// --- DOM ELEMENTS ---
// (All the getElementById calls remain the same...)
const workoutForm = document.getElementById('workout-form');
const workoutTypeInput = document.getElementById('workout-type');
const distanceInput = document.getElementById('distance');
const durationInput = document.getElementById('duration');
const dateInput = document.getElementById('date');
const workoutList = document.getElementById('workout-list');
const editModeInput = document.getElementById('edit-mode-id');
const saveWorkoutBtn = document.getElementById('save-workout-btn');
const canvas = document.getElementById('workout-chart');
const ctx = canvas.getContext('2d');

// ... after the existing DOM ELEMENTS section ...

const themeToggle = document.getElementById('theme-toggle');

// --- THEME SWITCHING ---

// Function to set the theme
function setTheme(theme) {
    document.body.dataset.theme = theme;
    localStorage.setItem('theme', theme);
    // Update the toggle's checked state
    themeToggle.checked = theme === 'dark';
}

// Event listener for the toggle
themeToggle.addEventListener('change', () => {
    const newTheme = themeToggle.checked ? 'dark' : 'light';
    setTheme(newTheme);
});

// Function to load the saved theme on startup
function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
}

// Load the theme when the app starts
loadTheme();

// --- FUNCTIONS ---

function renderWorkouts() {
    workoutList.innerHTML = '';
    if (workouts.length > 0) {
        workoutList.innerHTML = '<h2 class="mb-4">Logged Workouts</h2>';
    }
    workouts.forEach(workout => {
        const workoutElement = document.createElement('div');
        workoutElement.classList.add('card', 'mb-3');
        
        // UPDATED: Add the "entering" class to set the initial state
        workoutElement.classList.add('workout-entering');

        workoutElement.innerHTML = `
            <div class="card-body d-flex justify-content-between align-items-center">
                <div>
                    <h5 class="card-title">${workout.type}</h5>
                    <p class="card-text mb-0">${workout.getSummary()}</p>
                </div>
                <div>
                    <button class="btn btn-secondary btn-sm edit-btn me-2" data-id="${workout.id}">Edit</button>
                    <button class="btn btn-danger btn-sm delete-btn" data-id="${workout.id}">Delete</button>
                </div>
            </div>
        `;
        workoutList.appendChild(workoutElement);

        // UPDATED: Use a tiny timeout to remove the class.
        // This allows the browser to render the initial state before transitioning to the final state.
        setTimeout(() => {
            workoutElement.classList.remove('workout-entering');
        }, 10);
    });
    renderChart();
}

function startEditWorkout(id) {
    // (This function remains the same)
    const workout = workouts.find(w => w.id === id);
    if (!workout) return;
    workoutTypeInput.value = workout.type;
    distanceInput.value = workout.distance;
    durationInput.value = workout.duration;
    dateInput.value = new Date(workout.date).toISOString().split('T')[0];
    editModeInput.value = id;
    saveWorkoutBtn.textContent = 'Update Workout';
    workoutForm.scrollIntoView({ behavior: 'smooth' });
}

function updateWorkout(id) {
    // (This function remains the same)
    const workout = workouts.find(w => w.id === id);
    if (!workout) return;
    workout.type = workoutTypeInput.value;
    workout.distance = parseFloat(distanceInput.value);
    workout.duration = parseInt(durationInput.value);
    workout.date = new Date(dateInput.value);
    saveWorkouts();
    renderWorkouts();
}

function resetForm() {
    // (This function remains the same)
    workoutForm.reset();
    editModeInput.value = '';
    saveWorkoutBtn.textContent = 'Save Workout';
}

function renderChart() {
    // (This function remains the same)
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const chartData = workouts.slice(-5);
    if (chartData.length === 0) return;
    const maxDistance = Math.max(...chartData.map(w => w.distance));
    const barWidth = 40;
    const spacing = 30;
    const chartHeight = canvas.height - 20;
    const startX = 30;
    chartData.forEach((workout, index) => {
        const barHeight = (workout.distance / maxDistance) * chartHeight;
        const x = startX + index * (barWidth + spacing);
        const y = canvas.height - barHeight - 10;
        ctx.fillStyle = '#0d6efd';
        ctx.fillRect(x, y, barWidth, barHeight);
        ctx.fillStyle = '#333';
        ctx.textAlign = 'center';
        ctx.fillText(`${workout.distance} km`, x + barWidth / 2, y - 5);
    });
}

function saveWorkouts() {
    // (This function remains the same)
    localStorage.setItem('fitness-tracker-workouts', JSON.stringify(workouts));
}

// THIS IS THE SECOND IMPORTANT FIX
function loadWorkouts() {
    const savedWorkouts = localStorage.getItem('fitness-tracker-workouts');
    if (!savedWorkouts) return [];
    
    const parsedWorkouts = JSON.parse(savedWorkouts);

    // UPDATED: Now we pass the existing ID (w.id) to the constructor
    return parsedWorkouts.map(w => new Workout(w.type, w.distance, w.duration, new Date(w.date), w.id));
}

function deleteWorkout(id) {
    // (This function remains the same)
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
// (All event listeners remain the same)
workoutForm.addEventListener('submit', function(event) {
    event.preventDefault();
    // The editId logic now works with string UUIDs, so parseInt is removed.
    const editId = editModeInput.value;

    if (editId) {
        updateWorkout(editId);
    } else {
        const newWorkout = new Workout(
            workoutTypeInput.value,
            parseFloat(distanceInput.value),
            parseInt(durationInput.value),
            new Date(dateInput.value)
        );
        workouts.push(newWorkout);
        saveWorkouts();
        renderWorkouts();
    }
    
    resetForm();
});

workoutList.addEventListener('click', function(event) {
    const id = event.target.dataset.id; // ID is now a string

    if (event.target.classList.contains('delete-btn')) {
        deleteWorkout(id);
    } else if (event.target.classList.contains('edit-btn')) {
        startEditWorkout(id);
    }
});