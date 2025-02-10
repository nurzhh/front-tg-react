import "./styles.css";
import cn from "classnames";

export const Button = ({ variant='primary', className, children, ...props}) => {
  const buttonClass = cn(
      "button",
      variant && `btn-${variant}`,
      className
  );

  return (
    <button {...props} className={buttonClass}>
      {children}
    </button>
  );
};
