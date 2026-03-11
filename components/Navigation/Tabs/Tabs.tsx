import { useState, useEffect } from 'react';
import styles from './Tabs.module.scss';

interface TabsProps {
  tabs: {
    label: string;
    content: React.ReactNode;
    onClick?: () => void;
  }[];
  defaultTab?: number;
  variant?: 'default' | 'boxed';
  actionButton?: {
    label: string;
    onClick: () => void;
  };
  onTabChange?: (index: number) => void;
}

const Tabs = ({
  tabs,
  defaultTab = 0,
  variant = 'default',
  actionButton,
  onTabChange,
}: TabsProps) => {
  const [activeTab, setActiveTab] = useState<number>(defaultTab);

  useEffect(() => {
    setActiveTab(defaultTab);
  }, [defaultTab]);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
    onTabChange?.(index);

    if (tabs[index].onClick) {
      tabs[index].onClick?.();
    }
  };

  return (
    <div className={`${styles.tabsContainer} ${styles[variant]}`}>
      <div className={styles.tabMenu}>
        <div className={styles.tabItems}>
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`${styles.tabItem} ${
                activeTab === index ? styles.active : ''
              }`}
              onClick={() => handleTabClick(index)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {actionButton && (
          <button
            className={styles.actionButton}
            onClick={actionButton.onClick}
          >
            <img src="/icons/write-icon.svg" alt="icon" />
            {actionButton.label}
          </button>
        )}
      </div>

      <div className={styles.tabContent}>{tabs[activeTab]?.content}</div>
    </div>
  );
};

export default Tabs;
