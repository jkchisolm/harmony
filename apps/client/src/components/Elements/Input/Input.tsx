import { FieldError, RegisterOptions, useFormContext } from 'react-hook-form';
import styles from './Input.module.scss';
import { HTMLInputTypeAttribute } from 'react';

type Props = {
  registerOptions?: RegisterOptions;
  name: string;
  label?: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  required?: boolean;
  error?: FieldError;
  otherProps?: React.InputHTMLAttributes<HTMLInputElement>;
};

export const Input = (props: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={styles.container}>
      {props.label && (
        <label htmlFor={props.name}>
          {props.label}{' '}
          {props.required ? <span style={{ color: 'red' }}>*</span> : ''}
        </label>
      )}
      <input {...register(props.name, props.registerOptions)} {...props} />
      <div className={styles.error}>
        &nbsp;
        {errors[props.name] ? errors[props.name]?.message?.toString() : ''}
      </div>
    </div>
  );
};
