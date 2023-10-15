import { UseFormRegister, FieldValues, RegisterOptions } from 'react-hook-form';
import styles from './Select.module.scss';

type Props = {
  register: UseFormRegister<FieldValues>;
  registerOptions?: RegisterOptions;
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  options: string[];
};

export const Select = (props: Props) => {
  return (
    <div className={styles.container}>
      {props.label && (
        <label htmlFor={props.name}>
          {props.label}{' '}
          {props.required ? <span style={{ color: 'red' }}>*</span> : ''}
        </label>
      )}
      <select {...props.register(props.name, props.registerOptions)} {...props}>
        {props.options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};
