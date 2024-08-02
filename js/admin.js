const service=document.getElementById("GetService");

if (document.readyState === "loading") {
    // Loading hasn't finished yet
    service.addEventListener('DOMContentLoaded', voirService);
  } else {
    voirService();
  }



  document.getElementById('submitContactForm').addEventListener('click', async () => {
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

function InscrireUtilisateur(event) {
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

    fetch("https://127.0.0.1:8000/api/registration", requestOptions)
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
                
                Votre compte Arcadia vient d'être créé.`,
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