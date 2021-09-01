import * as React from "react"
import { useEdTech, useBanner } from "../../hooks"
import { BannerTop, BannerActionCall, Seo } from "../index"
import Layout from "../layout"

import Cards from "../Cards/Cards"
import "./EdtechContainer.scss"

const EdTech = () => {
  const data = useEdTech()

  const bannerData = useBanner()
  const edTechs = data?.allStrapiEdteches?.nodes

  const content = edTechs.map(tech => <Cards key={tech.id} tech={tech} />)

  const bannerTop = bannerData?.allStrapiBanners?.nodes.find(
    banner => banner.page === "edtech" && banner.type === "top"
  )
  const bannerActionCall = bannerData?.allStrapiBanners?.nodes.find(
    banner => banner.page === "edtech" && banner.type === "actionCall"
  )

  const {
    pageTitle,
    pageDescription,
    pageKeywords,
  } = data?.allStrapiEdTechPage?.nodes[0].seo

  return (
    <Layout>
      {data?.allStrapiEdTechPage?.nodes[0].seo && (
        <Seo
          title={pageTitle}
          description={pageDescription}
          keywords={pageKeywords}
        />
      )}
      {bannerTop && (
        <BannerTop banner={bannerTop} />
      )}
      {content.length > 0 && (
        <div className="container-fluid EdTech__container">{content}</div>
      )}
      {bannerActionCall && (
        <BannerActionCall banner={bannerActionCall} />
      )}
    </Layout>
  )
}

export default EdTech
