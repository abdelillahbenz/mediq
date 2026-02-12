function ResultsPage({ results, onAddToCart, cart }) {
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div>
      <h2 className="app-title">Assessment Results</h2>

      {results.map((item, index) => (
        <div className="result-card" key={index}>
          <h3>{item.name}</h3>
          <p>Price: {item.price} zł</p>
          <button onClick={() => onAddToCart(item)}>
            Add to cart
          </button>
        </div>
      ))}

      <div className="result-card">
        <h3>Cart</h3>
        <p>Items: {cart.length}</p>
        <p>Total: {total} zł</p>
      </div>

      <p className="disclaimer">
        Based on your answers, these options are commonly used.
        Please consult a doctor.
      </p>
    </div>
  );
}

export default ResultsPage;
