const express = require("express")
const app = express()
const cors = require("cors")

//middleware
app.use(cors())
app.use(express.json())
app.disable("x-powered-by")

app.use("/api/words", require("./words/words"))

const PORT = process.env.BPORT || 5000
app.listen(PORT, () => {
  console.log(`Server started and Running at port: ${PORT}`)
})
