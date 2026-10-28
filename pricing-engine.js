/**
 * KLIRSTUDIO - Multi-Category Interactive Pricing Engine
 * 7 Specialized Categories x 3 Structured Tiers (Starter, Standard, Pro)
 * Precision Indonesian Market Economics & Dynamic WhatsApp Link Generation
 */

(function () {
  'use strict';

  const PRICING_CATALOG = {
    'landing-page': {
      categoryName: { id: 'Landing Page', en: 'Landing Page' },
      tiers: [
        {
          tierKey: 'starter',
          name: { id: 'Starter Mini', en: 'Starter Mini' },
          badge: null,
          price: 'Rp199 Ribu',
          strikePrice: 'Rp350 Ribu',
          deliveryTime: { id: '1–2 Hari Kerja', en: '1–2 Working Days' },
          description: {
            id: 'Cocok untuk jualan 1 produk, flyer event, atau biodata pro',
            en: 'Ideal for 1 product, event flyer, or quick bio showcase',
          },
          features: [
            { text: { id: '1 Halaman Single Scroll Ringkas & Padat', en: '1 Clean Single Scroll Focused Page' }, highlight: false },
            { text: { id: 'Desain Responsif & Mobile-Friendly', en: 'Responsive Mobile-First Design' }, highlight: false },
            { text: { id: 'Tombol Order Direct ke WhatsApp', en: 'Direct WhatsApp Order Button' }, highlight: true },
            { text: { id: 'Subdomain Cepat & Hosting Cloud Gratis', en: 'Fast Subdomain & Free Cloud Hosting' }, highlight: true },
            { text: { id: 'Garansi Teknis & Revisi Minor 1x', en: 'Technical Warranty & 1x Minor Revision' }, highlight: false },
          ],
          ctaText: { id: 'Pilih Paket Starter', en: 'Choose Starter' },
          featured: false,
          waText: 'Halo KLIRSTUDIO, saya tertarik paket Landing Page varian Starter Mini (Rp199 Ribu).',
        },
        {
          tierKey: 'standard',
          name: { id: 'Standard UMKM', en: 'Standard UMKM' },
          badge: { id: 'Paling Populer', en: 'Most Popular' },
          price: 'Rp699 Ribu',
          strikePrice: 'Rp950 Ribu',
          deliveryTime: { id: '2–3 Hari Kerja', en: '2–3 Working Days' },
          description: {
            id: 'Penawaran lengkap untuk UMKM, kuliner & jasa lokal',
            en: 'Complete offer for local services, F&B & SMEs',
          },
          features: [
            { text: { id: 'Sales Page Lengkap (Hero, USP, Testimoni, FAQ)', en: 'Full Sales Page (Hero, USP, Testimonial, FAQ)' }, highlight: false },
            { text: { id: 'Copywriting Persuasif Penataan Penjualan', en: 'Persuasive Sales Copywriting Layout' }, highlight: true },
            { text: { id: 'Integrasi WhatsApp Multi-Admin', en: 'Multi-Admin WhatsApp Integration' }, highlight: false },
            { text: { id: 'Domain Bisnis .my.id / .biz.id & Hosting 1 Tahun', en: 'Business Domain & 1-Year Cloud Hosting' }, highlight: true },
            { text: { id: 'Integrasi Google Maps & Media Sosial', en: 'Google Maps & Social Media Integration' }, highlight: false },
            { text: { id: 'Garansi Teknis & Revisi 2x', en: 'Technical Warranty & 2x Revisions' }, highlight: false },
          ],
          ctaText: { id: 'Pilih Paket Standard', en: 'Choose Standard' },
          featured: true,
          waText: 'Halo KLIRSTUDIO, saya tertarik paket Landing Page varian Standard UMKM (Rp699 Ribu).',
        },
        {
          tierKey: 'pro',
          name: { id: 'Pro Funnel & Ads', en: 'Pro Funnel & Ads' },
          badge: { id: 'Best for Ads', en: 'Best for Ads' },
          price: 'Rp1,29 Juta',
          strikePrice: 'Rp1,8 Juta',
          deliveryTime: { id: '3–5 Hari Kerja', en: '3–5 Working Days' },
          description: {
            id: 'Optimasi kampanye iklan berbayar (Meta & Google Ads)',
            en: 'Optimized for paid ad campaigns (Meta & Google)',
          },
          features: [
            { text: { id: 'Desain Eksklusif Custom UI/UX + Micro-Animations', en: 'Exclusive Custom UI/UX + Micro-Animations' }, highlight: false },
            { text: { id: 'Formula Copywriting AIDA Konversi Tinggi', en: 'High-Converting AIDA Sales Formula' }, highlight: false },
            { text: { id: 'Domain .com Resmi & Cloud Hosting Cepat 1 Tahun', en: 'Official .com Domain & 1-Year Fast Hosting' }, highlight: true },
            { text: { id: 'Pemasangan Meta Pixel, TikTok & Google Analytics', en: 'Meta Pixel, TikTok & Google Analytics Tracking' }, highlight: true },
            { text: { id: 'Fitur Countdown Timer & Form Leads', en: 'Urgency Countdown Timer & Lead Form' }, highlight: false },
            { text: { id: 'Garansi Teknis 30 Hari & Revisi 3x', en: '30-Day Tech Warranty & 3x Revisions' }, highlight: false },
          ],
          ctaText: { id: 'Pilih Paket Pro', en: 'Choose Pro' },
          featured: false,
          waText: 'Halo KLIRSTUDIO, saya tertarik paket Landing Page varian Pro Funnel & Ads (Rp1,29 Juta).',
        },
      ],
    },

    'company-profile': {
      categoryName: { id: 'Company Profile', en: 'Company Profile' },
      tiers: [
        {
          tierKey: 'starter',
          name: { id: 'Lite Profile', en: 'Lite Profile' },
          badge: null,
          price: 'Rp1,79 Juta',
          strikePrice: 'Rp2,5 Juta',
          deliveryTime: { id: '3–4 Hari Kerja', en: '3–4 Working Days' },
          description: {
            id: 'Syarat legalitas tender, profil usaha rintisan & CV baru',
            en: 'Startup credibility, tender verification, new ventures',
          },
          features: [
            { text: { id: 'Hingga 3 Halaman Utama (Home, Layanan, Kontak)', en: 'Up to 3 Core Pages (Home, Services, Contact)' }, highlight: false },
            { text: { id: 'Desain Elegan Sesuai Warna Identitas Brand', en: 'Clean Elegant Design Matching Brand Colors' }, highlight: false },
            { text: { id: 'Domain .com Resmi & Cloud Hosting 1 Tahun', en: 'Official .com Domain & 1-Year Hosting' }, highlight: true },
            { text: { id: '1 Akun Email Bisnis Resmi (info@nama.com)', en: '1 Official Business Email Account' }, highlight: true },
            { text: { id: 'Google Maps Interaktif & Floating WA Button', en: 'Interactive Google Maps & Floating WA' }, highlight: false },
            { text: { id: 'Garansi Teknis & Revisi 2x', en: 'Technical Warranty & 2x Revisions' }, highlight: false },
          ],
          ctaText: { id: 'Pilih Lite Profile', en: 'Choose Lite' },
          featured: false,
          waText: 'Halo KLIRSTUDIO, saya tertarik paket Company Profile varian Lite Profile (Rp1,79 Juta).',
        },
        {
          tierKey: 'standard',
          name: { id: 'Business Pro', en: 'Business Pro' },
          badge: { id: 'Paling Populer', en: 'Most Popular' },
          price: 'Rp3,29 Juta',
          strikePrice: 'Rp4,5 Juta',
          deliveryTime: { id: '5–7 Hari Kerja', en: '5–7 Working Days' },
          description: {
            id: 'Profil perusahaan lengkap dengan CMS kelola konten sendiri',
            en: 'Full corporate presence with self-managed CMS',
          },
          features: [
            { text: { id: '5–7 Halaman Profil (About, Layanan, Portofolio, Blog)', en: '5–7 Profile Pages (About, Services, Portfolio, Blog)' }, highlight: false },
            { text: { id: 'CMS Admin Panel (Bisa Update Konten & Foto Sendiri)', en: 'Easy CMS Admin Panel to Update Content' }, highlight: true },
            { text: { id: '3 Akun Email Bisnis Resmi (direktur@, marketing@)', en: '3 Official Business Email Accounts' }, highlight: false },
            { text: { id: 'Optimasi SEO On-Page Dasar Google', en: 'Core Google SEO On-Page Optimization' }, highlight: true },
            { text: { id: 'Domain .com & Hosting Prioritas 1 Tahun', en: 'Domain .com & Priority Hosting 1 Year' }, highlight: true },
            { text: { id: 'Tombol Unduh Brosur PDF & Garansi 30 Hari', en: 'Downloadable PDF Brochure & 30-Day Warranty' }, highlight: false },
          ],
          ctaText: { id: 'Tingkatkan Kredibilitas', en: 'Elevate Credibility' },
          featured: true,
          waText: 'Halo KLIRSTUDIO, saya tertarik paket Company Profile varian Business Pro (Rp3,29 Juta).',
        },
        {
          tierKey: 'pro',
          name: { id: 'Corporate Enterprise', en: 'Corporate Enterprise' },
          badge: { id: 'Enterprise', en: 'Enterprise' },
          price: 'Rp5,90 Juta',
          strikePrice: 'Rp7,9 Juta',
          deliveryTime: { id: '10–14 Hari Kerja', en: '10–14 Working Days' },
          description: {
            id: 'Skala korporat besar, pabrik, multi-cabang & pasar ekspor',
            en: 'Large enterprises, factories, multi-branch & exporters',
          },
          features: [
            { text: { id: 'Struktur Halaman Bebas Sesuai Seluruh Divisi', en: 'Unlimited Custom Page Structure by Division' }, highlight: false },
            { text: { id: 'Dukungan Multi-Bahasa (Bilingual ID & EN)', en: 'Bilingual Multi-Language Support (ID & EN)' }, highlight: true },
            { text: { id: 'Formulir Permintaan Penawaran Harga (RFQ)', en: 'Automated RFQ Quote Request Form' }, highlight: true },
            { text: { id: 'Halaman Karir & Rekrutmen Lowongan Kerja', en: 'Career & Recruitment Portal Page' }, highlight: false },
            { text: { id: 'Keamanan Tingkat Tinggi (WAF Firewall & Anti-DDoS)', en: 'Enterprise Security (WAF & Anti-DDoS)' }, highlight: false },
            { text: { id: 'Dukungan Prioritas & Garansi 60 Hari', en: 'Priority SLA Support & 60-Day Warranty' }, highlight: false },
          ],
          ctaText: { id: 'Pilih Enterprise', en: 'Choose Enterprise' },
          featured: false,
          waText: 'Halo KLIRSTUDIO, saya tertarik paket Company Profile varian Corporate Enterprise (Rp5,90 Juta).',
        },
      ],
    },

    'e-commerce': {
      categoryName: { id: 'E-Commerce', en: 'E-Commerce' },
      tiers: [
        {
          tierKey: 'starter',
          name: { id: 'Toko WhatsApp', en: 'WhatsApp Catalog' },
          badge: null,
          price: 'Rp2,49 Juta',
          strikePrice: 'Rp3,5 Juta',
          deliveryTime: { id: '4–6 Hari Kerja', en: '4–6 Working Days' },
          description: {
            id: 'Katalog produk praktis, checkout langsung ke WhatsApp',
            en: 'Practical catalog with instant WhatsApp checkout',
          },
          features: [
            { text: { id: 'Katalog Produk Dinamis hingga 50 Barang', en: 'Dynamic Product Catalog up to 50 Items' }, highlight: false },
            { text: { id: 'Keranjang Belanja Ringan (Add to Cart)', en: 'Lightweight Add-to-Cart Shopping Bag' }, highlight: false },
            { text: { id: 'Checkout Otomatis ke WhatsApp Admin + Format Order', en: 'Instant WhatsApp Checkout with Order Summary' }, highlight: true },
            { text: { id: 'Admin Panel Mudah Kelola Barang dari HP', en: 'Easy Mobile-Friendly Admin Management' }, highlight: true },
            { text: { id: 'Domain .com Resmi & Hosting 1 Tahun', en: 'Official .com Domain & 1-Year Hosting' }, highlight: true },
            { text: { id: 'Tanpa Biaya Admin Transaksi Bank', en: 'Zero Bank Gateway Transaction Fees' }, highlight: false },
          ],
          ctaText: { id: 'Buka Toko WhatsApp', en: 'Launch WA Store' },
          featured: false,
          waText: 'Halo KLIRSTUDIO, saya tertarik paket Toko WhatsApp (Rp2,49 Juta).',
        },
        {
          tierKey: 'standard',
          name: { id: 'Online Store Standar', en: 'Standard Online Store' },
          badge: { id: 'Paling Populer', en: 'Most Popular' },
          price: 'Rp5,89 Juta',
          strikePrice: 'Rp7,5 Juta',
          deliveryTime: { id: '7–10 Hari Kerja', en: '7–10 Working Days' },
          description: {
            id: 'Payment gateway QRIS & cek ongkir ekspedisi otomatis',
            en: 'Automated QRIS payment & live courier shipping rates',
          },
          features: [
            { text: { id: 'Payment Gateway Otomatis (QRIS, VA Bank, E-Wallet)', en: 'Automated Payment Gateway (QRIS, VA, E-Wallet)' }, highlight: true },
            { text: { id: 'Cek Ongkir Otomatis (JNE, J&T, SiCepat, dll)', en: 'Live Shipping Calculator (JNE, J&T, SiCepat)' }, highlight: true },
            { text: { id: 'Manajemen Stok Otomatis Berkurang Saat Bayar', en: 'Automated Real-Time Stock Inventory' }, highlight: false },
            { text: { id: 'Notifikasi Invoice Otomatis via WA & Email', en: 'Automated WA & Email Invoice Alerts' }, highlight: false },
            { text: { id: 'Fitur Kupon Diskon & Voucher Promo', en: 'Discount Coupon & Promo Voucher System' }, highlight: false },
            { text: { id: 'Domain .com + Cloud Bisnis 1 Tahun + Garansi 30 Hari', en: 'Domain .com + Cloud Business Hosting 1 Year' }, highlight: false },
          ],
          ctaText: { id: 'Bangun Toko Otomatis', en: 'Build Automated Store' },
          featured: true,
          waText: 'Halo KLIRSTUDIO, saya tertarik paket Online Store Standar (Rp5,89 Juta).',
        },
        {
          tierKey: 'pro',
          name: { id: 'Brand Commerce Custom', en: 'Brand Commerce Custom' },
          badge: { id: 'Advanced', en: 'Advanced' },
          price: 'Rp10,90 Juta',
          strikePrice: 'Rp14,5 Juta',
          deliveryTime: { id: '14–21 Hari Kerja', en: '14–21 Working Days' },
          description: {
            id: 'Sistem member loyalitas, multi-gudang & reseller grosir',
            en: 'Loyalty member system, multi-warehouse & reseller',
          },
          features: [
            { text: { id: 'Sistem Member Tier & Poin Belanja (Loyalty Points)', en: 'Tiered Member Loyalty Points Reward System' }, highlight: true },
            { text: { id: 'Multi-Warehouse (Kirim dari Cabang Terdekat)', en: 'Multi-Warehouse Proximity Shipping' }, highlight: true },
            { text: { id: 'Akun Khusus Reseller & Dropshipper Berjenjang', en: 'Approved Reseller & Dropshipper Account Tiers' }, highlight: false },
            { text: { id: 'Laporan Penjualan Lanjutan & Ekspor Excel', en: 'Advanced Financial Reporting & Excel Export' }, highlight: false },
            { text: { id: 'Server Dedicated Cloud Kinerja Tinggi', en: 'Dedicated High-Performance Cloud Server' }, highlight: false },
            { text: { id: 'Garansi Teknis Prioritas 60 Hari', en: '60-Day Priority Maintenance SLA' }, highlight: false },
          ],
          ctaText: { id: 'Konsultasi Toko Brand', en: 'Consult Brand Store' },
          featured: false,
          waText: 'Halo KLIRSTUDIO, saya tertarik paket Brand Commerce Custom (Rp10,90 Juta).',
        },
      ],
    },

    'booking': {
      categoryName: { id: 'Booking & Jadwal', en: 'Booking & Scheduling' },
      tiers: [
        {
          tierKey: 'starter',
          name: { id: 'Quick Booking WA', en: 'Quick Booking WA' },
          badge: null,
          price: 'Rp1,69 Juta',
          strikePrice: 'Rp2,3 Juta',
          deliveryTime: { id: '3–4 Hari Kerja', en: '3–4 Working Days' },
          description: {
            id: 'Pilih jadwal & paket layanan, detail langsung ke WA admin',
            en: 'Select schedule and service, sent directly to admin WA',
          },
          features: [
            { text: { id: 'Tampilan Katalog Layanan & Foto Servis', en: 'Service Catalog & Portfolio Showcase' }, highlight: false },
            { text: { id: 'Formulir Pilih Tanggal & Jam Reservasi', en: 'Select Date & Time Booking Form' }, highlight: true },
            { text: { id: 'Kirim Rekapan Pesanan Rapi ke WhatsApp', en: 'Clean Structured Order Format to WhatsApp' }, highlight: true },
            { text: { id: 'Domain .com Resmi & Hosting 1 Tahun', en: 'Official .com Domain & 1-Year Hosting' }, highlight: true },
            { text: { id: 'Garansi Teknis & Revisi 2x', en: 'Technical Warranty & 2x Revisions' }, highlight: false },
          ],
          ctaText: { id: 'Pilih Quick Booking', en: 'Choose Quick Booking' },
          featured: false,
          waText: 'Halo KLIRSTUDIO, saya tertarik paket Booking varian Quick Booking WA (Rp1,69 Juta).',
        },
        {
          tierKey: 'standard',
          name: { id: 'Auto Calendar Schedule', en: 'Auto Calendar Schedule' },
          badge: { id: 'Paling Populer', en: 'Most Popular' },
          price: 'Rp3,49 Juta',
          strikePrice: 'Rp4,5 Juta',
          deliveryTime: { id: '5–7 Hari Kerja', en: '5–7 Working Days' },
          description: {
            id: 'Slot jam terkunci otomatis saat terisi, tanpa bentrok',
            en: 'Slots lock automatically when booked, zero double-booking',
          },
          features: [
            { text: { id: 'Kalender Interaktif Real-Time (Slot Otomatis Terkunci)', en: 'Live Calendar (Booked Slots Lock Automatically)' }, highlight: true },
            { text: { id: 'Batasan Kuota Maksimal Per Jam / Sesi', en: 'Maximum Capacity Limit per Session' }, highlight: false },
            { text: { id: 'Sinkronisasi Otomatis Google Calendar Admin', en: 'Google Calendar Two-Way Synchronization' }, highlight: true },
            { text: { id: 'Dashboard Kelola Jadwal & Pelanggan', en: 'Dashboard to Manage Bookings & Customers' }, highlight: false },
            { text: { id: 'Domain .com + Cloud Hosting 1 Tahun', en: 'Domain .com + Cloud Hosting 1 Year' }, highlight: true },
            { text: { id: 'Garansi Teknis 30 Hari', en: '30-Day Technical Warranty' }, highlight: false },
          ],
          ctaText: { id: 'Aktifkan Kalender Booking', en: 'Enable Auto Calendar' },
          featured: true,
          waText: 'Halo KLIRSTUDIO, saya tertarik paket Booking varian Auto Calendar Schedule (Rp3,49 Juta).',
        },
        {
          tierKey: 'pro',
          name: { id: 'Full Auto + DP QRIS', en: 'Full Auto + DP QRIS' },
          badge: { id: 'All-In-One', en: 'All-In-One' },
          price: 'Rp5,99 Juta',
          strikePrice: 'Rp7,5 Juta',
          deliveryTime: { id: '8–12 Hari Kerja', en: '8–12 Working Days' },
          description: {
            id: 'Wajib bayar DP via QRIS agar slot terkunci + reminder WA',
            en: 'Mandatory QRIS down payment + WhatsApp reminders',
          },
          features: [
            { text: { id: 'Pembayaran DP / Lunas Otomatis via QRIS & Transfer', en: 'Automated DP / Full Payment via QRIS & Bank' }, highlight: true },
            { text: { id: 'Pengingat Otomatis H-1 via WhatsApp Gateway', en: 'Automated H-1 WhatsApp Appointment Reminders' }, highlight: true },
            { text: { id: 'Multi-Staff / Multi-Cabang (Pilih Terapis/Dokter/Kursi)', en: 'Multi-Staff / Multi-Chair Selection by Client' }, highlight: false },
            { text: { id: 'Laporan Pendapatan Booking & Rekap Bulanan', en: 'Monthly Revenue & Booking Analytics' }, highlight: false },
            { text: { id: 'Garansi Teknis & Pemeliharaan 60 Hari', en: '60-Day Technical Maintenance SLA' }, highlight: false },
          ],
          ctaText: { id: 'Pilih Full Auto Booking', en: 'Choose Full Auto' },
          featured: false,
          waText: 'Halo KLIRSTUDIO, saya tertarik paket Booking varian Full Auto + DP QRIS (Rp5,99 Juta).',
        },
      ],
    },

    'portfolio': {
      categoryName: { id: 'Portofolio Personal', en: 'Personal Portfolio' },
      tiers: [
        {
          tierKey: 'starter',
          name: { id: 'Link-in-Bio Pro', en: 'Link-in-Bio Pro' },
          badge: null,
          price: 'Rp199 Ribu',
          strikePrice: 'Rp300 Ribu',
          deliveryTime: { id: '1 Hari Kerja', en: '1 Working Day' },
          description: {
            id: 'Pengganti Linktree yang berkelas, elegan, dan tanpa watermark',
            en: 'Elegant watermark-free Linktree alternative',
          },
          features: [
            { text: { id: 'Halaman Bio Profil Minimalis & Mewah', en: 'Minimalist & Luxurious Profile Page' }, highlight: false },
            { text: { id: 'Showcase 6 Karya Terbaik / Galeri Grid', en: 'Showcase 6 Top Works in Visual Grid' }, highlight: false },
            { text: { id: 'Kumpulan Link Media Sosial & Kontak', en: 'Custom Social Links & Quick Contact Buttons' }, highlight: true },
            { text: { id: 'Subdomain Gratis & Hosting Cepat Selamanya', en: 'Free Subdomain & Fast Free Hosting' }, highlight: true },
            { text: { id: 'Revisi Minor 1x', en: '1x Minor Revision' }, highlight: false },
          ],
          ctaText: { id: 'Bikin Link-in-Bio', en: 'Create Link-in-Bio' },
          featured: false,
          waText: 'Halo KLIRSTUDIO, saya tertarik paket Portofolio varian Link-in-Bio Pro (Rp199 Ribu).',
        },
        {
          tierKey: 'standard',
          name: { id: 'Creative Showcase', en: 'Creative Showcase' },
          badge: { id: 'Paling Populer', en: 'Most Popular' },
          price: 'Rp649 Ribu',
          strikePrice: 'Rp850 Ribu',
          deliveryTime: { id: '2–3 Hari Kerja', en: '2–3 Working Days' },
          description: {
            id: 'Galeri karya visual resolusi tinggi dengan filter kategori',
            en: 'High-res visual gallery with multi-category filters',
          },
          features: [
            { text: { id: 'Galeri Portofolio Resolusi Tinggi dengan Filter', en: 'High-Res Portfolio Gallery with Category Tabs' }, highlight: true },
            { text: { id: 'Bagian Studi Kasus (Penjelasan Solusi & Hasil)', en: 'Case Study Sections (Problem, Solution, Results)' }, highlight: false },
            { text: { id: 'Bagian Ulasan / Testimoni Klien', en: 'Client Testimonial Showcase' }, highlight: false },
            { text: { id: 'Domain Bisnis .my.id & Cloud Hosting 1 Tahun', en: 'Business Domain .my.id & 1-Year Hosting' }, highlight: true },
            { text: { id: 'Garansi Teknis & Revisi 2x', en: 'Technical Warranty & 2x Revisions' }, highlight: false },
          ],
          ctaText: { id: 'Pilih Creative Showcase', en: 'Choose Creative' },
          featured: true,
          waText: 'Halo KLIRSTUDIO, saya tertarik paket Portofolio varian Creative Showcase (Rp649 Ribu).',
        },
        {
          tierKey: 'pro',
          name: { id: 'VIP Personal Brand', en: 'VIP Personal Brand' },
          badge: { id: 'Domain .com', en: 'Domain .com' },
          price: 'Rp1,49 Juta',
          strikePrice: 'Rp1,9 Juta',
          deliveryTime: { id: '3–4 Hari Kerja', en: '3–4 Working Days' },
          description: {
            id: 'Website domain nama sendiri untuk dokter, konsultan & speaker',
            en: 'Custom personal domain for specialists & consultants',
          },
          features: [
            { text: { id: 'Domain Resmi Nama Sendiri (namaanda.com)', en: 'Official Custom Domain (yourname.com)' }, highlight: true },
            { text: { id: 'Email Pribadi Resmi (halo@namaanda.com)', en: 'Official Personal Email (hello@yourname.com)' }, highlight: true },
            { text: { id: 'Desain Eksklusif dengan Transisi Halus Dark/Light', en: 'Exclusive Dark/Light UI with Smooth Transitions' }, highlight: false },
            { text: { id: 'Formulir Kerja Sama / Undangan Pembicara', en: 'Collaboration & Keynote Speaker Booking Form' }, highlight: false },
            { text: { id: 'Garansi Teknis 30 Hari & Revisi 3x', en: '30-Day Technical Warranty & 3x Revisions' }, highlight: false },
          ],
          ctaText: { id: 'Bangun Brand Pribadi', en: 'Build Personal Brand' },
          featured: false,
          waText: 'Halo KLIRSTUDIO, saya tertarik paket Portofolio varian VIP Personal Brand (Rp1,49 Juta).',
        },
      ],
    },

    'yayasan': {
      categoryName: { id: 'Sekolah & Yayasan', en: 'School & Foundation' },
      tiers: [
        {
          tierKey: 'starter',
          name: { id: 'Profil Lembaga', en: 'Institution Profile' },
          badge: null,
          price: 'Rp1,89 Juta',
          strikePrice: 'Rp2,5 Juta',
          deliveryTime: { id: '4–5 Hari Kerja', en: '4–5 Working Days' },
          description: {
            id: 'Profil resmi yayasan, panti asuhan, masjid & komunitas',
            en: 'Official profile for non-profits, mosques & communities',
          },
          features: [
            { text: { id: 'Halaman Profil, Visi-Misi, Struktur Pengurus', en: 'Profile, Vision-Mission & Board Structure' }, highlight: false },
            { text: { id: 'Galeri Kegiatan & Dokumentasi Program Sosial', en: 'Program Documentation & Photo Gallery' }, highlight: false },
            { text: { id: 'Rekening Resmi & Barcode QRIS Donasi Langsung', en: 'Official Bank Accounts & Direct QRIS Donation' }, highlight: true },
            { text: { id: 'Pilihan Domain .or.id / .sch.id / .com + Hosting', en: 'Domain Choice (.or.id / .sch.id / .com) + Hosting' }, highlight: true },
            { text: { id: 'Garansi Teknis & Revisi 2x', en: 'Technical Warranty & 2x Revisions' }, highlight: false },
          ],
          ctaText: { id: 'Pilih Profil Lembaga', en: 'Choose Profile' },
          featured: false,
          waText: 'Halo KLIRSTUDIO, saya tertarik paket Sekolah/Yayasan varian Profil Lembaga (Rp1,89 Juta).',
        },
        {
          tierKey: 'standard',
          name: { id: 'Lembaga + PPDB Online', en: 'School + PPDB Online' },
          badge: { id: 'Paling Populer', en: 'Most Popular' },
          price: 'Rp3,89 Juta',
          strikePrice: 'Rp4,8 Juta',
          deliveryTime: { id: '7–9 Hari Kerja', en: '7–9 Working Days' },
          description: {
            id: 'Formulir pendaftaran siswa/santri baru online siap pakai',
            en: 'Complete online student admission registration system',
          },
          features: [
            { text: { id: 'Formulir PPDB Online Lengkap dengan Upload Berkas', en: 'Online Admission Form with Document Upload' }, highlight: true },
            { text: { id: 'Dashboard Rekap Data Pendaftar Siap Ekspor Excel', en: 'Applicant Database Dashboard with Excel Export' }, highlight: true },
            { text: { id: 'Konfirmasi Pendaftaran Otomatis ke WhatsApp Wali', en: 'Automated WhatsApp Registration Confirmation' }, highlight: false },
            { text: { id: 'Modul Berita, Prestasi & Pengumuman Sekolah', en: 'News, Achievements & Notice Board Module' }, highlight: false },
            { text: { id: 'Domain Resmi (.sch.id / .com) & Cloud Hosting 1 Tahun', en: 'Official Domain & 1-Year Cloud Hosting' }, highlight: true },
            { text: { id: 'Garansi Teknis 30 Hari', en: '30-Day Technical Warranty' }, highlight: false },
          ],
          ctaText: { id: 'Buka Portal PPDB', en: 'Launch PPDB Portal' },
          featured: true,
          waText: 'Halo KLIRSTUDIO, saya tertarik paket Sekolah/Yayasan varian Lembaga + PPDB Online (Rp3,89 Juta).',
        },
        {
          tierKey: 'pro',
          name: { id: 'Portal Institusi Terpadu', en: 'Integrated Portal' },
          badge: { id: 'Full System', en: 'Full System' },
          price: 'Rp6,89 Juta',
          strikePrice: 'Rp8,8 Juta',
          deliveryTime: { id: '10–14 Hari Kerja', en: '10–14 Working Days' },
          description: {
            id: 'Donasi transparan, portal alumni & jadwal pelajaran santri',
            en: 'Transparent donations, alumni portal & study schedules',
          },
          features: [
            { text: { id: 'Sistem Donasi Transparan dengan Progress Bar', en: 'Transparent Donation System with Target Progress' }, highlight: true },
            { text: { id: 'Direktori Database Alumni & Pengajar', en: 'Alumni & Faculty Directory Database' }, highlight: false },
            { text: { id: 'Portal Jadwal & Pengumuman Orang Tua Murid', en: 'Parent Notice Board & Schedule Portal' }, highlight: false },
            { text: { id: 'Multi-User Admin dengan Batasan Akses Berbeda', en: 'Role-Based Multi-Admin Access Control' }, highlight: false },
            { text: { id: 'Garansi Teknis & Pendampingan 60 Hari', en: '60-Day Technical Support & Training SLA' }, highlight: false },
          ],
          ctaText: { id: 'Pilih Portal Terpadu', en: 'Choose Integrated' },
          featured: false,
          waText: 'Halo KLIRSTUDIO, saya tertarik paket Sekolah/Yayasan varian Portal Institusi Terpadu (Rp6,89 Juta).',
        },
      ],
    },

    'news': {
      categoryName: { id: 'Portal Berita', en: 'News & Media' },
      tiers: [
        {
          tierKey: 'starter',
          name: { id: 'Blog Bisnis / Niche', en: 'Business Blog' },
          badge: null,
          price: 'Rp1,49 Juta',
          strikePrice: 'Rp2,0 Juta',
          deliveryTime: { id: '3–4 Hari Kerja', en: '3–4 Working Days' },
          description: {
            id: 'Publikasi artikel edukasi bisnis, gaya hidup & portofolio tulisan',
            en: 'Clean publishing for articles, lifestyle & reviews',
          },
          features: [
            { text: { id: 'Tampilan Bacaan Bersih & Fokus Tipografi', en: 'Clean Typography-First Reading Experience' }, highlight: false },
            { text: { id: 'Kategori Topik, Tag & Profil Penulis Artikel', en: 'Category Topics, Tags & Author Bio Profiles' }, highlight: false },
            { text: { id: 'Tombol Share Instan ke WhatsApp & Media Sosial', en: 'One-Click Social & WhatsApp Share Buttons' }, highlight: true },
            { text: { id: 'Domain .com Resmi & Hosting 1 Tahun', en: 'Official .com Domain & 1-Year Hosting' }, highlight: true },
            { text: { id: 'Garansi Teknis & Revisi 2x', en: 'Technical Warranty & 2x Revisions' }, highlight: false },
          ],
          ctaText: { id: 'Mulai Blog Bisnis', en: 'Start Business Blog' },
          featured: false,
          waText: 'Halo KLIRSTUDIO, saya tertarik paket Portal Berita varian Blog Bisnis (Rp1,49 Juta).',
        },
        {
          tierKey: 'standard',
          name: { id: 'Portal Berita Standar', en: 'Standard News Portal' },
          badge: { id: 'Paling Populer', en: 'Most Popular' },
          price: 'Rp3,29 Juta',
          strikePrice: 'Rp4,3 Juta',
          deliveryTime: { id: '5–7 Hari Kerja', en: '5–7 Working Days' },
          description: {
            id: 'Layout mirip portal besar, slot iklan AdSense & CMS HP',
            en: 'Editorial news layout, AdSense slots & mobile CMS',
          },
          features: [
            { text: { id: 'Layout Portal Berita (Headline Utama, Terkini, Populer)', en: 'Editorial Grid (Top Headline, Recent, Trending)' }, highlight: true },
            { text: { id: 'Slot Khusus Penempatan Iklan Google AdSense & Banner', en: 'Optimized Slots for Google AdSense & Banners' }, highlight: true },
            { text: { id: 'CMS Mudah (Bisa Buat Berita Langsung dari HP)', en: 'Easy Mobile CMS to Post News from Phone' }, highlight: false },
            { text: { id: 'Domain .com + Cloud Hosting Berita 1 Tahun', en: 'Domain .com + News Cloud Hosting 1 Year' }, highlight: true },
            { text: { id: 'Optimasi SEO Artikel Google', en: 'On-Page News Article SEO Optimization' }, highlight: false },
            { text: { id: 'Garansi Teknis 30 Hari', en: '30-Day Technical Warranty' }, highlight: false },
          ],
          ctaText: { id: 'Luncurkan Media Online', en: 'Launch News Media' },
          featured: true,
          waText: 'Halo KLIRSTUDIO, saya tertarik paket Portal Berita varian Portal Berita Standar (Rp3,29 Juta).',
        },
        {
          tierKey: 'pro',
          name: { id: 'Media Publisher Pro', en: 'Media Publisher Pro' },
          badge: { id: 'Google News', en: 'Google News' },
          price: 'Rp6,49 Juta',
          strikePrice: 'Rp8,5 Juta',
          deliveryTime: { id: '10–14 Hari Kerja', en: '10–14 Working Days' },
          description: {
            id: 'Standar Google News, sistem redaksi wartawan & anti down',
            en: 'Google News standard, multi-reporter editorial workflow',
          },
          features: [
            { text: { id: 'Standar Optimasi Google News & XML Sitemap Berita', en: 'Google News Indexing & News XML Sitemap' }, highlight: true },
            { text: { id: 'Sistem Redaksi Berjenjang (Wartawan -> Editor -> Tayang)', en: 'Multi-Tier Redaction Workflow (Reporter -> Editor)' }, highlight: true },
            { text: { id: 'Server Cloud Skalabilitas Tinggi (Anti Down Saat Viral)', en: 'High-Traffic Cloud Infrastructure' }, highlight: false },
            { text: { id: 'Fitur Live Streaming Video Embed & Podcast Embed', en: 'Live Video Embed & Podcast Player Embed' }, highlight: false },
            { text: { id: 'Garansi Teknis Prioritas 60 Hari', en: '60-Day Priority Technical Support' }, highlight: false },
          ],
          ctaText: { id: 'Pilih Publisher Pro', en: 'Choose Publisher Pro' },
          featured: false,
          waText: 'Halo KLIRSTUDIO, saya tertarik paket Portal Berita varian Media Publisher Pro (Rp6,49 Juta).',
        },
      ],
    },
  };

  let activeCategory = 'landing-page';

  function renderPricingCards(categoryKey) {
    const cat = PRICING_CATALOG[categoryKey];
    if (!cat) return;

    const currentLang = document.body.getAttribute('data-lang') || 'id';

    // Update live active category indicator badge
    const activeBadge = document.getElementById('pricing-active-cat-name');
    if (activeBadge && cat.categoryName) {
      activeBadge.textContent = cat.categoryName[currentLang] || cat.categoryName.id;
    }

    const grid = document.getElementById('pricing-cards-grid');
    if (!grid) return;

    // Trigger smooth fade-in animation
    grid.classList.remove('gl-pricing-fade-in');
    void grid.offsetWidth;
    grid.classList.add('gl-pricing-fade-in');

    grid.innerHTML = cat.tiers
      .map((tier) => {
        // Distinctive featured highlight for popular tier
        const cardClass = tier.featured ? 'gl-pricing-card gl-pricing-card--featured' : 'gl-pricing-card';
        const ctaClass = tier.featured ? 'gl-cta-btn gl-cta-btn--featured' : 'gl-cta-btn';

        const tierIcons = {
          starter: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>`,
          standard: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="7" x="3" y="3" rx="1"/><rect width="9" height="7" x="3" y="14" rx="1"/><rect width="5" height="7" x="16" y="14" rx="1"/></svg>`,
          pro: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>`,
        };
        const tierIconSvg = tierIcons[tier.tierKey] || tierIcons.standard;

        const popularBadge = tier.badge
          ? `<span class="gl-badge-popular">
               <span>${tier.badge[currentLang] || tier.badge.id}</span>
             </span>`
          : '';

        const featuresHtml = tier.features
          .map((f) => {
            const text = f.text[currentLang] || f.text.id;
            const content = f.highlight
              ? `<strong>${text}</strong>`
              : `<span>${text}</span>`;
            return `
            <div class="gl-feature-item">
              <svg stroke="currentColor" fill="none" stroke-width="2.2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              <span>${content}</span>
            </div>
          `;
          })
          .join('');

        const waHref = `https://wa.me/6281977241552?text=${encodeURIComponent(tier.waText)}`;
        const tierName = tier.name[currentLang] || tier.name.id;
        const deliveryText = tier.deliveryTime[currentLang] || tier.deliveryTime.id;
        const descText = tier.description[currentLang] || tier.description.id;
        const ctaLabel = tier.ctaText[currentLang] || tier.ctaText.id;

        return `
        <div class="${cardClass}">
          <div class="gl-card-inner">
            <div class="gl-card-top">
              <!-- Top Row: Squircle Icon & Badges Group (Matches Section 1 Architecture) -->
              <div class="gl-card-top-bar">
                <div class="gl-card-squircle" aria-hidden="true">
                  ${tierIconSvg}
                </div>
                <div class="gl-card-badges-group">
                  ${popularBadge}
                  <div class="gl-delivery-badge">
                    <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="12" width="12" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    <span>${deliveryText}</span>
                  </div>
                </div>
              </div>

              <!-- Full-Width Card Title (Never Blows Out Track) -->
              <h3 class="gl-card-title">${tierName}</h3>

              <!-- Price Block -->
              <div class="gl-price-row">
                <span class="gl-price-strike">${tier.strikePrice}</span>
                <span class="gl-price-amount">${tier.price}</span>
              </div>

              <p class="gl-card-desc">${descText}</p>

              <!-- Feature Checklist -->
              <div class="gl-features-list">
                ${featuresHtml}
              </div>
            </div>

            <!-- CTA Pill Button -->
            <div class="gl-card-bottom">
              <a href="${waHref}" target="_blank" rel="noopener noreferrer" class="${ctaClass}" aria-label="${ctaLabel}">
                <span>${ctaLabel}</span>
              </a>
            </div>
          </div>
        </div>
      `;
      })
      .join('');
  }

  function initPricingEngine() {
    const navButtons = document.querySelectorAll('.pricing-cat-btn');
    if (!navButtons || navButtons.length === 0) return;

    navButtons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const cat = btn.getAttribute('data-category');
        if (!cat || cat === activeCategory) return;

        // Update active classes
        navButtons.forEach((b) => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        activeCategory = cat;
        renderPricingCards(activeCategory);

        // Smoothly scroll only the category navigation container if overflowed, NEVER the window/viewport
        const navContainer = document.querySelector('.pricing-cat-nav-wrap');
        if (navContainer && navContainer.scrollWidth > navContainer.clientWidth) {
          setTimeout(() => {
            const scrollTarget = btn.offsetLeft - (navContainer.clientWidth / 2) + (btn.clientWidth / 2);
            navContainer.scrollTo({ left: Math.max(0, scrollTarget), behavior: 'smooth' });
          }, 60);
        }

        // Hard-lock window scroll to avoid any accidental horizontal viewport shift
        if (window.scrollX !== 0) {
          window.scrollTo(0, window.scrollY);
        }
        requestAnimationFrame(() => {
          if (window.scrollX !== 0) {
            window.scrollTo(0, window.scrollY);
          }
          if (document.documentElement.scrollLeft !== 0) {
            document.documentElement.scrollLeft = 0;
          }
          if (document.body && document.body.scrollLeft !== 0) {
            document.body.scrollLeft = 0;
          }
        });
      });
    });

    // Initial render
    renderPricingCards(activeCategory);

    // Watch for language toggle
    const langObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-lang') {
          renderPricingCards(activeCategory);
        }
      });
    });
    langObserver.observe(document.body, { attributes: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPricingEngine);
  } else {
    initPricingEngine();
  }
})();
