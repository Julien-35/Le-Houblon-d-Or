const service = document.getElementById("GetService");

if (document.readyState === "loading") {
    // Loading hasn't finished yet
    service.addEventListener('DOMContentLoaded', voirService);
  } else {
    voirService();
  }

document.addEventListener('DOMContentLoaded', voirService);

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
        const response = await fetch("http://localhost:8000/api/service/get", requestOptions);
        if (!response.ok) {
            throw new Error('Echec concernant le Fetch de service');
        }
        const result = await response.json();
  
        let content = '';
        result.forEach(item => {
                content += `                            
                        <div>
                        <h1>${item.nom}</h1>
                        <p>${item.description}</p>
                        </div> `;
        });     
        document.getElementById("GetService").innerHTML = content;
    } catch (error) {
        console.error('Error:', error);
        console.log("Impossible de récupérer les informations des services");
    }
}
