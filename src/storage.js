/**
 * (c) 2015 Ruben Schmidmeister <ruby@fog.im>
 */

export class Storage {
    /**
     *
     * @param {Model} model
     */
    persist(model) {
        window.history.replaceState(null, '', '#' + btoa([model.agent, model.level, model.country].join('.')));
    }

    /**
     *
     * @returns {{agent: string, level: string, country: string}}
     */
    restore() {
        let items = atob(window.location.hash.substring(1)).split('.');

        return {
            agent: items[0],
            level: items[1],
            country: items[2]
        }
    }
}
