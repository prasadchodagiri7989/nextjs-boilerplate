"use client";

import { useContextElement } from "@/context/Context";

export default function WishlistLength() {
  const { wishList } = useContextElement();

  if (!wishList) return <>0</>; // Fallback to prevent crashes

  return <>{wishList.length}</>;
}
