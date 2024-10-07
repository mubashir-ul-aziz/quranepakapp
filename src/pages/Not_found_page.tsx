import React from 'react';
import { Link } from 'react-router-dom'; 

function Not_found_page() {
  return (
    <>
      <Link to="/"> 
        <button>Home page</button>
      </Link>
    </>
  );
}

export default Not_found_page;
