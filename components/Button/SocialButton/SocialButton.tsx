import React from 'react';
import styles from './SocialButton.module.scss';

interface SocialButtonProps {
  icon: string;
  title: string;
  onClick?: () => void;
  backgroundColor?: string;
  textColor?: string;
  border?: string;
  className?: string;
}

const SocialButton = ({
  icon,
  title,
  onClick,
  backgroundColor,
  textColor,
  border,
  className,
}: SocialButtonProps) => {
  return (
    <div
      onClick={onClick}
      className={`${styles.socialButtonContainer} ${className}`}
      style={{ backgroundColor, color: textColor, border }}
    >
      <img src={icon} alt="icon" />
      <p className={styles.socialButtonText}>{title}</p>
    </div>
  );
};

export default SocialButton;
