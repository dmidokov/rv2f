export class Notification {

    static typeError = 0;
    static typeNotification = 1;
    static typeWarning = 2;


    private notificationBlock: HTMLElement
    private notification: HTMLElement

    private NOTIFICATION_BLOCK_NAME = "notifications-block"
    private NOTIFICATION_BLOCK_STYLE = "position:absolute;" +
        "width:350px;" +
        "height:0px;" +
        "bottom:20px;" +
        "right:50px;" +
        "display:flex;" +
        "flex-direction:column-reverse;"
    private NOTIFICATION_ITEM_STYLE = "width:100%;" +
        "height:50px;" +
        "margin-top:10px;" +
        "padding:10px 15px;" +
        "border-radius:10px;"

    private NOTIFICATION_TYPE_STYLES = {
        "error": "background: rgba(255,235,235,0.85);color:#E64646;",
        "notification": "background: rgba(125,235,125,0.85);color:#E64646;",
        "warning": "background: rgba(255,135,135,0.85);color:#E64646;"
    }

    /**
     *
     * @param message string
     * @param type number
     * @param show boolean
     * @param duration number
     */
    public constructor(message: string = "", type: number = 0, show: boolean = true, duration: number = 0) {

        let element: HTMLElement;

        if (document.getElementById(this.NOTIFICATION_BLOCK_NAME) === null) {
            element = document.createElement('div')
            element.setAttribute('style', this.NOTIFICATION_BLOCK_STYLE)
            element.setAttribute('id', this.NOTIFICATION_BLOCK_NAME)
            document.body.appendChild(element)
        } else {
            element = document.getElementById(this.NOTIFICATION_BLOCK_NAME)
        }
        this.notificationBlock = element;
        if (message !== "") {
            this.create(message.trim())
                .setType(type)

            if (show) {
                if (duration) {
                    this.show(duration);
                } else {
                    this.show()
                }
            }
        }
    }

    /**
     *
     * @param message
     */
    public create(message: string) {
        let element = document.createElement('div')
        element.setAttribute("style", this.NOTIFICATION_ITEM_STYLE)
        element.innerText = message.trim()
        this.notification = element
        return this
    }

    /**
     *
     * @param duration
     */
    public show(duration: number = 5000) {
        this.notificationBlock.appendChild(this.notification)
        setTimeout(() => {
            this.notification.remove()
        }, duration)
    }

    /**
     *
     * @param type
     */
    public setType(type: number = Notification.typeNotification) {
        let notification_style = ""
        switch (type) {
            case Notification.typeError:
                notification_style = this.NOTIFICATION_TYPE_STYLES["error"]
                break
            case Notification.typeNotification:
                notification_style = this.NOTIFICATION_TYPE_STYLES["notification"]
                break
            case Notification.typeWarning:
                notification_style = this.NOTIFICATION_TYPE_STYLES["warning"]
                break
        }
        this.notification.style.cssText += notification_style
        return this
        return this
    }

}
