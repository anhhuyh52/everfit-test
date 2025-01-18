const handleDragEnd = (result, data, setData) => {
  const { source, destination } = result;
  if (!destination) return;

  const sourceDayIndex = parseInt(source.droppableId.split("-")[1], 10);
  const sourceWorkoutIndex = parseInt(source.droppableId.split("-")[3], 10);
  const destinationDayIndex = parseInt(
    destination.droppableId.split("-")[1],
    10
  );
  const destinationWorkoutIndex = parseInt(
    destination.droppableId.split("-")[3],
    10
  );

  // Case 1: Moving exercises within the same workout
  if (
    source.droppableId.includes("exercises") &&
    destination.droppableId.includes("exercises") &&
    sourceDayIndex === destinationDayIndex &&
    sourceWorkoutIndex === destinationWorkoutIndex
  ) {
    const exercises = Array.from(
      data[sourceDayIndex].workouts[sourceWorkoutIndex].exercises
    );
    const [movedExercise] = exercises.splice(source.index, 1);
    exercises.splice(destination.index, 0, movedExercise);

    const newData = [...data];
    newData[sourceDayIndex].workouts[sourceWorkoutIndex].exercises = exercises;
    setData(newData);
  }

  // Case 2: Moving exercises between different workouts (even across days)
  else if (
    source.droppableId.includes("exercises") &&
    destination.droppableId.includes("exercises") &&
    (sourceDayIndex !== destinationDayIndex ||
      sourceWorkoutIndex !== destinationWorkoutIndex)
  ) {
    const sourceWorkouts = [...data[sourceDayIndex].workouts];
    const destinationWorkouts = [...data[destinationDayIndex].workouts];

    const [movedExercise] = sourceWorkouts[sourceWorkoutIndex].exercises.splice(
      source.index,
      1
    );
    destinationWorkouts[destinationWorkoutIndex].exercises.splice(
      destination.index,
      0,
      movedExercise
    );

    const newData = [...data];
    newData[sourceDayIndex].workouts = sourceWorkouts;
    newData[destinationDayIndex].workouts = destinationWorkouts;
    setData(newData);
  }

  // Case 3: Moving workouts within the same day
  else if (
    source.droppableId.includes("workouts") &&
    destination.droppableId.includes("workouts") &&
    sourceDayIndex === destinationDayIndex
  ) {
    const workouts = Array.from(data[sourceDayIndex].workouts);
    const [movedWorkout] = workouts.splice(source.index, 1);
    workouts.splice(destination.index, 0, movedWorkout);

    const newData = [...data];
    newData[sourceDayIndex].workouts = workouts;
    setData(newData);
  }

  // Case 4: Moving workouts between days
  else if (sourceDayIndex !== destinationDayIndex) {
    const sourceWorkouts = Array.from(data[sourceDayIndex].workouts);
    const destinationWorkouts = Array.from(data[destinationDayIndex].workouts);

    const [movedWorkout] = sourceWorkouts.splice(source.index, 1);
    destinationWorkouts.splice(destination.index, 0, movedWorkout);

    const newData = [...data];
    newData[sourceDayIndex].workouts = sourceWorkouts;
    newData[destinationDayIndex].workouts = destinationWorkouts;
    setData(newData);
  }
};

export default handleDragEnd;
