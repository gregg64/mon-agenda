import { useState } from 'react'
import { CATEGORIES, PRIORITES } from './constants'

function FormulaireAjout({ onAjouter }) {
    const [champs, setChamps] = useState({
        titre: '',
        categorie: CATEGORIES[0],
        priorite: 'normale',
        dateEcheance: '',
    })

    const set = (cle) => (e) =>
        setChamps(prev => ({ ...prev, [cle]: e.target.value }))

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!champs.titre.trim()) return
        onAjouter(champs)
        setChamps(prev => ({ ...prev, titre: '', dateEcheance: '' }))
    }

    return (
        <form onSubmit={handleSubmit} className='formulaire'>
            <input
                type="text"
                className='formulaire__titre'
                placeholder='Nouvelle tâche...'
                value={champs.titre}
                onChange={set('titre')}
                required
            />

            <div className='formulaire__options'>
                <select value={champs.categorie} onChange={set('categorie')}>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>

                <select value={champs.priorite} onChange={set('priorite')}>
                    {PRIORITES.map(p => (
                        <option key={p} value={p}>{p}</option>
                    ))}
                </select>

                <input
                    type="date"
                    value={champs.dateEcheance}
                    onChange={set('dateEcheance')}
                />

                <button type="submit" className="btn-ajouter">
                    + Ajouter
                </button>
            </div>
        </form>
    )
}

export default FormulaireAjout
