import { createCartLine, showCartContent } from './lib/ui.js';
import { formatNumber } from './lib/helpers.js';

const products = [
  {
    id: 1,
    title: 'HTML húfa',
    description:
      'Húfa sem heldur hausnum heitum og hvíslar hugsanlega að þér hvaða element væri best að nota.',
    price: 5_000,
  },
  {
    id: 2,
    title: 'CSS sokkar',
    description: 'Sokkar sem skalast vel með hvaða fótum sem er.',
    price: 3_000,
  },
  {
    id: 3,
    title: 'JavaScript jakki',
    description: 'Mjög töff jakki fyrir öll sem skrifa JavaScript reglulega.',
    price: 20_000,
  },
];
document.addEventListener('DOMContentLoaded', () => {
const addForms = document.querySelectorAll('.add');
addForms.forEach(form => {
  form.addEventListener('submit', submitHandler);
});
});


/** Bæta vöru í körfu */
function addProductToCart(product, quantity = 1) {
  const cart = document.querySelector('.cart-items');

  if (!cart) {
    console.warn('fann ekki .table tbody');
    return;
  }
}
  // TODO hér þarf að athuga hvort lína fyrir vöruna sé þegar til
 let cartLine = cart.querySelector(`tr[data-product-id="${product.id}"]`);
  if (cartLine) {

    let quantityElement = cartLine.querySelector('.quantity');
    let totalElement = cartLine.querySelector('.total .price');
    let currentQuantity = parseInt(quantityElement.textContent);
    let newQuantity = currentQuantity + quantity;
    quantityElement.textContent = newQuantity;
    totalElement.textContent = `${formatNumber(product.price * newQuantity)} kr.-`;
    updatecartrtotal();
  }

  export function updatecarttotal() {
    const cartLines = document.querySelectorAll('tr[data-cart-product-id]');
    let total = 0;

    cartLines.forEach(cartLine => {
      const priceElement = line.querySelector('.total .price');
      const priceText = priceElement.textContent.replace(' kr.-', '').replace('ISK', '').trim().replace(/\./g, '').replace(',', '');
      const price = parseFloat(priceText);
      if (!isNaN(price)) {
        total += price;
      } else {
        console.warn('Villa í verði');
      }
    });
    
    const totalElement = document.querySelector('.cart-total .price');
    if (totalElement) {
      totalElement.textContent = formatNumber(total);
    }

  // Sýna efni körfu
  showCartContent(cartLines.length > 0);
  
  // TODO sýna/uppfæra samtölu körfu
  const cartSummary = document.querySelector('.cart-summary');
  if(cartSummary) {
    const totalQuantity = Array.from(cart.querySelectorAll('.quantity'))
      .reduce((sum, el) => sum + parseInt(el.textContent, 10), 0);
    cartSummary.textContent = `Total items in cart: ${totalQuantity}`;
  }
}

function submitHandler(event) {
  event.preventDefault();
const parent = event.target.closest('.tr');
const productId = Number.parseInt(parent.dataset.productId);

const product = products.find(p => p.id === productId);

const quantityinput = parent.querySelector('input[type="number"]');
const quantity = Number.parseInt(quantityinput.value, 10);

if (isNaN(quantity) || quantity < 1) {
  alert('ólögmætur fjöldi');
  return;

}

addProductToCart(product, quantity);
}

// TODO bæta við event handler á form sem submittar pöntun
const orderForm = document.querySelector('.order-form');
if(orderForm) {
  orderForm.addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Order submitted successfully!');
  });
}

