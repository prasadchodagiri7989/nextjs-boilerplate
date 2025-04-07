"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext"; // <-- import your context

export default function Login() {
  const router = useRouter();
  const { login } = useAuth(); // ⬅️ use login from context

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [recoverEmail, setRecoverEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Invalid email or password");
      }

      // ✅ Save to AuthContext and localStorage
      login(data.user, data.token);

      // ✅ Navigate to home or dashboard
      router.push("/");
    } catch (err) {
      setError(err.message || "Something went wrong.");
    }
  };

  const handleRecover = (e) => {
    e.preventDefault();
    setSuccess("Recovery email sent (mock).");
  };

  return (
    <section className="flat-spacing-10">
      <div className="container">
        <div className="tf-grid-layout lg-col-2 tf-login-wrap">
          <div className="tf-login-form">
            {/* === Password Reset === */}
            <div id="recover">
              <h5 className="mb_24">Reset your password</h5>
              <p className="mb_30">
                We will send you an email to reset your password
              </p>
              <form onSubmit={handleRecover}>
                <div className="tf-field style-1 mb_15">
                  <input
                    className="tf-field-input tf-input"
                    placeholder=""
                    required
                    type="email"
                    value={recoverEmail}
                    onChange={(e) => setRecoverEmail(e.target.value)}
                  />
                  <label className="tf-field-label fw-4 text_black-2">
                    Email *
                  </label>
                </div>
                <div className="mb_20">
                  <a href="#login" className="tf-btn btn-line">
                    Cancel
                  </a>
                </div>
                <div>
                  <button
                    type="submit"
                    className="tf-btn w-100 radius-3 btn-fill animate-hover-btn justify-content-center"
                  >
                    Reset password
                  </button>
                </div>
              </form>
              {success && <p className="text-green-600 mt-3">{success}</p>}
            </div>

            {/* === Login Form === */}
            <div id="login">
              <h5 className="mb_36">Log in</h5>
              <form onSubmit={handleLogin}>
                <div className="tf-field style-1 mb_15">
                  <input
                    required
                    className="tf-field-input tf-input"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label className="tf-field-label fw-4 text_black-2">
                    Email *
                  </label>
                </div>
                <div className="tf-field style-1 mb_30">
                  <input
                    required
                    className="tf-field-input tf-input"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label className="tf-field-label fw-4 text_black-2">
                    Password *
                  </label>
                </div>
                <div className="mb_20">
                  <a href="#recover" className="tf-btn btn-line">
                    Forgot your password?
                  </a>
                </div>
                <div>
                  <button
                    type="submit"
                    className="tf-btn w-100 radius-3 btn-fill animate-hover-btn justify-content-center"
                  >
                    Log in
                  </button>
                </div>
                {error && <p className="text-red-600 mt-3">{error}</p>}
              </form>
            </div>
          </div>

          {/* === Register Sidebar === */}
          <div className="tf-login-content">
            <h5 className="mb_36">I'm new here</h5>
            <p className="mb_20">
              Sign up for early Sale access plus tailored new arrivals, trends
              and promotions.
            </p>
            <Link href={`/register`} className="tf-btn btn-line">
              Register <i className="icon icon-arrow1-top-left" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
