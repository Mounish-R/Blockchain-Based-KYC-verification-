import React, { useRef, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

const HolographicCard = ({ student }) => {
    const cardRef = useRef(null);
    const [rotate, setRotate] = useState({ x: 0, y: 0 });
    const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

    const handleMouseMove = (e) => {
        const card = cardRef.current;
        if (!card) return;

        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Calculate rotation (max 15 degrees)
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        setRotate({ x: rotateX, y: rotateY });

        // Calculate glare position (opposite to mouse)
        setGlare({
            x: (x / rect.width) * 100,
            y: (y / rect.height) * 100,
            opacity: 1,
        });
    };

    const handleMouseLeave = () => {
        setRotate({ x: 0, y: 0 });
        setGlare((prev) => ({ ...prev, opacity: 0 }));
    };

    // Modern ID Card Style - Premium & Readability Update
    const styles = {
        container: {
            perspective: "1500px",
            display: "flex",
            justifyContent: "center",
            margin: "40px auto",
            padding: "0 20px",
        },
        card: {
            width: "700px", // Much larger for better visibility
            maxWidth: "90vw", // Responsive to screen size
            height: "440px", // Proportional height increase
            position: "relative",
            borderRadius: "28px",
            // Richer, deeper gradient
            background: "linear-gradient(135deg, #0a0e1a 0%, #1a1f3a 30%, #2a1f3a 70%, #1a1a2e 100%)",
            color: "white",
            transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
            transition: "transform 0.1s ease-out",
            boxShadow:
                "0 30px 60px -15px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.1), 0 0 40px rgba(59, 130, 246, 0.1)",
            overflow: "hidden",
            fontFamily: "'Inter', sans-serif",
            userSelect: "none",
        },
        // The "Holo" Gradient Overlay - Stronger effect
        hologram: {
            position: "absolute",
            inset: 0,
            background: `
        linear-gradient(
          115deg, 
          transparent 0%, 
          rgba(96, 165, 250, 0.15) 25%,
          rgba(167, 139, 250, 0.15) 50%,
          rgba(232, 121, 249, 0.15) 75%, 
          transparent 100%
        )
      `,
            opacity: 0.7,
            pointerEvents: "none",
            mixBlendMode: "color-dodge",
            zIndex: 2,
        },
        // Mouse-reactive Glare - Enhanced
        glare: {
            position: "absolute",
            inset: 0,
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.5), transparent 35%)`,
            opacity: glare.opacity,
            transition: "opacity 0.2s ease",
            pointerEvents: "none",
            zIndex: 3,
            mixBlendMode: "overlay",
        },
        // Card Content Layout
        content: {
            position: "relative",
            zIndex: 4,
            padding: "40px", // Reduced padding for better fit
            height: "100%",
            display: "flex",
            flexDirection: "column",
            boxSizing: "border-box",
        },
        header: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "32px", // Adjusted spacing
            borderBottom: "1px solid rgba(255,255,255,0.1)",
            paddingBottom: "16px",
        },
        title: {
            fontSize: "14px", // Slightly smaller
            fontWeight: "800",
            letterSpacing: "1.5px",
            textTransform: "uppercase",
            color: "#94a3b8",
            display: "flex",
            alignItems: "center",
            gap: "10px",
        },
        verifiedBadge: {
            background: "rgba(16, 185, 129, 0.2)",
            color: "#34d399",
            border: "1px solid rgba(16, 185, 129, 0.3)",
            padding: "6px 14px", // Adjusted padding
            borderRadius: "24px",
            fontSize: "12px", // Slightly smaller
            fontWeight: "700",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            display: "flex",
            alignItems: "center",
            gap: "6px",
        },
        body: {
            display: "flex",
            gap: "32px", // Reduced gap
            alignItems: "flex-start",
        },
        qrContainer: {
            background: "white",
            padding: "12px",
            borderRadius: "16px",
            width: "140px",
            height: "140px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
            flexShrink: 0, // Prevent shrinking
        },
        details: {
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "16px", // Reduced gap
        },
        nameGroup: {
            marginBottom: "4px",
        },
        label: {
            fontSize: "12px", // Adjusted
            color: "#94a3b8",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            fontWeight: "600",
            marginBottom: "5px",
        },
        value: {
            fontSize: "16px", // Adjusted
            fontWeight: "600",
            color: "#f8fafc",
            letterSpacing: "0.2px",
        },
        largeValue: {
            fontSize: "28px", // Reduced from 32px
            fontWeight: "700",
            color: "white",
            letterSpacing: "-0.5px",
            lineHeight: "1.2",
            background: "linear-gradient(to right, #ffffff, #e2e8f0)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
        },
        row: {
            display: "flex",
            gap: "40px", // Adjusted spacing
        },
        hashGroup: {
            marginTop: "auto",
        },
        hashValue: {
            fontSize: "10px", // Slightly smaller
            fontFamily: "'JetBrains Mono', 'Courier New', monospace",
            color: "#64748b",
            background: "rgba(0,0,0,0.2)",
            padding: "5px 8px", // Adjusted padding
            borderRadius: "6px",
            display: "inline-block",
        },
        footer: {
            marginTop: "auto",
            paddingTop: "16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
        },
        footerText: {
            fontSize: "10px", // Adjusted
            fontWeight: "600",
            color: "#475569",
            letterSpacing: "1px",
            textTransform: "uppercase",
        },
    };

    return (
        <div style={styles.container}>
            <div
                ref={cardRef}
                style={styles.card}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                {/* Effects */}
                <div className="holo-overlay" style={styles.hologram} data-html2canvas-ignore="true" />
                <div className="glare-overlay" style={styles.glare} data-html2canvas-ignore="true" />

                {/* Content */}
                <div style={styles.content}>
                    {/* Header */}
                    <div style={styles.header}>
                        <div style={styles.title}>
                            <span style={{ fontSize: "16px" }}>🛡️</span> Secure Identity
                        </div>
                        <div style={styles.verifiedBadge}>
                            <span>✓</span> Verified On-Chain
                        </div>
                    </div>

                    {/* Body */}
                    <div style={styles.body}>
                        <div style={{ ...styles.qrContainer, padding: 0, overflow: "hidden" }}>
                            {student.photoUrl ? (
                                <img src={student.photoUrl} alt="ID Photo" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                            ) : (
                                <QRCodeCanvas value={student.hash} size={120} />
                            )}
                        </div>

                        <div style={styles.details}>
                            <div style={styles.nameGroup}>
                                <div style={styles.label}>Full Name</div>
                                <div style={styles.largeValue}>{student.fullName}</div>
                            </div>

                            <div style={styles.row}>
                                <div>
                                    <div style={styles.label}>Date of Birth</div>
                                    <div style={styles.value}>{student.dob}</div>
                                </div>
                                <div>
                                    <div style={styles.label}>Gender</div>
                                    <div style={styles.value}>{student.gender}</div>
                                </div>
                                {/* Official Stamp Seal */}
                                <div style={{
                                    marginLeft: "auto",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    background: "radial-gradient(circle, rgba(220, 38, 38, 0.15) 0%, rgba(220, 38, 38, 0.05) 70%, transparent 100%)",
                                    border: "4px double #dc2626",
                                    borderRadius: "50%",
                                    width: "110px",
                                    height: "110px",
                                    position: "relative",
                                    boxShadow: "0 2px 8px rgba(220, 38, 38, 0.3), inset 0 0 30px rgba(220, 38, 38, 0.1)",
                                }}>
                                    {/* Inner circle */}
                                    <div style={{
                                        position: "absolute",
                                        width: "85px",
                                        height: "85px",
                                        border: "2px solid #dc2626",
                                        borderRadius: "50%",
                                        opacity: 0.6,
                                    }} />

                                    {/* Center content */}
                                    <div style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        zIndex: 1,
                                    }}>
                                        <div style={{
                                            fontSize: "11px",
                                            fontWeight: "900",
                                            color: "#dc2626",
                                            textAlign: "center",
                                            lineHeight: "1.3",
                                            textTransform: "uppercase",
                                            letterSpacing: "1px",
                                            marginBottom: "6px",
                                        }}>
                                            Official
                                        </div>
                                        <div style={{
                                            fontSize: "28px",
                                            marginBottom: "6px",
                                            filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.2))"
                                        }}>⛓️</div>
                                        <div style={{
                                            fontSize: "10px",
                                            fontWeight: "900",
                                            color: "#dc2626",
                                            textAlign: "center",
                                            lineHeight: "1.2",
                                            textTransform: "uppercase",
                                            letterSpacing: "0.8px",
                                        }}>
                                            Blockchain<br />Verified
                                        </div>
                                    </div>

                                    {/* Stamp texture overlay */}
                                    <div style={{
                                        position: "absolute",
                                        inset: 0,
                                        borderRadius: "50%",
                                        background: "repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(220, 38, 38, 0.03) 2px, rgba(220, 38, 38, 0.03) 4px)",
                                        pointerEvents: "none",
                                    }} />
                                </div>
                            </div>

                            {student.phone && (
                                <div>
                                    <div style={styles.label}>Phone</div>
                                    <div style={styles.value}>{student.phone}</div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Footer / Hash */}
                    <div style={styles.footer}>
                        <div style={styles.hashGroup}>
                            <div style={{ ...styles.label, fontSize: "10px", marginBottom: "4px" }}>Document Hash</div>
                            <div style={styles.hashValue}>
                                {student.hash.slice(0, 16)}...{student.hash.slice(-16)}
                            </div>
                        </div>
                        <div style={styles.footerText}>
                            Blockchain Secured
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HolographicCard;
