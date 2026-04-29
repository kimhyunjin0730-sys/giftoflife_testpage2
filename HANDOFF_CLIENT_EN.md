# Site Operations Guide

**Gift of Life Korea · Hansoo Rotary Satellite Club Website**

Date: 2026-04-29
Contact: Kim Hyunjin
- kim.hyunjin@jinnhyun.com
- +82 10-8623-0843

---

## 1. Site Address

- **Main site**: https://www.golikorearotary.or.kr

---

## 2. Administrator Login

### Admin Account Credentials
| Field | Value |
|---|---|
| Email | `admin.goli@golikorearotary.or.kr` |
| Password | `goli1234!` |

### How to Sign In
1. Open the site → click **"Login"** at the top right
2. Enter the email and password above
3. After signing in, you should see an **"Administrator"** button at the top right
4. Click **"Administrator"** to enter the admin page

---

## 3. What You Can Do on the Admin Page

Seven menus are available in the left sidebar:

### 📊 Dashboard
- See total members, total donations, unread inquiries, and number of news posts at a glance
- Click **"Members CSV"** or **"Donations CSV"** to download as Excel

### 📌 Notices Management
- **New Notice**: click **"+ New Notice"** at the top right
- Fill in title and content in Korean / English / Chinese
- **Attach an image** (auto-uploaded when you pick a file)
- Toggle "NEW badge" to flag a recent post
- Changes appear on the site immediately after saving

### 📰 News Management
- **New News**: click **"+ New News"**
- Set category, date, external link, and image
- Multilingual (KO / EN / ZH) title and summary
- Edit or delete via the buttons next to each row

### 👥 Member Management
- Full list of signed-up members
- CSV export available
- Sortable and searchable

### 🏅 Rotary Verification
- Promote a regular member to verified Rotary status (or revoke)
- Verified Rotary members get access to the "Rotary-only channel" on the donation page

### ✉️ Contact Management
- All messages submitted through the site's contact form
- Mark as **"Read"** to remove from the unread counter
- Replies are sent from your own email account (the admin replies directly)

### 💝 Donation Management
- All donation entries that members have registered themselves
- Toggle status between **"Confirmed"** and **"Pending"**
- Match real bank transfers and confirm

---

## 4. Content Workflow Examples

### Posting a New Notice
1. Admin Page → **Notices Management**
2. Click **"+ New Notice"** at the top right
3. In the modal:
   - Type: "Notice (pinned)" or "General post"
   - Korean title (required)
   - English / Chinese title (optional, machine translation is fine)
   - Body content
   - **Pick an image file** (or drag and drop)
   - Toggle "NEW badge"
4. Click **"Save"**
5. Refresh the site to see it live

### Posting a New News Item
1. Admin Page → **News Management**
2. Click **"+ New News"**
3. Enter category (e.g. "Global Activity"), date, Korean title and summary, and an image
4. Click **"Save"** → the post appears on the news page immediately

### Donation Workflow
1. A member registers their bank-transfer info on the site → automatically set to **"Pending"**
2. Admin Page → **Donation Management**
3. Verify the deposit in the actual bank account
4. Click the **✅ button** on that row → status changes to **"Confirmed"**

---

## 5. Site Infrastructure

### 🌐 Hosting
- Vercel

### 🌍 Domain
- Gabia — `golikorearotary.or.kr` (registered for 1 year)

### 💾 Database + Member Management
- Supabase
- Stores members, notices, news, and inquiries

### 📧 Email Sending
- Sender: `noreply@golikorearotary.or.kr`
