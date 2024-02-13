import { useEffect, useRef, useState } from 'react'
import './App.css'
import List from './components/List'
import Form from './components/Form'
import { Sub, SubsResponseFromApi } from './types'
import axios from 'axios'

// Interfaces
// interface Sub {
//   nick: string
//   avatar: string
//   subMonths: number
//   description?: string
// }

interface AppState {
  subs: Array<Sub>
  newSubsNumber: number
}
// ___________________________________

// const INITIAL_STATE = [
//   {
//     nick: 'depelu',
//     subMonths: 3,
//     avatar: 'http://i.pravatar.cc/150?u=dapelu',
//     description: 'Dapelu hace de moderador a veces...'
//   },
//   {
//     nick: 'Nolo Séh',
//     subMonths: 3,
//     avatar: 'http://i.pravatar.cc/150?u=cual',
//   }
// ]

function App() {

  const [subs, setSubs] = useState<AppState["subs"]>([])
  const [newSubsNumber, setNewSubsNumber] = useState<AppState["newSubsNumber"]>(0)
  const divRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // setSubs(INITIAL_STATE)

    //!FETCH
    // const fetchSubs = async (): Promise<SubsResponseFromApi> => {
    // return await fetch('http://localhost:3001/subs').then(res => res.json())

    //! AXIOS
    const fetchSubs = async (): Promise<SubsResponseFromApi> => {
      const response = await axios
        // También puedes pasar el tipo en .get<SubsResponseFromApi>()
        .get('http://localhost:3001/subs')
      return response.data
    }

    const mapFromApiToSubs = (apiResponse: SubsResponseFromApi): Array<Sub> => {
      return apiResponse.map(subFromApi => {
        const {
          nick,
          months: subMonths,
          profileUrl: avatar,
          description
        } = subFromApi

        return {
          nick,
          description,
          avatar,
          subMonths
        }
      })
    }

    fetchSubs()
      .then(apiSubs => {
        const subs = mapFromApiToSubs(apiSubs)
        setSubs(subs)
      })
  }, [])

  const handleNewSubs = (newSubs: Sub): void => {
    setSubs(subs => [...subs, newSubs])
    setNewSubsNumber(n => n + 1)
  }

  return (
    <div ref={divRef}>
      <h1>Subs</h1>
      <List subs={subs} />
      New Subs: {newSubsNumber}
      <Form onNewSub={handleNewSubs} />
    </div>
  )
}

export default App
