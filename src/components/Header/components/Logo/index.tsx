"use client";

import { logo, logoMobile } from "@/assets";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

export function Logo() {
  const [mounted, setMounted] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 768 });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return isMobile ? (
    <Image src={logoMobile} width={40} height={35} alt="Logo Ticto" priority />
  ) : (
    <Image src={logo} width={185} height={35} alt="Logo Ticto" priority />
  );
}
