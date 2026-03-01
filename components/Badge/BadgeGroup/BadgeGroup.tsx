import Badge from '../Badge/Badge';
import styles from './BadgeGroup.module.scss';

interface BadgeGroupProps {
  badges: {
    icon: string;
    title: string;
    backgroundColor?: string;
    color?: string;
  }[];
}

const BadgeGroup = ({ badges = [] }: BadgeGroupProps) => {
  if (!badges || badges.length === 0) return null;

  return (
    <div className={styles.badgeGroup}>
      {badges.map((badge, index) => (
        <Badge
          key={index}
          icon={badge.icon}
          title={badge.title}
          backgroundColor={badge.backgroundColor}
          color={badge.color}
        />
      ))}
    </div>
  );
};

export default BadgeGroup;
