import { AppMapping } from "../api/routes/routes";

export const MAPPIGNS = new AppMapping({
    "home": { url: "/", name: "Home" },
    "about": { url: "/about", name: "About" },
    "settings": { url: "/settings", name: "Settings" },
    "actions": { url: "/actions", name: "Actions" },
    "newTraining": { url: "/trainings/edit/new", name: "New Training" },
    "editTraining": { url: "/trainings/edit/:id", name: "Edit Training" },
    "perform": { url: "/trainings/perform/:id", name: "Perform Training" }
});