# 🛒 বাজার দর (Bazar Dor)

**বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের দৈনিক বাজার দর এক নজরে**

বাজার দর একটি সম্পূর্ণ Next.js অ্যাপ্লিকেশন যা ব্যবহারকারীদের চাল, ডাল, তেল, সবজি, মাছ, মাংস — সব নিত্যপ্রয়োজনীয় পণ্যের আজকের দাম দেখায়। API থেকে রিয়েল-টাইম ডেটা এনে ব্যবহারকারীকে বাজারভিত্তিক দাম, দাম পরিবর্তনের হার এবং বাজার বিশ্লেষণ দেখানো হয়।

## 🔗 লিংক

- **Live Site:** [bazar-dor.vercel.app](https://bazar-dor.vercel.app) <!-- পরে deploy করে update করো -->
- **GitHub Repo:** [github.com/sukriaaktersahal/bazar-dor](https://github.com/sukriaaktersahal/bazar-dor)
- **API:** [openapi.programming-hero.com/api/bazardor](https://openapi.programming-hero.com/api/bazardor)

## ✨ Key Features

**📊 আজকের বাজারের দাম** — API থেকে লাইভ ডেটা এনে আজকের দাম, দাম বেড়েছে ▲ এবং কমেছে ▼ — এভাবে আলাদা সেকশনে দেখানো।
**🔍 ক্যাটাগরি অনুযায়ী ফিল্টার** — চাল, ডাল, তেল, সবজি, মাছ ইত্যাদি ক্যাটাগরি অনুযায়ী প্রোডাক্ট দেখানো।
**📈 প্রোডাক্ট ডিটেইলস** — প্রতিটি প্রোডাক্টের জন্য বিস্তারিত পেজ, যেখানে সর্বনিম্ন/সর্বোচ্চ/গড় দাম এবং বাজারভিত্তিক সব দাম টেবিলে দেখানো।
**🔐 Authentication System** — Better Auth দিয়ে Email/Password + Google + GitHub OAuth, session management, sign out এবং protected route।
**👤 Profile Management** — লগইন করার পর প্রোফাইল দেখা এবং নাম আপডেট করার সুবিধা।
**🛡️ Protected Routes** — Product Details পেজ শুধু logged-in user-এর জন্য, middleware দিয়ে protected।
**📱 Fully Responsive** — Mobile, tablet, desktop — সব screen-এ সুন্দরভাবে কাজ করে।
**🎨 Bengali Typography** — সম্পূর্ণ ওয়েবসাইট বাংলায়, Bengali সংখ্যা (১৪৮ টাকা), বাংলা তারিখ, বাংলা ফন্ট (Hind Siliguri)।

## 🛠️ Technologies Used

| Technology | Purpose |
|------------|---------|
| **Next.js 16** (App Router) | React framework, routing, server components |
| **TypeScript** | Type safety |
| **Tailwind CSS v4** | Styling and responsiveness |
| **Better Auth** | Authentication (email/password + OAuth) |
| **MongoDB Atlas** | Cloud database |
| **react-hot-toast** | Toast notifications |
| **Vercel** | Deployment |

## 📁 Project Structure
bazar-dor/
|----src/
||----app/
|||----api/auth/[...all]/ 
|||----category/[slug]
|||----product/[slug]
|||----profile/
|||----signin/
|||----signup/
|||----layout.tsx
|||----page.tsx
|||----notFound.tsx
||----components/
|||----Navbar.tsx
|||----UserMenu.tsx
|||----PriceTicker.tsx
|||----HeroSection.tsx
|||----ProductCard.tsx
|||----ProductSection.tsx
|||----ProductSkkkeleton.tsx
||----lib/
|||----auth.ts
|||----auth-client.ts
|||----api.ts
|||----format.ts
||----types/
|||----index.ts
............
........


## 🚀 Getting Started (Local Setup)

```bash
# 1. cloning repository
git clone https://github.com/sukriaaktersahal/bazar-dor.git
cd bazar-dor

# 2. dependency install
npm install

# 3. creating .env.local & adding :
# MONGODB_URI=...
# MONGODB_DB=bazardor
# BETTER_AUTH_URL=http://localhost:3000
# BETTER_AUTH_SECRET=...
# NEXT_PUBLIC_APP_URL=http://localhost:3000
# GOOGLE_CLIENT_ID=...
# GOOGLE_CLIENT_SECRET=...
# GITHUB_CLIENT_ID=...
# GITHUB_CLIENT_SECRET=...

# 4. run dev server
npm run dev

📝 License
This project only creater for Learning purpose as part of Programming Hero Assignment -07

developed by Most. Sukria Akter
