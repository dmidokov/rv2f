import {Requests} from "./Requests";
import {Notification} from "./Notification/Notification";
import {UrlBuilder} from "./UrlBuilder";

export class Auth {
    authorize(userName: string, userPass: string): boolean {

        const link = 'https://' + window.location.hostname + ':443/auth'
        let request = new Requests()

        let data = {
            "username": userName,
            "user_pass": userPass
        }

        request.post(link, data)
            .then(response => {
                if (response.ok) {
                    response
                        .json()
                        .then(json => {
                            if (json["status"] === "OK") {
                                window.location.href = "/"
                                return true
                            } else {
                                if (json['status'] == "Error") {
                                    new Notification(json['error'], Notification.typeError)
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
        const link = 'https://' + window.location.hostname + ':443/logout'
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
        let response = await request.get((new UrlBuilder()).build("api/authcheck"))
        if (response.ok) {
            return true
        }
        return false
    }
}
