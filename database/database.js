import fs from 'fs/promises'
const dataBasePath = new URL('../db.json', import.meta.url)

export class DataBase {
  #database = {}

  constructor() {
    fs.readFile(dataBasePath, 'utf-8')
      .then((data) => {
        this.#database = JSON.parse(data)
      })
      .catch(() => this.#persist())
  }

  #persist() {
    fs.writeFile(dataBasePath, JSON.stringify(this.#database))
  }

  search(table, id) {
    const database = this.#database[table]
    const search = database.find((data) => data.id === id
)
    return search
  }

  list() {
    fs.readFile(dataBasePath, 'utf-8').then((data) => {
      this.#database = JSON.parse(data)
      // console.log(this.#database)
    })
  }

  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data)
    } else {
      this.#database[table] = [data]
    }
    this.#persist()
    return data
  }

  update() {
    search.title = data.title
    search.description = data.description
    search.updatedAt = new Date().toISOString().slice(0, 19)
    this.#database[table] = search
    this.#persist()
    console.log(search)
  }
}
