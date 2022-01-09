let addNewCollection = document.getElementById('addCollections');
let addCollectionBtn = document.getElementById('add-collection-btn');
let cancelCollectionBtn = document.getElementById('cancel-collection-btn');
let collectionName = document.getElementById('collection-name');
let collectionContainer = document.querySelector('.collections-container');
let container = document.getElementById('blur');
let addCollectionForm = document.getElementById("addCollectionsForm");
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

        let arrowSpan = document.createElement('span');
        arrowSpan.setAttribute('class', 'arrows');

        let contentSpan = document.createElement('span');
        contentSpan.setAttribute('class', 'collection-name');

        let dotSpan = document.createElement('span');
        // dotSpan.innerHTML = '&deg;&deg;&deg;'
        dotSpan.setAttribute('class', 'collection-dots')

        arrowSpan.innerHTML = '&gt;';
        contentSpan.innerHTML = cName;
        div.appendChild(arrowSpan);
        div.appendChild(contentSpan);
        div.appendChild(dotSpan);
        collectionContainer.appendChild(div);
        // div.name = cName;

        div.addEventListener('click', showVariables);
        dotSpan.addEventListener('click', showActionForm);

    }
}

function showVariables(evt) {
    let name = evt.currentTarget.children[1].innerHTML;
    let obj = localStorage.getItem(name);
    if (evt.currentTarget.children[0].innerHTML === '&gt;') {
        evt.currentTarget.children[0].innerHTML = '&or;';
    } else {
        evt.currentTarget.children[0].innerHTML = '&gt;';
    }

    obj = JSON.parse(obj);
    let len = Object.keys(obj).length;


}

function showActionForm(evt) {
    console.log(evt.currentTarget.parentElement.children[1].innerText);
}