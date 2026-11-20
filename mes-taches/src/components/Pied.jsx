const ANNEE = new Date().getFullYear()

function Pied() {
  return (
    <footer>
      <p>TP React – {ANNEE}</p>
    </footer>
  )
}

export default Pied