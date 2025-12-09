/**
 * @see {@link https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/integration-steps/#123-checkout-options Razorpay Checkout Docs}
 */

import {
  RazorpayCheckoutOptions,
  RazorpayEvent,
  RazorpayEventCallbackMap,
} from "./types";

export class Razorpay {
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
