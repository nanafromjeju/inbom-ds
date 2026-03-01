import styles from './Button.module.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button = ({
  children,
  onClick,
  className = '',
  ...props
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`${className} ${styles.button}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
