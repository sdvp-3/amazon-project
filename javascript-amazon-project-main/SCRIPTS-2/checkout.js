import { products } from "../data/products.js";
import { formatCurrency } from "../data/money.js";
import { cart } from "../data/cart.js";

function renderCheckout() {
  let cartSummaryHtml = '';
  let itemCount = 0;
  let subtotalCents = 0;

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    let matchingProduct = null;

    products.forEach((product) => {
      if (product.id === productId) {
        matchingProduct = product;
      }
    });

    if (!matchingProduct) {
      return;
    }

    itemCount += cartItem.quantity;
    subtotalCents += matchingProduct.priceCents * cartItem.quantity;

    const imageSrc = matchingProduct.image.trim();
    const itemPrice = formatCurrency(matchingProduct.priceCents);

    cartSummaryHtml += `
      <div class="cart-items-container js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
          Delivery date: Monday, July 6
        </div>

        <div class="cart-items-grid">
          <div class="product-images">
            <img class="product-image" src="${imageSrc}">
          </div>

          <div class="cart-item-detailes">
            <div class="product-name">${matchingProduct.name}</div>
            <div class="product-price">$${itemPrice}</div>

            <div class="text">
              Quantity: <span class="count-items">${cartItem.quantity}</span>
              <span class="update-items link-primary">Update</span>
              <span class="delete-items link-primary js-delete-link" data-product-id="${matchingProduct.id}">Delete</span>
            </div>
          </div>

          <div class="cart-item-options">
            <div class="option-title">Choose a delivery option:</div>

            <div class="delevry-and-price-and-input-options">
              <input class="input-option" name="delivery-option-${matchingProduct.id}" type="radio">
              <div class="delevry-and-price-options">
                <div class="delevry-option">Tuesday, July 14</div>
                <div class="price-option">FREE Shipping</div>
              </div>
            </div>

            <div class="delevry-and-price-and-input-options">
              <input class="input-option" name="delivery-option-${matchingProduct.id}" type="radio">
              <div class="delevry-and-price-options">
                <div class="delevry-option">Wednesday, July 8</div>
                <div class="price-option">$4.99 - Shipping</div>
              </div>
            </div>

            <div class="delevry-and-price-and-input-options">
              <input class="input-option" name="delivery-option-${matchingProduct.id}" type="radio">
              <div class="delevry-and-price-options">
                <div class="delevry-option">Monday, July 6</div>
                <div class="price-option">$9.99 - Shipping</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  });

  const orderSummaryElement = document.querySelector('.js-order-summary');
  if (orderSummaryElement) {
    orderSummaryElement.innerHTML = cartSummaryHtml;
  }

  const shippingCents = 999;
  const beforeTaxCents = subtotalCents + shippingCents;
  const taxCents = Math.round(beforeTaxCents * 0.1);
  const totalCents = beforeTaxCents + taxCents;

  const itemsCountElement = document.querySelector('.js-items-count');
  if (itemsCountElement) {
    itemsCountElement.innerHTML = itemCount;
  }

  const itemsPriceElement = document.querySelector('.js-items-price');
  if (itemsPriceElement) {
    itemsPriceElement.innerHTML = `$${formatCurrency(subtotalCents)}`;
  }

  const shippingPriceElement = document.querySelector('.js-shipping-price');
  if (shippingPriceElement) {
    shippingPriceElement.innerHTML = `$${formatCurrency(shippingCents)}`;
  }

  const subtotalPriceElement = document.querySelector('.js-subtotal-price');
  if (subtotalPriceElement) {
    subtotalPriceElement.innerHTML = `$${formatCurrency(beforeTaxCents)}`;
  }

  const taxPriceElement = document.querySelector('.js-tax-price');
  if (taxPriceElement) {
    taxPriceElement.innerHTML = `$${formatCurrency(taxCents)}`;
  }

  const totalPriceElement = document.querySelector('.js-total-price');
  if (totalPriceElement) {
    totalPriceElement.innerHTML = `$${formatCurrency(totalCents)}`;
  }
}

function updateCartQuantity() {
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  const cartQuantityElement = document.querySelector('.js-cart-quantity');
  if (cartQuantityElement) {
    const label = cartQuantity === 1 ? 'Item' : 'Items';
    cartQuantityElement.innerHTML = `${cartQuantity} ${label}`;
  }
}

renderCheckout();
updateCartQuantity();