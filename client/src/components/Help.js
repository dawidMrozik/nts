import React from 'react';

export default function Help() {
  return (
    <div className="ui segment">
      <h1>Help page</h1>
      <p>Use the editor like you would normally do.</p>
      <p>
        Once you create your note and apply it with the button 'Create' your
        note will be saved in our datebase.
      </p>
      <p>
        If you want to access saved note in future remember your note ID and
        PASSWORD. To simplify your life we store your created notes in your
        local storage in browser. Your note list displays in the bottom of home
        page.
      </p>
      <p>
        To access one of your notes use URL pattern:
        <div class="ui inverted segment">
          /ID_OF_YOUR_NOTE/PASSWORD_TO_YOUR_NOTE
        </div>
      </p>
      <p>Enjoy</p>
    </div>
  );
}
