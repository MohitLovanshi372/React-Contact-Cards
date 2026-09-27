import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, Briefcase, Plus, Check, X, AlertCircle } from 'lucide-react';

/**
 * ============================================================================
 * REACT CONCEPT: Controlled Form Component & Component Communication
 * ============================================================================
 * UserForm manages user input in React state rather than letting the DOM
 * handle it (Controlled Component).
 *
 * PROPS EXPLANATION:
 * - `onAddUser`: Function prop received from App.jsx to add a new contact.
 * - `editingUser`: An existing contact object when in edit mode, or null.
 * - `onUpdateUser`: Function prop received from App.jsx to save edited changes.
 * - `onCancelEdit`: Function prop received from App.jsx to cancel edit mode.
 *
 * COMPONENT COMMUNICATION:
 * Data flows downward via props (e.g. `editingUser`).
 * Events flow upward by calling callbacks (`onAddUser`, `onUpdateUser`).
 */
const UserForm = ({ onAddUser, editingUser, onUpdateUser, onCancelEdit }) => {
  /**
   * ==========================================================================
   * REACT CONCEPT: useState Hook
   * ==========================================================================
   * We declare local state variables for form inputs and validation errors.
   * `useState` returns the current state value and an updater function.
   */
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('');
  const [errors, setErrors] = useState({});

  /**
   * When `editingUser` prop changes (user clicks "Edit" on a card),
   * pre-populate the form with that contact's data, or clear it if null.
   */
  useEffect(() => {
    if (editingUser) {
      setName(editingUser.name || '');
      setEmail(editingUser.email || '');
      setPhone(editingUser.phone || '');
      setRole(editingUser.role || '');
      setErrors({});
    } else {
      setName('');
      setEmail('');
      setPhone('');
      setRole('');
      setErrors({});
    }
  }, [editingUser]);

  /**
   * Basic Form Validation Logic
   * Ensures required fields are provided and correctly formatted.
   */
  const validateForm = () => {
    const newErrors = {};

    // 1. Name validation
    if (!name.trim()) {
      newErrors.name = 'Full Name is required.';
    } else if (name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters.';
    }

    // 2. Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = 'Email Address is required.';
    } else if (!emailPattern.test(email.trim())) {
      newErrors.email = 'Please enter a valid email format (e.g. user@example.com).';
    }

    // 3. Phone validation
    const cleanPhoneDigits = phone.replace(/[^0-9]/g, '');
    if (!phone.trim()) {
      newErrors.phone = 'Phone Number is required.';
    } else if (cleanPhoneDigits.length < 7 || cleanPhoneDigits.length > 15) {
      newErrors.phone = 'Phone number must have between 7 and 15 digits.';
    }

    return newErrors;
  };

  /**
   * ==========================================================================
   * REACT CONCEPT: Event Handling & e.preventDefault()
   * ==========================================================================
   * Forms reload the page by default upon submission.
   * In a React Single Page Application (SPA), `e.preventDefault()` halts the
   * browser refresh, allowing React to update state in memory seamlessly.
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Clear validation errors
    setErrors({});

    if (editingUser) {
      // Edit Mode: Send updated user object back to App.jsx
      onUpdateUser({
        ...editingUser,
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        role: role.trim() || 'General Contact',
      });
    } else {
      // Create Mode: Construct new contact object with a unique id
      const newContact = {
        id: `contact-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        role: role.trim() || 'General Contact',
      };

      // Lift state up to App.jsx
      onAddUser(newContact);

      // Reset form fields
      setName('');
      setEmail('');
      setPhone('');
      setRole('');
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6">
      {/* Form Header */}
      <div className="flex items-center justify-between pb-3 mb-5 border-b border-slate-100">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            {editingUser ? 'Edit Contact' : 'Add New Contact'}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {editingUser
              ? 'Update the contact information below'
              : 'Fill in details to dynamically create a new card'}
          </p>
        </div>

        {/* Cancel Edit Button */}
        {editingUser && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-2.5 py-1.5 rounded-lg transition-colors"
          >
            <X className="w-3.5 h-3.5" />
            Cancel
          </button>
        )}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {/* Field 1: Full Name */}
        <div>
          <label htmlFor="name-input" className="block text-xs font-semibold text-slate-700 mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <User className="w-4 h-4" />
            </div>
            <input
              id="name-input"
              type="text"
              placeholder="e.g. Alex Morgan"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors((prev) => ({ ...prev, name: null }));
              }}
              className={`w-full pl-9 pr-3 py-2 text-sm rounded-lg border ${
                errors.name ? 'border-red-400 bg-red-50/20' : 'border-slate-200 bg-slate-50/50'
              } focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500 outline-none transition-all`}
            />
          </div>
          {errors.name && (
            <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
              <AlertCircle className="w-3 h-3 shrink-0" />
              {errors.name}
            </p>
          )}
        </div>

        {/* Field 2: Email */}
        <div>
          <label htmlFor="email-input" className="block text-xs font-semibold text-slate-700 mb-1">
            Email Address <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Mail className="w-4 h-4" />
            </div>
            <input
              id="email-input"
              type="email"
              placeholder="e.g. alex@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors((prev) => ({ ...prev, email: null }));
              }}
              className={`w-full pl-9 pr-3 py-2 text-sm rounded-lg border ${
                errors.email ? 'border-red-400 bg-red-50/20' : 'border-slate-200 bg-slate-50/50'
              } focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500 outline-none transition-all`}
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
              <AlertCircle className="w-3 h-3 shrink-0" />
              {errors.email}
            </p>
          )}
        </div>

        {/* Field 3: Phone Number */}
        <div>
          <label htmlFor="phone-input" className="block text-xs font-semibold text-slate-700 mb-1">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Phone className="w-4 h-4" />
            </div>
            <input
              id="phone-input"
              type="tel"
              placeholder="e.g. +1 (555) 234-5678"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                if (errors.phone) setErrors((prev) => ({ ...prev, phone: null }));
              }}
              className={`w-full pl-9 pr-3 py-2 text-sm rounded-lg border ${
                errors.phone ? 'border-red-400 bg-red-50/20' : 'border-slate-200 bg-slate-50/50'
              } focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500 outline-none transition-all`}
            />
          </div>
          {errors.phone && (
            <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
              <AlertCircle className="w-3 h-3 shrink-0" />
              {errors.phone}
            </p>
          )}
        </div>

        {/* Field 4: Role / Profile (Optional) */}
        <div>
          <label htmlFor="role-input" className="block text-xs font-semibold text-slate-700 mb-1">
            Role / Profile <span className="text-slate-400 font-normal">(Optional)</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Briefcase className="w-4 h-4" />
            </div>
            <input
              id="role-input"
              type="text"
              placeholder="e.g. Frontend Developer, Designer"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-200 bg-slate-50/50 focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500 outline-none transition-all"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex items-center gap-2">
          <button
            type="submit"
            className="flex-1 py-2 px-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium text-sm rounded-lg shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            {editingUser ? (
              <>
                <Check className="w-4 h-4" />
                Update Contact
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                Create Contact Card
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
