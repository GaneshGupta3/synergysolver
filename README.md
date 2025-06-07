# SynergySolver

SynergySolver is a web-based platform designed to bridge the gap between students and industry professionals. It provides a collaborative environment where students can solve real-world problems shared by professionals, helping them gain experience, build portfolios, and potentially receive rewards.

## Live Demo

Access the platform here: [https://synergysolver.vercel.app/signup](https://synergysolver.vercel.app/signup)

## Repository

GitHub Repo: [https://github.com/GaneshGupta3/synergysolver](https://github.com/GaneshGupta3/synergysolver)

---

## Features

- **User Authentication** – Secure login & registration for students and professionals.
- **Problem Listings** – Professionals can post real-world problems for students to solve.
- **Submission System** – Students can submit solutions for the listed problems.
- **Gamified Incentives** – Rewards, badges, or goodies for solving challenges.
- **Search & Filter** – Easily find problems based on category, difficulty, or tags.
- **Dashboard** – Personalized dashboard for tracking submissions, activity, and performance.
- **Communication** – Built-in commenting and status updates on problems.

---

## Tech Stack

### Frontend:
- React.js
- Redux Toolkit
- Tailwind CSS
- Vite

### Backend:
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT for authentication

---

## Installation

1. **Clone the repository**

```bash
git clone https://github.com/GaneshGupta3/synergysolver.git
cd synergysolver


2. **Frontend Setup**

```bash
cd client
npm install
npm run dev

3. **Backend Setup**

```bash
cd server
npm install
# Create a `.env` file and add the following variables:
# (Update the values as needed)
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=3000
# Start the backend server
npm run dev
