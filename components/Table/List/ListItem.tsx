import React, { useState, useEffect } from 'react';
import styles from './ListItem.module.scss';
import Tooltip from './Tooltip';

interface ListItemProps {
  item: Record<string, unknown>;
  fullItem?: Record<string, unknown>;
  isChecked?: boolean;
  isActive?: boolean;
  onCheck?: (checked: boolean) => void;
  onClick?: () => void;
  onSelect?: () => void;
  className?: string;
  showCheckbox?: boolean;
  selectable?: boolean;
  columnWidths?: string[] | null;
  tooltipColumns?: number[];
  truncateLength?: number;
  leftAlignColumns?: number[];
}

const ListItem = ({
  item,
  isChecked = false,
  isActive = false,
  onCheck,
  onClick,
  onSelect,
  className = '',
  showCheckbox = true,
  selectable = false,
  columnWidths = null,
  tooltipColumns = [],
  truncateLength = 10,
  leftAlignColumns = [],
}: ListItemProps) => {
  const [checked, setChecked] = useState<boolean>(isChecked);

  useEffect(() => {
    setChecked(isChecked);
  }, [isChecked]);

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newChecked = !checked;
    setChecked(newChecked);
    if (onCheck) onCheck(newChecked);
  };

  const handleItemClick = () => {
    if (selectable && onSelect) onSelect();
    if (onClick) onClick();
  };

  const truncateText = (text: unknown, maxLength: number): string => {
    if (!text) return '';
    const textStr = String(text);
    return textStr.length > maxLength
      ? textStr.slice(0, maxLength) + '...'
      : textStr;
  };

  return (
    <div
      className={`${styles.itemRow} ${className} ${
        onClick || selectable ? styles.clickable : ''
      } ${isActive ? styles.active : ''}`}
      onClick={handleItemClick}
    >
      {showCheckbox && (
        <div
          className={`${styles.cell} ${columnWidths ? styles.fixedWidthCell : ''}`}
          style={columnWidths ? { width: '60px' } : {}}
        >
          <div
            className={`${styles.checkbox} ${checked ? styles.checkedCheckbox : ''}`}
            onClick={handleCheckboxClick}
          />
        </div>
      )}
      {Object.entries(item).map(([key, value], index) => {
        if (key.startsWith('_')) return null;

        const shouldShowTooltip = tooltipColumns.includes(index);
        const shouldLeftAlign = leftAlignColumns.includes(index);
        const displayText = shouldShowTooltip
          ? truncateText(value, truncateLength)
          : value;
        const needsTooltip =
          shouldShowTooltip && String(value).length > truncateLength;

        const cellContent = (
          <div
            className={`${styles.cell} ${columnWidths ? styles.fixedWidthCell : ''} ${shouldLeftAlign ? styles.leftAlign : ''}`}
            style={columnWidths ? { width: columnWidths[index] } : {}}
          >
            {displayText as React.ReactNode}
          </div>
        );

        if (needsTooltip) {
          return (
            <div
              key={index}
              className={`${styles.cell} ${columnWidths ? styles.fixedWidthCell : ''} ${shouldLeftAlign ? styles.leftAlign : ''}`}
              style={columnWidths ? { width: columnWidths[index] } : {}}
            >
              <Tooltip text={String(value)}>
                <span style={{ display: 'block' }}>
                  {displayText as React.ReactNode}
                </span>
              </Tooltip>
            </div>
          );
        }

        return <React.Fragment key={index}>{cellContent}</React.Fragment>;
      })}
    </div>
  );
};

export default ListItem;
