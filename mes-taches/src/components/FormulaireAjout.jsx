import { useState } from 'react'

function FormulaireAjout({ onAjouter }) {
  const [titre, setTitre] = useState('')

  function gererSoumission(e) {
    e.preventDefault()

    const titreNettoye = titre.trim()

    if (titreNettoye === '') return

    onAjouter(titreNettoye)
    setTitre('')
  }

  return (
    <form onSubmit={gererSoumission}>
      <input
        type="text"
        placeholder="Nouvelle tâche..."
        value={titre}
        onChange={(e) => setTitre(e.target.value)}
      />

      <button type="submit" disabled={titre.trim() === ''}>
        Ajouter
      </button>
    </form>
  )
}

export default FormulaireAjout