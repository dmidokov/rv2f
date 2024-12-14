import {UrlBuilder, Params} from "./UrlBuilder";
import {Requests} from "./Requests";

interface GroupData {
    id: Number,
    group_name: string,
    group_rights: Array<Number>,
}

export type NewGroup = {
    name: string,
    rights: bigint,
}

export type GroupMethodResponse = {
    status: boolean,
    message: string
}

export class Groups {

    name: string = "";
    errors: string[] = []

    public constructor(name: string = "") {
        this.name = name
        return this
    }

    public async load(): Promise<ArrayConstructor> {

        const link = (new UrlBuilder()).build("api/groups")

        let result = await (new Requests()).get(link)
        let json;
        if (result.ok) {
            json = await result.json()
            return json.data
        } else {
            return Array<GroupData>
        }

    }

    public async getAvailableRights() {
        const link = (new UrlBuilder()).build("api/groups/rights")

        let result = await (new Requests()).get(link)
        let json;
        if (result.ok) {
            json = await result.json()
            return json.data
        } else {
            return Array<GroupData>
        }

    }

    public checkFields(): boolean {
        let check = true;
        if (this.name.length < 3) {
            this.errors.push("name")
            check = false
        }
        return check
    }

    public getErrors(): string[] {
        return this.errors
    }

    public async create(data: NewGroup) {
        const link = (new UrlBuilder()).build("api/groups")
        let result = await (new Requests()).put(link, data)

        let json: any;
        try {
            json = await result.json()
            if (json.status == "ok") {
                return json
            } else {
                return {'status': 'error', 'error': json.error}
            }
        } catch (e) {
            return {'status': 'error', 'error': "Can't parse response"}
        }
    }

    public async deleteGroup(groupId: Number): Promise<GroupMethodResponse> {
        const link = (new UrlBuilder()).build("api/groups", [{name: "group_id", value: groupId.toString()}])

        let result = await (new Requests()).delete(link)

        if (result.ok) {
            let json = await result.json()
            if (json.status == "ok") {
                return {status: true, message: "Group deleted successfully."};
            } else {

                return {message: "", status: false}
            }
        } else {
            let text: string = await result.text()
            if (text == "") {
                text = result.statusText
            }
            if (text == "") {
                text = "Unknown error"
            }
            return {message: text, status: false}
        }
    }

}