import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button, Input, Select } from '../../../components';
import styles from './AuthForm.module.scss';

const schema = z.object({
  email: z
    .string()
    .email('Please enter a valid email address.')
    .min(1, 'Please enter a valid email address.'),
  displayName: z.string(),
  username: z.string().min(1, 'Please enter a valid username.'),
  password: z.string().min(8),
  birthMonth: z.string().min(1, 'Please enter a valid birth month.'),
  birthDay: z.string().min(1, 'Please enter a valid birth day.'),
  birthYear: z.string().min(1, 'Please enter a valid birth year.'),
});

export const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  return (
    <form
      onSubmit={handleSubmit((d) => console.log(d))}
      className={styles.authForm}
    >
      <h1>Create your account</h1>
      <div>
        <Input
          register={register}
          name="email"
          registerOptions={{ required: true }}
          label="Email"
          required
        />
      </div>
      <div>
        <Input
          register={register}
          name="displayName"
          registerOptions={{ required: false }}
          label="Display Name"
        />
      </div>
      <div>
        <Input
          register={register}
          name="username"
          registerOptions={{ required: true }}
          label="Username"
          required
        />
      </div>
      <div>
        <Input
          register={register}
          name="password"
          registerOptions={{ required: true }}
          label="Password"
          required
        />
      </div>
      <div className={styles.birthdate}>
        <div id={styles.month}>
          <Select
            register={register}
            name="birthMonth"
            options={[
              'January',
              'February',
              'March',
              'April',
              'May',
              'June',
              'July',
              'August',
              'September',
              'October',
              'November',
              'December',
            ]}
            label="Date of Birth"
            placeholder="Month"
            required
          />
        </div>
        <div>
          <Select
            register={register}
            name="birthDay"
            options={[...Array.from(Array(31).keys()).map((n) => n + 1)].map(
              (n) => n.toString()
            )}
            placeholder="Day"
            required
          />
        </div>
        <div id={styles.year}>
          <Select
            register={register}
            name="birthYear"
            options={[
              ...Array.from(Array(100).keys())
                .map((n) => n + new Date().getFullYear() - 99)
                .reverse(),
            ].map((n) => n.toString())}
            placeholder="Year"
            required
          />
        </div>
      </div>
      <div>
        <Button text="Sign up" variant="color" />
      </div>
    </form>
  );
};
