// hooks/useIsMobile.js
import { useState, useEffect } from "react";

// Custom hook to determine if the viewport is mobile-sized (1024px or less by default)
export default function useIsMobile(breakpoint = 1024) {
    const [isMobile, setIsMobile] = useState(
        typeof window !== "undefined" ? window.innerWidth < breakpoint : false  
    );

    useEffect(() => {
        const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
        const onChange = (e) => setIsMobile(e.matches);
        mql.addEventListener("change", onChange);
        // initialize in case media query already matches
        setIsMobile(mql.matches);
        return () => mql.removeEventListener("change", onChange);
    }, [breakpoint]);

    return isMobile;
}
