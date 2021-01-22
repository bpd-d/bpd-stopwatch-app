import { AppMapping } from "../api/routes/routes";

export const MAPPIGNS = new AppMapping({
    "home": { url: "/", name: "Home", icon: "home", description: "Home page" },
    "about": { url: "/about", name: "About", icon: "info", description: "Information about the project" },
    "settings": { url: "/settings", name: "Settings", icon: "settings", description: "User options to change" },
    "actions": { url: "/actions", name: "Actions", icon: "dumbbell", description: "Define activies to be used in trainings" },
    "help": {
        url: "/help", name: "Help", icon: "emoji_smile", description: "Get information about app features"
    },
    "devtools": { url: "/dev", name: "Dev Tools", icon: "devices_desktop", description: "Developer settings" },
    "newTraining": { url: "/trainings/edit/new", name: "New Training" },
    "editTraining": { url: "/trainings/edit/:id", name: "Edit Training" },
    "perform": { url: "/trainings/perform/:id", name: "Perform Training" }
});