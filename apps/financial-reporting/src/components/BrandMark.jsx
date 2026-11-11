import { FileSpreadsheet } from "lucide-react";

/** Product mark for the sidebar (replaces the old client logo). */
export default function BrandMark() {
  return (
    <div className="flex items-center gap-2.5">
      <span className="grid size-9 place-items-center rounded-lg bg-gradient-to-br from-[#2563EB] to-[#7C3AED] text-white shadow-sm">
        <FileSpreadsheet className="size-5" />
      </span>
      <span className="leading-tight">
        <span className="block text-[15px] font-semibold text-[#0F172A]">Financial Reporting</span>
        <span className="block text-[11px] font-medium uppercase tracking-wider text-[#64748B]">Analytx4t · AI Products</span>
      </span>
    </div>
  );
}
