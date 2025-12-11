// // src/app/(dashboard)/leaders/data.ts

// // ✅ Mock Data (replace with API calls later)

// export async function getAllGroups() {
//   return [
//     { id: 1, name: "Youth Ministry", members: 25, leader: "John Doe" },
//     { id: 2, name: "Worship Team", members: 15, leader: "Sarah Kim" },
//     { id: 3, name: "Sunday School", members: 30, leader: "Michael Brown" },
//     { id: 4, name: "Outreach Team", members: 10, leader: "Grace Wanjiru" },
//   ];
// }

// export async function getMembers() {
//   return [
//     { id: 1, name: "Alice Mwangi", group: "Youth Ministry" },
//     { id: 2, name: "Brian Otieno", group: "Worship Team" },
//     { id: 3, name: "Carol Njeri", group: "Sunday School" },
//     { id: 4, name: "David Kibet", group: "Outreach Team" },
//   ];
// }

// export async function getAttendanceRecords() {
//   return [
//     { id: 1, date: "2025-10-01", group: "Youth Ministry", attendance: 42 },
//     { id: 2, date: "2025-10-02", group: "Worship Team", attendance: 28 },
//     { id: 3, date: "2025-10-03", group: "Sunday School", attendance: 35 },
//     { id: 4, date: "2025-10-04", group: "Outreach Team", attendance: 18 },
//   ];
// }

// export async function getLatestAnnouncement() {
//   return {
//     id: 1,
//     title: "Leaders Meeting on Sunday",
//     message:
//       "All ministry leaders are requested to attend a leadership review meeting this Sunday at 2 PM in the main hall.",
//     date: "2025-10-10",
//     postedBy: "Admin",
//   };
// }

// // ✅ Extra mocks for pages that use undefined functions
// export async function getActiveMembersForAttendance() {
//   return [
//     { id: 1, name: "John Doe", group: "Youth Ministry" },
//     { id: 2, name: "Sarah Kim", group: "Worship Team" },
//   ];
// }

// export async function saveAttendance(data: any) {
//   console.log("Attendance saved:", data);
//   return { success: true };
// }

// export async function getGroup(id: string) {
//   return { id, name: "Youth Ministry", leader: "John Doe" };
// }

// export async function addMemberToGroup(groupId: number, member: any) {
//   console.log("Member added:", member, "to group", groupId);
//   return { success: true };
// }

// export async function removeMember(memberId: number) {
//   console.log("Removed member:", memberId);
//   return { success: true };
// }

// export async function getAllMinutes() {
//   return [
//     {
//       id: 1,
//       title: "Leadership Review",
//       content: "Discussed progress on church outreach and youth programs.",
//       date: "2025-10-01",
//     },
//   ];
// }

// export async function createMinutes(data: any) {
//   console.log("Created minutes:", data);
//   return { success: true };
// }
