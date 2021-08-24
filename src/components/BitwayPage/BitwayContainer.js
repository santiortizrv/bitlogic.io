import * as React from "react";

import Layout from "../../components/layout";
import { Seo } from "../index";
import useBitwayPage, { useWindowDimensions } from "../../hooks/useBitwayPage";
import Gallery from "./Gallery/Gallery";
import Paragraph from "./Paragraph/Paragraph";
import "./BitwayContainer.scss";
import BannerActionCall from "../Banners/BannerActionCall";
import { useBanner } from "../../hooks";

const BitwayPage = () => {
  const {
    allStrapiBitwayPage: { nodes },
  } = useBitwayPage();

  const { width } = useWindowDimensions();

  const sections = nodes[0].sections;

  const bannerData = useBanner();

  const bannerActionCall = bannerData?.allStrapiBanners?.nodes.find(
    (banner) => banner.page === "bitway" && banner.type === "actionCall"
  );

  const {
    pageTitle,
    pageDescription,
    pageKeywords,
  } = nodes[0].SEO

  return (
    <Layout>
      <Seo
        title={pageTitle}
        description={pageDescription}
        keywords={pageKeywords}
      />
      <div className="bitway-body">
        {/* se renderiza por vistas */}
        {width <= 992
          ? // vista mobile
            sections?.map((elem, index, array) => {
              if (elem.galleryImage) {
                if (array[index - 1]?.galleryImage) {
                  return null;
                }
                if (array[index + 1]?.galleryImage) {
                  return (
                    <Gallery key={index} content={[elem, array[index + 1]]} />
                  );
                } else {
                  return <Gallery key={index} content={[elem]} />;
                }
              } else if (elem.body) {
                return <Paragraph key={index} text={elem} />;
              } else {
                return null;
              }
            })
          : (() => {
              // vista desktop
              // sort funciona con referencia, asi que se crea una nueva array
              const sectionswide = [...sections];
              // se ordenan las galerias primero
              const sorted = sectionswide?.sort((a) =>
                a.galleryImage ? -1 : 1
              );
              // se filtran las galerias y los parrafos
              const gallery = sorted.filter((e) => e.galleryImage);
              const paragraph = sorted
                .filter((e) => e.body)
                .map((e) => <Paragraph key={e.index} text={e} />);
              // y se renderizan
              return [
                <Gallery content={gallery} />,
                <section>{paragraph}</section>,
              ];
            })()}
      </div>
      <BannerActionCall banner={bannerActionCall} />
    </Layout>
  );
};

export default BitwayPage;
