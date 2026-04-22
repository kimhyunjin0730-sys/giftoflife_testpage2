'use client';

import Link from 'next/link';
import { useState } from 'react';

export function NotificationBar() {
  const [open, setOpen] = useState(true);
  if (!open) return null;
  return (
    <div className="nb-bar" id="nbBar">
      <span id="nb_txt">5월 2일 자선 음악회 — 국립극장 오후 5시</span>
      <span aria-hidden>|</span>
      <Link href="/donate" id="nb_link">지금 후원하기 →</Link>
      <button
        type="button"
        className="nb-x"
        aria-label="공지 닫기"
        onClick={() => setOpen(false)}
      >
        ×
      </button>
    </div>
  );
}
