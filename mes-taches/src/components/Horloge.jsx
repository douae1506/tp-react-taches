import { useEffect, useState } from 'react'

function Horloge() {
  const [heure, setHeure] = useState(new Date())

  useEffect(() => {
    const intervalle = setInterval(() => {
      setHeure(new Date())
    }, 1000)

    return () => {
      clearInterval(intervalle)
    }
  }, [])

  return (
    <p>
      Heure actuelle : {heure.toLocaleTimeString('fr-FR')}
    </p>
  )
}

export default Horloge