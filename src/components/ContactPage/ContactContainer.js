import * as React from "react"
import { getImage, GatsbyImage } from "gatsby-plugin-image";
import MarkdownView from 'react-showdown';
import HubspotForm from "react-hubspot-form"
import "./Contact.scss"
import { useContactPage } from "../../hooks/index"
import Layout from "../../components/layout"
import { Seo } from "../index"

const Contact = () => {

  const contactData = useContactPage()


  const { image,  nameImage, title } = contactData.allStrapiContactPage.nodes[0]
  const { formId, portalId } = contactData.allStrapiContactPage.nodes[0].contactForm
  const { pageTitle, pageDescription, pageKeywords } = contactData.allStrapiContactPage.nodes[0].pageMetadata

  const contactImage = getImage(image)

  return (
    <Layout>
      <Seo
        title={pageTitle}
        description={pageDescription}
        keywords={pageKeywords}
      />
      <div className="contact">
        <div className="contact__group">
          <div className="contact__title">
            <MarkdownView markdown={title} />
          </div>
          <div>
            <HubspotForm 
            portalId={portalId}
            formId={formId}   
            loading={<div>Loading...</div>} />
          </div>
        </div>
        
        <GatsbyImage
          className="contact__image"
          image={contactImage}
          alt={nameImage}
        />
      </div>
    </Layout>
  )
}

export default Contact
