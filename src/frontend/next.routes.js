export default (app, nextApp) => {
  // isConnected middleware validation
  const isConnected = (isLogged = true) => (req, res, next) => {
    res.jwtVerify(user => {
      if (!user && !isLogged) {
        return next()
      } else if (user && isLogged) {
        return next()
      } else {
        res.redirect('/')
      }
    })
  }

  // User Routes
  app.use('/login', isConnected(false), (req, res) => nextApp.render(req, res, '/user/login'))
  app.use('/profile', isConnected(), (req, res) => nextApp.render(req, res, '/user/profile'))
  app.use('/register', isConnected(false), (req, res) => nextApp.render(req, res, '/user/register'))
  app.use('/forgot-password', isConnected(false), (req, res) => nextApp.render(req, res, '/user/forgot'))

  // Terms Routes
  app.use('/disclaimer', (req, res) => nextApp.render(req, res, '/terms/disclaimer'))
  app.use('/cookies-policy', (req, res) => nextApp.render(req, res, '/terms/cookies-policy'))
  app.use('/privacy-policy', (req, res) => nextApp.render(req, res, '/terms/privacy-policy'))
  app.use('/terms-and-conditions', (req, res) => nextApp.render(req, res, '/terms/terms-and-conditions'))

  // Blog
  app.use('/blog/:slug', (req, res) => {
    nextApp.render(req, res, '/blog/post')
  })

  app.use('/', (req, res) => {
    const { url } = req

    if (url === '/' || url[0] === '/' && url[1] === '?') {
      nextApp.render(req, res, '/')
    } else {
      res.status(404)

      nextApp.render(req, res, '/error/404')
    }
  })
}
