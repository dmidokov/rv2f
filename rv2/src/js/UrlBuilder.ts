// import {Params} from "./Users";

export type Params = {
    name: string,
    value: string
}

export class UrlBuilder {
    build(path: string, params: Array<Params> = []): string {
        let paramString = ''
        if (params) {

            params.forEach(
                (p, i) => {
                    if (i == 0) {
                        paramString += "?" + p.name + "=" + p.value
                    } else {
                        paramString += "&" + p.name + "=" + p.value
                    }
                }
            )
        }

        return  path + paramString
    }
}