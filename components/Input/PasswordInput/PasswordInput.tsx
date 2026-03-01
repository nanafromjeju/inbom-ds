import { forwardRef, useState } from 'react';
import styles from './PasswordInput.module.scss';

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ placeholder = '비밀번호를 입력하세요', className, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    return (
      <div className={styles.passwordInputWrapper}>
        <input
          className={`${className} ${styles.input}`}
          ref={ref}
          type={showPassword ? 'text' : 'password'}
          placeholder={placeholder}
          {...props}
        />
        <button
          type="button"
          className={styles.toggleButton}
          onClick={togglePasswordVisibility}
          aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
        >
          <img
            src={
              showPassword
                ? '/icons/password-icon.svg'
                : '/icons/password-icon-off.svg'
            }
            alt="toggle password"
          />
        </button>
      </div>
    );
  },
);

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;
