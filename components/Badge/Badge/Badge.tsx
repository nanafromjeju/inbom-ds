import styles from './Badge.module.scss';

interface BadgeProps {
  icon: string;
  title: string;
  backgroundColor?: string;
  color?: string;
}

const Badge = ({
  icon,
  title,
  backgroundColor = '#222',
  color = '#fff',
}: BadgeProps) => {
  return (
    <div
      className={styles.badge}
      style={{ backgroundColor, color }}
      role="presentation"
      aria-hidden="true"
    >
      <img src={icon} alt="" role="presentation" />
      {title}
    </div>
  );
};

export default Badge;
