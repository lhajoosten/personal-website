import {
  isProjectSort,
  isProjectStatus,
  type ProjectSort,
  type ProjectStatus,
} from '../content/types.ts'

export type ProjectListState = {
  status: ProjectStatus | 'all'
  tag: string | 'all'
  sort: ProjectSort
}

export function parseProjectListState(params: URLSearchParams): ProjectListState {
  const statusValue = params.get('status') ?? 'all'
  const sortValue = params.get('sort') ?? 'year'
  const tagValue = params.get('tag')

  return {
    status: statusValue !== 'all' && isProjectStatus(statusValue) ? statusValue : 'all',
    tag: tagValue && tagValue.length > 0 ? tagValue : 'all',
    sort: isProjectSort(sortValue) ? sortValue : 'year',
  }
}

export function serializeProjectListState(state: ProjectListState): URLSearchParams {
  const params = new URLSearchParams()
  if (state.status !== 'all') params.set('status', state.status)
  if (state.tag !== 'all') params.set('tag', state.tag)
  if (state.sort !== 'year') params.set('sort', state.sort)
  return params
}
