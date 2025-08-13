import { formatCurrency } from "../scripts/utils/money.js";
if (formatCurrency(2095) === "20.95") {
  console.log("passed");
} else {
  console.log("failed");
}

if (formatCurrency(2000.4) === "20.00") {
  console.log("passed");
} else {
  console.log("failed");

  // Group of related tests == test suite
  // try to give each test case a meaningful name
  // Add test suite to each of the related tests
  // testing frameWork -- Jasmine ( makes testing much easier and smarter. )
  //
  // In jasmine spec = test
}
