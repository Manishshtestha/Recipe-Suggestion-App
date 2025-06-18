"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function RouteSpinner() {
  const [show, setShow] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setShow(true);
    const timer = setTimeout(() => setShow(false), 500);
    return () => clearTimeout(timer);
  }, [pathname]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 pointer-events-none">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-pink-400 border-solid"></div>
    </div>
  );
} 