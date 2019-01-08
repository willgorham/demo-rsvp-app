import React from 'react';
import PropTypes from 'prop-types';

function InviteeCounter({ invitees }) {
  const inviteeCount = invitees.length;
  const attendingCount = invitees.filter(i => i.isConfirmed).length;

  return (
    <table className="counter">
      <tbody>
        <tr>
          <td>Attending:</td>
          <td>{attendingCount}</td>
        </tr>
        <tr>
          <td>Unconfirmed:</td>
          <td>{inviteeCount - attendingCount}</td>
        </tr>
        <tr>
          <td>Total:</td>
          <td>{inviteeCount}</td>
        </tr>
      </tbody>
    </table>
  );
}

InviteeCounter.propTypes = {
  invitees: PropTypes.arrayOf(PropTypes.shape({
    isConfirmed: PropTypes.bool.isRequired,
  })).isRequired,
}

export default InviteeCounter;
