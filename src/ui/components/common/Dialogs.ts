export function onDeleteTrainingDialog(name: string, onConfirm: () => void) {
    window.$cui.alert("delete-training-dialog", "YesNoCancel", {
        title: "Delete training",
        message: "Do you really want to delete training: " + name + "?",
        onYes: onConfirm
    })
}

export function deleteRoundConfirmDialog(onOnfirm: () => void) {
    window.$cui.alert("delete-round-dialog", "YesNoCancel", {
        title: "Delete round",
        message: "Do you really want to delete this round?",
        onYes: onOnfirm
    })
}

export function deleteActionConfirmDialog(name: string, onConfirm: () => void) {
    window.$cui.alert("delete-action-dialog", "YesNoCancel", {
        title: "Delete action",
        message: "Do you really want to delete action: " + name,
        onYes: onConfirm
    })
}