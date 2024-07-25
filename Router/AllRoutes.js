import Route from "./Route.js";

//Définir ici vos routes
export const allRoutes = [
    new Route("/", "Accueil", "pages/home.html"),
    new Route("/biere", "Accueil", "pages/biere.html"),
    new Route("/evenement", "Accueil", "pages/evenement.html"),
    new Route("/contact", "Accueil", "pages/contact.html"),
    new Route("/admin", "Accueil", "pages/admin.html"),
    new Route("/employe", "Accueil", "pages/employe.html"),
    new Route("/signin", "Accueil", "pages/signin.html"),];



//Le titre s'affiche comme ceci : Route.titre - websitename
export const websiteName = "Le Houblon d'Or";
