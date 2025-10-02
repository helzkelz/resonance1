import { render, screen } from '@testing-library/react'
import App from './App'
import { PortfolioProvider } from './PortfolioContext'

const renderWithProviders = (component) => {
  return render(
    <PortfolioProvider>
      {component}
    </PortfolioProvider>
  )
}

describe('App', () => {
  it('renders the navigation', () => {
    renderWithProviders(<App />)
    expect(screen.getByText('Resonance Vault')).toBeInTheDocument()
  })
})