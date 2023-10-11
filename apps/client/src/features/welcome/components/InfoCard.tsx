import styles from './InfoCard.module.scss';

type Props = {
  descriptionSide: 'left' | 'right';
  bgColor: 'white' | 'darker';
  header: string;
  description: string;
};

export const InfoCard = (props: Props) => {
  return (
    <div
      className={`${styles.infoCard} ${styles[props.descriptionSide]} ${
        styles[props.bgColor]
      }`}
    >
      <h3>{props.header}</h3>
      <p>{props.description}</p>
    </div>
  );
};
