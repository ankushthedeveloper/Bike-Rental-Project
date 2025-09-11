"use client";

import { setUser } from "@/lib/states/auth.slice";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

export default function SignUp() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      // Replace with your API endpoint
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/logIn`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
          credentials: "include",
        }
      );
      if (res.ok) {
        const data = await res.json();
        dispatch(setUser(data.user));
        setForm({ email: "", password: "" });
        router.push("/");
        router.refresh();
      } else {
        const data = await res.json();
        setMessage(data.message || "Log in failed.");
      }
    } catch {
      setMessage("Log In failed. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-12 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
          Log In to Your Bikely Account
        </h1>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              placeholder="Password"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
          >
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>
        {message && (
          <div className="mt-4 text-center text-sm text-red-600">{message}</div>
        )}
        <div className="mt-6 text-center text-gray-500 text-sm">
          Do not have an account ?{" "}
          <a href="/sign-up" className="text-blue-600 underline">
            Create an Account
          </a>
        </div>
      </div>
    </div>
  );
}
