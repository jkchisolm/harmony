import React from 'react';
import styles from './Button.module.scss';

type Props = {
  text: string;
  onClick?: (e?: any) => void;
  variant: 'primary' | 'secondary' | 'color';
  rounded?: boolean;
  // other props
  otherProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
};

export const Button = (props: Props) => {
  return (
    <button
      className={`${styles[props.variant]} ${
        props.rounded ? styles.rounded : ''
      }`}
      onClick={props.onClick}
      {...props.otherProps}
    >
      {props.text}
    </button>
  );
};
