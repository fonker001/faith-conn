"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import { OutstationMember, SystemUser } from "@/types/types";

type Member = OutstationMember | SystemUser;

export const Columns: ColumnDef<Member>[] = [
  {
    accessorKey: "first_name",
    header: "First Name",
  },
  {
    accessorKey: "last_name",
    header: "Last Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone_number",
    header: "Phone Number",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "outstation_name",
    header: "Outstation",
  },
  {
    id: "actions",
    header: () => (
      <div className="flex items-center justify-end space-x-2">Actions</div>
    ),
    cell: ({ row }) => {
      const member = row.original;
      return (
        <div className="flex items-center justify-end space-x-2">
          <button
            type="button"
            className="text-blue-600 hover:text-blue-900 p-1"
            onClick={() =>
              console.log(`Viewing ${member.first_name} ${member.last_name}`)
            }
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      );
    },
  },
];
