# Operations Email Hosting — Options Brief

**For**: Gift of Life Korea / Hansoo Rotary Satellite Club operations team
**Prepared by**: Kim Hyunjin (Web developer · `kim.hyunjin@jinnhyun.com` / +82-10-8623-0843)
**Date**: 2026-04-29

> 💰 **All prices in this document are listed as MONTHLY rate (per account) AND ANNUAL total (per account). Please read the column headers carefully.**

---

## 1. Purpose

We're moving the operations email shown on the website (`golikorearotary.or.kr`) from the personal `golikorea@naver.com` to a proper domain-based address such as `contact@golikorearotary.or.kr`.

This requires picking an **email hosting provider**. The following document lays out three options for your review. Please pick the one that fits best, and the development team will handle DNS configuration and site integration afterward.

---

## 2. Three Options at a Glance

| Item | 🇰🇷 **Gabia Mail Hosting** | 🌐 **Google Workspace** | 💼 **Microsoft 365** |
|---|---|---|---|
| **Provider** | Gabia (Korea) | Google (USA) | Microsoft (USA) |
| **Setup speed** | ✅ ~30 minutes | △ 1–2 hours | △ 1–2 hours |
| **Monthly per account** | ₩4,000 ~ ₩10,000 | $7.20 (≈ ₩9,500) | $6 (≈ ₩7,800) |
| **Annual per account** | ₩48k ~ ₩120k | ≈ ₩115k ($86) | ≈ ₩93k ($72) |
| **Payment** | Korean cards / bank transfer / Korean tax invoice | International card (English receipts) | International card (English receipts) |
| **Language support** | Korean (full) | Korean (partial) / English | Korean (partial) / English |
| **Customer support** | Korean call center (1544-4370) | Online (English-first) | Online (English-first) |
| **Mobile app** | ❌ Web only | ✅ Gmail app | ✅ Outlook app |
| **Bundled services** | Email only | Calendar, Drive 30 GB, Meet, Docs | OneDrive 1 TB, Teams, Word/Excel web |
| **Korean tax invoice** | ⭐⭐⭐⭐⭐ Auto issued | △ Foreign format | △ Foreign format |

---

## 3. Option Detail — 🥇 Gabia Mail Hosting (Recommended #1)

### Why Gabia?
- Domain is already registered with Gabia → unified management
- 100% Korean language support + Korean call center
- Korean tax invoices, bank transfer, credit card all supported (easy accounting)
- Familiar UI for Korean staff
- Available within 30 minutes of signup

### Pricing
Three plans available:

| Plan | Monthly | Annual | Mailbox | Best for |
|---|---|---|---|---|
| **Lite** | ₩4,000 | ₩48,000 | 1 GB | Single user, low volume |
| **Basic** | ₩5,000 | ₩60,000 | 3 GB | **Standard org use ⭐** |
| **Pro** | ₩10,000 | ₩120,000 | 10 GB | Heavy attachments |

Additional accounts: ₩2,000/month per account (e.g. for `info@`, `admin@`).

### Sign-up Flow
1. Gabia → "Mail" → "Mail Hosting" subscription
2. Pick domain: `golikorearotary.or.kr` (already owned)
3. Pick plan → pay (card / bank transfer / tax invoice)
4. Create accounts in mail admin tool (e.g. `contact@golikorearotary.or.kr`)
5. **DNS auto-configured** by Gabia
6. Login at <https://hosting.gabia.com/mail>

### Pros
- ✅ Available immediately
- ✅ Korean language + phone support
- ✅ Korean accounting compliance (tax invoice)
- ✅ DNS configured automatically (no manual work)
- ✅ Domain and email on a single dashboard

### Cons
- ⚠️ No dedicated mobile app (use IMAP/SMTP from a smartphone mail app)
- ⚠️ Korean IP reputation can occasionally trigger spam filters when emailing overseas recipients
- ⚠️ No bundled tools (Drive, Calendar, conferencing) — those would need to be acquired separately

### Best fit when
✅ Korean-based members and donors
✅ Low share of overseas correspondence
✅ Accounting prefers Korean tax invoices
✅ Want to start fast
✅ Email-only is sufficient (other tools handled separately)

---

## 4. Option Detail — 🥈 Google Workspace (Recommended #2)

### Why Google?
- Familiar Gmail UI
- Strong mobile apps (Gmail / Calendar / Drive)
- Industry-leading deliverability and spam filtering
- Strong global compatibility (key for foreign donors / partners like Gift of Life International HQ)
- Calendar / Drive 30 GB / Meet / Docs all included

### Pricing
| Plan | Monthly per user | Annual per user | Drive |
|---|---|---|---|
| **Business Starter** | $7.20 (≈ ₩9,500) | ≈ ₩115,000 | 30 GB |
| **Business Standard** | $14.40 (≈ ₩19,000) | ≈ ₩230,000 | 2 TB |

