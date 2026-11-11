import React from "react";
import logo from "../../assets/logo.png"
import {
  LayoutGrid,
  Upload,
  Clock,
  TrendingUp,
  CheckCircle,
  Bell,
  User,
  LogOut,
  FileText,
  History,
  Settings,
  HelpCircle,
  Eye,
  Download,
  Trash2,
} from "lucide-react";

const Dashboard = () => {
  const analytics = [
    {
      title: "Total Documents Processed",
      value: "1,248",
      icon: <FileText className="w-6 h-6 text-blue-500" />,
    },
    {
      title: "Today’s Files",
      value: "26",
      icon: <Upload className="w-6 h-6 text-purple-500" />,
    },
    {
      title: "Avg Processing Time",
      value: "3.4s",
      icon: <Clock className="w-6 h-6 text-green-500" />,
    },
    {
      title: "Success Rate",
      value: "98.7%",
      icon: <TrendingUp className="w-6 h-6 text-emerald-500" />,
    },
  ];

  const recentUploads = [
    {
      name: "BankStatement_Jan2025.pdf",
      time: "10:24 AM",
      status: "Completed",
    },
    {
      name: "GSTR-3B_Report.xlsx",
      time: "09:10 AM",
      status: "Processing",
    },
    {
      name: "VendorInvoice_1023.pdf",
      time: "Yesterday",
      status: "Completed",
    },
    {
      name: "Payroll_Q4_2024.xls",
      time: "2 days ago",
      status: "Completed",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      {/* ------------------ SIDEBAR ------------------ */}
      <aside className="w-[230px] bg-white border-r border-gray-200 flex flex-col justify-between">
        <div>
          <div className="flex items-center px-6 py-5 border-b">
            <div className="w-16 h-16 rounded-md flex items-center justify-center">
             <img src={logo} alt="" />
            </div>
            <span className="text-xl font-bold text-gray-800 ml-2">FinSight</span>
          </div>

          <nav className="mt-6 space-y-1">
            <SidebarLink icon={<LayoutGrid />} label="Dashboard" active />
            <SidebarLink icon={<Upload />} label="Sales MIS" />
            <SidebarLink icon={<History />} label="Processed Documents" />
            <SidebarLink icon={<HelpCircle />} label="Support" />
            <SidebarLink icon={<Settings />} label="Settings" />
          </nav>
        </div>

        <div className="p-4 border-t">
          <button className="flex items-center text-gray-600 hover:text-red-500 transition">
            <LogOut className="w-5 h-5 mr-2" />
            Logout
          </button>
        </div>
      </aside>

      {/* ------------------ MAIN CONTENT ------------------ */}
      <main className="flex-1 flex flex-col">
        {/* ---------- TOP BAR ---------- */}
        <header className="flex items-center justify-between bg-white px-6 py-4 shadow-sm border-b">
          <h1 className="text-xl font-semibold text-gray-800">
            {/* Hello Vidhi 👋 */}
          </h1>

          <div className="flex items-center space-x-4">
            <button className="relative text-gray-500 hover:text-gray-700">
              <Bell className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center">
              <User className="text-gray-600 w-5 h-5" />
            </div>
          </div>
        </header>

        {/* ---------- DASHBOARD CONTENT ---------- */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* ---- A. ANALYTICS CARDS ---- */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {analytics.map((card, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-[14px] shadow-[0_1px_3px_rgba(0,0,0,0.08)] border border-[#E5E7EB]/60 hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:border-[#E5E7EB] hover:-translate-y-1 transition-all duration-300 flex items-center justify-between w-[250px] h-[120px]"
              >
                <div>
                  <p className="text-gray-500 text-sm">{card.title}</p>
                  <h2 className="text-2xl font-bold text-gray-800 mt-2">
                    {card.value}
                  </h2>
                </div>
                <div className="bg-gray-50 p-3 rounded-full">{card.icon}</div>
              </div>
            ))}
          </div>

          {/* ---- B. RECENT UPLOADS TABLE ---- */}
          <div className="bg-white p-6 rounded-[14px] shadow-[0_1px_3px_rgba(0,0,0,0.08)] border border-[#E5E7EB]/60">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Recent Uploads
              </h3>
            </div>

            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="text-gray-600 bg-gray-100">
                  <th className="py-3 px-4 font-medium rounded-l-lg">Document Name</th>
                  <th className="py-3 px-4 font-medium">Upload Time</th>
                  <th className="py-3 px-4 font-medium">Status</th>
                  <th className="py-3 px-4 font-medium rounded-r-lg">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentUploads.map((file, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-gray-100 transition`}
                  >
                    <td className="py-3 px-4 font-medium text-gray-800">
                      {file.name}
                    </td>
                    <td className="py-3 px-4 text-gray-600">{file.time}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded-full ${
                          file.status === "Completed"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {file.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 flex space-x-3 text-gray-600">
                      <button className="hover:text-blue-600">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="hover:text-green-600">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="hover:text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ---- C. QUICK ACTIONS BAR ---- */}
          <div className="flex flex-wrap gap-4 justify-end">
            <button className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 transition">
              Upload Document
            </button>
            <button className="border border-gray-300 text-gray-700 px-5 py-2 rounded-lg font-medium hover:bg-gray-100 transition">
              View All Documents
            </button>
            <button className="border border-blue-300 text-blue-600 px-5 py-2 rounded-lg font-medium hover:bg-blue-50 transition">
              Support
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

// --- Sidebar Link Component ---
const SidebarLink = ({ icon, label, active }) => (
  <a
    href="#"
    className={`flex items-center px-6 py-3 text-sm font-medium hover:bg-blue-50 hover:text-blue-600 transition ${
      active ? "text-blue-600 bg-blue-50 border-l-4 border-blue-600" : "text-gray-600"
    }`}
  >
    <span className="mr-3">{icon}</span>
    {label}
  </a>
);

export default Dashboard;