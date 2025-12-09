import { useEffect } from "react";
import { Razorpay } from "./razorpay";

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
