const WRAP = { flex: 1 }
const SEL = { width: '100%', boxSizing: 'border-box', textAlignLast: 'center' }
const DATE_SEL = { width: '100%', boxSizing: 'border-box', color: '#18180F', WebkitTextFillColor: '#18180F', colorScheme: 'light', textAlignLast: 'center' }

function FiltreBarre({
    categories, priorites, filtreDate, onDate,
    filtreCategorie, filtrePriorite, masquerCompletes,
    onCategorie, onPriorite, onToggleMasquer,
    total
}) {
    return (
        <div className="filtre-barre">

            {/* Ligne 1 : compteur */}
            <div className="filtre-ligne">
                <span className="filtre-total">
                    {total} tâche{total !== 1 ? 's' : ''}
                </span>
            </div>

            {/* Ligne 2 : filtres */}
            <div className="filtre-ligne filtre-ligne--filtres">
                <div className="filtre-groupe">
                    <label className="filtre-label">Catégorie</label>
                    <div style={WRAP}>
                        <select value={filtreCategorie} onChange={e => onCategorie(e.target.value)} style={SEL}>
                            {categories.map(c => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="filtre-groupe">
                    <label className="filtre-label">Priorité</label>
                    <div style={WRAP}>
                        <select value={filtrePriorite} onChange={e => onPriorite(e.target.value)} style={SEL}>
                            {priorites.map(p => (
                                <option key={p} value={p}>{p}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="filtre-groupe">
                    <label className="filtre-label">Date</label>
                    <div style={WRAP}>
                        <input
                            type="date"
                            value={filtreDate}
                            onChange={e => onDate(e.target.value)}
                            style={DATE_SEL}
                        />
                    </div>
                    {filtreDate && (
                        <button className="filtre-reset" onClick={() => onDate('')}>✕</button>
                    )}
                </div>
            </div>

            {/* Ligne 3 : toggle */}
            <div className="filtre-ligne filtre-ligne--meta">
                <button
                    className={`filtre-btn-toggle ${masquerCompletes ? 'actif' : ''}`}
                    onClick={onToggleMasquer}
                >
                    {masquerCompletes ? 'Voir' : 'Masquer'} les terminées
                </button>
            </div>

        </div>
    )
}

export default FiltreBarre
