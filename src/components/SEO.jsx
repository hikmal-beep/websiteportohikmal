import { Helmet } from 'react-helmet-async'
import { personal } from '../data/personal'

const BASE_URL = 'https://hikmalakbar.my.id'

export default function SEO({
  title,
  description,
  path = '',
  image = '/og-image.png',
  type = 'website',
}) {
  const fullTitle = title
    ? `${title} | ${personal.name}`
    : `${personal.title} | ${personal.name}`

  const desc = description || personal.summary

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <meta name="author" content={personal.name} />
      <link rel="canonical" href={`${BASE_URL}${path}`} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={`${BASE_URL}${path}`} />
      <meta property="og:image" content={`${BASE_URL}${image}`} />
      <meta property="og:type" content={type} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={`${BASE_URL}${image}`} />
    </Helmet>
  )
}
