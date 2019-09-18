// Next Routes
import nextRoutes from '@frontend/next.routes'

// Configuration
import { $baseUrl } from '@configuration'

export default (app, nextApp) => {
  // Disabling X-XSS-Protection for Chrome
  app.use((req, res, next) => {
    res.set('X-XSS-Protection', 0)
    return next()
  })

  // Set variables
  app.use((req, res, next) => {
    res.baseUrl = res.locals.baseUrl = $baseUrl()

    return next()
  })

  // Slack redirection
  app.get('/slack', (req, res) => {
    const c = ''
    res.redirect(`${c}`)
  })

  // Next Routes
  nextRoutes(app, nextApp)

  // Disabling x-powered-by
  app.disable('x-powered-by')
}
