import React, { Component } from 'react';
import Invitee from './Invitee';
import NewInviteeForm from './NewInviteeForm';
import InviteeCounter from './InviteeCounter';

class App extends Component {

  state = {
    pendingInvitee: '',
    invitees: [],
    onlyShowConfirmed: false,
  };

  generateId() {
    const ids = this.state.invitees.map(invitee => invitee.id);
    return ids.length ? Math.max(...ids) + 1 : 0;
  }

  handlePendingInvitee = (e) => {
    this.setState({
      pendingInvitee: e.target.value,
    });
  }

  handleNewInvitee = (e) => {
    e.preventDefault();
    this.setState(state => ({
      pendingInvitee: '',
      invitees: [
        {
          id: this.generateId(),
          name: state.pendingInvitee,
          isConfirmed: false,
          isEditing: false,
        },
        ...state.invitees,
      ],
    }));

  }

  handleOnlyShowConfirmedChange = (e) => {
    this.setState({
      onlyShowConfirmed: e.target.checked,
    });
  }

  toggleProperty = (property, id) => {
    this.setState( state => {
      const invitees = state.invitees.map(invitee => {
        if (invitee.id === id) {
          invitee[property] = !invitee[property];
        }

        return invitee;
      });

      return { invitees };
    });
  }

  toggleIsConfirmed = (id) => this.toggleProperty('isConfirmed', id);

  toggleIsEditing = (id) => this.toggleProperty('isEditing', id);

  handleEditing = (name, id) => {
    this.setState( state => {
      const invitees = state.invitees.map(invitee => {
        if (invitee.id === id) {
          invitee.name = name;
        }

        return invitee;
      });

      return { invitees };
    })
  }

  removeInvitee = (id) => {
    this.setState( state => ({
      invitees: state.invitees.filter(invitee => invitee.id !== id),
    }));
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1>RSVP</h1>
          <p><a className="github-link" href="https://github.com/willgorham/demo-rsvp-app/">View the source on GitHub</a></p>
          <NewInviteeForm
            pendingInvitee={this.state.pendingInvitee}
            handleNewInvitee={this.handleNewInvitee}
            handlePendingInvitee={this.handlePendingInvitee}
          />
        </header>
        <div className="main">
          <div>
            <h2>Invitees</h2>
            <label>
              <input type="checkbox" onChange={this.handleOnlyShowConfirmedChange} /> Hide those who haven't responded
            </label>
          </div>
          <InviteeCounter invitees={this.state.invitees} />
          <ul>
            {this.state.pendingInvitee &&
              <li className="pending"><span>{this.state.pendingInvitee}</span></li>
            }
            {this.state.invitees
              .filter(invitee => !this.state.onlyShowConfirmed || invitee.isConfirmed)
              .map(invitee => (
                <Invitee
                  invitee={invitee}
                  key={invitee.id}
                  handleEditing={this.handleEditing}
                  toggleIsConfirmed={this.toggleIsConfirmed}
                  toggleIsEditing={this.toggleIsEditing}
                  removeInvitee={this.removeInvitee}
                />
              ))
            }
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
