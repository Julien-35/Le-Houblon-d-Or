const horaire = document.getElementById("GetHoraire");


if (document.readyState === "loading") {
    // Loading hasn't finished yet
    horaire.addEventListener('DOMContentLoaded', voirHoraire);
  } else {
    voirHoraire();
  }

document.addEventListener('DOMContentLoaded', voirHoraire);

async function voirHoraire() {
    const myHeaders = new Headers();
    myHeaders.append("X-AUTH-TOKEN", "38f1c426526d1aeebb80d777b8733f1ef09fc484");
    myHeaders.append("Content-Type", "application/json");
  
    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
    };
  
    try {
        const response = await fetch("http://localhost:8000/api/horaire/get", requestOptions);
        if (!response.ok) {
            throw new Error('Echec concernant le Fetch de horaire');
        }
        const result = await response.json();
  
        let content = '';
        result.forEach(item => {
                content += `                            
               
                        <h3 class="">${item.titre}</h3>
                        <p class="">${item.message} <br>${item.jour}  <br> ${item.heureDebut} - ${item.heureFin} </p>
                   `;
        });     
        document.getElementById("GetHoraire").innerHTML = content;
    } catch (error) {
        console.error('Error:', error);
        console.log("Impossible de récupérer les informations des horaires");
    }
}
