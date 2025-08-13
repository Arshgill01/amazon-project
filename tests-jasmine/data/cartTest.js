import { addToCart, cart, loadFromStorage } from "../../data/cart.js";
import { deliveryOptions } from "../../data/deliveryoptions.js";
import { products } from "../../data/products.js";

describe("test suite: addToCart ", () => {
  it("adds an existing product to the cart ", () => {
    spyOn(Object.getPrototypeOf(localStorage), "setItem");
    spyOn(Object.getPrototypeOf(localStorage), "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 1,
          deliveryOptionId: 1,
        },
      ]);
    });
    loadFromStorage();

    addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6", 1);
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart[0].quantity).toEqual(2);
  });
  it("adds a new product to the Cart", () => {
    spyOn(Object.getPrototypeOf(localStorage), "setItem");
    spyOn(Object.getPrototypeOf(localStorage), "getItem").and.callFake(() => {
      return JSON.stringify([]);
    });
    loadFromStorage();
    console.log(localStorage.getItem("cart"));
    addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6", 1);
    expect(cart.length).toEqual(1);
    expect(cart[0].quantity).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart[0].quantity).toEqual(1);
  });
});

//Flaky TEst == a test that sometimes passes, and sometimes fails.
//
