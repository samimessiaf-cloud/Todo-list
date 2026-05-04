let tasks = [];

const taskInput = document.getElementById('taskInput');
const descInput = document.getElementById('descInput');
const statusInput = document.getElementById('statusInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const detailsBox = document.getElementById('detailsBox');

function afficherTaches() {
    taskList.innerHTML = "";
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = "task-item";
        li.innerHTML = `
            <div onclick="selectionnerTache(${task.id})">
                <strong>${task.title}</strong> <br>
                <small>Statut : ${task.status}</small>
            </div>
            <button class="btn-del" onclick="supprimerTache(${task.id})">Supprimer</button>
        `;
        taskList.appendChild(li);
    });
}

function ajouterTache() {
    const titre = taskInput.value.trim();
    const description = descInput.value.trim();
    const statut = statusInput.value;

    if (titre === "") return;

    const nouvelleTache = {
        id: Date.now(),
        title: titre,
        description: description || "Aucune description.",
        status: statut
    };

    tasks.push(nouvelleTache);
    taskInput.value = "";
    descInput.value = "";
    afficherTaches();
}

function supprimerTache(id) {
    tasks = tasks.filter(t => t.id !== id);
    detailsBox.innerHTML = "<p>Sélectionnez une tâche.</p>";
    afficherTaches();
}

function selectionnerTache(id) {
    const taskFound = tasks.find(t => t.id === id);
    if (taskFound) {
        afficherDetails(taskFound);
    }
}

function afficherDetails(task) {
    detailsBox.innerHTML = `
        <h3>${task.title}</h3>
        <p><strong>Description :</strong> ${task.description}</p>
        
        <label><strong>Changer le statut :</strong></label>
        <select onchange="modifierStatut(${task.id}, this.value)">
            <option value="⏳ À commencer" ${task.status === "⏳ À commencer" ? "selected" : ""}>⏳ À commencer</option>
            <option value="🏃 En cours" ${task.status === "🏃 En cours" ? "selected" : ""}>🏃 En cours</option>
            <option value="✅ Terminé" ${task.status === "✅ Terminé" ? "selected" : ""}>✅ Terminé</option>
        </select>
    `;
}

function modifierStatut(id, nouveauStatut) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.status = nouveauStatut;
        afficherTaches();
    }
}

addBtn.addEventListener('click', ajouterTache);
