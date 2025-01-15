import React from 'react';
import SpeedTest from './components/SpeedTest';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <SpeedTest />
      </main>
      <Footer />
    </div>
  );
}

export default App;
