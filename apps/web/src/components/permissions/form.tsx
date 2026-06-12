"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

type Props = {
  onCreate: (
    permission: {
      type: string;
      limit: number;
      duration: number;
    },
  ) => void;
};

export function PermissionForm({
  onCreate,
}: Props) {
  const [
    type,
    setType,
  ] = useState("Market Trading");

  const [
    limit,
    setLimit,
  ] = useState("100");

  const [
    duration,
    setDuration,
  ] = useState("30");

  return (
    <div className="space-y-4">
      <div>
        <label
          className="
            mb-2 block
            text-sm font-medium
          "
        >
          Permission Type
        </label>

        <select
          value={type}
          onChange={(e) =>
            setType(e.target.value)
          }
          className="
            w-full rounded-xl
            border bg-background
            px-3 py-2
          "
        >
          <option>
            Market Trading
          </option>

          <option>
            Research Access
          </option>

          <option>
            Reward Claiming
          </option>
        </select>
      </div>

      <div>
        <label
          className="
            mb-2 block
            text-sm font-medium
          "
        >
          Daily Limit (USDC)
        </label>

        <input
          type="number"
          value={limit}
          min={1}
          onChange={(e) =>
            setLimit(e.target.value)
          }
          className="
            w-full rounded-xl
            border bg-background
            px-3 py-2
          "
        />
      </div>

      <div>
        <label
          className="
            mb-2 block
            text-sm font-medium
          "
        >
          Duration (Days)
        </label>

        <input
          type="number"
          min={1}
          value={duration}
          onChange={(e) =>
            setDuration(e.target.value)
          }
          className="
            w-full rounded-xl
            border bg-background
            px-3 py-2
          "
        />
      </div>

      <Button
        className="
          w-full
          bg-indigo-500
          hover:bg-indigo-600
        "
        onClick={() =>
          onCreate({
            type,
            limit: Number(limit),
            duration: Number(duration),
          })
        }
      >
        Create Permission
      </Button>
    </div>
  );
}