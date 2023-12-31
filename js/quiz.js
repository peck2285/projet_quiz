// Récupération des éléments du DOM par leurs IDs
var skip = document.getElementById('skip');
var score = document.getElementById('score');
var totalScore = document.getElementById('totalScore');
var countdown = document.getElementById('countdown');

// Variables de suivi du quiz
var count = 0; // Pour suivre l'étape actuelle du quiz
var scoreCount = 0; // Pour suivre le score du joueur
var duration = 0; // Pour le compte à rebours
var qaset = document.querySelectorAll(".qa_set"); // Sélection de tous les ensembles de questions

// Sélection de toutes les réponses possibles dans les ensembles de questions
var qaAnsRow = document.querySelectorAll(".qa_set .qa_ans_row input");

// Ajout d'un gestionnaire d'événements sur le bouton "Skip"
skip.addEventListener("click", function(){
    // Appelle la fonction step() et initialise la durée à 10 secondes
    step();
    duration = 10;
});

// Ajout d'un gestionnaire d'événements sur chaque réponse possible
qaAnsRow.forEach(qaAnsRowSingle => {
    qaAnsRowSingle.addEventListener("click", function(){
        // Après un délai de 500 millisecondes, appelle la fonction step() et réinitialise la durée à 0
        setTimeout(function(){
            step();
            duration = 0;
        }, 500);

        // Récupère l'attribut "valid" de la réponse cliquée
        var valid = this.getAttribute("valid");
        
        // Met à jour le score en fonction de la validité de la réponse
        if (valid == "valid") {
            scoreCount += 20;
        } else {
            scoreCount -= 20;
        }

        // Met à jour l'affichage du score
        score.innerHTML = scoreCount;
        totalScore.innerHTML = scoreCount;
    });
});

// Fonction qui avance à la question suivante
function step(){
    count += 1;
    // Réinitialise les classes de tous les ensembles de questions
    for (var i = 0; i < qaset.length; i++) {
        qaset[i].className = 'qa_set';
    }

    // Active la classe sur le prochain ensemble de questions
    qaset[count].className = "qa_set active";

    // Si nous atteignons la 5e question, masque le bouton "Skip", arrête le compte à rebours et réinitialise le score final
    if (count == 5) {
        skip.style.display = "none";
        clearInterval(durationTime);
        countdown.innerHTML = 0;
        totalScore.innerHTML = scoreCount;
    }
}

// Compte à rebours qui appelle la fonction step() lorsqu'il atteint 10 secondes
var durationTime = setInterval(function(){
    if (duration == 10) {
        duration = 0;
    }

    duration += 1;

    countdown.innerHTML = duration;

    if (countdown.innerHTML == "10") {
        step();
    }

}, 1000);
