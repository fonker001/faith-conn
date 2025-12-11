import {
  Users,
  Heart,
  BookOpen,
  Music,
  Baby,
  GraduationCap,
  Handshake,
  Calendar,
  MapPin,
} from "lucide-react";

export const processCards = [
  {
    image: "https://images.pexels.com/photos/6860473/pexels-photo-6860473.jpeg",
    alt: "Outstation -Parish fellowship gathering for event",
    category: "Outstation",
    title: "Join your outstation community",
    description: "Connect with your local branch and fellow parishioners",
    buttonLabel: "Explore",
  },
  {
    image: "https://images.pexels.com/photos/5237657/pexels-photo-5237657.jpeg",
    alt: "Updates - Person receiving notification on device",
    category: "Updates",
    title: "Stay informed",
    description: "Receive instant parish and outstation announcements",
    buttonLabel: "View",
  },
  {
    image: "https://images.pexels.com/photos/2574619/pexels-photo-2574619.jpeg",
    alt: "Grow - Person engaging in spiritual activity",
    category: "Grow",
    title: "Track your spiritual journey",
    description: "Monitor catechism lessons and sacrament progress",
    buttonLabel: "Start now",
  },
  {
    image:
      "https://images.pexels.com/photos/25457345/pexels-photo-25457345.jpeg",
    alt: "Serve - Person volunteering in church service",
    category: "Serve",
    title: "Get involved",
    description: "Join the ministry and spread the gospel",
    buttonLabel: "Join",
  },
];

export const testimonials = [
  {
    name: "John Doe",
    role: "Parishioner",
    text: "This community has been a blessing to my family. The welcoming atmosphere and spiritual guidance have helped us grow in faith.",
  },
  {
    name: "Jane Smith",
    role: "Youth Leader",
    text: "The youth programs are exceptional. Our children are learning valuable lessons about faith, community, and compassion.",
  },
  {
    name: "Michael Brown",
    role: "Member since 2010",
    text: "I've found a true home here. The support during difficult times and the joy shared during celebrations is unmatched.",
  },
  {
    name: "Sarah Johnson",
    role: "Volunteer",
    text: "Being part of this parish has enriched my life. The outreach programs allow us to make a real difference in our community.",
  },
  {
    name: "David Wilson",
    role: "Choir Member",
    text: "The spiritual nourishment and fellowship I receive here are extraordinary. This is more than a church; it's a family.",
  },
];

export const leadership = [
  {
    name: "Fr. John Smith",
    position: "Senior Pastor",
    description:
      "Leading our congregation with wisdom and compassion for over 15 years.",
    image: "👨‍⚖️",
  },
  {
    name: "Fr. Johnson",
    position: "Associate Pastor",
    description: "Dedicated to youth ministry and community outreach programs.",
    image: "👩‍⚖️",
  },
  {
    name: "Deacon Michael Brown",
    position: "Deacon",
    description:
      "Serving the community through charitable works and spiritual guidance.",
    image: "👨‍💼",
  },
  {
    name: "Sister Mary Grace",
    position: "Director of Education",
    description: "Overseeing Sunday School and faith formation programs.",
    image: "👩‍🏫",
  },
];

export const parishes = [
  {
    name: "St. Andrew",
    location: "Downtown District",
    established: "1895",
    services: "Sunday: 7:00 AM, 9:00 AM, 11:00 AM, 5:00 PM",
  },
  {
    name: "St Charles",
    location: "Eastside Community",
    established: "1923",
    services: "Sunday: 8:00 AM, 10:30 AM",
  },
  {
    name: "St Francis",
    location: "Westbrook Area",
    established: "1967",
    services: "Sunday: 9:00 AM, 11:00 AM, 6:00 PM",
  },
  {
    name: "St Gabriel",
    location: "Northridge",
    established: "2005",
    services: "Sunday: 10:00 AM, 12:00 PM",
  },
  {
    name: "St Monica",
    location: "Northridge",
    established: "2005",
    services: "Sunday: 10:00 AM, 12:00 PM",
  },
];

export const moreInfo = [
  {
    title: "Our Mission",
    content:
      "To spread the love of Christ through worship, fellowship, and service to our community and beyond.",
  },
  {
    title: "Core Values",
    content:
      "Faith, Hope, Love, Community, Service, and Spiritual Growth guide everything we do.",
  },
  {
    title: "Weekly Services",
    content:
      "Join us for Sunday worship, Wednesday Bible study, Friday youth group, and special seasonal services.",
  },
  {
    title: "Get Involved",
    content:
      "We offer numerous ministries including music, education, outreach, youth programs, and prayer groups.",
  },
];

