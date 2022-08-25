import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

class EditorComponent extends Component {
  constructor(props) {
    super(props);
  }

  modules = {
    toolbar: [
      [{ font: [] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['link', 'image'],
      [{ align: [] }, { color: [] }, { background: [] }], // dropdown with defaults from theme
      ['clean'],
    ],
  };

  formats = [
    'bold',
    'header',
    'font',
    'size',
    'italic',
    'underline',
    'strike',
    'align',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'background',
    'color',
    'link',
    'image',
    'video',
    'width',
  ];

  render() {
    const { value, onChange } = this.props; // 전달 받은 프롭스
    return (
      <ReactQuill
        style={{ height: '400px', background: 'white', backgroundSize: '100%' }}
        theme="snow"
        modules={this.modules}
        formats={this.formats}
        value={value || ''}
        onChange={(content, delta, source, editor) => onChange(editor.getHTML())}
      />
    );
  }
}
export default EditorComponent;
