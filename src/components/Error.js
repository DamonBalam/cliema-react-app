import PropTypes from "prop-types";
import React from 'react';

const Error = ({mensaje}) => {
    return ( 
       <p className='red darken-4 error'>{mensaje}</p> 
     );
}

Error.propTypes = {
  mensaje: PropTypes.string.isRequired
}
 
export default Error;