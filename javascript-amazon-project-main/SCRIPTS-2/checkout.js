import { products } from "../data/products.js";
import { formatCurrency } from "../data/money.js";
import { cart, addToCart } from "../data/cart.js";

let cartSummryHtml = '';

cart.forEach((cartItem) => {
  const prodictId = cartItem.productId;

  let matchingProduct;

  products.forEach((product) => {
    if (product.id === productId) matchingProduct = product;
  });

  cartSummryHtml += `


      <div class="cart-items-container js-cart=item-container-${matchingProduct.id}"> 

          <div class="delivery-date">
          Delivery date: Monday, July 6
          </div>

          <div class="cart-items-grid">
              <div class="product-images">

          <img class="product-image" src="${matchingProduct.image}">

        </div>

        <div class="cart-item-detailes">

          <div class="product-name">${matchingProduct.name}</div>

          <div class="product-price">  $${formatCurrency(matchingProduct.priceCents)} </div>

          <div class="text">
            Quantity: <span class="count-items"> ${cartItem.quantity}</span>

             <span class="update-items link-primary"> Update </span>

              <span class="delete-items link-primary js-delete-link data-product-id="${matchingProduct.id}"> Delete </span>

          </div>

        </div>

        <div class="cart-item-options">

          <div class="option-title">Choose a delivery option:</div>

          <div class="delevry-and-price-and-input-options">

            <input class="input-option  name="delivery-option-${matchingProduct.id}" type="radio">

            <div class="delevry-and-price-options">

              <div class="delevry-option">Tuesday, July 14</div>

              <div class="price-option">FREE Shipping</div>
            </div>

             </div>

               <div class="delevry-and-price-and-input-options">

            <input class="input-option  name="delivery-option-${matchingProduct.id}" type="radio">

            <div class="delevry-and-price-options">

              <div class="delevry-option">Wednesday, July 8</div>

              <div class="price-option">$4.99 - Shipping</div>
            </div>

             </div>

               <div class="delevry-and-price-and-input-options">

            <input class="input-option  name="delivery-option-${matchingProduct.id}" type="radio">

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


document.querySelector('.js-order-summary').innerHTML=cartSummryHtml;


function updateCartQuantity() {
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  document.querySelector('.js-cart-quantity')
    .innerHTML = cartQuantity;
}