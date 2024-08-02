const avis = document.getElementById("GetAvis");

if (document.readyState === "loading") {
  // Loading hasn't finished yet
  avis.addEventListener('DOMContentLoaded', voirAvis);
} else {
  voirAvis();
}

function getToken() {
  return localStorage.getItem('apiToken');
}

async function fetchData(url, headers) {
  const requestOptions = {
    method: "GET",
    headers: headers,
    redirect: "follow",
    mode: "cors",
  };

  try {
    const response = await fetch(url, requestOptions);
    if (!response.ok) throw new Error("Impossible de récupérer les informations");
    return response.json();
  } catch (error) {
    console.error("Fetch Error:", error);
    throw error;
  }
}


async function voirAvis() {
  const myHeaders = new Headers();
  myHeaders.append("X-AUTH-TOKEN", getToken());
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
  };

  try {
      const response = await fetch("https://127.0.0.1:8000/api/avis/get", requestOptions);
      if (!response.ok) throw new Error('Failed to fetch avis');
      
      const result = await response.json();
      let content = '';
      result.forEach(item => {
          const buttonText = item.isVisible ? "Cacher l'avis" : "Afficher l'avis";
          const buttonClass = item.isVisible ? 'btn btn-danger toggle-avis-button' : 'btn btn-success toggle-avis-button';
          content += `
              <ol class="list-group">
                  <li class="list-group-item justify-content-between align-items-start text-dark">
                      <div class="ms-2">
                          <div class="fw-bold">${item.pseudo}</div>
                         <p> ${item.commentaire}</p>
                      </div>
                      <button class="${buttonClass}" data-avis-id="${item.id}" data-avis-visible="${item.isVisible}">
                          ${buttonText}
                      </button>
                  </li>
              </ol>`;
      });
      document.getElementById("GetAvis").innerHTML = content;

      document.querySelectorAll('.toggle-avis-button').forEach(button => {
          button.addEventListener('click', async () => {
              const avisId = button.getAttribute('data-avis-id');
              const currentVisibility = JSON.parse(button.getAttribute('data-avis-visible'));
              const newValue = !currentVisibility;

              try {
                  const putRequestOptions = {
                      method: 'PUT',
                      headers: {
                          'Content-Type': 'application/json',
                          'X-AUTH-TOKEN': '38f1c426526d1aeebb80d777b8733f1ef09fc484'
                      },
                      body: JSON.stringify({ isVisible: newValue })
                  };

                  const response = await fetch(`https://127.0.0.1:8000/api/avis/${avisId}`, putRequestOptions);
                  if (!response.ok) throw new Error(`Failed to toggle visibility for avis ${avisId}`);

                  button.setAttribute('data-avis-visible', newValue);
                  button.textContent = newValue ? "Cacher l'avis" : "Afficher l'avis";
                  button.className = newValue ? 'btn btn-danger toggle-avis-button' : 'btn btn-success toggle-avis-button';

              } catch (error) {
                  console.error('Error:', error);
                  alert(`An error occurred while toggling visibility for avis ${avisId}`);
              }
          });
      });

  } catch (error) {
      console.error('Error:', error);
      console.log("Impossible de récupérer les informations d'avis");
  }
}

