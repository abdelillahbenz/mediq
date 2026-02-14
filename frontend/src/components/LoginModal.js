import { useState } from "react";

function LoginModal({ onClose, onSignup, onLogin }) {
  const [isRegister, setIsRegister] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegister) {
      if (!fullName || !email || !password) return alert("Fill all fields");
      onSignup({ username: fullName, email, password }); // call backend signup
    } else {
      if (!email || !password) return alert("Fill all fields");
      onLogin({ email, password }); // you can implement login later
    }
    onClose();
  };
  
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="auth-tabs">
          <button className={`tab-btn ${!isRegister ? "active" : ""}`} onClick={() => setIsRegister(false)}>Login</button>
          <button className={`tab-btn ${isRegister ? "active" : ""}`} onClick={() => setIsRegister(true)}>Register</button>
        </div>
        <form className="auth-form" onSubmit={handleSubmit}>
          {isRegister && <input type="text" placeholder="Full Name" required value={fullName} onChange={(e) => setFullName(e.target.value)} />}
          <input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit" className="auth-submit">{isRegister ? "Create Account" : "Sign In"}</button>
        </form>
        <button className="maybe-later" onClick={onClose}>Maybe later</button>
      </div>
    </div>
  );
}

export default LoginModal;
