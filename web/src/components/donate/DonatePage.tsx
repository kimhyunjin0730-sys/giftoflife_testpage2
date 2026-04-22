'use client';

import { useLang } from '@/i18n/LangProvider';
import type { Lang } from '@/i18n/types';

const MRM_URL = 'https://mrm.or.kr/donate/gift-of-life-korea'; // 실제 링크로 교체 필요

const T = {
  eyebrow: 'Donate · 후원',
  h: {
    ko: '당신의 선물이 심장을 뛰게 합니다',
    en: 'Your gift makes hearts beat',
    zh: '您的礼物让心脏再次跳动',
  } as Record<Lang, string>,
  sub: {
    ko: 'Gift of Life Korea의 모든 활동은 여러분의 후원으로 이어집니다. 아래 두 경로 중 한 곳을 선택해 후원에 참여해 주세요.',
    en: 'All Gift of Life Korea activities are made possible by your support. Choose one of the two channels below to contribute.',
    zh: '生命礼物韩国的所有活动都离不开您的支持。请在下方两个渠道中选择一项参与。',
  } as Record<Lang, string>,

  chA: {
    kicker: 'For Everyone',
    title: { ko: '일반 후원', en: 'General Donation', zh: '一般捐款' } as Record<Lang, string>,
    desc: {
      ko: '누구나 참여 가능한 온라인 후원 (생명나눔본부 공식 페이지)',
      en: 'Open to everyone — official payment page via MRM',
      zh: '任何人均可参与的在线捐款（MRM 官方页面）',
    } as Record<Lang, string>,
    cta: { ko: '생명나눔본부에서 후원', en: 'Donate via MRM', zh: '通过 MRM 捐款' } as Record<Lang, string>,
    chips: ['신용카드', '간편결제', '계좌이체', '정기후원'],
    chipsEn: ['Credit Card', 'Easy Pay', 'Bank Transfer', 'Monthly'],
    chipsZh: ['信用卡', '便捷支付', '银行转账', '定期'],
  },

  chB: {
    kicker: 'Rotary Members',
    title: { ko: '로타리 회원 후원', en: 'Rotary Member Donation', zh: '扶轮会员捐款' } as Record<Lang, string>,
    desc: {
      ko: '한수로타리 위성클럽 회원 전용 — 로그인 후 후원 신청',
      en: 'For Hansu Rotary Satellite Club members — sign in to apply',
      zh: '汉水扶轮卫星社会员专用——登录后申请捐款',
    } as Record<Lang, string>,
    cta: { ko: '회원 후원 신청', en: 'Apply (Member)', zh: '申请捐款（会员）' } as Record<Lang, string>,
  },

  trust: [
    { v: '23+', l: { ko: '파트너', en: 'Partners', zh: '合作伙伴' } as Record<Lang, string> },
    { v: '95%', l: { ko: '아동 직접 사용', en: 'To Children', zh: '直达儿童' } as Record<Lang, string> },
    { v: '100%', l: { ko: '세액공제', en: 'Tax Receipt', zh: '税务凭证' } as Record<Lang, string> },
  ],
};

