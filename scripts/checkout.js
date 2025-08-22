import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
// import "../data/cart-class.js";
import "../data/backend-practice.js";
import { loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";

// async -- a better way to work with promises ; makes a function return a promise.
// So we're talking about creating errors ourselves -- there are 2 ways -
// using 'throw'
// if we want to throw an error in the future -- use reject, instead. -- coz throw does not work in the future.
//
// reject-- second parameter offered by promises. - lets us create an error in the future.
async function loadPage() {
  try {
    console.log("load page");
    await loadProductsFetch();
    await new Promise((resolve, reject) => {
      loadCart(() => {
        //reject("error2");
        resolve();
      });
    });
  } catch (error) {
    console.log("Unexpected Error. Please try again later.");
  }

  // throw does not work in the future.
  renderOrderSummary();
  renderPaymentSummary();
  // returning in this function will result in automatic wrap of that statement, that word, that string with a resolve function.
}

// await -- lets us write asynchronous code like normal code.
// We can only use await when we're inside an async function.
// async await can only be used with promises, it doesn't do anything with a callback.

// the closest function will have to be async.

// use async await over promises and callbacks
loadPage().then(() => {
  console.log("next step");
});
/*
Promise.all([
  loadProductsFetch(),
  new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  }),
]).then((values) => {
  console.log(values);
  renderOrderSummary();
  renderPaymentSummary();
});
*/
// Fetch is a better way to make http requests.
