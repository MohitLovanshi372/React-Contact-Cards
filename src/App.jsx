import React, { useState } from 'react';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import {
  Code,
  Layers,
  Sparkles,
  ArrowRightLeft,
  MousePointerClick,
  Boxes,
  GraduationCap,
} from 'lucide-react';

/**
 * ============================================================================
 * DEMO DATA (Clearly marked sample contacts using example.com domains)
 * ============================================================================
 * Initial contacts provided so the application starts with sample cards to view.
 * All emails use the RFC 2606 reserved '.example.com' domain.
 */
const SAMPLE_CONTACTS = [
  {
    id: 'demo-1',
    name: 'Sample User: Alex Morgan',
    email: 'alex.demo@example.com',
    phone: '+1 (555) 012-3456',
    role: 'Frontend Developer',
  },
  {
    id: 'demo-2',
    name: 'Sample User: Jordan Lee',
    email: 'jordan.demo@example.com',
    phone: '+1 (555) 014-9920',
    role: 'UI/UX Designer',
  },
  {
    id: 'demo-3',
    name: 'Sample User: Taylor Smith',
    email: 'taylor.demo@example.com',
    phone: '+1 (555) 018-7744',
    role: 'Web Dev Intern',
  },
];

/**
 * ============================================================================
 * REACT CONCEPT: App Component & Central State Management
 * ============================================================================
 * In React, App is the parent component that coordinates child components.
 *
 * 1. useState:
 *    - `contacts`: Stores the array of contact objects in memory.
 *    - `editingUser`: Stores the contact currently being edited (or null).
 *
 * 2. Props:
 *    - Data and functions are passed down from App to UserForm and UserList.
 *
 * 3. Component Communication (Lifting State Up):
 *    - Sibling components (UserForm and UserList) cannot talk directly to each
 *      other. App holds the state so changes made in UserForm or UserList
 *      are reflected throughout the app.
 */
