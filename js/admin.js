const service=document.getElementById("GetService");

if (document.readyState === "loading") {
    // Loading hasn't finished yet
    service.addEventListener('DOMContentLoaded', voirService);
  } else {
    voirService();
  }



  document.getElementById('ajoutService').addEventListener('click', async () => {
    const serviceId = document.getElementById('serviceId').value;
    if (serviceId) {
        await modifierService(serviceId);
    } else {
        await creerUnService();
    }
});

async function creerUnService() {
    const form = document.getElementById("postServiceForm");
    const formData = new FormData(form);
    const nom = formData.get('nom');
    const description = formData.get('description');

    if (!nom || !description) {
        alert("Les champs nom et description ne peuvent pas être vides");
        return;
    }

    try {
        await createService(nom, description);
        alert("Le service a été créé avec succès");
        voirService();
    } catch (error) {
        alert("Erreur lors de la création du service");
        console.error(error);
    }
}

async function createService(nom, description) {
    const myHeaders = new Headers();
    myHeaders.append("X-AUTH-TOKEN", "38f1c426526d1aeebb80d777b8733f1ef09fc484");
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "nom": nom,
        "description": description
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    try {
        const response = await fetch(`https://127.0.0.1:8000/api/service`, requestOptions);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.text();
        console.log(result);
    } catch (error) {
        console.error('Error:', error);
    }
}

async function modifierService(serviceId) {
    const form = document.getElementById("postServiceForm");
    const formData = new FormData(form);
    const nom = formData.get('nom');
    const description = formData.get('description');

    if (!nom || !description) {
        alert("Les champs nom et description ne peuvent pas être vides");
        return;
    }

    try {
        await updateService(serviceId, nom, description);
        alert("Le service a été modifié avec succès");
        voirService();
    } catch (error) {
        alert("Erreur lors de la modification du service");
        console.error(error);
    }
}

async function updateService(serviceId, nom, description) {
    const myHeaders = new Headers();
    myHeaders.append("X-AUTH-TOKEN", "38f1c426526d1aeebb80d777b8733f1ef09fc484");
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "nom": nom,
        "description": description
    });

    const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    try {
        const response = await fetch(`https://127.0.0.1:8000/api/service/${serviceId}`, requestOptions);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.text();
        console.log(result);
    } catch (error) {
        console.error('Error:', error);
    }
}

async function voirService() {
    const myHeaders = new Headers();
    myHeaders.append("X-AUTH-TOKEN", "38f1c426526d1aeebb80d777b8733f1ef09fc484");
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
    };

    try {
        const response = await fetch("https://127.0.0.1:8000/api/service/get", requestOptions);
        if (!response.ok) {
            throw new Error('Echec concernant le Fetch de service');
        }
        const result = await response.json();

        let content = '';
        result.forEach(item => {
            content += `
                <div class="py-5">
                    <h1>${item.nom}</h1>
                    <p>${item.description}</p>
                    <button class="btn btn-primary" onclick="editService('${item.id}', '${item.nom}', '${item.description}')">Modifier</button>
                    <button class="btn btn-danger" onclick="validerSuppression('${item.id}')">Supprimer</button>
                </div>`;
        });
        document.getElementById("GetService").innerHTML = content;
    } catch (error) {
        console.error('Error:', error);
        console.log("Impossible de récupérer les informations des événements");
    }
}

function editService(id, nom, description) {
    document.getElementById('serviceId').value = id;
    document.getElementById('nom').value = nom;
    document.getElementById('description').value = description;
}


function validerSuppression(serviceId) {
    // Affiche la modal de confirmation
    const deleteModal = new bootstrap.Modal(document.getElementById('validerSuppressionModal'));
    document.getElementById('validerSuppressionButton').onclick = async () => {
        await supprimerService(serviceId);
        deleteModal.hide();
        voirService(); // Actualiser la liste des services après la suppression
    };
    deleteModal.show();
}

async function supprimerService(serviceId) {
    const myHeaders = new Headers();
    myHeaders.append("X-AUTH-TOKEN", "38f1c426526d1aeebb80d777b8733f1ef09fc484");
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        redirect: "follow"
    };

    try {
        const response = await fetch(`https://127.0.0.1:8000/api/service/${serviceId}`, requestOptions);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.text();
        console.log(result);
    } catch (error) {
        console.error('Error:', error);
    }
}


// fin des fonctions services

