function Tache({ tache, onToggle, onSupprimer }) {
    const { id, titre, categorie, priorite, dateEcheance, complete } = tache

    const estEnRetard = !complete
      && dateEcheance
      && new Date(dateEcheance) < new Date()

    const formatDate = (str) =>
      new Date(str).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'short'
      })

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
