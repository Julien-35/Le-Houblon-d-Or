import Route from "./Route.js";

//Définir ici vos routes
export const allRoutes = [
    new Route("/", "Accueil", "pages/home.html", [] , "js/home.js"),
    new Route("/biere", "Accueil", "pages/biere.html", [] , "js/biere.js"),
    new Route("/service", "Accueil", "pages/service.html", [] , "js/service.js"),
    new Route("/evenement", "Accueil", "pages/evenement.html", [] , "js/evenement.js"),
    new Route("/contact", "Accueil", "pages/contact.html", [] , "js/contact.js"),
    new Route("/admin", "Accueil", "pages/admin.html", [] , "js/admin.js"),
    new Route("/employe", "Accueil", "pages/employe.html", [] , "js/employe.js"),
    new Route("/signin", "Accueil", "pages/signin.html", [] , "js/signin.js"),
];



//Le titre s'affiche comme ceci : Route.titre - websitename
export const websiteName = "Le Houblon d'Or";
