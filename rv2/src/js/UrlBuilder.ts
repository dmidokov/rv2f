import {Params} from "./Users";

export class UrlBuilder {
    build(path: string, params: Array<Params> = []): string {
        let paramString = ''
        if (params) {

            params.forEach(
                (p, i) => {
                    console.log(p)
                    if (i == 0) {
                        paramString += "?" + p.name + "=" + p.value
                    } else {
                        paramString += "&" + p.name + "=" + p.value
                    }
                }
            )
        }
        return 'https://' + window.location.hostname + ':443/' + path + paramString
    }
}