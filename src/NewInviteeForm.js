import React from 'react';
import PropTypes from 'prop-types';

function NewInviteeForm({
  pendingInvitee,
  handleNewInvitee,
  handlePendingInvitee
}) {

  return (
    <form onSubmit={handleNewInvitee}>
      <input type="text" value={pendingInvitee} placeholder="Invite Someone" onChange={handlePendingInvitee} />
      <button type="submit" name="submit" value="submit">Submit</button>
    </form>
  );
}

NewInviteeForm.propTypes = {
  pendingInvitee: PropTypes.string.isRequired,
  handleNewInvitee: PropTypes.func.isRequired,
  handlePendingInvitee: PropTypes.func.isRequired,
}

export default NewInviteeForm;
