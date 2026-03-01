import { forwardRef } from 'react';
import styles from './Input.module.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type = 'text', placeholder, className, ...props }, ref) => {
    return (
      <input
        className={`${className} ${styles.input}`}
        ref={ref}
        type={type}
        placeholder={placeholder}
        {...props}
      />
    );
  },
);

Input.displayName = 'Input';

export default Input;
