import React, { useState } from "react";
import { DataTable } from "../table/DataTable";
import { Columns } from "../table/Columns";
import { ColumnFiltersState } from "@tanstack/react-table";
import Filters from "../table/Filters";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/store/authStore";
import { getOutstationMembers, getSystemUsers } from "@/actions/priest/priest";
import {
  OutstationMember,
  OutstationMembersResponse,
  SystemUser,
  SystemUsersResponse,
} from "@/types/types";

type MembersResponse = OutstationMembersResponse | SystemUsersResponse;
type Member = OutstationMember | SystemUser; 

export default function MembersSection() {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const { user } = useAuthStore.getState();
  const priestRoles = ["outstationPriest", "parishPriest"] as const;
  const role = priestRoles.includes(user?.role as (typeof priestRoles)[number])
    ? user?.role
    : null;

  // Fetch data based on role
  const { data, isLoading, isError } = useQuery<MembersResponse>({
    queryKey: ["parishOrOutstationMembers", role],
    queryFn: () => {
      if (role === "outstationPriest") return getOutstationMembers();
      if (role === "parishPriest") return getSystemUsers();
      throw new Error("Invalid role");
    },
    enabled: !!role,
  });

  // Extract members array
  const membersData: Member[] = (() => {
    if (!data || !role) return [];
    if (role === "outstationPriest" && "members" in data) return data.members;
    if (role === "parishPriest" && "users" in data) return data.users;
    return [];
  })();

  if (isLoading) return <p>Loading members...</p>;
  if (isError) return <p>Failed to load members.</p>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-slate-800">
          Parish Leaders
        </h2>
      </div>

      {/* Search and Filters */}
      <Filters
        columnFilters={columnFilters}
        setColumnFilters={setColumnFilters}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />

      <div className="overflow-hidden">
        <DataTable
          columns={Columns}
          data={membersData}
          columnFilters={columnFilters}
          setColumnFilters={setColumnFilters}
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
      </div>
    </div>
  );
}
