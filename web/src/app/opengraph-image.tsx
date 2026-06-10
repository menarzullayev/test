import { ImageResponse } from "next/og";
import { SITE } from "@/lib/data";

export const dynamic = "force-static";

export const alt = `${SITE.name} — ${SITE.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 90,
          backgroundColor: "#05060a",
          backgroundImage:
            "radial-gradient(900px 500px at 85% 15%, rgba(110,102,255,0.35), transparent 60%), radial-gradient(700px 420px at 15% 95%, rgba(34,211,238,0.22), transparent 60%)",
          color: "#f5f6f8",
          fontSize: 32,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="56" height="56" viewBox="0 0 32 32" fill="none">
            <path
              d="M16 4 28 26H4L16 4Z"
              stroke="#8b5cf6"
              strokeWidth="2"
              strokeLinejoin="round"
              fill="rgba(110,102,255,0.12)"
            />
          </svg>
          <div style={{ fontSize: 40, fontWeight: 700 }}>Prism</div>
        </div>
        <div
          style={{
            marginTop: 48,
            fontSize: 84,
            fontWeight: 700,
            letterSpacing: "-0.04em",
            lineHeight: 1.05,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span>Every signal.</span>
          <span
            style={{
              backgroundImage: "linear-gradient(100deg, #b9b3ff, #7dd7f5)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            One focus.
          </span>
        </div>
        <div style={{ marginTop: 40, fontSize: 30, color: "#9aa1b3" }}>
          {SITE.tagline}
        </div>
      </div>
    ),
    { ...size }
  );
}
