import {UrlBuilder} from "./UrlBuilder";
import {Requests} from "./Requests";
import {Notification} from "./Notification/Notification";

export class Users {
    public async load(): Promise<object> {

        const link = (new UrlBuilder()).build("api/users")

        let result = await (new Requests()).get(link)
        let json;
        if (result.ok) {
            json = await result.json()
            return json.data
        } else {
            return []
        }

    }

    public async delete(id: number) {
        const link = (new UrlBuilder()).build("api/users/" + id.toString())
        let result = await (new Requests()).delete(link, id)
        if (result.ok) {
            new Notification("User Was Deleted", Notification.typeNotification)
            return true
        } else {
            result.text().then(
                text => {
                    new Notification(text, Notification.typeError)
                }
            )
            return false
        }
    }

    public async create(data: Object) {
        const link = (new UrlBuilder()).build("api/users")
        let result = await (new Requests()).put(link, data)
        if (result.ok) {
            return true
        } else {
            let errorText = await result.text()
            new Notification(errorText, Notification.typeError)
            return false
        }
    }

}