import Route from "./Route.js";

//Définir ici vos routes
export const allRoutes = [
    new Route("/", "Accueil", "pages/home.html", [] , "js/home.js"),
    new Route("/biere", "Accueil", "pages/biere.html", [] , ""),
    new Route("/service", "Accueil", "pages/service.html", [] , ""),
    new Route("/evenement", "Accueil", "pages/evenement.html", [] , ""),
    new Route("/contact", "Accueil", "pages/contact.html", [] , ""),
    new Route("/admin", "Accueil", "pages/admin.html", [] , ""),
    new Route("/employe", "Accueil", "pages/employe.html", [] , "js/employe.js"),
    new Route("/signin", "Accueil", "pages/signin.html"),];



//Le titre s'affiche comme ceci : Route.titre - websitename
export const websiteName = "Le Houblon d'Or";
