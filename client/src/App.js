import React, { useState } from "react"
import Styles from "./App.module.css"
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap"
import axios from "axios"

function App() {
  const [inputText, setInputText] = useState("")
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState(null)
  const [error, setError] = useState(null)

  const checkSentenceHandler = async () => {
    try {
      setLoading(true)
      const apiCall = await axios.post(
        "/api/words",
        { sentence: inputText },
        { headers: { "Content-Type": "application/json" } }
      )
      setResults((prev) => apiCall.data)
      setError(null)
      setLoading(false)
    } catch (err) {
      setResults(null)
      setError(err.response.data.errors[0].msg)
      setLoading(false)
    }
  }
  return (
    <Container fluid className="h-100">
      <Row className="h-100 align-items-center">
        <Col xl={{ offset: 3, span: 6 }}>
          <Row>
            <div className={Styles.AppHolder}>
              <h3>Check a sentence for a non English word</h3>
              <Form className="mb-3">
                <Form.Group className="mb-3" controlId="formBasicWord">
                  <Form.Label>Enter your sentence:</Form.Label>
                  <Form.Control
                    type="text"
                    value={inputText}
                    onChange={(e) =>
                      setInputText((prevState) => e.target.value)
                    }
                  />
                  {error && <p className="text-danger">{error}</p>}
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  onClick={checkSentenceHandler}
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Check"}
                </Button>
              </Form>
              {results ? (
                results.length > 0 ? (
                  <Alert variant="danger">
                    <Alert.Heading>
                      {results.length} Non-English words found:
                    </Alert.Heading>
                    <ul>
                      {results.map((data, index) => (
                        <li key={index}>{data}</li>
                      ))}
                    </ul>
                  </Alert>
                ) : (
                  <Alert variant="success">
                    <Alert.Heading>No non-english word found</Alert.Heading>
                  </Alert>
                )
              ) : null}
            </div>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}

export default App
