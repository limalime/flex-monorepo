"use client";

import { useState } from "react";

import { Shield } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { PermissionForm } from "./form";

type Props = {
  onCreate: (
    permission: {
      type: string;
      limit: number;
      duration: number;
    },
  ) => void;
}; 

export function CreatePermissionDialog({
  onCreate,
}: Props) {
  const [
    open,
    setOpen,
  ] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setOpen(true)}
      >
        <Shield className="mr-2 h-4 w-4" />
        Create Permission
      </Button>

      <Dialog
        open={open}
        onOpenChange={setOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Create Permission
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <PermissionForm
              onCreate={(permission) => {
                onCreate(permission);

                toast.success(
                  "Permission created",
                );

                setOpen(false);
              }}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}