"use client";
const generateWorkoutSchedule = () => {
  // Get current date
  const today = new Date();

  // Find Monday of current week
  const monday = new Date(today);
  monday.setDate(
    monday.getDate() - (monday.getDay() === 0 ? 6 : monday.getDay() - 1)
  );

  // Base workout data without dates
  const baseWorkouts = [
    {
      day: "Monday",
      workouts: [
        {
          id: "workout-1",
          name: "Workout 1",
          exercises: [
            { id: "exercise-1", name: "Push Ups" },
            { id: "exercise-2", name: "Pull Ups" },
          ],
        },
        {
          id: "workout-2",
          name: "Workout 2",
          exercises: [
            { id: "exercise-3", name: "Squats" },
            { id: "exercise-4", name: "Lunges" },
            {
              id: "exercise-7",
              name: "Exercise C",
              sets: [
                { reps: 5, weight: 50, unit: "lb" },
                { reps: 5, weight: 60, unit: "lb" },
              ],
            },
          ],
        },
      ],
    },
    {
      day: "Tuesday",
      workouts: [
        {
          id: "workout-3",
          name: "Workout 3",
          exercises: [
            { id: "exercise-5", name: "Burpees" },
            { id: "exercise-6", name: "Mountain Climbers" },
          ],
        },
      ],
    },
    {
      day: "Wednesday",
      workouts: [
        {
          id: "workout-4",
          name: "Workout 4",
          exercises: [
            { id: "exercise-8", name: "Deadlifts" },
            { id: "exercise-9", name: "Bent Over Rows" },
          ],
        },
      ],
    },
    {
      day: "Thursday",
      workouts: [
        {
          id: "workout-5",
          name: "Workout 5",
          exercises: [
            { id: "exercise-10", name: "Push Press" },
            { id: "exercise-11", name: "Plank" },
          ],
        },
        {
          id: "workout-6",
          name: "Workout 6",
          exercises: [
            { id: "exercise-12", name: "Box Jumps" },
            { id: "exercise-13", name: "Jumping Jacks" },
          ],
        },
      ],
    },
    {
      day: "Friday",
      workouts: [
        {
          id: "workout-7",
          name: "Workout 7",
          exercises: [
            { id: "exercise-14", name: "Overhead Squats" },
            { id: "exercise-15", name: "Lateral Raises" },
          ],
        },
      ],
    },
    {
      day: "Saturday",
      workouts: [
        {
          id: "workout-8",
          name: "Workout 8",
          exercises: [
            { id: "exercise-16", name: "Kettlebell Swings" },
            { id: "exercise-17", name: "Russian Twists" },
          ],
        },
      ],
    },
    {
      day: "Sunday",
      workouts: [
        {
          id: "workout-9",
          name: "Workout 9",
          exercises: [
            { id: "exercise-18", name: "Chin Ups" },
            { id: "exercise-19", name: "Dips" },
          ],
        },
      ],
    },
  ];

  // Add dates to the workout schedule
  const workoutSchedule = baseWorkouts.map((daySchedule, index) => {
    const currentDate = new Date(monday);
    currentDate.setDate(monday.getDate() + index);

    return {
      ...daySchedule,
      date: currentDate.toISOString().split("T")[0], // Format: YYYY-MM-DD
      isToday: currentDate.toDateString() === today.toDateString(),
    };
  });

  return workoutSchedule;
};

// Example usage:
export const exampleData = generateWorkoutSchedule();
