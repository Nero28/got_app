export default class GotService {
    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api';
    }

    getResource = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}` +
                `, received ${res.status}`);
        }
        return await res.json();
    }

    getAllBooks = async () => {
        return this.getResource(`/books/`);
    }

    getBook = async (id) => {
        return this.getResource(`/books/${id}/`);
    }

    getAllCharacters = async () => {
        const res = await this.getResource(`/characters?page=5&pageSize=10`);
        return res.map(this._transformCharacter);
    }

    getCharacter = async (id) => {
        const character = await this.getResource(`/characters/${id}`);
        return this._transformCharacter(character);
    }

    getAllHouses = async () => {
        return this.getResource(`/houses/`);
    }

    getHouse = async (id) => {
        return this.getResource(`/houses/${id}/`);
    }

    isSet(data) {
        if (data) {
            return data;
        } else {
            return 'No data :(';
        }
    }
    _extractId = (item) => {
        const idRegExp = /\/([0-9]*)$/;
        return item.url.match(idRegExp)[1];
    }

    _transformCharacter = (char) => {
        return {
            id:this._extractId(char),
            name: this.isSet(char.name),
            gender: this.isSet(char.gender),
            born: this.isSet(char.born),
            died: this.isSet(char.died),
            culture: this.isSet(char.culture),
        }
    }

    _transformHouse = (house) => {
        return {
            name: this.isSet(house.name),
            region: this.isSet(house.name),
            words: this.isSet(house.words),
            titles: this.isSet(house.titles),
            overloard: this.isSet(house.overloard),
            ancestralWeapons: this.isSet(house.ancestralWeapons),
        }
    }

    _transformBook = (book) => {
        return {
            name: this.isSet(book.name),
            numberOfPages: this.isSet(book.numberOfPages),
            publiser: this.isSet(book.publiser),
            released: this.isSet(book.released),
        }
    }
}