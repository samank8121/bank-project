import React from 'react';
import styles from './radio-group.module.scss';

type RadioOption = {
  label: string;
  value: string;
};

type RadioGroupProps = {
  options: RadioOption[];
  name: string;
  selectedValue: string;
  onChange: (value: string) => void;
};

const RadioGroup: React.FC<RadioGroupProps> = ({ options, name, selectedValue, onChange }) => {
  return (
    <div className={styles.radioGroup}>
      {options.map((option) => (
        <label key={option.value} className={styles.radioOption}>
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={selectedValue === option.value}
            onChange={() => onChange(option.value)}
          />
          <span className={styles.radioLabel}>{option.label}</span>
        </label>
      ))}
    </div>
  );
};

export default RadioGroup;
