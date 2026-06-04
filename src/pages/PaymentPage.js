import { CreditCard, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function PaymentPage() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#2980b9",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{
          width: "100%",
          maxWidth: "520px",
          backgroundColor: "#ffffff",
          borderRadius: "18px",
          boxShadow: "0 18px 45px rgba(0,0,0,0.18)",
          padding: "36px",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <h1
            style={{
              fontSize: "26px",
              fontWeight: "700",
              color: "#2c3e50",
              marginBottom: "10px",
              letterSpacing: "0.2px",
            }}
          >
            One Final Step
          </h1>
          <p
            style={{
              fontSize: "15px",
              color: "#5f6c7b",
              lineHeight: "1.7",
              maxWidth: "420px",
              margin: "0 auto",
            }}
          >
            You’re almost done.  
            Complete your payment below to unlock submission of your
            application.
          </p>
        </div>

        {/* Highlight Panel */}
        <div
          style={{
            background:
              "linear-gradient(135deg, #f7f9fb 0%, #eef2f5 100%)",
            borderRadius: "14px",
            padding: "22px",
            marginBottom: "26px",
            borderLeft: "5px solid #C9A24D",
          }}
        >
          <p
            style={{
              fontSize: "14.5px",
              color: "#2c3e50",
              lineHeight: "1.7",
              marginBottom: "10px",
            }}
          >
            <strong>What happens next?</strong>
          </p>
          <ul
            style={{
              paddingLeft: "18px",
              margin: 0,
              color: "#4b5563",
              fontSize: "14px",
              lineHeight: "1.6",
            }}
          >
            <li>You’ll be redirected to our secure payment gateway</li>
            <li>Your transaction will be processed instantly</li>
            <li>You’ll return automatically to complete your submission</li>
          </ul>
        </div>

        {/* Pay Button */}
        <button
          onClick={() => {
            // TODO: initiate payment
            navigate("/certificate-payment/redirect");
          }}
          style={{
            width: "100%",
            padding: "15px",
            background:
              "linear-gradient(135deg, #D4AF37 0%, #C9A24D 100%)",
            color: "#ffffff",
            fontSize: "16px",
            fontWeight: "600",
            border: "none",
            borderRadius: "12px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            letterSpacing: "0.3px",
          }}
        >
          <CreditCard size={18} />
          Proceed to Secure Payment
        </button>

        {/* Trust Footer */}
        <div
          style={{
            marginTop: "24px",
            textAlign: "center",
            fontSize: "13px",
            color: "#6b7280",
            lineHeight: "1.6",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "8px",
              marginBottom: "4px",
            }}
          >
            <ShieldCheck size={16} color="#27ae60" />
            Secure & encrypted transaction
          </div>
          Trusted payment processing in compliance with national standards
        </div>
      </motion.div>
    </div>
  );
}