### Sign-up Flow
1. <https://workspace.google.com> → sign up
2. Enter domain: `golikorearotary.or.kr`
3. Domain verification (add 1 TXT record at Gabia DNS)
4. Add MX records at Gabia DNS (per Google's instructions)
5. Pay with international card (English receipt)
6. Create users in Google Admin Console

Estimated time: 1–2 hours including DNS propagation.

### Pros
- ✅ Gmail mobile apps (iOS / Android)
- ✅ Best-in-class deliverability worldwide
- ✅ Bundled Calendar / Drive / Meet / Docs
- ✅ Best for global stakeholders (English-speaking partners)

### Cons
- ⚠️ Receipts are in English format (slight friction with Korean accounting)
- ⚠️ Requires manual DNS work (development team will assist)
- ⚠️ Limited Korean-language customer support

### Best fit when
✅ Frequent communication with overseas donors / partners (e.g. GOI HQ)
✅ Want unified Calendar, Drive, video conferencing
✅ Heavy mobile usage
✅ Want Gmail's high deliverability

---

## 5. Option Detail — 💼 Microsoft 365 Business Basic (Recommended #3)

### Why Microsoft?
- Outlook + Teams + web Word/Excel integration
- Familiar to staff used to Office workflows
- Generous OneDrive (1 TB)
- Standard in Korean enterprises and government

### Pricing
| Plan | Monthly per user | Annual per user | OneDrive |
|---|---|---|---|
| **Business Basic** | $6 (≈ ₩7,800) | ≈ ₩93,000 | 1 TB |
| **Business Standard** | $12.50 (≈ ₩16,300) | ≈ ₩195,000 | 1 TB + Office desktop apps |

### Sign-up Flow
1. <https://www.microsoft.com/en-us/microsoft-365/business> → sign up
2. Enter domain: `golikorearotary.or.kr`
3. Add TXT/MX records at Gabia DNS (per Microsoft's instructions)
4. Pay (Korean cards accepted)
5. Create users in Microsoft 365 Admin Center

Estimated time: 1–2 hours.

### Pros
- ✅ Cheapest paid global option ($6/month)
- ✅ Generous OneDrive (1 TB)
- ✅ Outlook app + Teams meetings included
- ✅ Web Word / Excel access
- ✅ Multiple Korean payment options

### Cons
- ⚠️ Outlook UI less familiar than Gmail/Naver in Korea
- ⚠️ Teams has a learning curve compared to Slack / KakaoTalk

### Best fit when
✅ Heavy Word/Excel usage
✅ Plan to introduce Teams for video meetings
✅ Want the cheapest paid global option
✅ Need large OneDrive (1 TB) for documents

---

## 6. Decision Guide by Scenario

### Choose Gabia if
- Operations team works in Korea
- Few international donors
- Korean accounting (tax invoices) is a priority
- Want to start quickly
- Other tools (Drive, conferencing) handled separately

### Choose Google Workspace if
- Regular communication with overseas donors / partners (e.g. GOI HQ in the US)
- Heavy mobile email usage
- Want unified Calendar, Drive, and video conferencing
- Want a globally-familiar setup that English-speaking volunteers and donors will recognize

### Choose Microsoft 365 if
- Heavy Word/Excel office work
- Want to introduce Teams for meetings
- Looking for the cheapest paid global option
- Need a 1 TB OneDrive for documents

---

## 7. Annual Cost Comparison (1 account)

| Option | Annual cost | Notes |
|---|---|---|
| Gabia Lite (1 GB) | ₩48,000 | Cheapest |
| **Gabia Basic (3 GB)** | **₩60,000** | Standard recommendation |
| Microsoft 365 Business Basic | ≈ ₩93,000 | + OneDrive 1 TB |
| Google Workspace Business Starter | ≈ ₩115,000 | + Drive 30 GB |
| Gabia Pro (10 GB) | ₩120,000 | Heavy attachments |
| Microsoft 365 Business Standard | ≈ ₩195,000 | + Office desktop apps |
| Google Workspace Business Standard | ≈ ₩230,000 | + Drive 2 TB |

> Add cost per extra account (e.g. `info@`, `admin@`) — varies per provider.

---

## 8. Cost Comparison (3 accounts — realistic for an org)

For a typical setup of `contact@`, `info@`, `admin@`:

| Option | Annual cost (3 accounts) |
|---|---|
| **Gabia Basic** + 2 add-ons | **≈ ₩108,000** ⭐ cheapest by far |
| Microsoft 365 × 3 | ≈ ₩279,000 |
| Google Workspace Starter × 3 | ≈ ₩345,000 |

> Gabia is uniquely affordable at scale because additional accounts are only ₩2,000/month each. Google and Microsoft charge full price per account.

---

## 9. Decision Summary

| If your priority is… | Recommended option |
|---|---|
| **Lowest cost + fastest setup** | Gabia Basic (₩60k/year) |
| **Balance (Korean + some global)** | Gabia Basic, or Google Workspace |
| **Overseas donors / partners-heavy** | Google Workspace Starter (≈ ₩115k/year) |
| **Office work integration (Word / Teams)** | Microsoft 365 Business Basic (≈ ₩93k/year) |

---

## 10. After You Decide

Once you've picked an option, please share the following with the development team (Kim Hyunjin):

1. **Chosen service**: Gabia / Google / Microsoft
2. **Chosen plan**: (e.g. Gabia Basic, Google Business Starter)
3. **Email addresses to create**: (e.g. `contact@`, `info@`, `admin@`)
4. **Account info after sign-up**: admin panel access details

The development team will then:
- Update / verify Gabia DNS records as needed
- Activate the website's footer email link
- (Optional) Switch the website's contact form recipient to the new domain email
- Verify domain authentication (DKIM / SPF / MX)

---

## 11. Note — System Email (auto-sent) Is Separate

The website's automatic emails (e.g. contact form submissions) are handled by a different service called **Resend**, and are unaffected by this decision. The "operations team mailbox" and the "system auto-emails" are completely separated at the infrastructure level.

---

## 12. Payment Notes

- **Gabia**: Monthly or annual billing (slight discount on annual). Auto-renewal via Korean credit card.
- **Google / Microsoft**: Monthly billing in USD (English receipts). Korean credit cards accepted.
- All options offer either a free trial or refund window — please review the terms at sign-up.

---

*Prepared by Kim Hyunjin (`kim.hyunjin@jinnhyun.com` / +82-10-8623-0843)*
*Please contact me with your decision and any questions.*
