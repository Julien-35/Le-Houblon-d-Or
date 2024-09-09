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
    // myHeaders.append("X-AUTH-TOKEN", "6e406826e6f00ad66b88299970102d0e675c7062");
    // myHeaders.append("Content-Type", "application/json");
  
    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        mode:"cors"
    };
  
    try {
        const response = await fetch("https://127.0.0.1:8000/api/horaire/get", requestOptions);
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
