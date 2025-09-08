'use client'
import {useEffect } from 'react';
import {usePathname, useRouter,useSearchParams} from "next/navigation";

const AuthGuard = ({ children }) => {
    const searchParams = useSearchParams()
    const token =
        searchParams.get("token") ||
        (typeof window !== "undefined" && sessionStorage.getItem("token"));
    const path = usePathname()
    const router = useRouter();

    const allowedRoutes = ['/', '/login'];

    useEffect(() => {
        if (!token && !allowedRoutes.includes(path)) {
            router.push('/login');
        }
        if (token) sessionStorage.setItem("token", token)
    }, [token]);


    return <>{children}</>;
};

export default AuthGuard;
