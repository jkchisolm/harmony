import { useRef } from 'react';
import { Input, Button } from '../../../../../components';

type Props = {
  handleUpload: (e: any) => void;
};

export const UploadImageButton = ({ handleUpload }: Props) => {
  const hiddenFileInput = useRef(null);

  const handleClick = (e: any) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    hiddenFileInput.current.click();
  };

  const handleChange = (e: any) => {
    const fileUploaded = e.target.files[0];
    handleUpload(fileUploaded);
  };

  return (
    <div>
      {/* <Input
        name={'image'}
        placeholder={'image'}
        type="file"
        otherProps={{
          hidden: true,
          onChange: handleUpload,
          id: 'imageInput',
          style: { display: 'none' },
        }}
      /> */}
      <Button
        text="Upload Image"
        variant="color"
        otherProps={{}}
        onClick={handleClick}
      />
    </div>
  );
};
