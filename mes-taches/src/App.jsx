import { useState } from 'react'

import Entete from './components/Entete'
import ListeTaches from './components/ListeTaches'
import Pied from './components/Pied'
import Carte from './components/Carte'
import Compteur from './components/Compteur'

const TACHES_INITIALES = [
  { id: 1, titre: 'Installer Node.js et Vite', terminee: true },
  { id: 2, titre: 'Comprendre les composants', terminee: true },
  { id: 3, titre: 'Passer des données avec les props', terminee: false },
  { id: 4, titre: 'Gérer l’état avec useState', terminee: false },
]

function App() {
  const [taches, setTaches] = useState(TACHES_INITIALES)

  function basculerTache(id) {
    setTaches(
      taches.map((tache) =>
        tache.id === id
          ? { ...tache, terminee: !tache.terminee }
          : tache
      )
    )
  }

  function supprimerTache(id) {
    setTaches(taches.filter((tache) => tache.id !== id))
  }

  return (
    <>
      <Entete
        titre="Mes tâches"
        sousTitre="Organisez votre travail simplement"
      />

      <main>
        <Carte titre="Ma liste">
          <ListeTaches
            taches={taches}
            onBasculer={basculerTache}
            onSupprimer={supprimerTache}
          />
        </Carte>

        <Carte titre="Compteur">
          <Compteur />
        </Carte>
      </main>

      <Pied auteur="Douae Tahiri" />
    </>
  )
}

export default App