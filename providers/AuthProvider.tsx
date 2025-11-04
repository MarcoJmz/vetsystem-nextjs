"use client";
import { ReactNode, useEffect, useMemo, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { firebaseSignOut } from '../firebase/auth';
import { firebaseAuth } from '../firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import type { User } from 'firebase/auth';
import { NextAppProvider } from '@toolpad/core/nextjs';
import type { Navigation, Branding } from '@toolpad/core/AppProvider';

interface Session {
  user: {
    name?: string;
    email?: string;
    image?: string;
  };
}

interface AuthProviderProps {
  children: ReactNode;
  navigation: Navigation;
  branding: Branding;
}

// Client Component for authentication handling
export default function AuthProvider({ children, navigation, branding }: AuthProviderProps) {
  'use client';
  const router = useRouter();
  const pathname = usePathname();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user: User | null) => {
      if (user) {
        // Usuario autenticado
        setSession({
          user: {
            name: user.displayName || user.email || 'Usuario',
            email: user.email || '',
            image: user.photoURL || '',
          },
        });
      } else {
        // No hay usuario
        setSession(null);
      }
      setLoading(false);
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  // Handle authentication redirects
  useEffect(() => {
    if (loading) return; // Wait for auth state to be determined

    const isAuthPage = pathname.startsWith('/auth');

    if (!session && !isAuthPage) {
      // Redirect unauthenticated users to signin
      router.push('/auth/signin');
    } else if (session && isAuthPage) {
      // Redirect authenticated users away from auth pages
      router.push('/');
    }
  }, [session, loading, pathname, router]);

  const authentication = useMemo(() => ({
    signOut: async () => {
      await firebaseSignOut();
      window.location.href = '/auth/signin';
    },
  }), []);

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <NextAppProvider
      navigation={navigation}
      branding={branding}
      session={session}
      authentication={authentication as any}
    >
      {children}
    </NextAppProvider>
  );
}