import "./App.css";
import { useState } from "react";
import HomePage from "./components/HomePage";
import LoginModal from "./components/LoginModal";
import QuestionUI from "./components/QuestionUI";
import ProgressBar from "./components/ProgressBar";
import ResultsPage from "./components/ResultsPage";
import CartSidebar from "./components/CartSidebar";

function App() {
  const [view, setView] = useState("home");
  const [showAuth, setShowAuth] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [cart, setCart] = useState([]);

  const handleStartAttempt = () => {
    if (!user) setShowAuth(true);
    else { setAnswers([]); setCurrentQuestion(0); setView("quiz"); }
  };

  const handleAnswer = (answer) => {
    setAnswers([...answers, answer]);
    if (currentQuestion < 2) { // 3 questions total
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setView("results");
    }
  };

  const results = [
    { id: 1, name: "PainRelief A", price: 25 }, 
    { id: 2, name: "MediCure", price: 40 },
    { id: 3, name: "ComfortEase", price: 15 }
  ];

  return (
    <div className="app-wrapper">
      <nav className="main-nav">
        <div className="logo" onClick={() => setView("home")}>MedIQ<span>+</span></div>
        <div className="nav-actions">
          <button style={{background:'none', border:'none', fontSize:'1.2rem', cursor:'pointer'}} onClick={() => setIsCartOpen(true)}>
            🛒 {cart.length > 0 && <span>({cart.length})</span>}
          </button>
          <button style={{border:'1.5px solid #2563eb', color:'#2563eb', background:'none', padding:'6px 15px', borderRadius:'20px', fontWeight:'600', cursor:'pointer'}} onClick={() => setShowAuth(true)}>
            {user ? user : "Sign In"}
          </button>
        </div>
      </nav>

      {showAuth && <LoginModal onClose={() => setShowAuth(false)} onLogin={setUser} />}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} cart={cart} onRemove={(id) => setCart(cart.filter(i => i.id !== id))} />

      <main className="app-container">
        {view === "home" && <HomePage onStart={handleStartAttempt} isLoggedIn={!!user} />}
        
        {view === "quiz" && (
          <>
            <ProgressBar current={currentQuestion} total={3} />
            <QuestionUI question={{text: ["Where is your pain?", "Type of pain?", "How it feels?"][currentQuestion], options: [["Head", "Back", "Legs"], ["Sharp", "Dull", "Pressure"], ["Hot", "Cold", "Throbbing"]][currentQuestion]}} onAnswer={handleAnswer} />
          </>
        )}

        {view === "results" && (
          <ResultsPage results={results} onAddToCart={(item) => {setCart([...cart, item]); setIsCartOpen(true);}} cart={cart} />
        )}
      </main>
    </div>
  );
}
export default App;