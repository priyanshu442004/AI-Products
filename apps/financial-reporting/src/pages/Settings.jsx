import { useEffect, useState } from "react";
import axios from "axios";
import { Mail, CheckCircle, AlertCircle, Paperclip } from "lucide-react";
import { apiUrl } from "../lib/apiPath";

const card = "bg-white p-4 sm:p-6 md:p-8 rounded-[20px] shadow-[0_8px_24px_rgba(0,0,0,0.08),0_2px_8px_rgba(0,0,0,0.04)] border border-[#E5E7EB]";

const SettingsPage = () => {
  const [mail, setMail] = useState(null);
  const [mailError, setMailError] = useState("");

  useEffect(() => {
    axios.get(apiUrl("/api/mail/settings"))
      .then(({ data }) => setMail(data))
      .catch(() => setMailError("Couldn't load the email settings — the Financial Reporting server is not reachable."));
  }, []);


  return (
    <div className="flex min-h-full bg-gradient-to-br from-[#F8FAFC] via-blue-50/20 to-purple-50/20 font-sans">
      <main className="flex-1 flex flex-col">
        <header className="flex items-center justify-between bg-white/80 backdrop-blur-xl px-6 py-4 shadow-sm border-b border-[#E5E7EB]/50">
          <h1 className="text-lg font-semibold text-[#0F172A] tracking-[-0.01em]">Settings</h1>
        </header>

        <div className="flex-1 overflow-y-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
          <div className="max-w-4xl mx-auto w-full space-y-6">
            {/* Report email */}
            <div className={card}>
              <div className="flex items-center gap-3 mb-2">
                <Mail className="w-6 h-6 text-[#1E40AF]" />
                <h2 className="text-lg font-semibold text-[#0F172A]">Report email</h2>
              </div>
              <p className="text-sm text-[#64748B] mb-5">
                When a trial balance is uploaded, the generated Balance Sheet and Profit &amp; Loss are emailed once per file.
              </p>
              {mailError && <p className="flex items-center gap-2 text-sm text-red-600"><AlertCircle className="w-4 h-4" />{mailError}</p>}
              {!mail && !mailError && <p className="text-sm text-[#64748B]">Loading…</p>}
              {mail && (
                <dl className="grid sm:grid-cols-[140px_1fr] gap-x-4 gap-y-3 text-sm">
                  <dt className="font-semibold text-[#0F172A]">Status</dt>
                  <dd className={`flex items-center gap-1.5 ${mail.enabled ? "text-green-700" : "text-red-600"}`}>
                    {mail.enabled ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                    {mail.enabled ? "Active" : "Not configured on the server (SMTP_* / MAIL_TO)"}
                  </dd>
                  <dt className="font-semibold text-[#0F172A]">From</dt><dd className="text-[#475569]">{mail.from || "Not set"}</dd>
                  <dt className="font-semibold text-[#0F172A]">Recipients</dt>
                  <dd className="text-[#475569]">{mail.to.length ? mail.to.join(", ") : "Not set"}</dd>
                  <dt className="font-semibold text-[#0F172A]">Subject</dt><dd className="text-[#475569]">{mail.subject}</dd>
                  <dt className="font-semibold text-[#0F172A]">Attachments</dt>
                  <dd className="text-[#475569] flex items-center gap-1.5"><Paperclip className="w-4 h-4" />{mail.attachments.join(" + ")}</dd>
                  <dt className="font-semibold text-[#0F172A]">Message</dt>
                  <dd className="text-[#475569] whitespace-pre-line bg-[#F8FAFC] border border-[#E5E7EB] rounded-lg p-3">{mail.body}</dd>
                </dl>
              )}
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;
