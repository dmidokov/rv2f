export class UrlBuilder {
    build(path: string): string {
        return 'https://' + window.location.hostname + ':443/' + path
    }
}