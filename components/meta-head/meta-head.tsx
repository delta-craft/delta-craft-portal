import Head from "next/head";
import React from "react";

interface IProps {
  title?: string;
  description?: string;
  image?: string;
  width?: string;
  height?: string;
}

const MetaHead: React.FC<IProps> = ({
  description = "Portál hráče",
  title = "DeltaCraft",
  image = "banner.jpg",
  width = "1920",
  height = "1080",
}) => {
  const baseDomain = "https://portal.deltacraft.eu/img/";

  if (!image.startsWith("http")) {
    image = baseDomain + image;
  }

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="image" content={image} />
      {/* <!-- Schema.org for Google --> */}
      <meta itemProp="name" content={title} />
      <meta itemProp="description" content={description} />
      <meta itemProp="image" content={image} />
      {/* <!-- Open Graph general (Facebook, Pinterest & Google+) --> */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content="https://portal.deltacraft.eu/" />
      <meta property="og:site_name" content="DeltaCraft Portal" />
      <meta property="og:locale" content="cs" />
      <meta property="og:type" content="website" />
      <meta property="og:image:width" content={width} />
      <meta property="og:image:height" content={height} />
      {/* <!-- Twitter --> */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image:src" content={image} />
    </Head>
  );
};

export default MetaHead;
