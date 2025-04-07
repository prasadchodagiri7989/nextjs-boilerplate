"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
  
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/login`, {
        email,
        password,
      });
  
      const { token, user } = res.data;
  
      if (token && user?.id && user?.name) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify({ id: user.id, name: user.name }));
  
        // ✅ Close modal
        const modalEl = document.getElementById("login");
        if (modalEl) {
          try {
            let ModalConstructor =
              typeof bootstrap !== "undefined"
                ? bootstrap.Modal
                : window?.bootstrap?.Modal;
  
            if (ModalConstructor) {
              const modalInstance = ModalConstructor.getInstance(modalEl) || new ModalConstructor(modalEl);
              modalInstance.hide();
            } else {
              console.warn("Bootstrap Modal not found.");
            }
          } catch (modalErr) {
            console.error("Failed to close modal:", modalErr);
          }
        }
  
        router.push("/");
      } else {
        throw new Error("Invalid response from server.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.error || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  
  
  

  return (
    <div className="modal modalCentered fade form-sign-in modal-part-content" id="login">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="header">
            <div className="demo-title">Log in</div>
            <span className="icon-close icon-close-popup" data-bs-dismiss="modal" />
          </div>
          <div className="tf-login-form">
            <form onSubmit={handleLogin}>
              <div className="tf-field style-1">
                <input
                  className="tf-field-input tf-input"
                  placeholder=" "
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <label className="tf-field-label">Email *</label>
              </div>
              <div className="tf-field style-1">
                <input
                  className="tf-field-input tf-input"
                  placeholder=" "
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <label className="tf-field-label">Password *</label>
              </div>
              {error && <p className="text-danger">{error}</p>}
              <div className="bottom">
                <button type="submit" className="tf-btn btn-fill radius-3 w-100" disabled={loading}>
                  {loading ? "Logging in..." : "Log in"}
                </button>
              </div>
            </form>

            <div className="tf-login-content">
              <h5 className="" style={{ marginTop: "20px" }}>I'm new here</h5>
              <Link href={`/register`} className="tf-btn btn-line">
                Register
                <i className="icon icon-arrow1-top-left" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
