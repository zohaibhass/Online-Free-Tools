import React from 'react'
import { render, screen } from '@testing-library/react'
import { ToolCard } from '@/components/ToolCard'

describe('ToolCard Component', () => {
  const mockProps = {
    name: 'Test Tool',
    description: 'This is a test tool',
    icon: '🧪',
    slug: 'test-tool',
    featured: false,
  }

  it('renders tool card with correct name', () => {
    render(<ToolCard {...mockProps} />)
    expect(screen.getByText('Test Tool')).toBeInTheDocument()
  })

  it('renders tool card with correct description', () => {
    render(<ToolCard {...mockProps} />)
    expect(screen.getByText('This is a test tool')).toBeInTheDocument()
  })

  it('renders tool card with correct icon', () => {
    render(<ToolCard {...mockProps} />)
    expect(screen.getByText('🧪')).toBeInTheDocument()
  })

  it('renders correct link href', () => {
    render(<ToolCard {...mockProps} />)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/tools/test-tool')
  })

  it('renders use tool button', () => {
    render(<ToolCard {...mockProps} />)
    expect(screen.getByText('Use Tool')).toBeInTheDocument()
  })
})
