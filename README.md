# 📚 Book Review Website

A simple book review website where **only the admin can upload books**, and **users can submit reviews and interact via comments**.

---

## 🚀 Features
- **Admin Uploads Books** (Only admin can add books)
- **Users Can Review Books**
- **Users Can Comment on Reviews**
- **Dynamic Backend (Node.js + Express + JSON Storage)**
- **Frontend to Display Books and Reviews**

---

## 🛠 Tech Stack
- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **Database:** JSON File (Simple Storage)

---

## 📌 Setup & Installation

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/your-repo/book-review-site.git
cd book-review-site
```

### **2️⃣ Install Dependencies**
```sh
npm install
```

### **3️⃣ Run the Server**
```sh
node server.js
```
If successful, you should see:
```
Server running on http://localhost:3000
```

### **4️⃣ Open the Website**
- Open **`public/index.html`** in your browser.
- OR Use **Live Server** (VS Code Extension) to run it.

---

## 🔑 Admin Secret Key (For Uploading Books)
Only the **admin** can upload books using a secret key.

- **Set the secret key** in `server.js`:
  ```js
  const ADMIN_SECRET_KEY = "your_secret_key_here";
  ```
- When adding a book, you must enter this key to verify admin access.

---

## 📖 API Endpoints

### **📚 Get All Books**
```http
GET /books
```
_Response:_
```json
[
  {
    "id": 1710692467834,
    "book": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "description": "A novel set in the Jazz Age...",
    "coverImage": "great-gatsby.jpg"
  }
]
```

### **📝 Add a New Review**
```http
POST /reviews
```
**Body:**
```json
{
  "book": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "review": "Amazing book!",
  "rating": 5
}
```

### **❌ Delete a Review**
```http
DELETE /reviews/:id
```

---

## ⚡ Deployment
To make the site live, deploy:
- **Frontend:** Vercel, Netlify
- **Backend:** Render, Railway, or VPS

---

## 🛠 Required VS Code Extensions
- **Live Server** (for frontend testing)
- **REST Client** (for API testing)
- **Prettier** (for clean code formatting)

---

## 💡 Future Improvements
- User authentication (Login system)
- Database integration (MongoDB, Firebase, etc.)
- Like/dislike feature for reviews

---

## 📬 Need Help?
Feel free to raise an issue or contact me! 😊

