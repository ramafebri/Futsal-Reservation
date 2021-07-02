import React from 'react'
import CIcon from '@coreui/icons-react'

const _nav =  [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>,
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Table'],
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Pengguna',
    to: '/table/pengguna',
    icon: 'cil-user-follow',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Lapangan',
    to: '/table/lapangan',
    icon: 'cil-pencil',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Reservasi',
    to: '/table/reservasi',
    icon: 'cil-star',
  },
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'Tanggal Main',
  //   to: '/table/tglmain',
  //   icon: 'cil-justify-left',
  // },
  {
    _tag: 'CSidebarNavItem',
    name: 'Jam Main',
    to: '/table/jammain',
    icon: 'cil-options',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Informasi',
    to: '/table/informasi',
    icon: 'cil-puzzle',
  },
]

export default _nav
