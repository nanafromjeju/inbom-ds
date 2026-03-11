import { useState, useEffect } from 'react';
import styles from './Accordion.module.scss';

interface AccordionProps {
  items: {
    title: string;
    description?: string;
    value?: string;
    sections?: {
      subtitle?: string;
      items: string[];
    }[];
  }[];
  onChange?: (value: Record<string, string>) => void;
  name?: string;
  defaultIndex?: number | null;
  value?: string;
}

const Accordion = ({
  items,
  onChange,
  name,
  defaultIndex = null,
  value,
}: AccordionProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(defaultIndex);

  useEffect(() => {
    if (value) {
      const index = items.findIndex((item) => item.value === value);
      if (index !== -1) {
        setActiveIndex(index);
      }
    }
  }, [value, items]);

  const toggleAccordion = (index: number) => {
    const newIndex = activeIndex === index ? null : index;
    setActiveIndex(newIndex);

    if (newIndex !== null && onChange && name && items[index].value) {
      onChange({ [name]: items[index].value as string });
    }
  };

  return (
    <div className={styles.accordionContainer}>
      {items.map((item, index) => (
        <div key={index} className={styles.accordionItem}>
          <div
            className={`${styles.accordionHeader} ${
              activeIndex === index ? styles.active : ''
            }`}
            onClick={() => toggleAccordion(index)}
          >
            <h3 className={styles.title}>{item.title}</h3>
            {item.description && (
              <p className={styles.description}>{item.description}</p>
            )}
          </div>

          {activeIndex === index &&
            item.sections &&
            item.sections.length > 0 && (
              <div className={styles.accordionContent}>
                <div className={styles.sections}>
                  {item.sections.map((section, sIdx) => (
                    <div key={sIdx} className={styles.section}>
                      {section.subtitle && (
                        <h4 className={styles.subtitle}>{section.subtitle}</h4>
                      )}
                      <ul className={styles.list}>
                        {section.items.map((listItem, lIdx) => (
                          <li key={lIdx}>{listItem}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
