import { Metadata } from 'next';
import { Locale } from 'next-intl';
import { PenLine } from 'lucide-react';
import { getAlternates } from '@/app/lib/SEO/getAlternates';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { BreadcrumbItem } from '../../../news/types';
import { Breadcrumb } from '../../../news/components/breadcrumb';

type LinkPart = { text: string; href?: string };
type CookieBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'linked-paragraph'; parts: LinkPart[] }
  | { type: 'subheading'; text: string; level: 4 }
  | { type: 'list-item'; text: string };
type CookieSection = { heading?: string; level?: 3; blocks: CookieBlock[] };
type CookiePolicyContent = { title: string; description: string; lastUpdatedLabel: string; lastUpdatedDate: string; privacyPolicyLabel: string; sections: CookieSection[] };

const cookiePolicySections = {
  "default": [
    {
      "blocks": [
        {
          "type": "paragraph",
          "text": "Cookies consist of portions of code installed in the browser that assist the Owner in providing the service according to the purposes described. Some of the purposes for which the Cookies are installed may also require the User's consent."
        }
      ]
    },
    {
      "heading": "Technical Cookies and Cookies serving aggregated statistical purposes",
      "level": 3,
      "blocks": []
    },
    {
      "heading": "Activity strictly necessary for the functioning of the service",
      "level": 3,
      "blocks": [
        {
          "type": "paragraph",
          "text": "Trip n'touch uses Cookies to save the User's session and to carry out other activities that are strictly necessary for the operation of the same, for example in relation to the distribution of traffic."
        }
      ]
    },
    {
      "heading": "Activity regarding the saving of preferences, optimization, and statistics",
      "level": 3,
      "blocks": [
        {
          "type": "paragraph",
          "text": "Trip n'touch uses Cookies to save browsing preferences and to optimize the User's browsing experience. Among these Cookies are, for example, those to set the language and the currency or for the management of first party statistics employed directly by the Owner of the site."
        }
      ]
    },
    {
      "heading": "Other types of Cookies or third-party tools that might use them",
      "level": 3,
      "blocks": [
        {
          "type": "paragraph",
          "text": "Some of the services listed below collect statistics in aggregated form and may not require the consent of the User or may be managed directly by the Owner - depending on how they are described - without the help of third parties."
        },
        {
          "type": "paragraph",
          "text": "If any third party operated services are listed among the tools below, these may be used to track Users’ browsing habits – in addition to the information specified herein and without the Owner’s knowledge. Please refer to the privacy policy of the listed services for detailed information."
        }
      ]
    },
    {
      "heading": "Analytics",
      "level": 3,
      "blocks": [
        {
          "type": "paragraph",
          "text": "The services contained in this section enable the Owner to monitor and analyze web traffic and can be used to keep track of User behavior."
        },
        {
          "type": "subheading",
          "text": "Google Analytics (Google Inc.)",
          "level": 4
        },
        {
          "type": "paragraph",
          "text": "Google Analytics is a web analysis service provided by Google Inc. (“Google”). Google utilizes the Data collected to track and examine the use of Trip n'touch, to prepare reports on its activities and share them with other Google services. Google may use the Data collected to contextualize and personalize the ads of its own advertising network."
        },
        {
          "type": "paragraph",
          "text": "Personal Data collected: Cookies and Usage Data."
        },
        {
          "type": "linked-paragraph",
          "parts": [
            {
              "text": "Place of processing: United States –"
            },
            {
              "text": "Privacy Policy",
              "href": "https://www.google.com/intl/en/policies/privacy/"
            },
            {
              "text": "–"
            },
            {
              "text": "Opt Out",
              "href": "https://tools.google.com/dlpage/gaoptout?hl=en"
            },
            {
              "text": "."
            }
          ]
        }
      ]
    },
    {
      "heading": "Heat mapping and session recording",
      "level": 3,
      "blocks": [
        {
          "type": "paragraph",
          "text": "Heat mapping services are used to display the areas of a page where Users most frequently move the mouse or click. This shows where the points of interest are. These services make it possible to monitor and analyze web traffic and keep track of User behavior. Some of these services may record sessions and make them available for later visual playback."
        },
        {
          "type": "subheading",
          "text": "Inspectlet (Inspectlet Inc.)",
          "level": 4
        },
        {
          "type": "paragraph",
          "text": "Inspectlet is a session recording and heat mapping service provided by Inspectlet Inc."
        },
        {
          "type": "paragraph",
          "text": "Personal Data collected: Cookies and Usage Data."
        },
        {
          "type": "linked-paragraph",
          "parts": [
            {
              "text": "Place of processing: United States –"
            },
            {
              "text": "Privacy Policy",
              "href": "https://www.inspectlet.com/legal#privacy"
            },
            {
              "text": "."
            }
          ]
        }
      ]
    },
    {
      "heading": "Interaction with external social networks and platforms",
      "level": 3,
      "blocks": [
        {
          "type": "paragraph",
          "text": "This type of service allows interaction with social networks or other external platforms directly from the pages of Trip n'touch. The interaction and information obtained through Trip n'touch are always subject to the User’s privacy settings for each social network. This type of service might still collect traffic data for the pages where the service is installed, even when Users do not use it."
        },
        {
          "type": "subheading",
          "text": "Facebook Like button and social widgets (Facebook, Inc.)",
          "level": 4
        },
        {
          "type": "paragraph",
          "text": "The Facebook Like button and social widgets are services allowing interaction with the Facebook social network provided by Facebook, Inc."
        },
        {
          "type": "paragraph",
          "text": "Personal Data collected: Cookies and Usage Data."
        },
        {
          "type": "linked-paragraph",
          "parts": [
            {
              "text": "Place of processing: United States –"
            },
            {
              "text": "Privacy Policy",
              "href": "https://www.facebook.com/privacy/explanation"
            },
            {
              "text": "."
            }
          ]
        }
      ]
    },
    {
      "heading": "Interaction with online survey platforms",
      "level": 3,
      "blocks": [
        {
          "type": "paragraph",
          "text": "This type of service allows Users to interact with third-party online survey platforms directly from the pages of Trip n'touch. If one of these services is installed, it may collect browsing and Usage Data in the pages where it is installed, even if the Users do not actively use the service."
        },
        {
          "type": "subheading",
          "text": "SurveyMonkey Widget (SurveyMonkey Inc.)",
          "level": 4
        },
        {
          "type": "paragraph",
          "text": "The SurveyMonkey Widget is a service for interacting with the SurveyMonkey online survey platform provided by SurveyMonkey Inc."
        },
        {
          "type": "paragraph",
          "text": "Personal Data collected: Cookies and Usage Data."
        },
        {
          "type": "linked-paragraph",
          "parts": [
            {
              "text": "Place of processing: United States –"
            },
            {
              "text": "Privacy Policy",
              "href": "https://www.surveymonkey.com/mp/policy/privacy-policy/"
            },
            {
              "text": "."
            }
          ]
        }
      ]
    },
    {
      "heading": "SPAM protection",
      "level": 3,
      "blocks": [
        {
          "type": "paragraph",
          "text": "This type of service analyzes the traffic of Trip n'touch, potentially containing Users' Personal Data, with the purpose of filtering it from parts of traffic, messages and content that are recognized as SPAM."
        },
        {
          "type": "subheading",
          "text": "Google reCAPTCHA (Google Inc.)",
          "level": 4
        },
        {
          "type": "linked-paragraph",
          "parts": [
            {
              "text": "Google reCAPTCHA is a SPAM protection service provided by Google Inc. The use of reCAPTCHA is subject to the Google"
            },
            {
              "text": "privacy policy",
              "href": "https://www.google.com/policies/privacy/"
            },
            {
              "text": "and"
            },
            {
              "text": "terms of use",
              "href": "https://www.google.com/intl/en/policies/terms/"
            },
            {
              "text": "."
            }
          ]
        },
        {
          "type": "paragraph",
          "text": "Personal Data collected: Cookies and Usage Data."
        },
        {
          "type": "linked-paragraph",
          "parts": [
            {
              "text": "Place of processing: United States –"
            },
            {
              "text": "Privacy Policy",
              "href": "https://www.google.com/intl/policies/privacy/"
            },
            {
              "text": "."
            }
          ]
        }
      ]
    },
    {
      "heading": "How can I manage the installation of Cookies?",
      "level": 3,
      "blocks": [
        {
          "type": "linked-paragraph",
          "parts": [
            {
              "text": "In addition to what is specified in this document, the User can manage preferences for Cookies directly from within their own browser and prevent – for example – third parties from installing them. Through the browser preferences, it is also possible to delete Cookies installed in the past, including the Cookies that might possibly have saved the consent for the installation of Cookies by this website. It is important to note that by disabling all Cookies, the functioning of this site may be compromised. Users can find information about how to manage Cookies in their browser at the following addresses:"
            },
            {
              "text": "Google Chrome",
              "href": "https://support.google.com/chrome/answer/95647?hl=en&p=cpn_cookies"
            },
            {
              "text": ","
            },
            {
              "text": "Mozilla Firefox",
              "href": "https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences"
            },
            {
              "text": ","
            },
            {
              "text": "Apple Safari",
              "href": "https://support.apple.com/kb/PH19214?viewlocale=en_US&locale=en_US"
            },
            {
              "text": "and"
            },
            {
              "text": "Microsoft Windows Explorer",
              "href": "http://windows.microsoft.com/en-us/windows-vista/block-or-allow-cookies"
            },
            {
              "text": "."
            }
          ]
        },
        {
          "type": "paragraph",
          "text": "In the case of services provided by third parties, Users can exercise their right to withdraw from the tracking activity by utilizing the information provided in the third party’s privacy policy, by clicking the opt-out link – if provided – or by contacting the third party."
        },
        {
          "type": "linked-paragraph",
          "parts": [
            {
              "text": "Notwithstanding the above, the Owner informs that Users may take advantage of:"
            },
            {
              "text": "Your Online Choices",
              "href": "https://www.youronlinechoices.com/"
            },
            {
              "text": ". This service allows Users to select their tracking preferences for most of the advertising tools. The Owner thus recommends that Users make use of this resource in addition to the information provided in this document."
            }
          ]
        }
      ]
    },
    {
      "heading": "Owner and Data Controller",
      "level": 3,
      "blocks": [
        {
          "type": "paragraph",
          "text": "Travelworks Solution / PC Voyages: Data Protection Officer 368 Notre-Dame West, 4th floor Montreal, QC, Montreal (QC) H2Y 1T9 - Canada"
        },
        {
          "type": "paragraph",
          "text": "Owner contact email: info@travelworkssolution.com"
        },
        {
          "type": "paragraph",
          "text": "Since the installation of third-party Cookies and other tracking systems through the services used within Trip n'touch cannot be technically controlled by the Owner, any specific references to Cookies and tracking systems installed by third parties are to be considered indicative. In order to obtain complete information, consult the privacy policy for the respective third-party services listed in this document."
        },
        {
          "type": "paragraph",
          "text": "Given the objective complexity linked to the identification of technologies based on Cookies and their very close integration with the operation of the web, Users are encouraged to contact the Owner should they wish to receive any further information on the use of Cookies themselves and any possible use of them - for example, by a third party - carried out through this site."
        }
      ]
    },
    {
      "heading": "Definitions and legal references",
      "level": 3,
      "blocks": [
        {
          "type": "subheading",
          "text": "Personal Data (or Data)",
          "level": 4
        },
        {
          "type": "paragraph",
          "text": "Any information regarding a natural person, a legal person, an institution or an association, which is, or can be, identified, even indirectly, by reference to any other information, including a personal identification number."
        },
        {
          "type": "subheading",
          "text": "Usage Data",
          "level": 4
        },
        {
          "type": "paragraph",
          "text": "Information collected automatically through Trip n'touch (or third-party services employed in Trip n'touch), which can include: the IP addresses or domain names of the computers utilized by the Users who use Trip n'touch, the URI addresses (Uniform Resource Identifier), the time of the request, the method utilized to submit the request to the server, the size of the file received in response, the numerical code indicating the status of the server's answer (successful outcome, error, etc.), the country of origin, the features of the browser and the operating system utilized by the User, the various time details per visit (e.g., the time spent on each page within the Application) and the details about the path followed within the Application with special reference to the sequence of pages visited, and other parameters about the device operating system and/or the User's IT environment."
        },
        {
          "type": "subheading",
          "text": "User",
          "level": 4
        },
        {
          "type": "paragraph",
          "text": "The individual using Trip n'touch, which must coincide with or be authorized by the Data Subject, to whom the Personal Data refers."
        },
        {
          "type": "subheading",
          "text": "Data Subject",
          "level": 4
        },
        {
          "type": "paragraph",
          "text": "The legal or natural person to whom the Personal Data refers."
        },
        {
          "type": "subheading",
          "text": "Data Processor (or Data Supervisor)",
          "level": 4
        },
        {
          "type": "paragraph",
          "text": "The natural person, legal person, public administration or any other body, association or organization authorized by the Data Controller to process the Personal Data in compliance with this privacy policy."
        },
        {
          "type": "subheading",
          "text": "Data Controller (or Owner)",
          "level": 4
        },
        {
          "type": "paragraph",
          "text": "The natural person, legal person, public administration or any other body, association or organization with the right, also jointly with another Data Controller, to make decisions regarding the purposes, and the methods of processing of Personal Data and the means used, including the security measures concerning the operation and use of Trip n'touch. The Data Controller, unless otherwise specified, is the Owner of Trip n'touch."
        },
        {
          "type": "subheading",
          "text": "Trip n'touch",
          "level": 4
        },
        {
          "type": "paragraph",
          "text": "The means by which the Personal Data of the User is collected and processed."
        },
        {
          "type": "subheading",
          "text": "Storage permission",
          "level": 4
        },
        {
          "type": "paragraph",
          "text": "Used for accessing shared external storage, including the reading and adding of any items."
        },
        {
          "type": "subheading",
          "text": "Calendar permission",
          "level": 4
        },
        {
          "type": "paragraph",
          "text": "Used for accessing the calendar on the User's device, including the reading, adding and removing of entries."
        },
        {
          "type": "subheading",
          "text": "Camera permission",
          "level": 4
        },
        {
          "type": "paragraph",
          "text": "Used for accessing the camera or capturing images and video from the device."
        },
        {
          "type": "subheading",
          "text": "Precise location permission (continuous)",
          "level": 4
        },
        {
          "type": "paragraph",
          "text": "Used for accessing the User's precise device location. Trip n'touch may collect, use, and share User location Data in order to provide location-based services."
        },
        {
          "type": "subheading",
          "text": "Approximate location permission (non-continuous)",
          "level": 4
        },
        {
          "type": "paragraph",
          "text": "Used for accessing the User's approximate device location. Trip n'touch may collect, use, and share User location Data in order to provide location-based services. The geographic location of the User is determined in a manner that isn't continuous. This means that it is impossible for Trip n'touch to derive the approximate position of the User on a continuous basis."
        },
        {
          "type": "subheading",
          "text": "Phone permission",
          "level": 4
        },
        {
          "type": "paragraph",
          "text": "Used for accessing a host of typical features associated with telephony. This enables, for instance, read-only access to the “phone state”, which means it enables access to the phone number of the device, current mobile network information, or the status of any ongoing calls."
        },
        {
          "type": "subheading",
          "text": "Social media accounts permission",
          "level": 4
        },
        {
          "type": "paragraph",
          "text": "Used for accessing the User's social media account profiles, such as Facebook and Twitter."
        },
        {
          "type": "subheading",
          "text": "Cookies",
          "level": 4
        },
        {
          "type": "paragraph",
          "text": "Small sets of data stored in the User's device."
        },
        {
          "type": "subheading",
          "text": "Legal information",
          "level": 4
        },
        {
          "type": "paragraph",
          "text": "Notice to European Users: this privacy statement has been prepared in fulfillment of the obligations under Art. 10 of EC Directive n. 95/46/EC, and under the provisions of Directive 2002/58/EC, as revised by Directive 2009/136/EC, on the subject of Cookies."
        },
        {
          "type": "paragraph",
          "text": "This privacy policy relates solely to Trip n'touch."
        },
        {
          "type": "paragraph",
          "text": "Travelworks Solution / PC Voyages: Data Protection Officer 368 Notre-Dame West, 4th floor Montreal (QC) H2Y 1T9 - Canada"
        }
      ]
    }
  ],
  "fr": [
    {
      "blocks": [
        {
          "type": "paragraph",
          "text": "Les Cookies sont constitués de portions de code installés dans le navigateur qui aident le Propriétaire à fournir les services selon les finalités décrites. Certaines finalités d’installation des Cookies peuvent également nécessiter le consentement de l’Utilisateur."
        }
      ]
    },
    {
      "heading": "Cookies techniques et Cookies d’agrégats statistiques",
      "level": 3,
      "blocks": []
    },
    {
      "heading": "Activité strictement nécessaire au fonctionnement du service",
      "level": 3,
      "blocks": [
        {
          "type": "paragraph",
          "text": "Trip n'touch utilise des Cookies pour enregistrer la session de l’Utilisateur et mener d’autres activités strictement nécessaires à son fonctionnement, par exemple en ce qui concerne la distribution du trafic."
        }
      ]
    },
    {
      "heading": "Activité concernant l’enregistrement des préférences, l’optimisation et les statistiques",
      "level": 3,
      "blocks": [
        {
          "type": "paragraph",
          "text": "Trip n'touch utilise des Cookies pour enregistrer les préférences de navigation et optimiser l’expérience de navigation de l’Utilisateur. Parmi ces Cookies, on trouve par exemple ceux qui définissent la langue et la devise ou ceux conçus pour la gestion des statistiques, utilisés directement par le Propriétaire du site."
        }
      ]
    },
    {
      "heading": "Autres types de Cookies ou outils tiers qui pourraient les utiliser",
      "level": 3,
      "blocks": [
        {
          "type": "paragraph",
          "text": "Certains services énumérés ci-dessous collectent des statistiques agrégées et peuvent ne pas requérir le consentement de l’Utilisateur ou être gérées directement par le Propriétaire, selon la façon dont ils sont décrits, sans l’aide de tiers."
        },
        {
          "type": "paragraph",
          "text": "Dans le cas où les outils indiqués ci-dessous seraient des services gérés par des tiers, ceux-ci pourraient – en plus de ce qui est spécifié dans la présente politique et à l’insu du Propriétaire – être utilisés pour suivre les habitudes de navigation des Utilisateurs. Veuillez consulter la politique de confidentialité des services énumérés pour obtenir de plus amples informations."
        }
      ]
    },
    {
      "heading": "Analyses",
      "level": 3,
      "blocks": [
        {
          "type": "paragraph",
          "text": "Les services que contient cette partie permettent au Propriétaire de surveiller et d’analyser le trafic Web et de suivre l’évolution du comportement de l’Utilisateur."
        },
        {
          "type": "subheading",
          "text": "Google Analytics (Google Inc.)",
          "level": 4
        },
        {
          "type": "paragraph",
          "text": "Google Analytics est un service d’analyse Web fourni par Google Inc. (« Google »). Google utilise les Données collectées pour suivre et analyser l’utilisation de Trip n'touch, préparer des rapports sur ses activités et les partager avec d’autres services Google. Google peut utiliser les Données collectées pour contextualiser et personnaliser les publicités de son propre réseau publicitaire."
        },
        {
          "type": "paragraph",
          "text": "Données personnelles collectées : Cookies et Données d'utilisation."
        },
        {
          "type": "linked-paragraph",
          "parts": [
            {
              "text": "Lieu de traitement : États-Unis –"
            },
            {
              "text": "Politique de confidentialité",
              "href": "https://www.google.com/intl/fr/policies/privacy/"
            },
            {
              "text": "–"
            },
            {
              "text": "Option de retrait",
              "href": "https://tools.google.com/dlpage/gaoptout?hl=fr"
            },
            {
              "text": "."
            }
          ]
        }
      ]
    },
    {
      "heading": "Carte de chaleur et enregistrement de sessions",
      "level": 3,
      "blocks": [
        {
          "type": "paragraph",
          "text": "Les services de cartes de chaleur sont utilisés pour afficher les endroits d'une page où les Utilisateurs bougent la souris ou cliquent le plus souvent. Ainsi les points d'intérêt sont localisés. Les services permettent de surveiller et d'analyser le trafic Web et de suivre l'évolution du comportement de l'Utilisateur. Certains de ces services peuvent enregistrer les sessions et les rendre disponibles pour une lecture visuelle ultérieure."
        },
        {
          "type": "subheading",
          "text": "Inspectlet (Inspectlet Inc.)",
          "level": 4
        },
        {
          "type": "paragraph",
          "text": "Inspectlet est un service d'enregistrement de sessions et d'établissement de cartes de chaleur offert par Inspectlet Inc."
        },
        {
          "type": "paragraph",
          "text": "Données personnelles collectées : Cookies et Données d'utilisation."
        },
        {
          "type": "linked-paragraph",
          "parts": [
            {
              "text": "Lieu de traitement : États-Unis –"
            },
            {
              "text": "Politique de confidentialité",
              "href": "https://www.inspectlet.com/legal#privacy"
            },
            {
              "text": "."
            }
          ]
        }
      ]
    },
    {
      "heading": "Interaction avec des plate-formes de sondage en ligne",
      "level": 3,
      "blocks": [
        {
          "type": "paragraph",
          "text": "Ces types de services permettent aux Utilisateurs d'interagir avec des plate-formes de sondage en ligne directement à partir des pages de Trip n'touch. Si l'un de ces services est installé, il peut collecter des données sur la navigation et des Données d'Utilisation sur les pages sur lesquelles il est installé, même si les Utilisateurs n'utilisent pas activement ce service."
        },
        {
          "type": "subheading",
          "text": "SurveyMonkey Widget (SurveyMonkey Inc.)",
          "level": 4
        },
        {
          "type": "paragraph",
          "text": "SurveyMonkey Widget est un service d'interaction avec la plate-forme de sondage en ligne SurveyMonkey offert par SurveyMonkey Inc."
        },
        {
          "type": "paragraph",
          "text": "Données personnelles collectées : Cookies et Données d'utilisation."
        },
        {
          "type": "linked-paragraph",
          "parts": [
            {
              "text": "Lieu de traitement : États-Unis –"
            },
            {
              "text": "Politique de confidentialité",
              "href": "https://www.surveymonkey.com/mp/policy/privacy-policy/"
            },
            {
              "text": "."
            }
          ]
        }
      ]
    },
    {
      "heading": "Protection anti-SPAM",
      "level": 3,
      "blocks": [
        {
          "type": "paragraph",
          "text": "Ces types de services analysent le trafic de Trip n'touch, contenant potentiellement les Données Personnelles de l'Utilisateur, aux fins de filtrer les messages et les contenus qui sont reconnus comme SPAM."
        },
        {
          "type": "subheading",
          "text": "Google reCAPTCHA (Google Inc.)",
          "level": 4
        },
        {
          "type": "linked-paragraph",
          "parts": [
            {
              "text": "Google reCAPTCHA est un service de protection anti-spam offert par Google Inc. L'utilisation de reCAPTCHA est soumise à la"
            },
            {
              "text": "politique de confidentialité",
              "href": "https://www.google.com/intl/fr/policies/privacy/"
            },
            {
              "text": "et aux"
            },
            {
              "text": "conditions d'utilisations",
              "href": "https://www.google.com/intl/fr/policies/terms/"
            },
            {
              "text": "de Google."
            }
          ]
        },
        {
          "type": "paragraph",
          "text": "Données personnelles collectées : Cookies et Données d'utilisation."
        },
        {
          "type": "linked-paragraph",
          "parts": [
            {
              "text": "Lieu de traitement : États-Unis –"
            },
            {
              "text": "Politique de confidentialité",
              "href": "https://www.google.com/intl/fr/policies/privacy/"
            },
            {
              "text": "."
            }
          ]
        }
      ]
    },
    {
      "heading": "Échanges avec les réseaux sociaux et les plateformes externes",
      "level": 3,
      "blocks": [
        {
          "type": "paragraph",
          "text": "Ce type de services permet les échanges avec les réseaux sociaux ou d’autres plateformes externes directement à partir des pages de Trip n'touch. Les échanges et informations obtenus par Trip n'touch sont toujours régis par les paramètres de confidentialité définis par l’Utilisateur pour chaque réseau social. Si un tel service est installé, il peut toujours collecter les données relatives au trafic des pages, même si l’Utilisateur ne l’utilise pas."
        },
        {
          "type": "subheading",
          "text": "Bouton J’aime et widgets sociaux de Facebook (Facebook, Inc.)",
          "level": 4
        },
        {
          "type": "paragraph",
          "text": "Le bouton J’aime et les widgets sociaux de Facebook sont des services permettant d’échanger avec le réseau social Facebook fourni par Facebook, Inc."
        },
        {
          "type": "paragraph",
          "text": "Données personnelles collectées : Cookies et Données d'utilisation."
        },
        {
          "type": "linked-paragraph",
          "parts": [
            {
              "text": "Lieu de traitement : États-Unis –"
            },
            {
              "text": "Politique de confidentialité",
              "href": "https://www.facebook.com/privacy/explanation"
            },
            {
              "text": "."
            }
          ]
        }
      ]
    },
    {
      "heading": "Comment puis-je gérer l’installation des Cookies ?",
      "level": 3,
      "blocks": [
        {
          "type": "linked-paragraph",
          "parts": [
            {
              "text": "En plus de ce qui est indiqué dans le présent document, l’Utilisateur peut gérer ses préférences en matière de Cookies directement à partir de son navigateur et empêcher, par exemple, que des tiers puissent les installer. Grâce aux préférences de votre navigateur, vous pouvez également supprimer les Cookies installés précédemment, y compris le cookie dans lequel est éventuellement sauvegardé votre consentement pour l’installation de Cookies par ce site. Il est important de noter qu’en désactivant tous les Cookies le fonctionnement de ce site pourrait se trouver compromis. Vous pouvez trouver des informations sur la façon de gérer les Cookies dans votre navigateur aux adresses suivantes :"
            },
            {
              "text": "Google Chrome",
              "href": "https://support.google.com/chrome/answer/95647?hl=fr&p=cpn_cookies"
            },
            {
              "text": ","
            },
            {
              "text": "Mozilla Firefox",
              "href": "https://support.mozilla.org/fr/kb/activer-desactiver-cookies"
            },
            {
              "text": ","
            },
            {
              "text": "Apple Safari",
              "href": "https://support.apple.com/kb/PH19214?viewlocale=fr_FR&locale=en_US"
            },
            {
              "text": "et"
            },
            {
              "text": "Microsoft Windows Explorer",
              "href": "http://windows.microsoft.com/fr-fr/windows-vista/block-or-allow-cookies"
            },
            {
              "text": "."
            }
          ]
        },
        {
          "type": "paragraph",
          "text": "Dans le cas de services fournis par des tiers, l’Utilisateur peut exercer son droit à s’opposer au traçage de ses données en consultant les informations fournies dans la politique de confidentialité du tiers, en cliquant sur le lien de retrait, s’il est fourni, ou en contactant celui-ci."
        },
        {
          "type": "linked-paragraph",
          "parts": [
            {
              "text": "Nonobstant ce qui précède, le Propriétaire indique que l’Utilisateur peut se servir de :"
            },
            {
              "text": "Vos choix en ligne",
              "href": "http://www.youronlinechoices.com/"
            },
            {
              "text": ". Par l’intermédiaire de ce service, il est possible de sélectionner les préférences de traçage des données de la plupart des outils publicitaires. Il est donc conseillé à l’Utilisateur d’utiliser cette ressource en plus des informations fournies dans le présent document."
            }
          ]
        }
      ]
    },
    {
      "heading": "Propriétaire et Responsable du traitement",
      "level": 3,
      "blocks": [
        {
          "type": "paragraph",
          "text": "Travelworks Solution / PC Voyages: Délégué à la protection des données 368 Notre-Dame Ouest, 4ème étage Montréal (Québec) H2Y 1T9"
        },
        {
          "type": "paragraph",
          "text": "Adresse e-mail de contact du Propriétaire : info@travelworkssolution.com"
        },
        {
          "type": "paragraph",
          "text": "Vu que l’installation des Cookies et d’autres systèmes de traçage des données, opérée par des tiers au moyen des services utilisés au sein de Trip n'touch, ne peut être contrôlée techniquement par le Propriétaire, toute référence spécifique à des Cookies et à des systèmes de traçage de données, installés par des tiers, doit être considérée comme indicative. Pour obtenir des renseignements complets, veuillez consulter la politique de confidentialité des services tiers indiqués dans le présent document."
        },
        {
          "type": "paragraph",
          "text": "Compte tenu de la complexité objective liée à l’identification des technologies basées sur les Cookies et à leur intégration très étroite avec le fonctionnement du Web, l’Utilisateur est invité à contacter le Propriétaire s’il souhaite recevoir de plus amples informations sur l’utilisation des Cookies et sur leur possible utilisation, par exemple par un tiers, à travers ce site."
        }
      ]
    },
    {
      "heading": "Définitions et références légales",
      "level": 3,
      "blocks": [
        {
          "type": "subheading",
          "text": "Données personnelles (ou Données)",
          "level": 4
        },
        {
          "type": "paragraph",
          "text": "Toute information concernant une personne physique ou morale, une institution ou une association qui est, ou peut être identifiée, même indirectement, par référence à une autre information, y compris un numéro d’identification personnelle."
        },
        {
          "type": "subheading",
          "text": "Données d’utilisation",
          "level": 4
        },
        {
          "type": "paragraph",
          "text": "Les informations collectées automatiquement par Trip n'touch (ou par des services tiers employés par Trip n'touch), qui peuvent inclure les adresses IP ou les noms de domaines des ordinateurs utilisés par les Utilisateurs qui utilisent Trip n'touch, les adresses URI (Uniform Resource Identifier ou identifiant uniforme de ressource), l’heure de la demande, la méthode utilisée pour soumettre la demande au serveur, la taille du fichier reçu en réponse, le code numérique indiquant le statut de la réponse du serveur (résultat favorable, erreur, etc.), le pays d’origine, les caractéristiques du navigateur et du système d’exploitation utilisés par l’Utilisateur, les différents détails relatifs au temps par visite (p. ex. temps passé sur chaque page dans l’Application) et les détails relatifs au chemin suivi dans l’Application avec une référence spéciale à la séquence des pages visitées, et d’autres paramètres concernant le système d’exploitation ou l’environnement informatique de l’Utilisateur."
        },
        {
          "type": "subheading",
          "text": "Utilisateur",
          "level": 4
        },
        {
          "type": "paragraph",
          "text": "La personne utilisant Trip n'touch, qui doit correspondre à la Personne concernée ou être autorisée par celle-ci, à laquelle les Données personnelles se réfèrent."
        },
        {
          "type": "subheading",
          "text": "Personne concernée",
          "level": 4
        },
        {
          "type": "paragraph",
          "text": "La personne physique ou morale à laquelle les Données personnelles se réfèrent."
        },
        {
          "type": "subheading",
          "text": "Sous-traitant (ou Responsable des données)",
          "level": 4
        },
        {
          "type": "paragraph",
          "text": "Personne physique ou morale, administration publique ou toute autre entité, association ou organisation autorisée par le Responsable des données à traiter les Données personnelles en conformité avec la présente politique de confidentialité."
        },
        {
          "type": "subheading",
          "text": "Responsable du traitement (ou Propriétaire)",
          "level": 4
        },
        {
          "type": "paragraph",
          "text": "La personne physique ou morale, l’administration publique ou toute autre entité, association ou organisation étant habilitée, même conjointement avec un autre Responsable des données, à prendre des décisions concernant les objectifs et les méthodes de traitement des Données personnelles et les moyens utilisés, y compris les mesures de sécurité concernant l’exploitation et l’utilisation de Trip n'touch. Sauf mention contraire, le Responsable des données est le Propriétaire de Trip n'touch."
        },
        {
          "type": "subheading",
          "text": "Trip n'touch",
          "level": 4
        },
        {
          "type": "paragraph",
          "text": "Les moyens par lesquels les Données personnelles de l'Utilisateur sont collectées."
        },
        {
          "type": "subheading",
          "text": "Autorisation de stockage",
          "level": 4
        },
        {
          "type": "paragraph",
          "text": "Utilisée pour accéder à un stockage externe partagé, notamment la lecture et l’ajout d’éléments."
        },
        {
          "type": "subheading",
          "text": "Autorisation de l’agenda",
          "level": 4
        },
        {
          "type": "paragraph",
          "text": "Utilisée pour accéder à l’agenda sur le dispositif de l’Utilisateur, notamment la lecture, l’ajout et la suppression d’entrées."
        },
        {
          "type": "subheading",
          "text": "Autorisation de la caméra",
          "level": 4
        },
        {
          "type": "paragraph",
          "text": "Utilisée pour accéder à la caméra ou enregistrer des images et des vidéos avec le dispositif."
        },
        {
          "type": "subheading",
          "text": "Autorisation de la localisation précise (continue)",
          "level": 4
        },
        {
          "type": "paragraph",
          "text": "Utilisée pour accéder à la localisation précise du dispositif de l’Utilisateur. Trip n'touch peut collecter, utiliser et partager les Données de localisation de l’Utilisateur aux fins de fournir des services basés sur la localisation."
        },
        {
          "type": "subheading",
          "text": "Autorisation de la localisation approximative (non continue)",
          "level": 4
        },
        {
          "type": "paragraph",
          "text": "Utilisée pour accéder à la localisation approximative du dispositif de l’Utilisateur. Trip n'touch peut collecter, utiliser et partager les Données de localisation de l’Utilisateur aux fins de fournir des services basés sur la localisation. La localisation géographique de l’Utilisateur est déterminée de façon non continue. Cela signifie qu’il est impossible pour Trip n'touch d’obtenir la position approximative de l’Utilisateur de façon continue."
        },
        {
          "type": "subheading",
          "text": "Autorisation du téléphone",
          "level": 4
        },
        {
          "type": "paragraph",
          "text": "Utilisée pour accéder à une multitude de fonctionnalités typiques liées à la téléphonie. Cela permet, par exemple, l’accès en lecture seule à l’« État du téléphone », ce qui signifie qu’elle autorise l’accès au numéro de téléphone du dispositif, aux actualités du réseau mobile actuel ou au statut des appels en cours."
        },
        {
          "type": "subheading",
          "text": "Autorisation des comptes de médias sociaux",
          "level": 4
        },
        {
          "type": "paragraph",
          "text": "Utilisée pour accéder aux profils de comptes des médias sociaux de l’Utilisateur, comme Facebook et Twitter."
        },
        {
          "type": "subheading",
          "text": "Cookies",
          "level": 4
        },
        {
          "type": "paragraph",
          "text": "Petite pièce de donnée stockée dans l’appareil de l’Utilisateur."
        },
        {
          "type": "subheading",
          "text": "Informations légales",
          "level": 4
        },
        {
          "type": "paragraph",
          "text": "Avis aux Utilisateurs européens : la présente politique de confidentialité a été préparée en exécution des obligations définies à l’article 10 de de la directive européenne n°95/46/CE et en vertu des dispositions de la directive 2002/58/CE, telle que révisée par la directive 2009/136/CE portant sur les cookies."
        },
        {
          "type": "paragraph",
          "text": "Cette politique de confidentialité s’applique exclusivement à Trip n'touch."
        },
        {
          "type": "paragraph",
          "text": "Travelworks Solution / PC Voyages: Délégué à la protection des données 368 Notre-Dame Ouest, 4ème étage Montréal (QC) H2Y 1T9 - Canada"
        }
      ]
    }
  ]
} satisfies Record<string, CookieSection[]>;

