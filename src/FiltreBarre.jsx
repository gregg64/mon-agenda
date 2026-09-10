const DATE_STYLE = { color: '#18180F', WebkitTextFillColor: '#18180F', colorScheme: 'light' }
const SELECT_STYLE = { width: '140px', minWidth: '140px', maxWidth: '140px' }

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
                    <select value={filtreCategorie} onChange={e => onCategorie(e.target.value)} style={SELECT_STYLE}>
                        {categories.map(c => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>
                </div>

                <div className="filtre-groupe">
                    <label className="filtre-label">Priorité</label>
                    <select value={filtrePriorite} onChange={e => onPriorite(e.target.value)} style={SELECT_STYLE}>
                        {priorites.map(p => (
                            <option key={p} value={p}>{p}</option>
                        ))}
                    </select>
                </div>

                <div className="filtre-groupe">
                    <label className="filtre-label">Date</label>
                    <input
                        type="date"
                        value={filtreDate}
                        onChange={e => onDate(e.target.value)}
                        style={{ ...SELECT_STYLE, ...DATE_STYLE }}
                    />
                    {filtreDate && (
                        <button className="filtre-reset" onClick={() => onDate('')}>✕</button>
                    )}
                </div>
            </div>

            {/* Ligne 2 : toggle en bas à droite */}
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
