import { useState, useEffect } from 'react';
import toggle from '../public/toggle.svg'
import Image from 'next/image';


export default function DarkModeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    const initialColorValue = root.style.getPropertyValue('--background-color');

    setIsDarkMode(initialColorValue === '#333');
  }, []);

  function toggleDarkMode() {
    const root = window.document.documentElement;

    root.classList.toggle('dark-mode');
    setIsDarkMode(!isDarkMode);
  }

  return (
    <Image style={{width:'60px', height:'40px'}}  src={toggle} onClick={toggleDarkMode} alt='toggle img'>
      {isDarkMode ? 'Modo claro' : 'Modo oscuro'}
    </Image>
  );
}