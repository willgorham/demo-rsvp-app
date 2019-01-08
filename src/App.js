import React, { Component } from 'react';
import Invitee from './Invitee';
import InviteeCounter from './InviteeCounter';

class App extends Component {

  state = {
    pendingInvitee: '',
    invitees: [
      {
        id: 1,
        name: 'Joel',
        isConfirmed: false,
        isEditing: false,
      },
      {
        id: 2,
        name: 'Corrina',
        isConfirmed: true,
        isEditing: false,
      },
      {
        id: 3,
        name: 'Iver',
        isConfirmed: true,
        isEditing: true,
      }
    ],
    onlyShowConfirmed: false,
  };

  handleMainInputChange = (e) => {
    this.setState({
      pendingInvitee: e.target.value,
    });
  }

  handleAddNewInvitee = (e) => {
    e.preventDefault();
    this.setState(state => ({
      pendingInvitee: '',
      invitees: [
        {
          id: Math.max(...state.invitees.map(invitee => invitee.id)) + 1,
          name: state.pendingInvitee,
          isConfirmed: false,
        },
        ...state.invitees,
      ],
    }));

  }

  handleHideUnespondedChange = (e) => {
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
    this.setState( state => {
      const index = state.invitees.findIndex(invitee => invitee.id === id);
      return {
        invitees: [...state.invitees.slice(0, index), ...state.invitees.slice(index + 1)],
      };
    });
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1>RSVP</h1>
          <p>A Treehouse App</p>
          <form onSubmit={this.handleAddNewInvitee}>
              <input type="text" value={this.state.pendingInvitee} placeholder="Invite Someone" onChange={this.handleMainInputChange} />
              <button type="submit" name="submit" value="submit">Submit</button>
          </form>
        </header>
        <div className="main">
          <div>
            <h2>Invitees</h2>
            <label>
              <input type="checkbox" onChange={this.handleHideUnespondedChange} /> Hide those who haven't responded
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
