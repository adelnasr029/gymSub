# GymSubs
![subs-manage](https://github.com/user-attachments/assets/770be37f-caec-448d-8622-a390db89995f)

GymSubs is a subscription management system designed for gym owners to manage client subscriptions efficiently. It allows gym owners to track subscription statuses (active, expired, pending) and notify clients about upcoming subscription expirations or due dates. The system is built using **Node.js**, **Express.js**, **MongoDB**, and **React**.

---

## Features

### For Gym Owners:
- **Manage Subscriptions**: Add, update, and delete client subscriptions.
- **Track Subscription Status**: View subscriptions by status (active, expired, pending).
- **Notifications**: Get reminders for upcoming subscription expirations.
- **Client Management**: Add and manage client details (name, phone, email, etc.).

### For Clients:
- **Subscription Status**: View the status of their subscription (active, expired, pending).
- **Notifications**: Receive notifications when their subscription is about to expire.
- **Renew Subscriptions**: Easily renew expired subscriptions.

---

## Technologies Used

### Backend:
- **Node.js**: JavaScript runtime for building the server.
- **Express.js**: Framework for building RESTful APIs.
- **MongoDB**: NoSQL database for storing client and subscription data.
- **Mongoose**: MongoDB object modeling for Node.js.
- **Cloudinary**: For handling image uploads (e.g., client profile pictures).

### Frontend:
- **React**: JavaScript library for building the user interface.
- **React Router**: For handling client-side routing.
- **Material-UI or Tailwind CSS**: For styling the UI.

### Additional Tools:
- **passport**: For user authentication and authorization.

### 🛠️ Optimization

This project underwent refactoring to improve performance, remove redundant code, and enhance styles and design. Below are the key changes:

#### **1. Component Refactoring**
- **Improved Performance:** Used `React.memo` and optimized `useEffect` dependencies to reduce unnecessary re-renders.
- **Logic Simplification:** Extracted shared logic into custom hooks and reusable utilities.
- **Removed Redundancy:** Eliminated unused states, props, and repetitive code.

#### **2. Style Enhancements**
- **Design Improvements:** Upgraded styles using **CSS Modules** or **Tailwind CSS** for better visuals and scalability.
- **Responsive UI:** Ensured layouts are fully responsive with optimized media queries.
- **Aesthetics:** Added smooth animations with **Framer Motion** and enhanced accessibility.

#### **3. Performance Boost**
- **Code Splitting:** Integrated `React.lazy` and `Suspense` for on-demand loading.
- **State Optimization:** Used `useReducer` for complex state management.
- **Asset Optimization:** Minified images, used `WebP`, and implemented lazy loading.

#### **4. Code Cleanup**
- **Readability:** Refactored large components into smaller, reusable ones.
- **Formatting:** Enforced consistent styles with **ESLint** and **Prettier**.

#### **5. Improved User Interaction**
- Enhanced forms with validation (e.g., `Formik`, `Yup`) and added clear feedback mechanisms (spinners, tooltips, and success/error messages).

These updates resulted in better performance, maintainability, and an improved user experience.
 
