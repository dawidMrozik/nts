import React from 'react';
import RichTextEditor from 'react-rte';
import './app.css';

class NewNote extends React.Component {
  state = {
    value: RichTextEditor.createEmptyValue()
  };

  onSave = () => {
    this.props.onCreate(this.state.value.toString('html'));
  };

  render() {
    return (
      <div>
        <RichTextEditor
          value={this.state.value}
          onChange={value => this.setState({ value })}
        />
        <div className="space" />
        <button
          onClick={this.onSave}
          className="ui right labeled right floated icon green button"
          style={{ marginTop: '2vh' }}
        >
          <i className="right plus square icon" />
          Create
        </button>
      </div>
    );
  }
}

export default NewNote;
