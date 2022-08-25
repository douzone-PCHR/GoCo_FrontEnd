import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

class ShowEditorComponent extends Component {
  modules = {
    toolbar: '',
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
    const { value } = this.props; // 전달 받은 프롭스

    return (
      <ReactQuill
        style={{ height: '400px', background: 'white', backgroundSize: '100%' }}
        theme="snow"
        modules={this.modules}
        formats={this.formats}
        value={value}
      />
    );
  }
}
export default ShowEditorComponent;
