import {UrlBuilder} from "./UrlBuilder";
import {Requests} from "./Requests";
import {Notification} from "./Notification/Notification";


export class Branches {
    public async load(): Promise<object> {

        const link = (new UrlBuilder()).build("api/branches")

        let result = await (new Requests()).get(link)
        console.log(result)
        let json;
        if (result.ok) {
            json = await result.json()
            console.log(json)
            return json.data
        } else {
            return []
        }
    }

    public async create(data: Object) {
        const link = (new UrlBuilder()).build("api/branches")
        let result = await (new Requests()).put(link, data)
        if (result.ok) {
            return true
        } else {
            new Notification("Error", Notification.typeError)
            return false
        }
    }

    public async delete(id: number) {
        const link = (new UrlBuilder()).build("api/branches/" + id.toString())
        let result = await (new Requests()).delete(link, id)
        if (result.ok) {
            new Notification("Organization Was Deleted", Notification.typeNotification)
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

    public async getCurrentBranchName(): Promise<string> {

        const link = (new UrlBuilder()).build("api/branches/current")

        let result = await (new Requests()).get(link)
        let json;
        if (result.ok) {
            json = await result.json()
            return json.data
        } else {
             return  ""
        }
    }

}