import axios from "axios";
import { useEffect, useState } from "react";
import { Bars } from "react-loading-icons";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function Register() {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [match, setMatch] = useState(false); // [match, setMatch] = useState(false);
  const [loading, setLoading] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    password !== confirm_password ? setMatch(false) : setMatch(true);
  }, [password, confirm_password, match]);

  const handleSubmit = (e) => {
    setLoading(
      <p>
        <Bars stroke="#98ff98" className="h-4 w-4" speed={0.75} />
      </p>
    );
    e.preventDefault();
    const data = {
      login: email,
      email,
      password,
      confirm_password: password,
    };
    axios
      .post(`${import.meta.env.VITE_API_URL}register`, data)
      .then((res) => {
        console.log(res);
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <body className="flex h-full items-center py-16">
      <main className="w-full max-w-md mx-auto py-6">
        <a href="/" aria-label="logo" className="flex space-x-2">
          <div aria-hidden="true" className="flex space-x-1 mx-auto">
            <div className="h-4 w-4 rounded-full bg-primary dark:bg-gray-200"></div>
            <div className="h-6 w-2 bg-green dark:bg-primaryLight"></div>
            <span className="font-bolder dark:text-white">
              <span className="text-primary">TATA</span>
              <span className="text-green font-bold">KAE</span>
            </span>
          </div>
        </a>
        <div className="mt-7 bg-white border border-primary rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <div className="p-4 sm:p-7">
            <div className="text-center">
              <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
                Sign in
              </h1>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Already have an account?
                <a
                  className="text-blue-600 decoration-2 hover:underline font-medium"
                  href="/login"
                >
                  Sign in here
                </a>
              </p>
            </div>

            <div className="mt-5 text-left text-lg">
              <form
                onSubmit={(e) => {
                  handleSubmit(e);
                }}
              >
                <div className="grid gap-y-4">
                  <div>
                    <label
                      for="email"
                      className="block text-sm mb-2 dark:text-white"
                    >
                      Email address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        name="email"
                        className="py-3 px-4 block w-full border-primary border focus:border-2 focus:outline-none rounded-md text-sm focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                        required
                        aria-describedby="email-error"
                      />
                      <div className="hidden absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3">
                        <svg
                          className="h-5 w-5 text-red-500"
                          width="16"
                          height="16"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                          aria-hidden="true"
                        >
                          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                        </svg>
                      </div>
                    </div>
                    <p
                      className="hidden text-xs text-red-600 mt-2"
                      id="email-error"
                    >
                      Please include a valid email address so we can get back to
                      you
                    </p>
                  </div>

                  <div>
                    <label
                      for="password"
                      className="block text-sm mb-2 dark:text-white"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={show ? "text" : "password"}
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        name="password"
                        className="py-3 px-4 block w-full border-primary border focus:border-2 focus:outline-none rounded-md text-sm focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                        required
                        aria-describedby="email-error"
                      />
                      <div className="hidden absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3">
                        <svg
                          className="h-5 w-5 text-red-500"
                          width="16"
                          height="16"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                          aria-hidden="true"
                        >
                          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                        </svg>
                      </div>
                    </div>
                    <p
                      className="hidden text-xs text-red-600 mt-2"
                      id="password-error"
                    >
                      8+ characters required
                    </p>
                  </div>

                  <div>
                    <label
                      for="confirm-password"
                      className="block text-sm mb-2 dark:text-white"
                    >
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        type={show ? "text" : "password"}
                        id="confirm-password"
                        value={confirm_password}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        name="confirm-password"
                        className="py-3 px-4 block w-full border-primary border focus:border-2 focus:outline-none rounded-md text-sm focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                        required
                        aria-describedby="email-error"
                      />
                      <div className="hidden absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3">
                        <svg
                          className="h-5 w-5 text-red-500"
                          width="16"
                          height="16"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                          aria-hidden="true"
                        >
                          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                        </svg>
                      </div>
                    </div>
                    <p
                      className="hidden text-xs text-red-600 mt-2"
                      id="confirm-password-error"
                    >
                      Password does not match the password
                    </p>
                  </div>

                  <div
                    onClick={() => {
                      setShow(!show);
                    }}
                    className="flex space-x-2 text-center text-sm cursor-pointer"
                  >
                    {show ? <FiEye /> : <FiEyeOff />}{" "}
                    <span className="-mt-1">
                      {show ? "Hide" : "Show"} password
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="flex">
                      <input
                        required
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="shrink-0 mt-0.5 border-primary rounded text-blue-600 pointer-events-none focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                      />
                    </div>
                    <div className="ml-3">
                      <label
                        for="remember-me"
                        className="text-sm dark:text-white text-primary"
                      >
                        I accept the{" "}
                        <a
                          className="text-blue-600 decoration-2 hover:underline font-medium"
                          href="#"
                        >
                          Terms and Conditions
                        </a>
                      </label>
                    </div>
                  </div>
                  {password !== confirm_password && (
                    <p className="text-xs text-red mt-2">
                      Password does not match the password
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={!match}
                    className="py-3 inline-flex justify-center items-center gap-2 rounded-md border disabled:bg-slate-400 border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                  >
                    Sign in
                    {loading}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </body>
  );
}
