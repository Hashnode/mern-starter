import React from 'react';
import PropTypes from 'prop-types';

import s from './Button.css';

const Button = ({ children, color = 'default', onClick }) => {
  return (
    <button className={`${s.button} ${s[color]} `} onClick={onClick} >{children}</button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  color: PropTypes.oneOf(['default', 'primary']),
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
  ]).isRequired,
};

export default Button;
