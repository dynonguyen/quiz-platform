<h1 align="center">Realtime Quiz-based Learning Platform</h1>

## Thông tin nhóm

- 1712149 - Trần Minh Tân
- 18120634 - Nguyễn Lê Anh Tuấn
- 18120644 - Nguyễn Cát Tường

---

## 💻 Công nghệ xây dựng

- Backend, Database

  - Nodejs, ExpressJS, RESTFul APIs (https://expressjs.com/)
  - MongoDB, MongooseJS (https://mongoosejs.com/)
  - JWT (JSON Web Token) (https://www.npmjs.com/package/jsonwebtoken)
  - Passport (https://www.passportjs.org/)
  - Realtime - Socket.io (https://socket.io/)

- Frontend

  - ReactJS, React Hook (Version 18)
  - React-router-dom v6.3 (https://reactrouter.com/en/main)
  - UI Library: [Material UI v5](https://mui.com/) + [@cads-ui/core](https://www.npmjs.com/package/@cads-ui/core) + [@cads-ui/x](https://www.npmjs.com/package/@cads-ui/x)
  - Axios RESTFul API, useSWR (https://www.npmjs.com/package/axios), (https://swr.vercel.app/docs/getting-started)
  - Socket.io client (https://socket.io/)
  - React Hook Form + Yup. (https://react-hook-form.com/)
  - Redux, react-redux, reudx-toolkit. (https://redux-toolkit.js.org/)
  - Google Identify Service (https://developers.google.com/identity/gsi/web/guides/overview)
  - Icon - Iconify + MUI icon (https://icon-sets.iconify.design/)
  - React-toastify (https://www.npmjs.com/package/react-toastify)
  - Build tool: ViteJS (https://vitejs.dev/)

- Storage, Hosting, Cloud:

  - Mongodb Atlas.
  - Vercel, Railway Hosting.

- IDE: Vscode, Prettier extension

---

## 🛠 Bắt đầu dự án

### ❗ Yêu cầu công nghệ

- [MongoDB Server](https://www.mongodb.com/)
- [NodeJS >= 16, Npm (Node Package Manager)](https://nodejs.org/en/)
- [Git, Github](https://git-scm.com/)

### ⚙ Cài đặt

1. Clone project

```
  git clone https://github.com/TuanNguyen2504/quiz-platform
```

2. Cài đặt thư viện ở Backend, Frontend

```sh
  cd backend
  yarn install

  cd frontend
  yarn install
```

3. Thay thế file .local.env thành file .env và cập nhật thông tin.

4. Chạy project

```sh
  cd backend
  yarn dev
```

```sh
  cd frontend
  yarn dev
```
