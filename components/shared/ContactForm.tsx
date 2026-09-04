"use client";

import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    nama: "",
    whatsapp: "",
    email: "",
    kategori: "Informasi & Rekomendasi Wisata",
    pesan: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="p-8 text-center bg-emerald-50 border border-emerald-200 rounded-2xl space-y-3">
        <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
        <h3 className="text-lg font-bold text-stone-900">Pesan Berhasil Terkirim!</h3>
        <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
          Terima kasih {formData.nama}. Pesan Anda telah diteruskan ke tim pengelola desa dan KKN Cijeruk. Kami akan segera merespons melalui WhatsApp ({formData.whatsapp}).
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setFormData({
              nama: "",
              whatsapp: "",
              email: "",
              kategori: "Informasi & Rekomendasi Wisata",
              pesan: "",
            });
          }}
          className="mt-4 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-lg transition"
        >
          Kirim Pesan Lainnya
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="font-bold text-stone-700 block">Nama Lengkap</label>
          <input
            type="text"
            required
            placeholder="Contoh: Budi Santoso"
            value={formData.nama}
            onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#2d5026] text-stone-900"
          />
        </div>
        <div className="space-y-1.5">
          <label className="font-bold text-stone-700 block">Nomor WhatsApp</label>
          <input
            type="tel"
            required
            placeholder="Contoh: 081234567890"
            value={formData.whatsapp}
            onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#2d5026] text-stone-900"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="font-bold text-stone-700 block">Email (Opsional)</label>
        <input
          type="email"
          placeholder="budi@example.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#2d5026] text-stone-900"
        />
      </div>

      <div className="space-y-1.5">
        <label className="font-bold text-stone-700 block">Kategori Kepentingan</label>
        <select
          value={formData.kategori}
          onChange={(e) => setFormData({ ...formData, kategori: e.target.value })}
          className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#2d5026] text-stone-900 bg-white"
        >
          <option>Informasi & Rekomendasi Wisata</option>
          <option>Reservasi Villa & Akomodasi</option>
          <option>Kunjungan Rombongan / Studi Lapangan</option>
          <option>Kolaborasi UMKM & Agrowisata</option>
          <option>Pertanyaan Umum Seputar KKN/Desa</option>
        </select>
      </div>

      <div className="space-y-1.5">
        <label className="font-bold text-stone-700 block">Pesan atau Pertanyaan</label>
        <textarea
          rows={4}
          required
          placeholder="Tuliskan pesan Anda secara rinci di sini..."
          value={formData.pesan}
          onChange={(e) => setFormData({ ...formData, pesan: e.target.value })}
          className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#2d5026] text-stone-900"
        />
      </div>

      <button
        type="submit"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#2d5026] hover:bg-[#223e1d] text-white font-bold text-xs tracking-wide transition shadow-sm cursor-pointer"
      >
        <Send className="w-4 h-4" />
        <span>Kirim Pesan Sekarang</span>
      </button>
    </form>
  );
}
