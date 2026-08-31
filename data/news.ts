export interface NewsItem {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  category: "Pemerintahan" | "Pembangunan" | "Pariwisata" | "Pertanian" | "Sosial";
  date: string;
  author: string;
  readTime: string;
  coverImage: string;
  badge?: string;
}

export const VILLAGE_NEWS: NewsItem[] = [
  {
    id: "berita-1",
    slug: "panen-raya-nanas-madu-cijeruk-2026",
    title: "Panen Raya Nanas Madu Cijeruk: Petani Catat Peningkatan Kualitas & Produktivitas",
    summary:
      "Kelompok Tani Desa Cijeruk sukses menggelar panen raya komoditas Nanas Madu organik dengan peningkatan hasil panen sebesar 25% dibandingkan musim sebelumnya.",
    content:
      "Pemerintah Desa Cijeruk bersama Gabungan Kelompok Tani (Gapoktan) lereng Gunung Salak menyelenggarakan kegiatan Panen Raya Nanas Madu Cijeruk. Varietas nanas madu khas Cijeruk yang ditanam pada tanah vulkanik subur terbukti menghasilkan rasa manis legit alami tanpa rasa gatal di lidah. Kepala Desa Cijeruk menyampaikan bahwa hasil panen ini akan dipasok langsung ke gerai UMKM desa, sentra oleh-oleh Jabodetabek, serta menjadi atraksi agrowisata petik buah bagi para wisatawan.",
    category: "Pertanian",
    date: "24 Agustus 2026",
    author: "Humas Pemdes Cijeruk",
    readTime: "3 menit baca",
    coverImage: "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&w=800&q=80",
    badge: "🔥 Berita Utama",
  },
  {
    id: "berita-2",
    slug: "penataan-jalur-wisata-bukit-alesano",
    title: "Pemdes Cijeruk Tuntaskan Perbaikan Akses Jalan & Fasilitas Penerangan Menuju Bukit Alesano",
    summary:
      "Infrastruktur jalan utama dan penerangan bertenaga surya telah dipasang untuk meningkatkan kenyamanan serta keamanan wisatawan yang berkunjung.",
    content:
      "Pemerintah Desa Cijeruk telah menyelesaikan proyek rabat beton dan pemasangan lampu penerangan jalan umum bertenaga surya (PJU Solar Cell) di sepanjang jalur utama menuju kawasan wisata Bukit Alesano. Penataan ini bertujuan memudahkan mobilitas kendaraan wisatawan yang hendak menikmati sunrise dan camping, sekaligus mendukung keselamatan warga sekitar pada malam hari.",
    category: "Pembangunan",
    date: "18 Agustus 2026",
    author: "Kaur Pembangunan Desa",
    readTime: "4 menit baca",
    coverImage: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
    badge: "Pembangunan",
  },
  {
    id: "berita-3",
    slug: "peluncuran-layanan-surat-digital-warga",
    title: "Kemudahan Layanan Administrasi Kependudukan Berbasis Digital untuk Warga Cijeruk",
    summary:
      "Warga kini dapat mengajukan permohonan surat pengantar, domisili, dan administrasi kependudukan secara cepat melalui portal layanan desa.",
    content:
      "Guna meningkatkan efisiensi dan transparansi pelayanan publik, Pemerintah Desa Cijeruk meluncurkan sistem administrasi kependudukan mandiri. Melalui layanan ini, masyarakat dapat mengajukan permohonan surat keterangan usaha, surat pengantar SKCK, maupun pembaruan data keluarga tanpa antre berlama-lama di kantor desa.",
    category: "Pemerintahan",
    date: "12 Agustus 2026",
    author: "Sekretariat Desa Cijeruk",
    readTime: "3 menit baca",
    coverImage: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80",
    badge: "Layanan Publik",
  },
  {
    id: "berita-4",
    slug: "pelatihan-barista-kopi-robusta-salak",
    title: "Pemberdayaan Pemuda Karang Taruna: Pelatihan Roasting & Barista Kopi Cijeruk",
    summary:
      "Sebanyak 35 pemuda desa dilatih keahlian menyeduh dan mengolah biji kopi lokal agar mampu membuka kedai mandiri dan bekerja di industri kuliner.",
    content:
      "Bekerjasama dengan asosiasi barista Bogor, Desa Cijeruk menggelar workshop hilirisasi kopi lokal. Pelatihan mencakup teknik sortasi buah ceri, roasting profil kopi robusta lereng Salak, hingga teknik manual brewing modern. Program ini dirancang untuk menciptakan wirausaha muda baru di sektor ekonomi kreatif desa.",
    category: "Sosial",
    date: "5 Agustus 2026",
    author: "Karang Taruna Desa",
    readTime: "4 menit baca",
    coverImage: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80",
    badge: "Pemberdayaan",
  },
];
