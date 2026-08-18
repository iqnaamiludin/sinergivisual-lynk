"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BrandLogo } from "@/components/brand-logo";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Download,
  ShoppingBag,
  BookOpen,
  Calendar,
  Video,
  Heart,
  Globe,
  BarChart3,
  Share2,
  Layers,
  MessageCircle,
  ShieldCheck,
  Star,
  ChevronRight,
  Smartphone,
  ExternalLink,
  Zap,
  Play,
  FileArchive,
  HelpCircle,
  ChevronDown,
  Plus,
} from "lucide-react";

export default function LandingPage() {
  const router = useRouter();
  const [usernameInput, setUsernameInput] = useState("");
  const [activeTab, setActiveTab] = useState<number>(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleCreateUsername = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanUsername = usernameInput.trim().toLowerCase().replace(/[^a-z0-9_-]/g, "");
    if (cleanUsername) {
      router.push(`/dashboard/builder?user=${cleanUsername}`);
    } else {
      router.push(`/dashboard/builder`);
    }
  };

  const creatorShowcases = [
    {
      name: "Sinergi Visual",
      handle: "@sinergivisual",
      role: "Video Production & Colorist Agency",
      followers: "250K+ Followers",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
      category: "Video Editor",
      featuredItem: "Cinematic LUTs Pack (Vol. 1)",
      tag: "Top Agency",
    },
    {
      name: "Dimas Motion Lab",
      handle: "@dimasmotion",
      role: "3D Motion Graphic & VFX Artist",
      followers: "140K+ Followers",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
      category: "Desain Grafis",
      featuredItem: "After Effects Neon Cyberpunk MOGRT",
      tag: "VFX Creator",
    },
    {
      name: "Clara UI Studio",
      handle: "@claradesign",
      role: "UI/UX & Design System Specialist",
      followers: "95K+ Followers",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80",
      category: "Desain Grafis",
      featuredItem: "Figma iOS 18 Design Kit",
      tag: "UI Kit",
    },
    {
      name: "Fikri EduFinansial",
      handle: "@fikrifinance",
      role: "Financial Planner & Ebook Creator",
      followers: "420K+ Followers",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80",
      category: "Edukasi Finansial",
      featuredItem: "Ebook Investasi Saham Pemula",
      tag: "Best Seller",
    },
    {
      name: "Alex Street Photography",
      handle: "@alexphotography",
      role: "Commercial & Portrait Photographer",
      followers: "110K+ Followers",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80",
      category: "Fotografi",
      featuredItem: "Lightroom Mobile Master Presets",
      tag: "Preset Pack",
    },
  ];

  const workflowTabs = [
    {
      id: "product",
      title: "Produk Digital",
      icon: ShoppingBag,
      headline: "Jual & Bagikan Berkas Digital Dalam Hitungan Detik",
      description:
        "Mulai dari LUTs (.cube), preset Lightroom, template MOGRT Premiere Pro, file 3D, hingga Ebook PDF. Pembeli langsung menerima file seketika dengan sistem download instan dan aman.",
      benefits: [
        "Pengiriman file digital otomatis 24/7 tanpa manual",
        "Mendukung pembayaran QRIS, Virtual Account, & E-Wallet",
        "Klaim produk gratis untuk kumpulkan email leads",
      ],
      mockupData: {
        badge: "PRODUK DIGITAL",
        title: "Cinematic Film LUTs Pack (Vol. 1)",
        price: "Rp 249.000",
        fileType: "ZIP • 45 MB • .CUBE",
        btnText: "Beli / Unduh Aset Sekarang",
      },
    },
    {
      id: "blog",
      title: "Blog & Artikel",
      icon: BookOpen,
      headline: "Publikasikan Pemikiran, Tutorial, & Studi Kasus",
      description:
        "Tulis artikel editorial, behind the scene produksi video, dan catatan teknis langsung di dalam profil bio Anda tanpa perlu setup server WordPress yang rumit.",
      benefits: [
        "Editor teks kaya dengan gambar & embed video",
        "Terindeks ramah SEO di Google & Bing",
        "Tingkatkan kredibilitas personal branding Anda",
      ],
      mockupData: {
        badge: "ARTIKEL TERBARU",
        title: "Behind The Scene: Color Grading Music Video 2026",
        price: "Gratis Baca",
        fileType: "5 Menit Baca • 1.4K Views",
        btnText: "Baca Artikel Lengkap",
      },
    },
    {
      id: "consultation",
      title: "Janji Temu 1-on-1",
      icon: Calendar,
      headline: "Buka Slot Konsultasi & Mentoring Berbayar",
      description:
        "Atur jadwal sesi diskusi proyek, review portofolio video editor, atau mentoring 1-on-1 dengan integrasi Google Meet otomatis dan pembayaran di muka.",
      benefits: [
        "Sinkronisasi kalender ketersediaan jadwal Anda",
        "Pembayaran otomatis sebelum sesi link dikirim",
        "Form kustom untuk pertanyaan pra-konsultasi",
      ],
      mockupData: {
        badge: "KONSULTASI 1-ON-1",
        title: "Sesi Portfolio Review & Mentoring Video Editor",
        price: "Rp 350.000 / 60 Menit",
        fileType: "Google Meet • 1-on-1",
        btnText: "Pilih Jadwal Sesi",
      },
    },
    {
      id: "course",
      title: "Kelas Video (Course)",
      icon: Video,
      headline: "Jual Kelas Video Eksklusif Tanpa Khawatir Bocor",
      description:
        "Upload modul pembelajaran, workshop masterclass, dan serial video tutorial dengan sistem akses terenkripsi khusus murid terdaftar.",
      benefits: [
        "Player video responsif dengan proteksi unduhan ilegal",
        "Modul materi bertahap & lampiran berkas aset proyek",
        "Dashboard pemantauan progres belajar murid",
      ],
      mockupData: {
        badge: "KELAS ONLINE",
        title: "DaVinci Resolve Color Grading Mastery 2026",
        price: "Rp 499.000",
        fileType: "24 Video Modul • Full HD",
        btnText: "Daftar Kelas Sekarang",
      },
    },
    {
      id: "webinar",
      title: "Event & Webinar",
      icon: Zap,
      headline: "Jual Tiket Workshop Online & Seminar",
      description:
        "Kelola registrasi peserta acara kreatif, pembagian link Zoom/YouTube Live privat, dan kirim tiket digital otomatis ke email peserta.",
      benefits: [
        "Kapasitas kuota tiket otomatis berkurang saat terbeli",
        "Reminder otomatis via WhatsApp sebelum acara dimulai",
        "Dukungan tiket Early Bird & kupon diskon voucher",
      ],
      mockupData: {
        badge: "WEBINAR LIVE",
        title: "Sinergi Visual Creator Summit 2026",
        price: "Rp 99.000",
        fileType: "Zoom Live • 24 Ags 2026",
        btnText: "Beli Tiket Webinar",
      },
    },
    {
      id: "donation",
      title: "Dukungan & Tip",
      icon: Heart,
      headline: "Terima Apresiasi Tip & Donasi Dari Penikmat Karya",
      description:
        "Beri wadah bagi audiens setia di YouTube, TikTok, dan Instagram untuk mentraktir kopi atau mendukung karya Anda secara sukarela.",
      benefits: [
        "Mulai dari Rp 5.000 via QRIS & E-Wallet instan",
        "Pesan penyemangat dari fans tampil langsung di notifikasi",
        "Pencairan dana kapan saja ke rekening bank lokal",
      ],
      mockupData: {
        badge: "SUPPORT CREATOR",
        title: "Traktir Kopi Tim Sinergi Visual ☕",
        price: "Mulai Rp 10.000",
        fileType: "QRIS • GoPay • OVO • Dana",
        btnText: "Kirim Dukungan Tip",
      },
    },
  ];

  const testimonials = [
    {
      name: "Reza Pratama",
      role: "Video Director & Commercial Editor",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      content:
        "Sinergi Visual Lynk mengubah cara tim studio kami mendistribusikan LUTs dan template Premiere. Pengunjung bio TikTok langsung download tanpa ribet, omset naik 300% dalam sebulan!",
      rating: 5,
    },
    {
      name: "Amanda Kirana",
      role: "Digital Content Creator & Podcaster",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80",
      content:
        "Dulu harus bayar 4 platform berbeda untuk jualan ebook, booking konsultasi, dan link bio. Sekarang semuanya beres di satu link Sinergi Visual Lynk dengan UI yang bersih banget.",
      rating: 5,
    },
    {
      name: "Budi Santoso",
      role: "Lead Motion Designer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
      content:
        "Fitur video embed yang bisa diputar langsung di halaman bio itu game changer! Klien bisa nonton showreel 4K kami tanpa terlempar keluar aplikasi Instagram.",
      rating: 5,
    },
    {
      name: "Siti Rahmawati",
      role: "Financial Educator & Author",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80",
      content:
        "Sistem checkout-nya super cepat dengan QRIS. Pembaca ebook saya dari berbagai kota di Indonesia bisa langsung transaksi dalam 10 detik tanpa registrasi berbelit.",
      rating: 5,
    },
    {
      name: "Hendra Wijaya",
      role: "Sound Designer & Audio Producer",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
      content:
        "Pembagian aset Sound FX gratis berhasil mengumpulkan lebih dari 1.400 leads email kreatif yang sekarang jadi pembeli setia paket sound master kami!",
      rating: 5,
    },
    {
      name: "Kevin Ardiansyah",
      role: "UI/UX Mentor & Freelancer",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80",
      content:
        "Kustomisasi temanya sangat fleksibel. Saya bisa pakai warna brand studio sendiri, font Roboto yang tajam, dan domain custom yang bikin klien makin percaya.",
      rating: 5,
    },
  ];

  const faqs = [
    {
      q: "Apakah membuat akun di Sinergi Visual Lynk gratis?",
      a: "Ya, 100% Gratis! Anda dapat langsung membuat halaman bio, mengupload link portofolio, membagikan aset digital gratis, dan mulai menerima pembayaran tanpa biaya langganan bulanan di paket awal.",
    },
    {
      q: "Bagaimana cara menerima pembayaran dari pembeli?",
      a: "Sinergi Visual Lynk terintegrasi dengan berbagai metode pembayaran populer Indonesia seperti QRIS (GoPay, OVO, Dana, ShopeePay), Transfer Virtual Account (BCA, Mandiri, BNI, BRI), hingga kartu kredit. Dana penjualan akan langsung masuk ke saldo akun Anda dan dapat ditarik ke rekening bank lokal kapan saja.",
    },
    {
      q: "Berapa potongan biaya transaksi penjualan?",
      a: "Untuk produk digital dan kelas berbayar, kami menerapkan skema bagi hasil transparan yang sangat kompetitif tanpa biaya tersembunyi. Khusus pembagian aset gratis, Anda tidak dikenakan biaya apapun.",
    },
    {
      q: "Apakah saya bisa menggunakan nama domain sendiri (Custom Domain)?",
      a: "Tentu saja! Anda bisa menghubungkan domain pribadi seperti links.studioanda.com dengan mudah melalui menu Settings -> Advance Settings hanya dengan menambahkan record DNS CNAME.",
    },
    {
      q: "Aset dan jenis file apa saja yang didukung?",
      a: "Semua jenis file kreatif didukung! Mulai dari arsip ZIP, LUTs (.cube), audio WAV/MP3, video MP4, template MOGRT/AEP, preset Lightroom (.dng/.xmp), dokumen PDF, hingga 3D assets (.obj/.fbx).",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0E17] text-zinc-900 dark:text-zinc-100 font-sans selection:bg-[#00C170] selection:text-white flex flex-col justify-between overflow-x-hidden transition-colors duration-200">
      {/* ========================================================================= */}
      {/* A. HEADER & NAVIGATION BAR */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-50 w-full bg-white/90 dark:bg-[#0A0E17]/90 backdrop-blur-md border-b border-zinc-100 dark:border-zinc-800/80 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Logo Brand (Dynamic Theme Switcher) */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative flex items-center">
              <BrandLogo
                className="h-9 sm:h-10 w-auto object-contain group-hover:scale-105 transition duration-200"
                priority
              />
            </div>
          </Link>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-zinc-600 dark:text-zinc-300">
            <a href="#features" className="hover:text-[#00C170] dark:hover:text-[#00C170] transition">
              Layanan
            </a>
            <a href="#creators" className="hover:text-[#00C170] dark:hover:text-[#00C170] transition">
              Kreator
            </a>
            <a href="#workflow" className="hover:text-[#00C170] dark:hover:text-[#00C170] transition">
              Fitur
            </a>
            <a href="#testimonials" className="hover:text-[#00C170] dark:hover:text-[#00C170] transition">
              Testimoni
            </a>
            <a href="#faq" className="hover:text-[#00C170] dark:hover:text-[#00C170] transition">
              FAQ
            </a>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle Button */}
            <ThemeToggle />

            <Link
              href="/login"
              className="px-4 py-2 text-sm font-bold text-zinc-700 dark:text-zinc-300 hover:text-[#00C170] dark:hover:text-[#00C170] transition"
            >
              Masuk
            </Link>

            <Link
              href="/dashboard/builder"
              className="px-5 py-2.5 rounded-full bg-[#00C170] hover:bg-[#00a862] text-white font-extrabold text-xs tracking-wider uppercase shadow-lg shadow-[#00C170]/30 hover:scale-105 active:scale-95 transition cursor-pointer"
            >
              DAFTAR GRATIS
            </Link>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* B. HERO SECTION */}
      {/* ========================================================================= */}
      <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-32 bg-gradient-to-b from-[#EBF7F4]/70 dark:from-emerald-950/20 via-white dark:via-[#0A0E17] to-white dark:to-[#0A0E17] overflow-hidden transition-colors duration-200">
        {/* Subtle Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#00C170]/10 dark:bg-[#00C170]/15 blur-[140px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content (7 Cols) */}
            <div className="lg:col-span-7 text-center lg:text-left space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00C170]/10 border border-[#00C170]/30 text-[#00C170] text-xs font-bold shadow-sm">
                <Sparkles className="w-4 h-4" />
                <span>#1 Platform Bio Link & Monetisasi Kreator Indonesia</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-zinc-950 dark:text-white tracking-tight leading-[1.12]">
                Mendukung Ekonomi{" "}
                <span className="bg-gradient-to-r from-[#00C170] via-emerald-500 to-teal-500 bg-clip-text text-transparent">
                  Kreator Indonesia.
                </span>
              </h1>

              {/* Subheadline */}
              <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Buat halaman web instan untuk menjual karya & keahlianmu. Bagikan aset digital, kelas online, konsultasi, dan terima pembayaran langsung dari satu link bio.
              </p>

              {/* Input Pembuat Username Cepat */}
              <form
                onSubmit={handleCreateUsername}
                className="max-w-md mx-auto lg:mx-0 pt-2"
              >
                <div className="p-2 bg-white dark:bg-zinc-900 rounded-full border-2 border-[#00C170]/40 shadow-xl shadow-[#00C170]/10 flex items-center justify-between focus-within:border-[#00C170] transition">
                  <div className="flex items-center pl-4 font-mono font-bold text-sm text-zinc-400 dark:text-zinc-500">
                    <span>lynk.id/</span>
                    <input
                      type="text"
                      value={usernameInput}
                      onChange={(e) => setUsernameInput(e.target.value)}
                      placeholder="username-kamu"
                      className="w-full bg-transparent text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none pl-1 font-bold text-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-3 rounded-full bg-[#00C170] hover:bg-[#00a862] text-white font-extrabold text-xs tracking-wider uppercase shrink-0 transition shadow-md shadow-[#00C170]/30 hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    Buat Sekarang
                  </button>
                </div>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-2 text-center lg:text-left pl-2">
                  ✨ Gratis selamanya &bull; Tanpa perlu kartu kredit &bull; Setup 2 menit
                </p>
              </form>

              {/* Social proof metric */}
              <div className="pt-6 flex items-center justify-center lg:justify-start gap-8 border-t border-zinc-200/80 dark:border-zinc-800">
                <div>
                  <p className="text-2xl font-black text-zinc-950 dark:text-white">50.000+</p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Kreator Terdaftar</p>
                </div>
                <div className="w-px h-8 bg-zinc-200 dark:bg-zinc-800" />
                <div>
                  <p className="text-2xl font-black text-[#00C170]">Rp 25M+</p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Dana Terdistribusi</p>
                </div>
                <div className="w-px h-8 bg-zinc-200 dark:bg-zinc-800" />
                <div>
                  <p className="text-2xl font-black text-zinc-950 dark:text-white">4.9/5</p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Kepuasan Pengguna</p>
                </div>
              </div>
            </div>

            {/* Right Visual: 3D Floating Smartphone Mockup (5 Cols) */}
            <div className="lg:col-span-5 flex justify-center relative">
              {/* Glow Behind Mockup */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#00C170]/30 to-teal-400/20 blur-3xl rounded-full scale-90" />

              {/* Phone Frame */}
              <div className="relative w-[320px] sm:w-[340px] h-[640px] bg-[#0A100D] rounded-[48px] p-3 ring-1 ring-black/10 shadow-[0_30px_70px_-15px_rgba(0,193,112,0.25),0_0_40px_rgba(0,0,0,0.15)] border-[5px] border-zinc-800 flex flex-col justify-between select-none transform hover:-translate-y-2 transition duration-500">
                {/* Screen */}
                <div className="w-full h-full bg-zinc-950 rounded-[38px] overflow-hidden flex flex-col justify-between text-white p-4 border border-zinc-800/80 relative">
                  {/* Dynamic Island */}
                  <div className="w-24 h-5 bg-black rounded-full mx-auto mb-3 flex items-center justify-center gap-1.5 border border-white/10">
                    <span className="w-2 h-2 rounded-full bg-[#00C170]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                  </div>

                  {/* Profile Header */}
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#00C170] shadow-md">
                        <img
                          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"
                          alt="Sinergi Visual"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CheckCircle2 className="w-4 h-4 fill-[#00C170] text-black absolute bottom-0 right-0" />
                    </div>

                    <div>
                      <h3 className="font-bold text-sm text-white">Sinergi Visual</h3>
                      <p className="text-[10px] text-emerald-400 font-mono">@sinergivisual</p>
                      <p className="text-[10px] text-zinc-400 mt-1 max-w-[220px] leading-tight">
                        Creative Video Agency & Free Assets Vault
                      </p>
                    </div>
                  </div>

                  {/* Sample Interactive Block Cards */}
                  <div className="space-y-2.5 my-auto">
                    {/* Block 1: Product */}
                    <div className="p-3 rounded-2xl bg-gradient-to-r from-emerald-950/80 to-zinc-900 border border-[#00C170]/40 flex items-center justify-between shadow-md">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-xl bg-[#00C170] text-zinc-950 font-bold">
                          <Sparkles className="w-4 h-4" />
                        </div>
                        <div className="text-left">
                          <span className="text-[9px] font-black uppercase text-[#00C170] bg-black/60 px-1 rounded">
                            FREE DOWNLOAD
                          </span>
                          <p className="text-xs font-bold text-white leading-tight mt-0.5">
                            Cinematic Film LUTs Pack
                          </p>
                        </div>
                      </div>
                      <Download className="w-4 h-4 text-emerald-400 shrink-0" />
                    </div>

                    {/* Block 2: Video Embed */}
                    <div className="p-2.5 rounded-2xl bg-zinc-900/90 border border-zinc-800 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-xl bg-rose-950 border border-rose-500/30 text-rose-400">
                          <Play className="w-4 h-4 fill-current" />
                        </div>
                        <div className="text-left">
                          <p className="text-xs font-bold text-white">Official Showreel 2026</p>
                          <p className="text-[10px] text-zinc-400">4K Commercial Showcase</p>
                        </div>
                      </div>
                      <span className="text-[9px] font-mono text-zinc-500">16:9</span>
                    </div>

                    {/* Block 3: Consultation */}
                    <div className="p-3 rounded-2xl bg-zinc-900/90 border border-zinc-800 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-xl bg-indigo-950 text-indigo-400">
                          <MessageCircle className="w-4 h-4" />
                        </div>
                        <div className="text-left">
                          <p className="text-xs font-bold text-white">Diskusi Proyek Video</p>
                          <p className="text-[10px] text-zinc-400">Respon via WhatsApp 1x24 Jam</p>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-zinc-500" />
                    </div>
                  </div>

                  {/* Watermark Footer */}
                  <div className="text-center pt-2">
                    <span className="text-[9px] font-bold text-zinc-500 bg-zinc-900 px-3 py-1 rounded-full border border-zinc-800">
                      Powered by Sinergi Visual Lynk
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* C. SECTION: KREATOR TERBAIK MENGGUNAKAN SINERGI VISUAL LYNK */}
      {/* ========================================================================= */}
      <section id="creators" className="py-20 bg-zinc-50 dark:bg-[#070A10] border-y border-zinc-200/80 dark:border-zinc-800/80 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <span className="px-3.5 py-1 rounded-full bg-[#00C170]/10 text-[#00C170] text-xs font-black uppercase tracking-wider">
              KREATOR TERBAIK
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-zinc-950 dark:text-white tracking-tight">
              Lihat bagaimana para kreator terbaik membangun bisnis mereka
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Bergabunglah bersama ribuan video editor, desainer, edukator finansial, dan creative studio terkemuka di Indonesia.
            </p>
          </div>

          {/* Showcase Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {creatorShowcases.map((c, i) => (
              <div
                key={i}
                className="p-6 rounded-3xl bg-white dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800 hover:border-[#00C170] shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300 flex flex-col justify-between space-y-5"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3.5">
                      <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-zinc-100 dark:border-zinc-800 shadow-sm">
                        <img
                          src={c.avatar}
                          alt={c.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-1">
                          <h3 className="font-bold text-base text-zinc-950 dark:text-white">{c.name}</h3>
                          <CheckCircle2 className="w-4 h-4 fill-[#00C170] text-white" />
                        </div>
                        <p className="text-xs font-mono font-bold text-[#00C170]">{c.handle}</p>
                        <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">{c.role}</p>
                      </div>
                    </div>
                  </div>

                  {/* Featured Item Box */}
                  <div className="mt-5 p-3.5 rounded-2xl bg-[#EBF7F4]/60 dark:bg-emerald-950/20 border border-[#00C170]/20">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold text-zinc-500 dark:text-zinc-400 uppercase">Produk Unggulan:</span>
                      <span className="px-2 py-0.5 rounded-md bg-[#00C170] text-white font-extrabold text-[9px] uppercase">
                        {c.tag}
                      </span>
                    </div>
                    <p className="text-xs font-black text-zinc-900 dark:text-white mt-1">
                      {c.featuredItem}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-zinc-800 text-xs">
                  <span className="font-bold text-zinc-500 dark:text-zinc-400">{c.followers}</span>
                  <Link
                    href={`/sinergivisual`}
                    className="font-extrabold text-[#00C170] hover:text-[#00a862] flex items-center gap-1 transition"
                  >
                    <span>Lihat Halaman Bio</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* D. SECTION: BUKAN SEKADAR LINK-IN-BIO BIASA (INTERACTIVE TABS) */}
      {/* ========================================================================= */}
      <section id="features" className="py-24 bg-white dark:bg-[#0A0E17] transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
            <span className="px-3.5 py-1 rounded-full bg-[#00C170]/10 text-[#00C170] text-xs font-black uppercase tracking-wider">
              FITUR MONETISASI LENGKAP
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-zinc-950 dark:text-white tracking-tight leading-tight">
              Bukan sekadar link-in-bio biasa.
            </h2>
            <p className="text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">
              Sinergi Visual Lynk menangani seluruh alur kerja Anda dari awal distribusi hingga menghasilkan cuan otomatis.
            </p>
          </div>

          {/* Horizontal Interactive Tab Switcher */}
          <div className="flex items-center justify-start lg:justify-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-12">
            {workflowTabs.map((tab, idx) => {
              const Icon = tab.icon;
              const isActive = activeTab === idx;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(idx)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-full text-xs font-extrabold whitespace-nowrap transition cursor-pointer ${
                    isActive
                      ? "bg-[#00C170] text-white shadow-lg shadow-[#00C170]/25 scale-105"
                      : "bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.title}</span>
                </button>
              );
            })}
          </div>

          {/* Active Tab Showcase Box */}
          <div className="p-8 lg:p-12 rounded-[36px] bg-gradient-to-br from-[#EBF7F4]/80 dark:from-zinc-900/90 via-white dark:via-zinc-900 to-[#EBF7F4]/40 dark:to-zinc-950 border border-[#00C170]/20 dark:border-zinc-800 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Detail (7 Cols) */}
              <div className="lg:col-span-7 space-y-6">
                <div className="w-12 h-12 rounded-2xl bg-[#00C170] text-white flex items-center justify-center shadow-md">
                  {React.createElement(workflowTabs[activeTab].icon, { className: "w-6 h-6" })}
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-zinc-950 dark:text-white leading-tight">
                  {workflowTabs[activeTab].headline}
                </h3>

                <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal">
                  {workflowTabs[activeTab].description}
                </p>

                <div className="space-y-3 pt-2">
                  {workflowTabs[activeTab].benefits.map((b, i) => (
                    <div key={i} className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                      <div className="w-5 h-5 rounded-full bg-[#00C170]/20 text-[#00C170] flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5 fill-current text-white" />
                      </div>
                      <span>{b}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4">
                  <Link
                    href="/dashboard/builder"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-zinc-950 dark:bg-emerald-500 hover:bg-zinc-800 dark:hover:bg-emerald-400 text-white dark:text-zinc-950 text-xs font-bold uppercase tracking-wider shadow-lg hover:scale-105 active:scale-95 transition"
                  >
                    <span>Mulai Pasang di Bio Anda</span>
                    <ArrowRight className="w-4 h-4 text-[#00C170] dark:text-zinc-950" />
                  </Link>
                </div>
              </div>

              {/* Right Phone Mockup Preview (5 Cols) */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="w-[280px] sm:w-[300px] bg-[#0A100D] rounded-[40px] p-3 border-[4px] border-zinc-800 shadow-2xl">
                  <div className="w-full bg-zinc-950 rounded-[30px] p-4 text-white space-y-4">
                    <div className="w-16 h-4 bg-black rounded-full mx-auto" />
                    
                    <div className="text-center space-y-1">
                      <div className="w-12 h-12 rounded-full overflow-hidden mx-auto border-2 border-[#00C170]">
                        <img
                          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-xs font-bold">@sinergivisual</p>
                    </div>

                    {/* Tab specific mockup card */}
                    <div className="p-4 rounded-2xl bg-zinc-900 border border-[#00C170]/40 space-y-3 shadow-md">
                      <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase bg-[#00C170] text-zinc-950">
                        {workflowTabs[activeTab].mockupData.badge}
                      </span>
                      <h4 className="text-xs font-bold text-white">
                        {workflowTabs[activeTab].mockupData.title}
                      </h4>
                      <div className="flex items-center justify-between text-[11px] text-zinc-400">
                        <span className="font-mono text-[#00C170] font-bold">
                          {workflowTabs[activeTab].mockupData.price}
                        </span>
                        <span>{workflowTabs[activeTab].mockupData.fileType}</span>
                      </div>
                      <button className="w-full py-2.5 rounded-xl bg-[#00C170] text-zinc-950 font-black text-xs">
                        {workflowTabs[activeTab].mockupData.btnText}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* E. SECTION: FEATURE HIGHLIGHTS */}
      {/* ========================================================================= */}
      <section id="workflow" className="py-20 bg-zinc-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-8 rounded-3xl bg-zinc-900/80 border border-zinc-800 space-y-4 hover:border-[#00C170]/40 transition">
              <div className="w-12 h-12 rounded-2xl bg-[#00C170]/10 border border-[#00C170]/30 flex items-center justify-center text-[#00C170]">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Gunakan Domain Anda Sendiri</h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal">
                Gunakan domain kustom seperti <code className="text-emerald-400 font-mono">links.namastudio.com</code> untuk kredibilitas personal branding dan agency Anda.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 rounded-3xl bg-zinc-900/80 border border-zinc-800 space-y-4 hover:border-[#00C170]/40 transition">
              <div className="w-12 h-12 rounded-2xl bg-indigo-950/80 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Dapatkan Wawasan & Statistik Akurat</h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal">
                Pantau jumlah kunjungan, klik per link, konversi aset, kota pengunjung, dan performa lalu lintas secara real-time.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 rounded-3xl bg-zinc-900/80 border border-zinc-800 space-y-4 hover:border-[#00C170]/40 transition">
              <div className="w-12 h-12 rounded-2xl bg-rose-950/80 border border-rose-500/30 flex items-center justify-center text-rose-400">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Tingkatkan Penjualan Digital</h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal">
                Terhubung ke WhatsApp Broadcast, Instagram, TikTok, dan integrasi Meta Pixel untuk retargeting iklan berbayar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* F. SECTION: APA KATA MEREKA TENTANG KAMI (TESTIMONIALS) */}
      {/* ========================================================================= */}
      <section id="testimonials" className="py-24 bg-white dark:bg-[#0A0E17] transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <span className="px-3.5 py-1 rounded-full bg-[#00C170]/10 text-[#00C170] text-xs font-black uppercase tracking-wider">
              TESTIMONI KREATOR
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-zinc-950 dark:text-white tracking-tight">
              Apa Kata Mereka
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">
              Tidak perlu lagi membayar 5+ aplikasi berbeda. Sinergi Visual Lynk menghadirkan semuanya dalam satu tempat.
            </p>
          </div>

          {/* Testimonial Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="p-6 rounded-3xl bg-zinc-50 dark:bg-zinc-900/70 border border-zinc-200/80 dark:border-zinc-800 hover:border-[#00C170]/60 hover:shadow-lg transition duration-200 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.rating)].map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed italic font-normal">
                    &ldquo;{t.content}&rdquo;
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-3 border-t border-zinc-200 dark:border-zinc-800">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover border border-zinc-300 dark:border-zinc-700"
                  />
                  <div>
                    <h4 className="font-bold text-xs text-zinc-950 dark:text-white">{t.name}</h4>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* G. SECTION: 6 FITUR UTAMA & CTA BANNER */}
      {/* ========================================================================= */}
      <section className="py-20 bg-gradient-to-b from-[#EBF7F4]/60 dark:from-emerald-950/20 to-white dark:to-[#0A0E17] transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl font-black text-zinc-950 dark:text-white tracking-tight">
              Bagaimana Kreator Menggunakan Platform Ini
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Solusi all-in-one yang dirancang khusus untuk memenuhi semua kebutuhan kreator modern.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
            {[
              { label: "Produk Digital", desc: "Aset & Template" },
              { label: "Kelas Virtual", desc: "Course Video" },
              { label: "Donasi & Tip", desc: "Apresiasi Karya" },
              { label: "Semua Link", desc: "Portofolio Lengkap" },
              { label: "Konsultasi 1-on-1", desc: "Booking Jadwal" },
              { label: "Kustom Penuh", desc: "Tema & Font Bebas" },
            ].map((f, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-[#00C170]/30 dark:border-zinc-800 shadow-sm flex flex-col justify-center items-center space-y-1.5"
              >
                <div className="w-8 h-8 rounded-full bg-[#00C170]/10 text-[#00C170] flex items-center justify-center font-bold text-xs">
                  ✓
                </div>
                <h4 className="text-xs font-black text-zinc-950 dark:text-white">{f.label}</h4>
                <p className="text-[10px] text-zinc-500 dark:text-zinc-400">{f.desc}</p>
              </div>
            ))}
          </div>

          {/* Large CTA Box */}
          <div className="p-8 sm:p-14 rounded-[40px] bg-gradient-to-r from-[#00C170] to-teal-600 text-white text-center space-y-6 shadow-2xl shadow-[#00C170]/30">
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight max-w-3xl mx-auto leading-tight">
              Siap Mengembangkan Bisnis Kreatif Anda Sekarang?
            </h2>
            <p className="text-sm sm:text-base text-white/90 max-w-xl mx-auto font-medium">
              Bergabung gratis dalam 2 menit. Mulai bagikan portofolio dan jual aset digital Anda hari ini.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/dashboard/builder"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-zinc-950 hover:bg-zinc-900 text-white font-extrabold text-xs tracking-wider uppercase shadow-xl hover:scale-105 active:scale-95 transition cursor-pointer"
              >
                DAFTAR SEKARANG GRATIS!
              </Link>
              <Link
                href="/sinergivisual"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/20 hover:bg-white/30 text-white font-bold text-xs tracking-wider uppercase transition backdrop-blur-md"
              >
                Lihat Contoh Bio Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* FAQ SECTION */}
      {/* ========================================================================= */}
      <section id="faq" className="py-20 bg-white dark:bg-[#0A0E17] border-t border-zinc-100 dark:border-zinc-800 transition-colors duration-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3">
            <span className="px-3.5 py-1 rounded-full bg-[#00C170]/10 text-[#00C170] text-xs font-black uppercase tracking-wider">
              FAQ
            </span>
            <h2 className="text-3xl font-black text-zinc-950 dark:text-white tracking-tight">
              Pertanyaan yang Sering Diajukan
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden transition"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-5 text-left font-bold text-sm text-zinc-900 dark:text-zinc-100 flex items-center justify-between gap-4 hover:bg-zinc-50 dark:hover:bg-zinc-900/60 transition cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-zinc-500 transition-transform duration-200 ${
                      openFaq === idx ? "rotate-180 text-[#00C170]" : ""
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="p-5 pt-0 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed border-t border-zinc-100 dark:border-zinc-800 bg-[#EBF7F4]/30 dark:bg-emerald-950/10">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* H. FOOTER */}
      {/* ========================================================================= */}
      <footer className="bg-zinc-950 text-white pt-16 pb-12 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-3 md:col-span-2">
              <div className="flex items-center gap-2">
                <BrandLogo
                  forceTheme="dark"
                  className="h-8 w-auto object-contain brightness-110"
                />
              </div>
              <p className="text-xs text-zinc-400 max-w-sm leading-relaxed font-normal">
                Platform bio link & ekosistem monetisasi kreator terbaik di Indonesia. Kelola link portofolio, kelas online, dan distribusikan aset digital Anda secara mudah.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Produk & Layanan</h4>
              <ul className="space-y-2 text-xs text-zinc-400">
                <li><Link href="/dashboard/builder" className="hover:text-[#00C170] transition">Builder Workspace</Link></li>
                <li><Link href="/dashboard/appearance" className="hover:text-[#00C170] transition">Kustomisasi Tema</Link></li>
                <li><Link href="/dashboard/orders" className="hover:text-[#00C170] transition">Manajemen Pesanan</Link></li>
                <li><Link href="/sinergivisual" className="hover:text-[#00C170] transition">Demo Bio Kreator</Link></li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Legal & Bantuan</h4>
              <ul className="space-y-2 text-xs text-zinc-400">
                <li><Link href="/dashboard/settings" className="hover:text-[#00C170] transition">Kebijakan Privasi</Link></li>
                <li><Link href="/dashboard/settings" className="hover:text-[#00C170] transition">Syarat & Ketentuan</Link></li>
                <li><Link href="/dashboard/tutorials" className="hover:text-[#00C170] transition">Pusat Bantuan & Tutorial</Link></li>
                <li><a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="hover:text-[#00C170] transition">Hubungi Kami (WhatsApp)</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 font-medium">
            <p>© {new Date().getFullYear()} Sinergi Visual Lynk. Seluruh hak cipta dilindungi.</p>
            <p className="text-[11px]">Dibuat dengan ❤️ untuk Kreator Indonesia</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
