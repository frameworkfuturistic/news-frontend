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
        onInit={(evt, editor) => {
          editorRef.current = editor;
          // Set the initial content
          editor.setContent(props?.initial ?? "");
        }}
        initialValue={props?.initial ?? ""}
        onKeyUp={() => log()}
        onProgressState={false}
        init={{
          selector: 'textarea#default',
          language: "hi_IN",
          height: props?.height || 400,
          forced_root_block: 'div',
          plugins: [
            'paste', 'advlist', 'autolink', 'link', 'image', 'lists', 'charmap', 'prewiew', 'anchor', 'pagebreak',
            'searchreplace', 'wordcount', 'visualblocks', 'code', 'fullscreen', 'insertdatetime', 'media',
            'table', 'emoticons', 'template', 'codesample', 'uploadimage', 'initialvalues' // Added 'initialvalues' plugin
          ],
          theme_advanced_buttons1: "newdocument,|,bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,|,styleselect,formatselect,fontselect,fontsizeselect",
          toolbar: 'undo redo | styles | bold italic underline | alignleft aligncenter alignright alignjustify |' +
            'bullist numlist outdent indent | link image | print preview media fullscreen uploadimage| ' +
            'forecolor backcolor emoticons',
          menu: {
            favs: { title: 'menu', items: 'code visualaid | searchreplace | emoticons' }
          },
          menubar: 'favs file edit view insert format tools table',
          content_style: 'body{font-family:Helvetica,Arial,sans-serif; font-size:16px}',
          promotion: false,
          branding: false,
          automatic_uploads: true,
          paste_data_images: true,
        }}
      />
      {/* <button onClick={log}>Log editor content</button> */}
    </>
  );
}
