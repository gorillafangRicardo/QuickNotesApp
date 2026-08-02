let notes = []
let editingNoteId = null

function loadNotes(){
    const savedNotes = localStorage.getItem('quickNotes')
    return saveNotes ? JSON.parse(savedNotes) : []
}

function saveNote(event){
    event.preventDefault()

    const title = document.getElementById('noteTitle').value.trim();
    const content = document.getElementById('noteContent').value.trim();

    if(editingNoteId){
        //update exitisng note

        const noteIndex = notes.findIndex(note => note.id === editingNoteId)
        notes[noteIndex] = {
            ...notes[noteIndex],
            title: title,
            content: content
        }
    }else{
    notes.unshift({
        id: generateId(),
        title: title,
        content: content
    })

    }

    closeNoteDialog()
    saveNotes()
    renderNotes()
}

function generateId(){
    return Date.now().toString()
}

function saveNotes(){
    localStorage.setItem('quickNotes', JSON.stringify(notes))
}


function deleteNote(noteId){
    notes = notes.filter(note => note.id != noteId)
    saveNotes()
    renderNotes()
}

function renderNotes(){
    const notesContainer = document.getElementById('notesContainer');

    if(notes.length === 0){
        notesContainer.innerHTML = `
        <div class="empty/state">
    <h2>No Notes Yet</h2>
    <p>Create your first note to get started!</p>
    <button class="add-note-btn" onclick="openNoteDialog()">Add Your First Note</button>
</div>
        `

        return
    }

    notesContainer.innerHTML = notes.map (note => `
        <div class="note-card">
        <h3 class="note-title">${note.title}</h3>
        <p class="note-content">${note.content}</p>
        <div class="note-actions">

        <button class="edit-btn" onClick="openNoteDialog('${note.id}')" title="Edit Note">
        <svg
  xmlns="http://www.w3.org/2000/svg"
  width="16"
  height="16"
  viewBox="0 0 24 24"
  fill="currentColor"

>
  <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
  <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
  <path d="M16 5l3 3" />
</svg>
        </button>



    <button class="delete-btn" onClick="deleteNote('${note.id}')" title="Delete Note">
<svg
  xmlns="http://www.w3.org/2000/svg"
  width="16"
  height="16"
  viewBox="0 0 24 24"
  fill="currentColor"
>
  <path d="M20 6a1 1 0 0 1 .117 1.993l-.117 .007h-.081l-.919 11a3 3 0 0 1 -2.824 2.995l-.176 .005h-8c-1.598 0 -2.904 -1.249 -2.992 -2.75l-.005 -.167l-.923 -11.083h-.08a1 1 0 0 1 -.117 -1.993l.117 -.007h16zm-9.489 5.14a1 1 0 0 0 -1.218 1.567l1.292 1.293l-1.292 1.293l-.083 .094a1 1 0 0 0 1.497 1.32l1.293 -1.292l1.293 1.292l.094 .083a1 1 0 0 0 1.32 -1.497l-1.292 -1.293l1.292 -1.293l.083 -.094a1 1 0 0 0 -1.497 -1.32l-1.293 1.292l-1.293 -1.292l-.094 -.083z" />
  <path d="M14 2a2 2 0 0 1 2 2a1 1 0 0 1 -1.993 .117l-.007 -.117h-4l-.007 .117a1 1 0 0 1 -1.993 -.117a2 2 0 0 1 1.85 -1.995l.15 -.005h4z" />
</svg>
        </button>
        </div>
            </div>
        `).join('')
}

function openNoteDialog(noteId = null){
    const dialog = document.getElementById('noteDialog');
    const titleInput = document.getElementById('noteTitle');
    const contentInput = document.getElementById('noteContent')

if(noteId){
    //edit mode
    const noteToEdit = notes.find(note => note.id === noteId)
    editingNoteId = noteId
    document.getElementById('dialogTitle').textContent = 'Edit Note'
    titleInput.value = noteToEdit.title
    contentInput.value = noteToEdit.content
}
else{
    //add mode
    editingNoteId = null
    document.getElementById('dialogTitle')

}

    dialog.showModal()
    titleInput.focus()
}

function closeNoteDialog(){
    document.getElementById('noteDialog').close()
}



document.addEventListener('DOMContentLoaded', function(){

    notes = loadNotes();
    renderNotes()

    document.getElementById('noteForm').addEventListener('submit', saveNote)

    document.getElementById('noteDialog').addEventListener('click', function(event){
        if(event.target === this){
            closeNoteDialog()
        }
    })
})