// composables/useSEO.ts
import { siteConfig } from '~/config/site'

export const useSEO = (options?: {
  title?: string
  description?: string
  image?: string
  noIndex?: boolean
}) => {
  const { locale } = useI18n()

  const title = options?.title || siteConfig.seo.defaultTitle
  const description = options?.description || siteConfig.seo.defaultDescription
  const image = options?.image || siteConfig.seo.defaultImage
  const url = `${siteConfig.url}${useRoute().path}`

  useSeoMeta({
    title: options?.noIndex ? title : `${title} | ${siteConfig.name}`,
    description,
    ogTitle: title,
    ogDescription: description,
    ogImage: image,
    ogUrl: url,
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: image
  })

  if (options?.noIndex) {
    useHead({
      meta: [{ name: 'robots', content: 'noindex, nofollow' }]
    })
  }
}