import React, { useState, useEffect } from "react"
import { Feather } from "@expo/vector-icons"
import { View, Image, Text, FlatList, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"
import logo from "../../assets/logo.png"
import api from "../../services/api"
import "./styles"
import styles from "./styles"

const Incidents = () => {
  const [incidents, setIncidents] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const navigation = useNavigation()

  async function loadIncidents() {
    if(loading) return;
    if(total > 0 && incidents.length === total) return;
    setLoading(true)
    const response = await api.get('incidents', {
      params: { page }
    })
    setIncidents([ ...incidents, ...response.data ])
    setTotal(response.headers['X-Total-Count'])
    setPage(page + 1)
    setLoading(false)
  }

  useEffect(() => {
    loadIncidents()
  }, [])

  function navigateToDetail(incident: any) {
    navigation.navigate('Detail', { incident })
  }

  return(
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logo} />
        <Text style={styles.headerText}>
          Total of <Text style={styles.headerTextBold}>{total}</Text> incidents
        </Text>
      </View>
      <Text style={styles.title}>Welcome!</Text>
      <Text style={styles.description}>Choose one of these incidents and save the day</Text>
      <FlatList 
        style={styles.incidentList}
        data={incidents}
        keyExtractor={incident => String(incident.id)}
        onEndReached={loadIncidents}
        onEndReachedThreshold={0.2}
        renderItem={({item: incident}) => (
          <View style={styles.incident}>
            <Text style={styles.incidentProperty}>ONG:</Text>
            <Text style={styles.incidentValue}>{incident.name}</Text>
            <Text style={styles.incidentProperty}>INCIDENT:</Text>
            <Text style={styles.incidentValue}>{incident.title}</Text>
            <Text style={styles.incidentProperty}>VALUE:</Text>
            <Text style={styles.incidentValue}>{incident.value}</Text>
            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() => navigateToDetail(incident)}
            > <Text style={styles.detailsButtonText}>
                <Feather name="arrow-right" size={16} color="#4120e0" />
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    
    </View>
  )
}

export default Incidents