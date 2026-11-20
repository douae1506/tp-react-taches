
import { useEffect, useState } from 'react'

function Horloge() {
  const [heure, setHeure] = useState(new Date())

  useEffect(() => {
    const intervalle = setInterval(() => {
      setHeure(new Date())
    }, 1000)

    // Nettoyage lorsque le composant est démonté
    return () => {
      console.log('Nettoyage de l horloge')
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
