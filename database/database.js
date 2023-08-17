import fs from 'fs/promises'
const dataBasePath = new URL('../db.json', import.meta.url)

export class DataBase {
  #database = {}

  read() {
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

  async select(table, search) {
    let data = this.#database[table]
    if(search) {
      data = data.filter((row) => {
        return Object.entries(search).some(([key, value]) => {
          return row[key].toLowerCase().includes(value.toLowerCase())
        })
      })
      console.log(data)
    }
  }

  insert(table, data) {
    this.read()
    if (Array.isArray(this.#database[table])) {
      console.log(this.#database[table])
      this.#database[table].push(data)
    } else {
      this.#database[table] = [data]
    }
    // this.#persist()
    return data
  }

  update(table, search, data) {
    const  {id} = search
    const newData = {
      id, 
      title: data.title, 
      description:data.description, 
      updatedAt: new Date().toISOString().slice(0, 19)
    }
    const database = this.#database[table].find((entry) => entry.id === id )
    if(database) {
      Object.assign(database, newData)
    }

    console.log(this.#database[table])
    this.#persist()
  }

  delete(table, search) {
    const  {id} = search
    const database = this.#database[table].findIndex((entry) => entry.id === id )
    if(database !== -1) {
      this.#database[table].splice(database, 1)
    }

    console.log(this.#database[table])
    this.#persist()
  }

  complete(table, search) {
    const {id} = search
    const database = this.#database[table].find((entry) => entry.id === id)
    if(database) {
      database.completed_at = new Date().toISOString().slice(0, 19)
    }
    console.log(this.#database[table])
    this.#persist()
  }
}

