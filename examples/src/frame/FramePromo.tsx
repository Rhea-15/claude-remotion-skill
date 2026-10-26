import React from "react";
import { AbsoluteFill, Sequence, useVideoConfig } from "remotion";
import { BgMesh, Grade, Grain, Vignette } from "../components/Layers";
import { FrameTitle } from "./scenes/FrameTitle";
import { AbstractShapes } from "./scenes/AbstractShapes";
import { DesignMoves } from "./scenes/DesignMoves";
import { StudioShowcase } from "./scenes/StudioShowcase";
import { FinalCallout } from "./scenes/FinalCallout";

// Timings in seconds for each scene: total = 3 + 3 + 4 + 3 + 2 = 15s (450 frames)
export const FRAME_SCENES = {
  title: 3.0,
  shapes: 3.0,
  moves: 4.0,
  showcase: 3.0,
  callout: 2.0,
} as const;

export const FRAME_TOTAL_S =
  FRAME_SCENES.title +
  FRAME_SCENES.shapes +
  FRAME_SCENES.moves +
  FRAME_SCENES.showcase +
  FRAME_SCENES.callout; // 15s

export const FramePromo: React.FC = () => {
  const { fps } = useVideoConfig();

  const titleF = Math.round(fps * FRAME_SCENES.title); // 90f
  const shapesF = Math.round(fps * FRAME_SCENES.shapes); // 90f
  const movesF = Math.round(fps * FRAME_SCENES.moves); // 120f
  const showcaseF = Math.round(fps * FRAME_SCENES.showcase); // 90f
  const calloutF = Math.round(fps * FRAME_SCENES.callout); // 60f

  const t0 = 0;
  const t1 = titleF;
  const t2 = t1 + shapesF;
  const t3 = t2 + movesF;
  const t4 = t3 + showcaseF;

  return (
    <AbsoluteFill>
      {/* Layer 1: Animated Background Mesh */}
      <BgMesh />

      {/* Layers 2–3: Storyboard Content Scenes */}
      <Sequence from={t0} durationInFrames={titleF}>
        <FrameTitle duration={titleF} />
      </Sequence>

      <Sequence from={t1} durationInFrames={shapesF}>
        <AbstractShapes duration={shapesF} />
      </Sequence>

      <Sequence from={t2} durationInFrames={movesF}>
        <DesignMoves duration={movesF} />
      </Sequence>

      <Sequence from={t3} durationInFrames={showcaseF}>
        <StudioShowcase duration={showcaseF} />
      </Sequence>

      <Sequence from={t4} durationInFrames={calloutF}>
        <FinalCallout duration={calloutF} />
      </Sequence>

      {/* Layer 4: Color Grade Overlay */}
      <Grade />

      {/* Layer 5: Procedural Film Grain & Vignette */}
      <Grain />
      <Vignette />
    </AbsoluteFill>
  );
};
