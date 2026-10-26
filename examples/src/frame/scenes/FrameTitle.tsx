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

export const FrameTitle: React.FC<{ duration: number }> = ({ duration }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const letters = ["F", "R", "A", "M", "E"];
  const subTitle = "CREATIVE STUDIO";

  // Subtitle spring
  const subP = spring({
    frame: frame - 25,
    fps,
    config: theme.spring.smooth,
  });

  return (
    <SceneExit duration={duration}>
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: theme.fonts.display,
        }}
      >
        {/* Studio Badge / Pill */}
        <div
          style={{
            opacity: subP,
            transform: `translateY(${interpolate(subP, [0, 1], [-20, 0])}px)`,
            marginBottom: 32,
            padding: "8px 20px",
            borderRadius: 999,
            border: `1px solid ${theme.colors.primary}66`,
            background: "rgba(124, 58, 237, 0.12)",
            color: theme.colors.accent,
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: "0.25em",
          }}
        >
          {subTitle}
        </div>

        {/* Staggered Kinetic Typography for "FRAME" */}
        <div
          style={{
            display: "flex",
            gap: "0.15em",
            fontSize: 140,
            fontWeight: 800,
            letterSpacing: "0.02em",
            lineHeight: 1,
            color: theme.colors.text,
          }}
        >
          {letters.map((char, i) => {
            const delay = i * 4;
            const p = spring({
              frame: frame - delay,
              fps,
              config: theme.spring.bouncy,
            });

            // Rotational tilt + Y slide + scale pop
            const rot = interpolate(p, [0, 1], [-25 + i * 5, 0]);
            const translateY = interpolate(p, [0, 1], [90, 0]);
            const scale = interpolate(p, [0, 1], [0.5, 1]);

            const isHero = char === "A" || char === "M";

            return (
              <span
                key={i}
                style={{
                  display: "inline-block",
                  opacity: p,
                  transform: `translateY(${translateY}px) scale(${scale}) rotate(${rot}deg)`,
                  color: isHero ? theme.colors.primary : theme.colors.text,
                  textShadow: isHero
                    ? `0 0 80px ${theme.colors.primary}88, 0 0 160px ${theme.colors.primary}44`
                    : undefined,
                }}
              >
                {char}
              </span>
            );
          })}
        </div>

        {/* Decorative dynamic rule under title */}
        <div
          style={{
            marginTop: 40,
            width: interpolate(
              spring({ frame: frame - 35, fps, config: theme.spring.smooth }),
              [0, 1],
              [0, 240]
            ),
            height: 4,
            borderRadius: 2,
            background: `linear-gradient(90deg, transparent, ${theme.colors.primary}, ${theme.colors.accent}, transparent)`,
            boxShadow: `0 0 20px ${theme.colors.primary}`,
          }}
        />
      </AbsoluteFill>
    </SceneExit>
  );
};
