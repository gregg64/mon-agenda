import { useState } from "react";
import Tache from "./Tache";
import FiltreBarre from './FiltreBarre'
import { CATEGORIES, PRIORITES } from "./constants";

const ORDRE_PRIORITE = { haute: 0, normale: 1, basse: 2 }

function ListeTaches({ taches, onToggle, onSupprimer }) {
    const [filtreCategorie, setFiltreCategorie] = useState('Toutes')
    const [filtrePriorite, setFiltrePriorite] = useState('Toutes')
    const [masquerCompletes, setMasquerCompletes] = useState(false)
    const [filtreDate, setFiltreDate] = useState ('')

    const tachesFiltrees = taches
        .filter(t => {
            if (masquerCompletes && t.complete) return false
            if (filtreCategorie !== 'Toutes' && t.categorie !== filtreCategorie) return false
            if (filtrePriorite !== 'Toutes' && t.priorite !== filtrePriorite) return false
            if (filtreDate && t.dateEcheance !== filtreDate) return false
            return true
        })
        .sort((a, b) => {
            // Complètes toujours en bas
            if (a.complete !== b.complete) return a.complete ? 1 : -1
            // Sans date en premier
            const aDate = a.dateEcheance || ''
            const bDate = b.dateEcheance || ''
            if (!aDate && bDate) return -1
            if (aDate && !bDate) return 1
            // Ensuite par date croissante (plus ancienne d'abord)
            if (aDate && bDate) return aDate.localeCompare(bDate)
            return 0
        })

    return (
        <section className='liste-section'>
            <FiltreBarre
                categories={['Toutes', ...CATEGORIES]}
                priorites={['Toutes', ...PRIORITES]}
                filtreCategorie={filtreCategorie}
                filtrePriorite={filtrePriorite}
                masquerCompletes={masquerCompletes}
                onCategorie={setFiltreCategorie}
                onPriorite={setFiltrePriorite}
                onToggleMasquer={() => setMasquerCompletes(p => !p)}
                total={tachesFiltrees.length}
                filtreDate={filtreDate}
                onDate={setFiltreDate}
            />

            {tachesFiltrees.length === 0 ? (
                <p className="liste-vide">
                    Aucune tâche à afficher. Tu peux te détendre ^^
                </p>
            ) : (
                <div className="liste-taches">
                    {tachesFiltrees.map(tache => (
                        <Tache
                            key={tache.id}
                            tache={tache}
                            onToggle={onToggle}
                            onSupprimer={onSupprimer}
                        />
                    ))}
                </div>
            )}
        </section>
    )
}

export default ListeTaches
