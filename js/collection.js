let addNewCollection = document.getElementById('addCollections');
let addCollectionBtn = document.getElementById('add-collection-btn');
let cancelCollectionBtn = document.getElementById('cancel-collection-btn');
let collectionName = document.getElementById('collection-name');
let collectionContainer = document.querySelector('.collections-container');
let container = document.getElementById('blur');
let addCollectionForm = document.getElementById("addCollectionsForm");

//Edit Collection Form
// let editCollectionForm = document.getElementById("editCollectionsForm");
// let editCollectionBtn = document.getElementById('edit-collection-btn');
// let cancleEditCollectionBtn = document.getElementById('cancel-edit-collection-btn');
// let collectionNewName = document.getElementById('collection-new-name');

let addVariableForm = document.getElementById('addVaraiblesForm');
let cancelBtn = document.getElementById('cancel-btn');
let addVariableBtn = document.getElementById('add-variable-btn');

let formErrorMsg = document.getElementById('collection-form-error-msg');

addNewCollection.addEventListener('click', openForm);
cancelCollectionBtn.addEventListener('click', closeForm);
addCollectionBtn.addEventListener('click', addCollection);



collectionContainer.innerHTML = "";
displayCollection()

function openForm() {
    container.classList.add('active');
    // addCollectionForm.style.display = "block";
    addCollectionForm.classList.add('active');
}

function closeForm() {
    // document.getElementById("addCollectionsForm").style.display = "none";
    addCollectionForm.classList.remove('active');
    setTimeout(() => {
        container.classList.remove('active');
        formErrorMsg.innerText = '';
    }, 300)


}

function addCollection() {
    collectionContainer.innerHTML = "";
    let collectionData = JSON.stringify({});
    let myCollection = collectionName.value;
    if (validateCollectionAddForm(myCollection)) {
        localStorage.setItem(`${myCollection}`, collectionData);
        closeForm();
    }
    displayCollection();


}

// validate the add collection form;
function validateCollectionAddForm(name) {
    if (name.length === 0) {
        formErrorMsg.innerText = 'filed cannot be empty';
        return false;
    }
    for (let i = 0; i < localStorage.length; i++) {;
        let cName = localStorage.key(i);
        if (name === cName) {
            formErrorMsg.innerText = 'Collection already exist';
            return false;
        }
    }
    return true;
}

// Display all the collections stored in localStorage
function displayCollection() {
    for (let i = 0; i < localStorage.length; i++) {;
        let cName = localStorage.key(i);
        let div = document.createElement('div');
        div.setAttribute('class', 'collections');
        div.setAttribute('id', `${cName}-collection`);

        let arrowSpan = document.createElement('span');
        arrowSpan.setAttribute('class', 'arrows');

        let contentSpan = document.createElement('span');
        contentSpan.setAttribute('class', 'collection-name');

        // let dotSpan = document.createElement('span');
        // // dotSpan.innerHTML = '&deg;&deg;&deg;'
        // dotSpan.setAttribute('class', 'collection-dots')

        let actionList = document.createElement('ul');
        actionList.setAttribute('id', 'action-list');

        let list1 = document.createElement('li')
        list1.innerHTML = '<i class="fa fa-plus"></i>';
        list1.setAttribute('id', 'action-list-item1')

        let list2 = document.createElement('li')
        list2.innerHTML = '<i class="fa fa-edit"></i>';
        list2.setAttribute('id', 'action-list-item2')

        let list3 = document.createElement('li')
        list3.innerHTML = '<i class="fa fa-trash"></i>';
        list3.setAttribute('id', 'action-list-item3')

        actionList.appendChild(list1);
        actionList.appendChild(list2);
        actionList.appendChild(list3);

        arrowSpan.innerHTML = '&gt;';
        contentSpan.innerHTML = cName;
        div.appendChild(arrowSpan);
        div.appendChild(contentSpan);
        // div.appendChild(dotSpan);
        div.appendChild(actionList);
        collectionContainer.appendChild(div);
        // div.name = cName;

        div.addEventListener('click', showVariables);
        list1.addEventListener('click', showVariableForm);
        // dotSpan.addEventListener('click', showActionForm);

    }
}

