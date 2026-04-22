'use client';

import Link from 'next/link';
import { useLang } from '@/i18n/LangProvider';
import type { Lang } from '@/i18n/types';

const TEXT = {
  eyebrow: 'Rotary',
  h1: { ko: '한수로타리 위성클럽', en: 'Hansu Rotary Satellite Club', zh: '汉水扶轮卫星社' } as Record<Lang, string>,
  sub: {
    ko: '로타리 125년 역사상 최초로 국경 없는 글로벌 온라인 위성클럽으로 설립된 한수로타리 위성클럽을 소개합니다.',
    en: "Introducing the Hansu Rotary Satellite Club — the first borderless global online satellite club in Rotary's 125-year history.",
    zh: '向您介绍扶轮社125年历史上首个无国界全球在线卫星社——汉水扶轮卫星社。',
  } as Record<Lang, string>,

  aboutH: { ko: '로타리란?', en: 'About Rotary', zh: '关于扶轮社' } as Record<Lang, string>,
  aboutP1: {
    ko: '로타리(Rotary International)는 1905년 미국 시카고에서 설립된 세계 최대의 봉사 단체로, 전 세계 200여 개국에 35,000개 이상의 클럽과 120만 명 이상의 회원을 보유하고 있습니다.',
    en: "Rotary International, founded in Chicago in 1905, is the world's largest service organization with over 35,000 clubs and 1.2 million members in more than 200 countries.",
    zh: '国际扶轮社于1905年在美国芝加哥成立，是全球最大的公益服务组织。',
  } as Record<Lang, string>,
  aboutP2: {
    ko: '로타리 회원들은 지역사회 봉사, 국제 이해 증진, 직업적 성취를 통해 더 나은 세상을 만들기 위해 헌신합니다. Gift of Life International은 로타리 재단에 기반을 둔 조직으로, 전 세계 로타리 클럽의 지원을 받아 소아 심장 치료를 돕고 있습니다.',
    en: 'Rotary members are dedicated to building a better world through community service, international understanding, and professional achievement. Gift of Life International is a Rotary Foundation–based organization.',
    zh: '扶轮社员通过社区服务、促进国际理解和职业成就，致力于构建更美好的世界。',
  } as Record<Lang, string>,

  thanksLabel: { ko: 'IN GRATITUDE', en: 'In Gratitude', zh: '致谢' } as Record<Lang, string>,
  thanksH: {
    ko: '전 세계 332개 로타리클럽 · 78개 로타리구 · 로타리재단의 지원에 감사드립니다',
    en: 'Thank you to 332 Rotary Clubs, 78 Rotary Districts, and The Rotary Foundation worldwide',
    zh: '感谢全球332个扶轮社、78个扶轮地区及扶轮基金会的支持',
  } as Record<Lang, string>,
  thanksP: {
    ko: '생명의 선물은 1975년 맨해튼의 로타리클럽에서 시작되었으며, 이후 로타리는 신흥국 심장병 어린이들의 돌봄에 중점을 둔 세계 최대의 인도주의 단체가 되기 위한 우리의 비전을 지원해 왔으며, 물류 및 재정 지원을 포함하고 있습니다. 그들의 지원으로 우리는 80여 개국 중 20여 개국에서 선천성 심장병의 세계적 위기를 해결하는 데 있어 우리의 영향력을 극대화할 수 있었습니다. 또한 전 세계 수백 명의 헌신적인 로타리 자원봉사자들에게도 감사를 표합니다.',
    en: 'Gift of Life began in 1975 at a Rotary Club in Manhattan. Since then, Rotary has supported our vision of becoming the largest humanitarian organization focused on caring for children with heart disease in emerging nations — providing both logistical and financial support. Thanks to that support, we have been able to maximize our impact across roughly 20 of the 80+ countries we serve. We also thank the hundreds of dedicated Rotary volunteers worldwide.',
    zh: '生命礼物于1975年在曼哈顿扶轮社诞生。此后，扶轮社始终支持我们成为全球最大、专注于新兴国家心脏病儿童救助的人道主义组织的愿景，并提供了物流与资金支持。',
  } as Record<Lang, string>,

  clubH: { ko: '한수로타리 위성클럽', en: 'Hansu Rotary Satellite Club', zh: '汉水扶轮卫星社' } as Record<Lang, string>,
  clubP1: {
    ko: '한수로타리 위성클럽은 로타리 125년 역사상 최초로 설립된 국경 없는 글로벌 온라인 위성클럽입니다. 전 세계 어디서나 참여할 수 있으며, 한국을 기반으로 전 세계 회원들이 함께 선천성 심장병 어린이 구호 활동을 펼치고 있습니다.',
    en: "Hansu Rotary Satellite Club is the first borderless global online satellite club in Rotary's 125-year history. Open to participants worldwide and based in Korea, members from around the globe support children with congenital heart disease together.",
    zh: '汉水扶轮卫星社是扶轮社125年历史上首个无国界全球在线卫星社。向全球开放，以韩国为基地，汇聚全球会员共同支持心脏病儿童。',
  } as Record<Lang, string>,
  clubP2: {
    ko: '2026년 6월 공식 발족을 목표로 하며, 3,000명 이상의 세계 시민이 함께하는 심장병 구호 네트워크 구축을 비전으로 합니다.',
    en: 'With an official launch planned for June 2026, our vision is to build a cardiac care network of 3,000+ global citizens.',
    zh: '预计2026年6月正式成立，愿景是构建拥有3,000+全球公民的心脏病救助网络。',
  } as Record<Lang, string>,

  ctaH: {
    ko: '한수로타리 위성클럽에 함께하세요',
    en: 'Join the Hansu Rotary Satellite Club',
    zh: '加入汉水扶轮卫星社',
  } as Record<Lang, string>,
  ctaP: {
    ko: '국경을 초월한 글로벌 온라인 위성클럽에서 심장병 어린이들에게 희망을 전하는 데 동참하세요.',
    en: "Join our borderless global online satellite club and help bring hope to children with heart disease.",
    zh: '加入我们的无国界全球在线卫星社，为心脏病儿童带去希望。',
  } as Record<Lang, string>,
  ctaBtn: { ko: '회원 가입하기', en: 'Become a Member', zh: '加入会员' } as Record<Lang, string>,
};

