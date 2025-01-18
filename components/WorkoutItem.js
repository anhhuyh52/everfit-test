"use client";

import React from "react";
import { ExerciseList } from "./ExerciseList";
import PlusIcon from "@/assets/plusIcon";
import MoreIcon from "@/assets/moreIcon";

export const WorkoutItem = React.memo(
  ({ workout, workoutIndex, dayIndex, provided }) => {
    return (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        className="sortable-item p-2 border rounded-lg bg-gray-100 hover:bg-gray-200 cursor-pointer"
        style={{
          borderColor: "rgba(34, 36, 38, 0.15)",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          ...provided.draggableProps.style,
        }}
      >
        <div className="flex justify-between items-center gap-[10px]">
          <h3 className="text-[10px] font-bold text-[#5A57CB] uppercase truncate max-w-[130px]">
            {workout.name}
          </h3>
          <MoreIcon />
        </div>

        <ExerciseList
          exercises={workout.exercises}
          dayIndex={dayIndex}
          workoutIndex={workoutIndex}
        />

        <div className="flex justify-end items-center mt-1">
          <PlusIcon />
        </div>
      </div>
    );
  }
);
