"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${firstName} ${lastName}`,
          email,
          password,
          phone: "N/A",
          address: "N/A",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Registration failed");
      }

      // ✅ Save token to cookie
      document.cookie = `token=${data.token}; path=/; max-age=${7 * 24 * 60 * 60}`;

      // Optional: Save user locally
      localStorage.setItem("user", JSON.stringify(data.user));

      // ✅ Redirect
      router.push("/");
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flat-spacing-10">
      <div className="container">
        <div className="form-register-wrap">
          <div className="flat-title align-items-start gap-0 mb_30 px-0">
            <h5 className="mb_18">Register</h5>
            <p className="text_black-2">
              Sign up for early Sale access plus tailored new arrivals, trends and promotions. To opt out, click unsubscribe in our emails
            </p>
          </div>
          <form onSubmit={handleRegister}>
            <div className="tf-field style-1 mb_15">
              <input
                className="tf-field-input tf-input"
                type="text"
                placeholder=" "
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <label className="tf-field-label fw-4 text_black-2">First name</label>
            </div>
            <div className="tf-field style-1 mb_15">
              <input
                className="tf-field-input tf-input"
                type="text"
                placeholder=" "
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <label className="tf-field-label fw-4 text_black-2">Last name</label>
            </div>
            <div className="tf-field style-1 mb_15">
              <input
                className="tf-field-input tf-input"
                type="email"
                placeholder=" "
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className="tf-field-label fw-4 text_black-2">Email *</label>
            </div>
            <div className="tf-field style-1 mb_30">
              <input
                className="tf-field-input tf-input"
                type="password"
                placeholder=" "
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label className="tf-field-label fw-4 text_black-2">Password *</label>
            </div>
            {error && <p className="text-danger mb_15">{error}</p>}
            <div className="mb_20">
              <button
                type="submit"
                className="tf-btn w-100 radius-3 btn-fill animate-hover-btn justify-content-center"
                disabled={loading}
              >
                {loading ? "Registering..." : "Register"}
              </button>
            </div>
            <div className="text-center">
              <Link href={`/login`} className="tf-btn btn-line">
                Already have an account? Log in here <i className="icon icon-arrow1-top-left" />
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
