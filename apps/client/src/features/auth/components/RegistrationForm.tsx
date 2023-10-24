import {
  FormProvider,
  useForm,
  Controller,
  FieldValues,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button, Input, Select } from '../../../components';
import styles from './AuthForm.module.scss';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import { useMutation } from '@tanstack/react-query';

const schema = z
  .object({
    email: z
      .string()
      .email('Please enter a valid email address.')
      .min(1, 'Please enter a valid email address.'),
    displayName: z.string(),
    username: z.string().min(1, 'Please enter a valid username.'),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
    birthDate: z.date(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match!',
    path: ['confirmPassword'],
  });

export const RegistrationForm = () => {
  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      displayName: '',
      username: '',
      password: '',
      birthDate: new Date(),
    },
  });

  const handleUserLogin = async (
    username: string,
    displayName: string,
    email: string,
    password: string,
    birthDate: Date
  ) => {
    const response = await fetch('http://localhost:3000/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        displayName,
        username,
        email,
        password,
        birthdate: birthDate,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (response.status === 409) {
      methods.setError('username', {
        message: 'There is already a user with that username or email!',
      });
      throw new Error('There is already a user with that username or email!');
    }

    return response.json();
  };

  const { mutateAsync: registerUser } = useMutation({
    mutationFn: (data: FieldValues) => {
      return handleUserLogin(
        data.username,
        data.displayName,
        data.email,
        data.password,
        data.birthDate
      );
    },
    onSuccess: async () => {
      window.location.href = '/channels/@me';
    },
  });

  const handleFormSubmit = async (data: FieldValues) => {
    await registerUser(data);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(handleFormSubmit)}
        className={styles.authForm}
      >
        <h1>Create your account</h1>
        <div>
          <Input
            name="email"
            registerOptions={{ required: true }}
            label="Email"
            required
          />
        </div>
        <div>
          <Input
            name="displayName"
            registerOptions={{ required: false }}
            label="Display Name"
          />
        </div>
        <div>
          <Input
            name="username"
            registerOptions={{ required: true }}
            label="Username"
            required
          />
        </div>
        <div>
          <Input
            name="password"
            registerOptions={{ required: true }}
            label="Password"
            type="password"
            required
          />
        </div>
        <div>
          <Input
            name="confirmPassword"
            registerOptions={{ required: true }}
            label="Confirm Password"
            type="password"
            required
          />
        </div>
        <div>
          <Input
            name="birthdate"
            label="Birth Date"
            registerOptions={{ required: true }}
            type="date"
            required
          />
        </div>
        <div>
          <Button text="Sign up" variant="color" />
        </div>{' '}
        <span className={styles.authFormFooter}>
          Already have an acccount? <a href="/login">Click here to log in.</a>
        </span>
      </form>
    </FormProvider>
  );
};