function showVariables(evt) {
    let name = evt.currentTarget.children[1].innerHTML;
    // console.log(name);
    let collection = document.getElementById(`${name}-collection`);
    let obj = localStorage.getItem(name);
    addVariableBtn.data = name;
    if (evt.currentTarget.children[0].innerHTML === '&gt;') {
        evt.currentTarget.children[0].innerHTML = '&or;';
        obj = JSON.parse(obj);
        let table = document.createElement('table');
        table.setAttribute('class', 'variable-table');
        for (const [key, value] of Object.entries(obj)) {
            // console.log(`${key}: ${value}`);
            let row = document.createElement('tr');
            let keySpan = document.createElement('td');
            keySpan.setAttribute('class', 'key-span');
            let valSpan = document.createElement('td');
            valSpan.setAttribute('class', 'val-span')

            let txt = document.createElement('textarea');

            keySpan.innerHTML = `${key}`;
            // valSpan.innerHTML = `${value}`;
            let editValSpan = document.createElement('span');
            editValSpan.innerHTML = '<i class="fa fa-pencil"></i>';
            let delValSpan = document.createElement('span');
            delValSpan.innerHTML = '<i class="fa fa-times"></i>';
            valSpan.appendChild(editValSpan);
            valSpan.appendChild(delValSpan);


            row.appendChild(keySpan);
            row.appendChild(valSpan);
            table.appendChild(row);

            collection.appendChild(table);

        }

    } else {
        evt.currentTarget.children[0].innerHTML = '&gt;';
        collection.removeChild(evt.currentTarget.children[3]);
    }


}



cancelBtn.addEventListener('click', closeVariableForm);
addVariableBtn.addEventListener('click', addVariable);


function showVariableForm() {
    container.classList.add('active');
    // addCollectionForm.style.display = "block";
    addVariableForm.classList.add('active');
}

function closeVariableForm() {
    setTimeout(() => {
            container.classList.remove('active');
            formErrorMsg.innerText = '';
        }, 300)
        // addCollectionForm.style.display = "block";
    addVariableForm.classList.remove('active');
}

function addVariable(evt) {
    let cName = addVariableBtn.data;
    let obj = localStorage.getItem(cName);
    console.log(cName, obj)
    obj = JSON.parse(obj);

    let vName = document.getElementById('variable-name').value;
    let address = document.getElementById('variable-address').value;
    console.log(vName, address);
    obj[vName] = address;
    console.log(obj)
    localStorage.removeItem(cName);
    localStorage.setItem(cName, JSON.stringify(obj));
}

// function showActionForm(evt) {
//     let cName = evt.currentTarget.parentElement.children[1].innerText;
//     document.querySelector('.old-name').innerHTML = `Collection Old Name: ${cName}`;
//     openEditForm();
//     editCollectionBtn.data = cName;
//     editCollectionBtn.addEventListener('click', editCollection);

// }

// function openEditForm() {
//     container.classList.add('active');
//     // addCollectionForm.style.display = "block";
//     editCollectionForm.classList.add('active');
// }

// function closeEditForm() {
//     setTimeout(() => {
//             container.classList.remove('active');
//             formErrorMsg.innerText = '';
//         }, 300)
//         // addCollectionForm.style.display = "block";
//     editCollectionForm.classList.remove('active');
// }


// cancleEditCollectionBtn.addEventListener('click', closeEditForm);

// function editCollection(evt) {
//     let cName = editCollectionBtn.data;
//     // console.log(cName);
//     let val = evt.currentTarget.parentElement.children[2].value;
//     collectionContainer.innerHTML = "";
//     let name = collectionNewName.value;
//     if (validateCollectionAddForm(val)) {
//         let item = localStorage.getItem(val);
//         localStorage.setItem(`${name}`, item);
//         localStorage.removeItem(cName);
//         closeEditForm();
//     }
//     displayCollection();
// }