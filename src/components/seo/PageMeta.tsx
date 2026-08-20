import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { formatCanonicalUrl, formatPageTitle } from '../../config/page-meta.ts'

type PageMetaProps = {
  title?: string
  description?: string
  path?: string
}

export function PageMeta({ title, description, path }: PageMetaProps) {
  const location = useLocation()
  const documentTitle = formatPageTitle(title)
  const canonical = formatCanonicalUrl(path ?? location.pathname)

  useEffect(() => {
    document.title = documentTitle

    if (description) {
      const meta = document.querySelector('meta[name="description"]')
      if (meta) meta.setAttribute('content', description)
    }

    let link = document.querySelector('link[rel="canonical"]')
    if (!link) {
      link = document.createElement('link')
      link.setAttribute('rel', 'canonical')
      document.head.appendChild(link)
    }
    link.setAttribute('href', canonical)
  }, [canonical, description, documentTitle])

  return null
}
