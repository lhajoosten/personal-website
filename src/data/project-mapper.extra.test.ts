import { describe, expect, it } from 'vitest'
import { mapProjectRow } from './project-mapper.ts'

describe('mapProjectRow extra fields', () => {
  it('maps optional case sections and highlights', () => {
    const project = mapProjectRow({
      id: 'x',
      title: 'X',
      summary: 's',
      description: 'd',
      status: 'active',
      tags: '[]',
      featured: false,
      year: 2026,
      links: '[]',
      problem: 'P',
      approach: 'A',
      outcome: 'O',
      highlights: '["one","two"]',
    })

    expect(project.problem).toBe('P')
    expect(project.approach).toBe('A')
    expect(project.outcome).toBe('O')
    expect(project.highlights).toEqual(['one', 'two'])
  })

  it('omits empty optional sections', () => {
    const project = mapProjectRow({
      id: 'x',
      title: 'X',
      summary: 's',
      description: 'd',
      status: 'active',
      tags: '[]',
      featured: false,
      year: 2026,
      links: '[]',
      problem: '',
      approach: '',
      outcome: '',
      highlights: '[]',
    })

    expect(project.problem).toBeUndefined()
    expect(project.highlights).toBeUndefined()
  })
})
