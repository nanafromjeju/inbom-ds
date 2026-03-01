import { forwardRef } from 'react';
import styles from './Select.module.scss';

interface SelectProps {
  options: { label: string; value: string }[];
  placeholder?: string;
  className?: string;
  onChange?: (value: string | null) => void;
  value?: string | null;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      options = [],
      placeholder = '선택하세요',
      className,
      onChange,
      value,
      ...props
    }: SelectProps,
    ref,
  ) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      if (onChange) {
        const selectedValue = e.target.value === '' ? null : e.target.value;
        onChange(selectedValue);
      }
    };

    return (
      <div className={`${className || ''} ${styles.selectWrapper}`}>
        <select
          className={styles.select}
          value={value || ''}
          ref={ref}
          {...props}
          onChange={handleChange}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <img
          src="/icons/select-icon.svg"
          alt=""
          className={styles.selectIcon}
        />
      </div>
    );
  },
);

Select.displayName = 'Select';

export default Select;
