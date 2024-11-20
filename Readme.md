# Razorpay

Seamlessly integrate Razorpay's powerful payment solutions into your React and Next.js applications. This package simplifies the process of setting up secure,types safety, reliable, and efficient payment gateways, giving developers a streamlined experience while building high-performance apps.


### Prerequisites

Before starting the integration, make sure to complete the following steps:

1. **Create a Razorpay Account**:  
   Visit [Razorpay](https://razorpay.com) and sign up for an account. Once registered, you’ll have access to your API Key ID and Secret, which are essential for integration. Navigate to the **API Keys** section in the Razorpay Dashboard to generate your API keys.

2. **Set Up Your Backend API**:  
   To securely create Razorpay orders, you need to write a backend API. This backend API will generate an order using Razorpay’s [Orders API](https://razorpay.com/docs/api/orders/) and return the `orderId` to your frontend. Here’s a brief outline of what your backend code should include:
   
   - **Import Required Modules**: Use your preferred backend language or framework (e.g., Node.js, Python, etc.).
   - **Authenticate Using Your API Key and Secret**: Ensure secure storage of these credentials.
   - **Create an Order**: Pass parameters like `amount`, `currency`, and `receipt` to generate the order.
   - **Return the Order ID**: Send the `orderId` as part of your API response to the frontend.


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
    const response = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }); // must Create order on your backend for security purpose

    const data = await response.json();
    // After order success will get razorpay orderId from your backend response
    const options: RazorpayCheckoutOptions = {
      /**
       * String API Key ID generated from the Razorpay Dashboard.
       * Note: Please call the key id from environment variables
       * */
      key: "YOUR_KEY_ID",

      /**
       * Integer The amount to be paid by the customer in currency subunits.
       * For example, if the amount is ₹500.00, enter 50000.
       * Note: Amount is optional field, you will give an amount during order creation in backend.
       * Your order id have the information about the order and you will notice when the pop up is open.
       */
      amount: data.amount,

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
       * Note: Below order id displayed only for reference. You need to pass order id generated via order api response.
       * If you passing invalid order id the pop up will not open, you will see the error from the console.
       */
      order_id: data.orderId // "order_9A33XWu170gUtm",
      handler: function (response: RazorpaySuccessResponse) {
        console.log(response);
        // write your redirection or others business logic
      },
    };

    // calling the constructor passing checkout options
    const rz = new Razorpay(options);

    //calling open method
    rz.open();

    // handle failure scenario
    rz.on("payment.failed", function (response) {
      console.log(response.error);
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
