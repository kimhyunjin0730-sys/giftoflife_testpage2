'use client';

import Link from 'next/link';
import { useState } from 'react';

export function FloatingButtons() {
  const [faqOpen, setFaqOpen] = useState(false);

  return (
    <>
      <Link
        href="/donate"
        className="fab-donate"
        aria-label="후원하기"
        style={{
          position: 'fixed',
          right: 22,
          bottom: 22,
          width: 64,
          height: 64,
          borderRadius: '50%',
          background: '#e8728a',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 12,
          fontWeight: 700,
          boxShadow: '0 12px 28px rgba(232,114,138,.45)',
          zIndex: 1000,
          textDecoration: 'none',
        }}
      >
        <span className="fab-heart" aria-hidden style={{ fontSize: 16, lineHeight: 1 }}>♥</span>
        <span style={{ marginTop: 2 }}>후원</span>
      </Link>

      <button
        type="button"
        className="fab-lang"
        aria-label="자주 묻는 질문"
        aria-expanded={faqOpen}
        onClick={() => setFaqOpen((v) => !v)}
        style={{
          position: 'fixed',
          right: 22,
          bottom: 96,
          width: 56,
          height: 56,
          borderRadius: '50%',
          background: '#fff',
          color: '#0f172a',
          border: '1.5px solid #0f172a',
          fontSize: 13,
          fontWeight: 800,
          boxShadow: '0 8px 20px rgba(15,23,42,.18)',
          zIndex: 1000,
          cursor: 'pointer',
        }}
      >
        FAQ
      </button>

      {faqOpen && (
        <div
          className="fab-lang-popup"
          role="dialog"
          aria-label="자주 묻는 질문"
          style={{
            position: 'fixed',
            right: 86,
            bottom: 96,
            width: 280,
            background: '#fff',
            border: '1px solid #e2e8f0',
            borderRadius: 16,
            padding: 18,
            boxShadow: '0 16px 36px rgba(15,23,42,.16)',
            zIndex: 1001,
            fontSize: 13,
            lineHeight: 1.7,
            color: '#0f172a',
          }}
        >
          <strong style={{ display: 'block', marginBottom: 6, fontFamily: "'Libre Bodoni', serif", fontSize: 16 }}>
            자주 묻는 질문
          </strong>
          <p style={{ color: '#64748b', marginBottom: 10 }}>
            후원 방법, 세제 혜택, 어린이 정보에 대한 안내입니다.
          </p>
          <Link href="/faq" style={{ color: '#e8728a', fontWeight: 700 }}>
            전체 FAQ 보기 →
          </Link>
        </div>
      )}
    </>
  );
}
