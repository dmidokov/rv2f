import {Requests} from "./Requests";
import {Notification} from "./Notification/Notification";
import {UrlBuilder} from "./UrlBuilder";

export class Auth {
    authorize(userName: string, userPass: string): boolean {

        const link = '/auth' // TODO:: удалить этот хардкод
        let request = new Requests()

        let data = {
            "username": userName,
            "user_pass": userPass
        }

        console.log("link", link);

        request.post(link, data)
            .then(response => {
                if (response.ok) {
                    response
                        .json()
                        .then(json => {
                            if (json["status"] === "ok") {
                                if (json["data"]["startPage"] && json["data"]["startPage"] !== "undefined") {
                                    window.location.href = json["data"]["startPage"]
                                } else {
                                    window.location.href = "/"
                                }
                                return true
                            } else {
                                if (json["status"] == "error") {
                                    new Notification(json.errors[0], Notification.typeError)
                                }
                                return false;
                            }
                        })
                } else {
                    response
                        .text()
                        .then(text => {
                            new Notification(text, Notification.typeError)
                        })
                    return false
                }
            })
            .catch(() => {
                new Notification("Network error", Notification.typeError)
                return false
            });

        return true;
    }

    logout() {
        const link = '/logout'
        let request = new Requests()

        request.post(link).then(response => {
            if (!response.ok) {
                response
                    .text()
                    .then(text => {
                        new Notification(text, Notification.typeError)
                    })
            } else {
                window.location.href = "/#/login"
            }
        })
    }

    async authCheck() {
        let request = new Requests()
        let response = await request.get((new UrlBuilder()).build("/api/authcheck"))
        if (response.ok) {
            return true
        }
        return false
    }
}
