import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button, Input } from '../../../components';
import styles from './LoginForm.module.scss';

const schema = z.object({
  email: z.string().email('Please enter a valid email address.'),
  password: z.string().min(8),
});

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  return (
    <form
      onSubmit={handleSubmit((d) => console.log(d))}
      className={styles.loginForm}
    >
      <h1>Welcome back!</h1>
      <h2>We're so excited to see you again!</h2>
      <div>
        <Input
          register={register}
          name={'email'}
          registerOptions={{}}
          label="Email"
        />
      </div>
      <div>
        <Input
          register={register}
          name="password"
          registerOptions={{}}
          label="Password"
        />
      </div>
      <div>
        <Button text="Login" variant="color" />
      </div>
    </form>
  );
};
