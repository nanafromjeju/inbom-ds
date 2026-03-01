import { useState, useEffect } from 'react';
import styles from './TimePicker.module.scss';

interface TimePickerProps {
  onChange?: (selectedSlots: string[]) => void;
  value?: string[];
}

const TimePicker = ({ onChange, value }: TimePickerProps) => {
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);

  const timeSlots = [
    { id: 'anytime', label: '아무때나 좋아요' },
    { id: '10-12', label: '10:00 - 12:00' },
    { id: '13-15', label: '13:00 - 15:00' },
    { id: '15-17', label: '15:00 - 17:00' },
  ];

  useEffect(() => {
    if (!value || value.length === 0) return;

    setSelectedSlots(value);
  }, []);

  const handleSlotClick = (slotId: string) => {
    console.log(slotId);
    let newSelectedSlots;
    if (slotId === 'anytime') {
      newSelectedSlots = selectedSlots.includes('anytime') ? [] : ['anytime'];
    } else {
      const withoutAnytime = selectedSlots.filter((s) => s !== 'anytime');

      if (withoutAnytime.includes(slotId)) {
        newSelectedSlots = withoutAnytime.filter((s) => s !== slotId);
      } else {
        newSelectedSlots = [...withoutAnytime, slotId];
      }
    }

    console.log(newSelectedSlots);
    setSelectedSlots(newSelectedSlots);
    console.log(newSelectedSlots);
    if (onChange) {
      onChange(newSelectedSlots);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.label}>불가능한 시간대를 선택해주세요</div>
      <div className={styles.buttonWrapper}>
        {timeSlots.map((slot) => (
          <button
            key={slot.id}
            className={`${styles.button} ${
              selectedSlots.includes(slot.id) ? styles.active : ''
            }`}
            onClick={() => handleSlotClick(slot.id)}
          >
            {slot.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TimePicker;
