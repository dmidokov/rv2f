import {UrlBuilder} from "./UrlBuilder";
import {Requests} from "./Requests";
import {Notification} from "./Notification/Notification";


export class Organizations {

    private name: string
    private host: string
    private adminName: string
    private adminPassword: string

    private checkErrors: Array<string> = []

    public constructor(name, host, adminName, adminPassword: string) {
        this.name = name
        this.host = host
        this.adminPassword = adminPassword
        this.adminName = adminName
    }

    public async load(): Promise<object> {

        const link = (new UrlBuilder()).build("api/organizations")

        let result = await (new Requests()).get(link)
        let json;
        if (result.ok) {
            json = await result.json()
            return json.data
        } else {
            return []
        }
    }

    public async create(): Promise<Object> {
        const link = (new UrlBuilder()).build("api/organizations")
        let result = await (new Requests()).put(link, this.buildCreate())
        let json = await result.json()

        if (json.status == "OK") {
            return json
        } else {
            return {'status': 'error', 'error': json.error}
        }
    }

    private buildCreate(): Object {
        return {
            "name": this.name,
            "host": this.host,
            "user-name": this.adminName,
            "user-pass": this.adminPassword
        }
    }

    public async delete(id: number) {
        const link = (new UrlBuilder()).build("api/organizations/" + id.toString())
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

    public async getCurrentOrganizationName(): Promise<string> {
        const link = (new UrlBuilder()).build("api/organizations/current")

        let result = await (new Requests()).get(link)
        let json;
        if (result.ok) {
            json = await result.json()
            return json.data
        } else {
            return ""
        }
    }

    public checkFields(): boolean {
        this.checkErrors = []
        if (this.name.length < 3) {
            this.checkErrors.push("name")
        }
        if (this.host.length < 3 || !this.host.match("\\w+\\.\\w+\\.\\w+")) {
            this.checkErrors.push("host")
        }
        if (this.adminName.length < 3) {
            this.checkErrors.push("adminName")
        }
        if (this.adminPassword.length < 3) {
            this.checkErrors.push("adminPassword")
        }
        console.log(this.checkErrors)
        return this.checkErrors.length == 0
    }

    public getCheckErrors(): Array<string> {
        return this.checkErrors
    }
}