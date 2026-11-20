function ListeTaches() {
  const taches = [
    { id: 1, titre: 'Installer Node.js et Vite', terminee: true },
    { id: 2, titre: 'Comprendre les composants React', terminee: false },
    { id: 3, titre: 'Créer ma première application', terminee: false },
  ]

  return (
    <ul>
      {taches.map((tache) => (
        <li key={tache.id}>
          {tache.terminee ? '✅' : '⬜'} {tache.titre}
        </li>
      ))}
    </ul>
  )
}

export default ListeTaches