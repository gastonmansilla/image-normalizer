import React, { useCallback, useRef, useState } from 'react';
import {
  Button,
  createStyles,
  Grid,
  makeStyles,
  Slider,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from '@material-ui/core';
import AvatarEditor from 'react-avatar-editor';
import { FilePicker } from './Components/FilePicker';
import { downloadFile } from './util/downloadFile';
import { GitHub } from '@material-ui/icons';

const useStyles = makeStyles(theme =>
  createStyles({
    editorStep: {
      height: 200,
    },
    footer: {
      margin: theme.spacing(1, 0),
    },
    github: {
      fill: theme.palette.primary.main,
      color: theme.palette.primary.main,
    },
    root: {
      height: '100vh',
      overflow: 'hidden scroll',
    },
  }),
);

const App = () => {
  const styles = useStyles();
  const [file, setFile] = useState<File>();
  const [scale, setScale] = useState<number>(1.2);
  const [fileName, setFileName] = useState('0001-');
  const avatarEditor = useRef<AvatarEditor>(null);

  const onSave = useCallback(() => {
    if (!file || !avatarEditor.current || !fileName) {
      return;
    }
    const scaled = avatarEditor.current.getImageScaledToCanvas();
    const blob = scaled.toDataURL('jpeg');
    downloadFile(blob, fileName, 'jpeg');
  }, [file, fileName]);

  const onScaleChange = useCallback((_, value: number | number[]) => {
    if (typeof value === 'object') {
      value = value[0];
    }
    setScale(value);
  }, []);

  const onFileNameChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setFileName(event.target.value);
    },
    [],
  );

  return (
    <Grid
      className={styles.root}
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      wrap="nowrap"
    >
      <Stepper orientation="vertical" nonLinear>
        <Step active>
          <StepLabel />
          <StepContent>
            <FilePicker
              accept="image/*"
              onSelectFile={setFile}
              color="primary"
              variant="contained"
            >
              Seleccionar archivo...
            </FilePicker>
          </StepContent>
        </Step>
        <Step active>
          <StepLabel>Ajustar</StepLabel>
          <StepContent className={styles.editorStep}>
            {file && (
              <>
                <AvatarEditor
                  ref={avatarEditor}
                  image={file}
                  width={91}
                  height={91}
                  border={50}
                  color={[255, 255, 255, 0.6]} // RGBA
                  scale={scale}
                  rotate={0}
                ></AvatarEditor>
                <Slider
                  value={scale}
                  step={0.1}
                  max={3}
                  min={0.5}
                  onChange={onScaleChange}
                />
              </>
            )}
          </StepContent>
        </Step>
        <Step active>
          <StepLabel />
          <StepContent>
            <TextField
              label="Nombre del archivo"
              onChange={onFileNameChange}
              value={fileName}
            />
          </StepContent>
        </Step>
        <Step active>
          <StepLabel />
          <StepContent>
            <Button onClick={onSave} variant="contained" color="primary">
              Guardar
            </Button>
          </StepContent>
        </Step>
      </Stepper>
      <Grid
        item
        container
        justifyContent="center"
        alignItems="center"
        className={styles.footer}
        spacing={1}
      >
        <Grid item>
          <Typography variant="caption" color="primary">
            Gastón Mansilla - MIT Licence
          </Typography>
        </Grid>
        <Grid item>
          <a
            href="https://github.com/gastonmansilla/image-normalizer"
            rel="noreferrer"
            target="_blank"
          >
            <GitHub color="primary" />
          </a>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default App;