const InputPrenom = document.getElementById("PrenomInput");
const InputNom = document.getElementById("NomInput");
const InputEmail = document.getElementById("EmailInput");
const InputPassword = document.getElementById("PasswordInput");
const InputRole = document.getElementById("RoleInput"); 
const btnInscription = document.getElementById("btnInscription");
const FormInscription = document.getElementById("formulaireInscription");

InputPrenom.addEventListener("keyup", validateForm);
InputNom.addEventListener("keyup", validateForm);
InputEmail.addEventListener("keyup", validateForm);
InputPassword.addEventListener("keyup", validateForm);
InputRole.addEventListener("change", validateForm);
btnInscription.addEventListener("click", InscrireUtilisateur);

function validateForm() {
    const PrenomOk = validatePrenom(InputPrenom);
    const NomOk = validateNom(InputNom);
    const pwdOk = validatePassword(InputPassword);
    const mailOk = validateMail(InputEmail);
    const roleOk = validateRole(InputRole);

    btnInscription.disabled = !(PrenomOk && NomOk && pwdOk && mailOk && roleOk);
}

function validateMail(input) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mailUser = input.value;
    if (mailUser.match(emailRegex)) {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;
    } else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }
}

function validatePassword(input) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
    const passwordUser = input.value;
    if (passwordUser.match(passwordRegex)) {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;
    } else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }
}

function validatePrenom(input) {
    if (input.value.trim() !== '') {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;
    } else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }
}

function validateNom(input) {
    if (input.value.trim() !== '') {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;
    } else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }
}

function validateRole(input) {
    if (input.value.trim() !== '') {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;
    } else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }
}

async function InscrireUtilisateur(event) {
    event.preventDefault();

    let dataForm = new FormData(FormInscription);
    let userData = {
        "prenom": dataForm.get("prenom"),
        "nom": dataForm.get("nom"),
        "email": dataForm.get("email"),
        "password": dataForm.get("password"),
        "role": dataForm.get("role")
    };

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify(userData);

    let requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

   await fetch("https://127.0.0.1:8000/api/registration", requestOptions)
        .then(response => {
            if (!response.ok) {
                return response.text().then(errorText => {
                    throw new Error(`Erreur ${response.status}: ${errorText}`);
                });
            }
            return response.json();
        })
        .then(result => {
            console.log("Inscription réussie:", result);

            let templateParams = {
                message: `Bienvenue ${userData.prenom} ${userData.nom} ! 
                
                Votre compte Houblon vient d'être créé.`,
                from_name: `${userData.prenom} ${userData.nom}`,
                to_email: userData.email,
                
            };

            emailjs.send('service_veuyjvv', 'templateId', templateParams)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    alert('Inscription réussie et e-mail envoyé!');
                }, function(error) {
                    console.log('FAILED...', error);
                    alert('Inscription réussie mais échec de l\'envoi du message.');
                });
        })
        .catch(error => {
            console.error('Erreur:', error);
            alert('Erreur lors de l\'inscription. Veuillez vérifier les données.');
        });
}


// Methods CRUD pour les bières 

const biere=document.getElementById("GetBiere");
const origineBiere=document.getElementById("origineBiere");
const categorieBiere=document.getElementById("categorieBiere");

if (document.readyState === "loading") {
    // Loading hasn't finished yet
    categorieBiere.addEventListener('DOMContentLoaded', chargerOptions);
    origineBiere.addEventListener('DOMContentLoaded', chargerOptions);

  } else {
    chargerOptions();
  }

if (document.readyState === "loading") {
    // Loading hasn't finished yet
    biere.addEventListener('DOMContentLoaded', voirBiere);
  } else {
    voirBiere();
  };





document.getElementById('ajoutBiere').addEventListener('click', async () => {
    const biereId = document.getElementById('biereId').value;
    if (biereId) {
        await modifierBiere(biereId);
    } else {
        await creerUneBiere();
    }
});

document.addEventListener('DOMContentLoaded', chargerOptions);

document.addEventListener('DOMContentLoaded', async () => {
    await chargerOptions();
    await voirBiere();
});

async function chargerOptions() {
    try {
        await loadOptions("origineBiere", "https://127.0.0.1:8000/api/origine/get");
        await loadOptions("categorieBiere", "https://127.0.0.1:8000/api/categorie/get");
    } catch (error) {
        console.error('Erreur lors du chargement des options:', error);
        alert('Impossible de charger les options.');
    }
}

