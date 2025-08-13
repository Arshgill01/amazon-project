// A class is just a better way of generating objects in OOP
// filed = property
class Cart {
  cartItems;
  #localStoragekey;
  constructor(localStoragekey) {
    this.localStoragekey = localStoragekey;
    this.#loadFromStorage();
  }
  #loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.localStoragekey));

    if (!this.cartItems) {
      this.cartItems = [
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 2,
          deliveryOptionId: "1",
        },
        {
          productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
          quantity: 1,
          deliveryOptionId: "2",
        },
      ];
    }
  }

  storeCartItem() {
    localStorage.setItem(this.localStoragekey, JSON.stringify(this.cartItems));
  }

  addToCart(productId, quantity = null) {
    let matchingItem;
    let selectedQuantity;
    if (quantity === null) {
      const quantitySelector = document.querySelector(
        `.js-quantity-selector-${productId}`,
      );
      selectedQuantity = Number(quantitySelector.value);
    } else {
      selectedQuantity = quantity;
    }
    this.cartItems.forEach((item) => {
      if (productId === item.productId) {
        matchingItem = item;
      }
    });
    if (matchingItem) {
      matchingItem.quantity += selectedQuantity;
    } else {
      this.cartItems.push({
        productId: productId,
        quantity: selectedQuantity,
        deliveryOptionId: "1",
      });
    }
    this.storeCartItem();
  }
  removeCartItem(productId) {
    let newCart = [];
    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId !== productId) {
        newCart.push(cartItem);
      }
    });
    this.cartItems = newCart;
    this.storeCartItem();
  }
  updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;
    this.cartItems.forEach((item) => {
      if (productId === item.productId) {
        matchingItem = item;
      }
    });
    matchingItem.deliveryOptionId = deliveryOptionId;
    this.storeCartItem();
  }
}

const cart = new Cart("cart-oop");
const businessCart = new Cart("businessCart-oop");
cart.addToCart("83d4ca15-0f35-48f5-b7a3-1ea210004f2e", 1);
console.log(businessCart);
console.log(cart);
