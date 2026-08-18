"use client";

import React, { useState, useRef } from "react";
import { useBuilderStore } from "@/stores/use-builder-store";
import {
  Settings,
  ShieldCheck,
  CreditCard,
  Globe,
  Shield,
  Save,
  CheckCircle2,
  Lock,
  Sparkles,
  User,
  ShoppingBag,
  Sliders,
  Users,
  MessageSquare,
  Search,
  ExternalLink,
  Plus,
  Trash2,
  Check,
  X,
  Code,
  Radio,
  Send,
  HelpCircle,
  Upload,
  Camera,
} from "lucide-react";

type SettingsTab =
  | "account"
  | "store"
  | "payout"
  | "advance"
  | "site"
  | "integrations"
  | "multi-admin";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: "Owner" | "Admin" | "Editor" | "Finance";
  status: "Aktif" | "Undangan Dikirim";
}

export default function SettingsPage() {
  const { profile, updateProfile } = useBuilderStore();

  const [activeTab, setActiveTab] = useState<SettingsTab>("account");
  const [savedToast, setSavedToast] = useState(false);

  const faviconInputRef = useRef<HTMLInputElement>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  // Tab 1: Account Settings State
  const [username, setUsername] = useState(profile.username || "sinergivisual");
  const [email, setEmail] = useState("admin@sinergivisual.com");
  const [accountName, setAccountName] = useState(profile.displayName || "Sinergi Visual");
  const [phone, setPhone] = useState("+62 812-3456-7890");
  const [address, setAddress] = useState("Jl. Kemang Raya No. 42, Mampang Prapatan, Jakarta Selatan 12730");
  
  // Toggles
  const [shopPolicy, setShopPolicy] = useState(true);
  const [contactInfo, setContactInfo] = useState(true);
  const [searchEngineCrawl, setSearchEngineCrawl] = useState(true);
  
  // Floating Contact
  const [floatingChatIcon, setFloatingChatIcon] = useState(true);
  const [chatPlatform, setChatPlatform] = useState<"whatsapp" | "telegram">("whatsapp");
  const [countryCode, setCountryCode] = useState("+62");
  const [contactPhone, setContactPhone] = useState("81234567890");
  const [defaultMessage, setDefaultMessage] = useState(
    "Halo Sinergi Visual! Saya tertarik dengan aset video editing & ingin berkonsultasi proyek..."
  );

  // Tab 2: Store Management State
  const [storeCurrency, setStoreCurrency] = useState("IDR");
  const [invoicePrefix, setInvoicePrefix] = useState("INV/SV/2026/");
  const [refundPolicy, setRefundPolicy] = useState(
    "Aset digital yang telah diunduh tidak dapat direfund. Hubungi tim kami jika ada kendala berkas."
  );
  const [taxEnabled, setTaxEnabled] = useState(false);

  // Tab 3: Payout Settings State
  const [bankName, setBankName] = useState("Bank Central Asia (BCA)");
  const [accountNumber, setAccountNumber] = useState("8920192841");
  const [accountHolder, setAccountHolder] = useState("SINERGI VISUAL KREASI PT");
  const [payoutSchedule, setPayoutSchedule] = useState("weekly");

  // Tab 4: Advance Settings State
  const [customDomain, setCustomDomain] = useState("lynk.sinergivisual.com");
  const [faviconUrl, setFaviconUrl] = useState("https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64");
  const [redirect404, setRedirect404] = useState("https://sinergivisual.com");

  // Tab 5: Site Settings State
  const [headerScript, setHeaderScript] = useState("<!-- Custom Tracking / Font Injection -->");
  const [customCss, setCustomCss] = useState("/* Custom CSS overrides */\n.bio-custom { border-radius: 1rem; }");
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [passwordProtection, setPasswordProtection] = useState(false);
  const [sitePassword, setSitePassword] = useState("");

  // Tab 6: Integrations State
  const [metaPixelId, setMetaPixelId] = useState("98412984102948");
  const [tiktokPixelId, setTiktokPixelId] = useState("TT-SV-894210");
  const [googleAnalyticsId, setGoogleAnalyticsId] = useState("G-SVLYNK2026");
  const [googleTagManagerId, setGoogleTagManagerId] = useState("GTM-K984X2");
  const [webhookUrl, setWebhookUrl] = useState("https://api.sinergivisual.com/v1/webhooks/lynk");

  // Tab 7: Multi Admin State
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: "mem-1",
      name: "Sinergi Visual Director",
      email: "director@sinergivisual.com",
      role: "Owner",
      status: "Aktif",
    },
    {
      id: "mem-2",
      name: "Andi Saputra (Lead Editor)",
      email: "andi.editor@sinergivisual.com",
      role: "Editor",
      status: "Aktif",
    },
    {
      id: "mem-3",
      name: "Rina Finance",
      email: "finance@sinergivisual.com",
      role: "Finance",
      status: "Aktif",
    },
  ]);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [inviteName, setInviteName] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<"Admin" | "Editor" | "Finance">("Editor");

  const tabs: { id: SettingsTab; label: string }[] = [
    { id: "account", label: "Account Settings" },
    { id: "store", label: "Store Management" },
    { id: "payout", label: "Payout Settings" },
    { id: "advance", label: "Advance Settings" },
    { id: "site", label: "Site Settings" },
    { id: "integrations", label: "Integrations" },
    { id: "multi-admin", label: "Multi Admin" },
  ];

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert("Ukuran gambar maksimal 5MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event.target?.result === "string") {
        updateProfile({ avatarUrl: event.target.result });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFaviconUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert("Ukuran favicon maksimal 2MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event.target?.result === "string") {
        setFaviconUrl(event.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveAll = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      username,
      displayName: accountName,
    });
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2500);
  };

  const handleInviteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail) return;

    const newMem: TeamMember = {
      id: `mem-${Date.now()}`,
      name: inviteName || inviteEmail.split("@")[0],
      email: inviteEmail,
      role: inviteRole,
      status: "Undangan Dikirim",
    };

    setTeamMembers([...teamMembers, newMem]);
    setIsInviteModalOpen(false);
    setInviteName("");
    setInviteEmail("");
  };

  const removeMember = (id: string) => {
    if (confirm("Hapus akses anggota tim ini?")) {
      setTeamMembers(teamMembers.filter((m) => m.id !== id));
    }
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-400">
            <Settings className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-900 dark:text-white">Settings & Konfigurasi</h1>
            <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
              Kelola pengaturan akun, toko, penarikan dana, domain, integrasi, dan tim admin
            </p>
          </div>
        </div>

        {/* Global Save Button */}
        <button
          onClick={handleSaveAll}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition cursor-pointer self-start sm:self-auto"
        >
          <Save className="w-4 h-4" />
          <span>Simpan Pengaturan</span>
        </button>
      </div>

      {/* 1. HORIZONTAL TABS NAVIGATION BAR */}
      <div className="border-b border-slate-200 dark:border-zinc-800 overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-2 min-w-max pb-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
                activeTab === tab.id
                  ? "bg-emerald-500 text-zinc-950 shadow-md shadow-emerald-500/20"
                  : "bg-white dark:bg-zinc-900/60 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800 border border-slate-200 dark:border-zinc-800/80"
              }`}
            >
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 2. TAB CONTENTS */}

      {/* ========================================================================= */}
      {/* TAB 1: ACCOUNT SETTINGS */}
      {/* ========================================================================= */}
      {activeTab === "account" && (
        <div className="space-y-6 text-xs animate-in fade-in duration-200">
          {/* Banner Verifikasi Akun */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-500/10 via-white to-emerald-500/5 dark:from-emerald-950/90 dark:via-zinc-900 dark:to-zinc-950 border border-emerald-300 dark:border-emerald-500/40 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
            <div className="space-y-1.5 z-10">
              <div className="flex items-center gap-2">
                <span className="p-1 rounded-lg bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                  <ShieldCheck className="w-5 h-5" />
                </span>
                <h3 className="text-base font-black text-slate-900 dark:text-white">
                  Instant fund withdrawal with Verified Account
                </h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-zinc-300 max-w-xl leading-relaxed">
                Verifikasi identitas studio Anda untuk mengaktifkan pencairan dana otomatis tanpa batas dan mendapatkan lencana centang verifikasi resmi.
              </p>
            </div>

            <button
              type="button"
              onClick={() => alert("Membuka formulir verifikasi KTP / Legalitas PT Sinergi Visual...")}
              className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-black text-xs shadow-lg shadow-emerald-500/20 transition shrink-0 cursor-pointer"
            >
              Get Verified Now!
            </button>
          </div>

          {/* Subscription Box */}
          <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900/90 border border-slate-200 dark:border-zinc-800 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-900 dark:text-white">Status Langganan Paket:</span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 text-[10px] font-extrabold uppercase border border-emerald-300 dark:border-emerald-500/30">
                  PRO Studio Active
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-zinc-400">
                Fitur Unlimited Digital Assets, 0% Lynk fee, Custom Domain, & Multi-Admin aktif.
              </p>
            </div>

            <button
              type="button"
              onClick={() => alert("Menampilkan opsi paket langganan studio...")}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-zinc-950 dark:hover:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-800 dark:text-white font-bold text-xs transition shrink-0 cursor-pointer"
            >
              I Want More Benefit
            </button>
          </div>

          {/* Form Account Detail */}
          <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900/90 border border-slate-200 dark:border-zinc-800 space-y-4 shadow-sm">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-zinc-800">
              <User className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Detail Akun Studio</h3>
            </div>

            {/* Avatar upload in Settings */}
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800">
              <div className="w-16 h-16 rounded-2xl overflow-hidden border border-emerald-500/50 bg-slate-200 dark:bg-zinc-900 shrink-0">
                <img
                  src={profile.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-1.5">
                <span className="font-bold text-slate-900 dark:text-white block">Foto Profil Studio:</span>
                <input
                  type="file"
                  ref={avatarInputRef}
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarUpload}
                />
                <button
                  type="button"
                  onClick={() => avatarInputRef.current?.click()}
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Pilih dari Galeri / PC</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-zinc-300 mb-1.5">
                  Username Lynk.id:
                </label>
                <div className="flex items-center bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-700/80 rounded-xl px-3 py-2">
                  <span className="text-slate-400 dark:text-zinc-500 font-mono mr-1">lynk.id/</span>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-transparent font-mono font-bold text-emerald-600 dark:text-emerald-400 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-zinc-300 mb-1.5">
                  Email Akun (Read-only / Terverifikasi):
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-700/80 rounded-xl px-3 py-2 text-slate-700 dark:text-zinc-300 font-mono focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-zinc-300 mb-1.5">
                  Nama Akun / Brand Tampilan:
                </label>
                <input
                  type="text"
                  value={accountName}
                  onChange={(e) => setAccountName(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-700/80 rounded-xl px-3 py-2 text-slate-900 dark:text-white font-bold focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-zinc-300 mb-1.5">
                  Nomor Telepon Studio:
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-700/80 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-zinc-300 mb-1.5">
                Alamat Studio / Kantor:
              </label>
              <textarea
                rows={2}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-700/80 rounded-xl p-3 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 leading-relaxed"
              />
            </div>
          </div>

          {/* Shop Information Card */}
          <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900/90 border border-slate-200 dark:border-zinc-800 space-y-4 shadow-sm">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-zinc-800">
              <ShoppingBag className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Shop Informations (Bio Footer)</h3>
            </div>

            <div className="space-y-3">
              {/* Switch 1: Shop Policy */}
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800">
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">Shop Policy</h4>
                  <p className="text-[11px] text-slate-500 dark:text-zinc-400 mt-0.5">
                    Tampilkan tautan kebijakan lisensi dan ketentuan toko di bagian bawah halaman bio
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShopPolicy(!shopPolicy)}
                  className={`px-3 py-1.5 rounded-xl font-bold transition cursor-pointer ${
                    shopPolicy ? "bg-emerald-500 text-zinc-950" : "bg-slate-200 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400"
                  }`}
                >
                  {shopPolicy ? "ON" : "OFF"}
                </button>
              </div>

              {/* Switch 2: Contact Informations */}
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800">
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">Contact Informations</h4>
                  <p className="text-[11px] text-slate-500 dark:text-zinc-400 mt-0.5">
                    Tampilkan alamat email dan kontak resmi tim di halaman bio
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setContactInfo(!contactInfo)}
                  className={`px-3 py-1.5 rounded-xl font-bold transition cursor-pointer ${
                    contactInfo ? "bg-emerald-500 text-zinc-950" : "bg-slate-200 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400"
                  }`}
                >
                  {contactInfo ? "ON" : "OFF"}
                </button>
              </div>
            </div>
          </div>

          {/* Search Engine Crawl Control Card */}
          <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900/90 border border-slate-200 dark:border-zinc-800 space-y-4 shadow-sm">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-zinc-800">
              <Search className="w-4 h-4 text-amber-500 dark:text-amber-400" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Search Engine Crawl (SEO)</h3>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800">
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">Search Engine Crawl</h4>
                <p className="text-[11px] text-slate-500 dark:text-zinc-400 mt-0.5">
                  Izinkan robot mesin pencari (Google, Bing, Yahoo) mengindeks profil bio dan aset Anda
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSearchEngineCrawl(!searchEngineCrawl)}
                className={`px-3 py-1.5 rounded-xl font-bold transition cursor-pointer ${
                  searchEngineCrawl ? "bg-emerald-500 text-zinc-950" : "bg-slate-200 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400"
                }`}
              >
                {searchEngineCrawl ? "Allowed" : "Blocked"}
              </button>
            </div>
          </div>

          {/* Floating Contact Platform Card */}
          <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900/90 border border-slate-200 dark:border-zinc-800 space-y-5 shadow-sm">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Floating Contact Platform</h3>
              </div>
              <button
                type="button"
                onClick={() => setFloatingChatIcon(!floatingChatIcon)}
                className={`px-3 py-1.5 rounded-xl font-bold transition cursor-pointer ${
                  floatingChatIcon ? "bg-emerald-500 text-zinc-950" : "bg-slate-200 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400"
                }`}
              >
                Chat Icon: {floatingChatIcon ? "ON" : "OFF"}
              </button>
            </div>

            {floatingChatIcon && (
              <div className="space-y-4 pt-1">
                {/* Platform Selector (WhatsApp / Telegram) */}
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-zinc-300 mb-2">
                    Pilih Platform Chat:
                  </label>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setChatPlatform("whatsapp")}
                      className={`flex-1 py-2.5 px-4 rounded-xl font-bold border transition flex items-center justify-center gap-2 cursor-pointer ${
                        chatPlatform === "whatsapp"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-950/80 dark:border-emerald-500 dark:text-emerald-400 shadow-sm"
                          : "bg-slate-50 dark:bg-zinc-950 border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white"
                      }`}
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>WhatsApp</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setChatPlatform("telegram")}
                      className={`flex-1 py-2.5 px-4 rounded-xl font-bold border transition flex items-center justify-center gap-2 cursor-pointer ${
                        chatPlatform === "telegram"
                          ? "bg-indigo-50 text-indigo-700 border-indigo-300 dark:bg-indigo-950/80 dark:border-indigo-500 dark:text-indigo-400 shadow-sm"
                          : "bg-slate-50 dark:bg-zinc-950 border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white"
                      }`}
                    >
                      <Send className="w-4 h-4" />
                      <span>Telegram</span>
                    </button>
                  </div>
                </div>

                {/* Country selector & phone input */}
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-zinc-300 mb-1.5">
                    Nomor WhatsApp / Username Telegram:
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      className="bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white font-mono focus:outline-none"
                    >
                      <option value="+62">🇮🇩 +62 (Indonesia)</option>
                      <option value="+1">🇺🇸 +1 (USA)</option>
                      <option value="+65">🇸🇬 +65 (Singapore)</option>
                      <option value="+60">🇲🇾 +60 (Malaysia)</option>
                    </select>
                    <input
                      type="text"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      placeholder="81234567890"
                      className="flex-1 bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white font-mono focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                {/* Default customer message */}
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-zinc-300 mb-1.5">
                    Default Customer Message (Pesan Pembuka Otomatis):
                  </label>
                  <textarea
                    rows={3}
                    value={defaultMessage}
                    onChange={(e) => setDefaultMessage(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-700 rounded-xl p-3 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 leading-relaxed"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: STORE MANAGEMENT */}
      {/* ========================================================================= */}
      {activeTab === "store" && (
        <div className="space-y-6 text-xs animate-in fade-in duration-200">
          <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900/90 border border-slate-200 dark:border-zinc-800 space-y-4 shadow-sm">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-zinc-800">
              <ShoppingBag className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Konfigurasi Toko & Faktur</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-zinc-300 mb-1.5">
                  Mata Uang Utama Toko (Store Currency):
                </label>
                <select
                  value={storeCurrency}
                  onChange={(e) => setStoreCurrency(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none"
                >
                  <option value="IDR">IDR (Rupiah Indonesia - Rp)</option>
                  <option value="USD">USD (US Dollar - $)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-zinc-300 mb-1.5">
                  Prefix Nomor Invoice / Faktur:
                </label>
                <input
                  type="text"
                  value={invoicePrefix}
                  onChange={(e) => setInvoicePrefix(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white font-mono font-bold focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-zinc-300 mb-1.5">
                Ketentuan Pengembalian Dana & Kebijakan Toko:
              </label>
              <textarea
                rows={3}
                value={refundPolicy}
                onChange={(e) => setRefundPolicy(e.target.value)}
                className="w-full bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-700 rounded-xl p-3 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 leading-relaxed"
              />
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: PAYOUT SETTINGS */}
      {/* ========================================================================= */}
      {activeTab === "payout" && (
        <div className="space-y-6 text-xs animate-in fade-in duration-200">
          <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900/90 border border-slate-200 dark:border-zinc-800 space-y-4 shadow-sm">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-zinc-800">
              <CreditCard className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Rekening Payout & Pencairan Dana</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-zinc-300 mb-1">
                  Pilih Bank / E-Wallet:
                </label>
                <select
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="Bank Central Asia (BCA)">Bank Central Asia (BCA)</option>
                  <option value="Bank Mandiri">Bank Mandiri</option>
                  <option value="Bank Negara Indonesia (BNI)">Bank Negara Indonesia (BNI)</option>
                  <option value="Bank Rakyat Indonesia (BRI)">Bank Rakyat Indonesia (BRI)</option>
                  <option value="GoPay Merchant">GoPay Merchant</option>
                  <option value="OVO Cash">OVO Cash</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-zinc-300 mb-1">
                  Nomor Rekening / No. HP:
                </label>
                <input
                  type="text"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white font-mono focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-zinc-300 mb-1">
                  Nama Pemilik Rekening (Sesuai Buku Tabungan):
                </label>
                <input
                  type="text"
                  value={accountHolder}
                  onChange={(e) => setAccountHolder(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white uppercase font-bold focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="pt-2">
              <label className="block font-semibold text-slate-700 dark:text-zinc-300 mb-1">
                Jadwal Pencairan Otomatis (Auto-Payout):
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: "weekly", label: "Setiap Hari Jumat" },
                  { id: "biweekly", label: "Tanggal 1 & 15" },
                  { id: "manual", label: "Manual Sesuai Request" },
                ].map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setPayoutSchedule(s.id)}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold transition cursor-pointer ${
                      payoutSchedule === s.id
                        ? "bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-950/80 dark:border-emerald-500 dark:text-emerald-400"
                        : "bg-slate-50 dark:bg-zinc-950 border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: ADVANCE SETTINGS */}
      {/* ========================================================================= */}
      {activeTab === "advance" && (
        <div className="space-y-6 text-xs animate-in fade-in duration-200">
          <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900/90 border border-slate-200 dark:border-zinc-800 space-y-4 shadow-sm">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-zinc-800">
              <Globe className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Custom Domain (CNAME Connection)</h3>
            </div>

            <div className="space-y-3">
              <label className="block font-semibold text-slate-700 dark:text-zinc-300">
                Nama Domain Khusus Profil Anda:
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={customDomain}
                  onChange={(e) => setCustomDomain(e.target.value)}
                  placeholder="links.studioanda.com"
                  className="flex-1 bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-700 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white font-mono focus:outline-none focus:border-indigo-500 font-bold"
                />
                <span className="px-3.5 py-2.5 rounded-xl bg-emerald-100 dark:bg-emerald-950 border border-emerald-300 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-1.5">
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>DNS Connected</span>
                </span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800/80 text-[11px] text-slate-600 dark:text-zinc-400 space-y-1">
                <p>
                  1. Tambahkan record CNAME di DNS Manager provider domain Anda:
                </p>
                <p className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                  Host: <code className="bg-slate-200 dark:bg-zinc-900 px-1 py-0.5 rounded">lynk</code> &bull; Target: <code className="bg-slate-200 dark:bg-zinc-900 px-1 py-0.5 rounded">cname.lynk.sinergivisual.com</code>
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-zinc-300 mb-1">
                  Custom Favicon:
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    ref={faviconInputRef}
                    accept="image/*"
                    className="hidden"
                    onChange={handleFaviconUpload}
                  />
                  <button
                    type="button"
                    onClick={() => faviconInputRef.current?.click()}
                    className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-slate-800 dark:text-white font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>Upload Favicon</span>
                  </button>
                  <input
                    type="text"
                    value={faviconUrl.startsWith("data:") ? "(Favicon Terunggah)" : faviconUrl}
                    onChange={(e) => setFaviconUrl(e.target.value)}
                    disabled={faviconUrl.startsWith("data:")}
                    className="flex-1 bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white font-mono focus:outline-none disabled:opacity-60"
                  />
                </div>
              </div>
              <div>
                <label className="block font-semibold text-slate-700 dark:text-zinc-300 mb-1">
                  Custom 404 Fallback Redirect URL:
                </label>
                <input
                  type="text"
                  value={redirect404}
                  onChange={(e) => setRedirect404(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white font-mono focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: SITE SETTINGS */}
      {/* ========================================================================= */}
      {activeTab === "site" && (
        <div className="space-y-6 text-xs animate-in fade-in duration-200">
          <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900/90 border border-slate-200 dark:border-zinc-800 space-y-4 shadow-sm">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-zinc-800">
              <Code className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Custom Code & Header Injection</h3>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-zinc-300 mb-1">
                Header HTML/JS Script Injection (&lt;head&gt;):
              </label>
              <textarea
                rows={3}
                value={headerScript}
                onChange={(e) => setHeaderScript(e.target.value)}
                className="w-full bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-700 rounded-xl p-3 text-cyan-600 dark:text-cyan-400 font-mono focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-zinc-300 mb-1">
                Custom CSS Stylesheet:
              </label>
              <textarea
                rows={3}
                value={customCss}
                onChange={(e) => setCustomCss(e.target.value)}
                className="w-full bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-700 rounded-xl p-3 text-emerald-600 dark:text-emerald-400 font-mono focus:outline-none"
              />
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900/90 border border-slate-200 dark:border-zinc-800 space-y-4 shadow-sm">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-zinc-800">
              <Lock className="w-4 h-4 text-rose-500 dark:text-rose-400" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Keamanan & Password Protection</h3>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800">
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">Kunci Halaman dengan Password</h4>
                <p className="text-[11px] text-slate-500 dark:text-zinc-400 mt-0.5">
                  Pengunjung harus memasukkan password untuk melihat halaman link profil internal tim
                </p>
              </div>
              <button
                type="button"
                onClick={() => setPasswordProtection(!passwordProtection)}
                className={`px-3 py-1.5 rounded-xl font-bold transition cursor-pointer ${
                  passwordProtection ? "bg-rose-500 text-white" : "bg-slate-200 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400"
                }`}
              >
                {passwordProtection ? "Protected" : "Public"}
              </button>
            </div>

            {passwordProtection && (
              <div>
                <label className="block font-semibold text-slate-700 dark:text-zinc-300 mb-1">
                  Password Akses:
                </label>
                <input
                  type="password"
                  value={sitePassword}
                  onChange={(e) => setSitePassword(e.target.value)}
                  placeholder="Masukkan password..."
                  className="w-full max-w-sm bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white font-mono focus:outline-none"
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 6: INTEGRATIONS */}
      {/* ========================================================================= */}
      {activeTab === "integrations" && (
        <div className="space-y-6 text-xs animate-in fade-in duration-200">
          <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900/90 border border-slate-200 dark:border-zinc-800 space-y-4 shadow-sm">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-zinc-800">
              <Shield className="w-4 h-4 text-amber-500 dark:text-amber-400" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Tracking Pixels & Analytics Integration</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-zinc-300 mb-1">
                  Meta Pixel ID (Facebook / Instagram Ads):
                </label>
                <input
                  type="text"
                  value={metaPixelId}
                  onChange={(e) => setMetaPixelId(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white font-mono focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-zinc-300 mb-1">
                  TikTok Pixel ID:
                </label>
                <input
                  type="text"
                  value={tiktokPixelId}
                  onChange={(e) => setTiktokPixelId(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white font-mono focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-zinc-300 mb-1">
                  Google Analytics 4 Measurement ID:
                </label>
                <input
                  type="text"
                  value={googleAnalyticsId}
                  onChange={(e) => setGoogleAnalyticsId(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white font-mono focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-zinc-300 mb-1">
                  Google Tag Manager (GTM ID):
                </label>
                <input
                  type="text"
                  value={googleTagManagerId}
                  onChange={(e) => setGoogleTagManagerId(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white font-mono focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-zinc-300 mb-1">
                Webhook Notification URL (Real-time order events):
              </label>
              <input
                type="text"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                className="w-full bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white font-mono focus:outline-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 7: MULTI ADMIN */}
      {/* ========================================================================= */}
      {activeTab === "multi-admin" && (
        <div className="space-y-6 text-xs animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
                <span>Manajemen Tim Multi-Admin</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
                Beri akses kolaborasi kepada editor video, manajer toko, dan finance studio Anda
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsInviteModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition cursor-pointer self-start sm:self-auto"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Undang Anggota Tim</span>
            </button>
          </div>

          {/* Members Table */}
          <div className="rounded-3xl bg-white dark:bg-zinc-900/90 border border-slate-200 dark:border-zinc-800 overflow-hidden shadow-sm">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-50 dark:bg-zinc-950 border-b border-slate-200 dark:border-zinc-800 text-slate-500 dark:text-zinc-400 font-semibold">
                  <th className="p-4">Nama Anggota</th>
                  <th className="p-4">Alamat Email</th>
                  <th className="p-4">Role Akses</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-zinc-800/60">
                {teamMembers.map((m) => (
                  <tr key={m.id} className="hover:bg-slate-50 dark:hover:bg-zinc-800/40 transition">
                    <td className="p-4 font-bold text-slate-900 dark:text-white">{m.name}</td>
                    <td className="p-4 font-mono text-slate-500 dark:text-zinc-400">{m.email}</td>
                    <td className="p-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                          m.role === "Owner"
                            ? "bg-amber-100 dark:bg-amber-950 border border-amber-300 dark:border-amber-500/40 text-amber-700 dark:text-amber-400"
                            : m.role === "Editor"
                            ? "bg-indigo-100 dark:bg-indigo-950 border border-indigo-300 dark:border-indigo-500/40 text-indigo-700 dark:text-indigo-400"
                            : "bg-emerald-100 dark:bg-emerald-950 border border-emerald-300 dark:border-emerald-500/40 text-emerald-700 dark:text-emerald-400"
                        }`}
                      >
                        {m.role}
                      </span>
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                          m.status === "Aktif"
                            ? "text-emerald-600 dark:text-emerald-400"
                            : "text-slate-400 dark:text-zinc-500 italic"
                        }`}
                      >
                        {m.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      {m.role !== "Owner" && (
                        <button
                          onClick={() => removeMember(m.id)}
                          className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition cursor-pointer"
                          title="Hapus Akses"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Save Success Toast */}
      {savedToast && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-emerald-500 text-zinc-950 font-bold text-xs shadow-2xl flex items-center gap-2 animate-in slide-in-from-bottom-5 duration-200">
          <CheckCircle2 className="w-5 h-5" />
          <span>Seluruh perubahan pengaturan berhasil disimpan ke cloud!</span>
        </div>
      )}

      {/* Invite Member Modal */}
      {isInviteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 p-6 shadow-2xl text-slate-900 dark:text-white animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Undang Anggota Tim Baru</h3>
              </div>
              <button
                onClick={() => setIsInviteModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:text-zinc-400 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleInviteSubmit} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-zinc-300 mb-1">
                  Nama Lengkap Anggota:
                </label>
                <input
                  type="text"
                  required
                  value={inviteName}
                  onChange={(e) => setInviteName(e.target.value)}
                  placeholder="Contoh: Budi Motion Editor"
                  className="w-full bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-zinc-300 mb-1">
                  Email Akun:
                </label>
                <input
                  type="email"
                  required
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="budi@sinergivisual.com"
                  className="w-full bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-zinc-300 mb-1">
                  Role Hak Akses:
                </label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value as any)}
                  className="w-full bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none"
                >
                  <option value="Admin">Admin (Akses Penuh Pengaturan & Toko)</option>
                  <option value="Editor">Editor (Kelola Link & Aset Digital)</option>
                  <option value="Finance">Finance (Akses Laporan & Rekening Payout)</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition cursor-pointer"
                >
                  Kirim Undangan Akses
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
