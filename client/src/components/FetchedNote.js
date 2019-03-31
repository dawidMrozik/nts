import React from 'react';
import notesApi from '../axios';
import RichTextEditor from 'react-rte';
import './app.css';

export default class FetchedNote extends React.Component {
  state = { fetchedNote: RichTextEditor.createEmptyValue() };

  async componentDidMount() {
    const { id, pass } = this.props.match.params;
    const response = await notesApi.get(`/${id}/${pass}`);

    this.setState({
      fetchedNote: RichTextEditor.createValueFromString(
        response.data.note,
        'html'
      )
    });
  }

  async componentDidUpdate() {
    const response = await notesApi.post(`/${this.props.match.params.id}`, {
      pass: this.props.match.params.pass
    });

    this.setState({
      fetchedNote: RichTextEditor.createValueFromString(
        response.data.note,
        'html'
      )
    });
  }

  onSave = () => {
    this.props.onUpdate(
      this.state.fetchedNote.toString('html'),
      this.props.match.params.id
    );
  };

  render() {
    if (!this.state.fetchedNote) {
      return <div>Note not found :(</div>;
    }

    return (
      <div>
        <RichTextEditor
          value={this.state.fetchedNote}
          onChange={value => this.setState({ fetchedNote: value })}
        />
        <button
          onClick={this.onSave}
          class="ui right labeled right floated icon yellow button spaced"
        >
          <i class="right save icon" />
          Save
        </button>
      </div>
    );
  }
}
