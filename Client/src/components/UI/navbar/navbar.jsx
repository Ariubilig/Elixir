import './navbar.css';

import { useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';

import useTheme from '../../../hooks/useTheme';
import AOS from 'aos';

import cart from '/cart.svg'
import dark from '/dark.svg'
import light from '/light.svg'


function Navbar() {
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    AOS.refresh();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (


    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-logo" data-aos="fade-down" data-aos-duration="1000">
          <NavLink to="/" onClick={scrollToTop}>ELIXIR KOMBINAT</NavLink>
        </div>

        <div className="navbar-actions">
          <Link className="cart-icon" to="/Cart" data-aos="fade-down" data-aos-duration="1500">
            <img src={cart} alt="Cart" />
          </Link>
          <button onClick={toggleTheme} className="theme-toggle-btn" data-aos="fade-down" data-aos-duration="2000">
            <img src={theme === 'dark' ? dark : light} alt="Toggle Theme" />
          </button>
        </div>
      </div>
      <hr className="navbar-divider" data-aos="fade-zoom-in"
          data-aos-easing="ease-in-back"
          data-aos-delay="100"
          data-aos-offset="0" data-aos-duration="1000"/>
    </nav>

    
  );
}

export default Navbar;
