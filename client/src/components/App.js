import React from 'react';
import NewNote from './NewNote';
import FetchedNote from './FetchedNote';
import history from '../history';
import { Router, Route, Switch, Link } from 'react-router-dom';
import notesApi from '../axios';
import LocalNotes from './LocalNotes';
import Help from './Help';
import './app.css';

export default class App extends React.Component {
  state = { note: null, pass: '', msg: '', msgColor: '', localNotes: [] };

  componentDidMount() {
    if (localStorage.getItem('localNotes')) {
      this.setState({
        localNotes: JSON.parse(localStorage.getItem('localNotes'))
      });
    }
  }

  onUpdate = (note, noteId) => {
    notesApi.patch(`/${noteId}`, { note });
    this.setState({ msg: 'Note updated' });
  };

  onCreate = async note => {
    const response = await notesApi.post('/', { note });

    const msg = `Note saved, if you want to come back to this note in the future save this ID: ${
      response.data._id
    } and PASSWORD: ${response.data.pass}`;

    this.setState({
      pass: response.data.pass,
      msg,
      msgColor: 'green'
    });

    let localNotes = localStorage.getItem('localNotes');

    if (localNotes) {
      localNotes = JSON.parse(localNotes);
      localNotes.push({ id: response.data._id, pass: response.data.pass });
      this.setState({ localNotes });
      localStorage.setItem('localNotes', JSON.stringify(localNotes));
    } else {
      this.setState({ localNotes });
      localStorage.setItem(
        'localNotes',
        JSON.stringify([{ id: response.data._id, pass: response.data.pass }])
      );
    }

    history.push(`/${response.data._id}/${response.data.pass}`);
  };

  renderMessage = () => {
    if (this.state.msg !== '') {
      return (
        <div class={`ui ${this.state.msgColor} message`}>{this.state.msg}</div>
      );
    } else {
      return;
    }
  };

  newNotepad = () => {
    return <NewNote onCreate={this.onCreate} />;
  };

  fetchedNotepad = props => {
    return <FetchedNote onUpdate={this.onUpdate} {...props} />;
  };

  onLocalNoteSelect = note => {
    console.log(note);
    this.setState({ note });
  };

  render() {
    return (
      <div className="ui container app">
        <Router history={history}>
          <h1>
            <Link to="/">
              <i className="sticky note outline icon" />
              nts
            </Link>
          </h1>
          <h3>simple online notepad</h3>
          <h5>
            <Link to="/help">Need help?</Link>
          </h5>
          {this.renderMessage()}
          <Switch>
            <Route path="/" exact component={this.newNotepad} />
            <Route path="/:id/:pass" exact component={this.fetchedNotepad} />
            <Route path="/help" exact component={Help} />
          </Switch>
          <LocalNotes
            onSelect={this.onLocalNoteSelect}
            localNotes={this.state.localNotes}
          />
        </Router>
      </div>
    );
  }
}
