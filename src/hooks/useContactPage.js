import { useStaticQuery, graphql } from "gatsby"

const useContactPage = () => {
  const query = useStaticQuery(graphql`
    {
      allStrapiContactPage {
        nodes {
          pageMetadata {
            pageDescription
            pageKeywords
            pageTitle
          }
          image {
            localFile {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
          title
          contactForm {
            portalId
            formId
          }
        }
      }
    }
  `)
  return query
}

export default useContactPage
