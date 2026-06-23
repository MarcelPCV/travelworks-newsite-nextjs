import React, { useState, useCallback } from 'react';

interface CheckboxProps {
  id: string;
  label: string;
  name: string;
  checked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  error?: boolean;
  onChangeHandler?: (isChecked: boolean | null) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ 
    id, 
    label, 
    name, 
    checked = false, 
    indeterminate = false, 
    disabled = false, 
    error = false,
    onChangeHandler
}) => {
  const [isChecked, setIsChecked] = useState(checked);

  // Handlers remain the same for robust state control and accessibility
  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    
    const newCheckedState = event.target.checked ? true : false;
    setIsChecked(newCheckedState);

    if (onChangeHandler) {
      onChangeHandler(newCheckedState === false ? null : newCheckedState);
    }
  }, [disabled, onChangeHandler]);

  // Keydown handling remains crucial for accessibility
  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return;

    switch (event.key) {
      case ' ': 
      case 'Enter': 
        event.preventDefault();
        // Trigger the change event manually to update state
        handleChange(event as unknown as React.ChangeEvent<HTMLInputElement>);
        break;
    }
  }, [disabled, handleChange]);


  return (
    <div className={`flex items-start mb-4 ${error ? 'border border-red-500 p-2 rounded' : ''}`} role="group" aria-labelledby={`${id}-label`}>
      
      {/* Hidden Native Input */}
      <input
        type="checkbox"
        id={id}
        name={name}
        className={`sr-only ${disabled ? 'pointer-events-none' : ''}`}
        checked={isChecked}
        readOnly={disabled}
        onChange={handleChange}
        onKeyDown={handleKeyDown} 
        aria-describedby={`${id}-label`}
        disabled={disabled}
      />

      {/* Visible Label Container (Clickable Area) */}
      <label 
        htmlFor={id} 
        className="cursor-pointer flex items-center"
        role="checkbox"
        aria-checked={isChecked}
        aria-disabled={disabled}
        tabIndex={0} // Makes the label focusable for keyboard users
      >
        {/* The Box Container */}
        <div 
          className={`relative w-6 h-6 flex items-center justify-center cursor-pointer transition duration-200 
            border ${disabled ? 'border-gray-300 dark:border-gray-700' : 'border-gray-400'} rounded mr-2 
            ${disabled ? 'opacity-60 pointer-events-none' : 'hover:border-primary focus:ring-2 focus:ring-offset-2 focus:ring-primary'}
          `}
        >
           {/* The Actual Checkmark Indicator */}
           <div className={`checkbox-indicator transition duration-300 ${indeterminate ? 'scale-x-100' : ''}`}>

              {/* ⭐️ Check SVG (The checkmark itself) */}
             <svg 
                className={`absolute w-4 h-4 transition-all duration-200 ease-out transform ${isChecked ? 'opacity-100 scale-100' : 'opacity-0 scale-0'} text-primary`} 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round"
                strokeLinejoin="round"
             >
                 <path d="M20 6L9 17L4 12"></path>
             </svg>

            {/* Indeterminate Line */}
            <div className={`absolute h-1 bg-primary transition duration-300 ease-out ${indeterminate ? 'animate-draw' : 'scale-x-0'} rounded-full`}></div>
          </div>
        </div>

        {/* Label Content & Text */}
        <span 
          id={`${id}-label`} 
          className="flex flex-col text-base leading-none"
        >
          <span className="text-gray-900 dark:text-gray-200">
            {label}
            {error && <span className="ml-1 text-red-600">*</span>}
          </span>
        </span>
      </label>
    </div>
  );
};

export default Checkbox;
