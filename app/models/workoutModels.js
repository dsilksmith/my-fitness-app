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
     */
    constructor(type, distance, duration, date) {
        this.id = new Date().getTime(); // A simple unique ID based on the timestamp
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
        return `${this.type} on ${this.date.toLocaleDateString()}: ${this.distance} km in ${this.duration} minutes.`;
    }
}

// We export the class to make it available to other files in our application.
export default Workout;