import React from 'react';
import PropTypes from 'prop-types';

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

Invitee.propTypes = {
  invitee: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    isConfirmed: PropTypes.bool.isRequired,
    isEditing: PropTypes.bool.isRequired,
  }).isRequired,
  handleEditing: PropTypes.func.isRequired,
  toggleIsConfirmed: PropTypes.func.isRequired,
  toggleIsEditing: PropTypes.func.isRequired,
  removeInvitee: PropTypes.func.isRequired,
}

export default Invitee;
