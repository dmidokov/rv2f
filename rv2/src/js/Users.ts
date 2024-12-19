import {UrlBuilder} from "./UrlBuilder";
import {Requests} from "./Requests";
import {Notification} from "./Notification/Notification";

export type UpdateRightRequest = {
    userId: number,
    value: number
    set: boolean
}

export type UpdateGroupsRequest = {
    userId: number,
    groupId: number,
}

export type UnassignGroupsRequest = {
    userId: number,
    groupId: number
}

export type Params = {
    name: string,
    value: string
}

export type RightsWithDescription = {
    name: string,
    value: string
}

export type NavigationItem = {
    id: Number,
    title: string,
    enabled: boolean
}

export type ChildsItem = {
    id: Number,
    login: string
}

export type HotSwitchItem = {
    id: Number,
    login: string
}

export type AssignedGroups = {
    group_id: Number,
    user_id: Number,
    group_name: string
}

export type UserResponse = {
    icon: string
    userName: string
    createTime: string
    updateTime: string
    startPage: string
    userRightsWithDesription: Array<RightsWithDescription>
    userRights: Array<Number>
    navigation: Array<NavigationItem>
    childs: Array<ChildsItem>
    hotSwitch: Array<HotSwitchItem>
    assignGroups: Array<AssignedGroups>
}

export type AddToSwitcherRequest = {
    fromId: number,
    toId: number
}

export type RemoveFromSwitcherRequest = {
    fromId: number,
    toId: number
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
        let result = await (new Requests()).delete(link)
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
            return json.data["image-name"] ?? ""
        }
    }

    public async get(id: number): Promise<UserResponse> {

        let res: UserResponse
        const link = (new UrlBuilder()).build("api/users/" + id.toString())

        let result = await (new Requests()).get(link)
        let json;
        if (result.ok) {
            json = await result.json()
            return json.data
        } else {
            return res
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

    public async addToSwitcher(data: AddToSwitcherRequest) {
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

    public async removeFromSwitcher(data: RemoveFromSwitcherRequest) {
        const link = (new UrlBuilder()).build("api/users/switcher")
        let result = await (new Requests()).delete(link, data)
        if (result.ok) {
            return true
        } else {
            let errorText = await result.text()
            new Notification(errorText, Notification.typeError)
            return false
        }
    }

    public async getHotSwitch() {
        const link = (new UrlBuilder()).build("api/users/switcher")
        let result = await (new Requests()).get(link)
        if (result.ok) {
            let json = await result.json()
            return json.data
        } else {
            let errorText = await result.text()
            new Notification(errorText, Notification.typeError)
            return false
        }
    }

    public async switchAccount(id: number): Promise<boolean> {
        const link = (new UrlBuilder()).build("api/users/switcher/switch", [{name: "id", value: id.toString()}])
        let result = await (new Requests()).get(link)
        if (result.ok) {
            new Notification("Switched to another user", Notification.typeNotification)
            let json = await result.json()
            return json.data
        } else {
            let errorText = await result.text()
            new Notification(errorText, Notification.typeError)
            return false
        }
    }

    public async addGroupToUser(data: UpdateGroupsRequest, groupName: string) {
        const link = (new UrlBuilder()).build("api/users/group")
        let result = await (new Requests()).put(link, data)
        if (result.ok) {
            return true
        } else {
            return false
        }
    }

    public async unassignUserGroup(data: UnassignGroupsRequest) {
        const link = (new UrlBuilder()).build("api/users/group")
        let result = await (new Requests()).delete(link, data)
        if (result.ok) {
            return true
        } else {
            let errorText = await result.text()
            new Notification(errorText, Notification.typeError)
            return false
        }
    }


}