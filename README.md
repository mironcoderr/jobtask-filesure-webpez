# Webpez – Referral & Credit System

## 📌 Project Overview
**Webpez** is a full-stack Referral & Credit System built as a digital product platform. Users can register, share referral links, earn credits on referrals’ first purchases, and track all referral activity through a responsive dashboard. This project demonstrates a scalable, modular full-stack application with clean architecture, secure authentication, and thoughtful engineering practices.

---

## ✅ Core Features

### User Authentication
- Secure registration, login, and logout
- Passwords hashed using **bcrypt**
- JWT-based authentication with HTTP-only cookies

### Referral Management
- Each user receives a **unique referral link**
- Referral relationships tracked upon registration
- Referral status recorded (registered vs converted)
- **2 credits** awarded to both users on the first purchase only
- Prevents double-crediting

### Purchase Simulation
- “Purchase Now” button to simulate purchases
- Only the first purchase of a referred user triggers credit rewards

### User Dashboard
- Total Referred Users
- Total Pending Users
- Total Converted Users (who purchased)
- Total Credits Earned
- Total My Referral Users
- Unique referral link with copy/share option

### Admin Dashboard
- Total Registered Users
- Total Referred Users
- Total Organic Users
- Total Credits Earned
- All Registered Users Table
- Unique referral link with copy/share option

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 15, TypeScript, Tailwind CSS, Framer Motion |
| Backend | Node.js, Express.js, TypeScript |
| Database | MongoDB + Mongoose |
| State Management | Redux Toolkit + React Redux |
| Validation | Zod (frontend & backend) |
| Authentication | JWT + bcrypt |

---

## 📂 Project Structure

```text
root/
├── backend/
│   ├── configs/
│   ├── controllers/
│   ├── enums/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── schemas/
│   ├── services/
│   ├── types/
│   ├── env.example
│   ├── package-lock.json
│   ├── package.json
│   ├── server.ts
│   └── tsconfig.json
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── enums/
│   ├── hooks/
│   ├── json/
│   ├── library/
│   ├── public/
│   ├── schemas/
│   ├── store/
│   ├── types/
│   ├── env.example
│   ├── next-env.d.ts
│   ├── next.config.ts
│   ├── package-lock.json
│   ├── package.json
│   ├── postcss.config.mjs
│   └── tsconfig.json
│
├── .gitignore
├── LICENSE
└── README.md
```

## 🔗 API Endpoints (Backend)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | User login |
| POST | `/api/auth/logout` | User logout |
| GET  | `/api/users/me` | Get logged-in user details |
| GET  | `/api/users/registered` | Total referred users |
| GET  | `/api/users/referred` | Referred users who purchased |
| POST | `/api/purchases` | Simulate purchase (first triggers credits) |

---

## 📜 Environment Variables

### Backend (`.env.example`)
```
MONGODB_URL=mongodb://localhost:27017/mydatabase
JWT_SECRET=your_jwt_secret_key
FRONTEND_URL=http://localhost:3000
ADMIN_EMAIL=admin@example.com
NODE_ENV=development
PORT=5000
```

### Frontend (`.env.example`)
```
NEXT_PUBLIC_BASE_URL=http://localhost:5000
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js v18+  
- MongoDB (local or Atlas cluster)  
- Git  

### Clone Repository
```bash
git clone https://github.com/mironcoderr/jobtask-filesure-webpez.git
cd webpez
```

### Backend Setup
```
cd backend
npm install
cp .env.example .env
npm run dev
```

### Backend runs on http://localhost:5000

### Frontend Setup
```
cd ../frontend
npm install
cp .env.example .env.local
npm run dev
```

### Frontend runs on http://localhost:3000

## 🖼 UML / System Flow Diagram

**Example Flow of Referral & Credit System:**

1. **User Registration**
   - User signs up
   - Referral code (if any) is detected
   - Referrer–referred relationship is created

2. **User Login**
   - User logs in
   - Dashboard loads referral stats:
     - Total Referred Users
     - Pending Users
     - Converted Users
     - Total Credits
     - Unique Referral Link

3. **Purchase Flow**
   - User clicks “Purchase Now”
   - System checks if it's the first purchase
   - Credits are assigned to both referrer and referred user
   - Referral status updated to “converted”
   
## 🧪 How to Test
- Register User A
- Copy User A’s referral link
- Open incognito → Register User B using the referral link
- Login as User B → Click “Buy Product”
- Login as User A → Check dashboard for earned credits

## 👨‍💻 Author
- Miron Mahmud
- Email: mironcoder@gmail.com
- Phone: +880 18382 88389
- Website: mironmahmud.com
- GitHub: mironcoderr
