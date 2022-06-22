const express = require("express")
const path = require("path")
const app = express()
const cors = require("cors")

//middleware
app.use(cors())
app.use(express.json())
app.disable("x-powered-by")

app.use("/api/words", require("./words/words"))

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  //Set Static folder
  app.use(express.static("client/build"))

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  })
}

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server started and Running at port: ${PORT}`)
})
