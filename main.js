// Food Delivery App JS
let cart = JSON.parse(localStorage.getItem('cart')) || [];

const cartValueEl = document.querySelector('.cart-value');
const cartIcon = document.querySelector('.cart-icon');
const hamburger = document.querySelector('.hamburger');
const navlist = document.querySelector('.navlist');
const mobileMenu = document.querySelector('.mobile-menu');
const cartModal = document.getElementById('cartModal');
const orderModal = document.getElementById('orderModal');
const orderForm = document.getElementById('orderForm');

// Update cart UI
function updateCartUI() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartValueEl.textContent = totalItems;
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Add to cart
function addToCart(itemData) {
  const item = JSON.parse(itemData);
  const existingItem = cart.find(c => c.id === item.id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    item.quantity = 1;
    cart.push(item);
  }
  updateCartUI();
}

// Remove from cart
function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  updateCartUI();
  renderCartItems();
}

// Render cart items in modal
function renderCartItems() {
  const container = document.getElementById('cartItemsList');
  const totalEl = document.getElementById('cartTotal');
  if (cart.length === 0) {
    container.innerHTML = '<p>Your cart is empty</p>';
    totalEl.textContent = '0';
    return;
  }
  container.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div>
        <strong>${item.name}</strong> - $${item.price}
        <span> (x${item.quantity})</span>
      </div>
      <button onclick="removeFromCart(${item.id})">Remove</button>
    </div>
  `).join('');
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  totalEl.textContent = total;
}

// Show cart modal
function showCartModal() {
  renderCartItems();
  cartModal.style.display = 'block';
}

// Show order modal
function showOrderModal() {
  orderModal.style.display = 'block';
}

// Close modals
function closeModal(modal) {
  modal.style.display = 'none';
}

// Order form submit
function processOrder(e) {
  e.preventDefault();
  const formData = new FormData(orderForm);
  const order = {
    name: document.getElementById('customerName').value,
    phone: document.getElementById('customerPhone').value,
    address: document.getElementById('customerAddress').value,
    payment: document.getElementById('paymentMethod').value,
    cart: cart,
    total: document.getElementById('cartTotal').textContent
  };
  alert(`Order placed successfully!\nName: ${order.name}\nPhone: ${order.phone}\nPayment: ${order.payment}\nTotal: $${order.total}`);
  cart = [];
  updateCartUI();
  closeModal(cartModal);
  closeModal(orderModal);
  orderForm.reset();
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
  updateCartUI();

  // Add to cart buttons
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('add-to-cart')) {
      const itemData = e.target.closest('.order-card').dataset.item;
      addToCart(itemData);
    }
  });

  // Cart icon click
  cartIcon.addEventListener('click', showCartModal);

  // Checkout
  document.getElementById('checkoutBtn').addEventListener('click', showOrderModal);

  // Modal closes
  document.querySelectorAll('.close').forEach(closeBtn => {
    closeBtn.addEventListener('click', () => closeModal(closeBtn.closest('.modal')));
  });

  window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
      closeModal(e.target);
    }
  });

  // Order form
  orderForm.addEventListener('submit', processOrder);

  // Hamburger menu
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navlist.classList.toggle('active');
    mobileMenu.classList.toggle('active');
  });

  // Nav links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
});
