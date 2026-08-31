import { VILLAGE_PROFILE } from "@/data/villageProfile";
import {
  Mountain,
  Users,
  Home,
  Compass,
  Building2,
  CheckCircle2,
  ShieldCheck,
  ArrowLeft,
  FileText,
  Send,
  PieChart,
  Landmark,
  BadgeCheck,
  HelpCircle,
} from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Profil, Kependudukan & Pemerintahan Desa Cijeruk",
  description: "Portal resmi profil pemerintahan, data kependudukan, transparansi anggaran APBDes, dan layanan surat warga Desa Cijeruk.",
};

const POPULATION_DATA = {
  male: 4520,
  female: 4425,
  total: 8945,
  jobs: [
    { name: "Petani & Pekebun (Kopi, Nanas, Sayur)", count: "38%", color: "bg-[#2d5026]" },
    { name: "Pekerja Sektor Wisata & Kuliner (Villa, Kafe)", count: "24%", color: "bg-amber-600" },
    { name: "Wiraswasta & Pelaku UMKM", count: "18%", color: "bg-emerald-600" },
    { name: "Karyawan Swasta & Industri", count: "14%", color: "bg-blue-600" },
    { name: "PNS, Guru & Tenaga Medis", count: "6%", color: "bg-purple-600" },
  ],
  education: [
    { level: "SD / Sederajat", percent: "22%" },
    { level: "SMP / MTs", percent: "31%" },
    { level: "SMA / SMK", percent: "36%" },
    { level: "Diploma & Sarjana (D3/S1/S2)", percent: "11%" },
  ],
};

const APBDES_DATA = {
  year: "2026",
  incomeTotal: "Rp 2.450.000.000",
  expenseTotal: "Rp 2.380.000.000",
  allocations: [
    { sector: "Pembangunan Infrastruktur & Jalan Wisata", amount: "Rp 980.000.000", share: "41%" },
    { sector: "Pemberdayaan Masyarakat & BUMDes", amount: "Rp 540.000.000", share: "23%" },
    { sector: "Penyelenggaraan Pemerintahan Desa", amount: "Rp 460.000.000", share: "19%" },
    { sector: "Pembinaan Kemasyarakatan & Budaya", amount: "Rp 220.000.000", share: "9%" },
    { sector: "Penanggulangan Bencana & Darurat", amount: "Rp 180.000.000", share: "8%" },
  ],
};

const PUBLIC_SERVICES = [
  {
    name: "Surat Keterangan Usaha (SKU)",
    desc: "Untuk keperluan perbankan, pengajuan izin usaha mikro/UMKM, dan bantuan modal usaha.",
    req: "KTP, KK, & Surat Pengantar RT/RW",
  },
  {
    name: "Surat Pengantar SKCK",
    desc: "Permohonan pengantar pembuatan SKCK di Polsek Cijeruk / Polres Bogor.",
    req: "KTP, KK, & Pasfoto 4x6 (2 lembar)",
  },
  {
    name: "Surat Keterangan Domisili",
    desc: "Keterangan tempat tinggal perorangan atau tempat kedudukan badan usaha di Desa Cijeruk.",
    req: "KTP, KK, & Bukti Kepemilikan/Sewa Rumah",
  },
  {
    name: "Surat Keterangan Tidak Mampu (SKTM)",
    desc: "Untuk pengajuan beasiswa pendidikan, KIS, dan bantuan sosial kesehatan.",
    req: "KTP, KK, Surat Pengantar RT/RW & Foto Rumah",
  },
];

