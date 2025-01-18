"use client";
import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { ExerciseItem } from "./ExerciseItem";

export const ExerciseList = ({ exercises, dayIndex, workoutIndex }) => {
  return (
    <Droppable
      droppableId={`day-${dayIndex}-workout-${workoutIndex}-exercises`}
      type="exercises"
      direction="vertical"
      isDropDisabled={false}
      isCombineEnabled={false}
      ignoreContainerClipping={false}
    >
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="exercise-container"
        >
          {exercises.map((exercise, index) => (
            <Draggable
              key={exercise.id}
              draggableId={exercise.id}
              index={index}
            >
              {(provided) => (
                <ExerciseItem
                  exercise={exercise}
                  index={index}
                  provided={provided}
                />
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default ExerciseList;
