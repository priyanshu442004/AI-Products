import { useNavigate, useLocation } from "react-router-dom";
import { Scale } from "lucide-react";
import logo from "../assets/eldeco.png";
import axios from "axios";

import {
  LayoutGrid,
  Upload,
  LogOut,
  Settings,
  HelpCircle,
  FileSpreadsheet,
  Trash2,
  Bot,
} from "lucide-react";
import { logOut } from "../firebase/auth";
import { useState } from "react";
import { useToast } from "../context/ToastContext";
import { apiUrl } from "../lib/apiPath";

const SidebarDropdown = ({ icon, label, items, navigate, currentPath }) => {
  const isActive = items.some((item) => currentPath === item.path);

  return (
    <div className="relative group">
      <div
        className={`relative flex items-center w-full px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 cursor-pointer ${isActive
          ? "text-[#2563EB] bg-[#EFF6FF]/60"
          : "text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC]"
          }`}
      >
        {isActive && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#2563EB] rounded-r-full"></div>
        )}
        <span
          className={`flex-shrink-0 mr-3 transition-colors duration-200 ${isActive ? "text-[#2563EB]" : "text-[#94A3B8] group-hover:text-[#475569]"
            }`}
        >
          {icon}
        </span>
        <span className="flex-1">{label}</span>
      </div>

      {/* Dropdown */}
      <div className="hidden group-hover:block ml-10 mt-1 space-y-1">
        {items.map((item, index) => (
          <button
            key={index}
            onClick={() => navigate(item.path)}
            className={`block w-full text-left px-4 py-2 text-sm rounded-lg transition-all duration-150 ${currentPath === item.path
              ? "text-[#2563EB] bg-[#EFF6FF]"
              : "text-[#64748B] hover:text-[#2563EB] hover:bg-[#EFF6FF]"
              }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

const SideBar = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [delLoading, setDelLoading] = useState(false);

  const SidebarLink = ({ icon, label, active, onClick }) => (
    <button
      onClick={onClick}
      className={`relative flex items-center w-full px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 text-left group ${active
        ? "text-[#2563EB] bg-[#EFF6FF]/60"
        : "text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC]"
        }`}
    >
      {active && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#2563EB] rounded-r-full"></div>
      )}
      <span
        className={`flex-shrink-0 mr-3 transition-colors duration-200 ${active ? "text-[#2563EB]" : "text-[#94A3B8] group-hover:text-[#475569]"
          }`}
      >
        {icon}
      </span>
      <span className="flex-1">{label}</span>
    </button>
  );

  const handleLogout = async () => {
    const result = await logOut();
    if (result.success) {
      navigate("/");
    }
  };

  const handleDownload = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        apiUrl("/api/download/download-financials"),
        { responseType: "blob" }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Financial_Statements.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTB = async () => {
    if (!window.confirm("Are you sure you want to delete the current Trial Balance? All calculations will be cleared.")) {
      return;
    }

    try {
      setDelLoading(true);
      const response = await axios.delete(apiUrl("/api/trial-balance/delete"));

      if (response.data.success) {
        showToast("Trial Balance deleted successfully", "success");
        navigate("/dashboard/trial-balance/summary"); // Redirect to upload page
      } else {
        showToast("Delete failed: " + (response.data.message || "Unknown error"), "error");
      }
    } catch (error) {
      console.error("Delete failed:", error);
      showToast("An error occurred while deleting the Trial Balance.", "error");
    } finally {
      setDelLoading(false);
    }
  };

  return (
    <aside className="w-[260px] bg-[#FFFFFF] border-r border-[#E5E7EB]/80 flex flex-col justify-between shadow-premium">
      <div>
        <div className="flex items-center px-5 py-5 border-b border-[#E5E7EB]">
          <div className="h-10 rounded-lg flex items-center justify-center bg-gradient-to-br from-[#2563EB]/10 to-[#7C3AED]/10 border border-blue-100/50">
            <img src={logo} alt="" className="w-50 h-17" />
          </div>
        </div>

        <nav className="mt-6 px-3 space-y-1.5">
          <SidebarLink
            icon={<LayoutGrid className="w-5 h-5" />}
            label="Dashboard"
            active={location.pathname === "/dashboard"}
            onClick={() => navigate("/dashboard")}
          />
          <SidebarLink
            icon={<Upload className="w-5 h-5" />}
            label="Sales MIS"
            active={location.pathname === "/dashboard/upload"}
            onClick={() => navigate("/dashboard/upload")}
          />
          <SidebarDropdown
            icon={<Scale className="w-5 h-5" />}
            label="Financial Statements"
            currentPath={location.pathname}
            items={[
              { label: "Trial Balance Summary", path: "/dashboard/trial-balance/summary" },
              { label: "Balance Sheet", path: "/dashboard/trial-balance/balance-sheet" },
              { label: "Profit & Loss Statement", path: "/dashboard/trial-balance/profit-loss" },
              { label: "Cash Flow Statement", path: "/dashboard/trial-balance/cash-flow" },
            ]}
            navigate={navigate}
          />
          <SidebarDropdown
            icon={<FileSpreadsheet className="w-5 h-5" />}
            label="Working Sheets"
            currentPath={location.pathname}
            items={[
              { label: "AE", path: "/dashboard/working-sheets/ae" },
              { label: "WIP", path: "/dashboard/working-sheets/wip" },
              { label: "DTA", path: "/dashboard/working-sheets/dta" },
              { label: "SOCE", path: "/dashboard/working-sheets/soce" },
            ]}
            navigate={navigate}
          />
          <SidebarLink
            icon={<Bot className="w-5 h-5" />}
            label="AI Assistant"
            active={location.pathname === "/dashboard/ai-assistant"}
            onClick={() => navigate("/dashboard/ai-assistant")}
          />
          <SidebarLink
            icon={<HelpCircle className="w-5 h-5" />}
            label="Support"
            active={location.pathname === "/dashboard/support"}
            onClick={() => navigate("/dashboard/support")}
          />
          <SidebarLink
            icon={<Settings className="w-5 h-5" />}
            label="Settings"
            active={location.pathname === "/dashboard/settings"}
            onClick={() => navigate("/dashboard/settings")}
          />
        </nav>

        <div className="px-4 mt-6 space-y-2">
          <button
            onClick={handleDownload}
            disabled={loading}
            className={`flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg font-medium text-white transition-all duration-200 shadow-md ${loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700 hover:shadow-lg active:scale-95"
              }`}
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <FileSpreadsheet className="w-4 h-4" />
            )}
            {loading ? "Downloading..." : "Download All Statements"}
          </button>

          <button
            onClick={handleDeleteTB}
            disabled={delLoading}
            className={`flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg font-medium text-white transition-all duration-200 shadow-md ${delLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700 hover:shadow-lg active:scale-95"
              }`}
          >
            {delLoading ? (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <Trash2 className="w-4 h-4" />
            )}
            {delLoading ? "Deleting..." : "Delete Current TB"}
          </button>
        </div>
      </div>

      <div className="p-4 border-t border-[#E5E7EB]">
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-2.5 text-[#475569] hover:text-red-600 hover:bg-red-50/50 rounded-xl transition-all duration-200 font-medium"
        >
          <LogOut className="w-5 h-5 mr-3 flex-shrink-0" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default SideBar;