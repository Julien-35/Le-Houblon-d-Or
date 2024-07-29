const avis = document.getElementById("avis");

if (document.readyState === "loading") {
  // Loading hasn't finished yet
  avis.addEventListener('DOMContentLoaded', voirAvis);
} else {
  voirAvis();
}

async function voirAvis() {
  const myHeaders = new Headers();
  myHeaders.append("X-AUTH-TOKEN", "38f1c426526d1aeebb80d777b8733f1ef09fc484");
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
  };

  try {
      const response = await fetch("http://localhost:8000/api/avis/get", requestOptions);
      if (!response.ok) throw new Error('Failed to fetch avis');
      
      const result = await response.json();
      let content = '';
      result.forEach(item => {
          const buttonText = item.isVisible ? "Cacher l'avis" : "Afficher l'avis";
          const buttonClass = item.isVisible ? 'btn btn-secondary toggle-avis-button' : 'btn btn-success toggle-avis-button';
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
                      <button class="btn btn-danger delete-avis-button" data-avis-id="${item.id}">
                          Supprimer
                      </button>
                  </li>
              </ol>`;
      });
      document.getElementById("GetAvis").innerHTML = content;

      // Ajouter les gestionnaires d'événements pour les boutons de visibilité
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

                  const response = await fetch(`http://localhost:8000/api/avis/${avisId}`, putRequestOptions);
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

      // Ajouter les gestionnaires d'événements pour les boutons de suppression
      document.querySelectorAll('.delete-avis-button').forEach(button => {
          button.addEventListener('click', async () => {
              const avisId = button.getAttribute('data-avis-id');

              try {
                  const deleteRequestOptions = {
                      method: 'DELETE',
                      headers: {
                          'Content-Type': 'application/json',
                          'X-AUTH-TOKEN': '38f1c426526d1aeebb80d777b8733f1ef09fc484'
                      }
                  };

                  const response = await fetch(`http://localhost:8000/api/avis/${avisId}`, deleteRequestOptions);
                  if (!response.ok) throw new Error(`Echec pour la suppression de l'avis ${avisId}`);

                  // Recharger la liste des avis après la suppression
                  voirAvis();

              } catch (error) {
                  console.error('Error:', error);
                  alert(`An error occurred while deleting avis ${avisId}`);
              }
          });
      });

  } catch (error) {
      console.error('Error:', error);
      console.log("Impossible de récupérer les informations d'avis");
  }
}
