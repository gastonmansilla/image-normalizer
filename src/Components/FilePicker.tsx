import React, { useCallback, useMemo } from 'react';
import {
  Button,
  ButtonProps,
  styled,
  Typography,
  TypographyProps,
} from '@material-ui/core';
import { quickIdSync } from '../util/quickId';

export interface FilePickerProps
  extends Omit<ButtonProps<any, TypographyProps>, 'onClick' | 'onChange'> {
  onSelectFile: (file?: File, extension?: string) => void;
  accept: string;
}

const Input = styled('input')(() => ({
  display: 'none',
}));

export const FilePicker = ({
  accept,
  onSelectFile,
  ...props
}: FilePickerProps) => {
  const inputId = useMemo(quickIdSync, []);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const inputFile = event.target.files?.item(0) || undefined;
      const extension =
        inputFile && inputFile.name.substr(inputFile.name.lastIndexOf('.'));
      onSelectFile(inputFile, extension);
    },
    [onSelectFile],
  );

  return (
    <>
      <Input onChange={handleChange} type="file" accept={accept} id={inputId} />
      <label htmlFor={inputId}>
        <Button component={Typography} {...props}></Button>
      </label>
    </>
  );
};
