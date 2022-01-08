let addNewCollection = document.getElementById('addCollections');
let addCollectionBtn = document.getElementById('add-collection-btn');
let cancelCollectionBtn = document.getElementById('cancel-collection-btn');
let collectionName = document.getElementById('collection-name');
let collectionContainer = document.querySelector('.collections-container');

addNewCollection.addEventListener('click', openForm);
cancelCollectionBtn.addEventListener('click', closeForm);
addCollectionBtn.addEventListener('click', addCollection);



collectionContainer.innerHTML = "";
displayCollection()

function openForm() {
    console.log('clicked');
    document.getElementById("addCollectionsForm").style.display = "block";
}

function closeForm() {
    document.getElementById("addCollectionsForm").style.display = "none";
}

function addCollection() {
    collectionContainer.innerHTML = "";
    let collectionData = JSON.stringify({});

    let myCollection = collectionName.value;
    localStorage.setItem(`${myCollection}`, collectionData);

    // for (let i = 0; i < localStorage.length; i++) {
    //     // collectionContainer.innerHTML = localStorage.key(i);
    //     // console.log(localStorage.key(i));
    //     let cName = localStorage.key(i);
    //     let div = document.createElement('div');
    //     let span = document.createElement('span');
    //     span.innerHTML = '>'
    //     div.innerHTML = cName;
    //     collectionContainer.appendChild(div);

    // }
    displayCollection();
    closeForm();

}

function displayCollection() {
    for (let i = 0; i < localStorage.length; i++) {
        // collectionContainer.innerHTML = localStorage.key(i);
        // console.log(localStorage.key(i));
        let cName = localStorage.key(i);
        let div = document.createElement('div');
        let arrowSpan = document.createElement('span');
        let contentSpan = document.createElement('span');
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

    console.log(name);
    console.log(obj);

}