let addNewCollection = document.getElementById('addCollections');
let addCollectionBtn = document.getElementById('add-collection-btn');
let cancelCollectionBtn = document.getElementById('cancel-collection-btn');
let collectionName = document.getElementById('collection-name');
let collectionContainer = document.querySelector('.collections-container');
let container = document.getElementById('blur');
let addCollectionForm = document.getElementById("addCollectionsForm");

addNewCollection.addEventListener('click', openForm);
cancelCollectionBtn.addEventListener('click', closeForm);
addCollectionBtn.addEventListener('click', addCollection);



collectionContainer.innerHTML = "";
displayCollection()

function openForm() {
    container.classList.add('active');
    addCollectionForm.style.display = "block";
}

function closeForm() {
    container.classList.remove('active');
    document.getElementById("addCollectionsForm").style.display = "none";
}

function addCollection() {
    collectionContainer.innerHTML = "";
    let collectionData = JSON.stringify({});

    let myCollection = collectionName.value;
    if (validateCollectionAddForm()) {
        localStorage.setItem(`${myCollection}`, collectionData);
        displayCollection();
        closeForm();
    } else {}


}

function validateCollectionAddForm() {
    return true;
}

function displayCollection() {
    for (let i = 0; i < localStorage.length; i++) {
        // collectionContainer.innerHTML = localStorage.key(i);
        // console.log(localStorage.key(i));
        let cName = localStorage.key(i);
        let div = document.createElement('div');
        div.setAttribute('class', 'collections');

        let arrowSpan = document.createElement('span');
        arrowSpan.setAttribute('class', 'arrows');

        let contentSpan = document.createElement('span');
        contentSpan.setAttribute('class', 'collection-name');

        arrowSpan.innerHTML = '&gt;';
        contentSpan.innerHTML = cName;
        div.appendChild(arrowSpan);
        div.appendChild(contentSpan);
        collectionContainer.appendChild(div);
        // div.name = cName;

        div.addEventListener('click', showVariables);

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