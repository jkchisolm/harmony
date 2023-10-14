import styles from './Button.module.scss';

type Props = {
  text: string;
  onClick?: () => void;
  variant: 'primary' | 'secondary' | 'color';
  rounded?: boolean;
};

export const Button = (props: Props) => {
  return (
    <button
      className={`${styles[props.variant]} ${
        props.rounded ? styles.rounded : ''
      }`}
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
};