export function RotaryPage() {
  const { lang } = useLang();

  return (
    <section className="section">
      <div className="wrap" style={{ maxWidth: 900 }}>
        {/* 타이틀 */}
        <div style={{ textAlign: 'center', marginBottom: 44 }}>
          <div className="eyebrow">{TEXT.eyebrow}</div>
          <h1 style={{ fontFamily: "'Libre Bodoni', serif", fontSize: 32, fontWeight: 700, color: 'var(--navy)', margin: '14px 0' }}>
            {TEXT.h1[lang]}
          </h1>
          <div style={{ width: 50, height: 3, background: 'var(--blue)', margin: '0 auto 20px' }} />
          <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.9, maxWidth: 760, margin: '0 auto' }}>
            {TEXT.sub[lang]}
          </p>
        </div>

        {/* 로타리 소개 카드 */}
        <div style={{
          background: '#fff',
          border: '1px solid var(--border)',
          borderRadius: 'var(--r2)',
          padding: 40,
          boxShadow: 'var(--sh)',
          marginBottom: 32,
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 24 }}>
            <div style={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #003087, #0066CC)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              color: '#fff',
              fontSize: 28,
              fontWeight: 700,
            }}>R</div>
            <div>
              <h2 style={{ fontFamily: "'Libre Bodoni', serif", fontSize: 22, fontWeight: 700, color: 'var(--navy)', marginBottom: 14 }}>
                {TEXT.aboutH[lang]}
              </h2>
              <p style={{ fontSize: 14.5, color: 'var(--text)', lineHeight: 2, marginBottom: 14 }}>{TEXT.aboutP1[lang]}</p>
              <p style={{ fontSize: 14.5, color: 'var(--text)', lineHeight: 2 }}>{TEXT.aboutP2[lang]}</p>
            </div>
          </div>
        </div>

        {/* 로타리 감사 */}
        <div style={{
          background: 'linear-gradient(135deg, #fff 0%, #f9faff 100%)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--r2)',
          padding: 40,
          boxShadow: 'var(--sh)',
          marginBottom: 32,
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 36, alignItems: 'center' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              background: '#fff',
              padding: '28px 22px',
              borderRadius: 'var(--r2)',
              border: '1px solid var(--border)',
              minHeight: 140,
            }}>
              <img src="/images/partners/rotary-logo.png" alt="Rotary International"
                style={{ maxWidth: '100%', height: 'auto', objectFit: 'contain' }} />
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: '#F7A823', textTransform: 'uppercase', marginBottom: 10 }}>
                {TEXT.thanksLabel[lang]}
              </div>
              <h3 style={{ fontFamily: "'Libre Bodoni', serif", fontSize: 22, fontWeight: 700, color: 'var(--navy)', marginBottom: 16, lineHeight: 1.35 }}>
                {TEXT.thanksH[lang]}
              </h3>
              <p style={{ fontSize: 14.5, color: 'var(--text)', lineHeight: 2 }}>{TEXT.thanksP[lang]}</p>
            </div>
          </div>
        </div>

        {/* 한수로타리 위성클럽 */}
        <div style={{
          background: '#f1f5f9',
          border: '1px solid var(--border)',
          borderRadius: 'var(--r2)',
          padding: 40,
          marginBottom: 32,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
            <div style={{ width: 4, height: 32, background: '#F7A823', borderRadius: 2, flexShrink: 0 }} />
            <h2 style={{ fontFamily: "'Libre Bodoni', serif", fontSize: 24, fontWeight: 700, color: 'var(--navy)' }}>
              {TEXT.clubH[lang]}
            </h2>
          </div>
          <p style={{ fontSize: 14.5, color: 'var(--text)', lineHeight: 2, marginBottom: 16 }}>{TEXT.clubP1[lang]}</p>
          <p style={{ fontSize: 14.5, color: 'var(--text)', lineHeight: 2 }}>{TEXT.clubP2[lang]}</p>
        </div>

        {/* CTA */}
        <div style={{
          background: 'linear-gradient(135deg, #003087, #0066CC)',
          borderRadius: 'var(--r2)',
          padding: '44px 40px',
          textAlign: 'center',
          boxShadow: '0 8px 32px rgba(0, 48, 135, 0.3)',
        }}>
          <h3 style={{ fontFamily: "'Libre Bodoni', serif", fontSize: 24, fontWeight: 700, color: '#fff', marginBottom: 12 }}>
            {TEXT.ctaH[lang]}
          </h3>
          <p style={{ fontSize: 14.5, color: 'rgba(255,255,255,0.82)', lineHeight: 1.85, maxWidth: 480, margin: '0 auto 24px' }}>
            {TEXT.ctaP[lang]}
          </p>
          <Link href="/donate" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            padding: '14px 40px',
            background: '#F7A823',
            color: '#003087',
            borderRadius: 'var(--r2)',
            fontSize: 15,
            fontWeight: 700,
            boxShadow: '0 4px 18px rgba(0,0,0,0.2)',
          }}>
            {TEXT.ctaBtn[lang]}
          </Link>
        </div>
      </div>
    </section>
  );
}
