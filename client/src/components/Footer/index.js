import React from 'react';
import { FaGithub } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="w-100 mt-auto bg-secondary p-4">
        <div className="flex-row space-between px-2">
          <span className="footer">
            &copy;{(new Date().getFullYear())}
            {' '}by  
            {' '}<a className="footer" href="https://github.com/kpehl" target="_blank" rel="noopener noreferrer">Kathleen Pehl,</a>
            {' '}<a className="footer" href="https://github.com/fondofhats" target="_blank" rel="noopener noreferrer">Michael Giddings,</a>
            {' '}<a className="footer" href="https://github.com/DCampos07" target="_blank" rel="noopener noreferrer">Damaris Campos, and</a>
            {' '}<a className="footer" href="https://github.com/cacevedo2011" target="_blank" rel="noopener noreferrer">Cristian Acevedo</a>
          </span>
          <span><a className="footer" href="https://github.com/kpehl/react-retreat" target="_blank" rel="noopener noreferrer">< FaGithub /> GitHub Repository</a></span>
        </div>
        <div className="footer px-2">
          Photographs courtesy of <a className="footer" href = "https://unsplash.com/" target="_blank" rel="noopener noreferrer">Unsplash</a>
        </div>
    </footer>
  );
};

export default Footer;
