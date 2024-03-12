import { useContext } from "react";
import PropTypes from "prop-types";
import { item, item_light, item_dark } from "./TaskItem.module.css";
import ButtonSymbol from "../ButtonSymbol/ButtonSymbol";
import { ThemeContext } from "../../App";

export default function TaskItem({
  children,
  customClass,
  enableState,
  itemState,
  togglerOnClick,
  onClick
}) {
  const theme = useContext(ThemeContext) ? item_dark : item_light;

  return (
    <li className={`${item} ${theme} ${customClass}`} onClick={onClick}>
      {enableState ? (
        <ButtonSymbol onClick={togglerOnClick}>
          {itemState ? "check_box_outline_blank" : "check_box"}
        </ButtonSymbol>
      ) : (
        ""
      )}
      {children}
    </li>
  );
}

TaskItem.propTypes = {
  togglerOnClick: PropTypes.func,
  onClick: PropTypes.func,
  children: PropTypes.any,
  customClass: PropTypes.string,
  enableState: PropTypes.bool,
  itemState: PropTypes.bool,
};

TaskItem.defaultProps = {
  children: <p>Item</p>,
  customClass: "",
  enableState: true,
  itemState: true,
};
