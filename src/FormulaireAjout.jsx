import { useState } from 'react'
import { CATEGORIES, PRIORITES } from './constants'

function FormulaireAjout({ onAjouter, categoriesPerso, onAjouterCategorie, onSupprimerCategorie }) {
    const [champs, setChamps] = useState({
        titre: '',
        categorie: CATEGORIES[0],
        priorite: 'normale',
        dateEcheance: '',
    })
    const [gererCats, setGererCats] = useState(false)
    const [nouvelleCategorie, setNouvelleCategorie] = useState('')

    const toutesCategories = [...CATEGORIES, ...(categoriesPerso || []).map(c => c.nom)]

    const set = (cle) => (e) =>
        setChamps(prev => ({ ...prev, [cle]: e.target.value }))

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!champs.titre.trim()) return
        onAjouter(champs)
        setChamps(prev => ({ ...prev, titre: '', dateEcheance: '' }))
    }

    const handleAjouterCategorie = () => {
        const nom = nouvelleCategorie.trim()
        if (!nom || toutesCategories.includes(nom)) return
        onAjouterCategorie(nom)
        setNouvelleCategorie('')
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
                <div className="formulaire__cat-wrap">
                    <select
                        value={champs.categorie}
                        onChange={set('categorie')}
                        style={{ textAlignLast: 'center', flex: 1, minWidth: 0 }}
                    >
                        {toutesCategories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <button
                        type="button"
                        className={`btn-gerer-cats${gererCats ? ' actif' : ''}`}
                        onClick={() => setGererCats(g => !g)}
                        title="Gérer les catégories"
                    >⚙</button>
                </div>

                <select value={champs.priorite} onChange={set('priorite')} style={{ textAlignLast: 'center' }}>
                    {PRIORITES.map(p => (
                        <option key={p} value={p}>{p}</option>
                    ))}
                </select>

                <input
                    type="date"
                    value={champs.dateEcheance}
                    onChange={set('dateEcheance')}
                    style={{ color: '#18180F', WebkitTextFillColor: '#18180F', colorScheme: 'light' }}
                />

                <button type="submit" className="btn-ajouter">
                    + Ajouter
                </button>
            </div>

            {gererCats && (
                <div className="gerer-cats">
                    <p className="gerer-cats__titre">Gérer les catégories</p>
                    <div className="gerer-cats__ajout">
                        <input
                            type="text"
                            className="gerer-cats__input"
                            placeholder="Nouvelle catégorie..."
                            value={nouvelleCategorie}
                            onChange={e => setNouvelleCategorie(e.target.value)}
                            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAjouterCategorie() } }}
                        />
                        <button type="button" className="gerer-cats__btn-add" onClick={handleAjouterCategorie}>+</button>
                    </div>
                    <ul className="gerer-cats__liste">
                        {CATEGORIES.map(c => (
                            <li key={c} className="gerer-cats__item gerer-cats__item--defaut">
                                <span>{c}</span>
                                <span className="gerer-cats__label-defaut">défaut</span>
                            </li>
                        ))}
                        {(categoriesPerso || []).map(c => (
                            <li key={c.id} className="gerer-cats__item">
                                <span>{c.nom}</span>
                                <button
                                    type="button"
                                    className="gerer-cats__suppr"
                                    onClick={() => onSupprimerCategorie(c.id)}
                                    aria-label={`Supprimer ${c.nom}`}
                                >✕</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </form>
    )
}

export default FormulaireAjout
