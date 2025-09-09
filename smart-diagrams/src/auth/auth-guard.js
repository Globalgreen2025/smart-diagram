// 'use client'
// import {useEffect } from 'react';
// import {usePathname, useRouter,useSearchParams} from "next/navigation";

// const AuthGuard = ({ children }) => {
//     const searchParams = useSearchParams()
//     const token =
//         searchParams.get("token") ||
//         (typeof window !== "undefined" && sessionStorage.getItem("token"));
//     const path = usePathname()
//     const router = useRouter();

//     const allowedRoutes = ['/', '/login'];

//     useEffect(() => {
//         if (!token && !allowedRoutes.includes(path)) {
//             router.push('/login');
//         }
//         if (token) sessionStorage.setItem("token", token)
//     }, [token]);


//     return <>{children}</>;
// };

// export default AuthGuard;
// auth/auth-guard.js
'use client';
import { useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from "next/navigation";

// Helper function to get token from cookies
const getTokenFromCookies = () => {
  if (typeof document === 'undefined') return null;
  
  const cookieValue = document.cookie
    .split('; ')
    .find(row => row.startsWith('token='))
    ?.split('=')[1];
  
  return cookieValue || null;
};

const AuthGuard = ({ children }) => {
  const searchParams = useSearchParams();
  const path = usePathname();
  const router = useRouter();

  // Check for token in ALL possible locations
  const urlToken = searchParams.get("token");
  const cookieToken = getTokenFromCookies();
  const sessionToken = typeof window !== "undefined" ? sessionStorage.getItem("token") : null;
  
  const token = urlToken || cookieToken || sessionToken;
  const allowedRoutes = ['/', '/login'];

  useEffect(() => {
    // If we have a token from URL, store it in sessionStorage and remove from URL
    if (urlToken) {
      sessionStorage.setItem("token", urlToken);
      // Clean URL by removing token parameter
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete('token');
      window.history.replaceState({}, '', newUrl.toString());
    }

    if (token && path === '/login') {
      // Already authenticated, redirect to dashboard
      router.push('/dashboard');
    } else if (!token && !allowedRoutes.includes(path)) {
      // Not authenticated, redirect to login
      router.push('/login');
    }
  }, [token, path, router, urlToken]);

  return <>{children}</>;
};

export default AuthGuard;