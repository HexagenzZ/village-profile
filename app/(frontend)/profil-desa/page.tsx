import { getProfilDesa } from "@/lib/dataService";
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
  Plus,
} from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Profil, Kependudukan & Pemerintahan Desa Cijeruk",
  description:
    "Portal resmi profil pemerintahan, data kependudukan, transparansi anggaran APBDes, dan layanan surat warga Desa Cijeruk.",
};

export default async function ProfilDesaPage() {
  const profilData = await getProfilDesa();
  const profil = profilData || {
    namaDesa: "Desa Cijeruk",
    ringkasanUmum: "",
    sejarahDesa: "",
    sumberResmi: { portalBestieBogor: "", situsResmiDesaId: "" },
    statistik: null,
    apbdesRingkasan: {
      tahunAnggaran: "",
      totalPendapatan: "",
      totalBelanja: "",
    },
    kontakKantor: { alamat: "", telepon: "", email: "", jamLayanan: "" },
  };

  const statistik = profil.statistik || null;

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
        <div className="relative rounded-2xl overflow-hidden bg-stone-900 text-white p-8 sm:p-12 shadow-sm">
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2d5026] text-white text-xs font-medium uppercase tracking-wider">
              <Mountain className="w-4 h-4" />
              Pemerintah {profil.namaDesa}
            </span>
            <h1 className="text-3xl sm:text-5xl font-serif-title font-semibold text-white tracking-tight">
              Profil, Demografi & Pemerintahan {profil.namaDesa}
            </h1>
            <p className="text-base text-stone-300 leading-relaxed font-light">
              {profil.ringkasanUmum ||
                "Panduan profil resmi dan data kependudukan Desa Cijeruk, Kecamatan Cijeruk, Kabupaten Bogor."}
            </p>
          </div>
        </div>

        {/* Sumber Data Resmi Terintegrasi */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#2d5026] block">
                Sumber Data Resmi Terintegrasi
              </span>
              <h2 className="text-lg font-serif-title font-bold text-stone-900 mt-0.5">
                Portal Wilayah Kabupaten Bogor & Sistem Resmi Desa
              </h2>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={
                  profil.sumberResmi?.portalBestieBogor ||
                  "https://bogorkab.go.id/"
                }
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold transition"
              >
                <span>Portal Bestie Kab. Bogor</span>
                <span className="text-[10px]">&#8599;</span>
              </a>
              <a
                href={
                  profil.sumberResmi?.situsResmiDesaId ||
                  "https://cijeruk-bogor.desa.id/"
                }
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#2d5026] hover:bg-[#223e1d] text-white text-xs font-semibold transition shadow-xs"
              >
                <span>Situs Resmi Desa.id</span>
                <span className="text-[10px]">&#8599;</span>
              </a>
            </div>
          </div>
          <p className="text-xs text-stone-500 leading-relaxed">
            Data administratif formal di bawah ini disarikan sebagai infografis
            ringkas untuk melengkapi informasi pariwisata, kuliner, dan sejarah
            Desa Cijeruk. Untuk keperluan administrasi resmi lanjutan, silakan
            gunakan tautan portal resmi di atas.
          </p>
        </div>

        {/* Key Statistics Grid */}
        {statistik ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="p-4 rounded-lg bg-white border border-stone-200 text-center shadow-xs">
              <Users className="w-5 h-5 text-[#2d5026] mx-auto mb-2" />
              <span className="text-xl sm:text-2xl font-serif-title font-bold text-stone-900">
                {statistik.jumlahPenduduk
                  ? statistik.jumlahPenduduk.toLocaleString("id-ID")
                  : "-"}
              </span>
              <p className="text-xs text-stone-500 mt-0.5">Jiwa Penduduk</p>
            </div>

            <div className="p-4 rounded-lg bg-white border border-stone-200 text-center shadow-xs">
              <Home className="w-5 h-5 text-[#2d5026] mx-auto mb-2" />
              <span className="text-xl sm:text-2xl font-serif-title font-bold text-stone-900">
                {statistik.jumlahKk
                  ? statistik.jumlahKk.toLocaleString("id-ID")
                  : "-"}
              </span>
              <p className="text-xs text-stone-500 mt-0.5">Kepala Keluarga</p>
            </div>

            <div className="p-4 rounded-lg bg-white border border-stone-200 text-center shadow-xs">
              <Compass className="w-5 h-5 text-[#2d5026] mx-auto mb-2" />
              <span className="text-xl sm:text-2xl font-serif-title font-bold text-stone-900">
                {statistik.luasWilayahKm2 || 0} km²
              </span>
              <p className="text-xs text-stone-500 mt-0.5">Luas Wilayah</p>
            </div>

            <div className="p-4 rounded-lg bg-white border border-stone-200 text-center shadow-xs">
              <Mountain className="w-5 h-5 text-[#2d5026] mx-auto mb-2" />
              <span className="text-xl sm:text-2xl font-serif-title font-bold text-stone-900">
                {statistik.ketinggianMeter || 0} mdpl
              </span>
              <p className="text-xs text-stone-500 mt-0.5">
                Ketinggian Rata-rata
              </p>
            </div>

            <div className="p-4 rounded-lg bg-white border border-stone-200 text-center shadow-xs">
              <Building2 className="w-5 h-5 text-[#2d5026] mx-auto mb-2" />
              <span className="text-xl sm:text-2xl font-serif-title font-bold text-stone-900">
                {statistik.jumlahRw || 0} RW / {statistik.jumlahRt || 0} RT
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
        ) : (
          <div className="text-center py-8 bg-white rounded-2xl border border-stone-200">
            <div className="w-12 h-12 rounded-xl bg-stone-100 text-stone-400 flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-serif-title font-bold text-stone-700 mb-2">
              Data Statistik Belum Tersedia
            </h3>
            <p className="text-sm text-stone-500 max-w-md mx-auto mb-4">
              Tambahkan data statistik desa (penduduk, KK, luas wilayah, dll).
            </p>
          </div>
        )}

        {/* APBDES Transparency (dari CMS) */}
        {profil.apbdesRingkasan && profil.apbdesRingkasan.tahunAnggaran ? (
          <section
            id="apbdes"
            className="p-8 sm:p-10 rounded-xl bg-white border border-stone-200 space-y-6 shadow-xs scroll-mt-28"
          >
            <div className="flex items-center gap-2">
              <Landmark className="w-5 h-5 text-[#2d5026]" />
              <h2 className="text-2xl font-serif-title font-semibold text-stone-900">
                Transparansi Anggaran Pendapatan & Belanja Desa (APBDes{" "}
                {profil.apbdesRingkasan.tahunAnggaran})
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-stone-50 border border-stone-200">
                <span className="text-xs text-stone-500 font-medium uppercase block">
                  Total Pendapatan Desa {profil.apbdesRingkasan.tahunAnggaran}
                </span>
                <span className="text-2xl font-serif-title font-bold text-[#2d5026] mt-1 block">
                  {profil.apbdesRingkasan.totalPendapatan || "-"}
                </span>
                <span className="text-[11px] text-stone-400">
                  Dari Dana Desa (DD), ADD, & PADes
                </span>
              </div>
              <div className="p-4 rounded-lg bg-stone-50 border border-stone-200">
                <span className="text-xs text-stone-500 font-medium uppercase block">
                  Total Belanja & Realisasi{" "}
                  {profil.apbdesRingkasan.tahunAnggaran}
                </span>
                <span className="text-2xl font-serif-title font-bold text-stone-900 mt-1 block">
                  {profil.apbdesRingkasan.totalBelanja || "-"}
                </span>
              </div>
            </div>
          </section>
        ) : null}

        {/* Kontak Kantor (dari CMS) */}
        {profil.kontakKantor &&
        (profil.kontakKantor.alamat || profil.kontakKantor.telepon) ? (
          <section
            id="kontak-kantor"
            className="p-8 sm:p-10 rounded-xl bg-white border border-stone-200 space-y-4 scroll-mt-28 shadow-xs"
          >
            <h2 className="text-xl font-serif-title font-semibold text-stone-900">
              Kantor & Layanan Resmi Desa Cijeruk
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
              <div className="p-4 rounded-lg bg-stone-50 border border-stone-200">
                <span className="text-xs text-stone-500 font-medium uppercase block">
                  Alamat Kantor
                </span>
                <span className="text-xs text-stone-900 font-medium mt-1 block leading-relaxed">
                  {profil.kontakKantor.alamat || "-"}
                </span>
              </div>
              <div className="p-4 rounded-lg bg-stone-50 border border-stone-200">
                <span className="text-xs text-stone-500 font-medium uppercase block">
                  Telepon / WhatsApp
                </span>
                <span className="text-xs text-stone-900 font-medium mt-1 block">
                  {profil.kontakKantor.telepon || "-"}
                </span>
              </div>
              <div className="p-4 rounded-lg bg-stone-50 border border-stone-200">
                <span className="text-xs text-stone-500 font-medium uppercase block">
                  Email Resmi
                </span>
                <span className="text-xs text-stone-900 font-medium mt-1 block">
                  {profil.kontakKantor.email || "-"}
                </span>
              </div>
              <div className="p-4 rounded-lg bg-stone-50 border border-stone-200">
                <span className="text-xs text-stone-500 font-medium uppercase block">
                  Jam Pelayanan
                </span>
                <span className="text-xs text-stone-900 font-medium mt-1 block">
                  {profil.kontakKantor.jamLayanan || "-"}
                </span>
              </div>
            </div>
          </section>
        ) : null}
      </div>
    </main>
  );
}
