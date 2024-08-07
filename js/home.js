const avis = document.getElementById("GetAvis");

if (document.readyState === "loading") {
    // Loading hasn't finished yet
    avis.addEventListener('DOMContentLoaded', GetAvis);
  } else {
    voirAvis();
  }

document.addEventListener('DOMContentLoaded', voirAvis);

async function voirAvis() {
    const myHeaders = new Headers();
    myHeaders.append("X-AUTH-TOKEN", "38f1c426526d1aeebb80d777b8733f1ef09fc484");
    myHeaders.append("Content-Type", "application/json");
  
    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
        mode:"cors"
    };
  
    try {
        const response = await fetch("https://127.0.0.1:8000/api/avis/get", requestOptions);
        if (!response.ok) {
            throw new Error('Failed to fetch avis');
        }
        const result = await response.json();
  
        let content = '';
        result.forEach(item => {
            if (item.isVisible === true) {
                content += `
                    <ol class="list-group">
                        <li class="list-group-item justify-content-between align-items-start text-dark m-2 border border-primary">
                            <div class="ms-2 p-2">
                                <div class="fw-bold">${item.pseudo}</div>
                                <p>${item.commentaire}</p>
                            </div>
                        </li>
                    </ol>`;
            }
        });     
        document.getElementById("GetAvis").innerHTML = content;
    } catch (error) {
        console.error('Error:', error);
        console.log("Impossible de récupérer les informations d'avis");
    }
}

document.getElementById('avisForm').addEventListener('submit', async function(event) {
    event.preventDefault();
  
    const pseudo = document.getElementById('pseudo').value;
    const commentaire = document.getElementById('commentaire').value;
  
    const avisData = {
        pseudo: pseudo,
        commentaire: commentaire,
        isVisible: false  // Par défaut, l'avis n'est pas visible jusqu'à validation
    };
  
    const myHeaders = new Headers();
    myHeaders.append("X-AUTH-TOKEN", "38f1c426526d1aeebb80d777b8733f1ef09fc484");
    myHeaders.append("Content-Type", "application/json");
  
    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(avisData),
        redirect: "follow",
    };
  
    try {
        const response = await fetch("https://127.0.0.1:8000/api/avis", requestOptions);
        if (!response.ok) {
            throw new Error('Failed to send avis');
        }
  
        const myModal = new bootstrap.Modal(document.getElementById('MessageAvis'));
        myModal.show();
  
    } catch (error) {
        console.error('Error:', error);
        alert("Impossible d'envoyer l'avis. Veuillez réessayer plus tard.");
    }
});



const evenement = document.getElementById("GetEvenement");

if (document.readyState === "loading") {
    // Loading hasn't finished yet
    evenement.addEventListener('DOMContentLoaded', voirEvenement);
  } else {
    voirEvenement();
  }

document.addEventListener('DOMContentLoaded', voirEvenement);

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
                    <div class="d-flex justify-content-normal align-items-baseline"> 
                        <h3 class="pe-5">-    ${item.nom} :</h3>
                        <p>${item.description}</p>
                    </div> `;
        });     
        document.getElementById("GetEvenement").innerHTML = content;
    } catch (error) {
        console.error('Error:', error);
        console.log("Impossible de récupérer les informations des evenements");
    }
}
