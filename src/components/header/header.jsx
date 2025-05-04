function Header() {
    return (

       <header className="w-full">

            <div className="header-content">
              <div className="text-2xl anton logo-text" onClick={scrollToTop}>ELIXIR KOMBINAT</div>
              <div className="flex items-center space-x-4" id="header-buttons">
                <button className="p-2 border border-gray-700 rounded-full text-lg flex items-center shopping-cart" aria-label="Shopping cart">
                  <div className="relative" style={{width: '24px', height: '24px'}}>
                    <img 
                      src={ShoppingCartLightSvg} 
                      alt="Shopping cart" 
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
                      src={ShoppingCartDarkSvg} 
                      alt="Shopping cart" 
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
                  </div>
                </button>
                <button 
                  className="p-2 border border-gray-700 rounded-full text-lg flex items-center dark-mode-toggle"
                  onClick={toggleDarkMode}
                >
                  <div className="relative" style={{width: '24px', height: '24px'}}>
                    <img 
                      src={DarkModeLightSvg} 
                      alt="Dark mode" 
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
                      src={DarkModeDarkSvg} 
                      alt="Light mode" 
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
                  </div>
                </button>
              </div>
            </div>
            <div className="header-line-container">
              <div className="header-line"></div>
            </div>
            
        </header>
    );
}

export default Header;