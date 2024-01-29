class Humain {
    nom;
    prenom;
    age;
    etat;
    relationsSociales;
    immunite;

    constructor(prenom, nom, age, etat) {
        this.prenom = prenom;
        this.nom = nom;
        this.age = age;
        this.etat = etat;
        this.relationsSociales = [];
        this.immunite = false;
    }

    ajouterAuxRelationsSociales(personne) {
        this.relationsSociales.push(personne);
    }

    estSain() {
        return this.etat === "sain";
    }

    /**
     * Infecter avec un virus.
     * @param virus :string
     */
    infecterAvec(virus) {
        this.etat = virus;
    }
}

const prenoms = ["Emma", "Lucas", "Chloé", "Mathis", "Léa", "Hugo", "Manon", "Enzo", "Jade", "Léo"];
const noms = ["Martin", "Dubois", "Leroy", "Moreau", "Lambert", "Girard", "Dumont", "Petit", "Rousseau", "Leclerc"];

const personnes = [];

const david = new Humain("David", "LEBLANC", 48, "sain");

const eric = new Humain("Éric", "ROUSSEAU", 21, "sain");
const julien = new Humain("Julien", "NIEL", 35, "sain");
david.ajouterAuxRelationsSociales(julien);
david.ajouterAuxRelationsSociales(eric);

const solenne = new Humain("Solenne", "BARBET", 59, "sain");
const ethan = new Humain("Ethan", "THOMAS", 65, "sain");
const dominique = new Humain("Dominique", "NOEL", 15, "sain");
const regine = new Humain("Régine", "DELAUNAY", 26, "sain");
eric.ajouterAuxRelationsSociales(solenne);
eric.ajouterAuxRelationsSociales(ethan);
julien.ajouterAuxRelationsSociales(dominique);
julien.ajouterAuxRelationsSociales(regine);

const abraham = new Humain("Abraham", "FIGUIER", 22, "sain");
const regis = new Humain("Régis", "PERROT", 14, "sain");
dominique.ajouterAuxRelationsSociales(abraham);
dominique.ajouterAuxRelationsSociales(regis);

personnes.push(david);
personnes.push(eric);
personnes.push(julien);
personnes.push(solenne);
personnes.push(ethan);
personnes.push(dominique);
personnes.push(regine);
personnes.push(abraham);
personnes.push(regis);

console.log(personnes);

/**
 * Trouver la personne en haut dans les nœuds sociaux du humain donné.
 * @param humain {Humain} Le humain pour lequel rechercher la personne en haut.
 * @param listeDesHumains {Humain[]} Liste de tous les humains.
 * @returns {Humain|null} La personne en haut dans les nœuds sociaux du humain donné.
 */
function trouverHumainEnHaut(humain, listeDesHumains) {
    const indexHumain = listeDesHumains.indexOf(humain);
    if (indexHumain === -1 || indexHumain === 0) {
        return null;
    }
    return listeDesHumains[indexHumain - 1];
}

/**
 * Trouver la personne en bas dans les nœuds sociaux du humain donné.
 * @param humain {Humain} Le humain pour lequel rechercher la personne en bas.
 * @param listeDesHumains {Humain[]} Liste de tous les humains.
 * @returns {Humain|null} La personne en bas dans les nœuds sociaux du humain donné.
 */
function trouverHumainEnBas(humain, listeDesHumains) {
    const indexHumain = listeDesHumains.indexOf(humain);
    if (indexHumain === -1 || indexHumain === listeDesHumains.length - 1) {
        return null;
    }
    return listeDesHumains[indexHumain + 1];
}



/**
 * Rechercher si une personne a la personne à trouver dans ses nœuds sociaux du bas.
 * @param humainATrouver {Humain} la personne à trouver dans les nœuds sociaux du bas.
 * @param humainActuel {Humain} la personne actuellement recherchée.
 * @returns {Humain} la personne en haut dans les nœuds de la personne à trouver.
 */
