import { AppMapping } from "../api/routes/routes";

export const MAPPIGNS = new AppMapping({
    "home": { url: "/", name: "Home", icon: "home" },
    "about": { url: "/about", name: "About", icon: "info" },
    "settings": { url: "/settings", name: "Settings", icon: "settings" },
    "actions": { url: "/actions", name: "Actions", icon: "home" },
    "help": { url: "/help", name: "Help", icon: "emoji_smile" },
    "newTraining": { url: "/trainings/edit/new", name: "New Training" },
    "editTraining": { url: "/trainings/edit/:id", name: "Edit Training" },
    "perform": { url: "/trainings/perform/:id", name: "Perform Training" }
});