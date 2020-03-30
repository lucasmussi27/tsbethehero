import React, { useState, useEffect } from "react"
import { FiPower, FiTrash2 } from "react-icons/fi"
import logo from "../../assets/logo.svg"
import { useHistory, Link } from "react-router-dom"
import api from "../../services/api"
import "./styles.css"

const Profile = () => {
  const [incidents, setIncidents] = useState([])
  const ongId = localStorage.getItem('ongId')
  const ongName = localStorage.getItem('ongName')
  const history = useHistory()

  useEffect(() => {
    api.get('profile', {
      headers: { Authorization: ongId }
    }).then(response => {
      setIncidents(response.data)
    })
  }, [ongId])

  async function handleDelete(id: any) {
    try {
      await api.delete(`incidents/${id}`, {
        headers: { authorization: ongId }
      })
      setIncidents(incidents.filter((incident: any) => incident.id !== id))
    } catch (error) {
      alert('Error during removing incident, try again.')
    }
  }

  function handleLogout() {
    localStorage.clear()
    history.push('/')
  }

  return(
    <div className="profile-container">
      <header>
        <img src={logo} alt="Be The Hero" />
        <span>Welcome, {ongName}</span>
        <Link className="button" to="/incidents/new">Register new incident</Link>
        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#4120e0" />
        </button>
      </header>
      <h1>Registered Incidents</h1>
      <ul>
        {incidents.map((incident: any) => (
          <li key={incident.id}>
            <strong>INCIDENT:</strong>
            <p>{incident.title}</p>
            <strong>DESCRIPTION:</strong>
            <p>{incident.description}</p>
            <strong>VALUE:</strong>
            <p>{Intl.NumberFormat('pt-BR', {
              style:'currency', currency: 'BRL'
            }).format(incident.value)}</p>
            <button onClick={() => handleDelete(incident.id)} type="button">
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Profile