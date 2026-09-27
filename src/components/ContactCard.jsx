import React, { useState } from 'react';
import { Mail, Phone, Briefcase, Trash2, Edit3, User, Check, X } from 'lucide-react';

/**
 * ============================================================================
 * REACT CONCEPT: Functional Component & Props (Child Component)
 * ============================================================================
 * ContactCard is a presentational functional component that displays an
 * individual user's contact information.
 *
 * PROPS EXPLANATION:
 * - `user`: The contact object { id, name, email, phone, role } passed down
 *   from parent (UserList).
 * - `onDelete`: A callback function passed down to communicate delete action
 *   back up to App.jsx (Lifting State Up).
 * - `onEdit`: A callback function passed down to send this user's data back to
 *   App.jsx so UserForm can enter edit mode.
 */
const ContactCard = ({ user, onDelete, onEdit }) => {
  // Local state to manage delete confirmation toggle (clean UX without window.confirm)
  const [isDeleting, setIsDeleting] = useState(false);

  // Destructure properties from user prop for clean code
  const { id, name, email, phone, role } = user;

  // Extract initials for the contact avatar
  const getInitials = (fullName) => {
    if (!fullName) return '?';
    const parts = fullName.trim().split(' ');
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  };

  /**
   * ============================================================================
   * REACT CONCEPT: Event Handling
   * ============================================================================
   * When the user confirms deletion, `handleConfirmDelete` invokes the `onDelete`
   * prop, passing the unique `id`. This informs the parent App component to
   * filter the main state array.
   */
  const handleConfirmDelete = () => {
    onDelete(id);
    setIsDeleting(false);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow p-5 flex flex-col justify-between">
      <div>
        {/* Top Header: Avatar, Name, Role & Action Buttons */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            {/* Initials Avatar */}
            <div className="w-11 h-11 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm shrink-0 select-none">
              {getInitials(name)}
            </div>

            {/* Name and Role */}
            <div className="min-w-0">
              <h3 className="font-semibold text-slate-900 text-base leading-snug truncate" title={name}>
                {name}
              </h3>
              <div className="mt-0.5 flex items-center gap-1.5">
                <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-100">
                  <Briefcase className="w-3 h-3" />
                  <span className="truncate max-w-[140px]">{role || 'General Contact'}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons: Edit and Delete */}
          <div className="shrink-0 flex items-center gap-1">
            {isDeleting ? (
              // Delete confirmation prompt
              <div className="flex items-center gap-1 bg-red-50 p-1 rounded-lg border border-red-200">
                <button
                  type="button"
                  onClick={handleConfirmDelete}
                  title="Confirm Delete"
                  className="px-2 py-1 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded transition-colors flex items-center gap-1"
                >
                  <Check className="w-3 h-3" />
                  Delete
                </button>
                <button
                  type="button"
                  onClick={() => setIsDeleting(false)}
                  title="Cancel"
                  className="p-1 text-xs font-medium text-slate-600 hover:bg-slate-200 rounded transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <>
                {/* Edit Button */}
                <button
                  type="button"
                  onClick={() => onEdit(user)}
                  title="Edit Contact"
                  className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                </button>

                {/* Delete Button */}
                <button
                  type="button"
                  onClick={() => setIsDeleting(true)}
                  title="Delete Contact"
                  className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-4 pt-3 border-t border-slate-100 space-y-2 text-sm text-slate-600">
          {/* Email */}
          <div className="flex items-center gap-2.5 truncate">
            <Mail className="w-4 h-4 text-slate-400 shrink-0" />
            <a
              href={`mailto:${email}`}
              className="truncate hover:text-blue-600 hover:underline transition-colors"
              title={email}
            >
              {email}
            </a>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-2.5 truncate">
            <Phone className="w-4 h-4 text-slate-400 shrink-0" />
            <a
              href={`tel:${phone}`}
              className="truncate hover:text-blue-600 hover:underline transition-colors"
              title={phone}
            >
              {phone}
            </a>
          </div>
        </div>
      </div>

      {/* Card Footer */}
      <div className="mt-4 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
          Active Card
        </span>
        <span className="text-[11px] text-slate-400">ID: {id.slice(-6)}</span>
      </div>
    </div>
  );
};

export default ContactCard;
