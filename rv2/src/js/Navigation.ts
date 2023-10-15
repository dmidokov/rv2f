import {Requests} from "./Requests"
import {UrlBuilder} from "./UrlBuilder"
import {Notification} from "./Notification/Notification";

export class Navigation {

    public async load(): Promise<object> {

        const link = (new UrlBuilder()).build("api/navigation")

        let result = await (new Requests()).get(link)
        let json;
        if (result.ok) {
            json = await result.json()
            return json.data
        } else {
            return []
        }

    }

}