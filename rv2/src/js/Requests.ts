export class Requests {

    async get(link: string) {

        let response = await fetch(link, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
        });
        return response
    }

    async post(link: string, data: object = {}): Promise<Response> {

        let response = await fetch(link, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data),
        });
        return response;
    }

    async put(link: string, data: object = {}): Promise<Response> {

        let response = await fetch(link, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data),
        });
        return response;
    }

    async delete(link: string, data:Object): Promise<Response> {

        let response = await fetch(link, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data),
        });
        return response;
    }

}
