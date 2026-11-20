function Statistiques({ taches }) {
  const total = taches.length
  const terminees = taches.filter((tache) => tache.terminee).length
  const restantes = total - terminees

  return (
    <div className="statistiques">
      <p>Total : {total}</p>
      <p>Terminées : {terminees}</p>
      <p>Restantes : {restantes}</p>
    </div>
  )
}

export default Statistiques