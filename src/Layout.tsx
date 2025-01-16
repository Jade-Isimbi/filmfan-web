import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
  return (
    <div>
      <header style={styles.header}>
        <h1 style={styles.logo}>Film Fan</h1>
      </header>

      <main style={styles.main}>
        <Outlet />
      </main>

      <footer style={styles.footer}>
        <p>&copy; {new Date().getFullYear()} Film Fan. All rights reserved.</p>
      </footer>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  header: {
    backgroundColor: '#1f2937', 
    color: '#f9fafb', 
    padding: '1.5rem',
    textAlign: 'center',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  logo: {
    fontSize: '2rem',
    margin: 0,
    fontFamily: '"Poppins", sans-serif',
    fontWeight: 600,
  },
  nav: {
    marginTop: '1rem',
    display: 'flex',
    justifyContent: 'center',
    gap: '1.5rem',
  },
  link: {
    color: '#60a5fa', 
    fontSize: '1.1rem',
    textDecoration: 'none',
    fontWeight: 500,
    fontFamily: '"Roboto", sans-serif',
    transition: 'color 0.3s ease-in-out',
  },
  linkHover: {
    color: '#93c5fd', 
  },
  main: {
    padding: '2rem',
    minHeight: '80vh',
    backgroundColor: '#f3f4f6', 
    fontFamily: '"Roboto", sans-serif',
    lineHeight: 1.6,
  },
  footer: {
    backgroundColor: '#1f2937', 
    color: '#f9fafb',
    textAlign: 'center',
    padding: '1rem',
    fontSize: '0.9rem',
    fontFamily: '"Roboto", sans-serif',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
  },
};

export default Layout;
