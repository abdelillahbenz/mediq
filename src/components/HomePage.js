function HomePage({ onStart, isLoggedIn }) {
  return (
    <div className="home-view">
      <h1>Welcome to MedIQ</h1>
      <p>Discover commonly used treatments based on our points-based evaluation system.</p>
      
      <div className="feature-tag">🎯 Personalized Symptom Check</div>
      <div className="feature-tag">⚖️ Logical Point Calculation</div>
      <div className="feature-tag">🔒 Register to Save Results</div>

      <button className="cta-button" style={{marginTop:'20px'}} onClick={onStart}>
        {isLoggedIn ? "Start Assessment" : "Register to Start"}
      </button>
    </div>
  );
}
export default HomePage;