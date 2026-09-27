# InternWave Web Development Internship - Project #2
## React Contact Cards Single Page Application (SPA)

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
├── main.tsx               # Application root mounting React to the DOM
└── index.css              # Global styles with Tailwind CSS
```

### Component Roles & Communication:

| Component | Role | Props Received | Handlers Triggered |
| :--- | :--- | :--- | :--- |
| **`App.jsx`** | Central State Manager | *None (Root)* | Manages `contacts` & `editingUser` in state |
| **`UserForm.jsx`** | Controlled Form Component | `onAddUser`, `editingUser`, `onUpdateUser`, `onCancelEdit` | Calls `onAddUser()` or `onUpdateUser()` |
| **`UserList.jsx`** | List & Filter Container | `users`, `onDeleteUser`, `onEditUser` | Passes individual item and callbacks to cards |
| **`ContactCard.jsx`** | Presentation Component | `user`, `onDelete`, `onEdit` | Calls `onDelete(id)` or `onEdit(user)` |

---

## 🔄 3. How Data Flows Between Components

```text
                           +----------------------+
                           |       App.jsx        |
                           |  (State: [contacts]) |
                           |  (State: editingUser)|
                           +----------+-----------+
                                      |
                 +--------------------+--------------------+
                 |                                         |
          Props: | onAddUser                        Props: | users (array)
                 | editingUser                             | onDeleteUser
                 | onUpdateUser                            | onEditUser
                 | onCancelEdit                            |
                 v                                         v
       +-------------------+                     +-------------------+
       |   UserForm.jsx    |                     |   UserList.jsx    |
       | (Controlled Form) |                     +---------+---------+
       +-------------------+                               |
                 | (Invokes onAddUser / onUpdateUser)      | Array.map(user => ...)
                 |                                         | Props: user, onDelete, onEdit
                 v                                         v
       [ Lifts State Up ]                       +--------------------+
                                                |  ContactCard.jsx   |
                                                +--------------------+
                                                           |
                                                           | (Invokes onDelete / onEdit)
                                                           v
                                                [ Lifts State Up ]
```

---

## 💡 4. React Concepts Explained (Evaluation Guide)

### 1. Functional Components
Modular JavaScript functions that take `props` as arguments and return JSX. They are concise, reusable, and leverage hooks for state.

### 2. `useState` Hook
A React Hook allowing functional components to retain state across renders:
```javascript
const [contacts, setContacts] = useState(SAMPLE_CONTACTS);
```
Updating state triggers a virtual DOM diff and re-renders only the changed parts of the UI.

### 3. Props & Lifting State Up
In React, data flows downward through props. When child components (`UserForm` or `ContactCard`) need to update central data in `App.jsx`, we pass callback functions as props. Invoking those callbacks sends data upwards (Lifting State Up).

### 4. Event Handling & `e.preventDefault()`
Submitting standard HTML forms triggers a browser page refresh. In an SPA, we call `e.preventDefault()` to stop the reload and update the React state in memory.

### 5. Dynamic Rendering with `.map()` and the `key` Prop
Lists are rendered dynamically using `Array.prototype.map()`. Each rendered card requires a unique `key` prop (`key={user.id}`) to allow React to track which items have been added, updated, or removed efficiently.

### 6. Reusable Components
Breaking down the interface into `UserForm`, `UserList`, and `ContactCard` promotes clean code, isolation of logic, and maintainability.

---

## 🚀 5. How to Run Locally

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Start Dev Server:**
   ```bash
   npm run dev
   ```

3. **Build for Production:**
   ```bash
   npm run build
   ```
