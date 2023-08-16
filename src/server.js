import http from 'node:http'
import { routes } from '../Routes/route.js'
import { json } from '../middlewares/json.js'
import { extractQueryParams } from '../utils/extract-query-params.js'

const server = http.createServer(async (req, res) => {
  const { method, url } = req
  await json(req, res)

  const route = routes.find((route) => {
    return route.method === method && route.path.test(url)
  })

  if (route) {
    const routeParams = req.url.match(route.path)
    req.params = routeParams.groups
    return route.handler(req, res)

    // res.end('Hello World')
  }
  console.log(route)
})

server.listen(3333)
