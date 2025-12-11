// src/app/(dashboard)/leaders/page.tsx
import Link from 'next/link';

interface DashboardStat {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  description: string;
}

interface QuickAction {
  name: string;
  href: string;
  icon: string;
  color: string;
}

export default function ParishLeadersDashboard() {
  const dashboardStats: DashboardStat[] = [
    {
      title: 'Total Members',
      value: '142',
      change: '+5%',
      trend: 'up',
      description: 'Active parish members'
    },
    {
      title: 'Avg. Attendance',
      value: '87%',
      change: '+3%',
      trend: 'up',
      description: 'Last 4 weeks average'
    },
    {
      title: 'Active Groups',
      value: '8',
      change: '+1',
      trend: 'up',
      description: 'Ministries and fellowships'
    }
  ];

  const quickActions: QuickAction[] = [
    {
      name: 'Manage Members',
      href: '/leaders/members',
      icon: '👥',
      color: 'bg-emerald-600 hover:bg-emerald-700'
    },
    {
      name: 'Record Attendance',
      href: '/leaders/attendance',
      icon: '📋',
      color: 'bg-green-600 hover:bg-green-700'
    },
    {
      name: 'Post Announcement',
      href: '/leaders/announcements',
      icon: '📢',
      color: 'bg-amber-600 hover:bg-amber-700'
    },
    {
      name: 'Add Minutes',
      href: '/leaders/minutes',
      icon: '📝',
      color: 'bg-indigo-600 hover:bg-indigo-700'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Parish Leaders Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Overview of your parish community and quick access to essential tools
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {dashboardStats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-3xl font-bold mt-1 text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
              </div>
              <div className={`flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                stat.trend === 'up' 
                  ? 'bg-emerald-100 text-emerald-800' 
                  : stat.trend === 'down'
                  ? 'bg-rose-100 text-rose-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {stat.trend === 'up' && '↑'}
                {stat.trend === 'down' && '↓'}
                {stat.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              href={action.href}
              className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-white font-medium transition-all hover:scale-[1.02] ${action.color}`}
            >
              <span className="text-lg">{action.icon}</span>
              <span>{action.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {[
            { id: 1, action: 'New member joined', target: 'Youth Group', time: '2 hours ago', user: 'John Smith' },
            { id: 2, action: 'Attendance recorded for', target: 'Oct 15, 2023', time: '1 day ago', user: 'Sarah Wilson' },
            { id: 3, action: 'Posted announcement:', target: 'Harvest Festival', time: '2 days ago', user: 'Admin' }
          ].map((activity) => (
            <div key={activity.id} className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <div className="min-w-0">
                <p className="text-sm text-gray-900">
                  <span className="font-medium">{activity.user}</span> {activity.action}{' '}
                  <span className="font-medium text-gray-700">{activity.target}</span>
                </p>
                <p className="text-xs text-gray-500 mt-0.5">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Roadmap */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-5">
        <div className="flex items-start gap-3">
          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
          <div>
            <h3 className="font-medium text-blue-900">Coming Soon in v2</h3>
            <p className="text-blue-700 text-sm mt-1">
              Group management, member requests, group-based attendance reports, and mobile app integration.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}