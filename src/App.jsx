import { useState, useEffect } from 'react';
import FormulaireAjout from './FormulaireAjout'
import ListeTaches from './ListeTaches'
import SelectionProfil from './SelectionProfil'
import './App.css'

const TACHES_EXEMPLE = [
  {
    id: '1',
    titre: 'Finir mon app',
    categorie: 'Apprentissage',
    priorite: 'haute',
    dateEcheance: '2026-09-30',
    complete: false,
    creeLe: Date.now()
  }
]

function App() {
  const [profilActif, setProfilActif] = useState(() => {
    return localStorage.getItem('agenda-profil-actif') || null
  })

  const [taches, setTaches] = useState(() => {
    const profil = localStorage.getItem('agenda-profil-actif')
    if (!profil) return []
    try {
      const sauvegardees = localStorage.getItem(`agenda-taches-${profil}`)
      return sauvegardees ? JSON.parse(sauvegardees) : TACHES_EXEMPLE
    } catch {
      return TACHES_EXEMPLE
    }
  })

  useEffect(() => {
    if (profilActif) {
      localStorage.setItem('agenda-profil-actif', profilActif)
      localStorage.setItem(`agenda-taches-${profilActif}`, JSON.stringify(taches))
    }
  }, [taches, profilActif])

  const choisirProfil = (id) => {
    const sauvegardees = localStorage.getItem(`agenda-taches-${id}`)
    setTaches(sauvegardees ? JSON.parse(sauvegardees) : TACHES_EXEMPLE)
    setProfilActif(id)
  }

  const changerProfil = () => {
    localStorage.removeItem('agenda-profil-actif')
    setProfilActif(null)
    setTaches([])
  }

  const nomProfil = { fiona: 'Fiona', greg: 'Greg', maison: 'Maison' }

  const ajouterTache = (donnee) => {
    setTaches(prev => [{
      ...donnee,
      id: crypto.randomUUID(),
      complete: false,
      creeLe: Date.now()
    }, ...prev])
  }

  const supprimerTache = (id) => {
    setTaches(prev => prev.filter(t => t.id !== id))
  }

  const toggleComplete = (id) => {
    setTaches(prev =>
      prev.map(t => t.id === id ? { ...t, complete: !t.complete } : t)
    )
  }

  if (!profilActif) {
    return <SelectionProfil onSelectionner={choisirProfil} />
  }

  return (
    <div className="app">
      <header className='app-header'>
        <h1 className='app-titre'>Mon Agenda</h1>
        <div className="app-header-droite">
          <span className='app-compteur'>
            {taches.filter(t => !t.complete).length} à faire
          </span>
          <button className="btn-changer-profil" onClick={changerProfil}>
            {nomProfil[profilActif]} ↩
          </button>
        </div>
      </header>

      <FormulaireAjout onAjouter={ajouterTache} />

      <ListeTaches
        taches={taches}
        onToggle={toggleComplete}
        onSupprimer={supprimerTache}
      />
    </div>
  )
}

export default App
