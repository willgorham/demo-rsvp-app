import React from 'react';

function Invitee({
  invitee,
  handleEditing,
  toggleIsConfirmed,
  toggleIsEditing,
  removeInvitee
}) {

  return (
    <li className={invitee.isConfirmed ? 'responded' : null} key={invitee.id}>
      {
        invitee.isEditing
          ? <input
              type="text"
              value={invitee.name}
              onChange={(e) => handleEditing(e.target.value, invitee.id)}
            />
          : <span>{invitee.name}</span>
      }
      <label>
        <input
          type="checkbox"
          checked={invitee.isConfirmed}
          onChange={() => toggleIsConfirmed(invitee.id)}
        /> Confirmed
      </label>
      <button onClick={() => toggleIsEditing(invitee.id)}>
        {invitee.isEditing ? 'save' : 'edit'}
      </button>
      <button onClick={() => removeInvitee(invitee.id)}>remove</button>
    </li>
  );
}

export default Invitee;
