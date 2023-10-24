import { useEffect } from 'react';
import { Button } from '../../../components';
import { InfoCard } from '../components/InfoCard';
import styles from './WelcomePage.module.scss';

export const WelcomePage = () => {
  useEffect(() => {
    document.body.style.overflow = 'auto';
  });

  return (
    <div className={styles.container}>
      <div className={styles.heroSection}>
        <h2>Harmony</h2>
        <h1>IMAGINE A PLACE...</h1>
        <p>
          ...where you can belong to a school club, a gaming group, or a
          worldwide art community. <br /> Where just you and a handful of
          friends can spend time together. A place that makes it easy to talk
          every day and hang out more often.
        </p>
        <div className={styles.buttonRow}>
          <a href="/login">
            <Button
              text="Open Harmony in your browser"
              variant="primary"
              rounded
            />
          </a>
          <a href="/guest">
            <Button text="Enter Guest Mode" variant="secondary" rounded />
          </a>
        </div>
      </div>
      <InfoCard
        descriptionSide="right"
        bgColor="white"
        header="Create an invite-only place where you belong"
        description="Harmony servers are organized into topic-based channels where you can collaborate, share, and just talk about your day without clogging up a group chat."
      />
      <InfoCard
        descriptionSide="left"
        bgColor="darker"
        header="Where hanging out is easy"
        description="Grab a seat in a voice channel when you’re free. Friends in your server can see you’re around and instantly pop in to talk without having to call."
      />
      <InfoCard
        descriptionSide="right"
        bgColor="white"
        header="From few to a fandom"
        description="Get any community running with moderation tools and custom member access. Give members special powers, set up private channels, and more."
      />
      <InfoCard
        descriptionSide="left"
        bgColor="darker"
        header="Reliable tech for staying close"
        description="Low-latency voice and video feels like you’re in the same room. Wave hello over video, watch friends stream their games, or gather up and have a drawing session with screen share."
      />
      <div style={{ margin: '2rem 0' }}>
        <h2 style={{ textAlign: 'center' }}>Ready to start your journey?</h2>
        <Button text="Open Harmony in your browser" variant="primary" rounded />
      </div>
    </div>
  );
};
