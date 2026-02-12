import { useState } from "react";
function LoginModal({ onClose, onLogin }) {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email.split('@')[0]);
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
          {isRegister && <input type="text" placeholder="Full Name" required />}
          <input type="email" placeholder="Email" required onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" required />
          <button type="submit" className="auth-submit">{isRegister ? "Create Account" : "Sign In"}</button>
        </form>
        <button className="maybe-later" onClick={onClose}>Maybe later</button>
      </div>
    </div>
  );
}
export default LoginModal;