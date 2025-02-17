import React, { useState, useEffect } from 'react'
import { Outlet, Link, useNavigate } from 'react-router-dom'

const Layout: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userEmail, setUserEmail] = useState<string | null>(null)
    const navigate = useNavigate()
    useEffect(() => {
        const checkLoginStatus = () => {
            const user = localStorage.getItem('loggedInUser')
            setIsLoggedIn(!!user)
            setUserEmail(user)
        }

        checkLoginStatus()

        window.addEventListener('storage', checkLoginStatus)

        return () => {
            window.removeEventListener('storage', checkLoginStatus)
        }
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('loggedInUser')
        setIsLoggedIn(false)
        setUserEmail(null)
        navigate('/')
    }

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <h1 style={styles.logo}>Film Fan</h1>
                <nav
                    style={styles.nav}
                    role="navigation"
                    aria-label="Main Navigation"
                >
                    <Link to="/" style={styles.navLink} aria-label="Home">
                        Home
                    </Link>

                    {!isLoggedIn ? (
                        <>
                            <Link
                                to="/login"
                                style={styles.navLink}
                                aria-label="Login"
                            >
                                Login
                            </Link>
                            <Link
                                to="/registration"
                                style={styles.navLink}
                                aria-label="Registration"
                            >
                                Sign Up
                            </Link>
                        </>
                    ) : (
                        <>
                            <span style={styles.userEmail}>{userEmail}</span>
                            <button
                                onClick={handleLogout}
                                style={styles.logoutButton}
                            >
                                Logout
                            </button>
                        </>
                    )}
                </nav>
            </header>

            <main style={styles.main}>
                <Outlet />
            </main>

            <footer style={styles.footer}>
                <p>
                    &copy; {new Date().getFullYear()} Film Fan. All rights
                    reserved.
                </p>
            </footer>
        </div>
    )
}

const styles: { [key: string]: React.CSSProperties } = {

    container: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: '#f3f4f6',
    },
    header: {
        backgroundColor: '#1f2937',
        color: '#f9fafb',
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    logo: {
        fontSize: '1.8rem',
        fontFamily: '"Poppins", sans-serif',
        fontWeight: 600,
        margin: 0,
    },
    nav: {
        display: 'flex',
        alignItems: 'center',
        gap: '1.5rem',
    },
    navLink: {
        color: '#f9fafb',
        textDecoration: 'none',
        fontSize: '1rem',
        fontFamily: '"Roboto", sans-serif',
        transition: 'color 0.3s, transform 0.2s',
        padding: '0.5rem 1rem',
        borderRadius: '4px',
    },
    userEmail: {
        color: '#f9fafb',
        fontSize: '1rem',
        fontFamily: '"Roboto", sans-serif',
        fontWeight: 'bold',
    },
    logoutButton: {
        backgroundColor: '#dc3545',
        color: '#fff',
        border: 'none',
        padding: '0.5rem 1rem',
        borderRadius: '4px',
        fontSize: '1rem',
        cursor: 'pointer',
        transition: 'background-color 0.3s, transform 0.2s',
    },
    main: {
        flex: 1,
        padding: '2rem',
        fontFamily: '"Roboto", sans-serif',
        lineHeight: 1.6,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer: {
        backgroundColor: '#1f2937',
        color: '#f9fafb',
        textAlign: 'center',
        padding: '1rem',
        fontSize: '0.9rem',
        fontFamily: '"Roboto", sans-serif',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        marginTop: 'auto',
    },
}

  container: {
    width: "100vw",
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#f3f4f6',
  },
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
  main: {
    flex: 1,
    padding: '2rem',
    backgroundColor: '#f9fafb',
    fontFamily: '"Roboto", sans-serif',
    lineHeight: 1.6,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: '1200px', // Restrict content width
    margin: '0 auto', // Center the content
    wordWrap: 'break-word', // Break long words to avoid overflow
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


export default Layout
