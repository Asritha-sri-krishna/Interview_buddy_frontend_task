import React, { useState, memo } from 'react';
import { FaPencil } from 'react-icons/fa6';
import { useForm } from 'react-hook-form';

const EditableCard = memo(({ title, fields, onSave, data, hideTitle = false }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: data,
  });

  const onSubmit = (formData) => {
    onSave(formData);
    setIsEditing(false);
    reset(formData);
  };

  if (isEditing) {
    return (
      <form onSubmit={handleSubmit(onSubmit)} className="card">
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          {!hideTitle && <h3 className="text-lg sm:text-xl font-bold text-gray-800">{title}</h3>}
          <button
            type="button"
            onClick={() => {
              setIsEditing(false);
              reset(data);
            }}
            className="text-gray-500 hover:text-gray-700 text-xl ml-auto"
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6">
          {fields.map((field) => (
            <div key={field.name} className={field.fullWidth ? 'md:col-span-2' : ''}>
              <label className="label-text text-sm">{field.label}</label>
              {field.type === 'textarea' ? (
                <textarea
                  {...register(field.name)}
                  className="input-field resize-none text-sm"
                  rows="3"
                  placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
                />
              ) : field.type === 'select' ? (
                <select
                  {...register(field.name)}
                  className="input-field text-sm"
                >
                  <option value="">Select {field.label}</option>
                  {field.options?.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type || 'text'}
                  {...register(field.name)}
                  className="input-field text-sm"
                  placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
                />
              )}
              {errors[field.name] && (
                <span className="error-text text-xs">{errors[field.name]?.message}</span>
              )}
            </div>
          ))}
        </div>

        <div className="flex gap-2 sm:gap-3 justify-end pt-4 sm:pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={() => {
              setIsEditing(false);
              reset(data);
            }}
            className="btn-secondary text-sm"
          >
            Cancel
          </button>
          <button type="submit" className="btn-primary text-sm">
            Save
          </button>
        </div>
      </form>
    );
  }

  return (
    <div className="card">
      <div className="flex justify-between items-start mb-4 sm:mb-6">
        {!hideTitle && <h3 className="text-lg sm:text-xl font-bold text-gray-800">{title}</h3>}
        <button
          onClick={() => setIsEditing(true)}
          className="text-purple-600 hover:text-purple-800 ml-auto p-2 hover:bg-purple-50 rounded transition-colors"
          title="Edit"
        >
          <FaPencil size={16} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
        {fields.map((field) => (
          <div key={field.name} className={field.fullWidth ? 'md:col-span-2' : ''}>
            <p className="text-xs text-gray-500 font-semibold uppercase mb-1 sm:mb-2">{field.label}</p>
            <p className="text-gray-800 text-sm sm:text-base">
              {data[field.name] ? (
                field.type === 'textarea' ? (
                  <div className="whitespace-pre-wrap bg-gray-50 p-2 sm:p-3 rounded text-sm">
                    {data[field.name]}
                  </div>
                ) : (
                  data[field.name]
                )
              ) : (
                <span className="text-gray-400 italic text-sm">Not provided</span>
              )}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
});

EditableCard.displayName = 'EditableCard';

export default EditableCard;