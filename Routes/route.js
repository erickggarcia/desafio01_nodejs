import { randomUUID } from 'node:crypto'
import { buildRoutePath } from '../utils/build-route-path.js'
import { DataBase } from '../database/database.js'
const database = new DataBase()

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/task'),
    handler:  (req, res) => {
      const {search} = req.query
      
      const task = database.select('task',
        search ? {
          title: search,
          description: search,
        } 
        : null
      )

      return res.end(JSON.stringify(task))
    },

  },
  {
    method: 'POST',
    path: buildRoutePath('/task'),
    handler: (req, res) => {
      const { title, description} = req.body
      const task = {
        id: randomUUID(),
        title,
        description,
        completed_at: '',
        created_at: new Date().toISOString().slice(0, 19),
        updated_at: '',
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

      database.update('task', search, req.body)
      return res.end()
    },
  },
  {
    method: 'PATCH',
    path: buildRoutePath('/task/:id/complete'),
    handler: (req, res) => {
      const {id} = req.params
      const search = database.search('task', id)
      database.complete('task',search)
      return res.end()
    },
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/task/:id'),
    handler: (req, res) => {
      const { id } = req.params
      const search = database.search('task', id)

      database.delete('task', search)
      return res.end()
  },
}
]
