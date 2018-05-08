import React, { Component } from 'react';
import {connect} from 'react-redux';
import {notes} from "../actions";


class PonyNote extends Component {

  constructor(props) {
    super(props)
    this.handleClickChange = this.handleClickChange.bind(this)
    this.handleClickReset = this.handleClickReset.bind(this)
    this.state = { progress: 0, time: {}, seconds: 3, cpt: 0 }
    this.state.init = this.state.seconds
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
    this.reset = this.reset.bind(this);
  }

  startTimer() {
    if (this.timer == 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  countDown() {
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.seconds - 1;
    this.setState({ progress: 100-(100/this.state.init)*this.state.seconds+(100/this.state.init) })
    this.setState({
      seconds: seconds,
    });

    // Check if we're at zero.
    if (seconds == 0) {
      clearInterval(this.timer);
      this.state.cpt = this.state.cpt + 1
      this.reset()
    }
  }

  handleClickChange() {
    this.startTimer()
  }

  reset(){
    this.timer = 0;
    this.state.progress = 0
    this.state.seconds = this.state.init
    this.startTimer()
  }

  handleClickReset() {
    this.reset()
  }

  componentDidMount() {
    try {
      this.props.fetchNotes();
    } catch (e) {
      console.log(e);
    }
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
      this.props.addNote(this.state.text).then(this.resetForm)
    } else {
      this.props.updateNote(this.state.updateNoteId, this.state.text).then(this.resetForm);
    }
    this.resetForm();
  }

  render() {
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
        <div id="App">
          time: {this.state.seconds}<br/>
          progress: {this.state.progress}<br/>
          cpt: {this.state.cpt}<br/>
          <button type="button" onClick={this.handleClickChange}>
            Change Progress
          </button>
          <button type="button" onClick={this.handleClickReset}>
            Reset Progress
          </button>
          <hr />
          <ProgressBar progress={this.state.progress} />
        </div></div>
    )
  }
}

const ProgressBar = ({ progress }) => (
  <div className="progressbar">
    <div className="progress" style={{ width: `${progress}%`}}>
    </div>
  </div>
)


const mapStateToProps = state => {
  return {
    notes: state.notes,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addNote: (text) => {
      return dispatch(notes.addNote(text));
    },
    updateNote: (id, text) => {
      return dispatch(notes.updateNote(id, text));
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