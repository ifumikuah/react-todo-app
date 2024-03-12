import { useContext } from 'react';
import PropTypes from 'prop-types';
import { btn, btn_dark, btn_light } from './Button.module.css'
import { ThemeContext } from '../../App';

export default function Button ({ children, onClick, customClass }) {
  const theme = useContext(ThemeContext) ? btn_dark : btn_light

  return <button className={ `${btn} ${theme} ${customClass}` } onClick={onClick}>
    { children }
  </button>
}

Button.propTypes = {
  onClick: PropTypes.func,
  customClass: PropTypes.string,
  children: PropTypes.any
}

Button.defaultProps = {
  children: "Button",
  customClass: ""
}