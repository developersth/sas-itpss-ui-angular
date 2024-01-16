import { RouteInfo } from '../vertical-menu/vertical-menu.metadata';

export const HROUTES: RouteInfo[] = [
  {
    path: '/dashboard', title: 'แดชบอร์ด', icon: 'ft-home', class: 'dropdown nav-item', isExternalLink: false, submenu: []
  },
  {
    path: '/dmss', title: 'จัดการเอกสาร', icon: 'ft-folder', class: 'dropdown nav-item has-sub', isExternalLink: false,
    submenu:
      [
        { path: '/dmss/docs-list', title: 'รายการเอกสาร', icon: 'ft-file-text submenu-icon', class: '', isExternalLink: false, submenu: [] }
      ]
  },
  {
    path: '/users', title: 'ผู้ใช้งาน', icon: 'ft-users', class: 'dropdown nav-item', isExternalLink: false, submenu: []
  }
];
