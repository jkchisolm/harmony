import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '../../../components';

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
    <form onSubmit={handleSubmit((d) => console.log(d))}>
      <Input
        register={register}
        name={'email'}
        registerOptions={{}}
        label="Email"
      />
    </form>
  );
};
