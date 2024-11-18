# Razorpay

Seamlessly integrate Razorpay's powerful payment solutions into your React and Next.js applications. This package simplifies the process of setting up secure,types safety, reliable, and efficient payment gateways, giving developers a streamlined experience while building high-performance apps.

## Basic Example

```js
// Import the Script component
import { RazorpayScript } from "razorpay-hook";
```

```js
// then need to import the constructor
import { Razorpay, type RazorpayCheckoutOptions } from "razorpay-hook";

const handlePayment = async (params) => {
  const order = await createOrder(params); // must Create order on your backend for security purpose

  // After order success will get razorpay orderId from your backend response
  const options: RazorpayCheckoutOptions = {
    key: "YOUR_KEY_ID", // String API Key ID generated from the Razorpay Dashboard.

    /**
     * Integer The amount to be paid by the customer in currency subunits.
     * For example, if the amount is ₹500.00, enter 50000.
     * Note: Amount is optional field, you will give an amount during order creation in backend.
     * Your order id have the information about the order and you will notice when the pop up is open.
     */
    amount: "50000",

    /**
     * String The currency in which the payment should be made by the customer.
     * the list of supported currencies.
     * @See {@link https://razorpay.com/docs/payments/payments/international-payments/#supported-currencies Razorpay Docs }
     */
    currency: "INR",

    /**
     * String Your Business/Enterprise name shown on the Checkout form.
     * @example
     * Grids And Guides Technologies Pvt Ltd.
     */
    name: "Acme Corp",

    /**
     * String Description of the purchase item shown on the Checkout form.
     * It should start with an alphanumeric character.
     */
    description: "Test Transaction",
    image: "https://example.com/your_logo",

    /**
     * String Order ID generated via Orders API.
     * * @See {@link https://razorpay.com/docs/api/orders/ Razorpay Docs }
     * Note: Blow order id displayed only for reference. You need to pass order id generated via order api response.
     * If you passing invalid order id the pop up will not open, you will see the error from the console.
     */
    order_id: "order_9A33XWu170gUtm",
    handler: function (response: RazorpaySuccessResponse) {
      alert(response.razorpay_payment_id);
      alert(response.razorpay_order_id);
      alert(response.razorpay_signature);
    },
  };

  // calling the constructor passing checkout options
  const rz = new Razorpay(options);

  //calling open method
  rz.open();

  // handle failure scenario
  rz.on("payment.failed", function (response) {
    alert(response.error.code);
    alert(response.error.description);
    alert(response.error.source);
    alert(response.error.step);
    alert(response.error.reason);
    alert(response.error.metadata.order_id);
    alert(response.error.metadata.payment_id);
  });
};
```

For more information read official docs https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/integration-steps/#123-checkout-options
