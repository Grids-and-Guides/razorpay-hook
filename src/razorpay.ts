/**
 * @see {@link https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/integration-steps/#123-checkout-options Razorpay Checkout Docs}
 */

import { useEffect } from "react";

/**
 * The checkout returns the response object of the successful payment (razorpay_payment_id, razorpay_order_id and razorpay_signature).
 * Collect these and send them to your server.
 *
 */
export interface RazorpaySuccessResponse {
  razorpay_signature: string;
  razorpay_order_id: string;
  razorpay_payment_id: string;
}

/**
 * @see {@link https://razorpay.com/docs/api/errors/#response-parameters Razorpay Checkout Docs}
 */
export interface RazorpayFailedResponse {
  error: {
    /**
     * String Type of the error.
     */
    code: string;

    /**
     *
     * String Descriptive text about the error.
     */
    description: string;

    /**
     * String The point of failure in the specific operation (payment in this case). Check the card, netbanking, wallets, UPI Collect, UPI Intent, Cardless EMI and Emandate sections to know about the possible values for each method.
     */
    source: string;
    /**
     * String Name of the parameter in the API request that caused the error.
     *
     */
    field: string;
    /**
     *
     * String The stage where the transaction failure occurred. The stages can vary depending on the payment method used to complete the transaction. Check the card, netbanking, wallets, UPI Collect, UPI Intent, Cardless EMI and Emandate sections to know about the possible values for each method.
     */
    step: string;

    /**
     * String The exact error reason. It can be handled programmatically.
     */
    reason: string;

    /**
     * Object Contains additional information about the request.
     */
    metadata: {
      /**
       *
       * String Unique identifier of the payment.
       *  */
      order_id: string;

      /**
       * String Unique identifier of the order associated with the payment.
       */
      payment_id: string;
    };
  };
}

export type RazorpayEventCallbackMap = {
  "payment.failed": (response: RazorpayFailedResponse) => void;
};

export type RazorpayEvent = keyof RazorpayEventCallbackMap;

export interface RazorpayCheckoutOptions {
  /**
   * String API Key ID generated from the Razorpay Dashboard.
   */
  key: string;

  /**
   * Integer The amount to be paid by the customer in currency subunits.
   * For example, if the amount is ₹500.00, enter 50000.
   */
  amount?: number;

  /**
   * String The currency in which the payment should be made by the customer.
   * the list of supported currencies.
   * @See {@link https://razorpay.com/docs/payments/payments/international-payments/#supported-currencies Razorpay Docs }
   */
  currency?: string;

  /**
   * String Your Business/Enterprise name shown on the Checkout form.
   * @example
   * Grids And Guides Technologies Pvt Ltd.
   */
  name?: string;

  /**
   * String Description of the purchase item shown on the Checkout form.
   * It should start with an alphanumeric character.
   */
  description?: string;

  /**
   * String Link to an image (usually your business logo) shown on the Checkout form.
   * Can also be a base64 string if you are not loading the image from a network.
   */
  image?: string; // business logo

  /**
   * String Order ID generated via Orders API.
   * * @See {@link https://razorpay.com/docs/api/orders/ Razorpay Docs }
   */
  order_id: string;

  /**
   * Handler call after payment success
   * @param response RazorpaySuccessResponse
   * @returns
   */

  handler?: (response: RazorpaySuccessResponse) => void;

  /**
   * Razorpay makes a POST call to the callback URL with the razorpay_payment_id,
   * razorpay_order_id and razorpay_signature in the response object of the successful payment.
   * Only successful authorisations are auto-submitted.
   */
  callback_url?: string;

  /**
   * Autofill customer contact details, especially phone number to ease form completion.
   * Include customer’s phone number in the contact parameter of the JSON request's prefill object.
   * Format: +(country code)(phone number).
   * Example: “contact": "+919000090000").
   * This is not applicable if you do not collect customer contact details on your website before checkout,
   * have Shopify stores or use any of the no-code apps.
   */
  prefill?: {
    /**
     * String Cardholder's name to be pre-filled if customer is to make card payments on Checkout.
     * @example Naveen.
     *
     */
    name?: string;

    /**
     * String Email address of the customer.
     * @example naveen@gridsandguides.com
     *
     */
    email?: string;

    /**
     * String Phone number of the customer. The expected format of the phone number is + {country code}{phone number}.
     * If the country code is not specified, 91 will be used as the default value.
     * This is particularly important while prefilling contact of customers with phone numbers issued outside India.
     */
    contact?: string;

    /**
     * String Pre-selection of the payment method for the customer.
     * Will only work if contact and email are also pre-filled.
     */
    method?: "card" | "netbanking" | "wallet" | "emi" | "upi";
  };

  /**
   * Set of key-value pairs that can be used to store additional information about the payment.
   * It can hold a maximum of 15 key-value pairs, each 256 characters long.
   */
  notes?: { [key: string]: string } & { length?: 15 } & {
    [key: string]: { length: 256 };
  };

