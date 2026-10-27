"use client";

export default function RobotSprite({ hue = 258 }: { hue?: number }) {
  const body = `hsl(${hue}, 70%, 62%)`;
  const bodyDark = `hsl(${hue}, 65%, 48%)`;
  const eye = "#0d0d0d";
  const glow = "#e0e0ff";
  return (
    <svg viewBox="0 0 16 20" width="100%" height="100%" shapeRendering="crispEdges" aria-hidden="true">
      <rect x="7" y="0" width="2" height="2" fill={bodyDark} />
      <rect x="7" y="1" width="2" height="1" fill={glow} />
      <rect x="3" y="2" width="10" height="7" fill={body} />
      <rect x="3" y="8" width="10" height="1" fill={bodyDark} />
      <rect x="6" y="4" width="2" height="2" fill={eye} />
      <rect x="10" y="4" width="2" height="2" fill={eye} />
      <rect x="6" y="4" width="1" height="1" fill={glow} />
      <rect x="10" y="4" width="1" height="1" fill={glow} />
      <rect x="7" y="7" width="4" height="1" fill={bodyDark} />
      <rect x="4" y="9" width="8" height="6" fill={body} />
      <rect x="4" y="14" width="8" height="1" fill={bodyDark} />
      <rect x="7" y="11" width="2" height="2" fill={glow} />
      <rect className="arm arm-l" x="2" y="9" width="2" height="5" fill={bodyDark} />
      <rect className="arm arm-r" x="12" y="9" width="2" height="5" fill={bodyDark} />
      <rect className="leg leg-l" x="5" y="15" width="2" height="4" fill={bodyDark} />
      <rect className="leg leg-r" x="9" y="15" width="2" height="4" fill={bodyDark} />
    </svg>
  );
}
