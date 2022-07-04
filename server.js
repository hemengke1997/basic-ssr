import express from 'express'
import { renderToString } from 'vue/server-renderer'
import { createApp } from './createApp'


const app = express()

app.get('/', (req, res) => {
  const vue = createApp()

  renderToString(vue).then((html) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
      <script type="importmap">
      {
        "imports": {
          "vue": "https://unpkg.com/vue@3/dist/vue.esm-browser.js"
        }
      }
      </script>
      <script src="/client-entry.js" type="module"></script>
    </head>
    <body>
      <div id="app">${html}</div>
    </body>
    </html>
    `)
  })
})

app.use(express.static('.'))

app.listen(4000, () => {
  console.log('Server running at http://localhost:4000')
})
