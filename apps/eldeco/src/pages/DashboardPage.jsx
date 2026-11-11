import  { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Scale } from "lucide-react";

import {
  LayoutGrid,
  Upload,
  Clock,
  TrendingUp,
  FileText,
  Bell,
  User,
  LogOut,
  History,
  Settings,
  HelpCircle,
  Eye,
  Download,
  Trash2,
  CheckCircle,
  AlertCircle,
  X,
} from "lucide-react";
import { useAuth } from "../firebase/useAuth";
import { logOut } from "../firebase/auth";
import { apiUrl } from "../lib/apiPath";
import { timeAgo, formatDuration, useActivity } from "../lib/activity";


const DashboardPage = () => {

 
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const notificationsRef = useRef(null);
  const profileMenuRef = useRef(null);

  // Real activity from the backend (uploads, statements, downloads, emails)
  const { data: activity, notifications, markAsRead, markAllAsRead, deleteNotification } = useActivity();

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setNotificationsOpen(false);
      }
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setProfileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;


  const handleLogout = async () => {
    const result = await logOut();
    if (result.success) {
      navigate("/");
    }
  };

  const st = activity?.stats;
  const analytics = [
    { title: "Total Documents Processed", value: st ? st.documentsProcessed.toLocaleString("en-IN") : "…", icon: <FileText className="w-6 h-6 text-blue-500" /> },
    { title: "Today's Files", value: st ? String(st.filesToday) : "…", icon: <Upload className="w-6 h-6 text-purple-500" /> },
    { title: "Avg Processing Time", value: !st ? "…" : st.avgProcessingMs == null ? "No runs yet" : formatDuration(st.avgProcessingMs), icon: <Clock className="w-6 h-6 text-green-500" /> },
    { title: "Success Rate", value: !st ? "…" : st.successRate == null ? "No runs yet" : `${st.successRate}%`, icon: <TrendingUp className="w-6 h-6 text-emerald-500" /> },
  ];

  const recentUploads = (activity?.uploads || []).map((e) => ({
    name: e.file || e.title,
    time: new Date(e.at).toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }),
    status: e.ok ? "Completed" : "Failed",
    detail: e.title,
  }));

  return (
    <div className="flex h-screen bg-gradient-to-br from-[#F8FAFC] via-blue-50/20 to-purple-50/20 font-sans">
      {/* ------------------ SIDEBAR ------------------ */}


      {/* ------------------ MAIN CONTENT ------------------ */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* ---------- TOP BAR ---------- */}
        <header className="flex items-center justify-between bg-[#FFFFFF]/80 backdrop-blur-xl px-6 lg:px-8 py-4 lg:py-5 shadow-premium border-b border-[#E5E7EB]/50">
          <h1 className="text-lg md:text-xl lg:text-2xl font-semibold text-[#0F172A] tracking-[-0.01em] leading-[1.3]">
            Hello {currentUser?.displayName || currentUser?.email?.split("@")[0] || "User"} 👋
          </h1>

          <div className="flex items-center space-x-4">
            {/* Notifications Dropdown */}
            <div className="relative" ref={notificationsRef}>
              <button 
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative text-gray-500 hover:text-gray-700 transition-colors"
              >
              <Bell className="w-6 h-6" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown Menu */}
              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-96 overflow-hidden flex flex-col">
                  {/* Header */}
                  <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between bg-gray-50">
                    <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllAsRead}
                        className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                      >
                        Mark all as read
                      </button>
                    )}
                  </div>

                  {/* Notifications List */}
                  <div className="overflow-y-auto max-h-80">
                    {notifications.length === 0 ? (
                      <div className="px-4 py-8 text-center text-gray-500 text-sm">
                        No notifications
                      </div>
                    ) : (
                      <div className="divide-y divide-gray-100">
                        {notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`px-4 py-3 hover:bg-gray-50 transition-colors ${
                              !notification.read ? 'bg-blue-50/50' : ''
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex items-start gap-3 flex-1">
                                <div className={`mt-0.5 ${
                                  notification.type === 'success' ? 'text-green-500' :
                                  notification.type === 'warning' ? 'text-yellow-500' :
                                  'text-blue-500'
                                }`}>
                                  {notification.type === 'success' ? (
                                    <CheckCircle className="w-5 h-5" />
                                  ) : notification.type === 'warning' ? (
                                    <AlertCircle className="w-5 h-5" />
                                  ) : (
                                    <Bell className="w-5 h-5" />
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2">
                                    <p className="text-sm font-medium text-gray-900">
                                      {notification.title}
                                    </p>
                                    {!notification.read && (
                                      <span className="h-2 w-2 bg-blue-500 rounded-full flex-shrink-0"></span>
                                    )}
                                  </div>
                                  <p className="text-xs text-gray-600 mt-1">
                                    {notification.message}
                                  </p>
                                  <p className="text-xs text-gray-400 mt-1">
                                    {timeAgo(notification.at)}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-1">
                                {!notification.read && (
                                  <button
                                    onClick={() => markAsRead(notification.id)}
                                    className="p-1 hover:bg-gray-200 rounded transition-colors"
                                    title="Mark as read"
                                  >
                                    <CheckCircle className="w-4 h-4 text-gray-400" />
                                  </button>
                                )}
                                <button
                                  onClick={() => deleteNotification(notification.id)}
                                  className="p-1 hover:bg-gray-200 rounded transition-colors"
                                  title="Delete"
                                >
                                  <X className="w-4 h-4 text-gray-400" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Footer */}
                  {notifications.length > 0 && (
                    <div className="px-4 py-2 border-t border-gray-200 bg-gray-50">
                      <button
                        onClick={() => navigate("/dashboard/history")}
                        className="text-xs text-blue-600 hover:text-blue-700 font-medium w-full text-center"
                      >
                        View all activity
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Profile Menu Dropdown */}
            <div className="relative" ref={profileMenuRef}>
              <button
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg cursor-pointer"
                title="Profile"
              >
                {currentUser?.photoURL ? (
                  <img
                    src={currentUser.photoURL}
                    alt="Profile"
                    className="w-9 h-9 rounded-full object-cover"
                  />
                ) : (
                  <span className="text-sm">
                    {currentUser?.displayName?.charAt(0)?.toUpperCase() || 
                     currentUser?.email?.charAt(0)?.toUpperCase() || 
                     'U'}
                  </span>
                )}
              </button>

              {/* Profile Dropdown Menu */}
              {profileMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                  <div className="py-2">
                    {/* User Info */}
                    <div className="px-4 py-3 border-b border-gray-200">
                      <p className="text-sm font-semibold text-gray-900">
                        {currentUser?.displayName || "User"}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {currentUser?.email}
                      </p>
                    </div>

                    {/* Menu Items */}
                    <button
                      onClick={() => {
                        navigate("/profile");
                        setProfileMenuOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors"
                    >
                      <User className="w-4 h-4" />
                      View Profile
                    </button>
                    <button
                      onClick={() => {
                        navigate("/dashboard/settings");
                        setProfileMenuOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors"
                    >
                      <Settings className="w-4 h-4" />
                      Settings
                    </button>
                    <div className="border-t border-gray-200 my-1"></div>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
            </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* ---------- DASHBOARD CONTENT ---------- */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6 lg:space-y-8">
            {/* ---- A. ANALYTICS CARDS ---- */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {analytics.map((card, i) => (
              <div
                key={i}
                className="group bg-[#FFFFFF] p-6 rounded-[14px] shadow-[0_1px_3px_rgba(0,0,0,0.08)] border border-[#E5E7EB]/60 hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:border-[#E5E7EB] hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    {card.icon}
                  </div>
                </div>
                <div>
                  <p className="text-[#475569] text-sm font-medium mb-2">{card.title}</p>
                  <h2 className="text-2xl md:text-3xl font-bold text-[#0F172A] tracking-[-0.01em] leading-[1.2]">
                    {card.value}
                  </h2>
                </div>
              </div>
            ))}
          </div>

            {/* ---- B. RECENT UPLOADS TABLE ---- */}
            <div className="bg-[#FFFFFF] rounded-[14px] shadow-[0_1px_3px_rgba(0,0,0,0.08)] border border-[#E5E7EB]/60 overflow-hidden">
              <div className="px-5 lg:px-6 py-4 lg:py-5 border-b border-[#E5E7EB] bg-gradient-to-r from-[#F8FAFC]/50 to-transparent">
                <h3 className="text-base lg:text-lg font-semibold text-[#0F172A] tracking-[-0.01em] leading-[1.3]">
                  Recent Uploads
                </h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="text-[#475569] bg-[#F8FAFC]/80 border-b border-[#E5E7EB]">
                      <th className="py-3 lg:py-4 px-4 lg:px-6 font-semibold text-xs uppercase tracking-wider">Document Name</th>
                      <th className="py-3 lg:py-4 px-4 lg:px-6 font-semibold text-xs uppercase tracking-wider">Upload Time</th>
                      <th className="py-3 lg:py-4 px-4 lg:px-6 font-semibold text-xs uppercase tracking-wider">Status</th>
                      {/* <th className="py-3 lg:py-4 px-4 lg:px-6 font-semibold text-xs uppercase tracking-wider">Actions</th> */}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E7EB]">
                    {activity && recentUploads.length === 0 && (
                      <tr><td colSpan={3} className="py-8 px-6 text-center text-[#64748B]">No uploads yet. Upload a trial balance to get started.</td></tr>
                    )}
                    {recentUploads.map((file, index) => (
                      <tr
                        key={index}
                        className="bg-[#FFFFFF] hover:bg-blue-50/30 transition-colors duration-150"
                      >
                        <td className="py-3 lg:py-4 px-4 lg:px-6 font-medium text-[#0F172A]">
                          {file.name}
                          <span className="block text-xs font-normal text-[#64748B]">{file.detail}</span>
                        </td>
                        <td className="py-3 lg:py-4 px-4 lg:px-6 text-[#475569]">{file.time}</td>
                        <td className="py-3 lg:py-4 px-4 lg:px-6">
                          <span
                            className={`inline-flex px-3 py-1.5 text-xs font-semibold rounded-full ${
                              file.status === "Completed"
                                ? "bg-green-50 text-green-700 border border-green-200"
                                : "bg-red-50 text-red-700 border border-red-200"
                            }`}
                          >
                            {file.status}
                          </span>
                        </td>
                        {/* <td className="py-3 lg:py-4 px-4 lg:px-6">
                          <div className="flex items-center space-x-2 lg:space-x-3">
                            <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200" title="View">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200" title="Download">
                              <Download className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200" title="Delete">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td> */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* ---- C. QUICK ACTIONS BAR ---- */}
            <div className="flex flex-wrap gap-3 lg:gap-4 justify-center lg:justify-end pt-2">
              <button 
                onClick={() => navigate("/dashboard/upload")}
                className="bg-gradient-to-r from-[#2563EB] to-[#7C3AED] hover:from-[#1d4ed8] hover:to-[#6d28d9] text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-[#2563EB]/30 hover:shadow-xl hover:shadow-[#2563EB]/40 transform hover:scale-[1.02] transition-all duration-300"
              >
                Upload Document
              </button>
              <button onClick={() => navigate("/dashboard/history")} className="border-2 border-[#E5E7EB] hover:border-[#E5E7EB] text-[#475569] px-6 py-3 rounded-xl font-semibold hover:bg-[#F8FAFC] transition-all duration-200 shadow-sm hover:shadow-md">
                View All Documents
              </button>
              <button onClick={() => navigate("/dashboard/support")} className="border-2 border-blue-200 hover:border-blue-300 text-[#2563EB] px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-200 shadow-sm hover:shadow-md">
                Support
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// --- Sidebar Link Component ---
const SidebarLink = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`relative flex items-center w-full px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 text-left group ${
      active 
        ? "text-[#2563EB] bg-[#EFF6FF]/60" 
        : "text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC]"
    }`}
  >
    {/* Subtle active indicator */}
    {active && (
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#2563EB] rounded-r-full"></div>
    )}
    <span className={`flex-shrink-0 mr-3 transition-colors duration-200 ${
      active ? 'text-[#2563EB]' : 'text-[#94A3B8] group-hover:text-[#475569]'
    }`}>
      {icon}
    </span>
    <span className="flex-1">{label}</span>
  </button>
);

export default DashboardPage;

