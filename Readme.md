# Razorpay

Seamlessly integrate Razorpay's powerful payment solutions into your React and Next.js applications. This package simplifies the process of setting up secure,types safety, reliable, and efficient payment gateways, giving developers a streamlined experience while building high-performance apps.

## Basic Example

```js
// Import the hook
//Note: If you are using nextjs call "use client" at top of the file to make a component as client
import {
  useRazorpay,
  RazorpayCheckoutOptions,
  RazorpaySuccessResponse,
} from "razorpay-hook";

export default function Razorpay() {
  //calling the hook inside the functional component
  const Razorpay = useRazorpay();

  const handlePayment = async () => {
    const order = await createOrder(); // must Create order on your backend for security purpose

    // After order success will get razorpay orderId from your backend response
    const options: RazorpayCheckoutOptions = {
      /**
       * String API Key ID generated from the Razorpay Dashboard.
       * Note: Please call the key id form environment variables
       * */
      key: "YOUR_KEY_ID",

      /**
       * Integer The amount to be paid by the customer in currency subunits.
       * For example, if the amount is ₹500.00, enter 50000.
       * Note: Amount is optional field, you will give an amount during order creation in backend.
       * Your order id have the information about the order and you will notice when the pop up is open.
       */
      amount: 50000,

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
      name: "Grids And Guides Technologies",

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
        alert(response);
      },
    };

    // calling the constructor passing checkout options
    const rz = new Razorpay(options);

    //calling open method
    rz.open();

    // handle failure scenario
    rz.on("payment.failed", function (response) {
      alert(response.error);
    });
  };

  return (
    <>
      <button onClick={handlePayment}> pay </button>
    </>
  );
}
```

For more information read official docs https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/integration-steps/#123-checkout-options
