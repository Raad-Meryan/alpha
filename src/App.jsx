import React from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Vision from './components/Vision';
import Team from './components/Team';
import Clients from './components/Clients';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import './App.css';

function App() {
  return (
    <div className="app">
      <Navigation />
      <Hero />
      <About />
      <Vision />
      <Team />
      <Clients />
      <Gallery />
      <Contact />
    </div>
  );
}

export default App;
