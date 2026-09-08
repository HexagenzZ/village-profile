import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getAkomodasiBySlug, getRekomendasiTempat } from "@/lib/dataService";
import type { AkomodasiItem } from "@/lib/types";
import {
  MapPin,
  Phone,
  Clock,
  Users,
  Wifi,
  Car,
  Menu,
  Star,
} from "lucide-react";
import { decodeURIComponentSafe } from "@/lib/utils";

interface AkomodasiDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function AkomodasiDetailPage({
  params,
}: AkomodasiDetailPageProps) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponentSafe(slug);

  let akomodasi: AkomodasiItem | null = null;
  try {
    akomodasi = await getAkomodasiBySlug(decodedSlug);
  } catch {
    akomodasi = null;
  }

  if (!akomodasi) {
    notFound();
  }

  const rekomendasi = await getRekomendasiTempat("akomodasi", akomodasi.slug);

  return (
    <article className="min-h-screen bg-[#fafaf8] text-[#292524]">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[300px] w-full">
        {akomodasi.coverImage ? (
          <Image
            src={akomodasi.coverImage}
            alt={akomodasi.judul}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-br from-[#2e5b32]/30 to-[#4a8041]/40" />
        )}
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative h-full flex items-end pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 w-full">
            <div className="bg-[#fafaf8]/95 backdrop-blur-sm rounded-t-2xl pt-8 pb-6 px-6 sm:px-8">
              <p className="text-sm font-serif-title tracking-wider text-[#2e5b32] uppercase">
                Akomodasi • {akomodasi.subKategoriLabel}
              </p>
              <h1 className="font-display text-4xl sm:text-5xl font-bold text-[#141414] mt-2">
                {akomodasi.judul}
              </h1>
              {akomodasi.rating && (
                <div className="flex items-center gap-2 mt-3">
                  <Star className="w-5 h-5 text-amber-400 fill-current" />
                  <span className="font-medium">{akomodasi.rating}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">
            <section>
              <h2 className="font-display text-2xl font-bold text-[#141414] mb-4">
                Tentang Penginapan Ini
              </h2>
              <p className="text-stone-600 leading-relaxed text-lg">
                {akomodasi.deskripsi}
              </p>
            </section>

            {akomodasi.tagline && (
              <section className="bg-[#2e5b32]/5 rounded-xl p-6">
                <h3 className="font-display text-xl font-bold text-[#2e5b32] mb-2">
                  Highlights
                </h3>
                <p className="italic text-stone-700">
                  {akomodasi.tagline}
                </p>
              </section>
            )}

            {akomodasi.fasilitas && akomodasi.fasilitas.length > 0 && (
              <section>
                <h3 className="font-display text-2xl font-bold text-[#141414] mb-4">
                  Fasilitas
                </h3>
                <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {akomodasi.fasilitas.map((f, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-stone-700"
                    >
                      <Menu className="w-4 h-4 text-[#2e5b32]" />
                      {f}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {akomodasi.gallery && akomodasi.gallery.length > 0 && (
              <section>
                <h3 className="font-display text-2xl font-bold text-[#141414] mb-4">
                  Galeri Foto
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {akomodasi.gallery.map((img, i) => (
                    <div
                      key={i}
                      className="relative aspect-video rounded-lg overflow-hidden"
                    >
                      <Image
                        src={img}
                        alt={`${akomodasi.judul} - ${i + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            <div className="bg-white rounded-xl shadow-sm p-6 space-y-5">
              <h3 className="font-display text-xl font-bold text-[#141414]">
                Informasi Praktis
              </h3>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#2e5b32] mt-0.5 shrink-0" />
                <div>
                  <span className="font-medium text-stone-800">Lokasi</span>
                  <p className="text-stone-600">
                    {akomodasi.lokasi.namaTempat}
                  </p>
                  <p className="text-sm text-stone-500">
                    {akomodasi.lokasi.alamat}
                  </p>
                </div>
              </div>

              {akomodasi.hargaPerMalam && (
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#2e5b32] mt-0.5 shrink-0" />
                  <div>
                    <span className="font-medium text-stone-800">
                      Harga per Malam
                    </span>
                    <p className="text-stone-600">
                      {akomodasi.hargaPerMalam}
                    </p>
                  </div>
                </div>
              )}

              {akomodasi.kapasitas && (
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-[#2e5b32] mt-0.5 shrink-0" />
                  <div>
                    <span className="font-medium text-stone-800">Kapasitas</span>
                    <p className="text-stone-600">{akomodasi.kapasitas}</p>
                  </div>
                </div>
              )}

              {akomodasi.kontakBooking &&
                (akomodasi.kontakBooking.whatsapp ||
                  akomodasi.kontakBooking.telepon ||
                  akomodasi.kontakBooking.bookingUrl) && (
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-[#2e5b32] mt-0.5 shrink-0" />
                    <div>
                      <span className="font-medium text-stone-800">
                        Kontak Booking
                      </span>
                      {akomodasi.kontakBooking.whatsapp && (
                        <p className="text-stone-600">
                          WhatsApp: {akomodasi.kontakBooking.whatsapp}
                        </p>
                      )}
                      {akomodasi.kontakBooking.telepon && (
                        <p className="text-stone-600">
                          Telp: {akomodasi.kontakBooking.telepon}
                        </p>
                      )}
                      {akomodasi.kontakBooking.bookingUrl && (
                        <p className="text-stone-600">
                          Booking:{" "}
                          <a
                            href={akomodasi.kontakBooking.bookingUrl}
                            className="underline text-[#2e5b32]"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Klik di sini
                          </a>
                        </p>
                      )}
                    </div>
                  </div>
                )}

              {akomodasi.fasilitas &&
                akomodasi.fasilitas.length > 0 && (
                  <div className="flex items-start gap-3">
                    <Wifi className="w-5 h-5 text-[#2e5b32] mt-0.5 shrink-0" />
                    <div>
                      <span className="font-medium text-stone-800">
                        Fasilitas Unggulan
                      </span>
                      <p className="text-stone-600">
                        {akomodasi.fasilitas.join(", ")}
                      </p>
                    </div>
                  </div>
                )}
            </div>

            {/* Back to List */}
            <Link
              href="/akomodasi"
              className="flex items-center justify-center gap-2 text-[#2e5b32] hover:text-[#4a8041] font-medium transition"
            >
              <Car className="w-4 h-4" />
              Kembali ke Semua Akomodasi
            </Link>
          </aside>
        </div>

        {/* Rekomendasi */}
        {rekomendasi && rekomendasi.length > 0 && (
          <section className="mt-16 pt-12 border-t border-stone-200">
            <h3 className="font-display text-2xl font-bold text-[#141414] mb-6">
              Penginapan Lain yang Disukai
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {rekomendasi.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className="group block bg-white rounded-xl shadow-sm overflow-hidden transition-shadow hover:shadow-md"
                >
                  <div className="aspect-video relative">
                    <Image
                      src={item.coverImage}
                      alt={item.judul}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="p-4 space-y-1">
                    <span className="text-xs font-medium text-[#2e5b32]">
                      {item.subLabel}
                    </span>
                    <h4 className="font-display text-lg font-bold group-hover:text-[#2e5b32] transition">
                      {item.judul}
                    </h4>
                    <p className="text-stone-600 text-sm">
                      {item.extraInfo}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
