/**
 * Represents a single workout session.
 * This class is the "Model" in our MVC architecture.
 */
class Workout {
    /**
     * Creates a new workout instance.
     * @param {string} type - The type of workout (e.g., 'Running', 'Cycling').
     * @param {number} distance - The distance covered, in kilometers.
     * @param {number} duration - The duration of the workout, in minutes.
     * @param {Date} date - The date the workout was completed.
     * @param {string} [id] - Optional: The existing ID of the workout (used when loading from storage).
     */
    constructor(type, distance, duration, date, id) {
        // If an id is provided (when loading from storage), use it.
        // Otherwise, generate a new, truly unique ID.
        this.id = id || crypto.randomUUID();
        this.type = type;
        this.distance = distance;
        this.duration = duration;
        this.date = date;
    }

    /**
     * A simple method to get a summary of the workout.
     * @returns {string} A summary string.
     */
    getSummary() {
        return `${this.type} on ${new Date(this.date).toLocaleDateString()}: ${this.distance} km in ${this.duration} minutes.`;
    }
}

// We export the class to make it available to other files in our application.
export default Workout;