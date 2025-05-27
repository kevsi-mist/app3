import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
// import the correct database instance from your Firebase setup
import { db } from '@/lib/firebase'; // adjust 'db' to match your actual export
import { doc, setDoc } from 'firebase/firestore';
import { toast } from "sonner";


const ANALYSIS_STATEMENTS = [
  "Analyzing portfolio data...",
  "Scanning quarterly reports...",
  "Checking market trends...",
  "Predicting growth potential...",
  "Generating investment summary...",
];

const RECOMMENDATIONS = [
  { symbol: "TCS", action: "Buy", rationale: "Strong earnings and solid outlook." },
  { symbol: "INFOSIS", action: "Hold", rationale: "Volatile but promising innovation." },
  { symbol: "FIPKART", action: "Sell", rationale: "Overvalued, consider taking profit." },
];



// Animate text loop for analysis
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


export default function AppleStyleLanding() {
  const [modalOpen, setModalOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="min-h-screen relative bg-gradient-to-tr from-[#121212] via-[#181818] to-[#121212] text-[#fefefe] font-sans overflow-y-scroll scrollbar-thin scrollbar-thumb-[#3b7cc9]/80 scrollbar-track-[#0f0f0f]">
      {/* Background subtle animated gradient overlay */}
      <AnimatedBackground />

      <div className="max-w-6xl mx-auto px-6 py-20 space-y-36 relative z-10">
        {/* Hero */}
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
              aria-label="Login/Register"
            >
              Login / Register
            </button>
          </div>
        </section>

        {/* Features */}
        <section className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          <FeatureCard icon="🤖" title="AI-Powered Summaries" desc="Complex earnings calls and reports simplified into bite-sized insights tailored just for you." />
          <FeatureCard icon="⏰" title="Real-Time Alerts" desc="Instant notifications about market changes, earnings, and personalized opportunities." />
          <FeatureCard icon="🌐" title="Global & Multilingual" desc="Content localized by region and language to fit your market." />
        </section>

        {/* Portfolio Graph & AI Analysis */}
        <section className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <PortfolioGraph />

          <div className="flex-1 space-y-8">
            <div className="bg-[#1a1a1a] rounded-3xl p-8 shadow-lg border border-[#3b7cc9]/20">
              <h2 className="text-3xl font-semibold mb-4">AI is Analyzing Your Portfolio</h2>
              <AnimatePresence mode="wait">
                <RotatingAnalysis key="analysis" />
              </AnimatePresence>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.5, duration: 0.7 }}
                className="mt-6 flex items-center gap-2 text-[#3b7cc9] font-bold tracking-wide"
              >
                <UpArrowIcon /> Predicted Portfolio Growth <span className="ml-1 text-sm font-normal">+12.4% this quarter</span>
              </motion.div>
            </div>

            <AIRecommendation />
          </div>
        </section>

        {/* About Us */}
        <AboutUs />

        {/* Contact */}
        <Contact />

        {/* Footer */}
        <footer className="text-center text-[#555] text-sm py-10 border-t border-[#222]">
          &copy; {new Date().getFullYear()} Imbue.ai — Simplifying Investing for Everyone
        </footer>
      </div>

      {/* Modal for Login/Register */}
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
                <LoginForm switchToRegister={() => setShowLogin(false)} closeModal={() => setModalOpen(false)} />
              ) : (
                <RegisterForm switchToLogin={() => setShowLogin(true)} closeModal={() => setModalOpen(false)} />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function LoginForm({ switchToRegister, closeModal }: { switchToRegister: () => void; closeModal: () => void }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const isLogin = true; // Assume login mode for this example
    // Validate email and password
    if (!email.includes("@") || !email.includes(".")) {
      toast.error('Please enter a valid email address');
      return;
    }

    if (email && password) {
      if (!isLogin) {
        // Register user data in Firebase Realtime Database
        const userId = email.replace(/[.@]/g, "_"); // basic sanitation for key
        setDoc(doc(db, 'users', userId), {
          email: email,
          password: password,
          createdAt: new Date().toISOString(),
        })
        .then(() => {
          toast("Account created!", {
            description: "Welcome to invest.app",
          });
          navigate('/dashboard');
        })
        .catch((error) => {
          toast.error(error.message);
        });
      } else {
        // Simulate login success
        toast("Login successful!", {
          description: "Welcome back to invest.app",
        });
        navigate('/dashboard');
      }
      closeModal();
    } else {
      toast.error('Please fill in all fields');
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
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    // Validate email format
    if (!email.includes("@") || !email.includes(".")) {
      toast.error('Please enter a valid email address');
      return;
    }

    // Check if passwords match
    if (password !== confirm) {
      toast.error("Passwords do not match!");
      return;
    }

    // Check if all fields are filled
    if (!email || !password || !confirm) {
      toast.error('Please fill in all fields');
      return;
    }

    // Register user data in Firebase Firestore
    const userId = email.replace(/[.@]/g, "_"); // basic sanitation for key
    setDoc(doc(db, 'users', userId), {
      email: email,
      password: password,
      createdAt: new Date().toISOString(),
    })
    .then(() => {
      toast("Account created successfully!", {
        description: "Welcome to Imbue.ai! You can now login.",
      });
      closeModal();
      // Switch to login form after successful registration
      switchToLogin();
    })
    .catch((error) => {
      toast.error(`Registration failed: ${error.message}`);
    });
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
// The rest of your components remain unchanged below:

function FeatureCard({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <motion.div
      whileHover={{ boxShadow: "0 0 15px 5px rgba(59,124,201,0.5)", y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="bg-[#1a1a1a] rounded-3xl p-8 cursor-default select-none border border-transparent hover:border-[#3b7cc9] shadow-md hover:shadow-lg"
    >
      <div className="text-6xl mb-6 select-none">{icon}</div>
      <h3 className="text-2xl font-semibold mb-3">{title}</h3>
      <p className="text-[#bbb] leading-relaxed">{desc}</p>
    </motion.div>
  );
}

function PortfolioGraph() {
  return (
    <div className="bg-[#1a1a1a] rounded-3xl p-10 shadow-xl border border-[#3b7cc9]/25 max-w-xl w-full">
      <h3 className="text-2xl font-semibold mb-6 text-[#ccc]">Portfolio Performance</h3>
      <svg
        viewBox="0 0 400 200"
        className="w-full"
        fill="none"
        stroke="#3b7cc9"
        strokeWidth={3}
        strokeLinecap="round"
      >
        {[...Array(5)].map((_, i) => (
          <line
            key={i}
            x1={0}
            y1={i * 40 + 20}
            x2={400}
            y2={i * 40 + 20}
            stroke="#2a2a2a"
            strokeWidth={1}
          />
        ))}
        {[60, 100, 80, 140, 120, 170, 150, 180, 160, 190].map((val, i) => (
          <rect
            key={i}
            x={i * 38 + 15}
            y={200 - val}
            width={20}
            height={val}
            fill="#3b7cc9"
            rx={4}
          />
        ))}
        <polyline
          points="15,140 53,100 91,120 129,60 167,80 205,30 243,50 281,20 319,40 357,10"
          stroke="#82c0ff"
          strokeWidth={4}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={0.8}
        />
      </svg>
    </div>
  );
}

function AIRecommendation() {
  const [rec, setRec] = React.useState(RECOMMENDATIONS[0]);
  React.useEffect(() => {
    const idx = Math.floor(Math.random() * RECOMMENDATIONS.length);
    setRec(RECOMMENDATIONS[idx]);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#121a29] rounded-3xl p-6 border border-[#3b7cc9]/40 shadow-lg max-w-md"
    >
      <h4 className="text-lg font-semibold mb-2 text-[#3b7cc9]">AI Recommendation</h4>
      <p className="text-[#ddd]">
        <strong>{rec.symbol}:</strong> <em>{rec.action}</em> — {rec.rationale}
      </p>
    </motion.div>
  );
}

function AboutUs() {
  return (
    <section className="max-w-7xl mx-auto text-center space-y-8 text-[#ccc] px-6 py-16">
      <div className="text-7xl text-[#3b7cc9] mb-6">
        <div className="inline-block animate-pulse" aria-label="rocket emoji" role="img">
          🚀
        </div>
      </div>
      <h2 className="text-5xl font-extrabold mb-4">About Imbue.ai</h2>
      <p className="max-w-3xl mx-auto text-lg font-light leading-relaxed">
        Imbue.ai is dedicated to simplifying the investing experience by harnessing advanced AI technologies. Our mission is to empower investors with clear, actionable insights derived from complex market data—making it easy to make confident, data-driven decisions without the usual overwhelm. We believe that investing should be accessible, transparent, and smart for everyone, and we’re here to make that a reality.
      </p>
    </section>
  );
}

function Contact() {
  return (
    <section className="max-w-4xl mx-auto text-center space-y-8 py-12 px-6 bg-[#1a1a1a] rounded-3xl border border-[#3b7cc9]/40 shadow-lg">
      <h2 className="text-4xl font-extrabold mb-6 text-[#3b7cc9]">Contact Us</h2>

      <div className="space-y-8 text-left max-w-md mx-auto text-[#ccc]">
        {/* Founder 1 */}
        <div>
          <h3 className="text-2xl font-semibold mb-2">Keval Mistry (CTO & CEO)</h3>
          <p className="flex items-center gap-2">
            <span role="img" aria-label="email">📧</span>
            <a
              href="mailto:kevalmistry5927@gmail.com"
              className="hover:text-[#82c0ff] transition"
            >
              kevalmistry5927@gmail.com
            </a>
          </p>
          <p className="flex items-center gap-2">
            <span role="img" aria-label="phone">📞</span>
            <a
              href="tel:+916357243095"
              className="hover:text-[#82c0ff] transition"
            >
              635-724-3095
            </a>
          </p>
          <p className="flex items-center gap-2">
            <span role="img" aria-label="instagram">📸</span>
            <a
              href="https://instagram.com/keval592007"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#82c0ff] transition"
            >
              @keval592007
            </a>
          </p>
        </div>

        {/* Founder 2 */}
        <div>
          <h3 className="text-2xl font-semibold mb-2">Shlok Shah (CMO)</h3>
          <p className="flex items-center gap-2">
            <span role="img" aria-label="email">📧</span>
            <a
              href="mailto:shlokshah@gmail.com"
              className="hover:text-[#82c0ff] transition"
            >
              shloks8267@gmail.com
            </a>
          </p>
          <p className="flex items-center gap-2">
            <span role="img" aria-label="phone">📞</span>
            <a
              href="tel:+918490827607"
              target="_blank"
              className="hover:text-[#82c0ff] transition"
            >
              8490827607
            </a>
          </p>
          <p className="flex items-center gap-2">
            <span role="img" aria-label="instagram">📸</span>
            <a
              href="https://instagram.com/"shah.shlok_"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#82c0ff] transition"
            >
              @shah.shlok_
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

function UpArrowIcon() {
  return (
    <svg
      className="w-5 h-5 inline-block"
      fill="none"
      stroke="#3b7cc9"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
    >
      <path d="M12 19V6M5 12l7-7 7 7" />
    </svg>
  );
}

function AnimatedBackground() {
  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none bg-gradient-to-tr from-[#0f0f0f] via-[#121212] to-[#0f0f0f]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.7 }}
      transition={{ duration: 2 }}
      style={{ zIndex: 0 }}
    />
  );
}
