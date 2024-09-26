const BackendUrl = "http://localhost:3001/api/v1/user";

/**
 * Envoie une requête de connexion pour l'utilisateur
 * @param {Object} userData Données des utilisateurs ({email, password})
 * @returns {Promise<Object>} La réponse de l'API (formaté en JSON)
 */
export async function login(userData) {
  const response = await fetch(BackendUrl + "/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();
  return data;
}

/**
 * Récupére le profil d'utilisateur
 * 
 * @param {String} token Le token JWT
 * @returns {Promise<Object>} La réponse de l'API (formaté en JSON)
 */
export async function getProfile(token) {
  const response = await fetch(BackendUrl + "/profile", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token.trim()}`,
    },
  });

  const data = await response.json();
  console.log("Login async");
  console.log(data);
  return data;
}

/**
 * Modifie le profil de l'utilisateur
 * 
 * @param {String} token Le token JWT
 * @param {Object} userData Données des utilisateurs ({firstName, lastName})
 * @returns {Promise<Object>} La réponse de l'API (formaté en JSON)
 */
export async function modifyProfile(token, userData) {
  const response = await fetch(BackendUrl + "/profile", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token.trim()}`,
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();
  return data;
}
