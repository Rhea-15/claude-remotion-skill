import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { theme } from "../../theme";
import { SceneExit } from "../../components/Motion";

export const DesignMoves: React.FC<{ duration: number }> = ({ duration }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const wordsLine1 = ["DESIGN", "THAT"];
  const wordHero = "MOVES";
  const wordEnd = "YOU.";

  // Tag entrance
  const tagP = spring({ frame: frame - 5, fps, config: theme.spring.smooth });

  // Line 1 spring delays (0, 6)
  // Hero word spring delay (18)
  const heroP = spring({ frame: frame - 18, fps, config: theme.spring.bouncy });

  // Line 3 spring delay (30)
  const endP = spring({ frame: frame - 30, fps, config: theme.spring.smooth });

  // Accent card scale
  const cardP = spring({ frame: frame - 12, fps, config: theme.spring.smooth });

  return (
    <SceneExit duration={duration}>
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: theme.fonts.display,
          padding: "0 60px",
        }}
      >
        {/* Top Tag */}
        <div
          style={{
            opacity: tagP,
            transform: `translateY(${interpolate(tagP, [0, 1], [-20, 0])}px)`,
            fontSize: 20,
            fontWeight: 700,
            letterSpacing: "0.25em",
            color: theme.colors.accent,
            marginBottom: 40,
            padding: "8px 20px",
            borderRadius: 999,
            background: `${theme.colors.accent}15`,
            border: `1px solid ${theme.colors.accent}44`,
          }}
        >
          STATEMENT
        </div>

        {/* Headline Container */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: 24,
          }}
        >
          {/* First Line: "DESIGN THAT" */}
          <div
            style={{
              display: "flex",
              gap: 24,
              fontSize: 88,
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1,
              color: theme.colors.text,
            }}
          >
            {wordsLine1.map((w, i) => {
              const p = spring({
                frame: frame - (i * 6 + 6),
                fps,
                config: theme.spring.snappy,
              });
              return (
                <span
                  key={i}
                  style={{
                    display: "inline-block",
                    opacity: p,
                    transform: `translateY(${interpolate(p, [0, 1], [40, 0])}px)`,
                  }}
                >
                  {w}
                </span>
              );
            })}
          </div>

          {/* Hero Line: "MOVES" with Glowing Card Background */}
          <div
            style={{
              position: "relative",
              padding: "16px 48px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Background pill / card */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: 28,
                background: `linear-gradient(135deg, ${theme.colors.primary}, #5B21B6)`,
                opacity: cardP * 0.9,
                transform: `scale(${cardP})`,
                boxShadow: `0 0 100px ${theme.colors.primary}aa, 0 20px 40px rgba(0,0,0,0.5)`,
              }}
            />

            <span
              style={{
                position: "relative",
                fontSize: 110,
                fontWeight: 900,
                letterSpacing: "0.02em",
                lineHeight: 1,
                color: "#FFFFFF",
                opacity: heroP,
                transform: `translateY(${interpolate(heroP, [0, 1], [50, 0])}px) scale(${interpolate(heroP, [0, 1], [0.8, 1])})`,
                textShadow: `0 0 40px rgba(255, 255, 255, 0.6)`,
              }}
            >
              {wordHero}
            </span>
          </div>

          {/* Last Line: "YOU." */}
          <div
            style={{
              fontSize: 88,
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1,
              color: theme.colors.textDim,
              opacity: endP,
              transform: `translateY(${interpolate(endP, [0, 1], [40, 0])}px)`,
            }}
          >
            {wordEnd}
          </div>
        </div>

        {/* Subtitle Accent */}
        <div
          style={{
            marginTop: 60,
            opacity: interpolate(
              spring({ frame: frame - 42, fps, config: theme.spring.smooth }),
              [0, 1],
              [0, 1]
            ),
            fontSize: 22,
            fontWeight: 500,
            color: theme.colors.textDim,
            letterSpacing: "0.08em",
            textAlign: "center",
            maxWidth: 700,
            lineHeight: 1.5,
          }}
        >
          Crafting visual experiences that captivate and convert.
        </div>
      </AbsoluteFill>
    </SceneExit>
  );
};