async function loadOptions(selectId, url) {
    const myHeaders = new Headers({
        "X-AUTH-TOKEN": "38f1c426526d1aeebb80d777b8733f1ef09fc484",
        "Content-Type": "application/json"
    });

    try {
        const response = await fetch(url, { method: 'GET', headers: myHeaders });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        const selectElement = document.getElementById(selectId);
        
        if (!selectElement) {
            console.error(`Element with id ${selectId} not found.`);
            return;
        }

        // Vider les options existantes pour éviter les doublons
        selectElement.innerHTML = '';

        data.forEach(item => {
            const option = document.createElement("option");
            option.value = item.id; // Assurez-vous que item.id existe
            option.textContent = item.label || item.nom || 'No label'; // Utiliser item.label ou item.nom
            selectElement.appendChild(option);
        });

        console.log(`Options loaded for ${selectId}:`, data);

    } catch (error) {
        console.error('Error fetching options:', error);
        alert(`Impossible de charger les options pour ${selectId}.`);
    }
}

document.getElementById('ajoutBiere').addEventListener('click', async () => {
    const biereId = document.getElementById('biereId').value;
    if (biereId) {
        await modifierBiere(biereId);
    } else {
        await creerUneBiere();
    }
});

async function creerUneBiere() {
    const form = document.getElementById("postBiereForm");
    const formData = new FormData(form);
    const nom = formData.get('nomBiere');
    const description = formData.get('descriptionBiere');
    const taux_alcool = formData.get('taux_alcool');
    const origine = formData.get('origineBiere');
    const stock = formData.get('stockBiere');
    const categorie = formData.get('categorieBiere');
    const image_data = await getBase64Image(formData.get('imageBiere'));

    if (!nom || !description || !taux_alcool || !origine || !stock || !categorie || !image_data) {
        alert("Tous les champs doivent être remplis.");
        return;
    }

    try {
        await createBiere(nom, description, taux_alcool, origine, stock, categorie, image_data);
        alert("La bière a été créée avec succès.");
        voirBiere();
    } catch (error) {
        alert("Erreur lors de la création de la bière.");
        console.error(error);
    }
}


