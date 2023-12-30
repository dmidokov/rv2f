export class Helpers {
    public static printf(m, ...values) {
        values.forEach((item, index) => {
            m = m.replaceAll('{' + (++index) + '}', item)
        })

        return m
    }

    /**
     *
     * @param time
     */
    public static formatDate(time: number): string {
        return new Date(time * 1000).toLocaleString()
    }

}
