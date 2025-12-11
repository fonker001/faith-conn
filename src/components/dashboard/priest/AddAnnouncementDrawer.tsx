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
import { Megaphone } from "lucide-react";

interface AddAnnouncementDrawerProps {
  triggerAsChild?: boolean;
  children?: React.ReactNode;
}

export function AddAnnouncementDrawer({
  triggerAsChild = false,
  children,
}: AddAnnouncementDrawerProps) {
  return (
    <Drawer direction="right">
      {/* Drawer trigger */}
      <DrawerTrigger asChild={triggerAsChild}>
        {children ? (
          children
        ) : (
          <Button className="w-full px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 flex items-center gap-2 text-sm">
            <Megaphone size={14} /> Add Announcement
          </Button>
        )}
      </DrawerTrigger>

      {/* Drawer content */}
      <DrawerContent className="bg-white w-full max-w-md ml-auto">
        <DrawerHeader>
          <DrawerTitle>Add New Announcement</DrawerTitle>
          <DrawerDescription>
            Fill in the details below to publish a new parish announcement.
          </DrawerDescription>
        </DrawerHeader>

        <div className="p-4 space-y-4">
          {/* Title */}
          <div>
            <label className="text-sm font-medium text-slate-700">Title</label>
            <input
              type="text"
              className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Christmas Service Schedule"
            />
          </div>

          {/* Date */}
          <div>
            <label className="text-sm font-medium text-slate-700">Date</label>
            <input
              type="date"
              className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium text-slate-700">
              Description
            </label>
            <textarea
              rows={4}
              className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="e.g., Join us for our annual Christmas Eve mass celebration and charity drive..."
            />
          </div>

          {/* Optional: Category */}
          <div>
            <label className="text-sm font-medium text-slate-700">
              Category (optional)
            </label>
            <select
              className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              defaultValue=""
            >
              <option value="" disabled>
                Select a category
              </option>
              <option value="general">General</option>
              <option value="events">Events</option>
              <option value="community">Community</option>
              <option value="liturgical">Liturgical</option>
            </select>
          </div>
        </div>

        <DrawerFooter>
          <DrawerClose asChild>
            <Button className="bg-blue-600 text-white hover:bg-blue-700">
              Publish
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
