import React from 'react';
import { NavLink } from 'react-router-dom';
import './app.css';

export default class LocalNotes extends React.Component {
  renderLocalNotesList = () => {
    return this.props.localNotes.map(localNote => (
      <NavLink
        className="item"
        key={localNote.id}
        onClick={() => this.props.onSelect(localNote.id)}
        to={`/${localNote.id}/${localNote.pass}`}
      >
        <i class="right triangle icon" />
        {localNote.id}
      </NavLink>
    ));
  };

  render() {
    return (
      <div
        style={{ marginTop: '10vh' }}
        className="ui clearing segment local-notes"
      >
        <h1>Your notes saved in browser: </h1>
        <div className="ui link list">{this.renderLocalNotesList()}</div>
      </div>
    );
  }
}