async function createBiere(nom, description, taux_alcool, origine, categorie, image_data) {
    const myHeaders = new Headers({
        "X-AUTH-TOKEN": "38f1c426526d1aeebb80d777b8733f1ef09fc484",
        "Content-Type": "application/json"
    });

    const stock = { quantite: '0' };

    const raw = JSON.stringify({
        "nom": nom,
        "description": description,
        "taux_alcool": taux_alcool,
        "origine": origine,
        "stock": stock,  // Associer le nouvel objet Stock
        "categorie": categorie,
        "image_data": image_data,
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    try {
        const response = await fetch("https://127.0.0.1:8000/api/biere", requestOptions);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.text();
        console.log(result);
    } catch (error) {
        console.error('Error:', error);
    }
}



async function modifierBiere(biereId) {
    const form = document.getElementById("postBiereForm");
    const formData = new FormData(form);
    const nom = formData.get("nomBiere");
    const description = formData.get("descriptionBiere");
    const taux_alcool = formData.get("taux_alcool");
    const origine = formData.get('origineBiere');
    const stock = formData.get('stockBiere');
    const categorie = formData.get('categorieBiere');
    const image_data = await getBase64Image(formData.get("imageBiere"));

    if (!nom || !description || !taux_alcool || !origine || !stock || !categorie || !image_data) {
        alert("Tous les champs doivent être remplis.");
        return;
    }

    try {
        await updateBiere(biereId, nom, description, taux_alcool, origine, stock, categorie, image_data);
        alert("La bière a été modifiée avec succès.");
        voirBiere();
    } catch (error) {
        alert("Erreur lors de la modification de la bière.");
        console.error(error);
    }
}

async function updateBiere(biereId, nom, description, taux_alcool, origine, stock, categorie, image_data) {
    const myHeaders = new Headers({
        "X-AUTH-TOKEN": "38f1c426526d1aeebb80d777b8733f1ef09fc484",
        "Content-Type": "application/json"
    });

    const raw = JSON.stringify({
        "nom": nom,
        "description": description,
        "taux_alcool": taux_alcool,
        "origine": origine,
        "stock": stock,
        "categorie": categorie,
        "image_data": image_data,
    });

    const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    try {
        const response = await fetch(`https://127.0.0.1:8000/api/biere/${biereId}`, requestOptions);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.text();
        console.log(result);
    } catch (error) {
        console.error('Error:', error);
    }
}

async function voirBiere() {
    const myHeaders = new Headers({
        "X-AUTH-TOKEN": "38f1c426526d1aeebb80d777b8733f1ef09fc484",
        "Content-Type": "application/json"
    });

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
    };

    try {
        const response = await fetch("https://127.0.0.1:8000/api/biere/get", requestOptions);
        if (!response.ok) {
            throw new Error('Echec concernant le Fetch de biere');
        }
        const result = await response.json();

        let content = '';
        result.forEach(item => {
            content += `
            <div class="p-5">
                <h1>${escapeHtml(item.nom ?? '')}</h1>
                <p>${escapeHtml(item.origine ?? '')}</p>         
                <p>${escapeHtml(item.categorie ?? '')}</p>     
                <p>${escapeHtml(item.description ?? '')}</p>
                <p>${escapeHtml(item.taux_alcool ?? 'N/A')}</p>         
                <img src="data:image/jpeg;base64,${escapeHtml(item.image_data ?? '')}" class="rounded img-fluid w-50" alt="Image de ${escapeHtml(item.nom ?? '')}">
                <div class="py-2">
                <p>${escapeHtml(item.stock ?? 'Stock inconnu')}</p>                                                                                  
                <button class="btn btn-primary" onclick="editBiere('${item.id}', \`${escapeHtml(item.nom ?? '')}\`, \`${escapeHtml(item.description ?? '')}\`, \`${escapeHtml(item.taux_alcool ?? 'N/A')}\`, '${item.image_data}', '${escapeHtml(item.origine ?? 'Origine inconnue')}', '${escapeHtml(item.stock ?? 'Stock inconnu')}', '${escapeHtml(item.categorie ?? 'Catégorie inconnue')}')">Modifier</button>
                <button class="btn btn-danger" onclick="validerSuppressionBiere('${item.id}')">Supprimer</button>
                </div>
            </div>`;
        });
        document.getElementById("GetBiere").innerHTML = content;
    } catch (error) {
        console.error('Error:', error);
        console.log("Impossible de récupérer les informations des bières");
    }
}


    function editBiere(id, nom, description, taux_alcool, image_data, origine, stock, categorie) {
        document.getElementById('biereId').value = id;
        document.getElementById('nomBiere').value = nom;
        document.getElementById('descriptionBiere').value = description;
        document.getElementById('taux_alcool').value = taux_alcool;
        document.getElementById('origineBiere').value = origine;
        document.getElementById('stockBiere').value = stock;
        document.getElementById('categorieBiere').value = categorie;
    }

    function validerSuppressionBiere(biereId) {
        const deleteModal = new bootstrap.Modal(document.getElementById('validerSuppressionBiereModal'));
        document.getElementById('validerSuppressionBiereButton').onclick = async () => {
            await supprimerBiere(biereId);
            deleteModal.hide();
            voirBiere(); 
        };
        deleteModal.show();
    }
    
    async function supprimerBiere(biereId) {
        const myHeaders = new Headers({
            "X-AUTH-TOKEN": "38f1c426526d1aeebb80d777b8733f1ef09fc484",
            "Content-Type": "application/json"
        });
    
        const requestOptions = {
            method: "DELETE",
            headers: myHeaders,
            redirect: "follow"
        };
    
        try {
            const response = await fetch(`https://127.0.0.1:8000/api/biere/${biereId}`, requestOptions);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.text();
            console.log(result);
        } catch (error) {
            console.error('Error:', error);
        }
    }

// Fonction utilitaire pour convertir une image en base64
function getBase64Image(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result.split(',')[1]);
        reader.onerror = error => reject(error);
    });
}