function rechercherSiContientHumain(humainATrouver, humainActuel, visitedNodes = new Set()) {
    if (visitedNodes.has(humainActuel)) {
        return null;
    }
    visitedNodes.add(humainActuel);

    for (let social of humainActuel.relationsSociales) {
        if (humainATrouver.nom === social.nom && humainATrouver.prenom === social.prenom) {
            return humainActuel;
        }
        if (social.relationsSociales.length > 0) {
            let humainTrouve = rechercherSiContientHumain(humainATrouver, social, visitedNodes);
            if (humainTrouve) {
                return humainTrouve;
            }
        }
    }

    return null;
}

function trouverPersonneRacineAscendante(humain, listeDesHumains) {
    const visitedNodes = new Set();

    while (humain.relationsSociales.length > 0) {
        const parent = humain.relationsSociales[0];
        if (visitedNodes.has(parent)) {
            break;
        }
        visitedNodes.add(parent);
        humain = parent;
    }

    return humain;
}

/**
 * Infecter les humains.
 * @param nomVirus nom du virus.
 * @param humain {Humain} humain infecté.
 * @param listeDesHumains {Humain[]} liste de tous les humains.
 */
function infecter(nomVirus, humain, listeDesHumains) {
    if (humain.estSain() && !humain.immunite) {
        humain.infecterAvec(nomVirus);
        if (nomVirus == "Zombie-Basique") {
            // Infecter les humains dans les nœuds du bas
            humain.relationsSociales.forEach(humainDansSocial => infecter(nomVirus, humainDansSocial, listeDesHumains));
        }
        if (nomVirus == "Zombie-A") {
            // Infecter les humains dans les nœuds du bas
            const personneEnBas = trouverHumainEnBas(humain, listeDesHumains);
            console.log(personneEnBas);
            if (personneEnBas) {
                infecter(nomVirus, personneEnBas, listeDesHumains);
            }
        }
        if (nomVirus == "Zombie-B") {
            // Infecter les humains dans les nœuds du haut
            const personneEnHaut = trouverHumainEnHaut(humain, listeDesHumains);
            if (personneEnHaut) {
                infecter(nomVirus, personneEnHaut, listeDesHumains);
            }
        }
        if (nomVirus == "Zombie-32") {
            // Infecter du bas vers le haut et du haut vers le bas toutes personnes de 32 ans et plus
                const personneEnHaut = trouverHumainEnHaut(humain, listeDesHumains);
                if (personneEnHaut) {
                    if (personneEnHaut.age >= 32) {
                    infecter(nomVirus, personneEnHaut, listeDesHumains);
                    }
                }
        }
        if (nomVirus == "Zombie-C") {
            // Infecter une personne sur 2 dans le groupe social
            humain.relationsSociales.forEach((humainDansSocial, index) => {
                if (index % 2 === 0) {
                    infecter(nomVirus, humainDansSocial, listeDesHumains);
                }
            });
        }
        if (nomVirus == "Zombie-Ultime") {
            // Infecter seulement la personne racine la plus Ascendante
            const personneRacineAscendante = trouverPersonneRacineAscendante(humain,listeDesHumains);
            if (personneRacineAscendante) {
                infecter(nomVirus, personneRacineAscendante, listeDesHumains);
            }
        }
    }
}

/**
 * Infecter les humains avec le variant A (seuls les nœuds du bas sont infectés).
 * @param humain {Humain} l'humain à infecter.
 * @param listeDesHumains {Humain[]} tous les humains.
 */
function infecterAvecVirusBasique(humain, listeDesHumains) {
    infecter("Zombie-Basique", humain, listeDesHumains)
}

/**
 * Infecter les humains avec le variant A (seuls les nœuds du bas sont infectés).
 * @param humain {Humain} l'humain à infecter.
 * @param listeDesHumains {Humain[]} tous les humains.
 */
function infecterAvecVariantA(humain, listeDesHumains) {
    infecter("Zombie-A", humain, listeDesHumains);
}

/**
 * Infecter les humains avec le variant B (seuls les nœuds du haut sont infectés).
 * @param humain {Humain} l'humain à infecter.
 * @param listeDesHumains {Humain[]} tous les humains.
 */
