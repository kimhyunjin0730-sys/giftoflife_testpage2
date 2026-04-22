import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #e8728a 100%)',
          color: 'white',
          fontFamily: 'serif',
          padding: '80px',
        }}
      >
        <div
          style={{
            fontSize: 22,
            letterSpacing: 6,
            color: 'rgba(255,255,255,0.7)',
            textTransform: 'uppercase',
            marginBottom: 40,
          }}
        >
          Gift of Life Korea
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            textAlign: 'center',
            lineHeight: 1.2,
            letterSpacing: -1,
          }}
        >
          생명의 선물 코리아
        </div>
        <div
          style={{
            fontSize: 28,
            marginTop: 32,
            color: 'rgba(255,255,255,0.85)',
            textAlign: 'center',
            fontStyle: 'italic',
          }}
        >
          &ldquo;Every child deserves a chance to live&rdquo;
        </div>
        <div
          style={{
            fontSize: 18,
            marginTop: 64,
            color: 'rgba(255,255,255,0.6)',
            letterSpacing: 3,
          }}
        >
          ROTARY · HANSU SATELLITE CLUB
        </div>
      </div>
    ),
    { ...size }
  );
}
