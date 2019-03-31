import React from 'react';
import { NavLink } from 'react-router-dom';
import './app.css';

export default class LocalNotes extends React.Component {
  renderDateTimes(updatedAt) {
    const date = new Date(updatedAt);

    return date.toLocaleString();
  }

  renderLocalNotesList = () => {
    if (this.props.localNotes) {
      return this.props.localNotes.map(localNote => (
        <NavLink
          className="item"
          key={localNote.id}
          onClick={() => this.props.onSelect(localNote.id)}
          to={`/${localNote.id}/${localNote.pass}`}
        >
          <i className="right triangle icon" />
          {this.renderDateTimes(localNote.updatedAt)}
        </NavLink>
      ));
    }
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
