import { useState, useEffect } from 'react'
import FormulaireAjout from './FormulaireAjout'
import ListeTaches from './ListeTaches'
import SelectionProfil from './SelectionProfil'
import ErrorBoundary from './ErrorBoundary'
import { supabase } from './supabase'
import './App.css'

const PROFILS = { fiona: 'Fiona', greg: 'Greg', maison: 'Maison' }

function App() {
  const [profilActif, setProfilActif] = useState(() => {
    return localStorage.getItem('agenda-profil-actif') || null
  })
  const [taches, setTaches] = useState([])
  const [chargement, setChargement] = useState(false)
  const [categoriesPerso, setCategoriesPerso] = useState([])
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('agenda-dark-mode') === 'true'
    if (saved) document.documentElement.classList.add('dark')
    return saved
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
    localStorage.setItem('agenda-dark-mode', darkMode)
  }, [darkMode])

  useEffect(() => {
    const chargerCategories = async () => {
      const { data, error } = await supabase.from('categories_perso').select('*').order('nom')
      if (!error) setCategoriesPerso(data || [])
    }
    chargerCategories()
  }, [])

  useEffect(() => {
    if (!profilActif) return
    const chargerTaches = async () => {
      setChargement(true)
      const { data, error } = await supabase
        .from('taches')
        .select('*')
        .eq('profil', profilActif)
      if (!error) setTaches(data || [])
      setChargement(false)
    }
    chargerTaches()

    const handleVisibilite = () => {
      if (document.visibilityState === 'visible') chargerTaches()
    }
    document.addEventListener('visibilitychange', handleVisibilite)
    return () => document.removeEventListener('visibilitychange', handleVisibilite)
  }, [profilActif])

  const choisirProfil = (id) => {
    localStorage.setItem('agenda-profil-actif', id)
    setProfilActif(id)
  }

  const changerProfil = () => {
    localStorage.removeItem('agenda-profil-actif')
    setProfilActif(null)
    setTaches([])
  }

  const ajouterTache = async (donnee) => {
    const nouvelleTache = {
      ...donnee,
      id: crypto.randomUUID(),
      profil: profilActif,
      complete: false,
      creeLe: Date.now()
    }
    const { error } = await supabase.from('taches').insert(nouvelleTache)
    if (error) {
      console.error('Erreur Supabase insert:', error)
      alert('Erreur ajout: ' + error.message)
    } else {
      setTaches(prev => [nouvelleTache, ...prev])
    }
  }

  const ajouterCategorie = async (nom) => {
    const nouvelleCategorie = { id: crypto.randomUUID(), nom }
    const { error } = await supabase.from('categories_perso').insert(nouvelleCategorie)
    if (!error) setCategoriesPerso(prev => [...prev, nouvelleCategorie].sort((a, b) => a.nom.localeCompare(b.nom)))
  }

  const supprimerCategorie = async (id) => {
    const { error } = await supabase.from('categories_perso').delete().eq('id', id)
    if (!error) setCategoriesPerso(prev => prev.filter(c => c.id !== id))
  }

  const modifierTache = async (id, champs) => {
    const { error } = await supabase
      .from('taches')
      .update(champs)
      .eq('id', id)
    if (!error) setTaches(prev =>
      prev.map(t => t.id === id ? { ...t, ...champs } : t)
    )
  }

  const supprimerTache = async (id) => {
    const { error } = await supabase.from('taches').delete().eq('id', id)
    if (!error) setTaches(prev => prev.filter(t => t.id !== id))
  }

  const toggleComplete = async (id) => {
    const tache = taches.find(t => t.id === id)
    const { error } = await supabase
      .from('taches')
      .update({ complete: !tache.complete })
      .eq('id', id)
    if (!error) setTaches(prev =>
      prev.map(t => t.id === id ? { ...t, complete: !t.complete } : t)
    )
  }

  if (!profilActif) {
    return <SelectionProfil onSelectionner={choisirProfil} />
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-titre">Mon Agenda</h1>
        <div className="app-header-droite">
          <span className="app-compteur">
            {taches.filter(t => !t.complete).length} à faire
          </span>
          <button
            className="btn-dark-mode"
            onClick={() => setDarkMode(d => !d)}
            title={darkMode ? 'Mode clair' : 'Mode sombre'}
            aria-label={darkMode ? 'Activer le mode clair' : 'Activer le mode sombre'}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
          <button className="btn-changer-profil" onClick={changerProfil}>
            {PROFILS[profilActif]} ↩
          </button>
        </div>
      </header>

      {chargement ? (
        <p style={{ textAlign: 'center', color: '#8A8A80', padding: '40px 0' }}>
          Chargement...
        </p>
      ) : (
        <>
          <FormulaireAjout
            onAjouter={ajouterTache}
            categoriesPerso={categoriesPerso}
            onAjouterCategorie={ajouterCategorie}
            onSupprimerCategorie={supprimerCategorie}
          />
          <ErrorBoundary>
            <ListeTaches
              taches={taches}
              onToggle={toggleComplete}
              onSupprimer={supprimerTache}
              onModifier={modifierTache}
              categoriesPerso={categoriesPerso}
            />
          </ErrorBoundary>
        </>
      )}
    </div>
  )
}

export default App
