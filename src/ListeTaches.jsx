import { useState } from "react";
import { DndContext, closestCenter, PointerSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable'
import Tache from "./Tache";
import FiltreBarre from './FiltreBarre'
import { CATEGORIES, PRIORITES, CATEGORIES_PAR_PROFIL } from "./constants";

function ListeTaches({ taches, onToggle, onSupprimer, onModifier, categoriesPerso, profilActif, onReordonner }) {
    const [filtreCategorie, setFiltreCategorie] = useState('Toutes')
    const [filtrePriorite, setFiltrePriorite] = useState('Toutes')
    const [masquerCompletes, setMasquerCompletes] = useState(false)
    const [filtreDate, setFiltreDate] = useState('')

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
        useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 8 } })
    )

    const categoriesDefaut = CATEGORIES_PAR_PROFIL[profilActif] || CATEGORIES
    const toutesCategories = [...categoriesDefaut, ...(categoriesPerso || []).map(c => c.nom)]

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
            // Ordre manuel si défini
            if (a.ordre != null && b.ordre != null) return a.ordre - b.ordre
            if (a.ordre != null) return -1
            if (b.ordre != null) return 1
            // Sinon tri par date
            const aDate = a.dateEcheance || ''
            const bDate = b.dateEcheance || ''
            if (!aDate && bDate) return -1
            if (aDate && !bDate) return 1
            if (aDate && bDate) return aDate.localeCompare(bDate)
            return 0
        })

    const handleDragEnd = ({ active, over }) => {
        if (!over || active.id === over.id) return
        const oldIndex = tachesFiltrees.findIndex(t => t.id === active.id)
        const newIndex = tachesFiltrees.findIndex(t => t.id === over.id)
        if (oldIndex === -1 || newIndex === -1) return
        onReordonner(arrayMove(tachesFiltrees, oldIndex, newIndex))
    }

    return (
        <section className='liste-section'>
            <FiltreBarre
                categories={['Toutes', ...toutesCategories]}
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
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext items={tachesFiltrees.map(t => t.id)} strategy={verticalListSortingStrategy}>
                        <div className="liste-taches">
                            {tachesFiltrees.map(tache => (
                                <Tache
                                    key={tache.id}
                                    tache={tache}
                                    onToggle={onToggle}
                                    onSupprimer={onSupprimer}
                                    onModifier={onModifier}
                                    toutesCategories={toutesCategories}
                                />
                            ))}
                        </div>
                    </SortableContext>
                </DndContext>
            )}
        </section>
    )
}

export default ListeTaches
