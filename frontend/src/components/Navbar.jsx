import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
    const location = useLocation();

    const styles = {
        nav: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "16px 40px",
            background: "rgba(15, 23, 42, 0.85)", // Stronger glassmorphism
            backdropFilter: "blur(16px)", // More blur
            WebkitBackdropFilter: "blur(16px)",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
            position: "sticky",
            top: 0,
            zIndex: 100,
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        },
        logo: {
            fontSize: "20px",
            fontWeight: "800",
            background: "linear-gradient(90deg, #60a5fa, #a78bfa)", // Lighter gradient
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "-0.5px",
            textDecoration: "none",
            transition: "transform 0.2s ease",
            display: "inline-block",
        },
        logoHover: {
            transform: "scale(1.05)",
        },
        links: {
            display: "flex",
            gap: "8px",
        },
        link: (active) => ({
            textDecoration: "none",
            color: active ? "#fff" : "#94a3b8",
            fontSize: "14px",
            fontWeight: "600",
            padding: "10px 20px",
            borderRadius: "12px",
            background: active
                ? "linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.2))"
                : "transparent",
            border: active ? "1px solid rgba(59, 130, 246, 0.3)" : "1px solid transparent",
            transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
            position: "relative",
            overflow: "hidden",
        }),
        linkHover: {
            background: "rgba(255, 255, 255, 0.05)",
            color: "#f8fafc",
            transform: "translateY(-1px)",
        },
    };

    const [hoveredLink, setHoveredLink] = React.useState(null);
    const [logoHover, setLogoHover] = React.useState(false);

    return (
        <nav style={styles.nav}>
            <Link
                to="/"
                style={{
                    ...styles.logo,
                    ...(logoHover ? styles.logoHover : {})
                }}
                onMouseEnter={() => setLogoHover(true)}
                onMouseLeave={() => setLogoHover(false)}
            >
                ⚡ DocChain
            </Link>
            <div style={styles.links}>
                {[
                    { path: "/", label: "Home" },
                    { path: "/add", label: "Issue Certificate" },
                    { path: "/verify", label: "Verify" }
                ].map(({ path, label }) => (
                    <Link
                        key={path}
                        to={path}
                        style={{
                            ...styles.link(location.pathname === path),
                            ...(hoveredLink === path && location.pathname !== path ? styles.linkHover : {})
                        }}
                        onMouseEnter={() => setHoveredLink(path)}
                        onMouseLeave={() => setHoveredLink(null)}
                    >
                        {label}
                    </Link>
                ))}
            </div>
        </nav>
    );
};

export default Navbar;
