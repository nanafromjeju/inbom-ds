import { useState, useEffect } from 'react';
import ListItem from './ListItem';
import ListHeader from './ListHeader';

interface ListProps {
  headers: string[] | { key: string; label: string }[];
  headerLabels?: string[] | null;
  data: Record<string, unknown>[];
  showCheckbox?: boolean;
  onItemCheck?: (item: Record<string, unknown>, checked: boolean) => void;
  onItemClick?: (item: Record<string, unknown>, index: number) => void;
  selectable?: boolean;
  selectedItems?: (string | number)[];
  onItemSelect?: (item: Record<string, unknown>, index: number) => void;
  columnWidths?: string[] | null;
  columnClassNames?: string[];
  tooltipColumns?: number[];
  truncateLength?: number;
  leftAlignColumns?: number[];
}

const List = ({
  headers,
  headerLabels = null,
  data,
  showCheckbox = true,
  onItemCheck,
  onItemClick,
  selectable = false,
  selectedItems = [],
  onItemSelect,
  columnWidths = null,
  columnClassNames = [],
  tooltipColumns = [],
  truncateLength = 10,
  leftAlignColumns = [],
}: ListProps) => {
  const [checkedStates, setCheckedStates] = useState<boolean[]>([]);

  useEffect(() => {
    setCheckedStates(data.map(() => false));
  }, [data]);

  const headerKeys =
    Array.isArray(headers) && typeof headers[0] === 'object'
      ? (headers as { key: string; label: string }[]).map((h) => h.key)
      : (headers as string[]);

  const displayHeaders = headerLabels
    ? headerLabels
    : Array.isArray(headers) && typeof headers[0] === 'object'
      ? (headers as { key: string; label: string }[]).map((h) => h.label)
      : (headers as string[]);

  const handleItemCheck = (index: number, checked: boolean) => {
    const newChecked = [...checkedStates];
    newChecked[index] = checked;
    setCheckedStates(newChecked);

    const row = (data[index].raw as Record<string, unknown>) ?? data[index];
    if (onItemCheck) onItemCheck(row, checked);
  };

  const handleItemClick = (item: Record<string, unknown>, index: number) => {
    if (onItemClick) onItemClick(item, index);
  };

  const isAllChecked = checkedStates.length > 0 && checkedStates.every(Boolean);
  const isPartiallyChecked = checkedStates.some(Boolean) && !isAllChecked;

  const handleCheckAll = () => {
    const newValue = !isAllChecked;
    const newChecked = data.map(() => newValue);
    setCheckedStates(newChecked);
    if (onItemCheck) {
      newChecked.forEach((checked, idx) =>
        onItemCheck(idx as unknown as Record<string, unknown>, checked),
      );
    }
  };

  const handleItemSelect = (item: Record<string, unknown>, index: number) => {
    if (onItemSelect) {
      onItemSelect(data[index], index);
    }
  };

  return (
    <div className="list-container">
      <ListHeader
        headers={displayHeaders}
        headerLabels={headerLabels}
        showCheckbox={showCheckbox}
        onCheckAll={handleCheckAll}
        isAllChecked={isAllChecked}
        isPartiallyChecked={isPartiallyChecked}
        columnWidths={columnWidths}
      />
      <div className="list-content">
        {data.map((item, index) => {
          const visibleItem: Record<string, unknown> = {};
          headerKeys.forEach((h) => {
            visibleItem[h] = item[h] ?? '';
          });

          return (
            <ListItem
              key={index}
              item={visibleItem}
              fullItem={item}
              isChecked={checkedStates[index]}
              isActive={selectedItems.includes(item.id as string | number)}
              showCheckbox={showCheckbox}
              selectable={selectable}
              onCheck={(checked) => handleItemCheck(index, checked)}
              onClick={() => handleItemClick(item, index)}
              onSelect={() => handleItemSelect(item, index)}
              columnWidths={columnWidths}
              tooltipColumns={tooltipColumns}
              truncateLength={truncateLength}
              leftAlignColumns={leftAlignColumns}
            />
          );
        })}
      </div>
    </div>
  );
};

export default List;
