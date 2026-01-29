import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [hoveredCard, setHoveredCard] = React.useState(null);

  const styles = {
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "80px 20px",
      fontFamily: "'Inter', sans-serif",
      textAlign: "center",
    },
    badge: {
      fontSize: "12px",
      fontWeight: "700",
      color: "#60a5fa",
      textTransform: "uppercase",
      letterSpacing: "2px",
      marginBottom: "20px",
      animation: "fadeIn 0.8s ease",
      display: "inline-block",
      padding: "8px 16px",
      background: "rgba(59, 130, 246, 0.1)",
      borderRadius: "20px",
      border: "1px solid rgba(59, 130, 246, 0.2)",
    },
    heroTitle: {
      fontSize: "64px",
      fontWeight: "800",
      letterSpacing: "-1px",
      lineHeight: "1.1",
      marginBottom: "24px",
      background: "linear-gradient(135deg, #f8fafc 0%, #cbd5e1 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      animation: "fadeInUp 1s ease",
    },
    heroSubtitle: {
      fontSize: "20px",
      color: "#94a3b8",
      maxWidth: "600px",
      margin: "0 auto 40px",
      lineHeight: "1.6",
      animation: "fadeInUp 1.2s ease",
    },
    ctaGroup: {
      display: "flex",
      justifyContent: "center",
      gap: "20px",
      marginBottom: "80px",
      animation: "fadeInUp 1.4s ease",
    },
    btnPrimary: {
      padding: "16px 32px",
      borderRadius: "12px",
      background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
      color: "white",
      fontWeight: "600",
      textDecoration: "none",
      fontSize: "16px",
      boxShadow: "0 10px 25px -10px rgba(59, 130, 246, 0.5)",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      display: "inline-block",
      border: "none",
    },
    btnPrimaryHover: {
      transform: "translateY(-2px) scale(1.02)",
      boxShadow: "0 20px 40px -10px rgba(59, 130, 246, 0.6)",
    },
    btnSecondary: {
      padding: "16px 32px",
      borderRadius: "12px",
      background: "rgba(30, 41, 59, 0.5)",
      color: "#f8fafc",
      fontWeight: "600",
      textDecoration: "none",
      fontSize: "16px",
      border: "1px solid #334155",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      display: "inline-block",
      backdropFilter: "blur(10px)",
    },
    btnSecondaryHover: {
      background: "rgba(51, 65, 85, 0.6)",
      borderColor: "#475569",
      transform: "translateY(-2px)",
    },
    featureGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "30px",
      marginTop: "60px",
      textAlign: "left",
    },
    card: (isHovered) => ({
      background: isHovered
        ? "linear-gradient(145deg, #242b3d 0%, #1a202e 100%)"
        : "linear-gradient(145deg, #1a202e 0%, #0f1419 100%)",
      padding: "30px",
      borderRadius: "20px",
      border: isHovered ? "1px solid rgba(59, 130, 246, 0.3)" : "1px solid #334155",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      transform: isHovered ? "translateY(-8px)" : "translateY(0)",
      boxShadow: isHovered
        ? "0 20px 40px -10px rgba(0, 0, 0, 0.3), 0 0 20px rgba(59, 130, 246, 0.2)"
        : "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      cursor: "pointer",
    }),
    cardIcon: {
      fontSize: "48px",
      marginBottom: "20px",
      display: "block",
      filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))",
    },
    cardTitle: {
      fontSize: "22px",
      fontWeight: "700",
      color: "#f8fafc",
      marginBottom: "12px",
      background: "linear-gradient(135deg, #f8fafc 0%, #cbd5e1 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
    cardText: {
      color: "#94a3b8",
      lineHeight: "1.7",
      fontSize: "15px",
    },
  };

  const [primaryHover, setPrimaryHover] = React.useState(false);
  const [secondaryHover, setSecondaryHover] = React.useState(false);

  const features = [
    {
      icon: "🛡️",
      title: "Tamper-Proof",
      description: "Once hashed on the blockchain, records are immutable. No more fake certificates or forged documents."
    },
    {
      icon: "⚡",
      title: "Instant Verification",
      description: "Verify any document in milliseconds by scanning a QR code or dragging and dropping the file."
    },
    {
      icon: "🌍",
      title: "Global Standard",
      description: "Built on Ethereum, recognized worldwide. A decentralized source of truth for all your credentials."
    }
  ];

  return (
    <div style={styles.container}>
      <div>
        <div style={styles.badge}>
          Blockchain Powered Security
        </div>
        <h1 style={styles.heroTitle}>
          The Future of <br />
          <span style={{
            background: "linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}>
            Document Integrity
          </span>
        </h1>
        <p style={styles.heroSubtitle}>
          Issue, store, and verify tamper-proof credentials directly on the Ethereum blockchain. Secure. Immutable. Forever.
        </p>

        <div style={styles.ctaGroup}>
          <Link
            to="/add"
            style={{
              ...styles.btnPrimary,
              ...(primaryHover ? styles.btnPrimaryHover : {})
            }}
            onMouseEnter={() => setPrimaryHover(true)}
            onMouseLeave={() => setPrimaryHover(false)}
          >
            Start Issuing
          </Link>
          <Link
            to="/verify"
            style={{
              ...styles.btnSecondary,
              ...(secondaryHover ? styles.btnSecondaryHover : {})
            }}
            onMouseEnter={() => setSecondaryHover(true)}
            onMouseLeave={() => setSecondaryHover(false)}
          >
            Verify Doc
          </Link>
        </div>
      </div>

      <div style={styles.featureGrid}>
        {features.map((feature, index) => (
          <div
            key={index}
            style={styles.card(hoveredCard === index)}
            onMouseEnter={() => setHoveredCard(index)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <span style={styles.cardIcon}>{feature.icon}</span>
            <h3 style={styles.cardTitle}>{feature.title}</h3>
            <p style={styles.cardText}>{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
