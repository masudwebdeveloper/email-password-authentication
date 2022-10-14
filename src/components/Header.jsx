import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
   return (
      <div>
         <Link to="/registerreactbootstrap">Login</Link>
         <Link to="/registerbootstrap">Register</Link>
      </div>
   );
};

export default Header;