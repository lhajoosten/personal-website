import { describe, expect, it } from 'vitest'
import { filterCommandItems, type CommandItem } from './search.ts'

const items: CommandItem[] = [
  { id: 'p-home', label: 'Home', hint: 'Page', to: '/', group: 'page' },
  {
    id: 'proj-x',
    label: 'Pullfrog Azure',
    hint: 'Project',
    to: '/projects/pullfrog-azure',
    group: 'project',
  },
  {
    id: 'w-1',
    label: 'Proposal-first agents',
    hint: 'Writing',
    to: '/writing/proposal-first-agents',
    group: 'writing',
  },
]

describe('filterCommandItems', () => {
  it('returns everything when the query is empty', () => {
    expect(filterCommandItems(items, '')).toHaveLength(3)
  })

  it('matches label case-insensitively', () => {
    const result = filterCommandItems(items, 'pull')
    expect(result.map((item) => item.id)).toEqual(['proj-x'])
  })
})
