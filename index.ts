import { connectDB } from './config/db'
import app from './config/server'

connectDB()

const PORT = app.get('PORT')

app.listen(PORT, () => {
  console.log('Server started on PORT', PORT)
})
