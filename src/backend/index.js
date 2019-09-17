// Dependencies
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import next from 'next'
import path from 'path'
import session from 'express-session'

// Configuration
import { $serverPort, $isLocal, $security } from '@configuration'

// Router
import router from './router'

// Next App
const nextApp = next({
  dev: $isLocal(),
  dir: path.resolve(`${__dirname}/../frontend`)
})

nextApp
  .prepare()
  .then(() => {
    // Express app
    const app = express()

    // Middlewares
    app.use(session({
      resave: false,
      saveUninitialized: true,
      secret: $security().secretKey
    }))
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(cookieParser('secret'))
    app.use(cors({ credentials: true, origin: true }))

    // Public static
    app.use('/node_modules', express.static(path.join(__dirname, '../../node_modules')))
    app.use(express.static(path.join(__dirname, '../../public')))

    // Router
    router(app, nextApp)

    // Listening
    app.listen($serverPort())
  })
  .catch((ex) => {
    console.error(ex.stack) // eslint-disable-line no-console
    process.exit(1)
  })
