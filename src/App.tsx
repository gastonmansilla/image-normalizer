/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, {
  ChangeEventHandler,
  useCallback,
  useRef,
  useState,
} from 'react';
import './App.css';
import AvatarEditor from 'react-avatar-editor';

export function downloadFile(url: string, filename: string, extension: string) {
  const fullName = `${filename}.${extension}`;
  // if (navigator.msSaveBlob) {
  //   // IE 10+
  //   navigator.msSaveBlob(blob, fullName);
  // } else {
  const link = document.createElement('a');
  if (link.download !== undefined) {
    // feature detection
    // Browsers that support HTML5 download attribute
    link.setAttribute('href', url);
    link.setAttribute('download', fullName);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  // }
}

const App = () => {
  const [file, setFile] = useState<File | null>(null);
  const avatarEditor = useRef<AvatarEditor>(null);

  const onImageChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    event => {
      const selectedFile = event.target.files && event.target.files[0];
      setFile(selectedFile);
      return;
    },
    [],
  );

  const onSave = useCallback(() => {
    if (!file || !avatarEditor.current) {
      return;
    }

    const scaled = avatarEditor.current.getImageScaledToCanvas();
    const blob = scaled.toDataURL('jpeg');
    downloadFile(blob, 'myfile', 'jpeg');
  }, [file, avatarEditor.current]);

  return (
    <div className="App">
      <input type="file" onChange={onImageChange} />
      {file && (
        <AvatarEditor
          ref={avatarEditor}
          image={file}
          width={91}
          height={91}
          border={100}
          color={[255, 255, 255, 0.6]} // RGBA
          scale={1.5}
          rotate={0}
        ></AvatarEditor>
      )}
      <input type="button" onClick={onSave} value="Guardar" />
    </div>
  );
};

export default App;
