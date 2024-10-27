import { useState } from 'react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';

const NavigationBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
      <div className="lg:flex lg:gap-x-12">
        <button onClick={toggleMenu} className="lg:hidden flex items-center">
          {isOpen ? <XIcon className="h-6 w-6 text-gray-900" /> : <MenuIcon className="h-6 w-6 text-gray-900" />}
        </button>
        <div className={`flex-col lg:flex-row lg:flex lg:gap-x-12 ${isOpen ? 'flex' : 'hidden'} lg:flex`}>
          <a href="#" className="text-sm font-semibold leading-6 text-gray-900 mb-2 lg:mb-0">Forecast</a>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
