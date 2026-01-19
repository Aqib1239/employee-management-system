This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# Employee Management System (UI)

A role-based **Employee Management System** built using **Next.js (App Router)**.  
This project demonstrates core HR workflows such as attendance tracking, leave management, salary views, and role-based dashboards for **Admin**, **Team Lead**, and **Employee**.

The application focuses on **clean architecture, role-based navigation, reusable components, and responsive UI**, using mock data and client-side state management.

---

## 🚀 Features

### Authentication (UI Only)
- Login screen
- Role-based redirection
- Protected dashboard routes

### Role-Based Dashboards

#### Admin Dashboard
- Attendance overview
- Calendar view
- Employee management
- Leave approvals
- Salary overview

#### Team Lead Dashboard
- Team attendance
- Team calendar
- Team leave approvals
- Team members list

#### Employee Dashboard
- Personal attendance tracking
- Leave application & history
- Salary details
- Personal calendar view

---

## 🧱 Tech Stack

- **Next.js 14 (App Router)**
- **React**
- **Tailwind CSS**
- **Context API** (Auth management)
- **Mock data**

---

## 📂 Project Folder Structure

```bash

├── app/
│   ├── dashboard/
│   │   ├── admin/
│   │   │   ├── attendance/page.jsx
│   │   │   ├── calendar/page.jsx
│   │   │   ├── employee/page.jsx
│   │   │   ├── leave/page.jsx
│   │   │   ├── salary/page.jsx
│   │   │   ├── layout.jsx
│   │   │   └── page.jsx
│   │   │
│   │   ├── employee/
│   │   │   ├── attendance/page.jsx
│   │   │   ├── calendar/page.jsx
│   │   │   ├── leave/page.jsx
│   │   │   ├── salary/page.jsx
│   │   │   ├── layout.jsx
│   │   │   └── page.jsx
│   │   │
│   │   ├── team-lead/
│   │   │   ├── attendance/page.jsx
│   │   │   ├── calendar/page.jsx
│   │   │   ├── leave/page.jsx
│   │   │   ├── team/page.jsx
│   │   │   ├── layout.jsx
│   │   │   └── page.jsx
│
├── components/
│   ├── DataTable.jsx
│   ├── LoginForm.jsx
│   ├── PageHeader.jsx
│   ├── Sidebar.jsx
│   ├── StatCard.jsx
│   └── StatusBadge.jsx
│
├── context/
│   └── AuthContext.jsx
│
├── data/
│   └── mockData.js
│
├── lib/
│   └── utils.js
