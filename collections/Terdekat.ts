import type { CollectionConfig } from 'payload'

export const Terdekat: CollectionConfig = {
  slug: 'terdekat',
  labels: {
    singular: 'Destinasi Terdekat',
    plural: 'Destinasi Terdekat',
  },
  admin: {
    useAsTitle: 'judul',
    defaultColumns: ['judul', 'jarakWaktu', 'kategori', 'featured', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'judul',
      type: 'text',
      required: true,
      label: 'Nama Destinasi Sekitar',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Slug URL',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'kategori',
      type: 'select',
      required: true,
      label: 'Kategori Atraksi',
      options: [
        { label: 'Danau & Wisata Air', value: 'danau-air' },
        { label: 'Petualangan & Rafting', value: 'petualangan-rafting' },
        { label: 'Curug & Alam Lereng Salak', value: 'curug-alam' },
        { label: 'Taman Rekreasi Tematik', value: 'taman-rekreasi' },
      ],
    },
    {
      name: 'jarakWaktu',
      type: 'text',
      required: true,
      label: 'Jarak & Estimasi Tempuh dari Cijeruk (contoh: 15 Menit • 7.5 km)',
    },
    {
      name: 'tipeTrip',
      type: 'text',
      required: true,
      label: 'Rekomendasi Kunjungan (contoh: Cocok untuk Day-Trip & Liburan Keluarga)',
      defaultValue: 'Cocok untuk One-Day Trip',
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Tampilkan di Highlight Beranda (Featured)',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'foto',
      type: 'upload',
      relationTo: 'media',
      label: 'Foto Destinasi (Upload)',
    },
    {
      name: 'fotoUrl',
      type: 'text',
      label: 'Foto URL (Opsional / Unsplash)',
    },
    {
      name: 'tagline',
      type: 'text',
      label: 'Tagline Destinasi',
    },
    {
      name: 'deskripsi',
      type: 'textarea',
      required: true,
      label: 'Deskripsi Destinasi Terdekat & Daya Tariknya',
    },
    {
      name: 'lokasi',
      type: 'group',
      label: 'Informasi Lokasi & Rute',
      fields: [
        {
          name: 'namaTempat',
          type: 'text',
          required: true,
          label: 'Kecamatan / Wilayah Sekitar (contoh: Cigombong / Caringin)',
        },
        {
          name: 'alamat',
          type: 'textarea',
          required: true,
          label: 'Alamat Lengkap',
        },
        {
          name: 'latitude',
          type: 'number',
          label: 'Latitude (Disiapkan untuk Leaflet)',
        },
        {
          name: 'longitude',
          type: 'number',
          label: 'Longitude (Disiapkan untuk Leaflet)',
        },
      ],
    },
    {
      name: 'ruteAkses',
      type: 'text',
      label: 'Panduan Akses Jalan (contoh: Jalur Tol Bocimi Exit Caringin)',
    },
    {
      name: 'hargaTiket',
      type: 'text',
      label: 'Kisaran Tiket / Biaya Masuk',
    },
  ],
}
