export type TabType =
  | "members"
  | "bookings"
  | "announcements"
  | "scheduling"
  | "analytics";

export type Level = "All" | "Beginner" | "Intermediate" | "Advanced" | "Youth";

export type Status = "low" | "medium" | "high";

export type UserRole = "member" | "catechist" | "leader" | "priest";

export interface ProgramResult {
  type: "program";
  data: {
    id: string;
    name: string;
    type: string;
  };
}

export interface StudentResult {
  type: "student";
  data: {
    id: string;
    name: string;
    parentNames: string[];
  };
}

export interface ResourceResult {
  type: "resource";
  data: {
    id: string;
    title: string;
    type: string;
  };
}

export type SearchResult = ProgramResult | StudentResult | ResourceResult;

export interface BaseBookingData {
  name: string;
  email: string;
  phone: string;
  notes?: string;
}

export interface CatechismBooking extends BaseBookingData {
  childName: string;
  childAge: number;
  sacrament: "Baptism" | "FirstCommunion" | "Confirmation" | "None";
  preferredDay: string;
}

export interface PriestAppointment {
  priest: string;
  service_type: "Confession" | "Counseling" | "Anointing" | "Other";
  location: string;
  date: string;
  time: string;
  notes?: string;
}

export interface EventBooking extends BaseBookingData {
  eventId: string;
  eventName: string;
  numberOfPeople: number;
}

export interface OtherBooking extends BaseBookingData {
  serviceType: string;
  requestedDate: string;
}

export interface LeftPanelProps {
  setActiveTab: React.Dispatch<React.SetStateAction<TabType>>;
}

export interface RightPanelProps {
  activeTab: TabType;
  setActiveTab: React.Dispatch<React.SetStateAction<TabType>>;
}

export interface MemberProfile {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  address: string;
  date_of_birth: string;
  role: string;
  outstation_name: string;
  groups_details: Groupsdetail[];
  groups_count: number;
}

interface Groupsdetail {
  id: string;
  name: string;
  description: string;
  group_type: Grouptype;
  meeting_schedule: string;
  outstation: number;
  outstation_name: string;
  created_at: string;
  available_roles: string[]; // Changed from any[]
}

interface Grouptype {
  id: string;
  name: string;
  description: string;
}

// For outstation members
export interface OutstationMember {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  role: string;
  outstation_name: string;
}

export interface OutstationMembersResponse {
  outstation: {
    id: number;
    name: string;
    location: string;
  };
  total_members: number;
  members: OutstationMember[];
}

// For system users
export interface SystemUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  role: string;
  outstation_name: string;
  [key: string]: string | number; // Changed from [key: string]: any
}

export interface SystemUsersResponse {
  summary: Record<string, unknown>; // Changed from any
  total_users: number;
  users: SystemUser[];
}

// For Outstation Priest
export interface OutstationMonthlyStats {
  year: number;
  month: number;
  month_name: string;
  total_bookings: number;
  approved_bookings: number;
  completed_services: number;
}

// For Parish Priest
export interface ParishPriestMonthlyStats {
  year: number;
  month: number;
  month_name: string;
  new_members: number;
  new_priests: number;
  new_catechists: number;
  total_bookings: number;
  approved_bookings: number;
}

// Union type for convenience
export type PriestMonthlyStats =
  | OutstationMonthlyStats
  | ParishPriestMonthlyStats;

export interface Booking {
  id: number;
  service_type: string;
  date: string;
  time: string;
  location: string;
  notes: string;
  status: "pending" | "approved" | "rejected";
  rejection_reason?: string;
  created_at: string;
  updated_at: string;
  user: number;
  priest: number;
}

// For ApiResponse generic type
export interface ApiResponse<T = Record<string, unknown>> {
  data: T;
  status: number;
  message?: string;
}