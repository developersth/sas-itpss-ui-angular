import { Routes, RouterModule } from '@angular/router';

//Route for content layout with sidebar, navbar and footer.

export const Full_ROUTES: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('../../components/dashboard/dashboard.module').then(m => m.DashboardModule),
  },
  {
    path: 'page',
    loadChildren: () => import('../../components/page/page.module').then(m => m.PageModule)
  },
  {
    path: 'users',
    loadChildren: () => import('../../components/users/user.module').then(m => m.UserModule)
  },
  {
    path: 'dmss',
    loadChildren: () => import('../../components/dmss/dmss.module').then(m => m.DmssModule)
  },
];
