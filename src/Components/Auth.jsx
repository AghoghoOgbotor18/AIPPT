import React, { useState } from "react";
import { FaFacebook, FaCaretRight, FaTimes } from "react-icons/fa";
import googleImage from "../assets/Images/google.png";

const Auth = ({ onSuccess, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Lazy-loaded handlers
  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    try {
      setIsLoading(true);
      const { getAuth, createUserWithEmailAndPassword } = await import("firebase/auth");
      const { auth } = await import("../firebase"); // your firebase config
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccessMessage("Account created successfully!");
      setEmail("");
      setPassword("");
      setTimeout(() => onSuccess(), 1200);
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(""), 2000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      setIsLoading(true);
      const { getAuth, signInWithEmailAndPassword } = await import("firebase/auth");
      const { auth } = await import("../firebase");
      await signInWithEmailAndPassword(auth, email, password);
      setSuccessMessage("Login successful!");
      setEmail("");
      setPassword("");
      setTimeout(() => onSuccess(), 1200);
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(""), 2000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    try {
      setIsLoading(true);
      const { getAuth, GoogleAuthProvider, signInWithPopup } = await import("firebase/auth");
      const { auth } = await import("../firebase");
      const googleProvider = new GoogleAuthProvider();
      await signInWithPopup(auth, googleProvider);
      setSuccessMessage("Signed in with Google!");
      setTimeout(() => onSuccess(), 1200);
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(""), 2000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-3 text-zinc-800 w-full relative py-4 px-10">
      {/* SUCCESS MESSAGE */}
      {successMessage && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded">
          {successMessage}
        </div>
      )}

      {/* ERROR MESSAGE */}
      {error && (
        <div className="absolute top-12 left-1/2 -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded">
          {error}
        </div>
      )}

      {/* HEADER */}
      <div className="flex flex-col text-center">
        <h4 className="font-bold text-lg pt-5">
          {isSignUp ? "Create Your Account" : "Sign in to Your Account"}
        </h4>
        <p className="text-zinc-500 text-sm">
          {isSignUp
            ? "Join us! Please sign up to continue"
            : "Welcome back! Please sign in to continue"}
        </p>
      </div>

      {/* Google & Facebook */}
      <div className="flex justify-center items-center gap-2 text-sm">
        <button className="flex items-center gap-2 py-1 px-5 border border-zinc-400 bg-zinc-100 rounded">
          <FaFacebook size={17} className="text-blue-700" />
          <span>Facebook</span>
        </button>

        <button
          onClick={handleGoogleSignIn}
          className="flex items-center gap-1 py-1 px-5 border border-zinc-400 bg-zinc-100 rounded"
        >
          <img src={googleImage} alt="google icon" className="w-5" />
          <span>Google</span>
        </button>
      </div>

      <div className="flex justify-center items-center gap-2">
        <hr className="border text-zinc-300 w-[7rem]" />
        <p>or</p>
        <hr className="border text-zinc-300 w-[7rem]" />
      </div>

      {/* FORM */}
      <form
        onSubmit={isSignUp ? handleSignUp : handleLogin}
        className="flex flex-col items-start gap-2 w-full"
      >
        <label className="font-semibold">Email Address</label>
        <input
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-zinc-400 text-sm p-2 w-full rounded"
          required
        />

        <label className="font-semibold mt-2">Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-zinc-400 text-sm p-2 w-full rounded"
          required
        />

        <button
          type="submit"
          disabled={isLoading}
          className="bg-black/90 w-full mt-4 text-white py-2 rounded flex justify-center items-center gap-1 hover:bg-black/85 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <>
              {isSignUp ? "Sign Up" : "Sign In"} <FaCaretRight size={18} />
            </>
          )}
        </button>
      </form>

      {/* TOGGLE SIGNIN/SIGNUP */}
      <p className="text-sm mt-2">
        {isSignUp ? (
          <>
            Already have an account?{" "}
            <span
              className="font-semibold text-sm cursor-pointer hover:text-black/75"
              onClick={() => setIsSignUp(false)}
            >
              Sign In
            </span>
          </>
        ) : (
          <>
            Don't have an account?{" "}
            <span
              className="font-semibold text-sm cursor-pointer hover:text-black/75"
              onClick={() => setIsSignUp(true)}
            >
              Sign Up
            </span>
          </>
        )}
      </p>

      {/* CLOSE BUTTON */}
      <FaTimes
        size={35}
        className="absolute top-2 right-2 cursor-pointer hover:bg-zinc-100 p-2 rounded-full"
        onClick={onClose}
      />
    </div>
  );
};

export default Auth;
