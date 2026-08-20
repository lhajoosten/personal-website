import { useEffect } from 'react'
import { formatPageTitle } from '../../config/page-meta.ts'

type PageMetaProps = {
  title?: string
  description?: string
}

export function PageMeta({ title, description }: PageMetaProps) {
  const documentTitle = formatPageTitle(title)

  useEffect(() => {
    document.title = documentTitle
    if (!description) return
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', description)
  }, [description, documentTitle])

  return null
}
