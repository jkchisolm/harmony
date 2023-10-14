import { FieldValues, RegisterOptions, UseFormRegister } from 'react-hook-form';
import styles from './Input.module.scss';

type Props = {
  register: UseFormRegister<FieldValues>;
  registerOptions?: RegisterOptions;
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
};

export const Input = (props: Props) => {
  return (
    <div className={styles.container}>
      {props.label && <label htmlFor={props.name}>{props.label}</label>}
      <input
        {...props.register(props.name, props.registerOptions)}
        {...props}
      />
    </div>
  );
};
