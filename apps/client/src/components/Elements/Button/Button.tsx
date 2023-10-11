import styles from './Button.module.scss';

type Props = {
  text: string;
  onClick?: () => void;
  variant: 'primary' | 'secondary';
};

export const Button = (props: Props) => {
  return (
    <button className={styles[props.variant]} onClick={props.onClick}>
      {props.text}
    </button>
  );
};