const cookiePolicyContentByLocale: Record<string, CookiePolicyContent> = {
  default: {
    title: "Trip'n Touch - Cookie Policy",
    description: "Trip'n Touch Cookie Policy.",
    lastUpdatedLabel: 'Last updated:',
    lastUpdatedDate: 'April 24, 2024',
    privacyPolicyLabel: 'Show the complete Privacy Policy',
    sections: cookiePolicySections.default,
  },
  fr: {
    title: "Trip'n Touch - Politique relative aux cookies",
    description: "Politique relative aux cookies de Trip'n Touch.",
    lastUpdatedLabel: 'Dernière mise à jour :',
    lastUpdatedDate: '24 avril 2024',
    privacyPolicyLabel: 'Afficher la politique de confidentialité complète',
    sections: cookiePolicySections.fr,
  },
};

function getLocalizedPath(locale: string, suffix = ''): string {
  const parent = locale === 'fr' ? '/fr/politique-de-confidentialite' : locale === 'en-au' ? '/en-au/privacy-policy' : '/privacy-policy';
  return parent + '/trip-n-touch/cookies' + suffix;
}

function getPrivacyPolicyPath(locale: string): string {
  return getLocalizedPath(locale).replace('/cookies', '');
}

function getCookiePolicyContent(locale: string): CookiePolicyContent {
  return locale === 'fr' ? cookiePolicyContentByLocale.fr : cookiePolicyContentByLocale.default;
}

