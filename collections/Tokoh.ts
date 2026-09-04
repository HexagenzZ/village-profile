import type { CollectionConfig } from 'payload'

export const Tokoh: CollectionConfig = {
  slug: 'tokoh',
  labels: {
    singular: 'Tokoh Berpengaruh',
    plural: 'Tokoh Berpengaruh',
  },
  admin: {
    useAsTitle: 'nama',
    defaultColumns: ['nama', 'peran', 'featured', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'nama',
      type: 'text',
      required: true,
      label: 'Nama Lengkap Tokoh',
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
      name: 'peran',
      type: 'text',
      required: true,
      label: 'Peran / Gelar Pengaruh (contoh: Perintis Agrowisata Nanas & Sesepuh Desa)',
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
      label: 'Foto Profil Tokoh (Upload)',
    },
    {
      name: 'fotoUrl',
      type: 'text',
      label: 'Foto URL (Opsional / Unsplash)',
    },
    {
      name: 'ringkasanBio',
      type: 'textarea',
      required: true,
      label: 'Biografi Singkat (Kutipan / Ringkasan)',
    },
    {
      name: 'biografiLengkap',
      type: 'textarea',
      required: true,
      label: 'Kisah Hidup, Perjuangan & Dedikasi',
    },
    {
      name: 'lokasi',
      type: 'group',
      label: 'Wilayah Domisili / Kiprah',
      fields: [
        {
          name: 'namaTempat',
          type: 'text',
          required: true,
          label: 'Wilayah / Kampung',
          defaultValue: 'Desa Cijeruk',
        },
        {
          name: 'alamat',
          type: 'textarea',
          required: true,
          label: 'Alamat Asal / Tempat Kiprah',
          defaultValue: 'Kecamatan Cijeruk, Kabupaten Bogor',
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
      name: 'kontribusi',
      type: 'array',
      label: 'Jejak Langkah & Kontribusi Utama',
      fields: [
        {
          name: 'item',
          type: 'text',
          label: 'Kontribusi Nyata',
        },
      ],
    },
  ],
}
