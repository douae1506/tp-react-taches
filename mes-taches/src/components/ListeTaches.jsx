import Tache from './Tache'

function ListeTaches({ taches }) {
  if (taches.length === 0) {
    return <p>Aucune tâche pour le moment.</p>
  }

  return (
    <ul>
      {taches.map((tache) => (
        <Tache
          key={tache.id}
          titre={tache.titre}
          terminee={tache.terminee}
        />
      ))}
    </ul>
  )
}

export default ListeTaches