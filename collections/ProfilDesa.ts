import type { CollectionConfig } from 'payload'

export const ProfilDesa: CollectionConfig = {
  slug: 'profil-desa',
  labels: {
    singular: 'Data Profil Desa',
    plural: 'Data Profil Desa',
  },
  admin: {
    useAsTitle: 'namaDesa',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'namaDesa',
      type: 'text',
      required: true,
      defaultValue: 'Desa Cijeruk',
      label: 'Nama Desa',
    },
    {
      name: 'ringkasanUmum',
      type: 'textarea',
      required: true,
      label: 'Ringkasan Umum Desa',
    },
    {
      name: 'sejarahDesa',
      type: 'textarea',
      label: 'Sejarah Singkat Desa',
    },
    {
      name: 'sumberResmi',
      type: 'group',
      label: 'Tautan Sumber Resmi',
      fields: [
        {
          name: 'portalBestieBogor',
          type: 'text',
          label: 'URL Portal Bestie Kabupaten Bogor',
          defaultValue: 'https://bogorkab.go.id/',
        },
        {
          name: 'situsResmiDesaId',
          type: 'text',
          label: 'URL Situs Resmi Desa.id',
          defaultValue: 'https://cijeruk-bogor.desa.id/',
        },
      ],
    },
    {
      name: 'statistik',
      type: 'group',
      label: 'Statistik Demografi & Wilayah (Scraped)',
      fields: [
        {
          name: 'jumlahPenduduk',
          type: 'number',
          label: 'Jumlah Penduduk (Jiwa)',
          defaultValue: 8945,
        },
        {
          name: 'jumlahKk',
          type: 'number',
          label: 'Jumlah Kepala Keluarga (KK)',
          defaultValue: 2450,
        },
        {
          name: 'luasWilayahKm2',
          type: 'number',
          label: 'Luas Wilayah (km²)',
          defaultValue: 12.4,
        },
        {
          name: 'ketinggianMeter',
          type: 'number',
          label: 'Ketinggian / Elevasi (mdpl)',
          defaultValue: 650,
        },
        {
          name: 'jumlahRt',
          type: 'number',
          label: 'Jumlah RT',
          defaultValue: 32,
        },
        {
          name: 'jumlahRw',
          type: 'number',
          label: 'Jumlah RW',
          defaultValue: 8,
        },
      ],
    },
    {
      name: 'apbdesRingkasan',
      type: 'group',
      label: 'Ringkasan Transparansi APBDes',
      fields: [
        {
          name: 'tahunAnggaran',
          type: 'text',
          label: 'Tahun Anggaran',
          defaultValue: '2026',
        },
        {
          name: 'totalPendapatan',
          type: 'text',
          label: 'Total Pendapatan Desa',
          defaultValue: 'Rp 2.150.000.000',
        },
        {
          name: 'totalBelanja',
          type: 'text',
          label: 'Total Belanja Desa',
          defaultValue: 'Rp 2.080.000.000',
        },
      ],
    },
    {
      name: 'kontakKantor',
      type: 'group',
      label: 'Kontak Kantor Desa',
      fields: [
        {
          name: 'alamat',
          type: 'text',
          label: 'Alamat Kantor',
          defaultValue: 'Jl. Kolonel Bustomi No. 12, Cijeruk, Kab. Bogor',
        },
        {
          name: 'telepon',
          type: 'text',
          label: 'Telepon Kantor',
          defaultValue: '(0251) 8234-900',
        },
        {
          name: 'email',
          type: 'text',
          label: 'Email Resmi',
          defaultValue: 'pemdes@cijeruk-bogor.desa.id',
        },
        {
          name: 'jamLayanan',
          type: 'text',
          label: 'Jam Operasional Kantor',
          defaultValue: 'Senin - Jumat: 08.00 - 16.00 WIB',
        },
      ],
    },
  ],
}
