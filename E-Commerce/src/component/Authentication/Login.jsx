import { useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../Firebase/Firebase";

function Login() {
  const navigate = useNavigate();

  const [authing, setAuthing] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const signInWithGoogle = async () => {
    setAuthing(true);

    signInWithPopup(auth, new GoogleAuthProvider())
      .then((response) => {
        console.log(response.user.uid);
        navigate("/home");
      })
      .catch((error) => {
        console.log(error);
        setAuthing(false);
      });
  };

  const signInWithEmail = async () => {
    setAuthing(true);
    setError("");

    signInWithEmailAndPassword(auth, email, password)
      .then((response) => {
        console.log(response.user.uid);
        navigate("/home");
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
        setAuthing(false);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center  p-4">
  <div className="w-full max-w-md bg-gradient-to-br from-[#1f0036] to-[#0f172a] rounded-xl shadow-2xl overflow-hidden p-8 flex flex-col items-center justify-center">
    
    {/* Header */}
    <div className="mb-8 text-center text-white">
      <h3 className="text-4xl font-bold mb-2">Login</h3>
      <p className="text-lg text-gray-400">Welcome Back! Please enter your details.</p>
    </div>

    {/* Inputs */}
    <div className="flex flex-col gap-4 w-full mb-6">
      <input
        type="email"
        placeholder="Email"
        className="w-full py-3 px-4 rounded-md bg-transparent border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-white"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full py-3 px-4 rounded-md bg-transparent border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-white"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>

    {/* Login button */}
    <button
      onClick={signInWithEmail}
      disabled={authing}
      className="w-full py-3 mb-4 bg-white text-black font-semibold rounded-md hover:bg-gray-200 transition"
    >
      Log In With Email and Password
    </button>

    {/* Error message */}
    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

    {/* Divider */}
    <div className="flex items-center justify-center my-4 w-full">
      <div className="border-b border-gray-600 w-full"></div>
      <span className="px-4 text-gray-400">OR</span>
      <div className="border-b border-gray-600 w-full"></div>
    </div>

    {/* Google login */}
    <button
      onClick={signInWithGoogle}
      disabled={authing}
      className="w-full py-3 bg-gray-100 text-black font-semibold rounded-md hover:bg-gray-300 transition"
    >
      Log In With Google
    </button>

    {/* Signup link */}
    <div className="mt-8 text-center text-gray-400 text-sm">
      Don't have an account?{" "}
      <a href="/signup" className="font-semibold text-white underline hover:text-gray-300">
        Sign Up
      </a>
    </div>

  </div>
</div>
  )
}


export default Login;
