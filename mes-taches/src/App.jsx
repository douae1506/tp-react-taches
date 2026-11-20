import { useState } from 'react'

import Entete from './components/Entete'
import ListeTaches from './components/ListeTaches'
import Pied from './components/Pied'
import Carte from './components/Carte'
import FormulaireAjout from './components/FormulaireAjout'
import Filtres from './components/Filtres'
import Statistiques from './components/Statistiques'

const TACHES_INITIALES = [
  { id: 1, titre: 'Installer Node.js et Vite', terminee: true },
  { id: 2, titre: 'Comprendre les composants', terminee: true },
  { id: 3, titre: 'Passer des données avec les props', terminee: false },
  { id: 4, titre: 'Gérer l’état avec useState', terminee: false },
]

function App() {
  const [taches, setTaches] = useState(TACHES_INITIALES)
  const [filtre, setFiltre] = useState('toutes')

  function basculerTache(id) {
    setTaches((anciennesTaches) =>
      anciennesTaches.map((tache) =>
        tache.id === id
          ? { ...tache, terminee: !tache.terminee }
          : tache
      )
    )
  }

  function supprimerTache(id) {
    setTaches((anciennesTaches) =>
      anciennesTaches.filter((tache) => tache.id !== id)
    )
  }

  function ajouterTache(titre) {
    const nouvelleTache = {
      id: Date.now(),
      titre: titre,
      terminee: false,
    }

    setTaches((anciennesTaches) => [...anciennesTaches, nouvelleTache])
  }

  const tachesVisibles = taches.filter((tache) => {
    if (filtre === 'actives') return !tache.terminee
    if (filtre === 'terminees') return tache.terminee
    return true
  })

  return (
    <>
      <Entete
        titre="Mes tâches"
        sousTitre="Organisez votre travail simplement"
      />

      <main>
        <Carte titre="Ma liste">
          <FormulaireAjout onAjouter={ajouterTache} />

          <Filtres filtre={filtre} setFiltre={setFiltre} />

          <ListeTaches
            taches={tachesVisibles}
            onBasculer={basculerTache}
            onSupprimer={supprimerTache}
          />

          <Statistiques taches={taches} />
        </Carte>
      </main>

      <Pied auteur="Douae Tahiri" />
    </>
  )
}

export default App