import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
import Input from "../components/common/Input";

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    if (!email || !password) return "Email and password are required.";
    const emailOk = /\S+@\S+\.\S+/.test(email);
    if (!emailOk) return "Please enter a valid email address.";
    if (password.length < 6) return "Password must be at least 6 characters.";
    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const v = validate();
    if (v) {
      setError(v);
      return;
    }
    setError(null);
    setIsSubmitting(true);

    // Simulate auth flow (replace with real if available)
    dispatch(login({ email }));
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Login</h2>
        <form onSubmit={handleSubmit} noValidate>
          {error && (
            <p className="text-red-600 text-sm mb-3" role="alert">
              {error}
            </p>
          )}

          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="mb-4"
            aria-label="Email"
            required
          />

          <div className="relative mb-4">
            <Input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              aria-label="Password"
              required
            />
            <button
              type="button"
              className="absolute right-2 top-2 text-sm text-gray-600 hover:underline"
              onClick={() => setShowPassword((p) => !p)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <label className="flex items-center mb-4 text-sm text-gray-700 select-none">
            <input type="checkbox" className="mr-2" />
            Remember me
          </label>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-500 hover:bg-blue-600 w-full disabled:opacity-60"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>

          <div className="flex justify-between items-center mt-3 text-sm">
            <button
              type="button"
              className="text-blue-600 hover:underline"
              onClick={() => alert("Forgot password flow to be implemented.")}
            >
              Forgot Password?
            </button>
            <span className="text-gray-500">Tip: demo@demo.com / ******</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
