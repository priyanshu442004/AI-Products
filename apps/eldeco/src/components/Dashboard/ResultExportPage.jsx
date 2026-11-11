import React, { useState } from "react";
import { 
  CheckCircle, 
  Download, 
  FileOutput, 
  FileText, 
  FileSpreadsheet, 
  FileJson,
  Loader2
} from "lucide-react";
import { exportToPDF } from "../../utils/pdfExport";
import { useToast } from "../../context/ToastContext";

const ResultExportPage = () => {
  const { showToast } = useToast();
  const [isExportingPDF, setIsExportingPDF] = useState(false);
  const [exportProgress, setExportProgress] = useState("");

  // Mock summary data
  const insights = [
    {
      title: "Total Credits",
      value: "₹ 8,25,000",
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      title: "Total Debits",
      value: "₹ 7,65,800",
      color: "text-red-600",
      bg: "bg-red-50",
    },
    {
      title: "Net Balance",
      value: "₹ 59,200",
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "Total Transactions",
      value: "324",
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      title: "Anomalies Found",
      value: "2",
      color: "text-yellow-600",
      bg: "bg-yellow-50",
    },
  ];

  const transactions = [
    { date: "2025-01-02", description: "Salary Credit", type: "Credit", amount: "₹90,000" },
    { date: "2025-01-03", description: "Office Supplies", type: "Debit", amount: "₹-8,200" },
    { date: "2025-01-05", description: "Vendor Payment", type: "Debit", amount: "₹-45,000" },
    { date: "2025-01-10", description: "Client Invoice Receipt", type: "Credit", amount: "₹1,20,000" },
  ];

  // Handle PDF export
  const handleExportPDF = async () => {
    setIsExportingPDF(true);
    setExportProgress("Preparing PDF export...");
    
    try {
      await exportToPDF("BankStatement_Jan2025", (progress) => {
        setExportProgress(progress);
      }, showToast);

      setExportProgress("PDF exported successfully!");
      setTimeout(() => {
        setExportProgress("");
        setIsExportingPDF(false);
      }, 2000);
    } catch (error) {
      console.error("Error exporting PDF:", error);
      setExportProgress("Failed to export PDF. Please try again.");
      setTimeout(() => {
        setExportProgress("");
        setIsExportingPDF(false);
      }, 3000);
    }
  };

  // Handle Excel export (placeholder)
  const handleExportExcel = () => {
    showToast("Excel export feature coming soon!", "info");
  };

  // Handle JSON export
  const handleExportJSON = () => {
    const exportData = {
      fileName: "BankStatement_Jan2025.pdf",
      insights,
      transactions,
      exportedAt: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `BankStatement_Jan2025_export_${new Date().getTime()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col p-6">
      {/* ---------- HEADER ---------- */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-5 rounded-lg shadow-sm border border-gray-100 mb-6">
        {/* LEFT: Document Info */}
        <div className="flex items-center space-x-3 mb-3 sm:mb-0">
          <CheckCircle className="text-green-500 w-6 h-6" />
          <div>
            <h1 className="text-lg font-semibold text-gray-900">
              BankStatement_Jan2025.pdf
            </h1>
            <p className="text-sm text-gray-500">Processed successfully</p>
          </div>
        </div>

        {/* RIGHT: Download Buttons */}
        <div className="flex flex-col items-end space-y-2">
          <div className="flex space-x-3">
            <button 
              onClick={handleExportPDF}
              disabled={isExportingPDF}
              className="flex items-center px-4 py-2 rounded-md bg-red-50 text-red-600 hover:bg-red-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isExportingPDF ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Exporting...
                </>
              ) : (
                <>
                  <FileText className="w-4 h-4 mr-2" /> PDF
                </>
              )}
            </button>
            <button 
              onClick={handleExportExcel}
              className="flex items-center px-4 py-2 rounded-md bg-green-50 text-green-600 hover:bg-green-100 transition"
            >
              <FileSpreadsheet className="w-4 h-4 mr-2" /> Excel
            </button>
            <button 
              onClick={handleExportJSON}
              className="flex items-center px-4 py-2 rounded-md bg-orange-50 text-orange-600 hover:bg-orange-100 transition"
            >
              <FileJson className="w-4 h-4 mr-2" /> JSON
            </button>
          </div>
          {exportProgress && (
            <p className="text-xs text-gray-500 mt-1">{exportProgress}</p>
          )}
        </div>
      </header>

      {/* ---------- MAIN 2-COLUMN LAYOUT ---------- */}
      <div className="flex flex-col lg:flex-row gap-6 flex-1">
        {/* LEFT PANEL (Document Preview) */}
        <div className="bg-white flex-1 p-6 rounded-lg shadow border border-gray-100 overflow-y-auto">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Document Preview</h2>
          
          <div className="mb-8">
            <h3 className="font-bold text-gray-700 mb-2">Cleaned Transactions</h3>
            <table className="w-full text-sm border-collapse border border-gray-200">
              <thead className="bg-gray-100">
                <tr className="text-gray-700">
                  <th className="py-2 px-3 text-left border border-gray-200">Date</th>
                  <th className="py-2 px-3 text-left border border-gray-200">Description</th>
                  <th className="py-2 px-3 text-left border border-gray-200">Type</th>
                  <th className="py-2 px-3 text-right border border-gray-200">Amount</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((row, index) => (
                  <tr
                    key={index}
                    className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100 transition`}
                  >
                    <td className="py-2 px-3 border border-gray-200">{row.date}</td>
                    <td className="py-2 px-3 border border-gray-200">{row.description}</td>
                    <td className="py-2 px-3 border border-gray-200">
                      <span
                        className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                          row.type === "Credit"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {row.type}
                      </span>
                    </td>
                    <td className="py-2 px-3 text-right border border-gray-200">{row.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary Section */}
          <div className="mb-8">
            <h3 className="font-bold text-gray-700 mb-2">Summary</h3>
            <ul className="text-gray-600 space-y-1">
              <li>Total number of transactions analyzed: 324</li>
              <li>Detected 2 unusual patterns in vendor payments.</li>
              <li>Overall data consistency: 98.7%</li>
            </ul>
          </div>

          {/* AI Notes Section */}
          <div className="mb-8">
            <h3 className="font-bold text-gray-700 mb-2">AI-Generated Notes</h3>
            <p className="text-gray-600 leading-relaxed">
              The AI detected recurring large transfers from client A in the first week of the month,
              categorized as income. Notable anomaly detected in vendor transfer pattern on January 5 2025.  
              Suggest verifying account #1142 disbursement entry for validation.
            </p>
          </div>

          {/* Balance Overview */}
          <div>
            <h3 className="font-bold text-gray-700 mb-2">Balance Overview</h3>
            <p className="text-gray-600">
              Net balance increased by <span className="font-medium text-green-600">₹ 59,200</span> across the period,
              indicating strong inflow performance.
            </p>
          </div>
        </div>

        {/* RIGHT PANEL (Insights) */}
        <div className="lg:w-1/3 flex flex-col gap-4">
          {insights.map((card, index) => (
            <div
              key={index}
              className={`${card.bg} p-4 rounded-lg shadow-sm border border-gray-100 flex flex-col items-start`}
            >
              <p className="text-sm text-gray-600">{card.title}</p>
              <h3 className={`text-xl font-bold mt-1 ${card.color}`}>{card.value}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* ---------- BOTTOM ACTION ---------- */}
      <div className="flex justify-center mt-8">
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition">
          Upload Another Document
        </button>
      </div>
    </div>
  );
};

export default ResultExportPage;