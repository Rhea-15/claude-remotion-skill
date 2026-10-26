import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { theme } from "../../theme";
import { SceneExit, Spark } from "../../components/Motion";

export const StudioShowcase: React.FC<{ duration: number }> = ({
  duration,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Floating micro-motion
  const float = Math.sin(frame / 25) * 10;

  // Header spring
  const headerP = spring({ frame: frame - 5, fps, config: theme.spring.smooth });

  // Grid items setup
  const items = [
    { title: "MOTION", subtitle: "Dynamic Systems", stat: "3D & 2D" },
    { title: "BRANDING", subtitle: "Identity & Visuals", stat: "Systems" },
    { title: "KINETIC", subtitle: "Typography & Code", stat: "React" },
    { title: "FUTURE", subtitle: "Interactive Media", stat: "Spatial" },
  ];

  return (
    <SceneExit duration={duration}>
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
        {/* Header */}
        <div
          style={{
            opacity: headerP,
            transform: `translateY(${interpolate(headerP, [0, 1], [-30, 0])}px)`,
            textAlign: "center",
            marginBottom: 50,
          }}
        >
          <div
            style={{
              fontSize: 18,
              fontWeight: 700,
              letterSpacing: "0.2em",
              color: theme.colors.accent,
              marginBottom: 8,
            }}
          >
            02 / CAPABILITIES
          </div>
          <div
            style={{
              fontSize: 52,
              fontWeight: 800,
              color: theme.colors.text,
              letterSpacing: "-0.02em",
            }}
          >
            Studio Excellence
          </div>
        </div>

        {/* Central Radial Spark Mark + Cards Stack */}
        <div
          style={{
            position: "relative",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            transform: `translateY(${float}px)`,
          }}
        >
          {/* Background Spark Graphic */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              opacity: 0.35,
              pointerEvents: "none",
            }}
          >
            <Spark size={360} delay={10} />
          </div>

          {/* 2x2 Feature Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 24,
              width: "100%",
              maxWidth: 920,
              zIndex: 2,
            }}
          >
            {items.map((item, i) => {
              const p = spring({
                frame: frame - (15 + i * 6),
                fps,
                config: theme.spring.bouncy,
              });

              const isHero = i === 0;

              return (
                <div
                  key={i}
                  style={{
                    opacity: p,
                    transform: `translateY(${interpolate(p, [0, 1], [40, 0])}px) scale(${interpolate(p, [0, 1], [0.9, 1])})`,
                    background: isHero
                      ? `linear-gradient(135deg, ${theme.colors.primary}44, ${theme.colors.bgAlt})`
                      : "rgba(18, 18, 26, 0.75)",
                    border: isHero
                      ? `1.5px solid ${theme.colors.primary}`
                      : "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: 24,
                    padding: "32px 28px",
                    backdropFilter: "blur(12px)",
                    boxShadow: isHero
                      ? `0 20px 50px -10px ${theme.colors.glow}`
                      : "0 10px 30px rgba(0, 0, 0, 0.4)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: 200,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        fontSize: 14,
                        fontWeight: 700,
                        color: isHero ? theme.colors.accent : theme.colors.textDim,
                        letterSpacing: "0.1em",
                      }}
                    >
                      0{i + 1}
                    </span>
                    <span
                      style={{
                        fontSize: 14,
                        fontWeight: 600,
                        padding: "4px 12px",
                        borderRadius: 999,
                        background: isHero
                          ? `${theme.colors.accent}22`
                          : "rgba(255,255,255,0.06)",
                        color: isHero ? theme.colors.accent : theme.colors.text,
                      }}
                    >
                      {item.stat}
                    </span>
                  </div>

                  <div>
                    <div
                      style={{
                        fontSize: 32,
                        fontWeight: 800,
                        color: theme.colors.text,
                        letterSpacing: "-0.01em",
                        marginBottom: 4,
                      }}
                    >
                      {item.title}
                    </div>
                    <div
                      style={{
                        fontSize: 18,
                        fontWeight: 500,
                        color: theme.colors.textDim,
                      }}
                    >
                      {item.subtitle}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </AbsoluteFill>
    </SceneExit>
  );
};
