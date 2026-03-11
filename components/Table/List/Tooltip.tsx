import { useState, useRef, useEffect } from 'react';
import styles from './Tooltip.module.scss';

interface TooltipProps {
  children: React.ReactNode;
  text?: string;
}

const Tooltip = ({ children, text }: TooltipProps) => {
  const [show, setShow] = useState<boolean>(false);
  const [position, setPosition] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (show && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setPosition({
        top: rect.top,
        left: rect.left + rect.width / 2,
      });
    }
  }, [show]);

  if (!text) return <>{children}</>;

  return (
    <div
      ref={containerRef}
      className={styles.tooltipContainer}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && (
        <div
          className={styles.tooltip}
          style={{
            top: `${position.top}px`,
            left: `${position.left}px`,
          }}
        >
          {text}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
