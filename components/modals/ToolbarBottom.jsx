"use client";
import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import CartLength from "../common/CartLength";

export default function ToolbarBottom() {
  const router = useRouter();
  const pathname = usePathname();

  const handleAccountClick = (e) => {
    e.preventDefault();
    const isLoggedIn =
      typeof window !== "undefined" && document.cookie.includes("token=");
    if (isLoggedIn) {
      router.push("/my-account");
    } else {
      router.push("/login");
    }
  };

  const handleShopClick = (e) => {
    e.preventDefault();
    router.push("/shop-default");
  };

  return (
    <div className="tf-toolbar-bottom type-1150">
      {/* Home Button */}
      <div className={`toolbar-item ${pathname === "/" ? "active" : ""}`}>
        <Link href="/">
          <div className="toolbar-icon">
            <i className="icon-home" />
          </div>
          <div className="toolbar-label">Home</div>
        </Link>
      </div>

      {/* Shop Button */}
      <div className={`toolbar-item ${pathname === "/shop-default" ? "active" : ""}`}>
        <a href="#" onClick={handleShopClick}>
          <div className="toolbar-icon">
            <i className="icon-shop" />
          </div>
          <div className="toolbar-label">Shop</div>
        </a>
      </div>

      {/* Search Button */}
      <div className="toolbar-item">
        <a
          href="#canvasSearch"
          data-bs-toggle="offcanvas"
          aria-controls="offcanvasLeft"
        >
          <div className="toolbar-icon">
            <i className="icon-search" />
          </div>
          <div className="toolbar-label">Search</div>
        </a>
      </div>

      {/* Account Button */}
      <div
        className={`toolbar-item ${pathname === "/my-account" ? "active" : ""}`}
      >
        <a href="#" onClick={handleAccountClick}>
          <div className="toolbar-icon">
            <i className="icon-account" />
          </div>
          <div className="toolbar-label">Account</div>
        </a>
      </div>

      {/* Cart Button */}
      <div className="toolbar-item">
        <a href="#shoppingCart" data-bs-toggle="modal">
          <div className="toolbar-icon">
            <i className="icon-bag" />
            <div className="toolbar-count">
              <CartLength />
            </div>
          </div>
          <div className="toolbar-label">Cart</div>
        </a>
      </div>
    </div>
  );
}
