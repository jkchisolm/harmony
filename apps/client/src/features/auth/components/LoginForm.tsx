import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button, Input } from '../../../components';
import styles from './AuthForm.module.scss';

const schema = z.object({
  email: z.string().email('Please enter a valid email address.'),
  password: z.string().min(8),
});

export const LoginForm = () => {
  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: { email: '', password: '' },
  });

  const handleUserLogin = async (
    email: string,
    password: string
  ): Promise<{ displayName: string; username: string }> => {
    const response = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (response.status === 401) {
      methods.setError('password', { message: 'Incorrect password.' });
    } else if (response.status === 404) {
      methods.setError('email', {
        message: 'There is no user with that email.',
      });
    }

    return response.json();
  };

  const { mutateAsync: loginUser } = useMutation({
    mutationFn: (data: FieldValues) => {
      return handleUserLogin(data.email, data.password);
    },
    onSuccess: async () => {
      window.location.href = '/channels/@me';
    },
  });

  const handleFormSubmit = async (data: FieldValues) => {
    await loginUser(data);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(handleFormSubmit)}
        className={styles.authForm}
      >
        <h1>Welcome back!</h1>
        <h2>We're so excited to see you again!</h2>
        <div>
          <Input name={'email'} registerOptions={{}} label="Email" />
        </div>
        <div>
          <Input
            name="password"
            registerOptions={{}}
            label="Password"
            type="password"
          />
        </div>
        <div>
          <Button text="Login" variant="color" />
        </div>
      </form>
    </FormProvider>
  );
};
