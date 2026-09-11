import { useState } from 'react'
import { CATEGORIES, PRIORITES } from './constants'

function Tache({ tache, onToggle, onSupprimer, onModifier, toutesCategories }) {
    const { id, titre, categorie, priorite, dateEcheance, complete } = tache
    const [enEdition, setEnEdition] = useState(false)
    const [champs, setChamps] = useState({
        titre, categorie, priorite,
        dateEcheance: dateEcheance || ''
    })

    const estEnRetard = !complete
      && dateEcheance
      && new Date(dateEcheance) < new Date()

    const formatDate = (str) =>
      new Date(str).toLocaleDateString('fr-FR', {
        weekday: 'long',
        day: 'numeric',
        month: 'short'
      })

    const set = (champ) => (e) => setChamps(prev => ({ ...prev, [champ]: e.target.value }))

    const sauvegarder = () => {
        if (!champs.titre.trim()) return
        onModifier(id, champs)
        setEnEdition(false)
    }

    const annuler = () => {
        setChamps({ titre, categorie, priorite, dateEcheance: dateEcheance || '' })
        setEnEdition(false)
    }

    if (enEdition) {
        return (
            <div className={`tache tache--edition tache--${champs.priorite}`}>
                <div className="tache__bande" />
                <div className="tache__edition">
                    <input
                        className="tache__edit-titre"
                        value={champs.titre}
                        onChange={set('titre')}
                        onKeyDown={e => { if (e.key === 'Enter') sauvegarder(); if (e.key === 'Escape') annuler() }}
                        autoFocus
                        placeholder="Titre de la tâche"
                    />
                    <div className="tache__edit-options">
                        <select value={champs.categorie} onChange={set('categorie')} style={{ textAlignLast: 'center' }}>
                            {(toutesCategories || CATEGORIES).map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                        <select value={champs.priorite} onChange={set('priorite')} style={{ textAlignLast: 'center' }}>
                            {PRIORITES.map(p => <option key={p} value={p}>{p}</option>)}
                        </select>
                        <input
                            type="date"
                            value={champs.dateEcheance}
                            onChange={set('dateEcheance')}
                            style={{ color: '#18180F', WebkitTextFillColor: '#18180F', colorScheme: 'light', textAlignLast: 'center' }}
                        />
                    </div>
                    <div className="tache__edit-actions">
                        <button className="btn-sauvegarder" onClick={sauvegarder}>✓ Enregistrer</button>
                        <button className="btn-annuler" onClick={annuler}>Annuler</button>
                    </div>
                </div>
            </div>
        )
    }

    return (
      <div className={[
        'tache',
        `tache--${priorite}`,
        complete ? 'tache--complete' : '',
        estEnRetard ? 'tache--retard' : ''
      ].join(' ')}>

        <div className="tache__bande" />

        <input
          type="checkbox"
          className="tache__check"
          checked={complete}
          onChange={() => onToggle(id)}
          aria-label={`Marquer comme ${complete ? 'non ' : ''}terminée`}
        />

        <div className="tache__corps">
          <span className="tache__titre">{titre}</span>
          <div className="tache__badges">
            <span className="badge badge--cat">{categorie}</span>
            {dateEcheance && (
              <span className={`badge ${estEnRetard ? 'badge--retard' : 'badge--date'}`}>
                {estEnRetard ? '⚠ ' : (
                  <svg
                    width="12" height="12" viewBox="0 0 24 24"
                    fill="none" stroke="black" strokeWidth="2"
                    style={{ marginRight: 3, verticalAlign: 'middle' }}
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                )}
                {formatDate(dateEcheance)}
              </span>
            )}
          </div>
        </div>

        <button
          className="tache__edit-btn"
          onClick={() => setEnEdition(true)}
          aria-label={`Modifier "${titre}"`}
        >
          ✏
        </button>

        <button
          className="tache__suppr"
          onClick={() => onSupprimer(id)}
          aria-label={`Supprimer "${titre}"`}
        >
          ✕
        </button>
      </div>
    )
  }

  export default Tache
