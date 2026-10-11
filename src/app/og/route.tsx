import { ImageResponse } from "next/og";
export const dynamic = "force-static";
export function GET() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        background: "#172033",
        color: "white",
        padding: 85,
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 26,
          color: "#c7f36b",
          marginBottom: 50,
        }}
      >
        Options + Era
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 110,
          fontWeight: 800,
          letterSpacing: -4,
        }}
      >
        OPTERA
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 34,
          marginTop: 25,
          color: "#c4d1df",
        }}
      >
        Practical AI Skills.
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 34,
          marginTop: 8,
          color: "#c4d1df",
        }}
      >
        Brighter Possibilities.
      </div>
    </div>,
    { width: 1200, height: 630 },
  );
}