function isActivityHeading(heading: string): boolean {
  return heading.startsWith('Activity ') || heading.startsWith('Activité ');
}

function CookieBlocks({ blocks }: { blocks: CookieBlock[] }) {
  const listItems = blocks.filter((block): block is Extract<CookieBlock, { type: 'list-item' }> => block.type === 'list-item');
  return <>
    {blocks.filter((block) => block.type !== 'list-item').map((block, index) => {
      if (block.type === 'paragraph') return <p key={'paragraph-' + index} className="mb-4 leading-7 text-slate-700">{block.text}</p>;
      if (block.type === 'linked-paragraph') return <p key={'linked-' + index} className="mb-4 leading-7 text-slate-700">{block.parts.map((part, partIndex) => part.href ? <a key={'link-' + partIndex} href={part.href} target={part.href.startsWith('http') ? '_blank' : undefined} rel={part.href.startsWith('http') ? 'noreferrer' : undefined} className="text-brand-blue underline underline-offset-2">{part.text}</a> : <span key={'text-' + partIndex}>{part.text} </span>)}</p>;
      return <h4 key={'subheading-' + index} className="mb-3 mt-6 text-lg font-bold text-brand-blue">{block.text}</h4>;
    })}
    {listItems.length > 0 && <ul className="mb-4 list-disc space-y-2 pl-5 text-slate-700">{listItems.map((item, index) => <li key={'list-' + index}>{item.text}</li>)}</ul>}
  </>;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const content = getCookiePolicyContent(locale);
  return { title: content.title, description: content.description, alternates: getAlternates({ en: getLocalizedPath('en'), 'en-au': getLocalizedPath('en-au'), fr: getLocalizedPath('fr') }, locale) };
}

export default async function TripDetailsCookiePolicyPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const content = getCookiePolicyContent(locale);
  const t = await getTranslations('pages.cookies-tripntouch');
  const homeHref = locale === 'en' ? '/' : '/' + locale;
  const breadcrumbItems: BreadcrumbItem[] = [{ label: t('breadcrumb.privacy-policy-label'), href: t('breadcrumb.privacy-policy-link') }, { label: t('breadcrumb.privacy-policy-label2'), href: '#' }];

  return <main><section className="mx-auto max-w-5xl px-4 py-5 sm:px-6 lg:px-8">
    <Breadcrumb items={breadcrumbItems} homeHref={homeHref} />
    <h1 className="mt-10 mb-6 text-3xl font-bold uppercase text-brand-blue">{content.title}</h1>
    <div className="mb-8 flex items-center rounded-md border-2 border-gray-200 bg-gray-100 px-5 py-3 text-sm font-semibold text-slate-600"><PenLine className="h-6 w-6 text-brand-blue" aria-hidden="true" /><span className="ml-2 uppercase text-brand-blue">{content.lastUpdatedLabel}</span><span className="ml-2">{content.lastUpdatedDate}</span></div>
    {content.sections.map((section, index) => <section key={'section-' + index} className="mb-10">{section.heading && <h3 className={isActivityHeading(section.heading) ? 'mb-4 text-xl font-bold text-brand-blue' : 'mb-5 border-b border-brand-blue/20 pb-2 text-2xl font-bold text-brand-blue'}>{section.heading}</h3>}<CookieBlocks blocks={section.blocks} /></section>)}
    <a href={getPrivacyPolicyPath(locale)} className="text-brand-blue underline underline-offset-2">{content.privacyPolicyLabel}</a>
  </section></main>;
}
