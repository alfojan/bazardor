# 🛒 BazarDor — বাজার দর

BazarDor is a web application that helps users explore the latest prices of essential daily products in Bangladesh. Users can check product prices, compare market rates, browse products by category, and keep track of price changes through a simple and user-friendly interface.

## 🌐 Live Website

🔗 [Visit BazarDor — বাজার দর](https://bazardor-nine-rho.vercel.app/)

## ✨ Features

- **Product Price Overview:** View the latest prices of essential daily products.
- **Price Trends:** Explore products with increased or decreased prices.
- **Product Details:** View product information, price comparisons, minimum and maximum prices, and market-wise prices.
- **Category Browsing:** Browse products by categories such as rice, lentils, oil, vegetables, fish, meat, eggs, milk, and spices.
- **Product Sorting:** Sort category products by price from low to high or high to low.
- **User Authentication:** Register and sign in using email and password.
- **Social Login:** Sign in using Google and GitHub.
- **Profile Management:** Update your profile information.
- **Responsive Design:** Use the application on mobile, tablet, and desktop devices.
- **Loading Skeletons:** See loading placeholders while product data is loading.
- **Toast Notifications:** Receive feedback for authentication and other actions.
- **Custom 404 Page:** Get a friendly error page when a requested page or product is not found.

## 🛠️ Technologies Used

- **Next.js 16** — React framework with App Router
- **React 19** — UI library
- **TypeScript** — Type-safe JavaScript
- **Tailwind CSS 4** — Utility-first CSS framework
- **DaisyUI 5** — UI component library
- **Better Auth** — Authentication
- **MongoDB** — Database
- **Lucide React** — Icons
- **React Hot Toast** — Toast notifications

## 🚀 Getting Started

Follow these steps to run the project locally.

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Navigate to the Project Folder

```bash
cd bazardor
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env.local` file in the root directory of the project.

Add the required environment variables used by your Better Auth and MongoDB configuration.

Example:

```env
MONGODB_URI=your_mongodb_connection_string
BETTER_AUTH_SECRET=your_better_auth_secret
BETTER_AUTH_URL=http://localhost:3000

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

**Important:** Use the exact environment variable names configured in your project. Never commit `.env.local` or expose your secret keys publicly.

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Available Scripts

| Command         | Description                           |
| --------------- | ------------------------------------- |
| `npm run dev`   | Starts the development server         |
| `npm run build` | Builds the application for production |
| `npm run start` | Starts the production server          |
| `npm run lint`  | Runs ESLint                           |

## 🔐 Authentication

BazarDor uses Better Auth for user authentication with MongoDB as the database.

Users can:

- Create an account using their name, email, and password.
- Sign in using email and password.
- Sign in using Google or GitHub.
- Update their profile information.
- Sign out securely.

## 📁 Project Structure

```text
bazardor/
├── public/
├── src/
│   ├── app/
│   │   ├── (main)/
│   │   │   ├── category/
│   │   │   └── product/
│   │   ├── api/
│   │   ├── signin/
│   │   ├── signup/
│   │   ├── update-profile/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── not-found.tsx
│   ├── components/
│   │   ├── auth/
│   │   ├── products/
│   │   ├── profile/
│   │   └── shared/
│   ├── lib/
│   └── types/
├── .env.local
├── package.json
└── README.md
```

## 🌐 Deployment

The application is deployed using [Vercel](https://vercel.com/).

**Live Website:** [https://bazardor-nine-rho.vercel.app/](https://bazardor-nine-rho.vercel.app/)

To deploy the application:

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Configure the required environment variables in Vercel.
4. Deploy the application.
5. Update authentication callback URLs and trusted origins for the production domain where required.

---

**BazarDor — প্রয়োজনীয় পণ্যের দাম এক নজরে।**
