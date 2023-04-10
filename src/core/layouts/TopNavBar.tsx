import { Routes } from '@blitzjs/next';
import { useMutation } from '@blitzjs/rpc';
import { useState, useEffect, Suspense } from 'react';
import logout from 'src/auth/mutations/logout';
import { useUserLogged } from 'src/users/hooks/isUserLogged';
import { useCurrentUser } from 'src/users/hooks/useCurrentUser';
import Button from '../components/Button';

interface TopNavBarProps {
  isLogged: boolean;
}


const NavRoutes = () => {
  const currentUser = useUserLogged();
  const [logoutMutation] = useMutation(logout);

  if(currentUser){
    return (
    <>
        <a href="/" className="navbar-menu-item">Home</a>
        <a href="/favorite-books" className="navbar-menu-item">My books</a>
        <Button
          onClick={async() => logoutMutation()}
        >
          Logout
        </Button>
    </>
    )
  }else{
    return (
      <>
          <a href="/" className="navbar-menu-item">Home</a>
          <a href="/auth/login" className="navbar-menu-item">Login</a>
          <a href="/auth/signup" className="navbar-menu-item">Signup</a>
      </>
      )

  }
}


const TopNavBar: React.FC<TopNavBarProps> = ({ isLogged }) => {
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    setShowNavbar(true);
  }, []);

  return (
    <div className={`topBar ${showNavbar ? 'show' : ''}`}>
      <nav className="navbar">
        <div className="navbar-logo">Books Library</div>
        <div className="navbar-menu">
         <Suspense>
            <NavRoutes/>
         </Suspense>
        </div>
      </nav>

      <style jsx>{`
        .topBar {
          position: fixed;
          z-index: 10;
          top: 0;
          left: 0;
          right: 0;
          background-color: var(--color-primary);
          color: #fff;
          padding: 15px var(--space-2xl);
          transition: transform 0.3s ease-in-out;
          transform: translateY(-100%);
        }

        .topBar.show {
          transform: translateY(0);
        }

        .navbar {
          display: flex;
          justify-content: space-between;
          flex-direction: row;
          align-items: center;
        }

        .navbar-logo {
          font-size: 24px;
          font-weight: bold;
        }

        .navbar-menu {
          font-size: var(--text-base);
          display: flex;
          flex-direction: row;
          column-gap: 20px;
          margin-top: 10px;
        }

        @media screen and (max-width: 768px) {
          .navbar-menu {
            flex-direction: row;
            margin-top: 0;
          }

          .navbar-menu-item {
            visibility: hidden;
          }
        }
      `}</style>
    </div>
  );
};

export default TopNavBar;

