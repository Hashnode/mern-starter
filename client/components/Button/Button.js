import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './Button.css';

const Button = ({
  children, onClick, className, disabled, active, ...attrs,
}) => {
  const classes = classnames(styles.button, className, { active });

  return (
    <button
      {...attrs}
      className={classes}
      disabled={disabled}
      onClick={onClick}
    >{children}</button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  active: PropTypes.bool,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  children: 'Button',
  className: '',
  type: 'button',
  disabled: false,
  active: false,
  onClick: () => { },
};


export default Button;
