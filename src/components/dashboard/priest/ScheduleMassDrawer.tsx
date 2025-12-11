import React from "react";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { CalendarDays } from "lucide-react";

interface ScheduleMassDrawerProps {
  triggerAsChild?: boolean;
  children?: React.ReactNode;
}

export function ScheduleMassDrawer({
  triggerAsChild = false,
  children,
}: ScheduleMassDrawerProps) {
  return (
    <>
      <Drawer direction="right">
        {/* Drawer trigger */}
        <DrawerTrigger asChild={triggerAsChild}>
          {children ? (
            children
          ) : (
            <Button className="w-full px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 flex items-center gap-2 text-sm">
              <CalendarDays size={14} /> Schedule Mass
            </Button>
          )}
        </DrawerTrigger>

        {/* Drawer content */}
        <DrawerContent className="bg-white">
          <DrawerHeader>
            <DrawerTitle>Schedule a New Mass</DrawerTitle>
            <DrawerDescription>
              Fill in the details below to schedule a mass.
            </DrawerDescription>
          </DrawerHeader>

          <div className="p-4 space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-700">
                Title
              </label>
              <input
                type="text"
                className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Sunday Morning Mass"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">
                Date & Time
              </label>
              <input
                type="datetime-local"
                className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">
                Location
              </label>
              <input
                type="text"
                className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Main Chapel"
              />
            </div>
          </div>

          <DrawerFooter>
            <DrawerClose asChild>
              <Button className="bg-blue-600 text-white hover:bg-blue-700">
                Save
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