function escapeHtml(unsafe) {
    if (typeof unsafe !== 'string') {
        return ''; // ou une chaîne par défaut
    }
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// début fonction des évênements 



const evenement=document.getElementById("GetEvenement");

if (document.readyState === "loading") {
    // Loading hasn't finished yet
    evenement.addEventListener('DOMContentLoaded', voirEvenement);
  } else {
    voirEvenement();
  }



document.addEventListener('DOMContentLoaded', voirEvenement);

document.getElementById('ajoutEvenement').addEventListener('click', async () => {
    const evenementId = document.getElementById('evenementId').value;
    if (evenementId) {
        await modifierEvenement(evenementId);
    } else {
        await creerUnEvenement();
    }
});

async function creerUnEvenement() {
    const form = document.getElementById("postEvenementForm");
    const formData = new FormData(form);
    const nom = formData.get('nomEvenement');
    const description = formData.get('descriptionEvenement');
    const image_data = await getBase64Image(formData.get('imageEvenement'));

    if (!nom || !description) {
        alert("Tous les champs doivent être remplis.");
        return;
    }

    try {
        await createEvenement(nom, description , image_data);
        alert("La bière a été créée avec succès.");
        voirEvenement();
    } catch (error) {
        alert("Erreur lors de la création de la bière.");
        console.error(error);
    }
}

async function createEvenement(nom, description , image_data) {
    const myHeaders = new Headers();
    myHeaders.append("X-AUTH-TOKEN", "38f1c426526d1aeebb80d777b8733f1ef09fc484");
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "nom": nom,
        "description": description,
        "image_data": image_data,
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    try {
        const response = await fetch("https://127.0.0.1:8000/api/evenement", requestOptions);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.text();
        console.log(result);
    } catch (error) {
        console.error('Error:', error);
    }
}

async function modifierEvenement(evenementId) {
    const form = document.getElementById("postEvenementForm");
    const formData = new FormData(form);
    const nom = formData.get("nomEvenement");
    const description = formData.get("descriptionEvenement");
    const image_data = await getBase64Image(formData.get("imageEvenement"));

    if (!nom || !description
    ) {
        alert("Tous les champs doivent être remplis.");
        return;
    }

    try {
        await updateEvenement(evenementId, nom, description );
        alert("L'évènement a été modifiée avec succès.");
        voirEvenement();
    } catch (error) {
        alert("Erreur lors de la modification de l'évènement.");
        console.error(error);
    }
}

async function updateEvenement(evenementId, nom, description) {
    const myHeaders = new Headers();
    myHeaders.append("X-AUTH-TOKEN", "38f1c426526d1aeebb80d777b8733f1ef09fc484");
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "nom": nom,
        "description": description,
    });

    const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    try {
        const response = await fetch(`https://127.0.0.1:8000/api/evenement/${evenementId}`, requestOptions);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.text();
        console.log(result);
    } catch (error) {
        console.error('Error:', error);
    }
}

async function voirEvenement() {
    const myHeaders = new Headers();
    myHeaders.append("X-AUTH-TOKEN", "38f1c426526d1aeebb80d777b8733f1ef09fc484");
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
    };

    try {
        const response = await fetch("https://127.0.0.1:8000/api/evenement/get", requestOptions);
        if (!response.ok) {
            throw new Error('Echec concernant le Fetch de evenement');
        }
        const result = await response.json();

        let content = '';
        result.forEach(item => {
            content += `
                <div class="p-5">
                    <h1>${escapeHtml(item.nom)}</h1>
                    <p>${escapeHtml(item.description)}</p>
                    <img src="data:image/jpeg;base64,${escapeHtml(item.image_data)}" class="rounded img-fluid w-50" alt="Image de ${escapeHtml(item.nom)}">
                    <div class="py-2">
                    <button class="btn btn-primary" onclick="editEvenement('${item.id}', \`${escapeHtml(item.nom)}\`, \`${escapeHtml(item.description)}\`, '${item.image_data}')">Modifier</button>
                    <button class="btn btn-danger" onclick="validerSuppression('${item.id}')">Supprimer</button>
                    </div>
                </div>`;
        });
        document.getElementById("GetEvenement").innerHTML = content;
    } catch (error) {
        console.error('Error:', error);
        console.log("Impossible de récupérer les informations des événements");
    }
}

function editEvenement(id, nom, description) {
    document.getElementById('evenementId').value = id;
    document.getElementById('nomEvenement').value = nom;
    document.getElementById('descriptionEvenement').value = description;
}

function validerSuppression(evenementId) {
    const deleteModal = new bootstrap.Modal(document.getElementById('validerSuppressionModal'));
    document.getElementById('validerSuppressionButton').onclick = async () => {
        await supprimerEvenement(evenementId);
        deleteModal.hide();
        voirEvenement(); 
    };
    deleteModal.show();
}

async function supprimerEvenement(evenementId) {
    const myHeaders = new Headers();
    myHeaders.append("X-AUTH-TOKEN", "38f1c426526d1aeebb80d777b8733f1ef09fc484");
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        redirect: "follow"
    };

    try {
        const response = await fetch(`https://127.0.0.1:8000/api/evenement/${evenementId}`, requestOptions);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.text();
        console.log(result);
    } catch (error) {
        console.error('Error:', error);
    }
}