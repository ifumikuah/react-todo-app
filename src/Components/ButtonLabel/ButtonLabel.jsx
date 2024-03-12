import { useContext } from 'react';
import PropTypes from 'prop-types';
import { label, label_dark, label_light } from './ButtonLabel.module.css'
import { ThemeContext } from '../../App';

export default function ButtonLabel ({ children, onClick, customClass }) {
  const theme = useContext(ThemeContext) ? label_dark : label_light

  return <div className={ `${label} ${theme} ${customClass}` } onClick={onClick}>
    { children }
  </div>
}

ButtonLabel.propTypes = {
  onClick: PropTypes.func,
  customClass: PropTypes.string,
  children: PropTypes.any
}

ButtonLabel.defaultProps = {
  children: "Label",
  customClass: ""
}