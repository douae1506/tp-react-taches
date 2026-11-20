
import { useEffect, useState } from 'react'

import Entete from './components/Entete'
import ListeTaches from './components/ListeTaches'
import Pied from './components/Pied'
import Carte from './components/Carte'
import FormulaireAjout from './components/FormulaireAjout'
import Filtres from './components/Filtres'
import Statistiques from './components/Statistiques'
import Horloge from './components/Horloge'

function App() {
  const [taches, setTaches] = useState([])
  const [filtre, setFiltre] = useState('toutes')
  const [chargement, setChargement] = useState(true)
  const [erreur, setErreur] = useState(null)

  const [afficherHorloge, setAfficherHorloge] = useState(true)

  useEffect(() => {
    let actif = true

    const sauvegarde = localStorage.getItem('mes-taches')

    if (sauvegarde) {
      try {
        const donnees = JSON.parse(sauvegarde)

        if (!Array.isArray(donnees)) {
          throw new Error('Format de sauvegarde invalide')
        }

        setTaches(donnees)
        setChargement(false)

        return () => {
          actif = false
        }
      } catch {
        localStorage.removeItem('mes-taches')
      }
    }

    fetch('/taches.json')
      .then((reponse) => {
        if (!reponse.ok) {
          throw new Error('Erreur lors du chargement des tâches')
        }

        return reponse.json()
      })
      .then((donnees) => {
        if (actif) {
          setTaches(donnees)
        }
      })
      .catch((err) => {
        if (actif) {
          setErreur(err.message)
        }
      })
      .finally(() => {
        if (actif) {
          setChargement(false)
        }
      })

    return () => {
      actif = false
    }
  }, [])

  useEffect(() => {
    if (!chargement && !erreur) {
      localStorage.setItem('mes-taches', JSON.stringify(taches))
    }
  }, [taches, chargement, erreur])

  const restantes = taches.filter(
    (tache) => !tache.terminee
  ).length

  useEffect(() => {
    document.title = `(${restantes}) Mes tâches`
  }, [restantes])

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

    setTaches((anciennesTaches) => [
      ...anciennesTaches,
      nouvelleTache,
    ])
  }

  function supprimerTachesTerminees() {
    setTaches((anciennesTaches) =>
      anciennesTaches.filter((tache) => !tache.terminee)
    )
  }

  function modifierTache(id, nouveauTitre) {
    setTaches((anciennesTaches) =>
      anciennesTaches.map((tache) =>
        tache.id === id
          ? { ...tache, titre: nouveauTitre }
          : tache
      )
    )
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

          {}
          <button
            onClick={() => setAfficherHorloge(!afficherHorloge)}
          >
            {afficherHorloge
              ? 'Masquer l horloge'
              : 'Afficher l horloge'}
          </button>

          {afficherHorloge && <Horloge />}

          {chargement ? (
            <p>Chargement des tâches...</p>
          ) : erreur ? (
            <p>Erreur : {erreur}</p>
          ) : (
            <>
              <FormulaireAjout onAjouter={ajouterTache} />

              <Filtres
                filtre={filtre}
                setFiltre={setFiltre}
              />

              <ListeTaches
                taches={tachesVisibles}
                onBasculer={basculerTache}
                onSupprimer={supprimerTache}
                onModifier={modifierTache}
              />

              <Statistiques taches={taches} />

              {/* Bonus 2 : supprimer les tâches terminées */}
              <button
                onClick={supprimerTachesTerminees}
                disabled={!taches.some((tache) => tache.terminee)}
              >
                Supprimer les tâches terminées
              </button>
            </>
          )}
        </Carte>
      </main>

      <Pied auteur="Douae Tahiri" />
    </>
  )
}

export default App
