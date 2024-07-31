const biere = document.getElementById("GetBiere");

if (document.readyState === "loading") {
    // Loading hasn't finished yet
    biere.addEventListener('DOMContentLoaded', voirBiere);
  } else {
    voirBiere();
  }

document.addEventListener('DOMContentLoaded', voirBiere);

async function voirBiere() {
    const myHeaders = new Headers();
    myHeaders.append("X-AUTH-TOKEN", "38f1c426526d1aeebb80d777b8733f1ef09fc484");
    myHeaders.append("Content-Type", "application/json");
  
    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
    };
  
    try {
        const response = await fetch("http://localhost:8000/api/biere/get", requestOptions);
        if (!response.ok) {
            throw new Error('Echec concernant le Fetch de biere');
        }
        const result = await response.json();
  
        let content = '';
        result.forEach(item => {
                content += `                            
                    <div>
                        <h1>${item.nom}</h1>
                        <p>${item.origine}</p>         
                        <p>${item.categorie}</p>                                                      
                        <p>${item.description}</p>
                        <p>${item.taux_alcool}</p>
                        <img src="data:image/jpeg;base64,${item.image_data}" class="rounded img-fluid" style="width:auto; height: 250px;">
                    </div> `;
        });     
        document.getElementById("GetBiere").innerHTML = content;
    } catch (error) {
        console.error('Error:', error);
        console.log("Impossible de récupérer les informations des bieres");
    }
}
