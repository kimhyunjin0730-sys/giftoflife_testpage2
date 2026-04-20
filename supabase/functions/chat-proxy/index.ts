import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
const GEMINI_MODEL = 'gemini-2.5-flash';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const SYSTEM_PROMPT = `당신은 생명의선물 코리아(Gift of Life Korea) 공식 웹사이트의 상담 안내 도우미입니다.

[단체 정보]
- 1975년 미국 뉴욕에서 설립된 Gift of Life International의 한국 위성클럽
- 설립자: 이길우(Brett Halvorson) 이사장 (1983년 레이건 대통령 지원으로 에어포스원 타고 미국에서 심장 수술받은 생존자)
- 사명: 선천성 심장병 아동을 출생지와 관계없이 수술 지원
- 누적 실적: 47,599명 구호 / ₩18.6억 모금 / 30여 개국 협력
- 선천성 심장병 세계 현황: 매년 135만 명 출생, 이 중 93%는 수술 미시행, 연 100만 명 사망

[현재 대기/완료 아동]
- Amara (말라위, 4세): $8,400 / $12,000 모금 (70%), 수술 대기
- Krist (코소보, 5세): 2022년 한국에서 수술 성공, 회복 후 건강하게 성장 중
- Diego (볼리비아, 5세): $5,200 / $12,000 모금 (43%), 수술 대기

[후원/회원]
- 수술 비용: 1인당 약 $12,000 (약 ₩14,400,000)
- 서포터 회원: 월 ₩20,000 (월 1회 Zoom, 뉴스레터, 디지털 회원증)
- 챔피언 회원: 월 ₩30,000 (전체 Zoom, 1:1 아동 매칭, 공식 회원증) - 권장
- 파트너 회원: 기업/단체 대상, 별도 협의
- 납부 계좌: 국민은행 123-456-7890 (예금주: 생명의선물코리아)

[행사]
- 5월 2일 오후 5시 자선 음악회 (국립극장)
- 2026년 6월 위성클럽 공식 발족 (Zoom)
- 매월 마지막 금요일 글로벌 Zoom 정기미팅

[연락처]
- 이메일: golikorea@naver.com
- 전화: 010-9985-5328
- Instagram: @golikorea
- 주소: 서울 영등포구 선유로3길 10, 2층
- 웹: www.golikorea.or.kr

[답변 규칙]
1. 항상 존댓말 formal 톤으로 답변해 주세요.
2. 사용자가 입력한 언어(한국어/영어/중국어)에 맞춰 답변해 주세요.
3. 단체와 무관한 주제(일반 상식, 뉴스, 다른 단체, 기술 질문 등)는 정중히 범위 밖임을 안내하고, 후원/아이들/회원/문의로 유도해 주세요.
4. 확실하지 않거나 데이터에 없는 정보는 추측하지 말고 "자세한 내용은 사무국(golikorea@naver.com)으로 문의해 주시기 바랍니다"로 안내해 주세요.
5. 답변은 간결하게 작성해 주세요 (5~10문장 이내).
6. 이모지 사용은 최소화해 주세요.`;

// Gemini는 role 값으로 'user' 또는 'model'을 사용 (assistant 아님)
function toGeminiContents(messages: Array<{ role: string; content: string }>) {
  return messages.map((m) => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }));
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: CORS });
  }

  if (!GEMINI_API_KEY) {
    console.error('GEMINI_API_KEY is not set');
    return new Response(JSON.stringify({ error: 'API key not configured' }), {
      status: 500,
      headers: { ...CORS, 'Content-Type': 'application/json' },
    });
  }

  try {
    const { messages, lang } = await req.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: 'messages array required' }), {
        status: 400,
        headers: { ...CORS, 'Content-Type': 'application/json' },
      });
    }

    const recent = messages.slice(-10);
    console.log(`chat-proxy 호출: lang=${lang}, msgs=${recent.length}`);

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents: toGeminiContents(recent),
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 700,
        },
        safetySettings: [
          { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_ONLY_HIGH' },
          { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_ONLY_HIGH' },
          { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_ONLY_HIGH' },
          { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_ONLY_HIGH' },
        ],
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error('Gemini API 에러:', res.status, errText);
      return new Response(JSON.stringify({ error: `Gemini API ${res.status}` }), {
        status: 502,
        headers: { ...CORS, 'Content-Type': 'application/json' },
      });
    }

    const data = await res.json();
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || '죄송합니다. 답변을 생성하지 못했습니다.';
    console.log('chat-proxy 응답 생성 완료, 길이:', reply.length);

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { ...CORS, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('함수 실행 중 예외:', err.message);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...CORS, 'Content-Type': 'application/json' },
    });
  }
});
