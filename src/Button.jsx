export default function Button({ text, whenclick, customclass, customstyle, icon }) {
  return (
    <button className={`button ${customclass}`} onClick={whenclick} style={customstyle}>
      <span className="button-logo material-symbols-rounded">{icon}</span>
      {text}
    </button>
  );
}

Button.defaultProps = {
  text: "Button",
  icon: "keyboard_command_key",
  customclass: "",
};
