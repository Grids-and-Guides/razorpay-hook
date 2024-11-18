import React, { useEffect } from "react";

interface RazorpayScriptProps
  extends React.DetailedHTMLProps<
    React.ScriptHTMLAttributes<HTMLScriptElement>,
    HTMLScriptElement
  > {}

const RazorpayScript: React.FC<RazorpayScriptProps> = ({ ...attributes }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";

    Object.entries(attributes).forEach(([key, value]) => {
      (script as any)[key] = value;
    });
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [attributes]);

  return null;
};

export { RazorpayScript };