export const groups = [
  {
    name: "Young Adults Fellowship",
    description:
      "A vibrant community for adults aged 18-35 to grow in faith together through Bible study, social activities, and service projects.",
    schedule: "Fridays, 7:00 PM",
    location: "Youth Center",
    leader: "Pastor Sarah",
    icon: Users,
    members: "45+",
  },
  {
    name: "Women's Bible Study",
    description:
      "Join us for deep discussions, prayer, and fellowship as we study Scripture together and support one another in our faith journeys.",
    schedule: "Wednesdays, 10:00 AM",
    location: "Fellowship Hall",
    leader: "Sister Mary",
    icon: BookOpen,
    members: "30+",
  },
  {
    name: "Men's Prayer Breakfast",
    description:
      "Start your week strong with fellowship, prayer, and encouragement from brothers in Christ over a hearty breakfast.",
    schedule: "Saturdays, 8:00 AM",
    location: "Community Kitchen",
    leader: "Deacon Michael",
    icon: Heart,
    members: "25+",
  },
  {
    name: "Senior Saints",
    description:
      "A welcoming group for our seasoned members to share wisdom, enjoy fellowship, and participate in meaningful activities together.",
    schedule: "Tuesdays, 2:00 PM",
    location: "Senior Center",
    leader: "Elder Ruth",
    icon: Users,
    members: "50+",
  },
  {
    name: "Youth Group (Ages 13-17)",
    description:
      "High-energy gatherings for teens featuring games, worship, Bible teaching, and opportunities to build lasting friendships.",
    schedule: "Thursdays, 6:30 PM",
    location: "Youth Building",
    leader: "Pastor David",
    icon: GraduationCap,
    members: "60+",
  },
  {
    name: "Couples Ministry",
    description:
      "Strengthen your marriage through Biblical teaching, relationship workshops, and fellowship with other couples.",
    schedule: "2nd & 4th Saturdays, 6:00 PM",
    location: "Conference Room",
    leader: "Pastor John & Lisa",
    icon: Heart,
    members: "20+",
  },
];

export const programs = [
  {
    name: "Worship & Music Ministry",
    description:
      "Join our choir, praise team, or instrumental ensemble to lead the congregation in worship through music.",
    opportunities: [
      "Sunday Choir",
      "Praise Band",
      "Children's Choir",
      "Orchestra",
    ],
    icon: Music,
    contact: "worship@church.org",
  },
  {
    name: "Children's Ministry",
    description:
      "Nurturing young hearts with age-appropriate teaching, activities, and programs from nursery through elementary school.",
    opportunities: [
      "Sunday School",
      "Kids Club",
      "Vacation Bible School",
      "Parent Resources",
    ],
    icon: Baby,
    contact: "kids@church.org",
  },
  {
    name: "Community Outreach",
    description:
      "Serving our neighbors through food drives, homeless ministry, prison ministry, and community service projects.",
    opportunities: [
      "Food Bank",
      "Homeless Shelter",
      "Prison Ministry",
      "Community Service",
    ],
    icon: Handshake,
    contact: "outreach@church.org",
  },
  {
    name: "Education & Discipleship",
    description:
      "Growing deeper in faith through classes, seminars, and mentorship opportunities for all ages.",
    opportunities: [
      "Adult Education",
      "New Believers Class",
      "Confirmation",
      "Mentorship Program",
    ],
    icon: BookOpen,
    contact: "education@church.org",
  },
  {
    name: "Prayer Ministry",
    description:
      "Committed intercessors available for prayer requests and regular prayer gatherings throughout the week.",
    opportunities: [
      "Prayer Chain",
      "Prayer Meetings",
      "Healing Prayer",
      "Prayer Partners",
    ],
    icon: Heart,
    contact: "prayer@church.org",
  },
  {
    name: "Missions & Evangelism",
    description:
      "Spreading the Gospel locally and globally through mission trips, evangelism training, and partner support.",
    opportunities: [
      "Mission Trips",
      "Evangelism Training",
      "Missionary Support",
      "Global Partners",
    ],
    icon: Users,
    contact: "missions@church.org",
  },
];

