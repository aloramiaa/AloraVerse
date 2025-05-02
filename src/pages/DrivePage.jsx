import { useState, useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const DrivePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [addressValue, setAddressValue] = useState("https://drive.alora.is-a.dev/");
  const iframeRef = useRef(null);
  const browserRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      ".drive-title",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power2.inOut" }
    );
    gsap.fromTo(
      ".drive-subtitle",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.3, ease: "power2.inOut" }
    );
    gsap.fromTo(
      ".browser-container",
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, delay: 0.5, ease: "back.out(1.7)" }
    );
  });

  useEffect(() => {
    // Handle iframe load event
    const handleIframeLoad = () => {
      setIsLoading(false);
    };

    const iframe = iframeRef.current;
    if (iframe) {
      iframe.addEventListener('load', handleIframeLoad);
    }

    // Scroll to top when page loads
    window.scrollTo(0, 0);

    return () => {
      if (iframe) {
        iframe.removeEventListener('load', handleIframeLoad);
      }
    };
  }, []);

  const handleRefresh = () => {
    if (iframeRef.current) {
      setIsLoading(true);
      iframeRef.current.src = addressValue;
    }
  };

  const handleAddressChange = (e) => {
    setAddressValue(e.target.value);
  };

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    handleRefresh();
  };

  return (
    <div className="drive-page min-h-screen pt-28 pb-20 px-5 md:px-10 lg:px-20">
      {/* Main background gradient */}
      <div className="fixed top-0 left-0 w-full h-full bg-black opacity-95 z-0"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Page Title */}
        <div className="text-center mb-10">
          <h1 className="drive-title text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-500 to-blue-400 text-transparent bg-clip-text animate-glow">
            Cloud Drive
          </h1>
          <p className="drive-subtitle text-white-50 md:text-lg max-w-2xl mx-auto">
            Access your files securely from anywhere with my custom cloud storage solution.
          </p>
        </div>

        {/* Browser UI */}
        <div 
          ref={browserRef}
          className="browser-container relative max-w-6xl mx-auto rounded-xl overflow-hidden border border-black-50 shadow-[0_0_50px_rgba(109,69,206,0.15)] backdrop-blur-sm"
        >
          {/* Browser Toolbar */}
          <div className="browser-toolbar bg-black-200 px-4 py-3 flex items-center space-x-3 border-b border-black-50">
            {/* Window Controls */}
            <div className="window-controls flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500 opacity-70"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-70"></div>
              <div className="w-3 h-3 rounded-full bg-green-500 opacity-70"></div>
            </div>

            {/* Browser Navigation */}
            <div className="browser-navigation flex items-center space-x-3 ml-3">
              <button 
                onClick={handleRefresh}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-black-100 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>

              {/* Address Bar */}
              <form onSubmit={handleAddressSubmit} className="flex-1">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                    </svg>
                  </div>
                  <input 
                    type="text" 
                    value={addressValue}
                    onChange={handleAddressChange}
                    className="block w-full pl-10 pr-3 py-2 border border-black-50 rounded-md leading-5 bg-black-100 text-white-50 placeholder-blue-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </form>
            </div>

            {/* Browser Actions */}
            <div className="browser-actions hidden md:flex items-center space-x-3">
              <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-black-100 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Browser Content */}
          <div className="browser-content relative bg-black-200 h-[70vh]">
            {isLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black-100 z-10">
                <div className="flex space-x-2 items-center">
                  <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                  <div className="w-4 h-4 bg-gradient-to-r from-pink-500 to-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
                <p className="mt-4 text-white-50">Loading drive content...</p>
              </div>
            )}
            <iframe
              ref={iframeRef}
              src="https://drive.alora.is-a.dev/"
              title="Alora's Cloud Drive"
              className="w-full h-full"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            ></iframe>
          </div>

          {/* Browser Status Bar */}
          <div className="browser-status-bar bg-black-200 px-4 py-1 border-t border-black-50 flex justify-between items-center text-xs text-blue-50">
            <div>Status: {isLoading ? 'Loading...' : 'Connected'}</div>
            <div className="flex items-center">
              <span>Secured with</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Info Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card bg-black-200/70 border border-black-50 rounded-xl p-6 relative overflow-hidden backdrop-blur-sm">
            <div className="glow bg-gradient-to-r from-purple-500/20 to-transparent"></div>
            <div className="relative z-10">
              <div className="w-12 h-12 mb-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Upload Files</h3>
              <p className="text-blue-50">Drag and drop or select files to upload to your personal cloud storage.</p>
            </div>
          </div>

          <div className="card bg-black-200/70 border border-black-50 rounded-xl p-6 relative overflow-hidden backdrop-blur-sm">
            <div className="glow bg-gradient-to-r from-pink-500/20 to-transparent"></div>
            <div className="relative z-10">
              <div className="w-12 h-12 mb-4 rounded-full bg-gradient-to-r from-pink-500 to-blue-500 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Organize Files</h3>
              <p className="text-blue-50">Create folders, move files, and keep your digital content neatly organized.</p>
            </div>
          </div>

          <div className="card bg-black-200/70 border border-black-50 rounded-xl p-6 relative overflow-hidden backdrop-blur-sm">
            <div className="glow bg-gradient-to-r from-blue-500/20 to-transparent"></div>
            <div className="relative z-10">
              <div className="w-12 h-12 mb-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Secure Access</h3>
              <p className="text-blue-50">Access your files from any device with top-tier security protocols.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Background effects */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        {/* Dark gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-black to-black-200/30"></div>
        
        {/* Animated glowing orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/5 rounded-full filter blur-3xl animate-float" style={{animationDuration: '8s'}}></div>
        <div className="absolute top-[30%] right-[20%] w-64 h-64 bg-pink-500/3 rounded-full filter blur-3xl animate-float" style={{animationDelay: '2s', animationDuration: '12s'}}></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-500/5 rounded-full filter blur-3xl animate-pulse" style={{animationDuration: '10s'}}></div>
        
        {/* Grid overlay with lower opacity */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(40,39,50,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(40,39,50,0.03)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
      </div>
    </div>
  );
};

export default DrivePage; 