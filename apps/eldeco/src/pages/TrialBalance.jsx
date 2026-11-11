import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/eldeco.png";
import {
  LayoutGrid,
  Upload as UploadIcon,
  History,
  Settings,
  HelpCircle,
  LogOut,
  FileText,
  XCircle,
  Scale,
} from "lucide-react";
import { logOut } from "../firebase/auth";
import { useToast } from "../context/ToastContext";
import { apiUrl } from "../lib/apiPath";



const ALLOWED_EXTENSIONS = ["xlsx", "csv"];


const TrialBalance = () => {
  const { showToast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showError, setShowError] = useState(false);

  const navigate = useNavigate();
  const [files, setFiles] = useState([]);

  const [dragOver, setDragOver] = useState(false);
  const isValidFile = (file) => {
    const ext = file.name.split(".").pop().toLowerCase();
    return ALLOWED_EXTENSIONS.includes(ext);
  };



  const handleLogout = async () => {
    const result = await logOut();
    if (result.success) {
      navigate("/");
    }
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    const validFiles = selectedFiles.filter(isValidFile);

    if (validFiles.length !== selectedFiles.length) {
      showToast("Some files were rejected. Only Excel (.xlsx) or CSV (.csv) files are allowed.", "error");
    }

    setFiles(prev => [...prev, ...validFiles]);
  };



  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    const validFiles = droppedFiles.filter(isValidFile);

    if (validFiles.length !== droppedFiles.length) {
      showToast("Some files were rejected. Only Excel (.xlsx) or CSV (.csv) files are allowed.", "error");
    }

    setFiles(prev => [...prev, ...validFiles]);
  };



  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  // Remove file
  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };





  const handleNext = async () => {
    if (files.length === 0) {
      setShowError(true);
      return;
    }

    setShowError(false);
    setIsProcessing(true);

    const formData = new FormData();
    formData.append("file", files[0]);

    try {
      const response = await fetch(apiUrl("/api/trial-balance/preview"), {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        navigate("/dashboard/trial-balance-preview", {
          state: { tableData: result.data, file: files[0] },
        });
      }

    } catch (err) {
      console.error(err);
      showToast("Failed to preview file. Please check your network.", "error");
    }

    setIsProcessing(false);
  };



  const SidebarDropdown = ({ icon, label, items, navigate }) => {
    return (
      <div className="relative group">
        <div className="flex items-center w-full px-4 py-2.5 text-sm font-medium rounded-lg text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC] transition-all duration-200 cursor-pointer">
          <span className="flex-shrink-0 mr-3 text-[#94A3B8] group-hover:text-[#475569]">
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
              className="block w-full text-left px-4 py-2 text-sm rounded-lg text-[#64748B] hover:text-[#2563EB] hover:bg-[#EFF6FF] transition-all duration-150"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    );
  };


  // Check if regular form is valid
  const isFormValid = () => files.length > 0;

  const StatementCard = ({ title, description, onClick }) => {
    return (
      <button
        onClick={onClick}
        className="group relative bg-white/80 backdrop-blur-xl border border-[#E5E7EB] rounded-2xl p-8 text-left transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.05)]
      hover:shadow-[0_12px_40px_rgba(37,99,235,0.15)]
      hover:-translate-y-2 hover:border-blue-200"
      >
        {/* Subtle glow effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition duration-300 -z-10"></div>

        <h3 className="text-xl font-semibold text-[#0F172A] mb-3 group-hover:text-[#2563EB] transition">
          {title}
        </h3>

        <p className="text-[#64748B] text-sm leading-relaxed">
          {description}
        </p>
      </button>
    );
  };


  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#F8FAFC] via-blue-50/20 to-purple-50/20 font-sans">
      {/* ------------------ SIDEBAR ------------------ */}
      <aside className="w-[260px] bg-[#FFFFFF] border-r border-[#E5E7EB]/80 flex flex-col justify-between shadow-premium">
        <div>
          <div className="flex items-center px-5 py-5 border-b border-[#E5E7EB]">
            <div className=" h-10 rounded-lg flex items-center justify-center bg-gradient-to-br from-[#2563EB]/10 to-[#7C3AED]/10 border border-blue-100/50">
              <img src={logo} alt="" className="w-50 h-17" />
            </div>

          </div>

          <nav className="mt-6 px-3 space-y-1.5">
            <SidebarLink
              icon={<LayoutGrid className="w-5 h-5" />}
              label="Dashboard"
              onClick={() => navigate("/dashboard")}
            />
            <SidebarLink
              icon={<UploadIcon className="w-5 h-5" />}
              label="Sales MIS"

              onClick={() => navigate("/dashboard/upload")}
            />
            <SidebarDropdown
              icon={<Scale className="w-5 h-5" />}
              label="Trial Balance"
              items={[
                { label: "Balance Sheet", path: "/dashboard/trial-balance/balance-sheet" },
                { label: "Profit & Loss", path: "/dashboard/trial-balance/profit-loss" },
                { label: "Notes to Accounts", path: "/dashboard/trial-balance/notes" },
                { label: "SOCE", path: "/dashboard/trial-balance/soce" },
                { label: "Trial Balance Summary", path: "/dashboard/trial-balance/summary" },
              ]}
              navigate={navigate}
            />
            <SidebarLink
              icon={<History className="w-5 h-5" />}
              label="Processed Documents"
              onClick={() => navigate("/dashboard/history")}
            />
            <SidebarLink
              icon={<HelpCircle className="w-5 h-5" />}
              label="Support"
              onClick={() => navigate("/dashboard/support")}
            />
            <SidebarLink
              icon={<Settings className="w-5 h-5" />}
              label="Settings"
              onClick={() => navigate("/dashboard/settings")}
            />
          </nav>
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

      {/* ------------------ MAIN CONTENT ------------------ */}
      {/* ------------------ MAIN CONTENT ------------------ */}
      <main className="flex-1 flex flex-col bg-gradient-to-br from-[#F8FAFC] via-blue-50/20 to-purple-50/20">

        {/* ---------- TOP BAR ---------- */}
        <header className="flex items-center justify-between bg-white/80 backdrop-blur-xl px-6 py-4 shadow-sm border-b border-[#E5E7EB]/50">
          <h1 className="text-lg font-semibold text-[#0F172A] tracking-[-0.01em]">
            Financial Statements
          </h1>
        </header>

        {/* ---------- SELECTION SECTION ---------- */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">

          <div className="text-center mb-12 max-w-2xl">
            <h1 className="text-4xl font-bold text-[#0F172A] mb-4 tracking-tight">
              Choose Statement Type
            </h1>
            <p className="text-[#64748B] text-lg">
              Select the financial report you would like to generate or analyze.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl">

            {/* Balance Sheet */}
            <StatementCard
              title="Balance Sheet"
              description="View assets, liabilities and equity position."
              onClick={() => navigate("/dashboard/balance-sheet")}
            />

            {/* P&L */}
            <StatementCard
              title="Profit & Loss"
              description="Analyze revenue, expenses and profitability."
              onClick={() => navigate("/dashboard/PL")}
            />

            {/* CFS */}
            <StatementCard
              title="Cash Flow Statement"
              description="Track inflow and outflow of cash."
              onClick={() => navigate("/dashboard/CFS")}
            />

            {/* SOCE */}
            <StatementCard
              title="Statement of Changes in Equity"
              description="Monitor equity movement over time."
              onClick={() => navigate("/dashboard/SOCE")}
            />

            {/* Trial Balance Summary */}
            <StatementCard
              title="Trial Balance Summary"
              description="Summarized ledger balances overview."
              onClick={() => navigate("/dashboard/trial-balance-summary")}
            />

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
    className={`relative flex items-center w-full px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 text-left group ${active
      ? "text-[#2563EB] bg-[#EFF6FF]/60"
      : "text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC]"
      }`}
  >
    {/* Subtle active indicator */}
    {active && (
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#2563EB] rounded-r-full"></div>
    )}
    <span className={`flex-shrink-0 mr-3 transition-colors duration-200 ${active ? 'text-[#2563EB]' : 'text-[#94A3B8] group-hover:text-[#475569]'
      }`}>
      {icon}
    </span>
    <span className="flex-1">{label}</span>
  </button>
);

export default TrialBalance;