  /**
   * Thematic options to modify the appearance of Checkout.
   */
  theme?: {
    /** Boolean Used to display or hide the top bar on the Checkout form.
     * This bar shows the selected payment method, phone number and gives the customer the option to navigate back
       to the start of the Checkout form.
     * Possible values:
     * true: Hides the top bar
     * false (default): Displays the top bar.
     */
    hide_topbar?: boolean;

    /**
     * String Enter your brand colour's HEX code to alter the text, payment method icons and CTA (call-to-action) button
      colour of the Checkout form.
     */
    color?: string;

    /**
     * String Enter a HEX code to change the Checkout's backdrop colour.
     */
    backdrop_color?: string;
  };

  /**
   * Options to handle the Checkout modal.
   */
  modal?: {
    /**
     * Boolean Indicates whether clicking the translucent blank space outside the Checkout form should close the form.
     * Possible values:
     * true: Closes the form when your customer clicks outside the checkout form.
     * false (default): Does not close the form when customer clicks outside the checkout form.
     */
    backdropclose?: boolean;

    /**
     * Boolean Indicates whether pressing the escape key should close the Checkout form. Possible values:
     * true (default): Closes the form when the customer presses the escape key.
     * false: Does not close the form when the customer presses the escape key.
     */
    escape?: boolean;

    /**
     * Boolean Determines whether Checkout must behave similar to the browser when back button is pressed. 
     * Possible values:
     * true (default): Checkout behaves similarly to the browser. That is, when the browser's back button is pressed, 
       the Checkout also simulates a back press. This happens as long as the Checkout modal is open.
     * false: Checkout does not simulate a back press when browser's back button is pressed. 
     * */
    handleback?: boolean;

    /**
     * Boolean Determines whether a confirmation dialog box should be shown if customers attempts to close Checkout.
     * Possible values:
     * true: Confirmation dialog box is shown.
     * false (default): Confirmation dialog box is not shown.
     */
    confirm_close?: boolean;

    /**
     * Function Used to track the status of Checkout. You can pass a modal object with ondismiss: function()\{\} as options.
     * This function is called when the modal is closed by the user.
     * @returns void
     *
     */
    ondismiss?: () => void;

    /**
     * Boolean Shows an animation before loading of Checkout.
     * Possible values:
     * true(default): Animation appears.
     * false: Animation does not appear.
     */
    animation?: boolean;
  };

  /**
   * String If you are accepting recurring payments using Razorpay Checkout, you should 
     pass the relevant subscription_id to the Checkout.
   * @See {@link https://razorpay.com/docs/api/payments/subscriptions/#checkout-integration Razorpay Docs }
   */
  subscription_id?: string;

  /**
   * Boolean Permit or restrict customer from changing the card linked to the subscription. 
     You can also do this from the hosted page.
   * @see {@link https://razorpay.com/docs/payments/subscriptions/payment-retries/#update-the-payment-method-via-our-hosted-page Razorpay Docs }
   *  Possible values:
   * true: Allow the customer to change the card from Checkout.
   * false (default): Do not allow the customer to change the card from Checkout.
   */
  subscription_card_change?: boolean;

  /** 
   * Boolean Determines if you are accepting recurring (charge-at-will) payments on Checkout via instruments 
     such as emandate, paper NACH and so on.
   * @See {@link https://razorpay.com/docs/api/payments/recurring-payments/ Razorpay Docs }
   * Possible values:
   * true: You are accepting recurring payments.
   * false (default): You are not accepting recurring payments.
  */
  recurring?: boolean;

  // /**
  //  * String Customers will be redirected to this URL on successful payment.
  //  * Ensure that the domain of the Callback URL is allowlisted.
  //  */
  // callback_url?: string;

  /**
   * Boolean Determines whether to post a response to the event handler post payment completion or redirect to Callback URL.
   * callback_url must be passed while using this parameter.
   * Possible values:
   * true: Customer is redirected to the specified callback URL in case of payment failure.
   * false (default): Customer is shown the Checkout popup to retry the payment with the suggested next best option.
   */
  redirect?: boolean;

  /**
   * String Unique identifier of customer. Used for:
   * Local saved cards feature.
   * @See {@link https://razorpay.com/docs/payments/dashboard/account-settings/configuration/#manage-saved-cards Razorpay Docs }
   * Static bank account details on Checkout in case of Bank Transfer payment method.
   * @See {@link https://razorpay.com/docs/payments/payment-methods/bank-transfer/ Razorpay Docs }
   */
  customer_id?: string;

  /**
   * Boolean Determines whether to allow saving of cards. Can also be configured via the Dashboard.
   * @See {@link https://razorpay.com/docs/payments/dashboard/account-settings/configuration/#enable-flash-checkout Razorpay Docs }
   * Possible values:
   * true: Enables card saving feature.
   * false (default): Disables card saving feature.
   */
  remember_customer?: boolean;

  /**
   * Integer Sets a timeout on Checkout, in seconds.
   * After the specified time limit, the customer will not be able to use Checkout.
   */
  timeout?: number;

  /**
   * Marks fields as readonly
   */
  readonly?: {
    /**
     * Boolean Used to set the contact,email,name field as readonly.
     * Possible values:
     * true: Customer will not be able to edit this field.
     * false (default): Customer will be able to edit this field.
     */
    contact?: boolean;

    email?: boolean;

    name?: boolean;
  };

