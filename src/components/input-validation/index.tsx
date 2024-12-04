import React from 'react';
import styles from './input-validation.module.scss';
import clsx from 'clsx';

type Props = {
  error: string;
}
type InputValidationProps = React.InputHTMLAttributes<HTMLInputElement> & Props;

const InputValidation: React.FC<InputValidationProps> = ({
  id,
  value,
  type,
  onChange,
  className,
  required,
  error,
  ...props
}) => {
  return (
    <div className={styles.inputValidation}>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        className={clsx(styles.input, className)}
        required={required}
        {...props}
      />
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};

export default InputValidation;
