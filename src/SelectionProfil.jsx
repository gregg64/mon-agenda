const PROFILS = [
    {
        id: 'fiona',
        nom: 'Fiona',
        couleur: '#E8507A',
        emoji: '👧🏿'
    },
    {
        id: 'greg',
        nom: 'Greg',
        couleur: '#3D52D9',
        emoji: '🧑🏿‍🍳'
    },
    {
        id: 'maison',
        nom: 'Maison',
        couleur: '#52A452',
        emoji: '🏠'
    }
]

function SelectionProfil({ onSelectionner }) {
    return (
        <div className="selection-fond">
            <div className="selection-contenu">
                <h1 className="selection-titre">Qui est-ce ?</h1>
                <div className="selection-grille">
                    {PROFILS.map(profil => (
                        <button
                            key={profil.id}
                            className="profil-carte"
                            onClick={() => onSelectionner(profil.id)}
                        >
                            <div
                                className="profil-avatar"
                                style={{ background: profil.couleur }}
                            >
                                <span className="profil-emoji">{profil.emoji}</span>
                            </div>
                            <span className="profil-nom">{profil.nom}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SelectionProfil
