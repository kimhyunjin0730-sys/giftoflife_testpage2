import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

const SITE_URL = 'https://www.golikorearotary.or.kr'
const SITE_NAME = 'Gift of Life Korea'
const SITE_TAGLINE = '생명의 선물 코리아 · 한수로타리 위성클럽'

/**
 * 호출자가 보낸 본문이 이미 완성된 HTML 문서 (`<html>` 시작) 면 그대로 사용,
 * 아니면 브랜드 템플릿 (헤더/풋터 포함) 으로 감싼다.
 */
function wrapInTemplate(rawHtml: string, subject: string): string {
  const looksLikeFullDoc = /<!doctype|<html[\s>]/i.test(rawHtml)
  if (looksLikeFullDoc) return rawHtml

  // 줄바꿈이 단순 \n 이면 <p> 단위로 감싸기 (plain-ish text 처리)
  const body = /<[a-z][^>]*>/i.test(rawHtml)
    ? rawHtml
    : rawHtml
        .split(/\n{2,}/)
        .map((p) => `<p style="margin:0 0 14px;line-height:1.7;color:#0f172a">${p.replace(/\n/g, '<br/>')}</p>`)
        .join('')

  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1.0" />
  <meta name="x-apple-disable-message-reformatting" />
  <title>${escapeHtml(subject)}</title>
</head>
<body style="margin:0;padding:0;background:#f4f1ea;font-family:-apple-system,BlinkMacSystemFont,'Apple SD Gothic Neo','Malgun Gothic','Segoe UI',sans-serif;color:#0f172a">
  <!-- preheader (인박스 미리보기용 숨김 텍스트) -->
  <div style="display:none;max-height:0;overflow:hidden;mso-hide:all">${escapeHtml(subject)} · ${SITE_NAME}</div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f1ea;padding:40px 0">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0"
          style="max-width:600px;width:100%;background:#ffffff;border:1px solid #e5e2da;border-radius:14px;overflow:hidden;box-shadow:0 6px 20px rgba(15,23,42,.06)">

          <!-- 헤더 -->
          <tr>
            <td style="padding:28px 36px 18px;border-bottom:1px solid #f0eee5;background:linear-gradient(135deg,#fff7f8 0%,#fff 60%)">
              <div style="font-family:'Times New Roman',Georgia,serif;font-size:22px;font-weight:700;color:#0a1428;letter-spacing:-0.01em">
                ${SITE_NAME}
              </div>
              <div style="font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#e8728a;margin-top:6px;font-weight:600">
                ${SITE_TAGLINE}
              </div>
            </td>
          </tr>

          <!-- 본문 -->
          <tr>
            <td style="padding:32px 36px;font-size:14.5px;line-height:1.75;color:#0f172a">
              ${body}
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding:0 36px 32px" align="left">
              <a href="${SITE_URL}"
                style="display:inline-block;padding:12px 26px;background:#e8728a;color:#ffffff;text-decoration:none;font-size:13.5px;font-weight:700;border-radius:9999px;letter-spacing:-0.005em">
                사이트 방문하기 →
              </a>
            </td>
          </tr>

          <!-- 푸터 -->
          <tr>
            <td style="padding:22px 36px 26px;background:#fafaf6;border-top:1px solid #f0eee5;font-size:12px;color:#5b6478;line-height:1.7">
              <strong style="color:#0a1428">${SITE_NAME}</strong><br/>
              ${SITE_TAGLINE}<br/>
              <a href="${SITE_URL}" style="color:#e8728a;text-decoration:none">${SITE_URL.replace(/^https?:\/\//, '')}</a><br/>
              <span style="color:#9ca3af">문의: golikorea@naver.com</span>
              <hr style="border:0;border-top:1px solid #e5e2da;margin:14px 0" />
              <span style="font-size:11px;color:#9ca3af">
                이 메일은 발신 전용 주소(noreply@golikorearotary.or.kr)에서 보내드렸습니다.
                회신이 필요하시면 위 문의 메일로 연락 주세요.
              </span>
            </td>
          </tr>

        </table>
        <!-- 모바일 spacing -->
        <div style="height:24px;line-height:24px">&nbsp;</div>
      </td>
    </tr>
  </table>
</body>
</html>`
}

function escapeHtml(s: string): string {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

serve(async (req) => {
  // CORS 처리
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
      },
    })
  }

  try {
    const { to, subject, html, reply_to, skip_template } = await req.json()
    console.log(`발송 시도: to=${to}, subject=${subject}`);

    // From 표시: 운영 메일(golikorea@naver.com) 을 표시 이름에 노출 — 수신자 입장에서
    // 'naver 주소가 운영 주체' 임이 분명히 보이도록.
    // 실제 SMTP 발송 주소는 verified 도메인(golikorearotary.or.kr) 사용 (필수).
    const fromAddress = `${SITE_NAME} (golikorea@naver.com) <noreply@golikorearotary.or.kr>`

    // Reply-To 기본값: 호출자가 지정 안 하면 운영 메일(naver) 로 자동 회귀.
    const finalReplyTo = reply_to || 'golikorea@naver.com'

    // skip_template: true 면 호출자가 보낸 HTML 그대로 (디버깅 / 특수 메일용)
    const finalHtml = skip_template ? html : wrapInTemplate(html || '', subject || SITE_NAME)

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromAddress,
        to,
        reply_to: finalReplyTo,
        subject,
        html: finalHtml,
      }),
    })

    const data = await res.json()

    if (!res.ok) {
      console.error("Resend API 에러 세부내용:", JSON.stringify(data));
      return new Response(JSON.stringify({ error: data }), {
        status: res.status,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      })
    }

    console.log("메일 발송 성공!");
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    })
  } catch (error) {
    console.error("함수 실행 중 예외 발생:", error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    })
  }
})
