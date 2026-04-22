'use client';

import Link from 'next/link';
import { useLang } from '@/i18n/LangProvider';
import type { Kid } from '@/data/kids';

export function KidDetail({ kid }: { kid: Kid }) {
  const { lang, t } = useLang();
  const name = typeof kid.name === 'string' ? kid.name : (kid.name[lang] ?? kid.name.ko);
  const isTreated = kid.status === 'recovered';

  return (
    <article className="section">
      <div className="wrap" style={{ maxWidth: 780 }}>
        <Link href="/children" style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 18, display: 'inline-block' }}>
          ← {lang === 'en' ? 'All children' : lang === 'zh' ? '全部孩子' : '아이들 목록'}
        </Link>

        {/* 헤더 */}
        <header style={{ marginBottom: 28 }}>
          <div style={{
            display: 'inline-block',
            padding: '4px 12px',
            borderRadius: 999,
            background: isTreated ? 'var(--green)' : 'var(--blue)',
            color: '#fff',
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: 0.4,
            marginBottom: 14,
          }}>
            {isTreated
              ? (lang === 'en' ? 'Treated' : lang === 'zh' ? '已治疗' : '치료 완료')
              : (lang === 'en' ? 'In Progress' : lang === 'zh' ? '进行中' : '진행 중')}
          </div>
          <h1 style={{ fontFamily: "'Libre Bodoni', serif", fontSize: 36, fontWeight: 700, color: 'var(--navy)', lineHeight: 1.2, marginBottom: 12 }}>
            {kid.flag} {name}
          </h1>
          <div style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.6 }}>
            <div>{kid.country[lang] ?? kid.country.ko} · {kid.age[lang] ?? kid.age.ko}</div>
            {kid.hospital && <div style={{ marginTop: 4 }}>🏥 {kid.hospital[lang] ?? kid.hospital.ko}</div>}
          </div>
        </header>

        {/* 메인 이미지 */}
        <div style={{ borderRadius: 'var(--r2)', overflow: 'hidden', marginBottom: 32, boxShadow: 'var(--sh2)' }}>
          <img src={kid.img} alt={name} style={{ width: '100%', display: 'block' }} />
        </div>

        {/* 스토리 */}
        <div style={{
          padding: '30px 28px',
          background: '#fff',
          border: '1px solid var(--border)',
          borderRadius: 'var(--r2)',
          boxShadow: 'var(--sh)',
          fontSize: 16,
          color: 'var(--text)',
          lineHeight: 2,
          marginBottom: 32,
        }}>
          {kid.story[lang] ?? kid.story.ko}
        </div>

        {/* 영상 (있으면) */}
        {kid.video && (
          <div style={{ marginBottom: 32 }}>
            <h2 style={{ fontFamily: "'Libre Bodoni', serif", fontSize: 20, fontWeight: 700, color: 'var(--navy)', marginBottom: 14 }}>
              {lang === 'en' ? 'Video' : lang === 'zh' ? '视频' : '영상'}
            </h2>
            <div style={{ position: 'relative', paddingBottom: '56.25%', borderRadius: 'var(--r2)', overflow: 'hidden', boxShadow: 'var(--sh2)' }}>
              <iframe
                src={kid.video}
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                allowFullScreen
                loading="lazy"
                title={name}
              />
            </div>
          </div>
        )}

        {/* CTA */}
        <div style={{
          background: isTreated
            ? 'linear-gradient(135deg, #065f46, #059669)'
            : 'linear-gradient(135deg, var(--blue), var(--blue2))',
          borderRadius: 'var(--r2)',
          padding: '36px 32px',
          textAlign: 'center',
          color: '#fff',
          boxShadow: 'var(--sh2)',
        }}>
          <h3 style={{ fontFamily: "'Libre Bodoni', serif", fontSize: 22, fontWeight: 700, marginBottom: 10 }}>
            {isTreated
              ? (lang === 'en' ? 'Help more children like ' + name : lang === 'zh' ? '帮助更多像 ' + name + ' 一样的孩子' : name + ' 같은 아이를 더 돕기')
              : (lang === 'en' ? 'Support ' + name : lang === 'zh' ? '支持 ' + name : name + '을(를) 후원하기')}
          </h3>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.82)', lineHeight: 1.7, maxWidth: 440, margin: '0 auto 20px' }}>
            {lang === 'en'
              ? 'Your donation helps fund heart surgery for children who cannot afford it.'
              : lang === 'zh'
                ? '您的捐款帮助无力承担手术费用的孩子接受心脏治疗。'
                : '여러분의 후원이 수술을 받을 수 없는 아이들에게 새 생명을 선물합니다.'}
          </p>
          <Link href="/donate" style={{
            display: 'inline-flex',
            padding: '12px 32px',
            background: '#fff',
            color: isTreated ? '#065f46' : 'var(--blue)',
            borderRadius: 'var(--r2)',
            fontSize: 14,
            fontWeight: 700,
            boxShadow: '0 4px 18px rgba(0,0,0,0.15)',
          }}>
            {t('donate_btn')}
          </Link>
        </div>
      </div>
    </article>
  );
}
