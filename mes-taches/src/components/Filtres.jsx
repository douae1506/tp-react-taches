function Filtres({ filtre, setFiltre }) {
  const options = [
    { valeur: 'toutes', texte: 'Toutes' },
    { valeur: 'actives', texte: 'Actives' },
    { valeur: 'terminees', texte: 'Terminées' },
  ]

  return (
    <div className="filtres">
      {options.map((option) => (
        <button
          key={option.valeur}
          className={filtre === option.valeur ? 'actif' : ''}
          onClick={() => setFiltre(option.valeur)}
        >
          {option.texte}
        </button>
      ))}
    </div>
  )
}

export default Filtres