export default function ProfilDesaPage() {
  return (
    <main className="min-h-screen bg-[#fafaf8] text-stone-900 pt-28 pb-20 px-4 sm:px-8 md:px-12">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Back button */}
        <Link
          href="/"
          className="inline-flex items-center text-xs font-semibold text-stone-500 hover:text-[#2d5026] transition"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" />
          Kembali ke Beranda
        </Link>

        {/* Hero Section */}
        <div className="relative rounded-xl overflow-hidden bg-stone-900 text-white p-8 sm:p-12 shadow-sm">
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2d5026] text-white text-xs font-medium uppercase tracking-wider">
              <Mountain className="w-4 h-4" />
              Pemerintah Desa Cijeruk
            </span>
            <h1 className="text-3xl sm:text-5xl font-serif-title font-semibold text-white tracking-tight">
              Profil, Demografi & Pemerintahan Desa
            </h1>
            <p className="text-base text-stone-300 leading-relaxed font-light">
              {VILLAGE_PROFILE.overview}
            </p>
          </div>
        </div>

        {/* Key Statistics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="p-4 rounded-lg bg-white border border-stone-200 text-center shadow-xs">
            <Users className="w-5 h-5 text-[#2d5026] mx-auto mb-2" />
            <span className="text-xl sm:text-2xl font-serif-title font-bold text-stone-900">
              {VILLAGE_PROFILE.statistics.population.toLocaleString("id-ID")}
            </span>
            <p className="text-xs text-stone-500 mt-0.5">Jiwa Penduduk</p>
          </div>

          <div className="p-4 rounded-lg bg-white border border-stone-200 text-center shadow-xs">
            <Home className="w-5 h-5 text-[#2d5026] mx-auto mb-2" />
            <span className="text-xl sm:text-2xl font-serif-title font-bold text-stone-900">
              {VILLAGE_PROFILE.statistics.households.toLocaleString("id-ID")}
            </span>
            <p className="text-xs text-stone-500 mt-0.5">Kepala Keluarga</p>
          </div>

          <div className="p-4 rounded-lg bg-white border border-stone-200 text-center shadow-xs">
            <Compass className="w-5 h-5 text-[#2d5026] mx-auto mb-2" />
            <span className="text-xl sm:text-2xl font-serif-title font-bold text-stone-900">
              {VILLAGE_PROFILE.statistics.areaSizeKm2} km²
            </span>
            <p className="text-xs text-stone-500 mt-0.5">Luas Wilayah</p>
          </div>

          <div className="p-4 rounded-lg bg-white border border-stone-200 text-center shadow-xs">
            <Mountain className="w-5 h-5 text-[#2d5026] mx-auto mb-2" />
            <span className="text-xl sm:text-2xl font-serif-title font-bold text-stone-900">
              {VILLAGE_PROFILE.statistics.altitudeMeters} mdpl
            </span>
            <p className="text-xs text-stone-500 mt-0.5">Ketinggian Rata-rata</p>
          </div>

          <div className="p-4 rounded-lg bg-white border border-stone-200 text-center shadow-xs">
            <Building2 className="w-5 h-5 text-[#2d5026] mx-auto mb-2" />
            <span className="text-xl sm:text-2xl font-serif-title font-bold text-stone-900">
              {VILLAGE_PROFILE.statistics.rwCount} RW / {VILLAGE_PROFILE.statistics.rtCount} RT
            </span>
            <p className="text-xs text-stone-500 mt-0.5">Wilayah Rukun</p>
          </div>

          <div className="p-4 rounded-lg bg-white border border-stone-200 text-center shadow-xs">
            <ShieldCheck className="w-5 h-5 text-[#2d5026] mx-auto mb-2" />
            <span className="text-xl sm:text-2xl font-serif-title font-bold text-stone-900">
              19-27°C
            </span>
            <p className="text-xs text-stone-500 mt-0.5">Suhu Pegunungan</p>
          </div>
        </div>

        {/* Section 1: Demografi & Profil Kependudukan */}
        <section id="kependudukan" className="p-8 sm:p-10 rounded-xl bg-white border border-stone-200 space-y-6 shadow-xs scroll-mt-28">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-[#2d5026]" />
            <h2 className="text-2xl font-serif-title font-semibold text-stone-900">
              Data Demografi & Kependudukan Desa
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
            {/* Gender breakdown */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-stone-800 uppercase tracking-wider">
                Komposisi Jenis Kelamin & Keluarga
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-stone-50 border border-stone-200 text-center">
                  <span className="text-xs text-stone-500 font-medium block">Laki-Laki</span>
                  <span className="text-xl font-serif-title font-bold text-stone-900 mt-1 block">
                    {POPULATION_DATA.male.toLocaleString("id-ID")}
                  </span>
                  <span className="text-[11px] text-stone-400">50.5% dari populasi</span>
                </div>
                <div className="p-4 rounded-lg bg-stone-50 border border-stone-200 text-center">
                  <span className="text-xs text-stone-500 font-medium block">Perempuan</span>
                  <span className="text-xl font-serif-title font-bold text-stone-900 mt-1 block">
                    {POPULATION_DATA.female.toLocaleString("id-ID")}
                  </span>
                  <span className="text-[11px] text-stone-400">49.5% dari populasi</span>
                </div>
              </div>

              <div className="pt-2">
                <h4 className="text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
                  Tingkat Pendidikan Penduduk
                </h4>
                <div className="space-y-2">
                  {POPULATION_DATA.education.map((edu, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs p-2 rounded bg-stone-50 border border-stone-100">
                      <span className="text-stone-700">{edu.level}</span>
                      <span className="font-semibold text-stone-900">{edu.percent}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Employment distribution */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-stone-800 uppercase tracking-wider">
                Mata Pencaharian Utama Penduduk
              </h3>
              <div className="space-y-3">
                {POPULATION_DATA.jobs.map((job, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-stone-700">{job.name}</span>
                      <span className="text-stone-900 font-bold">{job.count}</span>
                    </div>
                    <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                      <div className={`h-full ${job.color}`} style={{ width: job.count }} />
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-stone-500 italic pt-2">
                *Data kependudukan bersumber dari Sistem Informasi Desa (SID) dan registrasi Disdukcapil Kabupaten Bogor.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Village Head & Governance Message */}
        <div id="struktur" className="p-8 rounded-xl bg-white border border-stone-200 flex flex-col md:flex-row items-center gap-8 scroll-mt-28 shadow-xs">
          <img
            src={VILLAGE_PROFILE.villageHead.photoUrl}
            alt={VILLAGE_PROFILE.villageHead.name}
            className="w-32 h-32 sm:w-40 sm:h-40 rounded-xl object-cover border border-stone-300 shadow-md shrink-0"
          />
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-semibold text-[#2d5026] uppercase tracking-wider">
              {VILLAGE_PROFILE.villageHead.title} (Periode {VILLAGE_PROFILE.villageHead.period})
            </span>
            <h3 className="text-2xl font-serif-title font-semibold text-stone-900">{VILLAGE_PROFILE.villageHead.name}</h3>
            <p className="text-sm text-stone-600 leading-relaxed italic pt-1">
              &quot;{VILLAGE_PROFILE.villageHead.message}&quot;
            </p>
          </div>
        </div>

        {/* Section 3: Vision & Mission */}
        <div id="visi-misi" className="grid grid-cols-1 md:grid-cols-2 gap-6 scroll-mt-28">
          <div className="p-8 rounded-xl bg-white border border-stone-200 space-y-4 shadow-xs">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#2d5026]">
              Arah Kebijakan
            </span>
            <h2 className="text-xl sm:text-2xl font-serif-title font-semibold text-stone-900">Visi Desa Cijeruk</h2>
            <p className="text-sm text-stone-700 leading-relaxed italic bg-stone-50 p-4 rounded-lg border border-stone-200">
              &quot;{VILLAGE_PROFILE.vision}&quot;
            </p>
          </div>

          <div className="p-8 rounded-xl bg-white border border-stone-200 space-y-4 shadow-xs">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#2d5026]">
              Program Strategis
            </span>
            <h2 className="text-xl sm:text-2xl font-serif-title font-semibold text-stone-900">Misi Desa Cijeruk</h2>
            <ul className="space-y-3 text-xs sm:text-sm text-stone-600">
              {VILLAGE_PROFILE.mission.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#2d5026] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Section 4: Public Services & Online Document Requests */}
        <section id="layanan-warga" className="p-8 sm:p-10 rounded-xl bg-white border border-stone-200 space-y-6 shadow-xs scroll-mt-28">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200 pb-4">
            <div>
              <div className="flex items-center gap-2 text-[#2d5026] text-xs font-bold uppercase tracking-wider mb-1">
                <FileText className="w-4 h-4" />
                Layanan Publik Desa
              </div>
              <h2 className="text-2xl font-serif-title font-semibold text-stone-900">
                Layanan Surat & Administrasi Kependudukan
              </h2>
            </div>
            <span className="text-xs px-3 py-1 rounded bg-[#2d5026]/10 text-[#2d5026] font-semibold">
              Jam Kerja: 08.00 - 16.00 WIB
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PUBLIC_SERVICES.map((srv, idx) => (
              <div key={idx} className="p-5 rounded-lg bg-stone-50 border border-stone-200 space-y-3 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-serif-title font-semibold text-stone-900 flex items-center gap-2">
                    <BadgeCheck className="w-4 h-4 text-[#2d5026]" />
                    {srv.name}
                  </h3>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">{srv.desc}</p>
                </div>
                <div className="pt-2 border-t border-stone-200/80 text-[11px] text-stone-500">
                  <span className="font-semibold text-stone-700">Persyaratan:</span> {srv.req}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-lg bg-[#2d5026]/5 border border-[#2d5026]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2 text-stone-700">
              <Send className="w-4 h-4 text-[#2d5026] shrink-0" />
              <span>Butuh bantuan pengurusan surat mendesak atau konsultasi pelayanan? Hubungi nomor admin desa:</span>
            </div>
            <a
              href="https://wa.me/6281234567890?text=Halo%20Admin%20Desa%20Cijeruk,%20saya%20ingin%20konsultasi%20layanan%20surat"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-md bg-[#2d5026] hover:bg-[#223e1d] text-white font-medium shrink-0 shadow-xs transition"
            >
              WhatsApp Pelayanan Desa →
            </a>
          </div>
        </section>

        {/* Section 5: APBDes Transparency */}
        <section id="apbdes" className="p-8 sm:p-10 rounded-xl bg-white border border-stone-200 space-y-6 shadow-xs scroll-mt-28">
          <div className="flex items-center gap-2">
            <Landmark className="w-5 h-5 text-[#2d5026]" />
            <h2 className="text-2xl font-serif-title font-semibold text-stone-900">
              Transparansi Anggaran Pendapatan & Belanja Desa (APBDes {APBDES_DATA.year})
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-stone-50 border border-stone-200">
              <span className="text-xs text-stone-500 font-medium uppercase block">Total Pendapatan Desa {APBDES_DATA.year}</span>
              <span className="text-2xl font-serif-title font-bold text-[#2d5026] mt-1 block">
                {APBDES_DATA.incomeTotal}
              </span>
              <span className="text-[11px] text-stone-400">Dari Dana Desa (DD), ADD, & PADes</span>
            </div>
            <div className="p-4 rounded-lg bg-stone-50 border border-stone-200">
              <span className="text-xs text-stone-500 font-medium uppercase block">Total Belanja & Realisasi {APBDES_DATA.year}</span>
              <span className="text-2xl font-serif-title font-bold text-stone-900 mt-1 block">
                {APBDES_DATA.expenseTotal}
              </span>
              <span className="text-[11px] text-stone-400">Tingkat Serapan Anggaran: 97.1%</span>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-bold text-stone-800 uppercase tracking-wider">
              Rincian Alokasi Bidang Belanja Desa
            </h3>
            <div className="space-y-2.5">
              {APBDES_DATA.allocations.map((item, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-stone-50 border border-stone-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-stone-800 block">{item.sector}</span>
                    <span className="text-stone-500 text-[11px]">Porsi: {item.share}</span>
                  </div>
                  <span className="font-bold text-[#2d5026]">{item.amount}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 6: Office & Contact */}
        <section id="kontak-kantor" className="p-8 sm:p-10 rounded-xl bg-white border border-stone-200 space-y-4 scroll-mt-28 shadow-xs">
          <h2 className="text-xl font-serif-title font-semibold text-stone-900">Kantor & Layanan Resmi Desa Cijeruk</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            <div className="p-4 rounded-lg bg-stone-50 border border-stone-200">
              <span className="text-xs text-stone-500 font-medium uppercase block">Alamat Kantor</span>
              <span className="text-xs text-stone-900 font-medium mt-1 block leading-relaxed">{VILLAGE_PROFILE.office.address}</span>
            </div>
            <div className="p-4 rounded-lg bg-stone-50 border border-stone-200">
              <span className="text-xs text-stone-500 font-medium uppercase block">Telepon / WhatsApp</span>
              <span className="text-xs text-stone-900 font-medium mt-1 block">{VILLAGE_PROFILE.office.phone}</span>
            </div>
            <div className="p-4 rounded-lg bg-stone-50 border border-stone-200">
              <span className="text-xs text-stone-500 font-medium uppercase block">Email Resmi</span>
              <span className="text-xs text-stone-900 font-medium mt-1 block">{VILLAGE_PROFILE.office.email}</span>
            </div>
            <div className="p-4 rounded-lg bg-stone-50 border border-stone-200">
              <span className="text-xs text-stone-500 font-medium uppercase block">Jam Pelayanan</span>
              <span className="text-xs text-stone-900 font-medium mt-1 block">{VILLAGE_PROFILE.office.operatingHours}</span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
