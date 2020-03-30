import React, { ChangeEvent, useState } from "react"
import { FiArrowLeft } from "react-icons/fi"
import logo from "../../assets/logo.svg"
import api from "../../services/api"
import { Link, useHistory } from "react-router-dom"
import "./styles.css"

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [city, setCity] = useState('')
  const [uf, setUF] = useState('')
  const history = useHistory()

  async function handleRegister(e: any) {
    e.preventDefault()
    try {
      const response = await api.post('ongs', {
        name, email, whatsapp, city, uf
      })
      alert(`Your Access ID: ${response.data.id}`)
      history.push('/')
    } catch (error) {
      alert('Error in register, try again.')
    }
  }

  return(
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logo} alt="Be The Hero" />
          <h1>Register</h1>
          <p>Make your registration, enter in the plataform and help people to find your ONG's incidents</p>
          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#4120e0" />
            Back to Logon
          </Link>
        </section>
        <form onSubmit={handleRegister}>
          <input 
            placeholder="ONG Name"
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
          />
          <input 
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          />
          <input 
            placeholder="Whatsapp"
            value={whatsapp}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setWhatsapp(e.target.value)}
          />
          <div className="input-group">
            <input
              placeholder="City"
              value={city}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setCity(e.target.value)}
            />
            <input
              style={{ width: 80 }}
              placeholder="UF"
              value={uf}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setUF(e.target.value)}
            />
          </div>
          <button type="submit" className="button">Register</button>
        </form>
      </div>
    </div>
  )
}

export default Register