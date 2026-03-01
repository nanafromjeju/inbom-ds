import { useState, useEffect } from 'react';
import styles from './SocialBar.module.scss';

interface SocialBarProps {
  bookmarkCount?: number;
  likeCount?: number;
  isBookmarked?: boolean;
  isLiked?: boolean;
  hasEditButton?: boolean;
  hasDeleteButton?: boolean;
  onBookmarkClick?: (isBookmarked: boolean) => void;
  onLikeClick?: (isLiked: boolean) => void;
  onShareClick?: () => void;
  onEditClick?: () => void;
  onDeleteClick?: () => void;
}

const SocialBar = ({
  bookmarkCount = 0,
  likeCount = 0,
  isBookmarked = false,
  isLiked = false,
  hasEditButton = false,
  hasDeleteButton = false,
  onBookmarkClick,
  onLikeClick,
  onShareClick,
  onEditClick,
  onDeleteClick,
}: SocialBarProps) => {
  const [bookmarked, setBookmarked] = useState(isBookmarked);
  const [liked, setLiked] = useState(isLiked);

  useEffect(() => {
    setBookmarked(isBookmarked);
  }, [isBookmarked]);

  const handleBookmarkClick = () => {
    const newBookmarked = !bookmarked;
    setBookmarked(newBookmarked);
    onBookmarkClick?.(newBookmarked);
  };

  const handleLikeClick = () => {
    const newLiked = !liked;
    setLiked(newLiked);
    onLikeClick?.(newLiked);
  };

  return (
    <div className={styles.socialBar}>
      <button
        className={styles.actionButton}
        onClick={handleBookmarkClick}
        aria-label="북마크"
      >
        <span className={styles.iconWrapper}>
          <img
            className={styles.icon}
            src={
              bookmarked ? '/icons/bookmark-fill.svg' : '/icons/bookmark.svg'
            }
            alt="bookmark"
          />
        </span>
        <span className={styles.count}>{bookmarkCount}</span>
      </button>

      <button
        className={styles.actionButton}
        onClick={handleLikeClick}
        aria-label="좋아요"
      >
        <span className={styles.iconWrapper}>
          <img
            className={styles.icon}
            src={liked ? '/icons/heart-fill.svg' : '/icons/heart.svg'}
            alt="heart"
          />
        </span>
        <span className={styles.count}>{likeCount}</span>
      </button>

      <button
        className={styles.actionButton}
        onClick={onShareClick}
        aria-label="공유하기"
      >
        <span className={styles.iconWrapper}>
          <img className={styles.icon} src="/icons/share.svg" alt="share" />
        </span>
        <span className={styles.label}>공유하기</span>
      </button>

      {hasEditButton && (
        <button
          className={styles.editButton}
          onClick={onEditClick}
          aria-label="수정"
        >
          <span className={styles.editIconWrapper}>
            <img
              className={styles.icon}
              src="/icons/pen-primary.svg"
              alt="edit"
            />
          </span>
          <span className={styles.editLabel}>수정</span>
        </button>
      )}
      {hasDeleteButton && (
        <button
          className={styles.editButton}
          onClick={onDeleteClick}
          aria-label="삭제"
        >
          <span className={styles.editIconWrapper}>
            <img
              className={styles.icon}
              src="/icons/trash-icon.svg"
              alt="delete"
            />
          </span>
          <span className={styles.editLabel}>삭제</span>
        </button>
      )}
    </div>
  );
};

export default SocialBar;
