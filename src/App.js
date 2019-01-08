import React, { Component } from 'react';

class App extends Component {

  state = {
    newInviteeName: '',
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
    hideUnresponded: false,
  };

  handleMainInputChange = (e) => {
    this.setState({
      newInviteeName: e.target.value,
    });
  }

  handleAddNewInvitee = (e) => {
    e.preventDefault();
    this.setState(state => ({
      newInviteeName: '',
      invitees: [
        {
          id: Math.max(...state.invitees.map(invitee => invitee.id)) + 1,
          name: state.newInviteeName,
          isConfirmed: false,
        },
        ...state.invitees,
      ],
    }));

  }

  handleHideUnespondedChange = (e) => {
    this.setState({
      hideUnresponded: e.target.checked,
    });
  }

  changeInviteeConfirmed = (id) => {
    this.setState( state => ({
      invitees: state.invitees.map(invitee => {
        if (invitee.id === id) {
          invitee.isConfirmed = !invitee.isConfirmed;
        }

        return invitee;
      }),
    }));
  }

  handleInviteeEditChange = (name, id) => {
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

  editInvitee = (id) => {
    this.setState( state => ({
      invitees: state.invitees.map(invitee => {
        if (invitee.id === id) {
          invitee.isEditing = !invitee.isEditing;
        }

        return invitee;
      }),
    }));
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
              <input type="text" value={this.state.newInviteeName} placeholder="Invite Someone" onChange={this.handleMainInputChange} />
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
          <table className="counter">
            <tbody>
              <tr>
                <td>Attending:</td>
                <td>{this.state.invitees.filter(i => i.isConfirmed).length}</td>
              </tr>
              <tr>
                <td>Unconfirmed:</td>
                <td>{this.state.invitees.filter(i => !i.isConfirmed).length}</td>
              </tr>
              <tr>
                <td>Total:</td>
                <td>{this.state.invitees.length}</td>
              </tr>
            </tbody>
          </table>
          <ul>
            {this.state.newInviteeName &&
              <li className="pending"><span>{this.state.newInviteeName}</span></li>
            }
            {this.state.invitees
              .filter(invitee => !this.state.hideUnresponded || invitee.isConfirmed)
              .map(person => (
                <li className={person.isConfirmed ? 'responded' : null} key={person.id}>
                  {!person.isEditing
                    ? <span>{person.name}</span>
                    : <input
                        type="text"
                        value={person.name}
                        onChange={(e) => this.handleInviteeEditChange(e.target.value, person.id)}
                      />
                  }
                  <label>
                    <input
                      type="checkbox"
                      checked={person.isConfirmed}
                      onChange={() => this.changeInviteeConfirmed(person.id)}
                    /> Confirmed
                  </label>
                  <button onClick={() => this.editInvitee(person.id)}>
                    {person.isEditing ? 'save' : 'edit'}
                  </button>
                  <button onClick={() => this.removeInvitee(person.id)}>remove</button>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
