import { NavItem } from "./nav-item";

export let navMenu: NavItem[] = [
  {
    displayName: 'Dashboard',
    iconName: 'dashboard',
    route: 'dashboard'
  },
  {
    displayName: 'User',
    iconName: 'face',
    route: 'user',
    children: [
      {
        displayName: 'Account Info',
        iconName: 'account_box',
        route: 'user/account-info'
      }
    ]
  },
  {
    displayName: 'Statements',
    iconName: 'account_balance',
    route: 'statement',
    children: [
      {
        displayName: 'List',
        iconName: 'list',
        route: 'statement/list'
      },
      {
        displayName: 'Import',
        iconName: 'save_alt',
        route: 'statement/import'
      } 
    ]
  },
  {
    displayName: 'Sign Out',
    iconName: 'highlight_off'
  }
];