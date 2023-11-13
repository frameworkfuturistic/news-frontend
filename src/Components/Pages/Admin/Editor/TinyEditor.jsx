import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default function TinyEditor(props) {

  const key = import.meta.env.VITE_REACT_APP_API_KEY;

  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log('editor typing', editorRef.current.getContent());
      props?.tinyChange(editorRef.current.getContent())
    }
  };
  return (
    <>
      <Editor
        apiKey={key}
        onInit={(evt, editor) => editorRef.current = editor}
        onKeyUp={() => log()}
        initialValue=""
        init={{
          height: 200,
          menubar: false,
          statusbar: false,
          branding: false,
          elementpath: false,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount'
          ],
          toolbar: 'undo redo | formatselect | ' +
          'bold italic underline | ' +
          'removeformat',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
      />
      {/* <button onClick={log}>Log editor content</button> */}
    </>
  );
}
