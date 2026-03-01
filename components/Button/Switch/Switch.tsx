import React from 'react';
import styles from './Switch.module.scss';

interface SwitchProps {
  leftLabel?: string;
  rightLabel?: string;
  leftValue?: string;
  rightValue?: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const Switch = ({
  leftLabel = '월간',
  rightLabel = '연간',
  leftValue = 'M',
  rightValue = 'Y',
  value,
  onChange,
  disabled = false,
}: SwitchProps) => {
  const isLeft = value === leftValue;

  const handleToggle = () => {
    if (!disabled) {
      const newValue = isLeft ? rightValue : leftValue;
      onChange(newValue);
    }
  };

  return (
    <div className={styles.switchWrapper}>
      <span
        className={`${styles.label} ${isLeft ? styles.active : ''}`}
        onClick={handleToggle}
      >
        {leftLabel}
      </span>

      <button
        type="button"
        className={`${styles.toggle} ${!isLeft ? styles.checked : ''} ${
          disabled ? styles.disabled : ''
        }`}
        onClick={handleToggle}
        disabled={disabled}
        role="switch"
        aria-checked={!isLeft}
      >
        <span className={styles.slider} />
      </button>

      <span
        className={`${styles.label} ${!isLeft ? styles.active : ''}`}
        onClick={handleToggle}
      >
        {rightLabel}
      </span>
    </div>
  );
};

export default Switch;
