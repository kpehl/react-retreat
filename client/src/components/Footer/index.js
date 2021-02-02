import React from 'react';
import { FaGithub } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="w-100 mt-auto bg-secondary p-4">
        <div className="flex-row space-between">
          <span>
            &copy;{(new Date().getFullYear())}
            {' '}by  
            {' '}<a href="https://github.com/kpehl" target="_blank" rel="noopener noreferrer">Kathleen Pehl</a>,
            {' '}<a href="https://github.com/fondofhats" target="_blank" rel="noopener noreferrer">Michael Giddings</a>,
            {' '}<a href="https://github.com/DCampos07" target="_blank" rel="noopener noreferrer">Damaris Campos</a>, and
            {' '}<a href="https://github.com/cacevedo2011" target="_blank" rel="noopener noreferrer">Cristian Acevedo</a>.
          </span>
          <span><a href="https://github.com/kpehl/react-retreat" target="_blank" rel="noopener noreferrer">< FaGithub /> GitHub Repository</a></span>
        </div>
        <div>
          Photographs courtesy of <a href = "https://unsplash.com/" target="_blank" rel="noopener noreferrer">Unsplash</a>
        </div>
    </footer>
  );
};

export default Footer;
