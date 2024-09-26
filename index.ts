import app from './src/config/server'

const PORT = app.get('PORT')

app.listen(PORT, () => {
  console.log('Server started on PORT', PORT)
})
