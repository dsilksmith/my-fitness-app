import Workout from '../models/workoutModel.js';

window.addEventListener('load', () => {

    // --- STATE ---
    let workouts = [];
    let workoutChart = null;

    // --- DOM ELEMENTS ---
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
    const themeToggle = document.getElementById('theme-toggle');

    // --- THEME ---
    function applyTheme(theme) {
        document.body.dataset.theme = theme;
        themeToggle.checked = theme === 'dark';
    }

    function setTheme(theme) {
        applyTheme(theme);
        localStorage.setItem('theme', theme);
    }

    themeToggle.addEventListener('change', () => {
        const newTheme = themeToggle.checked ? 'dark' : 'light';
        setTheme(newTheme);
        updateChartColors();
    });

    function loadInitialTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        applyTheme(savedTheme);
    }
    
    function updateChartColors() {
        if (!workoutChart) return;
        const themePrimaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim() || '#5E60CE';
        workoutChart.data.datasets[0].backgroundColor = themePrimaryColor;
        workoutChart.update();
    }
    


    // --- CHART ---
    function setupChart() {
        if (!ctx) return;
        if (workoutChart) {
            workoutChart.destroy();
        }
        const themePrimaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim() || '#5E60CE';

        let labels, data, yMax;
        if (workouts.length > 0) {
            const chartData = workouts.slice(-7);
            labels = chartData.map(w => new Date(w.date).toLocaleDateString());
            data = chartData.map(w => w.distance);
            yMax = undefined; // Let Chart.js auto-scale
        } else {
            labels = ['No workouts yet'];
            data = [0];
            yMax = 10; // Set a reasonable max for empty chart
        }

        workoutChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Distance (km)',
                    data: data,
                    backgroundColor: themePrimaryColor,
                    borderRadius: 4,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true, // <-- THIS SHOULD BE TRUE
                plugins: { legend: { display: false } },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: yMax,
                        title: { display: true, text: 'Distance (km)' }
                    },
                    x: { title: { display: true, text: 'Workout Date' } }
                }
            }
        });
    }

    function updateChartData() {
        if (!workoutChart) return;

        let labels, data, yMax;
        if (workouts.length > 0) {
            const chartData = workouts.slice(-7);
            labels = chartData.map(w => new Date(w.date).toLocaleDateString());
            data = chartData.map(w => w.distance);
            yMax = undefined;
        } else {
            labels = ['No workouts yet'];
            data = [0];
            yMax = 10;
        }

        workoutChart.data.labels = labels;
        workoutChart.data.datasets[0].data = data;
        workoutChart.options.scales.y.max = yMax;
        workoutChart.update();
    }

    // --- WORKOUTS ---
    function renderWorkouts() {
        workoutList.innerHTML = '';
        if (workouts.length > 0) {
            workoutList.innerHTML = '<h2 class="mb-4">Logged Workouts</h2>';
        }
        workouts.sort((a, b) => new Date(b.date) - new Date(a.date));
        workouts.forEach(workout => {
            const workoutElement = document.createElement('div');
            workoutElement.classList.add('card', 'mb-3');
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
            workoutElement.classList.add('workout-entering');
            setTimeout(() => workoutElement.classList.remove('workout-entering'), 10);
        });
        updateChartData();
    }
    
    function startEditWorkout(id) {
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
        const workout = workouts.find(w => w.id === id);
        if (!workout) return;
        Object.assign(workout, {
            type: workoutTypeInput.value,
            distance: parseFloat(distanceInput.value),
            duration: parseInt(durationInput.value),
            date: new Date(dateInput.value)
        });
        saveWorkouts();
        renderWorkouts();
    }

    function resetForm() {
        workoutForm.reset();
        editModeInput.value = '';
        saveWorkoutBtn.textContent = 'Save Workout';
    }

    function saveWorkouts() {
        localStorage.setItem('fitness-tracker-workouts', JSON.stringify(workouts));
    }

    function loadWorkouts() {
        const savedWorkoutsJSON = localStorage.getItem('fitness-tracker-workouts');
        if (savedWorkoutsJSON) {
            try {
                const savedWorkouts = JSON.parse(savedWorkoutsJSON);
                workouts = savedWorkouts.map(w => new Workout(w.type, w.distance, w.duration, new Date(w.date), w.id));
            } catch (e) {
                console.error("Error parsing workouts from localStorage", e);
                workouts = [];
            }
        }
    }

    function deleteWorkout(id) {
        workouts = workouts.filter(w => w.id !== id);
        saveWorkouts();
        renderWorkouts();
    }

    // --- APP INITIALIZATION ---
    function init() {
        loadInitialTheme();
        loadWorkouts();
        setupChart();
        renderWorkouts();
    }

    init();

    // --- EVENT LISTENERS ---
    workoutForm.addEventListener('submit', function(event) {
        event.preventDefault();
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
        const button = event.target.closest('button');
        if (!button || !button.dataset.id) return;

        const id = button.dataset.id;
        if (button.classList.contains('delete-btn')) {
            deleteWorkout(id);
        } else if (button.classList.contains('edit-btn')) {
            startEditWorkout(id);
        }
    });
});