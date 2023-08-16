import { randomUUID } from 'node:crypto'
import { buildRoutePath } from '../utils/build-route-path.js'
import { DataBase } from '../database/database.js'
const database = new DataBase()

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/task'),
    handler: () => {
      database.list()
    },
  },
  {
    method: 'POST',
    path: buildRoutePath('/task'),
    handler: (req, res) => {
      console.log(req.body)
      const { title, description, completed_at, updated_at } = req.body
      const task = {
        id: randomUUID(),
        title,
        description,
        completed_at,
        created_at: new Date().toISOString().slice(0, 19),
        updated_at,
      }
      database.insert('task', task)
      return res.writeHead(201).end()
    },
  },
  {
    method: 'PUT',
    path: buildRoutePath('/task/:id'),
    handler: (req, res) => {
      const { id } = req.params
      const search = database.search('task', id)
      console.log(search)
      return res.end()
    },
  },
  {
    method: 'PATCH',
    path: buildRoutePath('/task/:id'),
    handler: () => {},
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/task/:id'),
    handler: () => {},
  },
]
