import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { theme } from "../../theme";
import { Spark } from "../../components/Motion";

export const FinalCallout: React.FC<{ duration: number }> = ({ duration }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const words = ["MAKE", "YOUR", "NEXT", "MOVE."];

  // Card entrance
  const cardP = spring({ frame: frame - 10, fps, config: theme.spring.smooth });

  // CTA Button entrance
  const buttonP = spring({
    frame: frame - 30,
    fps,
    config: theme.spring.bouncy,
  });

  // Breathing & pulse
  const pulse = Math.sin(frame / 15) * 0.02 + 1;

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: theme.fonts.display,
        padding: "0 50px",
      }}
    >
      {/* Background Spark Glow */}
      <div
        style={{
          position: "absolute",
          top: "42%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          opacity: 0.4,
        }}
      >
        <Spark size={420} delay={0} />
      </div>

      {/* Main Glassmorphism Hero Card */}
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 920,
          background: `linear-gradient(180deg, rgba(18, 18, 26, 0.85) 0%, rgba(10, 10, 15, 0.95) 100%)`,
          border: `1.5px solid ${theme.colors.primary}88`,
          borderRadius: 36,
          padding: "60px 40px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          backdropFilter: "blur(20px)",
          boxShadow: `0 30px 80px -20px ${theme.colors.glow}, inset 0 1px 1px rgba(255, 255, 255, 0.2)`,
          opacity: cardP,
          transform: `scale(${cardP * pulse}) translateY(${interpolate(cardP, [0, 1], [40, 0])}px)`,
        }}
      >
        {/* Studio Badge */}
        <div
          style={{
            fontSize: 18,
            fontWeight: 700,
            letterSpacing: "0.25em",
            color: theme.colors.accent,
            marginBottom: 28,
            padding: "8px 24px",
            borderRadius: 999,
            background: "rgba(34, 211, 238, 0.12)",
            border: `1px solid ${theme.colors.accent}44`,
          }}
        >
          FRAME STUDIO
        </div>

        {/* Staggered Call to Action Words */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "0.2em",
            fontSize: 82,
            fontWeight: 900,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            marginBottom: 40,
          }}
        >
          {words.map((word, i) => {
            const p = spring({
              frame: frame - (15 + i * 4),
              fps,
              config: theme.spring.bouncy,
            });

            const isHero = word === "NEXT" || word === "MOVE.";

            return (
              <span
                key={i}
                style={{
                  display: "inline-block",
                  opacity: p,
                  transform: `translateY(${interpolate(p, [0, 1], [30, 0])}px) scale(${interpolate(p, [0, 1], [0.9, 1])})`,
                  color: isHero ? theme.colors.primary : theme.colors.text,
                  textShadow: isHero
                    ? `0 0 60px ${theme.colors.primary}aa`
                    : undefined,
                }}
              >
                {word}
              </span>
            );
          })}
        </div>

        {/* Final CTA Button */}
        <div
          style={{
            opacity: buttonP,
            transform: `scale(${buttonP}) translateY(${interpolate(buttonP, [0, 1], [20, 0])}px)`,
            padding: "22px 56px",
            borderRadius: 999,
            background: `linear-gradient(135deg, ${theme.colors.primary}, #5B21B6)`,
            color: "#FFFFFF",
            fontSize: 26,
            fontWeight: 800,
            letterSpacing: "0.08em",
            boxShadow: `0 0 50px ${theme.colors.primary}aa`,
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <span>framestudio.design</span>
          <span style={{ fontSize: 28 }}>→</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
