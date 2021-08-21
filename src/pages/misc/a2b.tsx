import React from "react";

import Layout from "../../components/Layout";
import App from "../../a2b/App";

export default function A2B() {
  return (
    <Layout
      title="arXiv2BibLaTeX"
      description="Convert an arXiv entry to a BibLaTeX entry."
    >
      <App />
    </Layout>
  );
}
