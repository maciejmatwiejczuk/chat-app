# chat-app

**Live demo**: https://chat-app-frontend-l6l1.onrender.com

A Messenger-like real-time chat application written in TypeScript. The app allows users to add contacts and send private messages.

![chat-example](https://github.com/user-attachments/assets/483a3ff1-24b7-4839-97d0-534e3979dbde)

---

## 🚀 Technologies

This project was built using:

### 🖥️ Frontend

- React 18
- React Router
- React Hook Form
- TanStack Query

### ⚙️ Backend

- Node.js 21
- Express.js
- Socket.IO
- Kysely

### 🗄️ Database

- PostgreSQL 16

---

## ✨ Features

- Instant real-time messaging via WebSockets
- Contact list management with friend invitations
- REST API for data persistence and retrieval
- Secure authentication using session-based login

---

## ❗️ Requirements

To run this project you need to have Node.js and PostgreSQL installed on your machine.

---

## 🛠️ Setup

Follow these steps to run the project locally:

1. **Clone the repository**

```sh
git clone git@github.com:maciejmatwiejczuk/chat-app.git
```

2. **Install dependencies**

```sh
npm install
```

3. **Set environmental variables** of frontend and backend projects. They're listed in `.env.example` files. You need to create `.env` files based on them.

4. **Build common components**

```sh
cd _common
npm run build
```

5. **Run database migrations**

```sh
cd ../apps/backend
npx kysely migrate:latest
```

6. **Start development servers**

```sh
cd ../..
npm run dev:frontend
npm run dev:backend
```
