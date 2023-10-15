export class ModalsManager {
    private openedModals = []

    public add(elem) {
        this.openedModals.push(elem)
    }

    public closeLast(event: KeyboardEvent) {
        if (event.code === "Escape") {
            if (this.openedModals.length > 0) {
                let elem = this.openedModals.pop()
                elem.call()
            }
        }
    }
}