function infecterAvecVariantB(humain, listeDesHumains) {
    infecter("Zombie-B", humain, listeDesHumains);
}

/**
 * Infecter les humains avec le variant 32 (seuls les 32 ans ou plus sont infectés).
 * @param humain {Humain} l'humain à infecter.
 * @param listeDesHumains {Humain[]} tous les humains.
 */
function infecterAvecVariant32(humain, listeDesHumains) {
    infecter("Zombie-32", humain, listeDesHumains);
}

/**
 * Infecter les humains avec le variant C (50% de chance d'être infecté).
 * @param humain {Humain} l'humain à infecter.
 * @param listeDesHumains {Humain[]} tous les humains.
 */
function infecterAvecVariantC(humain, listeDesHumains) {
    infecter("Zombie-C", humain, listeDesHumains);
}

/**
 * Infecter les humains avec le variant ultime (seul le haut de la personne du nœud est infecté).
 * @param humain {Humain} l'humain à infecter.
 * @param listeDesHumains {Humain[]} tous les humains.
 */
function infecterUltime(humain, listeDesHumains) {
    infecter("Zombie-Ultime", humain, listeDesHumains);
}

/**
 * Vacciner les humains
 * @param listeDesHumains {Humain[]} Humains à vacciner.
 * @param listeDesVirus {string[]} Virus que le vaccin peut guérir.
 * @param efficace {function(humain: Humain) : boolean} Indique si le vaccin fonctionne sur l'humain.
 */
function vacciner(listeDesHumains, listeDesVirus, efficace) {
    listeDesHumains.forEach(humain => {
        if (listeDesVirus.includes(humain.etat) && efficace(humain)) {
            humain.etat = "sain";
            humain.immunite = true;
        }
    });
}


/**
 * Vacciner les humains avec le Vaccin A.1.
 * @param listeDesHumains {Humain[]} Humains à vacciner.
 */
function vaccinerA1(listeDesHumains) {
    vacciner(
        listeDesHumains,
        ["Zombie-A", "Zombie-32"],
        (humain) => humain.age <= 30
    );
}

/**
 * Vacciner les humains avec le Vaccin B.1.
 * @param listeDesHumains {Humain[]} Humains à vacciner.
 */
function vaccinerB1(listeDesHumains) {
    listeDesHumains.forEach(humain => {
        if ((humain.etat === "Zombie-B" || humain.etat === "Zombie-C") && !humain.immunite) {
            humain.etat = "sain";
            if (Math.random() >= 0.5) {
                humain.etat = "mort";
            }
        }
    });
}


/**
 * Vacciner les humains avec le Vaccin Ultime.
 * @param listeDesHumains {Humain[]} Humains à vacciner.
 */
function vaccinerUltime(listeDesHumains) {
    vacciner(
        listeDesHumains,
        ["Zombie-Ultime"],
        () => true
    );
}



const humainAleatoire = personnes[Math.floor(Math.random() * personnes.length)];

console.log("humain choisi : \n");

console.log(humainAleatoire);

// Infecter avec le virus de base
// infecterAvecVirusBasique(humainAleatoire, personnes);

// Infecter avec le Variant A
// infecterAvecVariantA(humainAleatoire, personnes);

// Infecter avec le Variant B
// infecterAvecVariantB(humainAleatoire, personnes);

// Infecter avec le Variant 32
// infecterAvecVariant32(humainAleatoire, personnes);

// Infecter avec le Variant C
// infecterAvecVariantC(humainAleatoire, personnes);

// Infecter avec le Variant Ultime
 infecterUltime(humainAleatoire, personnes);

console.log("Résultats : \n");
console.log(personnes);

// Vacciner avec le Vaccin A1
// vaccinerA1(personnes);

// Vacciner avec le Vaccin B1
// vaccinerB1(personnes);

// Vacciner avec le Vaccin Ultime
 vaccinerUltime(personnes);

console.log("Résultats après vaccin : \n");
console.log(personnes);
