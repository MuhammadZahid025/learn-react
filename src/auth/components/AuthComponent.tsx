import React, { useContext, useState } from "react";
import { Link } from "react-router";
import { AuthContext } from "../../context/AuthContext";

export function AuthComponent({ login }: { login: boolean }) {
  const { register, login: authLogin } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (login) {
      authLogin(formData.email, formData.password);
      setFormData({ email: "", password: "" });
    } else {
      register({
        id: Math.floor(Math.random() * 1000).toString(),
        email: formData.email,
        password: formData.password,
      });
      setFormData({ email: "", password: "" });
    }
  };

  //
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-bold text-center">
          {login ? "Login" : "Sign up"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />

            <label className="block text-sm font-medium text-gray-700 mt-4">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />

            <div className="flex justify-end items-center mt-2">
              <Link
                to="/reset-password"
                className="text-sm text-gray-600 hover:text-gray-800 focus:outline-none "
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-400 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {login ? "Login" : "Sign up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