const all = [
  // EVENTS (6)
  {
    id: 1,
    category: "events",
    title: "Fall Harvest Festival",
    date: "2025-10-15",
    time: "2:00 PM - 6:00 PM",
    location: "Church Grounds",
    description:
      "Join us for games, food, live music, and a pumpkin patch. All ages welcome!",
    icon: Calendar,
  },
  {
    id: 2,
    category: "events",
    title: "Men's Retreat",
    date: "2025-10-20",
    time: "Friday Evening - Sunday Afternoon",
    location: "Mountain View Retreat Center",
    description:
      "Three days of fellowship, teaching, worship, and outdoor activities designed to refresh and strengthen men in their faith.",
    icon: Calendar,
  },
  {
    id: 3,
    category: "events",
    title: "Women's Conference",
    date: "2025-11-05",
    time: "9:00 AM - 4:00 PM",
    location: "Main Sanctuary",
    description:
      "A powerful day of worship, teaching, and fellowship with keynote speaker Dr. Grace Williams.",
    icon: Calendar,
  },
  {
    id: 4,
    category: "events",
    title: "Youth Mission Trip",
    date: "2025-12-10",
    time: "Week-long Trip",
    location: "Guatemala",
    description:
      "Life-changing service opportunity for teens to serve communities and grow in faith. Registration required.",
    icon: Calendar,
  },
  {
    id: 5,
    category: "events",
    title: "Christmas Cantata",
    date: "2025-12-18",
    time: "6:00 PM",
    location: "Main Sanctuary",
    description:
      "Our annual Christmas musical celebration featuring the choir, orchestra, and special performances.",
    icon: Calendar,
  },
  {
    id: 6,
    category: "events",
    title: "New Year Prayer Service",
    date: "2025-12-31",
    time: "10:00 PM - 12:30 AM",
    location: "Main Sanctuary",
    description:
      "Ring in the new year with worship, prayer, and communion as we seek God's blessing for the year ahead.",
    icon: Calendar,
  },

  // MINISTRY (6)
  {
    id: 7,
    category: "ministry",
    title: "Youth Group Meeting",
    date: "2025-10-03",
    time: "6:00 PM",
    location: "Youth Center",
    description:
      "A night of worship, games, and Bible study for teens ages 13–18.",
    icon: Users,
  },
  {
    id: 8,
    category: "ministry",
    title: "Women's Bible Study",
    date: "2025-10-06",
    time: "10:00 AM",
    location: "Fellowship Hall",
    description: "Coffee, fellowship, and a deep dive into the Book of Ruth.",
    icon: Users,
  },
  {
    id: 9,
    category: "ministry",
    title: "Men's Fellowship Breakfast",
    date: "2025-11-02",
    time: "8:00 AM",
    location: "Church Café",
    description:
      "A monthly breakfast for men to connect, encourage one another, and grow in faith.",
    icon: Users,
  },
  {
    id: 10,
    category: "ministry",
    title: "Children’s Sunday School",
    date: "2025-10-12",
    time: "10:00 AM",
    location: "Education Wing",
    description:
      "Biblical lessons and fun activities tailored for children ages 5–12 during service.",
    icon: Users,
  },
  {
    id: 11,
    category: "ministry",
    title: "Choir Rehearsal",
    date: "2025-10-09",
    time: "7:00 PM",
    location: "Sanctuary",
    description:
      "Weekly rehearsal for choir members. Open to anyone interested in joining the music ministry.",
    icon: Users,
  },
  {
    id: 12,
    category: "ministry",
    title: "Prayer Team Gathering",
    date: "2025-10-16",
    time: "7:00 PM",
    location: "Prayer Room",
    description:
      "Dedicated time for prayer ministry members to intercede for the church and community.",
    icon: Users,
  },

  // OUTREACH (6)
  {
    id: 13,
    category: "outreach",
    title: "Community Food Drive",
    date: "2025-10-10",
    time: "10:00 AM - 2:00 PM",
    location: "Church Parking Lot",
    description:
      "Donate non-perishable food items or volunteer to help serve families in need.",
    icon: Heart,
  },
  {
    id: 14,
    category: "outreach",
    title: "Missions Conference",
    date: "2025-10-15",
    time: "All Day",
    location: "Main Sanctuary",
    description:
      "Global missions event featuring guest missionaries from around the world.",
    icon: MapPin,
  },
  {
    id: 15,
    category: "outreach",
    title: "Clothing Giveaway",
    date: "2025-11-12",
    time: "9:00 AM - 1:00 PM",
    location: "Fellowship Hall",
    description:
      "Providing free clothing to families in need. Donations accepted through November 10.",
    icon: Heart,
  },
  {
    id: 16,
    category: "outreach",
    title: "Neighborhood Clean-Up",
    date: "2025-11-22",
    time: "8:00 AM - 12:00 PM",
    location: "Meet at Church Parking Lot",
    description:
      "Join us as we bless our community by cleaning local parks and streets.",
    icon: Heart,
  },
  {
    id: 17,
    category: "outreach",
    title: "Thanksgiving Meal Service",
    date: "2025-11-27",
    time: "12:00 PM - 3:00 PM",
    location: "Church Dining Hall",
    description:
      "Serving a warm meal to those in need this Thanksgiving Day. Volunteers welcome.",
    icon: Heart,
  },
  {
    id: 18,
    category: "outreach",
    title: "Christmas Toy Drive",
    date: "2025-12-12",
    time: "All Day",
    location: "Church Lobby",
    description:
      "Bring joy to children by donating new, unwrapped toys for local families.",
    icon: Heart,
  },
];

export const announcements = {
  all,
  events: all.filter((a) => a.category === "events"),
  ministry: all.filter((a) => a.category === "ministry"),
  outreach: all.filter((a) => a.category === "outreach"),
};
