# Code4City Backend

Backend API for a crowdsourced civic issue reporting and resolution system.

## 🚀 Features

- Create, read, update, delete (CRUD) complaints
- Upload multiple images + video per complaint (via Cloudinary)
- Filter complaints by date, status, category, location
- Admin operations: view all, delete, update status, statistics
- Authentication & authorization (for users & admins)
- Deployment-ready for cloud (Render, etc.)

## 🧰 Tech Stack

| Layer                 | Technology               |
| --------------------- | ------------------------ |
| Server                | Node.js, Express         |
| Database              | MongoDB (Atlas)          |
| File Upload & Storage | Multer, Cloudinary       |
| Authentication        | JWT / Express middleware |
| Deployment            | Render                   |

## 📁 Project Structure

project-root/
|
│ ├── config/
│ │ └── db.js (or connectDatabase.js)
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ └── index.js (entry point)
├── .env
├── package.json
└── README.md

## 🛠️ Setup & Installation

1. Clone the repo:

```
 git clone https://github.com/Himanshu4313/Code4City-Backend.git
 cd Code4City-Backend

```

2. install dependency:

```
npm install

```

3. setup enviroment variables

   ```
    PORT=3000
   SECRET=SECRET
   FRONTEND_CLIENT_URL=
   MONGODB_URI=<your uri>
   CLOUDINARY_CLOUD_NAME=
   CLOUDINARY_API_KEY=
   CLOUDINARY_SECRET_KEY=
   CLOUDINARY_URL=cloudinary:

   ```

4. Locally run

```
 npm run dev
# or
npm start
``

## live server link
```

https://code4city.onrender.com

```

```
