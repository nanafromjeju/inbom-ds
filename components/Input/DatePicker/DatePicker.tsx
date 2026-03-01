import { forwardRef, useState, useRef, useEffect } from 'react';
import styles from './DatePicker.module.scss';

interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

interface DatePickerProps {
  placeholder?: string;
  className?: string;
  value?: DateRange;
  onChange?: (range: DateRange) => void;
}

const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  (
    {
      placeholder = '날짜를 선택해주세요',
      className,
      onChange,
      value,
      ...props
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [hoverDate, setHoverDate] = useState<Date | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () =>
        document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
      if (value?.startDate || value?.endDate) {
        setStartDate(value.startDate ?? null);
        setEndDate(value.endDate ?? null);
      }
    }, [value]);

    const formatCalenderDate = (date: Date | null) => {
      if (!date) return '';
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}.${month}.${day}`;
    };

    const displayText =
      startDate && endDate
        ? `${formatCalenderDate(startDate)} - ${formatCalenderDate(endDate)}`
        : placeholder;

    const getDaysInMonth = (date: Date) => {
      const year = date.getFullYear();
      const month = date.getMonth();
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const daysInMonth = lastDay.getDate();
      const startDayOfWeek = firstDay.getDay();

      const days = [];

      for (let i = 0; i < startDayOfWeek; i++) {
        days.push(null);
      }

      for (let i = 1; i <= daysInMonth; i++) {
        days.push(new Date(year, month, i));
      }

      return days;
    };

    const handleDateClick = (date: Date | null) => {
      if (!date) return;

      // 오늘 이전 날짜는 선택 불가
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const selectedDate = new Date(date);
      selectedDate.setHours(0, 0, 0, 0);

      if (selectedDate < today) return;

      if (!startDate || (startDate && endDate)) {
        setStartDate(date);
        setEndDate(null);
      } else if (startDate && !endDate) {
        if (date < startDate) {
          setEndDate(startDate);
          setStartDate(date);
        } else {
          setEndDate(date);
        }
        if (onChange) {
          const newStartDate = date < startDate ? date : startDate;
          const newEndDate = date < startDate ? startDate : date;
          onChange({ startDate: newStartDate, endDate: newEndDate });
        }
        // 종료일까지 선택되면 달력 닫기
        setIsOpen(false);
      }
    };

    // 이전 날짜 여부를 확인하는 함수
    const isPastDate = (date: Date | null) => {
      if (!date) return false;
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const compareDate = new Date(date);
      compareDate.setHours(0, 0, 0, 0);
      return compareDate < today;
    };

    const isInRange = (date: Date | null) => {
      if (!date || !startDate) return false;

      const compareDate = hoverDate && !endDate ? hoverDate : endDate;
      if (!compareDate) return false;

      const start = startDate < compareDate ? startDate : compareDate;
      const end = startDate < compareDate ? compareDate : startDate;

      return date > start && date < end;
    };

    const isStartOrEnd = (date: Date | null) => {
      if (!date) return false;
      return (
        (startDate && date.getTime() === startDate.getTime()) ||
        (endDate && date.getTime() === endDate.getTime())
      );
    };

    const isToday = (date: Date | null) => {
      if (!date) return false;
      const today = new Date();
      return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      );
    };

    const changeMonth = (delta: number) => {
      setCurrentMonth(
        new Date(currentMonth.getFullYear(), currentMonth.getMonth() + delta),
      );
    };

    const days = getDaysInMonth(currentMonth);
    const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

    return (
      <div
        className={`${styles.container} ${className || ''}`}
        ref={containerRef}
        {...props}
      >
        <div className={styles.inputWrapper} onClick={() => setIsOpen(!isOpen)}>
          <img
            src="/icons/date-icon.svg"
            alt="calendar"
            className={styles.icon}
          />
          <input
            ref={ref}
            type="text"
            value={displayText}
            placeholder={placeholder}
            readOnly
            className={styles.input}
          />
        </div>

        {isOpen && (
          <div className={styles.calendar}>
            <div className={styles.header}>
              <button
                type="button"
                onClick={() => changeMonth(-1)}
                className={styles.navButton}
              >
                <img
                  src="/icons/arrow-down.svg"
                  alt="previous"
                  className={styles.arrowLeft}
                />
              </button>
              <div className={styles.currentMonth}>
                {currentMonth.getFullYear()}.
                {String(currentMonth.getMonth() + 1).padStart(2, '0')}
              </div>
              <button
                type="button"
                onClick={() => changeMonth(1)}
                className={styles.navButton}
              >
                <img
                  src="/icons/arrow-down.svg"
                  alt="next"
                  className={styles.arrowRight}
                />
              </button>
            </div>

            <div className={styles.weekDays}>
              {weekDays.map((day, index) => (
                <div
                  key={index}
                  className={`${styles.weekDay} ${
                    index === 0 ? styles.sunday : ''
                  } ${index === 6 ? styles.saturday : ''}`}
                >
                  {day}
                </div>
              ))}
            </div>

            <div className={styles.days}>
              {days.map((date, index) => (
                <div
                  key={index}
                  className={`
      ${styles.day}
      ${isStartOrEnd(date) ? styles.selected : ''}
      ${isInRange(date) ? styles.inRange : ''}
      ${isToday(date) ? styles.today : ''}
      ${isPastDate(date) ? styles.disabled : ''}
    `}
                  onClick={() => !isPastDate(date) && handleDateClick(date)}
                  onMouseEnter={() => !isPastDate(date) && setHoverDate(date)}
                  onMouseLeave={() => setHoverDate(null)}
                >
                  {date ? date.getDate() : ''}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  },
);

DatePicker.displayName = 'DatePicker';

export default DatePicker;