function App() {
  // Central state holding the list of contacts
  const [contacts, setContacts] = useState(SAMPLE_CONTACTS);

  // State to track which contact is currently being edited (null when adding new)
  const [editingUser, setEditingUser] = useState(null);

  /**
   * ==========================================================================
   * REACT CONCEPT: Event Handling & Immutable State - Add Contact
   * ==========================================================================
   * Adds a newly created contact to state without mutating the original array.
   * We spread `prev` contacts and prepend the new contact.
   */
  const handleAddContact = (newContact) => {
    setContacts((prev) => [newContact, ...prev]);
  };

  /**
   * ==========================================================================
   * REACT CONCEPT: Event Handling & Array.prototype.filter() - Delete Contact
   * ==========================================================================
   * Removes a contact by filtering out the matching ID.
   * If the deleted contact was currently being edited, cancel edit mode.
   */
  const handleDeleteContact = (contactId) => {
    setContacts((prev) => prev.filter((contact) => contact.id !== contactId));
    if (editingUser && editingUser.id === contactId) {
      setEditingUser(null);
    }
  };

  /**
   * ==========================================================================
   * REACT CONCEPT: Edit Flow - Start Editing
   * ==========================================================================
   * Sets the `editingUser` in state so `UserForm` populates with its details.
   */
  const handleStartEdit = (contact) => {
    setEditingUser(contact);
    // Smooth scroll to form on mobile devices
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /**
   * ==========================================================================
   * REACT CONCEPT: Event Handling & Array.prototype.map() - Update Contact
   * ==========================================================================
   * Replaces the edited contact in state using `.map()`.
   */
  const handleUpdateContact = (updatedContact) => {
    setContacts((prev) =>
      prev.map((c) => (c.id === updatedContact.id ? updatedContact : c))
    );
    setEditingUser(null);
  };

  /**
   * Cancel Edit Mode
   */
  const handleCancelEdit = () => {
    setEditingUser(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      {/* =====================================================================
       * HEADER SECTION
       * Clean, focused branding for InternWave Web Dev Project #2
       * ===================================================================== */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-xs">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-slate-900 text-lg leading-tight">
                  React Contact Cards SPA
                </h1>
                <span className="hidden sm:inline-flex text-[11px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  InternWave Project #2
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Single Page Application built with React Functional Components & Props
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
              {contacts.length} {contacts.length === 1 ? 'Contact' : 'Contacts'}
            </span>
          </div>
        </div>
      </header>

      {/* =====================================================================
       * MAIN CONTENT (Responsive Two-Column Layout)
       * ===================================================================== */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex-1 w-full space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT: User Form Component (Receives callbacks and state via props) */}
          <div className="lg:col-span-5">
            <UserForm
              onAddUser={handleAddContact}
              editingUser={editingUser}
              onUpdateUser={handleUpdateContact}
              onCancelEdit={handleCancelEdit}
            />
          </div>

          {/* RIGHT: User List Component (Receives contacts array & handlers via props) */}
          <div className="lg:col-span-7">
            <UserList
              users={contacts}
              onDeleteUser={handleDeleteContact}
              onEditUser={handleStartEdit}
            />
          </div>
        </div>

        {/* =====================================================================
         * REACT CONCEPTS USED SECTION
         * Clearly demonstrates all 6 core React concepts required for evaluation
         * ===================================================================== */}
        <section className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-100">
            <GraduationCap className="w-5 h-5 text-blue-600" />
            <h2 className="text-base font-bold text-slate-900">
              React Concepts Demonstrated in this Project
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Concept 1 */}
            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-2 font-semibold text-xs text-slate-900 mb-1">
                <Code className="w-4 h-4 text-blue-600" />
                <span>1. Functional Components</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Modular JavaScript functions (<code className="text-blue-700">App</code>,{' '}
                <code className="text-blue-700">UserForm</code>,{' '}
                <code className="text-blue-700">UserList</code>,{' '}
                <code className="text-blue-700">ContactCard</code>) returning JSX to describe the UI.
              </p>
            </div>

            {/* Concept 2 */}
            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-2 font-semibold text-xs text-slate-900 mb-1">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>2. useState Hook</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Manages dynamic state in memory: central <code className="text-blue-700">contacts</code>{' '}
                in App, and controlled input values in UserForm.
              </p>
            </div>

            {/* Concept 3 */}
            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-2 font-semibold text-xs text-slate-900 mb-1">
                <ArrowRightLeft className="w-4 h-4 text-purple-600" />
                <span>3. Props & Lifting State Up</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Passes contacts array down to UserList, and callback functions down to UserForm/Card
                to communicate events back up to App.
              </p>
            </div>

            {/* Concept 4 */}
            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-2 font-semibold text-xs text-slate-900 mb-1">
                <MousePointerClick className="w-4 h-4 text-amber-600" />
                <span>4. Event Handling</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Uses <code className="text-blue-700">onSubmit</code> with{' '}
                <code className="text-blue-700">e.preventDefault()</code> to avoid page reloads, and{' '}
                <code className="text-blue-700">onClick</code> for delete/edit actions.
              </p>
            </div>

            {/* Concept 5 */}
            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-2 font-semibold text-xs text-slate-900 mb-1">
                <Layers className="w-4 h-4 text-rose-600" />
                <span>5. Dynamic Rendering</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Iterates over contacts using <code className="text-blue-700">.map()</code> with unique{' '}
                <code className="text-blue-700">key=&#123;user.id&#125;</code> and conditional empty states.
              </p>
            </div>

            {/* Concept 6 */}
            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-2 font-semibold text-xs text-slate-900 mb-1">
                <Boxes className="w-4 h-4 text-indigo-600" />
                <span>6. Reusable Components</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Separation of concerns across dedicated files inside <code className="text-blue-700">src/components/</code>{' '}
                for high reusability and maintainability.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* =====================================================================
       * FOOTER
       * ===================================================================== */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-4 text-center text-xs text-slate-500">
        InternWave Web Development Internship • Project #2: React Contact Cards SPA
      </footer>
    </div>
  );
}

export default App;
