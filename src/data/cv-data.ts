// ============================================
// CV Data — Single Source of Truth
// Semua konten dari CV asli Melisa Isolina Songli
// ============================================

export interface PersonalInfo {
  name: string
  role: string
  tagline: string
  about: string
  phone: string
  email: string
  address: string
  badge: {
    text: string
    active: boolean
  }
}

export interface Experience {
  id: string
  company: string
  role: string
  period: string
  startYear: number
  endYear: number | null
  isActive: boolean
  responsibilities: string[]
}

export interface Organization {
  id: string
  name: string
  role: string
  period: string
  icon: 'leadership' | 'finance' | 'social'
}

export interface Education {
  id: string
  institution: string
  degree?: string
  field?: string
  period?: string
}

export interface SkillGroup {
  category: 'soft' | 'tools'
  label: string
  items: string[]
}

export interface StatItem {
  value: string
  label: string
}

// --- Personal Info ---
export const personalInfo: PersonalInfo = {
  name: 'Melisa Isolina Songli',
  role: 'Administrasi Bisnis — Admin Planning & Office Operations',
  tagline: 'Lulusan Administrasi Bisnis UPN "Veteran" Yogyakarta (2022), saat ini aktif sebagai Admin Planning di PT Mega Global Energy sejak Mei 2023.',
  about: 'Saya adalah profesional administrasi bisnis dengan pengalaman di sektor energi dan pertambangan. Terbiasa mengelola sistem operasional, menyusun laporan, serta menangani perencanaan administrasi secara terstruktur dan teliti. Saya percaya bahwa kerapihan dalam administrasi adalah fondasi operasional yang efisien.',
  phone: '0853-4542-0296',
  email: 'melsisolina@gmail.com',
  address: 'Gg. Family No 28',
  badge: {
    text: 'Sedang Aktif Bekerja',
    active: true,
  },
}

// --- Stats ---
export const stats: StatItem[] = [
  { value: '4+', label: 'Tahun Pengalaman Kerja' },
  { value: '3', label: 'Organisasi Diikuti' },
  { value: '2022', label: 'Tahun Lulus S1' },
]

// --- Pengalaman Kerja (urut terbaru ke terlama) ---
export const experiences: Experience[] = [
  {
    id: 'mega-global',
    company: 'PT. Mega Global Energy',
    role: 'Admin Planning',
    period: 'Mei 2023 – Sekarang',
    startYear: 2023,
    endYear: null,
    isActive: true,
    responsibilities: [
      'Input & update data fuel voucher, Daily/Weekly Fuel Report',
      'Input timesheet unit site sampai Berita Acara (Invoice)',
      'Susun pengajuan WR, PR, Mine Permit (Simper), dan Komisioning Unit',
      'Monitoring MCU tahunan & perencanaan cuti periodik departemen',
      'Bangun dashboard inspeksi K3 (SAP) dari Excel ke Power BI',
      'Monitoring absensi via AppSheet',
    ],
  },
  {
    id: 'qhomemart',
    company: 'QHomemart Supermarket Bangunan Yogyakarta',
    role: 'Service Center',
    period: '2021',
    startYear: 2021,
    endYear: 2021,
    isActive: false,
    responsibilities: [
      'Menerima & mencatat panggilan/keluhan pelanggan',
      'Menjadwalkan teknisi lapangan',
      'Menyusun administrasi transaksi & laporan berkala',
      'Penghubung antara service center dan mitra perusahaan',
    ],
  },
  {
    id: 'pertamina',
    company: 'PT. Pertamina EP Asset 4 Field Cepu',
    role: 'Staff Planning and Evaluation',
    period: '2020',
    startYear: 2020,
    endYear: 2020,
    isActive: false,
    responsibilities: [
      'Terlibat dalam perencanaan & evaluasi kegiatan lapangan',
      'Peninjauan langsung proses pengeboran sumur minyak',
      'Menyusun & mengarsipkan administrasi departemen',
    ],
  },
]

// --- Organisasi ---
export const organizations: Organization[] = [
  {
    id: 'bem-fisip',
    name: 'BEM FISIP UPN "Veteran" Yogyakarta',
    role: 'Staff Departemen Sosial dan Masyarakat',
    period: '2019–2020',
    icon: 'social',
  },
  {
    id: 'asrama-putri',
    name: 'Ketua Asrama Putri Kutai Timur cabang Yogyakarta',
    role: 'Ketua',
    period: '2018–2019',
    icon: 'leadership',
  },
  {
    id: 'himpakt',
    name: 'HIMPAKT (Himpunan Mahasiswa Kutai Timur) cab. YK',
    role: 'Bendahara',
    period: '2018–2019',
    icon: 'finance',
  },
]

// --- Pendidikan ---
export const educations: Education[] = [
  {
    id: 'upn',
    institution: 'Universitas Pembangunan Nasional "Veteran" Yogyakarta',
    degree: 'S1',
    field: 'Administrasi Bisnis',
    period: '2017–2022',
  },
  {
    id: 'sman',
    institution: 'SMA Negeri 1 Sangatta Utara',
  },
]

// --- Keahlian ---
export const skills: SkillGroup[] = [
  {
    category: 'soft',
    label: 'Soft Skills',
    items: ['Team Work', 'Detail Oriented', 'Good Communication Skills'],
  },
  {
    category: 'tools',
    label: 'Tools & Software',
    items: ['Microsoft Word', 'Microsoft Excel', 'Microsoft PowerPoint', 'Canva', 'Power BI'],
  },
]

// --- Navigation Items ---
export const navItems = [
  { id: 'beranda', label: 'Beranda' },
  { id: 'tentang', label: 'Tentang' },
  { id: 'pengalaman', label: 'Pengalaman' },
  { id: 'organisasi', label: 'Organisasi' },
  { id: 'pendidikan', label: 'Pendidikan' },
  { id: 'keahlian', label: 'Keahlian' },
  { id: 'kontak', label: 'Kontak' },
] as const
