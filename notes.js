const notesContainer = document.getElementById('note-big-boxContainer');
const addbtn = notesContainer.querySelector(".add-note");

getNotes().forEach(note => {
    const noteElement=createNoteElement(note.id,note.content);
    notesContainer.insertBefore(noteElement,addbtn);
});

addbtn.addEventListener("click",()=>addNote());
function getNotes() {
    return JSON.parse(localStorage.getItem("sticky-notes") || "[]");


}
function saveNotes(notes) {
    localStorage.setItem('sticky-notes', JSON.stringify(notes));

}
function createNoteElement(id, content) {
    const element = document.createElement("textarea");
    element.classList.add("notes");
    element.value = content;
    element.placeholder = "Empty Sticky Note";

    element.addEventListener("change", () => {
        updateNote(id, element);
    });

    element.addEventListener('dblclick', () => {
        const dodelete = confirm("Are you sure you want to delete?");
        if (dodelete) {
            deleteNote(id, element);
        }

    })
    
    return element;

}
function addNote() {
    const Notes = getNotes();
    const noteObj = {
        id: Math.floor(Math.random() * 10000),
        content: ""
    };
    const noteElement=createNoteElement(noteObj.id,noteObj.content);
    notesContainer.insertBefore(noteElement,addbtn);

    Notes.push(noteObj);
    saveNotes(Notes);

}
function updateNote(id, newContent) {
    const notes=getNotes();
    const targetNote=notes.filter(note=>note.id==id)[0];

    targetNote.content=newContent;
    saveNotes(notes);

}
function deleteNote(id, element) {
    const notes=notes.filter(note=>note.id==id)[0];

    saveNotes(notes);
    notesContainer.removeChild(element);


}