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
  role: 'Admin Planning & UI/UX Designer',
  tagline: 'Profesional Administrasi Bisnis (UPN "Veteran" Yogyakarta 2022) yang bertransisi ke ranah perancangan sistem digital. Saat ini aktif sebagai Admin Planning di PT Mega Global Energy sejak Mei 2023.',
  about: 'Saya adalah profesional administrasi bisnis dengan pengalaman di sektor energi dan pertambangan. Terbiasa menghadapi proses administrasi lapangan yang berlapis dan berbasis dokumen, lalu merancangnya ulang menjadi alur kerja dan antarmuka digital yang lebih sederhana — mulai dari pemetaan proses, perancangan struktur data (ERD), wireframe, hingga prototipe interaktif yang siap diuji pengguna.',
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
      'Berperan dalam inisiatif perbaikan proses administrasi department melalui perancangan sistem dan alur kerja digital',
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
    label: 'Desain & Riset UX',
    items: ['Wireframing', 'Prototyping', 'Process Mapping', 'Information Architecture', 'Prinsip Document Control ISO 9001'],
  },
  {
    category: 'tools',
    label: 'Tools & Software',
    items: ['Figma', 'HTML/CSS Prototyping', 'Power BI', 'Canva', 'Microsoft Office'],
  },
  {
    category: 'soft',
    label: 'Soft Skills',
    items: ['Team Work', 'Detail Oriented', 'Good Communication Skills'],
  }
]

// --- Proyek UI/UX ---
export interface Project {
  id: string
  title: string
  company: string
  year: string
  description: string[]
}

export const projects: Project[] = [
  {
    id: 'doc-control',
    title: 'Sistem Kontrol Dokumen Internal',
    company: 'PT. Mega Global Energy',
    year: '2024',
    description: [
      'Merancang ulang alur persetujuan 6 jenis dokumen internal departemen Planning yang sebelumnya manual dan berlapis.',
      'Memisahkan alur menjadi dua pola sesuai bobot dokumen: persetujuan penuh 5 langkah untuk dokumen krusial, dan pencatatan otomatis 2 langkah untuk checklist rutin harian (ISO 9001).',
      'Menyusun flowchart, wireframe, hingga prototipe HTML interaktif yang dapat diuji langsung oleh pengguna.'
    ]
  },
  {
    id: 'erd-design',
    title: 'ERD Sistem Kontrol Dokumen',
    company: 'PT. Mega Global Energy',
    year: '2024',
    description: [
      'Merancang Entity Relationship Diagram 5 tabel (departemen, pengguna, dokumen, revisi, persetujuan) sebagai fondasi sistem sebelum desain antarmuka.',
      'Memastikan struktur data dapat digunakan oleh seluruh karyawan lintas departemen dengan riwayat pengajuan yang dapat dilacak.'
    ]
  }
]

// --- Navigation Items ---
export const navItems = [
  { id: 'beranda', label: 'Beranda' },
  { id: 'tentang', label: 'Tentang' },
  { id: 'pengalaman', label: 'Pengalaman' },
  { id: 'proyek', label: 'Proyek' },
  { id: 'organisasi', label: 'Organisasi' },
  { id: 'pendidikan', label: 'Pendidikan' },
  { id: 'keahlian', label: 'Keahlian' },
  { id: 'kontak', label: 'Kontak' },
] as const
