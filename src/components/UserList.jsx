import React, { useState } from 'react';
import ContactCard from './ContactCard';
import { Users, Search, UserX } from 'lucide-react';

/**
 * ============================================================================
 * REACT CONCEPT: Component Composition, Props, and List Rendering
 * ============================================================================
 * UserList receives the contacts array and action handlers from App.jsx via props.
 * It renders a list of individual ContactCard components.
 *
 * PROPS EXPLANATION:
 * - `users`: Array of contact objects from central state in App.jsx.
 * - `onDeleteUser`: Callback function to delete a contact by ID.
 * - `onEditUser`: Callback function to load a contact into the edit form.
 */
const UserList = ({ users, onDeleteUser, onEditUser }) => {
  // Local state for the search filter input
  const [searchQuery, setSearchQuery] = useState('');

  /**
   * Filter contacts array based on search input (name, email, or role)
   */
  const filteredUsers = users.filter((user) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    return (
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      (user.role && user.role.toLowerCase().includes(query)) ||
      (user.phone && user.phone.includes(query))
    );
  });

  return (
    <div className="w-full">
      {/* Header and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-bold text-slate-900">Contact Cards</h2>
          <span className="px-2 py-0.5 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full">
            {filteredUsers.length}
          </span>
        </div>

        {/* Search Input */}
        {users.length > 0 && (
          <div className="relative w-full sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-3.5 h-3.5" />
            </div>
            <input
              type="text"
              placeholder="Search contacts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-white rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
            />
          </div>
        )}
      </div>

      {/* =========================================================================
       * REACT CONCEPT: Conditional Rendering (Empty States)
       * ========================================================================= */}
      {users.length === 0 ? (
        // Requirement 11: Exact clean empty state message
        <div className="text-center py-12 px-4 bg-white rounded-xl border border-slate-200 shadow-xs">
          <div className="w-12 h-12 mx-auto mb-3 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
            <UserX className="w-6 h-6" />
          </div>
          <h3 className="text-base font-semibold text-slate-800">No contacts yet</h3>
          <p className="text-sm text-slate-500 mt-1">
            Add your first contact using the form.
          </p>
        </div>
      ) : filteredUsers.length === 0 ? (
        // Search query returned no matches
        <div className="text-center py-10 px-4 bg-white rounded-xl border border-slate-200">
          <p className="text-sm text-slate-600 font-medium">
            No contacts match &ldquo;{searchQuery}&rdquo;
          </p>
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="mt-2 text-xs text-blue-600 hover:underline font-medium"
          >
            Clear Search
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/*
            REACT CONCEPT: List Rendering with Array.prototype.map() & Unique key Prop
            Each child in a list needs a unique 'key' prop to help React track DOM updates efficiently.
          */}
          {filteredUsers.map((user) => (
            <ContactCard
              key={user.id}
              user={user}
              onDelete={onDeleteUser}
              onEdit={onEditUser}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserList;
