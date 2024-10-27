import React, { useState, useRef, useEffect } from 'react';

const CustomDropdown = ({ options, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onChange) {
      onChange(option); // Call the onChange callback with the selected option
    }
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block w-100" ref={dropdownRef}>
     <div
        className="flex justify-between items-center p-2 rounded cursor-pointer bg-white"
        onClick={toggleDropdown}
      >
        <span className='text-5xl font-semibold text-gray-800 pr-5'>{selectedOption ? selectedOption.label : 'Select an option'}</span>
        <span className="text-gray-600">{isOpen ? '▲' : '▼'}</span>
      </div>
      {isOpen && (
        <div className="absolute left-0 right-0 z-10 mt-1 border border-gray-300 bg-white rounded shadow-lg">
          {options.map((option, index) => (
            <div
              key={index}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
