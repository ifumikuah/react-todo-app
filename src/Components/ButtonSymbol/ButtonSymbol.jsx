import { useContext } from 'react';
import PropTypes from 'prop-types'
import { sym, sym_dark, sym_light } from './ButtonSymbol.module.css'
import { ThemeContext } from '../../App';

export default function ButtonSymbol( {onClick, children, customClass} ) {
  const theme = useContext(ThemeContext) ? sym_dark : sym_light

  return <span className={`material-symbols-rounded ${sym} ${theme} ${customClass}`} onClick={onClick}>
    {children}
  </span>
}

ButtonSymbol.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.string,
  customClass: PropTypes.string
}

ButtonSymbol.defaultProps = {
  children: "emoticon",
  customClass: ""
}