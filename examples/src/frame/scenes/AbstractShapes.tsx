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

export const AbstractShapes: React.FC<{ duration: number }> = ({
  duration,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Gentle breathing motion
  const breathe = Math.sin(frame / 20) * 8;
  const rotateContinuous = frame * 0.8;

  // Header tag spring
  const headerP = spring({ frame: frame - 5, fps, config: theme.spring.smooth });

  // Central Hub spring
  const hubP = spring({ frame: frame - 15, fps, config: theme.spring.bouncy });

  // Orbiting geometric items
  const shapes = [
    { type: "circle", color: theme.colors.primary, size: 140, angle: 0, delay: 20 },
    { type: "square", color: theme.colors.accent, size: 120, angle: 72, delay: 26 },
    { type: "ring", color: theme.colors.text, size: 150, angle: 144, delay: 32 },
    { type: "pill", color: theme.colors.primary, size: 130, angle: 216, delay: 38 },
    { type: "square", color: theme.colors.accent, size: 110, angle: 288, delay: 44 },
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
        }}
      >
        {/* Section Header */}
        <div
          style={{
            position: "absolute",
            top: 220,
            opacity: headerP,
            transform: `translateY(${interpolate(headerP, [0, 1], [-30, 0])}px)`,
            textAlign: "center",
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
            01 / GEOMETRY
          </div>
          <div
            style={{
              fontSize: 48,
              fontWeight: 800,
              color: theme.colors.text,
              letterSpacing: "-0.02em",
            }}
          >
            Fluid Motion
          </div>
        </div>

        {/* Central Geometric Composition */}
        <div
          style={{
            position: "relative",
            width: 600,
            height: 600,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: `translateY(${breathe}px)`,
          }}
        >
          {/* Central Core Glowing Ring */}
          <div
            style={{
              position: "absolute",
              width: 280,
              height: 280,
              borderRadius: "50%",
              border: `2px dashed ${theme.colors.primary}88`,
              transform: `scale(${hubP}) rotate(${-rotateContinuous * 0.5}deg)`,
              boxShadow: `0 0 50px ${theme.colors.glow}`,
            }}
          />

          {/* Central Hub Node */}
          <div
            style={{
              position: "absolute",
              width: 130,
              height: 130,
              borderRadius: "50%",
              background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.accent})`,
              transform: `scale(${hubP})`,
              boxShadow: `0 0 60px ${theme.colors.primary}aa`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                background: theme.colors.bg,
              }}
            />
          </div>

          {/* Orbiting Abstract Shapes */}
          {shapes.map((item, i) => {
            const p = spring({
              frame: frame - item.delay,
              fps,
              config: theme.spring.bouncy,
            });

            const radius = 220;
            const currentAngle = (item.angle + rotateContinuous) * (Math.PI / 180);
            const x = Math.cos(currentAngle) * radius;
            const y = Math.sin(currentAngle) * radius;

            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  width: item.size,
                  height: item.size,
                  marginLeft: -item.size / 2,
                  marginTop: -item.size / 2,
                  opacity: p,
                  transform: `translate(${x * p}px, ${y * p}px) scale(${p}) rotate(${rotateContinuous * (i % 2 === 0 ? 1 : -1)}deg)`,
                  borderRadius:
                    item.type === "circle"
                      ? "50%"
                      : item.type === "pill"
                      ? "999px"
                      : "24px",
                  background:
                    item.type === "ring"
                      ? "transparent"
                      : `linear-gradient(135deg, ${item.color}cc, ${item.color}33)`,
                  border:
                    item.type === "ring"
                      ? `4px solid ${item.color}`
                      : `1px solid ${item.color}88`,
                  backdropFilter: "blur(10px)",
                  boxShadow: `0 20px 40px -10px ${item.color}44`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: theme.colors.text,
                    opacity: 0.8,
                  }}
                >
                  0{i + 1}
                </div>
              </div>
            );
          })}
        </div>

        {/* Dynamic Label at Bottom */}
        <div
          style={{
            position: "absolute",
            bottom: 240,
            opacity: interpolate(
              spring({ frame: frame - 50, fps, config: theme.spring.smooth }),
              [0, 1],
              [0, 1]
            ),
            padding: "12px 28px",
            background: "rgba(255, 255, 255, 0.05)",
            borderRadius: 16,
            border: "1px solid rgba(255, 255, 255, 0.1)",
            fontSize: 20,
            fontWeight: 500,
            color: theme.colors.textDim,
            letterSpacing: "0.05em",
          }}
        >
          PRECISION • BALANCE • ELEGANCE
        </div>
      </AbsoluteFill>
    </SceneExit>
  );
};
