import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { signIn, signUp } from "@/lib/auth-service";
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { toast } from "sonner";

const ANALYSIS_STATEMENTS = [
  "Analyzing portfolio data...",
  "Scanning quarterly reports...",
  "Checking market trends...",
  "Predicting growth potential...",
  "Generating investment summary...",
];

function RotatingAnalysis() {
  const [index, setIndex] = React.useState(0);
  React.useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % ANALYSIS_STATEMENTS.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);
  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.6 }}
      className="font-mono text-sm text-[#3b7cc9]"
    >
      {ANALYSIS_STATEMENTS[index]}
    </motion.div>
  );
}

function LoginForm({ switchToRegister, closeModal }: { switchToRegister: () => void; closeModal: () => void }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    try {
      await signIn(email, password);
      toast.success("Login successful!", {
        description: "Welcome back to invest.app",
      });
      navigate('/dashboard');
      closeModal();
    } catch (error: any) {
      toast.error("Login failed", {
        description: error.message,
      });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-3xl font-semibold mb-6 text-center">Login</h2>

      <input
        type="email"
        placeholder="Email"
        className="w-full p-3 rounded-lg bg-[#1a1a1a] border border-[#3b7cc9] text-[#fefefe]"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full p-3 rounded-lg bg-[#1a1a1a] border border-[#3b7cc9] text-[#fefefe]"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />

      <button
        type="submit"
        className="w-full py-3 bg-[#3b7cc9] rounded-full font-semibold text-black hover:bg-[#2f66a1] transition"
      >
        Login
      </button>

      <p className="text-center text-[#666]">
        Don't have an account?{" "}
        <button
          type="button"
          onClick={switchToRegister}
          className="text-[#3b7cc9] hover:underline"
        >
          Register here
        </button>
      </p>
    </form>
  );
}

function RegisterForm({ switchToLogin, closeModal }: { switchToLogin: () => void; closeModal: () => void }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirm, setConfirm] = React.useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    if (password !== confirm) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const userCredential = await signUp(email, password);
      const userId = userCredential.user.uid;
      
      // Save additional user data to Firestore
      await setDoc(doc(db, 'users', userId), {
        email,
        createdAt: new Date().toISOString(),
        settings: {
          notifications: true,
          theme: 'dark'
        }
      });

      toast.success("Account created successfully!", {
        description: "Welcome to Imbue.ai! You can now login.",
      });
      
      switchToLogin();
    } catch (error: any) {
      toast.error("Registration failed", {
        description: error.message,
      });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-3xl font-semibold mb-6 text-center">Register</h2>

      <input
        type="email"
        placeholder="Email"
        className="w-full p-3 rounded-lg bg-[#1a1a1a] border border-[#3b7cc9] text-[#fefefe]"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full p-3 rounded-lg bg-[#1a1a1a] border border-[#3b7cc9] text-[#fefefe]"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Confirm Password"
        className="w-full p-3 rounded-lg bg-[#1a1a1a] border border-[#3b7cc9] text-[#fefefe]"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        required
      />

      <button
        type="submit"
        className="w-full py-3 bg-[#3b7cc9] rounded-full font-semibold text-black hover:bg-[#2f66a1] transition"
      >
        Register
      </button>

      <p className="text-center text-[#666]">
        Already have an account?{" "}
        <button
          type="button"
          onClick={switchToLogin}
          className="text-[#3b7cc9] hover:underline"
        >
          Login here
        </button>
      </p>
    </form>
  );
}

export default function Login() {
  const [modalOpen, setModalOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="min-h-screen relative bg-gradient-to-tr from-[#121212] via-[#181818] to-[#121212] text-[#fefefe] font-sans">
      <div className="max-w-6xl mx-auto px-6 py-20 space-y-36">
        <section className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-[4.5rem] font-extrabold tracking-tight leading-tight">
            Invest <span className="text-[#3b7cc9]">Smarter</span> with AI Insights
          </h1>
          <p className="text-lg max-w-3xl mx-auto text-[#ccc] font-light">
            Imbue.ai simplifies investing by combining cutting-edge AI with intuitive design — so you can grow your portfolio confidently.
          </p>
          <div className="flex justify-center gap-6 mt-10">
            <button
              onClick={() => {
                setModalOpen(true);
                setShowLogin(true);
              }}
              className="px-14 py-4 bg-transparent border border-[#3b7cc9] rounded-full text-[#3b7cc9] font-semibold text-lg shadow-xl hover:bg-[#3b7cc9] hover:text-black transition"
            >
              Login / Register
            </button>
          </div>
        </section>

        <AnimatePresence>
          {modalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
              onClick={() => setModalOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="bg-[#121212] rounded-3xl p-10 max-w-md w-full"
                onClick={(e) => e.stopPropagation()}
              >
                {showLogin ? (
                  <LoginForm 
                    switchToRegister={() => setShowLogin(false)} 
                    closeModal={() => setModalOpen(false)} 
                  />
                ) : (
                  <RegisterForm 
                    switchToLogin={() => setShowLogin(true)} 
                    closeModal={() => setModalOpen(false)} 
                  />
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}