  /**
   * Hides the contact details.
   */
  hidden?: {
    /**
     * Boolean Used to set the contact field as optional.
     * Possible values:
     * true: Customer will not be able to view this field.
     * false (default): Customer will be able to view this field.
     */
    contact?: boolean;
    email?: boolean;
  };

  /**
   * Boolean Used to auto-read OTP for cards and net banking pages.
   * Applicable from Android SDK version 1.5.9 and above.
   * Possible values:
   * true: OTP is auto-read.
   * false (default): OTP is not auto-read.
   */
  send_sms_hash?: boolean;

  /**
   * Boolean Used to rotate payment page as per screen orientation.
   * Applicable from Android SDK version 1.6.4 and above.
   * Possible values:
   * true: Payment page can be rotated.
   * false (default): Payment page cannot be rotated.
   */
  allow_rotation?: boolean;

  retry?: {
    /**
     * Boolean Determines whether the customers can retry payments on the checkout.
     * Possible values:
     * true (default): Enables customers to retry payments with the suggested next best option.
     * false: Disables customers from retrying the payment.
     */
    enabled?: boolean;

    /**
     * Integer The number of times the customer can retry the payment with the suggested next best option.
     * We recommend you to set this to 4.
     * Having a larger number here can cause loops to occur.
     */
    max_count?: boolean;
  };

  /**
   *
   *  Object Parameters that enable configuration of checkout display language.
   *
   * */
  config?: {
    // Object Child parameter that enables configuration of checkout display language.
    display: {
      /**
       * string The language in which checkout should be displayed.
       * Possible values:
       * en: English
       * ben: Bengali
       * hi: Hindi
       * mar: Marathi
       * guj: Gujarati
       * tam: Tamil
       * tel: Telugu
       * Default: en
       */
      language: "en" | "ben" | "hi" | "mar" | "guj" | "tam" | "tel";
    };
  };
}

class Razorpay {
  private readonly razorpayService: any;

  constructor(private readonly options: RazorpayCheckoutOptions) {
    this.options = options;

    // Validate the orderId
    if (!this.checkValidOrderId(this.options.order_id)) {
      console.error("Invalid Razorpay OrderId. Initialization aborted.");
      return;
    }

    // Initialize Razorpay only if running in a browser environment and orderId is valid
    if (typeof window !== "undefined") {
      this.razorpayService = new (window as any).Razorpay(this.options);
      console.info("Razorpay is loaded");
    }
  }

  /**
   * Registers an event listener for a specified Razorpay event.
   * @param event - The event to listen for. It should be a valid Razorpay event.
   * @param callback - The callback function to execute when the event is triggered.
   */
  public on<K extends RazorpayEvent>(
    event: K,
    callback: RazorpayEventCallbackMap[K]
  ) {
    this.razorpayService.on(event, callback);
  }

  /**
   * Retrieves the current Razorpay checkout options.
   * @returns The current Razorpay checkout options.
   */
  public get(): RazorpayCheckoutOptions {
    return this.razorpayService.get();
  }

  /**
   * Opens the Razorpay checkout interface.
   * This method initiates the payment process by displaying the Razorpay checkout window.
   */
  public open() {
    this.razorpayService.open();
  }

  /**
   * Closes the Razorpay checkout interface.
   * This method hides the Razorpay checkout window and terminates the payment process.
   */
  public close(): void {
    this.razorpayService.close();
  }

  /**
   * Retrieves the current mode of the Razorpay service.
   * @returns A string representing the mode in which the Razorpay service is operating.
   */
  public getMode(): string {
    return this.razorpayService.getMode();
  }

  /**
   * Validates the given orderId to ensure it meets Razorpay's order ID format requirements.
   * @param orderId - The order ID to validate.
   * @returns A boolean indicating whether the order ID is valid.
   */
  private checkValidOrderId(orderId: string): boolean {
    const regex = /^order_[a-zA-Z0-9]{14,}$/;
    if (!regex.test(orderId)) {
      console.error("Invalid Razorpay OrderId");
      return false;
    }
    return true;
  }
}

export function useRazorpay() {
  const RAZORPAY_SCRIPT = "https://checkout.razorpay.com/v1/checkout.js";

  const loadScript = (src: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      if (!(typeof window !== "undefined")) reject(false);
      const script = document.createElement("script");
      script.src = src;
      script.id = "razorpay-script";
      script.onload = (e) => {
        resolve(true);
      };

      script.onerror = (e) => {
        reject(false);
      };
      document.body.appendChild(script);
    });
  };

  useEffect(() => {

    const checkScriptLoaded: () => boolean = () => {
      if (!(typeof window !== "undefined") || !("Razorpay" in window))
        return false;
      return true;
    };

    if (!checkScriptLoaded()) {
      (async () => {
        try {
          await loadScript(RAZORPAY_SCRIPT);
        } catch (error: any) {
          console.log("Failed to load");
          alert(
            "Failed to load Razorpay script!!.Check your Internet Connection"
          );
        }
      })();
    }
  }, []);

  return Razorpay as typeof Razorpay;
}
