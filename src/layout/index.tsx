import React from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  variant?: 'main' | 'landing';
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ variant = 'main', children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#1e1f22] dark:bg-white text-white dark:text-black">
      <Header variant={variant} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
