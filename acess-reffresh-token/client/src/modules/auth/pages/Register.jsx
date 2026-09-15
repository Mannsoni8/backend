import { useState } from "react";
// import useApi from "../../../shared/useApi";

const Register = () => {
  // const api = useApi();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handelSubmit(event) {
    event.prevenDefault();
  }

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <form
          onSubmit={handelSubmit}
          className="w-full max-w-md rounded-2xl bg-white p-5 shadow-xl sm:p-8">
          {/* Heading */}
          <div className="mb-6 text-center sm:mb-8">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Create Account
            </h1>

            <p className="mt-2 text-sm text-gray-500 sm:text-base">
              Register to get started
            </p>
          </div>

          <div className="space-y-4 sm:space-y-5">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-gray-700">
                Name
              </label>

              <input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:px-4 sm:py-3 sm:text-base"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-700">
                Email
              </label>

              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:px-4 sm:py-3 sm:text-base"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-gray-700">
                Password
              </label>

              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:px-4 sm:py-3 sm:text-base"
              />
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 active:scale-[0.98] sm:py-3 sm:text-base">
              Register
            </button>
          </div>

          {/* Login */}
          <p className="mt-5 text-center text-xs text-gray-500 sm:mt-6 sm:text-sm">
            Already have an account?{" "}
            <span className="cursor-pointer font-medium text-blue-600 hover:text-blue-700">
              Login
            </span>
          </p>
        </form>
      </div>
    </main>
  );
};

export default Register;
