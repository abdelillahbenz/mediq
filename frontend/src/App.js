import "./App.css";
import { useState, useEffect } from "react";
import HomePage from "./components/HomePage";
import LoginModal from "./components/LoginModal";

import QuestionUI from "./components/QuestionUI";
import ProgressBar from "./components/ProgressBar";
import ResultsPage from "./components/ResultsPage";
import CartSidebar from "./components/CartSidebar";

const API_URL = "http://localhost:5000"; // your backend

const questions = [
  { text: "Where is your pain located?", 
    options: ["Head","Neck","Shoulders","Back",
    "Arms","Legs","Chest","Abdomen","Joints"] },
  { text: "How would you describe the type of pain?", 
    options: ["Sharp",
            "Dull",
            "Throbbing",
            "Burning",
            "Pressure-like",
            "Stabbing",
            "Cramping",
            "Pulsating"] },
  { text: "Are you experiencing any of the following symptoms?",
  options: ["Heat",
            "Swelling",
            "Numbness",
            "Tingling",
            "Stiffness",
            "Weakness",
            "Redness"] },
  { text: "Do you have any additional symptoms?",
  options: ["Fever",
            "Nausea",
            "Dizziness",
            "Sensitivity to light",
            "Sensitivity to sound",
            "Vomiting"] }
];

function App() {
  const [view, setView] = useState("home");
  const [showAuth, setShowAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [results, setResults] = useState([]);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // 🔹 Fetch all medicines initially
  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/medicines`);
      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error("Fetch medicines failed:", err);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Search medicines (quiz keywords)
  const searchMedicines = async (query) => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/medicines/search?q=${query}`);
      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error("Search failed:", err);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Start quiz
  const handleStartAttempt = () => {
    if (!user) {
      setShowAuth(true);
    } else {
      setAnswers([]);
      setCurrentQuestion(0);
      setView("quiz");
    }
  };

  // 🔹 Quiz answers
  const handleAnswer = (answer) => {
    const updatedAnswers = [...answers, answer];
    setAnswers(updatedAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setView("results");
      const query = updatedAnswers.join(" ");
      searchMedicines(query);
    }
  };

  // 🔹 Signup / Login (called from LoginModal)
  const handleSignup = async ({ username, email, password }) => {
    try {
      const res = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await res.json();

      if (data.error) {
        alert("Signup failed: " + data.error);
      } else {
        setUser(username); // sets logged-in user in app
        setShowAuth(false);
        alert("Signup successful!");
      }
    } catch (err) {
      console.error("Signup error:", err);
    }
  };

  const handleLogin = async ({ email, password }) => {
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.error) alert("Login failed: " + data.error);
      else {
        setUser(data.username); // logged in
        setShowAuth(false);
        alert("Login successful!");
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };


  // 🔹 Cart functions
  const addToCart = (item) => setCart(prev => [...prev, item]);
  const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id));

  return (
    <div className="app-wrapper">
      {/* NAVIGATION */}
      <nav className="main-nav">
        <div className="logo" onClick={() => setView("home")}>
          MedIQ<span>+</span>
        </div>
        <div className="nav-actions">
          <button onClick={() => setIsCartOpen(true)} style={{ background: "none", border: "none", fontSize: "1.2rem", cursor: "pointer" }}>
            🛒 {cart.length > 0 && <span>({cart.length})</span>}
          </button>
          <button
            onClick={() => setShowAuth(true)}
            style={{ border: "1.5px solid #2563eb", color: "#2563eb", background: "none", padding: "6px 15px", borderRadius: "20px", fontWeight: "600", cursor: "pointer" }}
          >
            {user || "Sign In"}
          </button>
        </div>
      </nav>

      {/* MODALS */}
      {showAuth && <LoginModal onClose={() => setShowAuth(false)} onSignup={handleSignup} onLogin={handleLogin} />}

      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} cart={cart} onRemove={removeFromCart} />

      {/* MAIN CONTENT */}
      <main className="app-container">
        {view === "home" && <HomePage onStart={handleStartAttempt} isLoggedIn={!!user} />}

        {view === "quiz" && (
          <>
            <ProgressBar current={currentQuestion} total={questions.length} />
            <QuestionUI question={questions[currentQuestion]} onAnswer={handleAnswer} />
          </>
        )}

        {view === "results" && (
          <>
            {loading ? <p>Loading medicines...</p> :
              <ResultsPage results={results} onAddToCart={addToCart} cart={cart} />}
          </>
        )}
      </main>
    </div>
  );
}

export default App;
