import React from "react"
import Styles from "./App.module.css"
import { Container, Row, Col } from "react-bootstrap"

function App() {
  return (
    <Container>
      <Row>
        <Col>
          <div className={Styles.AppHolder}></div>
        </Col>
      </Row>
    </Container>
  )
}

export default App
