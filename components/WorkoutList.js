"use client";

import React, { useEffect, useState } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { ExerciseList } from "./ExerciseList";
import PlusIcon from "@/assets/plusIcon";
import MoreIcon from "@/assets/moreIcon";

export const WorkoutList = ({ day, workouts, dayIndex }) => {
  return (
    <Droppable
      droppableId={`day-${dayIndex}-workouts`}
      direction="vertical"
      isDropDisabled={false}
      isCombineEnabled={false}
      ignoreContainerClipping={false}
    >
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="workout-container h-full px-2 rounded-md bg-[#F3F5F8] min-[178px] py-2"
        >
          <div className="flex justify-between items-center">
            <span className="text-[11px] font-semibold text-[#728096]">
              {new Date(day.date).getDate()}
            </span>
            <PlusIcon />
          </div>
          {workouts.map((workout, workoutIndex) => (
            <Draggable
              key={workout?.id}
              draggableId={workout?.id}
              index={workoutIndex}
            >
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className="sortable-item p-2 mb-2 border rounded-lg bg-gray-100 hover:bg-gray-200 cursor-pointer"
                  style={{
                    borderColor: "rgba(34, 36, 38, 0.15)",
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    ...provided.draggableProps.style, // Ensure the draggable style is correctly applied
                  }}
                >
                  <div className="flex justify-between items-center gap-[10px]">
                    <h3 className="text-[10px] font-bold text-[#5A57CB] uppercase truncate max-w-[130px]">
                      {workout.name}
                    </h3>
                    <MoreIcon />
                  </div>

                  {/* Exercise List goes here */}

                  <ExerciseList
                    exercises={workout.exercises}
                    dayIndex={dayIndex}
                    workoutIndex={workoutIndex}
                  />
                  <div className="flex justify-end items-center">
                    <PlusIcon />
                  </div>
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder} {/* Ensure placeholder for workouts */}
        </div>
      )}
    </Droppable>
  );
};
