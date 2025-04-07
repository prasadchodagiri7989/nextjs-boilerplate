"use client";
import React from "react";
import { useAuth } from "@/context/AuthContext"; // 👈 import your auth context
import Link from "next/link";

export default function MyAccount() {
  const { user } = useAuth();

  if (!user) {
    return <p>Loading user info...</p>; // optional loading/fallback
  }

  return (
    <div className="my-account-content account-dashboard">
      <div className="mb_60">
        <h5 className="fw-5 mb_20">Hello {user.firstName || user.name}</h5>
        <ul className="user-info-list">
          <li><strong>Name:</strong> {user.firstName} {user.lastName}</li>
          <li><strong>Email:</strong> {user.email}</li>
          <li><strong>Role:</strong> {user.role}</li>
        </ul>
      </div>
    </div>
  );
}
