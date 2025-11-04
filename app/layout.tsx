import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PetsIcon from '@mui/icons-material/Pets';
import type { Navigation } from '@toolpad/core/AppProvider';
import { ReactNode } from 'react';
import AuthProvider from '../providers/AuthProvider';

const NAVIGATION: Navigation = [
  {
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'patients',
    title: 'Pacientes',
    icon: <PetsIcon />,
    pattern: 'patients{/:patientId}*',
  }
];

const BRANDING = {
  title: 'Veterinaria Ricardez',
};


export default async function RootLayout(props: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <AuthProvider branding={BRANDING} navigation={NAVIGATION}>
            {props.children}
          </AuthProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
