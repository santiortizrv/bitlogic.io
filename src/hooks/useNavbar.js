import { useStaticQuery, graphql } from "gatsby"

const useNavbar = () => {
  return useStaticQuery(graphql`
    {
      allStrapiLayout {
        nodes {
          navbar {
            navButton {
              landing_page {
                slug
              }
              url
              content
            }
            navbarItem {
              url
              label
              singleType
              landing {
                slug
                name
              }
              dropdown
              id
            }
            logo {
              localFile {
                childImageSharp {
                  gatsbyImageData(placeholder: BLURRED)
                }
              }
            }
            logoDark {
              localFile {
                childImageSharp {
                  gatsbyImageData(placeholder: BLURRED)
                }
              }
            }
          }
          menu {
            title
            id
            visible
            dropdown
            url
            landing_page {
              slug
            }
            dropdownItems {
              id
              label
              text
              url
              icon {
                alternativeText
                url
                localFile {
                  childImageSharp {
                    gatsbyImageData(placeholder: BLURRED)
                  }
                }
              }
              landing_page {
                slug
              }
              sub_landing_pages {
                id
                slug
                name
              }
            }
            toplevelItem {
              id
              label
              text
              url
              icon {
                localFile {
                  childImageSharp {
                    gatsbyImageData(placeholder: BLURRED)
                  }
                }
                alternativeText
              }
              landing_page {
                slug
              }
            }
          }
        }
      }
      allStrapiLandingPage {
        nodes {
          name
          slug
          parent_page {
            slug
          }
        }
      }
    }
  `)
}

export default useNavbar
