import * as z from 'zod';
import styles from './CreateServerModal.module.scss';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input } from '../../../../components';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const schema = z.object({
  name: z
    .string()
    .min(3, 'Server name must be at least three characters.')
    .max(30),
  description: z.string().nullable(),
});

type Props = {
  closeModal: () => void;
};

export const CreateServerForm = (props: Props) => {
  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: { name: '', description: '' },
  });

  const queryClient = useQueryClient();

  const handleCreateServer = async (name: string, description: string) => {
    const response = await fetch('http://localhost:3000/servers', {
      method: 'POST',
      body: JSON.stringify({ name, description }),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (response.status === 401) {
      throw new Error('You must be logged in to create a server.');
    }

    return response.json();
  };

  const { mutateAsync: createServer } = useMutation({
    mutationFn: (data: FieldValues) => {
      return handleCreateServer(data.name, data.description);
    },
    onSuccess: async () => {
      console.log('Server created!');
      await queryClient.refetchQueries({ queryKey: ['getUserServers'] });
      props.closeModal();
    },
  });

  const handleFormSubmit = async (data: FieldValues) => {
    await createServer(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleFormSubmit)}>
        <h2>Picture Upload (coming soon)</h2>
        <div>
          <Input
            name={'name'}
            placeholder={'Server Name'}
            label="Server Name"
          />
        </div>
        <div>
          <Input
            name={'description'}
            placeholder={'Description'}
            label="Description"
          />
        </div>
        <div>
          <Button text="Create Server" variant="color" />
        </div>
      </form>
    </FormProvider>
  );
};
