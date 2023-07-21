let addBox = document.querySelector('.add-box');
let popupBox = document.querySelector('.popup-box');
let popupTitle = document.querySelector('.popupTitle');
let closeIcon = document.querySelector('.close-icon');
let titleTag = document.querySelector('input')
let descrTag = document.querySelector('textarea')
let formButton = document.querySelector('form button');

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let notes = JSON.parse(localStorage.getItem('notes') || '[]');
let isUpdate = false;
let updateId = null;


addBox.addEventListener('click', () => {
    titleTag.focus();
    popupBox.classList.add('show');
})

closeIcon.addEventListener('click', () => {
    isUpdate = false;
    titleTag.value = '';
    descrTag.value = '';
    popupTitle.innerText = 'Add a new Note';
    formButton.innerText = 'Add Note';
    popupBox.classList.remove('show');
});

function showNotes() {
    document.querySelectorAll('.note').forEach(note => note.remove());
    notes.forEach((note, index) => {
        let title = note.title;
        let description = note.description;
        let titleHTML = title.replace(/\n/g, '<br/>');
        let descriptionHTML = description.replace(/\n/g, '<br/>');

        let liTag = `<li class="note">
                        <div class="details">
                            <p>${titleHTML}</p>
                            <span>${descriptionHTML}</span>
                        </div>
                        <div class="botton-content">
                            <span>${note.date}</span>
                            <div class="settings">
                                <img src="./assets/dots.svg" alt="" srcset="">
                                <ul class="menu">
                                    <li onclick='updateNote(${index}, \`${title}\`, \`${description}\`)'>
                                        <img src="./assets/pencil.svg" alt="" srcset="">Edit
                                    </li>
                                    <li onclick="deleteNote(${index})">
                                        <img src="./assets/trash.svg" alt="" srcset="">Delete
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </li>`;
        addBox.insertAdjacentHTML('afterend', liTag)
    });
}

function updateNote(noteId, title, desc) {
    addBox.click();
    titleTag.value = title.replace(/<br\/>/g, '\n');
    descrTag.value = desc.replace(/<br\/>/g, '\n');
    popupTitle.innerText = 'Update a Note';
    formButton.innerText = 'Update Note';

    updateId = noteId;
    isUpdate = true;
}

function updateNote(noteId, title, desc) {
    addBox.click();
    titleTag.value = title;
    descrTag.value = desc;
    popupTitle.innerText = 'Update a Note';
    formButton.innerText = 'Update Note';

    updateId = noteId;
    isUpdate = true;
}

function deleteNote(noteId) {
    let confirmDel = confirm('Are you sure you want to delete this note?');

    if (confirmDel) {
        notes.splice(noteId, 1);
        localStorage.setItem('notes', JSON.stringify(notes));
        showNotes();
    }
}

formButton.addEventListener('click', (e) => {
    e.preventDefault();
    let noteTitle = titleTag.value;
    let noteDescr = descrTag.value;

    if (noteTitle || noteDescr) {
        let time = new Date();
        let month = MONTHS[time.getMonth()];
        let day = time.getDay();
        let year = time.getFullYear();

        let noteInfo = {
            title: noteTitle,
            description: noteDescr,
            date: `${month} ${day}, ${year}`
        };

        if (isUpdate) {
            notes[updateId] = noteInfo;
            isUpdate = false;
        }
        else {
            notes.push(noteInfo);
        }

        localStorage.setItem('notes', JSON.stringify(notes));
        closeIcon.click();
        showNotes();
    }
})

showNotes();