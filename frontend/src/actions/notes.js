export const fetchNotes = () => {
    return dispatch => {
        let headers = {"Content-Type": "application/json"};
        return fetch("/api/notes/", {headers, })
            .then(res => res.json())
            .then(notes => {
                return dispatch({
                    type: 'FETCH_NOTES',
                    notes
                })
            })
    }
}

export const addNote = text => {
  return {
    type: 'ADD_NOTE',
    text
  }
}

export const updateNote = (id, text) => {
  return {
    type: 'UPDATE_NOTE',
    id,
    text
  }
}

export const deleteNote = id => {
  return {
    type: 'DELETE_NOTE',
    id
  }
}