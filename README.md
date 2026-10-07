# InternWave Web Development  - Project #2
 React Contact Cards Single Page Application (SPA)

> **Student Project:** InternWave Web Development Project 2  
> **Topic:** React.js, Functional Components, Hooks, State & Props Management  
> **Type:** Frontend Single Page Application (SPA)

---

## 📌 1. Project Overview

The **React Contact Cards SPA** is a clean, responsive single-page web application designed to dynamically create, display, edit, and delete contact cards without full page reloads.

Built with functional React components, this project serves as a clear demonstration of fundamental React concepts:
- **Single Page Application (SPA):** Instant updates with zero page reloads.
- **Dynamic Card Creation:** Cards are added dynamically to the UI upon form submission.
- **Edit & Delete:** Full CRUD operations completely on the frontend.
- **Client-Side Form Validation:** Enforces required fields, email formatting, and phone length.
- **Separation of Concerns:** Components are structured logically in `src/components/`.

---

## 📁 2. Component Architecture

```text
src/
├── components/
│   ├── UserForm.jsx       # Controlled form for adding & editing contacts with validation
│   ├── UserList.jsx       # Directory list component with search & dynamic card rendering
│   └── ContactCard.jsx    # Individual reusable contact card with Edit & Delete actions
├── App.jsx                # Top-level parent component managing central state
├── main.jsx               # Application root mounting React to the DOM
└── index.css              # Global styles with Tailwind CSS
```

