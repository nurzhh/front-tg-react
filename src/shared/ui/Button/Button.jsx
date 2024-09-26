import "./styles.css";

export const Button = (props) => {
  return (
    <button {...props} className={"button" + props.className}>
      {props.children}
    </button>
  );
};
