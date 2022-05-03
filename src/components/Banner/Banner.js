import React, { useEffect, useState } from "react"
import { Link } from "gatsby"
import ReactMarkdown from "react-markdown"
import Lottie from 'react-lottie'
import { useTheme } from "../../context/themeContext"

import "./Banner.scss"

const Banner = ({ data }) => {
  const { theme } = useTheme()
  const title = data?.title
  const variant = data?.variant
  const summary = data?.summary
  const image = data?.image
  const imageDark = data?.imageDark
  const button = data?.button
  const diagonalReverseState =
    variant === "diagonalReverse" ? "col-md-4" : "col-lg-6"

  console.log(image?.url)

  const [lottieLight, setLottieLight] = useState(null)

  const defaultOptions = {
    loop: true,
    autoplay: true,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    },
  }

  useEffect(() => {
    //if (image.mime === "application/json") {

    fetch(image?.url, {
      method: 'GET', // or 'PUT'
    }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(res => setLottieLight(res));
  }, [])

  return (
    <div
      className={`banner ${variant}`}
      id={data.strapi_component + "-" + data.id}
    >
      <div className="title container-md">
        <div className="col-12 col-lg-6">
          {variant === "hero" ? <h1>{title}</h1> : <h2>{title}</h2>}
          {/* <h3>{summary}</h3> */}
          <ReactMarkdown source={summary} className="banner-markdown" />
          {button &&
            (button?.landing_page ? (
              <Link to={`../${button.landing_page.slug}`} className="button">
                {button.content}
              </Link>
            ) : (
              <a
                href={button.url}
                target="_blank"
                rel="noreferrer"
                className="button"
              >
                {button.content}
              </a>
            ))}
        </div>
      </div>

      <div
        className={`imagen col-12 ${variant === "diagonal" ? "col-md-8" : diagonalReverseState
          } `}
      >
        {/* <img src={image?.url} alt={title} /> */}

        {image?.mime === "application/json" ? <Lottie options={{
          ...defaultOptions,
          animationData: lottieLight,
        }} /> : <img
          src={theme === "dark" && imageDark ? imageDark?.url : image?.url}
          alt={title}
        />}

      </div>
    </div>
  )
}

export default Banner
