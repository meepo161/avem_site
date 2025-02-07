import React from 'react';
import Logo from './Logo';
import MainMenu from './MainMenu';
import SearchButton from './SearchButton';
import ContactButton from './ContactButton';
import MobileMenuButton from './MobileMenuButton';

const Header: React.FC = () => {
  return (
    <header className="fixed w-full bg-white shadow-md z-50">
      <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Logo />
        <div className="hidden md:block">
          <MainMenu />
        </div>
        <div className="flex items-center gap-4">
          <SearchButton />
          <ContactButton />
          <div className="md:hidden">
            <MobileMenuButton />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;