import React, { useState, useEffect } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { RootState } from "../services/mystore";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../slices/auth";

const Layout: React.FC = () => {
  const { user: authUser } = useSelector((state: RootState) => state.user);
  const { name, email, isAuthenticated } = useSelector(
    (state: RootState) => state.user.user
  );

 

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userEmail = localStorage.getItem("loggedInUser");

  console.log("=======", authUser);

  const handleLogout = () => {
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.logo}>Film Fan</h1>
        <nav style={styles.nav} role="navigation" aria-label="Main Navigation">
          <Link to="/" style={styles.navLink} aria-label="Home">
            Home
          </Link>
          <Link
            to="/favorites"
            style={styles.navLink}
            aria-label="My Favorites"
          >
            My Favorites
          </Link>

          <>
            {isAuthenticated && <span style={styles.userEmail}>{email}</span>}
            <button onClick={handleLogout} style={styles.logoutButton}>
              Logout
            </button>
          </>
        </nav>
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
  container: {
    display: "flex",
    width: "100vw",
    flexDirection: "column",
    minHeight: "100vh",
    padding: 0,
    margin: 0,

    backgroundColor: "#f3f4f6",
  },
  header: {
    backgroundColor: "#1f2937",
    color: "#f9fafb",
    padding: "1rem 2rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "sticky",
    top: 0,
    zIndex: 1000,
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  logo: {
    fontSize: "1.8rem",
    fontFamily: '"Poppins", sans-serif',
    fontWeight: 600,
    margin: 0,
  },
  nav: {
    display: "flex",
    alignItems: "center",
    gap: "1.5rem",
  },
  navLink: {
    color: "#f9fafb",
    textDecoration: "none",
    fontSize: "1rem",
    fontFamily: '"Roboto", sans-serif',
    transition: "color 0.3s, transform 0.2s",
    padding: "0.5rem 1rem",
    borderRadius: "4px",
  },
  userEmail: {
    color: "#f9fafb",
    fontSize: "1rem",
    fontFamily: '"Roboto", sans-serif',
    fontWeight: "bold",
  },
  logoutButton: {
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "background-color 0.3s, transform 0.2s",
  },
  main: {
    flex: "1",
    padding: "2rem",
    fontFamily: '"Roboto", sans-serif',
    lineHeight: 1.6,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    backgroundColor: "#1f2937",
    color: "#f9fafb",
    textAlign: "center",
    padding: "1rem",
    fontSize: "0.9rem",
    fontFamily: '"Roboto", sans-serif',
    borderTop: "1px solid rgba(255, 255, 255, 0.1)",
    marginTop: "auto",
  },
};

export default Layout;
