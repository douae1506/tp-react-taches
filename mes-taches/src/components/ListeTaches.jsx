
import Tache from './Tache'

function ListeTaches({ taches, onBasculer, onSupprimer, onModifier }) {
  if (taches.length === 0) {
    return <p>Aucune tâche pour le moment.</p>
  }

  return (
    <ul>
      {taches.map((tache) => (
        <Tache
          key={tache.id}
          id={tache.id}
          titre={tache.titre}
          terminee={tache.terminee}
          onBasculer={onBasculer}
          onSupprimer={onSupprimer}
          onModifier={onModifier}
        />
      ))}
    </ul>
  )
}

export default ListeTaches
