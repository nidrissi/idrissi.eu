import "normalize.css";
import "prismjs/themes/prism-okaidia.css";
import "./src/styles/katex-override.less";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "./src/styles/global.css";

import { wrapWithProvider } from "./src/store";

config.autoAddCss = false;

export const wrapRootElement = wrapWithProvider;
