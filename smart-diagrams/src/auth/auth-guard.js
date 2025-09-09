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
    
    // Get token from URL or storage
    const urlToken = searchParams.get("token");
    const storedToken = typeof window !== "undefined" ? sessionStorage.getItem("token") : null;
    const token = urlToken || storedToken;

    // ADD THE USEEFFECT HERE:
    useEffect(() => {
        console.log('🔐 AuthGuard Debug:');
        console.log('Path:', path);
        console.log('Token:', token);
        console.log('URL Token:', urlToken);
        console.log('Stored Token:', storedToken);
        console.log('Search params:', searchParams.toString());
        console.log('-------------------');

        // If we have a token from URL params, store it
        if (urlToken) {
            console.log('Storing token from URL...');
            sessionStorage.setItem("token", urlToken);
            // Remove token from URL to clean it up
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

    }, [path, router, searchParams, token, urlToken, storedToken]); // Add all dependencies

    return <>{children}</>;
};

export default AuthGuard;