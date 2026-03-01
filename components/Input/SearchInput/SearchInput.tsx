import { forwardRef } from 'react';
import styles from './SearchInput.module.scss';

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ placeholder = '검색어를 입력하세요', className, ...props }, ref) => {
    return (
      <div className={`${styles.searchInputWrapper} ${className || ''}`}>
        <img
          src="/icons/search-icon.svg"
          alt="검색"
          className={styles.searchIcon}
        />
        <input
          className={styles.input}
          ref={ref}
          type="text"
          placeholder={placeholder}
          {...props}
        />
      </div>
    );
  },
);

SearchInput.displayName = 'SearchInput';

export default SearchInput;
