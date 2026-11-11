import { useEffect, useState } from "react";
import axios from "axios";
import { updateProfile } from "firebase/auth";
import { User, Mail, Shield, Save, Loader2, CheckCircle, AlertCircle, Paperclip } from "lucide-react";
import { useAuth } from "../firebase/useAuth";
import { resetPassword } from "../firebase/auth";
import { useToast } from "../context/ToastContext";
import { apiUrl } from "../lib/apiPath";

const card = "bg-white p-4 sm:p-6 md:p-8 rounded-[20px] shadow-[0_8px_24px_rgba(0,0,0,0.08),0_2px_8px_rgba(0,0,0,0.04)] border border-[#E5E7EB]";

const SettingsPage = () => {
  const { showToast } = useToast();
  const { currentUser } = useAuth();
  const [name, setName] = useState(currentUser?.displayName || "");
  const [saving, setSaving] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [mail, setMail] = useState(null);
  const [mailError, setMailError] = useState("");

  useEffect(() => { setName(currentUser?.displayName || ""); }, [currentUser]);
  useEffect(() => {
    axios.get(apiUrl("/api/mail/settings"))
      .then(({ data }) => setMail(data))
      .catch(() => setMailError("Couldn't load the email settings — the Eldeco server is not reachable."));
  }, []);

  const handleSave = async () => {
    if (!currentUser) return showToast("Sign in to update your profile.", "error");
    const v = name.trim();
    if (!v) return showToast("Display name can't be empty.", "error");
    setSaving(true);
    try {
      await updateProfile(currentUser, { displayName: v });
      showToast("Display name updated.", "success");
    } catch (e) {
      showToast(e.message || "Couldn't update your profile.", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleReset = async () => {
    if (!currentUser?.email) return;
    setResetting(true);
    const r = await resetPassword(currentUser.email);
    setResetting(false);
    showToast(r.success ? `Password reset link sent to ${currentUser.email}.` : r.error, r.success ? "success" : "error");
  };

  const googleOnly = currentUser?.providerData?.length && currentUser.providerData.every((p) => p.providerId === "google.com");

  return (
    <div className="flex min-h-full bg-gradient-to-br from-[#F8FAFC] via-blue-50/20 to-purple-50/20 font-sans">
      <main className="flex-1 flex flex-col">
        <header className="flex items-center justify-between bg-white/80 backdrop-blur-xl px-6 py-4 shadow-sm border-b border-[#E5E7EB]/50">
          <h1 className="text-lg font-semibold text-[#0F172A] tracking-[-0.01em]">Settings</h1>
        </header>

        <div className="flex-1 overflow-y-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
          <div className="max-w-4xl mx-auto w-full space-y-6">
            {/* Profile */}
            <div className={card}>
              <div className="flex items-center gap-3 mb-6">
                <User className="w-6 h-6 text-[#1E40AF]" />
                <h2 className="text-lg font-semibold text-[#0F172A]">Profile</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-[#0F172A] mb-2">Display name</label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} maxLength={60}
                    className="w-full px-4 py-3 border-2 border-[#E5E7EB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E40AF]/20 focus:border-[#1E40AF]"
                    placeholder="Enter your name" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#0F172A] mb-2">Email address</label>
                  <input type="email" value={currentUser?.email || ""} disabled
                    className="w-full px-4 py-3 border-2 border-[#E5E7EB] rounded-xl bg-[#F8FAFC] text-[#64748B]" />
                  <p className="text-xs text-[#64748B] mt-1">Your sign-in email can't be changed here.</p>
                </div>
                <div className="flex justify-end">
                  <button onClick={handleSave} disabled={saving || name.trim() === (currentUser?.displayName || "")}
                    className="flex items-center gap-2 bg-gradient-to-r from-[#1E40AF] to-[#7C3AED] text-white px-6 py-3 rounded-xl font-semibold disabled:opacity-50 transition-all">
                    {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                    Save name
                  </button>
                </div>
              </div>
            </div>

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

            {/* Security */}
            <div className={card}>
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-6 h-6 text-[#1E40AF]" />
                <h2 className="text-lg font-semibold text-[#0F172A]">Security</h2>
              </div>
              {googleOnly ? (
                <p className="text-sm text-[#64748B]">You sign in with Google, so your password is managed by your Google account.</p>
              ) : (
                <button onClick={handleReset} disabled={resetting || !currentUser}
                  className="w-full text-left px-4 py-3 border-2 border-[#E5E7EB] rounded-xl hover:bg-[#F8FAFC] hover:border-[#1E40AF]/30 transition-all disabled:opacity-60">
                  <div className="font-semibold text-[#0F172A] flex items-center gap-2">
                    {resetting && <Loader2 className="w-4 h-4 animate-spin" />} Change password
                  </div>
                  <div className="text-xs text-[#64748B] mt-1">We'll email a secure password-reset link to {currentUser?.email || "your address"}.</div>
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;
