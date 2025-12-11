'use client';

import { useState } from 'react';

type MemberStatus = 'active' | 'inactive' | 'pending';

interface ParishMember {
  id: string;
  name: string;
  group: string;
  status: MemberStatus;
  lastSeen: string;
}

const INITIAL_MEMBERS: ParishMember[] = [
  { id: "1", name: "John Smith", group: "Youth Group", status: "active", lastSeen: "2023-10-14" },
  { id: "2", name: "Mary Johnson", group: "Women Fellowship", status: "active", lastSeen: "2023-10-15" },
  { id: "3", name: "Robert Davis", group: "Men's Ministry", status: "inactive", lastSeen: "2023-09-30" },
  { id: "4", name: "Sarah Wilson", group: "Youth Group", status: "active", lastSeen: "2023-10-15" },
  { id: "5", name: "David Brown", group: "Finance Team", status: "active", lastSeen: "2023-10-12" },
  { id: "6", name: "Lisa Garcia", group: "Worship Team", status: "inactive", lastSeen: "2023-08-20" },
  { id: "7", name: "New Member", group: "Youth Group", status: "pending", lastSeen: "" },
];

const MEMBER_STATUS_CONFIG = {
  active: {
    label: 'Active',
    color: 'bg-emerald-100 text-emerald-800',
  },
  inactive: {
    label: 'Inactive',
    color: 'bg-gray-100 text-gray-800',
  },
  pending: {
    label: 'Pending',
    color: 'bg-yellow-100 text-yellow-800',
  },
};

export default function ManageMembersPage() {
  const [members, setMembers] = useState<ParishMember[]>(INITIAL_MEMBERS);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.group.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEditMember = (member: ParishMember) => {
    const newName = prompt('Edit member name', member.name);
    if (newName !== null && newName.trim() !== '') {
      setMembers(prev => prev.map(m => m.id === member.id ? { ...m, name: newName } : m));
    }
  };

  const handleDeleteMember = (id: string) => {
    if (window.confirm('Are you sure you want to remove this member?')) {
      setMembers(prev => prev.filter(member => member.id !== id));
    }
  };

  const handleApproveMember = (id: string) => {
    setMembers(prev =>
      prev.map(member =>
        member.id === id ? { ...member, status: 'active', lastSeen: new Date().toISOString().split('T')[0] } : member
      )
    );
  };

  const pendingRequests = members.filter(member => member.status === 'pending');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Manage Members</h1>
        <p className="text-gray-600 mt-1">
          View, approve, edit, or remove parish members and their group assignments
        </p>
      </div>

      {/* Pending Requests */}
      {pendingRequests.length > 0 && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
          <h2 className="font-medium text-yellow-800 mb-2">Pending Join Requests</h2>
          {pendingRequests.map(member => (
            <div key={member.id} className="flex justify-between items-center mb-2">
              <span>{member.name} ({member.group})</span>
              <button
                onClick={() => handleApproveMember(member.id)}
                className="px-3 py-1 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700"
              >
                Approve
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Search Bar */}
      <div className="relative w-full sm:w-64">
        <input
          type="text"
          placeholder="Search members or groups..."
          className="block w-full pl-3 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Members Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {filteredMembers.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No members found</h3>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Member</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Group/Ministry</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Seen</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredMembers.map(member => (
                  <tr key={member.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">{member.name}</td>
                    <td className="px-6 py-4">{member.group}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${MEMBER_STATUS_CONFIG[member.status].color}`}>
                        {MEMBER_STATUS_CONFIG[member.status].label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{member.lastSeen}</td>
                    <td className="px-6 py-4 text-right text-sm font-medium flex justify-end gap-2">
                      {member.status === 'pending' && (
                        <button onClick={() => handleApproveMember(member.id)} className="text-emerald-600 hover:text-emerald-900">Approve</button>
                      )}
                      <button onClick={() => handleEditMember(member)} className="text-blue-600 hover:text-blue-900">Edit</button>
                      <button onClick={() => handleDeleteMember(member.id)} className="text-rose-600 hover:text-rose-900">Remove</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
