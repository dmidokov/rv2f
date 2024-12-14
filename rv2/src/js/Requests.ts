export class Requests {

    async get(link: string) {

        return await fetch(link, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
        })
    }

    async post(link: string, data: object = {}): Promise<Response> {
        return await fetch(link, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data),
        });
    }

    async put(link: string, data: object = {}): Promise<Response> {

        return await fetch(link, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data),
        });
    }

    async delete(link: string, data:object = {}): Promise<Response> {

        return await fetch(link, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data),
        });
    }

    async update(link: string, data:Object): Promise<Response> {

        return await fetch(link, {
            method: 'UPDATE',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data),
        });
    }

}
