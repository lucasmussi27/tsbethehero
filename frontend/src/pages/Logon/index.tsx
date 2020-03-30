import React, { useState, ChangeEvent } from "react"
import { FiLogIn } from "react-icons/fi"
import heroes from "../../assets/heroes.png"
import logo from "../../assets/logo.svg"
import "./styles.css"
import api from "../../services/api"
import { useHistory, Link } from "react-router-dom"

const Logon = () => {
  const [id, setId] = useState('')
  const history = useHistory()

  async function handleLogin(e: any) {
    e.preventDefault()
    try {
      const response = await api.post('sessions', { id })
      localStorage.setItem('ongId', id)
      localStorage.setItem('ongName', response.data.name)
      history.push('/profile')
    } catch (error) {
      alert('Failed to login, try again.')
    }
  }

  return(
    <div className="logon-container">
      <section className="form">
        <img src={logo} alt="Be The Hero" />
        <form onSubmit={handleLogin}>
          <h1>Do your logon</h1>
          <input
            placeholder="Your ID"
            value={id}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setId(e.target.value)}
          />
          <button className="button" type="submit">LOGIN</button>
          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#4120e0" />
            Not registered yet?
          </Link>
        </form>
      </section>
      <img src={heroes} alt="Heroes" />
    </div>
  )
}

export default Logon