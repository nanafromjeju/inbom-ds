import styles from './ListHeader.module.scss';

interface ListHeaderProps {
  headers: string[];
  headerLabels?: string[] | null;
  showCheckbox?: boolean;
  onCheckAll?: () => void;
  isAllChecked?: boolean;
  isPartiallyChecked?: boolean;
  columnWidths?: string[] | null;
  textAligns?: string[] | null;
}

const ListHeader = ({
  headers,
  showCheckbox,
  onCheckAll,
  isAllChecked,
  isPartiallyChecked,
  columnWidths = null,
  textAligns = null,
}: ListHeaderProps) => {
  return (
    <div className={styles.header}>
      {showCheckbox && (
        <div
          className={`${styles.cell} ${columnWidths ? styles.fixedWidthCell : ''}`}
          style={columnWidths ? { width: '60px' } : {}}
        >
          <div
            className={`${styles.checkbox} ${isAllChecked ? styles.checkedCheckbox : ''} ${isPartiallyChecked ? styles.indeterminateCheckbox : ''}`}
            onClick={onCheckAll}
            title="전체 선택/해제"
          />
        </div>
      )}
      {headers.map((headerText, index) => (
        <div
          key={index}
          className={`${styles.cell} ${columnWidths ? styles.fixedWidthCell : ''}`}
          style={{
            ...(columnWidths ? { width: columnWidths[index] } : {}),
            ...(textAligns
              ? {
                  textAlign:
                    (textAligns[index] as React.CSSProperties['textAlign']) ||
                    'center',
                }
              : {}),
          }}
        >
          {headerText}
        </div>
      ))}
    </div>
  );
};

export default ListHeader;
