import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";;
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {
    databaseURL: 'https://leads-tracker-app-6d446-default-rtdb.europe-west1.firebasedatabase.app/'
}

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const leadsDBRef = ref(database, 'leads');

const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");

function render(leads) {
    let listItems = leads.map( lead => 
        `
            <li>
                <a target='_blank' href='${lead}'>
                    ${lead}
                </a>
            </li>
        `
    ).join('');
    ulEl.innerHTML = listItems;
}

onValue(leadsDBRef, function (snapshot) {
    const snapshotExists = snapshot.exists();
    if (snapshotExists) {
        console.log('exists')
        const snapshotVals = snapshot.val();
        const leads = Object.values(snapshotVals);
        render(leads);
    };
})

deleteBtn.addEventListener("dblclick", function() {
    remove(leadsDBRef);
    ulEl.innerHTML = '';
})

inputBtn.addEventListener("click", function() {
    push(leadsDBRef, inputEl.value);
    inputEl.value = "";
})