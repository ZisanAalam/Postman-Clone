let addNewCollection = document.getElementById('addCollections');
let addCollectionBtn = document.getElementById('add-collection-btn');
let cancelCollectionBtn = document.getElementById('cancel-collection-btn');
let collectionName = document.getElementById('collection-name');
let collectionContainer = document.querySelector('.collections-container');
let container = document.getElementById('blur');
let addCollectionForm = document.getElementById("addCollectionsForm");

//Edit Collection Form
let editCollectionForm = document.getElementById("editCollectionsForm");
let editCollectionBtn = document.getElementById('edit-collection-btn');
let cancleEditCollectionBtn = document.getElementById('cancel-edit-collection-btn');
let collectionNewName = document.getElementById('collection-new-name');
let formErrorMsg = document.getElementById('collection-form-error-msg');

// Variable Form
let addVariableForm = document.getElementById('addVaraiblesForm');
let cancelBtn = document.getElementById('cancel-btn');
let addVariableBtn = document.getElementById('add-variable-btn');



collectionContainer.innerHTML = "";
displayCollection()

addNewCollection.addEventListener('click', openForm);

function openForm() {
    document.getElementById('collection-name').value = '';
    container.classList.add('active');
    addCollectionForm.classList.add('active');
    cancelCollectionBtn.addEventListener('click', closeForm);
    addCollectionBtn.addEventListener('click', addCollection);
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
        // div.setAttribute('id', `${cName}`);

        let arrowSpan = document.createElement('span');
        arrowSpan.setAttribute('class', 'arrows');
        arrowSpan.setAttribute('id', `${cName}-arrow`);

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
        list1.data = cName;
        // div.addEventListener('click', showVariables);
        arrowSpan.addEventListener('click', showVariables);
        contentSpan.addEventListener('click', showVariables);
        list1.addEventListener('click', showVariableForm);
        list2.addEventListener('click', showCollectionEditForm);
        list3.addEventListener('click', deleteCollection);
        // dotSpan.addEventListener('click', showActionForm);

    }
}

function deleteCollection(evt) {
    let collection = evt.currentTarget.parentElement.parentElement;
    let cName = collection.getAttribute('id').split('-')[0];
    collectionContainer.removeChild(collection)
    localStorage.removeItem(cName);
}

function showCollectionEditForm(evt) {
    let collection = evt.currentTarget.parentElement.parentElement;
    let cName = collection.getAttribute('id').split('-')[0];
    document.querySelector('.old-name').innerHTML = `Collection Current Name: ${cName}`;
    openEditForm();
    editCollectionBtn.data = cName;
    editCollectionBtn.addEventListener('click', editCollection);
    cancleEditCollectionBtn.addEventListener('click', closeEditForm);

}

function openEditForm() {
    container.classList.add('active');
    // addCollectionForm.style.display = "block";
    editCollectionForm.classList.add('active');
}

function closeEditForm() {
    setTimeout(() => {
            container.classList.remove('active');
            formErrorMsg.innerText = '';
        }, 300)
        // addCollectionForm.style.display = "block";
    editCollectionForm.classList.remove('active');
}


function editCollection(evt) {
    let cName = editCollectionBtn.data;
    let val = evt.currentTarget.parentElement.children[2].value;
    collectionContainer.innerHTML = "";
    let name = collectionNewName.value;
    if (validateCollectionAddForm(val)) {
        let item = localStorage.getItem(cName);
        localStorage.setItem(`${name}`, item);
        localStorage.removeItem(cName);
        closeEditForm();
    }
    displayCollection();
}


