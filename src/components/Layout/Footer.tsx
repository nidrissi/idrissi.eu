import React from "react";
import { graphql, Link, useStaticQuery } from "gatsby";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faStackExchange,
  faTwitter,
  IconDefinition,
} from "@fortawesome/free-brands-svg-icons";
import { faAt } from "@fortawesome/free-solid-svg-icons";
import { faCopyright } from "@fortawesome/free-regular-svg-icons";

import * as styles from "./Footer.module.css";

interface FooterQuery {
  site: {
    siteMetadata: {
      author: {
        name: string;
        email: string;
        organizations: {
          name: string;
          url: string;
        }[];
        social: {
          arXiv: string;
          github: string;
          mathoverflow: string;
          twitter: string;
        };
      };
    };
  };
}

export default function Footer() {
  const {
    site: {
      siteMetadata: {
        author: {
          name,
          email,
          organizations,
          social: { arXiv, github, mathoverflow, twitter },
        },
      },
    },
  }: FooterQuery = useStaticQuery(graphql`
    query FooterQuery {
      site {
        siteMetadata {
          siteUrl
          author {
            name
            email
            organizations {
              name
              url
            }
            social {
              arXiv
              github
              mathoverflow
              twitter
            }
          }
        }
      }
    }
  `);

  interface FooterLink {
    url: string;
    label: string;
    icon?: IconDefinition;
    relMe?: boolean;
    mono?: boolean;
  }

  const linkList: FooterLink[] = [
    {
      url: `mailto:${email}`,
      label: email,
      icon: faAt,
      mono: true,
    },
    organizations.map((o) => ({ url: o.url, label: o.name })),
    {
      url: `https://arxiv.org/a/${arXiv}.html`,
      label: "arXiv",
      relMe: true,
    },
    {
      url: `https://github.com/${github}`,
      label: "GitHub",
      icon: faGithub,
      relMe: true,
    },
    {
      url: `https://mathoverflow.net/users/${mathoverflow}`,
      label: "MathOverFlow",
      icon: faStackExchange,
      relMe: true,
    },
    {
      url: `https://twitter.com/${twitter}`,
      label: "Twitter",
      icon: faTwitter,
      relMe: true,
    },
  ].flat();

  return (
    <footer className={styles.footer}>
      <Link to="/">
        <FontAwesomeIcon icon={faCopyright} />
        &nbsp;
        {name}
      </Link>
      {linkList.map((link) => (
        <a
          href={link.url}
          rel={`noreferrer noopener ${link.relMe ? "me" : ""}`}
          target="_blank"
          key={link.label}
          data-mono={link.mono}
        >
          {link.icon && (
            <>
              <FontAwesomeIcon icon={link.icon} />
              &nbsp;
            </>
          )}
          {link.label}
        </a>
      ))}
    </footer>
  );
}
