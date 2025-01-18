"use client";
import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { WorkoutList } from "@/components/WorkoutList";
import { exampleData } from "@/data/workoutData";

export default function WorkoutCalendar() {
  const [data, setData] = useState(exampleData);

  const handleDragEnd = (result) => {
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
      newData[sourceDayIndex].workouts[sourceWorkoutIndex].exercises =
        exercises;
      setData(newData);
    } else if (
      source.droppableId.includes("exercises") &&
      destination.droppableId.includes("exercises") &&
      (sourceDayIndex !== destinationDayIndex ||
        sourceWorkoutIndex !== destinationWorkoutIndex)
    ) {
      const sourceWorkouts = [...data[sourceDayIndex].workouts];
      const destinationWorkouts = [...data[destinationDayIndex].workouts];

      const [movedExercise] = sourceWorkouts[
        sourceWorkoutIndex
      ].exercises.splice(source.index, 1);
      destinationWorkouts[destinationWorkoutIndex].exercises.splice(
        destination.index,
        0,
        movedExercise
      );

      const newData = [...data];
      newData[sourceDayIndex].workouts = sourceWorkouts;
      newData[destinationDayIndex].workouts = destinationWorkouts;
      setData(newData);
    } else if (
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
    } else if (sourceDayIndex !== destinationDayIndex) {
      const sourceWorkouts = Array.from(data[sourceDayIndex].workouts);
      const destinationWorkouts = Array.from(
        data[destinationDayIndex].workouts
      );

      const [movedWorkout] = sourceWorkouts.splice(source.index, 1);
      destinationWorkouts.splice(destination.index, 0, movedWorkout);

      const newData = [...data];
      newData[sourceDayIndex].workouts = sourceWorkouts;
      newData[destinationDayIndex].workouts = destinationWorkouts;
      setData(newData);
    }
  };

  return (
    <div className="py-[60px] px-16 h-full">
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex flex-wrap gap-4 h-full">
          {data.map((day, dayIndex) => (
            <div key={day.day} className="day-container flex-1">
              <h2 className="text-xs font-semibold leading-[13.62px] text-left text-[#6A7988] uppercase mb-[9px]">
                {day.day.substring(0, 3)}
              </h2>
              <WorkoutList
                day={day}
                workouts={day.workouts}
                dayIndex={dayIndex}
              />
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}
