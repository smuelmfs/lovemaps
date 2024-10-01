import React, { useState, useEffect, useRef } from 'react';

const CustomSelect = ({ options, onInputChange, onChange, placeholder }) => {
  const [inputValue, setInputValue] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const selectRef = useRef(null);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    onInputChange(value);
    if (value) {
      setIsDropdownOpen(true);  // Abre o dropdown se houver valor
    } else {
      setIsDropdownOpen(false); // Fecha o dropdown se o valor estiver vazio
    }
  };

  const handleOptionClick = (option) => {
    onChange(option);
    setInputValue(option.label);
    setIsDropdownOpen(false);
  };

  // Fechar o dropdown ao clicar fora dele
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={selectRef}>
      {/* Input do select */}
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onClick={() => setIsDropdownOpen(options.length > 0)} // Abre dropdown se houver opções
        placeholder={placeholder}
        className="block w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
      />

      {/* Dropdown de opções */}
      {isDropdownOpen && options.length > 0 && (
        <ul className="absolute w-full mt-2 bg-white border border-gray-300 rounded-lg max-h-60 overflow-y-auto z-10">
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleOptionClick(option)}
              className="cursor-pointer px-4 py-2 hover:bg-blue-500 hover:text-white"
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}

      {/* Mensagem se não houver resultados */}
      {isDropdownOpen && options.length === 0 && (
        <div className="absolute w-full mt-2 bg-white border border-gray-300 rounded-lg py-2 text-gray-500 text-center">
          Nenhum resultado encontrado
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
