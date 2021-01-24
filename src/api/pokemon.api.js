export default class PokemonAPI {
  constructor() {
    this.baseUrl = `https://api.pokemontcg.io/v1`;
    this.pageSize = 4;
    this.cache = [];
  }

  async get() {
    if (this.hasCache()) return this.processResult({ cards: this.cache });

    const url = `${this.baseUrl}/cards`;
    const that = this;

    return await fetch(url)
      .then(response => response.json())
      .then(data =>
        this.parseResult(data, parsed => that.processResult(parsed))
      )
      .catch(() => console.error("Error on fetching pokémon card"));
  }

  async search(searchStr = this.required("id")) {
    const url = `${this.baseUrl}/cards?name=${searchStr}`;
    const that = this;
    this.cache = [];

    return await fetch(url)
      .then(response => response.json())
      .then(data =>
        this.parseResult(data, parsed => that.processResult(parsed, false))
      )
      .catch(() => console.error("Error on fetching pokémon card"));
  }

  async detail(id = this.required("id")) {
    const cacheCard = this.findInCache(id);
    if (cacheCard) return cacheCard;

    const url = `${this.baseUrl}/cards/${id}`;

    return await fetch(url)
      .then(response => response.json())
      .then(data => this.parseResult(data, parsed => parsed.card))
      .catch(() => console.error("Error on fetching pokémon card"));
  }

  required(param) {
    throw new Error(`${param} is required`);
  }

  processResult(payload = this.required("payload"), allowCache = true) {
    const cards = payload.cards
      .flat()
      .sort((a, b) => a.name.localeCompare(b.name));
    const pages = this.paginate(cards);
    if (allowCache && !this.hasCache()) this.cache = pages;

    return pages;
  }

  parseResult(data = this.required("data"), cb) {
    switch (data.status) {
      case 400:
        console.error(`Bad request. API error: ${data.error}`);
        break;
      case 403:
        console.error(`Limit exceeded. API error: ${data.error}`);
        break;
      case 404:
        console.error(`Card not found. API error: ${data.error}`);
        break;
      case 429:
        console.error(
          `Request throttled. Try again later. API error: ${data.error}`
        );
        break;
      case 500:
        console.error(`Internal server error. API error: ${data.error}`);
        break;
      case 503:
        console.error(`Service unavailable. API error: ${data.error}`);
        break;
      default:
        if (cb) return cb(data);
        break;
    }
  }

  paginate(arr = this.required("arr")) {
    return arr.reduce((acc, val, i) => {
      const idx = Math.floor(i / this.pageSize);
      const page = acc[idx] || (acc[idx] = []);
      page.push(val);

      return acc;
    }, []);
  }

  hasCache() {
    return this.cache.length > 0;
  }

  findInCache(id = this.required("id")) {
    if (!this.hasCache()) return null;

    const cacheFilter = this.cache.flat().filter(data => data.id === id);
    if (cacheFilter.length !== 1) return null;
    return cacheFilter[0];
  }
}
