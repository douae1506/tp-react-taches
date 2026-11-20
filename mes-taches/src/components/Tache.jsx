
import { useState } from 'react'

function Tache({ id, titre, terminee, onBasculer, onSupprimer, onModifier }) {
  const [enEdition, setEnEdition] = useState(false)
  const [nouveauTitre, setNouveauTitre] = useState(titre)

  function enregistrerModification() {
    const titreFinal = nouveauTitre.trim()

    if (titreFinal !== '') {
      onModifier(id, titreFinal)
      setEnEdition(false)
    }
  }

  function gererClavier(e) {
    if (e.key === 'Enter') {
      enregistrerModification()
    }

    if (e.key === 'Escape') {
      setNouveauTitre(titre)
      setEnEdition(false)
    }
  }

  return (
    <li className={terminee ? 'tache terminee' : 'tache'}>
      <label>
        <input
          type="checkbox"
          checked={terminee}
          onChange={() => onBasculer(id)}
        />

        {enEdition ? (
          <input
            type="text"
            value={nouveauTitre}
            autoFocus
            onChange={(e) => setNouveauTitre(e.target.value)}
            onKeyDown={gererClavier}
          />
        ) : (
          <span onDoubleClick={() => setEnEdition(true)}>
            {titre}
          </span>
        )}
      </label>

      <button
        className="danger"
        onClick={() => onSupprimer(id)}
      >
        Supprimer
      </button>
    </li>
  )
}

export default Tache
