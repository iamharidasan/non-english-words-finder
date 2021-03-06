const express = require("express")
const config = require("config")
const router = express.Router()
const { body, validationResult } = require("express-validator")

//POST /api/words/:sentence
//Get a sentence and find the matching words and send back the unmatched words
//@Access: public
router.post(
  "/",
  body("sentence", "Please enter one or more characters to check")
    .not()
    .isEmpty(),
  (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    try {
      const { sentence } = req.body
      const words = config.get("words")
      const dictonaryWordsArr = words.map((s) => s.toLowerCase())
      const wordsArray = sentence
        .replace(/[^a-zA-Z \'\-\/]/g, "")
        .split(" ")
        .map((s) => s.toLowerCase())
      const difference = wordsArray.filter(
        (word) => !dictonaryWordsArr.includes(word)
      )
      return res.json(difference)
    } catch (err) {
      res
        .status(500)
        .json({ errors: { param: "Internal Error", msg: err.message } })
    }
  }
)

module.exports = router
