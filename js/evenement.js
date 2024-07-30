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
        const response = await fetch("http://localhost:8000/api/evenement/get", requestOptions);
        if (!response.ok) {
            throw new Error('Echec concernant le Fetch de evenement');
        }
        const result = await response.json();
  
        let content = '';
        result.forEach(item => {
                content += `                            
                    <div>
                        <h1 class="pb-5">${item.nom}</h1>
                      
                        <img src="data:image/jpeg;base64,${item.image_data}" class="rounded img-fluid w-50" alt="Image de ${item.id}" >
                 
                        <p class="pt-5">${item.description}</p>
                    </div> `;
        });     
        document.getElementById("GetEvenement").innerHTML = content;
    } catch (error) {
        console.error('Error:', error);
        console.log("Impossible de récupérer les informations des evenements");
    }
}
