import React from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  variant: string;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ variant = "main", children }) => {
  return (
    <div>
      <Header variant={variant} />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;