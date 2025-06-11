import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, onValue, remove } from "firebase/database";

const firebaseConfig = {
    databaseURL: ProcessingInstruction.env.FIREBASE_URL
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