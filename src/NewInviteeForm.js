import React from 'react';

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

export default NewInviteeForm;
