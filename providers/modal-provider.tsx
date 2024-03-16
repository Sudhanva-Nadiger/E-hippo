"use client";

import { useEffect, useState } from "react";

import ModalPreview from "@/components/ModalPreview";

export default function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return ( 
    <>
      <ModalPreview />
    </>
   );
}
