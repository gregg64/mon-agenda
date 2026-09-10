import { Component } from 'react'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { erreur: null }
  }

  static getDerivedStateFromError(erreur) {
    return { erreur }
  }

  componentDidCatch(erreur, info) {
    console.error('Erreur composant:', erreur, info)
  }

  render() {
    if (this.state.erreur) {
      return (
        <div style={{ padding: '20px', textAlign: 'center', color: '#C43033' }}>
          <p>Une erreur est survenue. <button onClick={() => this.setState({ erreur: null })} style={{ color: '#3D52D9', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>Réessayer</button></p>
        </div>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary
