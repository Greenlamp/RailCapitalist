import React, { Component } from 'react';
import {connect} from 'react-redux';
import {notes} from "../actions";


class PonyNote extends Component {

  componentDidMount() {
    this.props.fetchNotes();
  }

  state = {
    text: "",
    updateNoteId: null,
  }

  resetForm = () => {
    this.setState({text: "", updateNoteId: null});
  }

  selectForEdit = (id) => {
    let note = this.props.notes[id];
    this.setState({text: note.text, updateNoteId: id});
  }

  submitNote = (e) => {
    e.preventDefault();
    if (this.state.updateNoteId === null) {
      this.props.addNote(this.state.text);
    } else {
      this.props.updateNote(this.state.updateNoteId, this.state.text);
    }
    this.resetForm();
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <h2>Welcome to PonyNote!</h2>
        <hr />

        <h3>Notes</h3>
        <p>ID: {this.state.updateNoteId}</p>
        <table>
          {this.props.notes.map((note, id) => (
            <tr key={`note_${id}`}>
              <td>{id}</td>
              <td>{note.text}</td>
              <td><button onClick={() => this.selectForEdit(id)}>edit</button></td>
              <td><button onClick={() => this.props.deleteNote(id)}>delete</button></td>
            </tr>
          ))}
        </table>
        <h3>Add new note</h3>
        <form onSubmit={this.submitNote}>
          <input
            value={this.state.text}
            placeholder="Enter note here..."
            onChange={(e) => this.setState({text: e.target.value})}
            required />
          <input type="submit" value="Save Note" />
          <button onClick={this.resetForm}>Reset</button>
        </form>
      </div>
    )
  }
}


const mapStateToProps = state => {
  return {
    notes: state.notes,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addNote: (text) => {
      dispatch(notes.addNote(text));
    },
    updateNote: (id, text) => {
      dispatch(notes.updateNote(id, text));
    },
    deleteNote: (id) => {
      dispatch(notes.deleteNote(id));
    },
    fetchNotes: () => {
      dispatch(notes.fetchNotes());
    },
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(PonyNote);