import { useState, useEffect } from 'react';
import { Twitter, Github, Linkedin } from 'lucide-react';

export default function CodeLeapLanding() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 4,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Set end date to 96 hours from now
    const endDate = new Date();
    endDate.setHours(endDate.getHours() + 96);
    
    const timer = setInterval(() => {
      const now = new Date();
      const difference = endDate - now;
      
      if (difference <= 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);
    
    // Cleanup
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      // In a real app, you would send this to your backend
      setEmail('');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white justify-between">
      {/* Main content area */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-16">
        <div className="max-w-3xl w-full text-center">
          {/* Heading with gradient text */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-yellow-400">Code</span>
            <span className="text-pink-500">Station is </span>
            <span className="text-pink-500">Launching</span>
            <br />
            <span className="text-pink-500">Soon</span>
          </h1>
          
          {/* Countdown timer */}
          <div className="flex justify-center space-x-4 md:space-x-8 mb-8">
            <div className="flex flex-col items-center">
              <div className="text-2xl md:text-4xl font-bold bg-gray-800 rounded-lg w-16 md:w-24 py-3">{timeLeft.days}</div>
              <div className="text-sm md:text-base text-gray-400 mt-2">Days</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-2xl md:text-4xl font-bold bg-gray-800 rounded-lg w-16 md:w-24 py-3">{timeLeft.hours}</div>
              <div className="text-sm md:text-base text-gray-400 mt-2">Hours</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-2xl md:text-4xl font-bold bg-gray-800 rounded-lg w-16 md:w-24 py-3">{timeLeft.minutes}</div>
              <div className="text-sm md:text-base text-gray-400 mt-2">Minutes</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-2xl md:text-4xl font-bold bg-gray-800 rounded-lg w-16 md:w-24 py-3">{timeLeft.seconds}</div>
              <div className="text-sm md:text-base text-gray-400 mt-2">Seconds</div>
            </div>
          </div>
          
          {/* Description text */}
          <p className="text-gray-300 text-lg mb-12 mx-auto max-w-2xl">
            Revolutionizing the developer experience with AI-powered collaboration tools.
            Build faster, solve complex problems together, and stay ahead of tomorrow's challenges.
            Join the waitlist to transform the way you code forever.
          </p>
          
          {/* Email signup section */}
          {!isSubmitted ? (
            <div className="flex flex-col md:flex-row gap-3 justify-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 w-full md:w-auto"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button 
                onClick={handleSubmit} 
                className="px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-medium rounded-md transition-colors"
              >
                Notify Me
              </button>
            </div>
          ) : (
            <div className="text-green-400 text-xl">
              Thanks! We'll notify you when we launch.
            </div>
          )}
        </div>
      </main>
      
      {/* Footer with social icons */}
      <footer className="py-8 text-center">
        <div className="flex justify-center space-x-6 mb-4">
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            <Twitter size={24} />
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            <Github size={24} />
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            <Linkedin size={24} />
          </a>
        </div>
        <p className="text-gray-500 text-sm">
          © 2025 CodeStation. All rights reserved.
        </p>
      </footer>
    </div>
  );
}