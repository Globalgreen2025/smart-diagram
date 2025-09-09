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
// components/AuthGuard.js
'use client'
import { useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const AuthGuard = ({ children }) => {
    const searchParams = useSearchParams()
    const path = usePathname()
    const router = useRouter();

    useEffect(() => {
        // Get token from URL or storage
        const urlToken = searchParams.get("token");
        const storedToken = typeof window !== "undefined" ? sessionStorage.getItem("token") : null;
        const token = urlToken || storedToken;

        // Store token from URL if present
        if (urlToken) {
            sessionStorage.setItem("token", urlToken);
            // Clean up URL by removing token parameter
            const newPath = path.split('?')[0]; // Remove query parameters
            router.replace(newPath);
            return;
        }

        // If no token and not on home page, redirect to home
        if (!token && path !== '/') {
            console.log('No authentication token, redirecting to home');
            router.push('/');
            return;
        }

        // If we have a token and we're on home page, redirect to dashboard
        if (token && path === '/') {
            console.log('Token found, redirecting to dashboard');
            router.push('/dashboard');
            return;
        }

    }, [path, router, searchParams]);

    return <>{children}</>;
};

export default AuthGuard;