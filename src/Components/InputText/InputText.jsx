import { useContext } from 'react';
import PropTypes from 'prop-types'
import { inputText, inputText_dark, inputText_light } from './InputText.module.css'
import { ThemeContext } from '../../App';

export default function InputText( {placeholder, onChange, value, customClass} ) {
  const theme = useContext(ThemeContext) ? inputText_dark : inputText_light

  return <input placeholder={placeholder} value={value} onChange={onChange} type='text'
          className={`${inputText} ${theme} ${customClass}`}/>
}

InputText.propTypes = {
  placeholder: PropTypes.any,
  value: PropTypes.any,
  onChange: PropTypes.func,
  customClass: PropTypes.string
}

InputText.defaultProps = {
  placeholder: "Input type 'Text'"
}