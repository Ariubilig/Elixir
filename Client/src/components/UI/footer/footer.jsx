import './footer.css';

// import { useEffect } from 'react';
// import AOS from 'aos';

function Footer() {

    // useEffect(() => {
    // AOS.refresh();
    // }, []);

    return (
        <footer className="footer">

            <hr className="footer-divider" />

            <div className="footer-content" >
                <div className="copyright-text">
                    © {new Date().getFullYear()} ELIXIR Records
                </div>
            </div>

        </footer>
    )
}

export default Footer;