// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const cron = require('node-cron');

const app = express();
app.use(cors());
app.use(express.json());

const PORTONE_API_KEY = process.env.PORTONE_API_KEY; // 포트원 REST API 키
const PORTONE_API_SECRET = process.env.PORTONE_API_SECRET; // 포트원 REST API Secret

// [공통] 포트원 액세스 토큰 발급 함수
async function getPortOneToken() {
    const getToken = await axios({
        url: "https://api.iamport.kr/users/getToken",
        method: "post",
        headers: { "Content-Type": "application/json" },
        data: {
            imp_key: PORTONE_API_KEY,
            imp_secret: PORTONE_API_SECRET
        }
    });
    return getToken.data.response.access_token;
}

// ==========================================
// 1. 일시후원 결제 검증 API
// ==========================================
app.post('/payment/verify', async (req, res) => {
    try {
        const { imp_uid, merchant_uid, amount } = req.body;
        const accessToken = await getPortOneToken();

        // imp_uid로 포트원 서버에서 결제 정보 조회
        const getPaymentData = await axios({
            url: `https://api.iamport.kr/payments/${imp_uid}`,
            method: "get",
            headers: { "Authorization": accessToken }
        });
        const paymentData = getPaymentData.data.response;

        // DB에 저장된 실제 요청 금액과 포트원의 결제 금액 비교 (위변조 방지)
        if (amount === paymentData.amount) {
            // TODO: 결제 성공! DB(MySQL, MongoDB, Supabase 등)에 후원 내역 저장 로직 추가
            
            res.status(200).json({ status: "success", message: "일반 결제 성공" });
        } else {
            res.status(400).json({ status: "forgery", message: "위조된 결제시도" });
        }
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
});

// ==========================================
// 2. 정기후원 빌링키 정보 DB 저장 API
// ==========================================
app.post('/payment/subscribe', async (req, res) => {
    const { customer_uid, amount } = req.body;
    
    // TODO: 전달받은 customer_uid, 결제금액, 결제예정일(예: 매월 10일)을 DB에 저장합니다.
    console.log(`정기후원 등록 완료: 고객 ID ${customer_uid}, 매월 ${amount}원`);
    
    res.status(200).json({ status: "success", message: "정기후원 등록 완료" });
});

// ==========================================
// 3. 매월 자동 결제 스케줄러 (node-cron)
// ==========================================
// 매일 오전 10시에 실행하여, 오늘이 결제일인 정기후원자들의 카드를 결제함
cron.schedule('0 10 * * *', async () => {
    console.log('--- 정기결제 스케줄러 실행 ---');
    try {
        const accessToken = await getPortOneToken();
        
        // TODO: DB에서 '오늘 결제해야 할' 정기후원자 목록(customer_uid, amount 등)을 불러옵니다.
        const todaySubscribers = [
            { customer_uid: "user_12345", amount: 10000, merchant_uid: "sub_" + Date.now() }
            // ... 데이터베이스 연동
        ];

        for (const user of todaySubscribers) {
            // 포트원에 빌링키(customer_uid)를 이용해 결제 요청
            const paymentResult = await axios({
                url: "https://api.iamport.kr/subscribe/payments/again",
                method: "post",
                headers: { "Authorization": accessToken },
                data: {
                    customer_uid: user.customer_uid,
                    merchant_uid: user.merchant_uid,
                    amount: user.amount,
                    name: "생명의 선물 정기후원"
                }
            });

            if (paymentResult.data.code === 0) {
                console.log(`${user.customer_uid}님 ${user.amount}원 정기결제 성공`);
                // TODO: DB에 해당 월의 결제 완료 기록 저장 및 다음 달 결제일 업데이트
            } else {
                console.log(`${user.customer_uid}님 결제 실패:`, paymentResult.data.message);
                // 잔액 부족, 카드 한도 초과 등
            }
        }
    } catch (error) {
        console.error('스케줄러 에러:', error.message);
    }
});

app.listen(3000, () => {
    console.log('Node.js 백엔드 서버가 3000번 포트에서 실행 중입니다.');
});