import React from 'react';

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const Pengguna = React.lazy(() => import('./views/table/pengguna/Pengguna'));
const AddEditPengguna = React.lazy(() => import('./views/table/pengguna/AddEditPengguna'));
const Lapangan = React.lazy(() => import('./views/table/lapangan/Lapangan'));
const AddEditLapangan = React.lazy(() => import('./views/table/lapangan/AddEditLapangan'));
const Informasi = React.lazy(() => import('./views/table/informasi/Informasi'));
const AddEditInformasi = React.lazy(() => import('./views/table/informasi/AddEditInformasi'));
const TanggalMain = React.lazy(() => import('./views/table/tanggal-main/TanggalMain'));
const AddEditTanggalMain = React.lazy(() => import('./views/table/tanggal-main/AddEditTanggalMain'));
const JamMain = React.lazy(() => import('./views/table/jam-main/JamMain'));
const AddJamMain = React.lazy(() => import('./views/table/jam-main/AddJamMain'));
const EditJamMain = React.lazy(() => import('./views/table/jam-main/EditJamMain'));
const Reservasi = React.lazy(() => import('./views/table/reservasi/Reservasi'));
const AddEditReservasi = React.lazy(() => import('./views/table/reservasi/AddEditReservasi'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/table', name: 'Tabel', component: Pengguna, exact: true },
  { path: '/table/pengguna', name: 'Pengguna', component: Pengguna, exact: true },
  { path: '/table/pengguna/addpengguna', name: 'Tambah Pengguna', component: AddEditPengguna },
  { path: '/table/pengguna/editpengguna/:idPengguna', name: 'Ubah Pengguna', component: AddEditPengguna },
  { path: '/table/lapangan', name: 'Lapangan', component: Lapangan, exact: true },
  { path: '/table/lapangan/addlapangan', name: 'Tambah Lapangan', component: AddEditLapangan },
  { path: '/table/lapangan/editlapangan/:idLapangan', name: 'Ubah Lapangan', component: AddEditLapangan },
  { path: '/table/informasi', name: 'Informasi', component: Informasi, exact: true },
  { path: '/table/informasi/addinformasi', name: 'Tambah Informasi', component: AddEditInformasi },
  { path: '/table/informasi/editinformasi/:idInformasi', name: 'Ubah Informasi', component: AddEditInformasi },
  { path: '/table/tglmain', name: 'Tanggal Main', component: TanggalMain, exact: true },
  { path: '/table/tglmain/addtglmain', name: 'Tambah Tanggal Main', component: AddEditTanggalMain },
  { path: '/table/tglmain/edittglmain/:idTglMain', name: 'Ubah Tanggal Main', component: AddEditTanggalMain },
  { path: '/table/jammain', name: 'Jam Main', component: JamMain, exact: true },
  { path: '/table/jammain/addjammain', name: 'Tambah Jam Main', component: AddJamMain },
  { path: '/table/jammain/editjammain/:idJamMain', name: 'Ubah Jam Main', component: EditJamMain },
  { path: '/table/reservasi', name: 'Reservasi', component: Reservasi, exact: true },
  { path: '/table/reservasi/addreservasi', name: 'Tambah Reservasi', component: AddEditReservasi },
  { path: '/table/reservasi/editreservasi/:idReservasi', name: 'Ubah Reservasi', component: AddEditReservasi },
];

export default routes;
