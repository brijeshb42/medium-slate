import './App.css';

import React, { Component } from 'react';
import Slate, { Editor, Raw, Plain } from 'slate'

import {
  bold,
  italic,
  underline,
  code,
} from './marks';

import {
  paragraph,
  quote,
  pullquote,
  code as codeBlock,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
} from './blocks';

import MarkHotKeyPlugin from './plugins/MarkHotKey';
import BackSpacePlugin from './plugins/BackSpace.js';
// import rules from './rules/html';

// const html = new Html({ rules });
window.Slate = Slate;

// const initialState = `
// <h1>Heading 1</h1>
// <h2>Heading 2</h2>
// <h3>Heading 3</h3>
// <h4>Heading 4</h4>
// <h5>Heading 5</h5>
// <h6>Heading 6</h6>
// <p>Paragraph</p>
// <q>pullquote</q>
// <blockquote>Block quote</blockquote>
// <p>paragraph</p>
// <blockquote><h3>Heading inside bq</h3><q>Pq</q></blockquote>
// `;

class App extends Component {
  state = {
    state: Plain.deserialize(''),
    schema: {
      marks: {
        bold,
        italic,
        underline,
        code,
      },
      nodes: {
        paragraph,
        quote,
        pullquote,
        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        code: codeBlock,
      },
    }
  }

  plugins = [
    MarkHotKeyPlugin({ type: 'bold', key: 66 }),
    MarkHotKeyPlugin({ type: 'italic', key: 73 }),
    MarkHotKeyPlugin({ type: 'underline', key: 85 }),
    MarkHotKeyPlugin({ type: 'code', key: 74 }),
    BackSpacePlugin(),
  ]

  componentDidMount() {
    this._editor.focus();
    window.onChange = this.onChange;
  }

  onChange = (state) => {
    this.setState({ state })
    window.state = state;
  }

  onDocumentChange = (document, state) => {
    const string = JSON.stringify(Raw.serialize(state));
    localStorage.setItem('content', string)
  }

  log = () => {
    console.log(Raw.serialize(this.state.state));
  };

  render() {
    const { state: { state, schema }, onChange, log, plugins, onDocumentChange} = this;
    return (
      <div className="app">
        <div className="toolbar">
          <button onClick={log}>Log</button>
        </div>
        <div className="ms-editor-root markdown-body">
          <Editor
            ref={e => {
              this._editor = e;
            }}
            plugins={plugins}
            schema={schema}
            state={state}
            onChange={onChange}
            onDocumentChange={onDocumentChange}
            placeholder={"Type Something..."}
          />
        </div>
      </div>
    );
  }
}

export default App;
