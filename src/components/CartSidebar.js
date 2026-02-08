function CartSidebar({ isOpen, onClose, cart, onRemove }) {
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  if (!isOpen) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="cart-sidebar" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h3>My Cart</h3>
          <button onClick={onClose} style={{border:'none', background:'none', fontSize:'1.5rem', cursor:'pointer'}}>×</button>
        </div>
        <div className="cart-items">
          {cart.length === 0 ? <p>Your cart is empty.</p> : cart.map((item, idx) => (
            <div key={idx} style={{display:'flex', justifyContent:'space-between', marginBottom:'15px', borderBottom:'1px solid #eee', paddingBottom:'10px'}}>
              <div><strong>{item.name}</strong><br/><small>{item.price} zł</small></div>
              <button onClick={() => onRemove(item.id)} style={{color:'red', border:'none', background:'none', cursor:'pointer'}}>Remove</button>
            </div>
          ))}
        </div>
        <div className="cart-footer">
          <div style={{display:'flex', justifyContent:'space-between', marginBottom:'15px'}}><strong>Total:</strong> <strong>{total} zł</strong></div>
          <button style={{width:'100%', padding:'12px', background:'#2563eb', color:'white', border:'none', borderRadius:'10px', fontWeight:'700'}}>Checkout</button>
        </div>
      </div>
    </div>
  );
}
export default CartSidebar;