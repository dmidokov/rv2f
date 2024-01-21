export class ModalsManager {
    private openedModals = []

    public add(elem) {
        console.log("Add")
        this.openedModals.push(elem)
    }

    public closeLast(event: KeyboardEvent) {
        console.log("escape")
        if (event.code === "Escape") {
            if (this.openedModals.length > 0) {
                let elem = this.openedModals.pop()
                elem.call()
            }
        }
    }
}