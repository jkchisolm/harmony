import {
  FieldValues,
  RegisterOptions,
  UseFormRegister,
  useFormContext,
} from 'react-hook-form';
import styles from './Input.module.scss';

type Props = {
  registerOptions?: RegisterOptions;
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
};

export const Input = (props: Props) => {
  const { register } = useFormContext();

  return (
    <div className={styles.container}>
      {props.label && (
        <label htmlFor={props.name}>
          {props.label}{' '}
          {props.required ? <span style={{ color: 'red' }}>*</span> : ''}
        </label>
      )}
      <input {...register(props.name, props.registerOptions)} {...props} />
    </div>
  );
};
