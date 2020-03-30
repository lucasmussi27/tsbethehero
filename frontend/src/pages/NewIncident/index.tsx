import React, { useState, ChangeEvent } from "react"
import logo from "../../assets/logo.svg"
import { FiArrowLeft } from "react-icons/fi"
import api from "../../services/api"
import { Link, useHistory } from "react-router-dom"
import "./styles.css"

const NewIncident = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [value, setValue] = useState('')
  const ongId = localStorage.getItem('ongId')
  const history = useHistory()
  
  async function handleSubmit(e: any) {
    e.preventDefault()
    try {
      await api.post('incidents', {
        title, description, value
      }, { headers: { Authorization: ongId }})
      alert('A new incident was registered!')
      history.push('/profile')
    } catch (error) {
      alert('Error in register new incident, try again.')
    }
  }

  return(
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logo} alt="Be The Hero" />
          <h1>Register new Incident</h1>
          <p>Describe in details the incident to find a hero to solve it</p>
          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#4120e0" />
            Back to profile
          </Link>
        </section>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Title"
            value={title}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
          />
          <input
            placeholder="Value"
            value={value}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
          />
          <button type="submit" className="button">Register</button>
        </form>
      </div>
    </div>
  )
}

export default NewIncident