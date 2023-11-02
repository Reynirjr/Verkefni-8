import { formatPrice } from './helpers.js';

function updateTotalPrice() {
  const totalPriceElement = document.querySelector('.priceTotal');
  const cartRows = document.querySelectorAll('.cart tbody tr');
  let totalSum = 0;

  for (const line of cartRows) {
    const p = parseFloat(line.dataset.price);
    const q = parseInt(line.dataset.quantity, 10);
    totalSum += p * q;
  }

  totalPriceElement.textContent = `${formatPrice(totalSum)} kr.-`;
}

function showEmptyCartMessage() {
  document.querySelector('.tableToggle').style.display = "none";
  document.querySelector('.empty-message').style.display = "block";
  document.querySelector('.completeButton').style.display = "none";
}

function deleteLineFromCart(event) {
  event.preventDefault();
  const lineToDelete = event.submitter.closest('tr');
  lineToDelete.parentElement.removeChild(lineToDelete);
  updateTotalPrice();

  if (document.querySelector('.cart tbody tr') === null) {
    showEmptyCartMessage();
  }
}

export function createCartLine(product, quantity) {
  const cartLineElement = document.createElement('tr');
  cartLineElement.dataset.quantity = quantity.toString();
  cartLineElement.dataset.price = product.price.toString();
  cartLineElement.dataset.productId = product.id.toString();

  const titleElement = document.createElement('td');
  titleElement.textContent = product.title;
  cartLineElement.appendChild(titleElement);

  const quantityElement = document.createElement('td');
  quantityElement.textContent = quantity.toString();
  cartLineElement.appendChild(quantityElement);

  const priceElement = document.createElement('td');
  priceElement.classList = "price";
  priceElement.textContent = formatPrice(product.price);
  cartLineElement.appendChild(priceElement);
  
  const totalElement = document.createElement('td');
  totalElement.textContent = formatPrice(product.price * quantity);
  cartLineElement.appendChild(totalElement);

  const formTdElement = document.createElement('td');
  const formElement = document.createElement('form');
  formElement.addEventListener('submit', deleteLineFromCart);
  const buttonElement = document.createElement('button');
  buttonElement.textContent = 'Eyða';
  formElement.appendChild(buttonElement);
  formTdElement.appendChild(formElement);
  cartLineElement.appendChild(formTdElement);

  return cartLineElement;
}

export function showCartContent(show = true) {
  const cartElement = document.querySelector('.cart');

  if (!cartElement) {
    console.warn('fann ekki .cart');
    return;
  }

  const emptyMessage = cartElement.querySelector('.empty-message');
  const cartContent = cartElement.querySelector('.cart-content');

  if (!emptyMessage || !cartContent) {
    console.warn('fann ekki element');
    return;
  }

  if (show) {
    cartContent.style.display = 'block';
    emptyMessage.style.display = 'none';
  } else {
    cartContent.style.display = 'none';
    emptyMessage.style.display = 'block';
  }
}