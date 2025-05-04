function Footer() {

    return (

        <footer className="py-12 px-8">
        <div className="header-line-container">
          <div className="header-line"></div>
        </div>
        <div className="max-w-6xl mx-auto flex flex-col items-center justify-center width-90">
          <div className="flex space-x-6 mb-4">
            <a href="https://www.instagram.com/elixir_recordsofficial" target="_blank" rel="noreferrer" className="hover:opacity-70 cursor-pointer relative" style={{width: '24px', height: '24px'}}>
              <img 
                src={LightInstaSvg} 
                alt="Instagram" 
                width="24" 
                height="24" 
                style={{
                  opacity: isDarkMode ? 0 : 1,
                  transition: 'opacity 0.5s ease',
                  position: 'absolute',
                  top: 0,
                  left: 0
                }} 
              />
              <img 
                src={DarkInstaSvg} 
                alt="Instagram" 
                width="24" 
                height="24" 
                style={{
                  opacity: isDarkMode ? 1 : 0,
                  transition: 'opacity 0.5s ease',
                  position: 'absolute',
                  top: 0,
                  left: 0
                }} 
              />
            </a>
            <a href="tel:+976########" className="hover:opacity-70 cursor-pointer relative" style={{width: '24px', height: '24px'}}>
              <img 
                src={LightPhoneSvg} 
                alt="Phone" 
                width="24" 
                height="24" 
                style={{
                  opacity: isDarkMode ? 0 : 1,
                  transition: 'opacity 0.5s ease',
                  position: 'absolute',
                  top: 0,
                  left: 0
                }} 
              />
              <img 
                src={DarkPhoneSvg} 
                alt="Phone" 
                width="24" 
                height="24" 
                style={{
                  opacity: isDarkMode ? 1 : 0,
                  transition: 'opacity 0.5s ease',
                  position: 'absolute',
                  top: 0,
                  left: 0
                }} 
              />
            </a>
          </div>
          <div className="text-center text-sm copyright-text">
            © {new Date().getFullYear()} ELIXIR Records
          </div>
        </div>
      </footer>

    );
}

export default Footer;