import {UrlBuilder} from "./UrlBuilder";
import {Requests} from "./Requests";
import {Notification} from "./Notification/Notification";

type UpdateRightRequest = {
    id: number,
    value: number
    set: boolean
}

export type Params = {
    name: string,
    value: string
}

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

    public async getIcon() {
        const link = (new UrlBuilder()).build("api/users/icon")
        let result = await (new Requests()).get(link)
        if (result.ok) {
            let json = await result.json()
            if (json.data["image-name"]) {
                return json.data["image-name"]
            } else {
                return null
            }
        }
    }

    public async get(id: number): Promise<object> {

        const link = (new UrlBuilder()).build("api/users/" + id.toString())

        let result = await (new Requests()).get(link)
        let json;
        if (result.ok) {
            json = await result.json()
            return json.data
        } else {
            return []
        }

    }

    public async update(data: UpdateRightRequest, params: Array<Params>) {
        const link = (new UrlBuilder()).build("api/users/update", params)
        let result = await (new Requests()).post(link, data)
        if (result.ok) {
            return true
        } else {
            let errorText = await result.text()
            new Notification(errorText, Notification.typeError)
            return false
        }
    }

    public async addToSwitcher(data: object) {
        const link = (new UrlBuilder()).build("api/users/switcher")
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