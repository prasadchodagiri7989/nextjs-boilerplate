"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

export default function AccountEdit() {
  const { user, setUser } = useAuth();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: user.id,
          name: `${formData.firstName} ${formData.lastName}`,
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        }),
      });

      if (!res.ok) throw new Error("Failed to update user data");

      const updatedUser = await res.json();

      // Save new user data
      const [firstName, ...lastNameParts] = updatedUser.name.split(" ");
      const lastName = lastNameParts.join(" ");

      const newUser = {
        ...user,
        name: updatedUser.name,
        firstName,
        lastName,
      };

      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));

      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };

  return (
    <div className="my-account-content account-edit">
      <form onSubmit={handleSubmit}>
        <div className="tf-field style-1 mb_15">
          <input
            className="tf-field-input tf-input"
            placeholder=" "
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <label className="tf-field-label">First name</label>
        </div>
        <div className="tf-field style-1 mb_15">
          <input
            className="tf-field-input tf-input"
            placeholder=" "
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <label className="tf-field-label">Last name</label>
        </div>
        <div className="tf-field style-1 mb_15">
          <input
            className="tf-field-input tf-input"
            placeholder=" "
            type="email"
            name="email"
            value={formData.email}
            disabled
          />
          <label className="tf-field-label">Email</label>
        </div>

        <h6 className="mb_20">Password Change</h6>
        <div className="tf-field style-1 mb_30">
          <input
            className="tf-field-input tf-input"
            placeholder=" "
            type="password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
          />
          <label className="tf-field-label">Current password</label>
        </div>
        <div className="tf-field style-1 mb_30">
          <input
            className="tf-field-input tf-input"
            placeholder=" "
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
          />
          <label className="tf-field-label">New password</label>
        </div>
        <div className="tf-field style-1 mb_30">
          <input
            className="tf-field-input tf-input"
            placeholder=" "
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <label className="tf-field-label">Confirm password</label>
        </div>

        <div className="mb_20">
          <button type="submit" className="tf-btn w-100 radius-3 btn-fill">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
