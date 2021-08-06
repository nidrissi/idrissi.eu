import React from "react";
import { Link } from "gatsby";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUndo } from "@fortawesome/free-solid-svg-icons";

import Layout from "../components/Layout";

export default function Error403() {
  return (
    <Layout
      title="403 Forbidden"
      description="Not authorized to access this page"
    >
      <div className="w-full h-48 rounded-xl border border-gray-400 border-dashed flex">
        <div className="my-auto mx-auto text-center">
          <h1 role="banner" className="text-4xl font-serif font-bold mb-4">
            403 Forbidden
          </h1>
          <p className="text-2xl">
            You are not authorized to access this page.{" "}
            <Link
              to="/"
              className="text-blue-800 dark:text-blue-300 hover:underline"
            >
              <FontAwesomeIcon icon={faUndo} size="sm" />
              &nbsp; Go back to the front page.
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
}
