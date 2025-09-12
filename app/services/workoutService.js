import Workout from '../models/workoutModel.js';

const STORAGE_KEY = 'fitness-tracker-workouts';

/**
 * Loads all workouts from localStorage.
 * @returns {Workout[]} An array of Workout instances.
 */
export function load() {
    const savedWorkoutsJSON = localStorage.getItem(STORAGE_KEY);
    if (savedWorkoutsJSON) {
        try {
            const savedWorkouts = JSON.parse(savedWorkoutsJSON);
            // Re-hydrate the plain objects into instances of our Workout class
            return savedWorkouts.map(w => new Workout(w.type, w.distance, w.duration, new Date(w.date), w.id));
        } catch (e) {
            console.error("Error parsing workouts from localStorage", e);
            return [];
        }
    }
    return [];
}

/**
 * Saves the entire list of workouts to localStorage.
 * @param {Workout[]} workouts - The array of workouts to save.
 */
export function save(workouts) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(workouts));
}