export function DonatePage() {
  const { lang } = useLang();
  const chipLabels = lang === 'en' ? T.chA.chipsEn : lang === 'zh' ? T.chA.chipsZh : T.chA.chips;

  return (
    <section style={{ padding: '80px 0 90px', background: '#fafafa' }}>
      <div className="wrap" style={{ maxWidth: 1080 }}>
        <header style={{ textAlign: 'center', marginBottom: 60 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 14, marginBottom: 22 }}>
            <span style={{ width: 28, height: 1, background: 'var(--blue)', opacity: 0.6 }} />
            <span className="eyebrow">{T.eyebrow}</span>
            <span style={{ width: 28, height: 1, background: 'var(--blue)', opacity: 0.6 }} />
          </div>
          <h1 style={{
            fontFamily: "'Libre Bodoni', serif",
            fontSize: 'clamp(30px, 5vw, 46px)',
            fontWeight: 700,
            color: 'var(--navy)',
            lineHeight: 1.2,
            marginBottom: 18,
          }}>{T.h[lang]}</h1>
          <p style={{ fontSize: 15.5, color: 'var(--muted)', lineHeight: 1.8, maxWidth: 580, margin: '0 auto' }}>
            {T.sub[lang]}
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 26 }}>
          {/* CHANNEL A */}
          <article style={card}>
            <div style={eyebrowRow}>
              <span style={{ fontFamily: "'Libre Bodoni', serif", fontSize: 13, letterSpacing: 1.5, color: 'var(--blue)', fontWeight: 600 }}>01</span>
              <span style={{ height: 1, width: 28, background: 'var(--blue)', opacity: 0.5 }} />
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2.2, color: 'var(--muted)', textTransform: 'uppercase' }}>
                {T.chA.kicker}
              </span>
            </div>

            <h3 style={cardH}>{T.chA.title[lang]}</h3>
            <p style={cardP}>{T.chA.desc[lang]}</p>

            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 24 }}>
              {chipLabels.map((c) => (
                <span key={c} style={chip}>{c}</span>
              ))}
            </div>

            <a href={MRM_URL} target="_blank" rel="noopener" className="btn-primary" style={{ marginTop: 'auto' }}>
              🔗 {T.chA.cta[lang]}
            </a>

            <div style={trustGrid}>
              {T.trust.map((tr) => (
                <div key={tr.v} style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: "'Libre Bodoni', serif", fontSize: 22, fontWeight: 600, color: 'var(--navy)' }}>{tr.v}</div>
                  <div style={{ fontSize: 10.5, color: 'var(--muted)', marginTop: 4, textTransform: 'uppercase', letterSpacing: 1.3, fontWeight: 600 }}>
                    {tr.l[lang]}
                  </div>
                </div>
              ))}
            </div>
          </article>

          {/* CHANNEL B */}
          <article style={{ ...card, background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', color: '#fff' }}>
            <div style={{ ...eyebrowRow, color: '#fff' }}>
              <span style={{ fontFamily: "'Libre Bodoni', serif", fontSize: 13, letterSpacing: 1.5, color: 'var(--blue)', fontWeight: 600 }}>02</span>
              <span style={{ height: 1, width: 28, background: 'rgba(255,255,255,0.3)' }} />
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2.2, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase' }}>
                {T.chB.kicker}
              </span>
            </div>

            <h3 style={{ ...cardH, color: '#fff' }}>{T.chB.title[lang]}</h3>
            <p style={{ ...cardP, color: 'rgba(255,255,255,0.78)' }}>{T.chB.desc[lang]}</p>

            <a href="/login" className="btn-primary" style={{ marginTop: 'auto', background: '#F7A823', color: '#0f172a' }}>
              {T.chB.cta[lang]} →
            </a>

            <p style={{ marginTop: 18, fontSize: 12, color: 'rgba(255,255,255,0.55)', lineHeight: 1.6 }}>
              {lang === 'en'
                ? 'Note: Rotary member donation flow (bank transfer + CMS auto-debit) is being prepared. For now, please use the General Donation channel.'
                : lang === 'zh'
                  ? '注：扶轮会员捐款流程（银行转账 + CMS 自动扣款）正在准备中。请暂时使用一般捐款渠道。'
                  : '※ 로타리 회원 후원 플로우(계좌이체 + CMS 자동이체)는 준비 중입니다. 현재는 일반 후원 채널을 이용해 주세요.'}
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}

const card: React.CSSProperties = {
  background: '#fff',
  border: '1px solid var(--border)',
  borderRadius: 'var(--r2)',
  padding: '44px 36px 32px',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  boxShadow: '0 1px 2px rgba(15,23,42,0.03)',
};

const eyebrowRow: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  marginBottom: 30,
};

const cardH: React.CSSProperties = {
  fontFamily: "'Libre Bodoni', serif",
  fontSize: 28,
  fontWeight: 700,
  color: 'var(--navy)',
  lineHeight: 1.15,
  marginBottom: 8,
};

const cardP: React.CSSProperties = {
  fontSize: 13.5,
  color: 'var(--muted)',
  lineHeight: 1.7,
  marginBottom: 22,
};

const chip: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  padding: '7px 12px',
  background: 'var(--bg2)',
  border: '1px solid var(--border)',
  borderRadius: 999,
  fontSize: 11.5,
  fontWeight: 600,
  color: 'var(--text)',
};

const trustGrid: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  marginTop: 24,
  paddingTop: 20,
  borderTop: '1px solid var(--border)',
};
