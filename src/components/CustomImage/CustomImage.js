import React, { memo } from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import PropTypes from "prop-types"

const CustomImage = memo(({ image, className, alt, width, height }) => {
  if (!image) return null

  const { url, localFile } = image
  const localImage = getImage(localFile)

  if (localImage) {
    return (
      <GatsbyImage
        loading="lazy"
        image={localImage}
        alt={alt}
        className={className}
        width={width}
        height={height}
      />
    )
  }

  return (
    <img
      loading="lazy"
      src={url}
      alt={alt}
      className={className}
      width={width}
      height={height}
    />
  )
})

CustomImage.propTypes = {
  className: PropTypes.string,
  alt: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  image: PropTypes.shape({
    url: PropTypes.string,
    localFile: PropTypes.shape({
      childImageSharp: PropTypes.shape({
        gatsbyImageData: PropTypes.object.isRequired,
      }),
    }),
  }),
}

export default CustomImage
