//Pascal-Case for things that generate objects.
//Pascal-Case - start every word with a capital letter.
//Class -- Object Generator
//OOP -- organizing our code into objects  tried to immitate the real world
//Classes -- help us generate these objects.
// shorthand-method syntax --- instead of functionName: function(){}, you can just go with functionName(){}
// this -- a better way of pointing to/retrieving the outer object.
function Cart(localStoragekey) {
  const cart = {
    cartItems: undefined,
    loadFromStorage() {
      this.cartItems = JSON.parse(localStorage.getItem(localStoragekey));

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
    },
    storeCartItem() {
      localStorage.setItem(localStoragekey, JSON.stringify(this.cartItems));
    },
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
    },

    removeCartItem(productId) {
      let newCart = [];
      this.cartItems.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
          newCart.push(cartItem);
        }
      });
      this.cartItems = newCart;
      this.storeCartItem();
    },

    updateDeliveryOption(productId, deliveryOptionId) {
      let matchingItem;
      this.cartItems.forEach((item) => {
        if (productId === item.productId) {
          matchingItem = item;
        }
      });
      matchingItem.deliveryOptionId = deliveryOptionId;
      this.storeCartItem();
    },
  };
  return cart;
}
const cart = Cart("cart-oop");
const businessCart = Cart("businessCart-oop");
cart.loadFromStorage();
businessCart.loadFromStorage();
cart.addToCart("83d4ca15-0f35-48f5-b7a3-1ea210004f2e", 1);
console.log(businessCart);
console.log(cart);