function showVariables(evt) {
    let name = evt.currentTarget.parentElement.children[1].innerHTML;
    let collection = document.getElementById(`${name}-collection`);
    let obj = localStorage.getItem(name);
    obj = JSON.parse(obj);
    const isEmpty = Object.keys(obj).length === 0;

    addVariableBtn.data = name;
    if (evt.currentTarget.parentElement.children[0].innerHTML === '&gt;') {
        evt.currentTarget.parentElement.children[0].innerHTML = '&or;';
        if (!isEmpty) {
            let tableDiv = document.createElement('div');
            tableDiv.setAttribute('id', 'table-div');

            let table = document.createElement('table');
            table.setAttribute('class', 'variable-table');

            for (const [key, value] of Object.entries(obj)) {
                let row = document.createElement('tr');
                row.setAttribute('class', 'var-rows');

                let keySpan = document.createElement('td');
                keySpan.setAttribute('class', 'key-span');

                let valSpan = document.createElement('td');
                valSpan.setAttribute('class', 'val-span');

                keySpan.innerHTML = `${key}`;
                // valSpan.innerHTML = `${value}`;
                let editValSpan = document.createElement('span');
                editValSpan.innerHTML = '<i class="fas fa-pencil-alt"></i>';
                editValSpan.setAttribute('id', 'edit-val');

                let delValSpan = document.createElement('span');
                delValSpan.innerHTML = '<i class="fa fa-times"></i>';
                delValSpan.setAttribute('id', 'del-val');

                valSpan.appendChild(editValSpan);
                valSpan.appendChild(delValSpan);


                row.appendChild(keySpan);
                row.appendChild(valSpan);
                table.appendChild(row);
                tableDiv.appendChild(table)

                collection.appendChild(tableDiv);

                // editValSpan.addEventListener('click', editVariable);
                delValSpan.data = name;
                delValSpan.addEventListener('click', deleteVariable);


            }
        }

    } else {
        evt.currentTarget.parentElement.children[0].innerHTML = '&gt;';
        if (!isEmpty) {
            // collection.removeChild(evt.currentTarget.children[3]);
            collection.removeChild(document.getElementById('table-div'));
        }
    }


}

function showVariableForm(evt) {
    let cName = evt.currentTarget.data;
    // console.log(document.getElementById('action-list-item1').data);
    document.getElementById('variable-name').value = '';
    document.getElementById('variable-address').value = '';
    container.classList.add('active');
    // addCollectionForm.style.display = "block";
    addVariableForm.classList.add('active');
    cancelBtn.addEventListener('click', closeVariableForm);
    addVariableBtn.data = cName;
    addVariableBtn.addEventListener('click', addVariable);
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
    let cName = evt.currentTarget.data
        // let cName = document.getElementById('action-list-item1').data;
    let obj = localStorage.getItem(cName);
    obj = JSON.parse(obj);

    let vName = document.getElementById('variable-name').value;
    let address = document.getElementById('variable-address').value;
    if (isValidVariable(cName, vName, address)) {
        obj[vName] = address;
        localStorage.removeItem(cName);
        localStorage.setItem(cName, JSON.stringify(obj));
        closeVariableForm();
    }

}

function isValidVariable(cName, vName, url) {
    let obj = localStorage.getItem(cName);
    obj = JSON.parse(obj);
    let flag = true;
    if (Object.keys(obj).length === 0) {
        flag = true;
    } else {
        if (vName === "") {
            document.getElementById('variable-error-msg').innerHTML = 'This field cannot be empty';
            flag = false;
        }
        if (url === "") {
            document.getElementById('address-error-msg').innerHTML = 'This field cannot be empty';
            flag = false;
        } else if (Object.keys(obj).includes(vName)) {
            document.getElementById('variable-error-msg').innerHTML = 'Variable name already exist';
            flag = false;
        }

    }
    return flag;
}

function deleteVariable(evt) {
    let key = evt.currentTarget.parentElement.parentElement.children[0].innerHTML;
    let cName = evt.currentTarget.data;
    let obj = localStorage.getItem(cName);
    obj = JSON.parse(obj);
    delete obj[key];
    // localStorage.removeItem(cName);
    localStorage.setItem(cName, JSON.stringify(obj));
    // showVariables();
    location.reload();
    // console.log(evt.currentTarget.parentElement.parentElement.parentElement.parentElement);
}