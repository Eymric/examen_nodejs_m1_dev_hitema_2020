const fs = require('fs');

module.exports = class PeopleService {
    constructor() {
        this.peoples = JSON.parse(fs.readFileSync(__dirname + '/people.json', 'utf8'));
    }

    updatePeople(id, people) {
        const find = this.peoples.find( (ppl) => ppl.id === parseInt(id));
        if (!find) return { isFind: null, people: null };

        const updatedPeople = Object.assign(find, people);
        return { isFind: 1, people: updatedPeople };
    }
    
    getPeople(filters) {
        // To be implemented!
        let people = this.peoples;
        if (filters) {
            people = this.peoples.filter( (ppl) => ppl.gender === filters);
        }

        console.log(filters);
        return people;
    }
}
