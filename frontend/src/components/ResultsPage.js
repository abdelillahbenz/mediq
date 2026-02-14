function ResultsPage({ results, onAddToCart, cart }) {
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="results-view">
      <h2 style={{ marginBottom: '20px' }}>Assessment Results</h2>

      {results.map((item, index) => (
        <div className="result-card" key={index}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ margin: 0 }}>{item.name}</h3>
              <p style={{ color: '#64748b', margin: '5px 0' }}>Suggested for your symptoms</p>
            </div>
            <strong style={{ fontSize: '1.2rem', color: '#2563eb' }}>{item.price} zł</strong>
          </div>
          
          {/* This className links to the professional CSS we wrote */}
          <button 
            className="add-to-cart-btn" 
            onClick={() => onAddToCart(item)}
          >
            🛒 Add to Cart
          </button>
        </div>
      ))}

      {/* Summary Card */}
      <div className="result-card" style={{ backgroundColor: '#f8fafc', borderStyle: 'dashed' }}>
        <h3 style={{ marginTop: 0 }}>Quick Summary</h3>
        <p>Items in Cart: <strong>{cart.length}</strong></p>
        <p>Current Total: <strong>{total} zł</strong></p>
      </div>

      <p style={{ 
        fontSize: '0.8rem', 
        color: '#94a3b8', 
        marginTop: '20px', 
        fontStyle: 'italic',
        lineHeight: '1.4' 
      }}>
        Disclaimer: Based on your answers, these options are commonly used. 
        This is a simulation and not medical advice. Please consult a doctor.
      </p>
    </div>
  );
}

export default ResultsPage;