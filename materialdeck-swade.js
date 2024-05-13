const data = {
    moduleId: 'materialdeck-swade', //id from module.json
    systemId: 'swade', //id of the system, you can get it using `game.system.id` in the console
    systemName: 'Savage Worlds Adventure Edition' //name of the system, for example: 'Dungeons & Dragons 5e'
}

/**
 * Main class that describes the system
 */
class system {
    conf; //this variable stores the configuration data for the system, set in the constructor

    constructor(){
        console.log("Material Deck: Using system 'SWADE'");
        this.conf = CONFIG.SWADE; //You can use this to get various things like the list of ability scores, conditions, etc. Make sure you set it to the correct value for your system
    }

    getActorData(token) {
        return token.actor.system;
    }

    getItemData(item) {
        return item.system;
    }

    /**
     * This generates a list of stats to be displayed on the SD: Token Action => Stats.
     * Choose the ones you want to use and change the 'name' value if desired. If you add new ones, you will need to add a function to handle them in src/token.js.
     * After each option you'll find what function it will call after the button is pressed on the SD
     */
    getStatsList() {
        return [
            { value: 'HP', name: 'Wounds' },
            { value: 'HPbox', name: 'Wounds (box)' },
            { value: 'Parry', name: 'Parry' },
            { value: 'Pace', name: 'Pace' },
            { value: 'Attribute', name: 'Attributes Score' },
            { value: 'PP', name: 'Power Points' },
            { value: 'Wildcard', name: 'Wild Card' }
            { value: 'Toughness', name: 'Toughness' }
        ]
    }

    /**
     * Returns the HP of the token
     * @param {Token} token Token instance to get the HP from
     * @returns {object}    Token hp value and max: {value: ##, max: ##}
     */
    getHP(token) {
        const hp = this.getActorData(token).wounds

        return {
            value: hp.value,
            max: hp.max
        }
    }


    /**
     * Returns the parry value of the token
     * @param {Token} token Token instance to get the Parry from
     * @returns {number}    Parry value
     */
    getParry(token) {
        const { parry } = this.getActorData(token).stats;
        return parry.value
    }

    /**
     * Returns a string with movement speeds of the token
     * @param {Token} token Token instance to get the speed from
     * @returns {string}    Movement speed string
     */
    getPace(token) {
        const { speed } = this.getActorData(token).stats;

        return speed.value;
    }

    /**
     * Returns the attribute value of the token
     * @param {Token} token     Token instance to get the attribute value from
     * @param {string} attribute  Attribute to get the value from
     * @returns {number}        Attribute value
     */
    getAttribute(token, attribute) {
        if (attribute == undefined) attribute = 'agility';  //default attribute
        return this.getActorData(token).attributes?.[attribute].die.sides;
    }

    /**
     * Returns the Power points value of the token
     * @param {Token} token     Token instance to get the power points value from
     * @returns {object}    Token pp value and max: {value: ##, max: ##}
     */
    getPP(token) {
        const pp = this.getActorData(token).powerPoints;

        return {
            value: pp.general.value,
            max: pp.general.max
        }
    }

    getWildcard(token) {
        return this.getActorData(token).wildcard;
    }


    /**
     * Returns the Toughtness value of the token
     * @param {Token} token     Token instance to get the toughness value from
     * @returns {object}    Token toughness value and armor: {value: ##, armor: ##}
     */
    getToughness(token) {
        const { toughness } = this.getActorData(token).stats.toughness;

        return {
            value: toughness.value,
            armor: toughness.armor
        }
    }
}

Hooks.once('MaterialDeck_Ready', () => {
    const moduleData = game.modules.get(data.moduleId);

    game.materialDeck.registerSystem({
        systemId: data.systemId,
        moduleId: data.moduleId,
        systemName: data.systemName,
        version: moduleData.version,
        manifest: moduleData.manifest,
        system
    });
});
