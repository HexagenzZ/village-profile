import type { CollectionConfig } from 'payload'

export const Akomodasi: CollectionConfig = {
  slug: 'akomodasi',
  labels: {
    singular: 'Akomodasi & Penginapan',
    plural: 'Akomodasi & Penginapan',
  },
  admin: {
    useAsTitle: 'judul',
    defaultColumns: ['judul', 'subKategori', 'hargaPerMalam', 'kapasitas', 'featured'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'judul',
      type: 'text',
      required: true,
      label: 'Nama Akomodasi / Villa / Camping',
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
      name: 'subKategori',
      type: 'select',
      required: true,
      label: 'Sub Kategori Akomodasi',
      options: [
        { label: 'Villa & Resort', value: 'villa-resort' },
        { label: 'Camping Ground', value: 'camping-ground' },
      ],
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
      name: 'tagline',
      type: 'text',
      label: 'Tagline Daya Tarik (contoh: Private Pool View Gunung Salak)',
    },
    {
      name: 'foto',
      type: 'upload',
      relationTo: 'media',
      label: 'Foto Cover (Upload)',
    },
    {
      name: 'fotoUrl',
      type: 'text',
      label: 'Foto URL (Opsional / Unsplash)',
    },
    {
      name: 'deskripsi',
      type: 'textarea',
      required: true,
      label: 'Deskripsi Fasilitas & Suasana',
    },
    {
      name: 'lokasi',
      type: 'group',
      label: 'Informasi Lokasi',
      fields: [
        {
          name: 'namaTempat',
          type: 'text',
          required: true,
          label: 'Nama Tempat / Area',
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
      name: 'hargaPerMalam',
      type: 'text',
      required: true,
      label: 'Estimasi Harga per Malam (contoh: Rp 750.000 / malam)',
    },
    {
      name: 'kapasitas',
      type: 'text',
      label: 'Kapasitas Tamu (contoh: 4 - 10 Orang)',
    },
    {
      name: 'kontakBooking',
      type: 'group',
      label: 'Kontak Pemesanan',
      fields: [
        {
          name: 'whatsapp',
          type: 'text',
          label: 'Nomor WhatsApp (contoh: 6281234567890)',
        },
        {
          name: 'telepon',
          type: 'text',
          label: 'Nomor Telepon',
        },
        {
          name: 'bookingUrl',
          type: 'text',
          label: 'Link Booking Online (Airbnb/Traveloka/dll)',
        },
      ],
    },
    {
      name: 'fasilitas',
      type: 'array',
      label: 'Fasilitas Unggulan',
      fields: [
        {
          name: 'item',
          type: 'text',
          label: 'Fasilitas (contoh: Kolam Renang, Dapur, WiFi)',
        },
      ],
    },
    {
      name: 'rating',
      type: 'number',
      label: 'Rating (1 - 5)',
      defaultValue: 4.8,
    },
  ],
}
