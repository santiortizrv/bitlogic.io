import React from "react"
import { Link } from "gatsby"
import { getImage } from "gatsby-plugin-image"
import { BgImage } from "gbimage-bridge"
import { useBanner } from "../../hooks/index"
import showdown from "showdown"
import "./BannerBgImage.scss"

import { useTheme } from "../../context/themeContext"

const BannerBgImage = ({ banner }) => {
  const dataBanner = useBanner()
  const { theme } = useTheme()

  const bannerSelected = dataBanner?.allStrapiBanners?.nodes.find(
    ban => ban.strapiId === banner.id
  )
  const { image, imageDarkMode, link, summary } = bannerSelected

  const titles = summary
  let converter = new showdown.Converter()
  let post = titles
  let html = converter.makeHtml(post)

  const ReplaceHtml = () => {
    return { __html: html }
  }

  const imagen = getImage(image?.localFile)
  const imagenDM = getImage(imageDarkMode?.localFile)

  return (
    <div className="bannerBgImage">
      {bannerSelected.type === "bgImage" ? (
        <BgImage
          image={theme === "dark" && imagenDM ? imagenDM : imagen}
          className="bannerBgImage__bgImage"
        >
          <div className="bannerBgImage__titleContainer">
            <div
              dangerouslySetInnerHTML={ReplaceHtml()}
              className="col-12  bannerBgImage__title"
            ></div>
            <Link to={`/${link.pathTo}`} className="bannerBgImage__link ">
              {link.name}
            </Link>
          </div>
        </BgImage>
      ) : (
        <div className="bannerBgColor__container">
          <div className="bannerBgColor__titleContainer">
            <div
              dangerouslySetInnerHTML={ReplaceHtml()}
              className="col-12  bannerBgColor__title"
            ></div>
            <Link to={`/${link.pathTo}`} className="bannerBgColor__link ">
              {link.name}
            </Link>
          </div>
        </div>
      )}
      {/* {summary ? (
        <div className="bannerBgImage__summary">
          <div className="container ">
            <p className="bannerBgImage__summary__txt">{summary}</p>
          </div>
        </div>
      ) : null} */}
    </div>
  )
}

export default BannerBgImage
