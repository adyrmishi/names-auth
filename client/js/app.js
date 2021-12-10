// SETUP
const btn = document.querySelector('#msg-btn');
const form = document.querySelector('#new-name-form');
const namesList = document.querySelector('table');

// Bind event listeners
btn.addEventListener('click', getMessage);
form.addEventListener('submit', submitName);

// Fetch all cats as soon as app is loaded
getAllNames();

// ----------------------

function getAllNames(){
    fetch('http://localhost:8000/names')
        .then(r => r.json())
        .then(appendNames)
        .catch(console.warn)
};

// cretae
function submitName(e){
    e.preventDefault();

    const nameData = {
        name: e.target.name.value
    };

    const options = { 
        method: 'POST',
        body: JSON.stringify(nameData),
        headers: { "Content-Type": "application/json" }
    };

    fetch('http://localhost:8000/names', options)
        .then(r => r.json())
        .then(appendName)
        .then(() => e.target.reset())
        .catch(console.warn)
};

// delete
function deleteName(id, li){
    console.log('deleting', id)
    const options = { 
        method: 'DELETE',
    };
    fetch(`http://localhost:8000/names/${id}`, options)
        .then(li.remove())
        .catch(console.warn)
}

// helpers
function appendNames(data){
    data.names.forEach(appendName);
};

function appendName(nameData){
    const newRow = document.createElement('tr');
    const NameLi = formatNameTr(nameData, newRow)
    namesList.append(newRow);
};


function formatNameTr(name, tr){
    const nameTd = document.createElement('td');
    const delTd = document.createElement('td');
    const delBtn = document.createElement('button');

    delBtn.setAttribute('class', 'delete')
    delBtn.textContent = 'X';
    delBtn.onclick = () => deleteName(name.id, tr);
    delTd.append(delBtn);
    nameTd.textContent = name.name

    tr.append(nameTd)
    tr.append(delTd)

    return tr
}

// MESSAGE FLOW
function getMessage(){
    fetch('http://localhost:8000')
        .then(r => r.text())
        .then(renderMessage)
        .catch(console.warn)
};

function renderMessage(msgText){
    document.querySelector('#msg-btn').textContent = msgText;
};
