import { NextResponse, type NextRequest } from 'next/server';

export const runtime = 'nodejs';

/**
 * 문의 메일 발송 — Resend 사용
 *
 * 필요한 환경변수 (Vercel 대시보드):
 *   - RESEND_API_KEY         : re_... (Resend 대시보드에서 발급)
 *   - RESEND_FROM            : 이메일 발송 주소 (Resend 에서 도메인 verify 완료된 주소)
 *                              ex) "Gift of Life <noreply@golikorea.or.kr>"
 *                              도메인 verify 전에는 "onboarding@resend.dev" 사용 가능 (본인 이메일로만 발송)
 *   - CONTACT_TO             : 문의 수신 관리자 이메일 (ex. golikorea@naver.com)
 *
 * Resend 셋업 가이드:
 *   1) https://resend.com/signup 가입
 *   2) Domains → golikorea.or.kr 등록 → DNS (SPF/DKIM) 설정
 *      가비아 DNS 관리 페이지에서 Resend 가 지시하는 TXT 레코드 3개 추가
 *   3) Verified 상태 확인 후 API Keys 에서 키 발급
 *   4) Vercel Project Settings → Environment Variables 에 등록 (Production + Preview)
 *
 * (도메인 구입 전에는 RESEND_FROM 을 'onboarding@resend.dev' 로 두면,
 *  본인 가입 이메일로만 테스트 메일 수신 가능. 프로덕션에는 반드시 verified 도메인 필요.)
 */

type Body = {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
  consent?: boolean;
};

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function POST(req: NextRequest) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: '잘못된 요청 형식입니다.' }, { status: 400 });
  }

  const name = (body.name ?? '').trim().slice(0, 120);
  const email = (body.email ?? '').trim().slice(0, 200);
  const phone = (body.phone ?? '').trim().slice(0, 40);
  const subject = (body.subject ?? '').trim().slice(0, 200);
  const message = (body.message ?? '').trim().slice(0, 5000);
  const consent = Boolean(body.consent);

  if (!name || !email || !message) {
    return NextResponse.json({ error: '필수 항목이 누락되었습니다.' }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: '이메일 형식이 올바르지 않습니다.' }, { status: 400 });
  }
  if (!consent) {
    return NextResponse.json({ error: '개인정보 수집·이용 동의가 필요합니다.' }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM || 'onboarding@resend.dev';
  const to = process.env.CONTACT_TO;

  if (!apiKey || !to) {
    console.error('[contact] Resend env vars missing');
    return NextResponse.json(
      { error: '메일 서버가 설정되지 않았습니다. 관리자 문의 바랍니다.' },
      { status: 500 },
    );
  }

  const subjectLine = `[GOLI 문의] ${subject || '(제목 없음)'} — ${name}`;

  const textBody = [
    `성명: ${name}`,
    `이메일: ${email}`,
    phone ? `연락처: ${phone}` : '',
    `제목: ${subject || '(없음)'}`,
    '',
    '── 문의 내용 ──',
    message,
  ].filter(Boolean).join('\n');

  const htmlBody = `
    <div style="font-family:system-ui,sans-serif;font-size:14px;line-height:1.7;color:#0f172a;max-width:600px">
      <h2 style="color:#0f172a;margin:0 0 12px;font-size:18px">새로운 문의가 도착했습니다</h2>
      <table style="border-collapse:collapse;width:100%;margin-bottom:18px">
        <tr><td style="padding:6px 10px;background:#f1f5f9;width:110px;vertical-align:top">성명</td><td style="padding:6px 10px">${escapeHtml(name)}</td></tr>
        <tr><td style="padding:6px 10px;background:#f1f5f9;vertical-align:top">이메일</td><td style="padding:6px 10px"><a href="mailto:${escapeHtml(email)}" style="color:#e8728a">${escapeHtml(email)}</a></td></tr>
        ${phone ? `<tr><td style="padding:6px 10px;background:#f1f5f9;vertical-align:top">연락처</td><td style="padding:6px 10px">${escapeHtml(phone)}</td></tr>` : ''}
        <tr><td style="padding:6px 10px;background:#f1f5f9;vertical-align:top">제목</td><td style="padding:6px 10px">${escapeHtml(subject || '(없음)')}</td></tr>
      </table>
      <h3 style="margin:18px 0 8px;font-size:15px">문의 내용</h3>
      <div style="white-space:pre-wrap;padding:14px 16px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px">${escapeHtml(message)}</div>
      <p style="margin-top:22px;font-size:12px;color:#64748b">Gift of Life International Korea · 자동 발송 메일 (Resend)</p>
    </div>`;

  // Resend REST API 직접 호출 (SDK 의존성 제거)
  try {
    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: `${name} <${email}>`,
        subject: subjectLine,
        text: textBody,
        html: htmlBody,
      }),
    });

    if (!resendRes.ok) {
      const errText = await resendRes.text();
      console.error('[contact] Resend API error:', resendRes.status, errText);

      // 403 = 도메인 verify 안됨
      if (resendRes.status === 403) {
        return NextResponse.json(
          { error: '메일 발송 도메인 인증이 아직 완료되지 않았습니다. 관리자에게 문의해 주세요.' },
          { status: 502 },
        );
      }
      return NextResponse.json(
        { error: `메일 발송 실패 (code ${resendRes.status}). 잠시 후 다시 시도해 주세요.` },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'network error';
    console.error('[contact] Resend request failed:', msg);
    return NextResponse.json({ error: '메일 서버 통신 실패.' }, { status: 502 });
  }
}
