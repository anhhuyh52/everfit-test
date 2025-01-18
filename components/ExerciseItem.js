"use client";

import React from "react";

export const ExerciseItem = React.memo(({ exercise, index, provided }) => {
  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className="sortable-item p-2 border rounded-[3px] bg-gray-100 hover:bg-gray-200 cursor-pointer [&:not(:first-child)]:mt-1"
      style={{
        backgroundColor: "rgba(255, 255, 255, 1)",
        borderColor: "rgba(223, 223, 223, 1)",
        boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.1)",
        ...provided.draggableProps.style,
      }}
    >
      <div className="flex flex-col items-end">
        <div className="font-bold text-color-[rgba(0, 0, 0, 1)] text-right max-w-[120px] truncate">
          {exercise.name}
        </div>

        {exercise.sets && exercise.sets.length > 0 ? (
          <div className="flex items-center justify-between w-full">
            <div
              className="font-bold text-[10px] leading-[14px]"
              style={{ color: "rgba(145, 156, 173, 1)" }}
            >
              {exercise.sets.length}x
            </div>
            <div className="flex gap-1">
              {exercise.sets.map((set, setIndex) => (
                <div
                  key={setIndex}
                  className="flex items-center justify-between bg-white"
                >
                  <span
                    className="font-normal text-right text-[10px] leading-[14px]"
                    style={{ color: "rgba(149, 166, 183, 1)" }}
                  >
                    {set.weight} lb × {set.reps}
                    {setIndex !== exercise.sets.length - 1 && ", "}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-1 text-sm text-gray-500 text-right">
            No sets defined
          </div>
        )}
      </div>
    </div>
  );
});
