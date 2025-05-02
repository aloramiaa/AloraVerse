import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const TermsPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useGSAP(() => {
    gsap.fromTo(
      ".terms-title",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power2.inOut" }
    );
    gsap.fromTo(
      ".card",
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, delay: 0.3, ease: "back.out(1.7)" }
    );
    gsap.fromTo(
      ".back-to-blog",
      { x: -30, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, delay: 0.5, ease: "power2.out" }
    );
  });
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="terms-page min-h-screen pt-28 pb-20 px-5 md:px-10 lg:px-20">
      {/* Main background gradient */}
      <div className="fixed top-0 left-0 w-full h-full bg-black opacity-95 z-0"></div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Back button */}
        <Link to="/" className="back-to-blog mb-10 inline-flex items-center group">
          <div className="flex items-center justify-center mr-3 w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(109,69,206,0.5)]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </div>
          <span className="text-white-50 group-hover:text-white transition-colors duration-300">Back to Home</span>
        </Link>

        {/* Floating glow effect that follows mouse */}
        <div 
          className="floating-glow hidden md:block"
          style={{
            left: `${mousePosition.x - 75}px`,
            top: `${mousePosition.y - 75}px`,
          }}
        ></div>

        {/* Title */}
        <h1 className="terms-title text-3xl md:text-5xl font-bold mt-8 mb-10 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text animate-glow">
          Terms and Conditions
        </h1>

        {/* Card container with animation */}
        <div className="card bg-black-200/70 border border-black-50 rounded-xl p-6 md:p-10 mb-10 relative overflow-hidden backdrop-blur-sm before:--start-[0]">
          <div className="glow bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20"></div>
          
          <div className="space-y-8 relative z-10">
            <section className="space-y-4 transform transition-transform duration-500 hover:-translate-y-1 overflow-visible">
              <h2 className="text-2xl font-bold text-white-50 relative inline-block">
                <span className="relative z-10">1. Introduction</span>
                <span className="absolute -left-2 -right-2 h-3 bottom-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 -z-10 rounded"></span>
              </h2>
              <p className="text-blue-50 leading-relaxed">
                Welcome to Alora Mia's portfolio website. By accessing and using this website, you agree to be bound by these Terms and Conditions. 
                If you disagree with any part of these terms, please refrain from using our services.
              </p>
            </section>

            <section className="space-y-4 transform transition-transform duration-500 hover:-translate-y-1 overflow-visible">
              <h2 className="text-2xl font-bold text-white-50 relative inline-block">
                <span className="relative z-10">2. Intellectual Property</span>
                <span className="absolute -left-2 -right-2 h-3 bottom-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 -z-10 rounded"></span>
              </h2>
              <p className="text-blue-50 leading-relaxed">
                All content on this website, including but not limited to text, graphics, logos, icons, images, audio clips, digital downloads, 
                and software, is the property of Alora Mia and is protected by international copyright, trademark, and other intellectual property laws.
              </p>
            </section>

            <section className="space-y-4 transform transition-transform duration-500 hover:-translate-y-1 overflow-visible">
              <h2 className="text-2xl font-bold text-white-50 relative inline-block">
                <span className="relative z-10">3. User Conduct</span>
                <span className="absolute -left-2 -right-2 h-3 bottom-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 -z-10 rounded"></span>
              </h2>
              <p className="text-blue-50 leading-relaxed">
                While using our website, you agree not to:
              </p>
              <ul className="list-disc list-inside text-blue-50 ml-4 space-y-2">
                <li className="pl-2 transition-all duration-300 hover:text-white">Use the website in any way that violates any applicable laws</li>
                <li className="pl-2 transition-all duration-300 hover:text-white">Engage in any conduct that restricts or inhibits anyone's use of the website</li>
                <li className="pl-2 transition-all duration-300 hover:text-white">Attempt to gain unauthorized access to any portion of the website</li>
                <li className="pl-2 transition-all duration-300 hover:text-white">Use the website for any purpose that is unlawful or prohibited by these Terms</li>
              </ul>
            </section>

            <section className="space-y-4 transform transition-transform duration-500 hover:-translate-y-1 overflow-visible">
              <h2 className="text-2xl font-bold text-white-50 relative inline-block">
                <span className="relative z-10">4. Limitations</span>
                <span className="absolute -left-2 -right-2 h-3 bottom-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 -z-10 rounded"></span>
              </h2>
              <p className="text-blue-50 leading-relaxed">
                Alora Mia shall not be held liable for any damages that may occur as a result of using our website. 
                This includes but is not limited to direct, indirect, incidental, punitive, and consequential damages.
              </p>
            </section>

            <section className="space-y-4 transform transition-transform duration-500 hover:-translate-y-1 overflow-visible">
              <h2 className="text-2xl font-bold text-white-50 relative inline-block">
                <span className="relative z-10">5. Privacy Policy</span>
                <span className="absolute -left-2 -right-2 h-3 bottom-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 -z-10 rounded"></span>
              </h2>
              <p className="text-blue-50 leading-relaxed">
                Your privacy is important to us. Any personal information collected through this website is governed by our Privacy Policy.
              </p>
            </section>

            <section className="space-y-4 transform transition-transform duration-500 hover:-translate-y-1 overflow-visible">
              <h2 className="text-2xl font-bold text-white-50 relative inline-block">
                <span className="relative z-10">6. Changes to Terms</span>
                <span className="absolute -left-2 -right-2 h-3 bottom-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 -z-10 rounded"></span>
              </h2>
              <p className="text-blue-50 leading-relaxed">
                We reserve the right to modify these terms at any time. Your continued use of the website after changes have been made 
                constitutes your acceptance of the revised terms.
              </p>
            </section>

            <section className="space-y-4 transform transition-transform duration-500 hover:-translate-y-1 overflow-visible">
              <h2 className="text-2xl font-bold text-white-50 relative inline-block">
                <span className="relative z-10">7. Contact</span>
                <span className="absolute -left-2 -right-2 h-3 bottom-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 -z-10 rounded"></span>
              </h2>
              <p className="text-blue-50 leading-relaxed">
                If you have any questions regarding these Terms and Conditions, please contact us.
              </p>
            </section>
          </div>
        </div>

        <div className="text-center mt-16">
          <Link 
            to="/" 
            className="inline-flex items-center px-7 py-4 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 text-white font-medium transition duration-300 hover:shadow-[0_0_20px_rgba(109,69,206,0.6)] hover:scale-105 group"
          >
            <span>Return to Homepage</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
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

export default TermsPage; 