"use client";

import { useState } from "react";

export type Activity = {
  id: string;

  title: string;

  description: string;

  createdAt: number;
};

export function useActivities() {
  const [
    activities,
    setActivities,
  ] = useState<Activity[]>([]);

  function addActivity(
    title: string,
    description: string,
  ) {
    setActivities(
      (previous) => [
        {
          id:
            crypto.randomUUID(),

          title,

          description,

          createdAt:
            Date.now(),
        },

        ...previous,
      ],
    );
  }

  return {
    activities,
    addActivity,
  };
}