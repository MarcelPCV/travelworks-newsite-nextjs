import { Metadata } from 'next';
import { Locale } from 'next-intl';
import { Minus, PenLine, Plus } from 'lucide-react';
import { getAlternates } from '@/app/lib/SEO/getAlternates';
import { Breadcrumb } from '@/app/[locale]/(pages)/news/components/breadcrumb';
import type { BreadcrumbItem } from '@/app/[locale]/(pages)/news/types';
import { getTranslations, setRequestLocale } from 'next-intl/server';

type PolicyBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'linked-paragraph'; parts: Array<{ text: string; href?: string }> }
  | { type: 'bullets'; items: string[] }
  | { type: 'subheading'; text: string };

type PolicyAccordionItem = { title: string; blocks: PolicyBlock[] };
type PolicySection = { heading: string; level: number; blocks: PolicyBlock[]; accordionItems?: PolicyAccordionItem[] };
type PolicyContent = { title: string; metadataTitle: string; metadataDescription: string; lastUpdatedLabel: string; lastUpdatedDate: string; sections: PolicySection[] };

const policyContentByLocale: Record<string, PolicyContent> = {
  "default": {
    "title": "Trip'n Touch - Privacy Policy",
    "metadataTitle": "Trip'n Touch - Privacy Policy",
    "metadataDescription": "Trip'n Touch Privacy Policy.",
    "lastUpdatedLabel": "Last updated:",
    "lastUpdatedDate": "April 24, 2024",
    "sections": [
      {
        "heading": "Types of Data collected",
        "level": 2,
        "blocks": [
          {
            "type": "paragraph",
            "text": "Among the types of Personal Data that the publisher of this mobile app or web app (\"the app\") collects, by itself or through third parties, there are: geographic position, Storage permission, Calendar permission, Camera permission, Precise location permission (continuous), Approximate location permission (non-continuous), Phone permission, Social media accounts permission, Cookies, Usage Data, first name, last name, email address, phone number and unique device identifiers for advertising (Google Advertiser ID or IDFA, for example)."
          },
          {
            "type": "paragraph",
            "text": "Complete details on each type of Personal Data collected are provided in the dedicated sections of this privacy policy or by specific explanation texts displayed prior to the Data collection."
          },
          {
            "type": "paragraph",
            "text": "Personal Data may be freely provided by the User, or, in case of Usage Data, collected automatically when using the app."
          },
          {
            "type": "paragraph",
            "text": "Unless specified otherwise, all Data requested is mandatory and failure to provide this Data may make it impossible to provide its services. In cases where the app specifically states that some Data is not mandatory, Users are free not to communicate this Data without consequences to the availability or the functioning of the Service. Users who are uncertain about which Personal Data is mandatory are welcome to contact the Owner. Any use of Cookies - or of other tracking tools - serves the purpose of providing the Service required by the User, in addition to any other purposes described in the present document and in the Cookie Policy, if available."
          },
          {
            "type": "paragraph",
            "text": "Users are responsible for any third-party Personal Data obtained, published or shared through Trip n'Touch and confirm that they have the third party's consent to provide the Data to the Owner."
          }
        ]
      },
      {
        "heading": "Precise location in background for Trip n'touch application",
        "level": 3,
        "blocks": [
          {
            "type": "paragraph",
            "text": "The Trip n'touch app collects location data to display the real-time risk alerts and personalized assistance notification features, even when the app is closed and not in use. This option can be changed later by going to the device settings."
          }
        ]
      },
      {
        "heading": "Mode and place of processing the Data",
        "level": 2,
        "blocks": []
      },
      {
        "heading": "Methods of processing",
        "level": 3,
        "blocks": [
          {
            "type": "paragraph",
            "text": "The Owner takes appropriate security measures to prevent unauthorized access, disclosure, modification, or unauthorized destruction of the Data."
          },
          {
            "type": "paragraph",
            "text": "The Data processing is carried out using computers and/or IT enabled tools, following organizational procedures and modes strictly related to the purposes indicated. In addition to the Owner, in some cases, the Data may be accessible to certain types of persons in charge, involved with the operation of Trip n'Touch (administration, sales, marketing, legal, system administration) or external parties (such as third-party technical service providers, mail carriers, hosting providers, IT companies, communications agencies) appointed, if necessary, as Data Processors by the Owner. The updated list of these parties may be requested from the Owner at any time."
          }
        ]
      },
      {
        "heading": "Legal basis of processing",
        "level": 3,
        "blocks": [
          {
            "type": "paragraph",
            "text": "The Owner may process Personal Data relating to Users if one of the following applies:"
          },
          {
            "type": "bullets",
            "items": [
              "Users have given their consent for one or more specific purposes. Note: Under some legislations the Owner may be allowed to process Personal Data until the User objects to such processing (“opt-out”), without having to rely on consent or any other of the following legal bases. This, however, does not apply, whenever the processing of Personal Data is subject to European data protection law;",
              "provision of Data is necessary for the performance of an agreement with the User and/or for any pre-contractual obligations thereof;",
              "processing is necessary for compliance with a legal obligation to which the Owner is subject;",
              "processing is related to a task that is carried out in the public interest or in the exercise of official authority vested in the Owner;",
              "processing is necessary for the purposes of the legitimate interests pursued by the Owner or by a third party."
            ]
          },
          {
            "type": "paragraph",
            "text": "In any case, the Owner will gladly help to clarify the specific legal basis that applies to the processing, and in particular whether the provision of Personal Data is a statutory or contractual requirement, or a requirement necessary to enter into a contract."
          }
        ]
      },
      {
        "heading": "Place",
        "level": 3,
        "blocks": [
          {
            "type": "paragraph",
            "text": "The Data may be processed in the USA or in Germany. Feel free to contact us to know more about the precise location of the data storage."
          },
          {
            "type": "paragraph",
            "text": "Depending on the User's location, data transfers may involve transferring the User's Data to a country other than their own. To find out more about the place of processing of such transferred Data, please contact the data processor."
          },
          {
            "type": "paragraph",
            "text": "Users are also entitled to learn about the legal basis of Data transfers to a country outside the European Union or to any international organization governed by public international law or set up by two or more countries, such as the UN, and about the security measures taken by the Owner to safeguard their Data."
          },
          {
            "type": "paragraph",
            "text": "If any such transfer takes place, Users can find out more by checking the relevant sections of this document or inquire with the processor using the information provided in the contact section."
          }
        ]
      },
      {
        "heading": "Retention time",
        "level": 3,
        "blocks": [
          {
            "type": "paragraph",
            "text": "Personal Data shall be processed and stored for as long as required by the purpose they have been collected for."
          },
          {
            "type": "paragraph",
            "text": "Therefore:"
          },
          {
            "type": "bullets",
            "items": [
              "Personal Data collected for purposes related to the performance of a contract between the Owner and the User shall be retained until such contract has been fully performed.",
              "Personal Data collected for the purposes of the Owner’s legitimate interests shall be retained as long as needed to fulfill such purposes. Users may find specific information regarding the legitimate interests pursued by the Owner within the relevant sections of this document or by contacting the Owner."
            ]
          },
          {
            "type": "paragraph",
            "text": "The Owner may be allowed to retain Personal Data for a longer period whenever the User has given consent to such processing, as long as such consent is not withdrawn. Furthermore, the Owner may be obliged to retain Personal Data for a longer period whenever required to do so for the performance of a legal obligation or upon order of an authority."
          },
          {
            "type": "paragraph",
            "text": "Once the retention period expires, Personal Data shall be deleted. Therefore, the right to access, the right to erasure, the right to rectification and the right to data portability cannot be enforced after expiration of the retention period."
          }
        ]
      },
      {
        "heading": "The purposes of processing",
        "level": 2,
        "blocks": [
          {
            "type": "paragraph",
            "text": "The Data concerning the User is collected to allow the Owner to provide its Services, as well as for the following purposes: Location-based interactions, Device permissions for Personal Data access, Analytics, Hosting and backend infrastructure, Interaction with online survey platforms, Registration and authentication, Heat mapping and session recording, Infrastructure monitoring, Interaction with external social networks and platforms, SPAM protection and Managing contacts and sending messages."
          },
          {
            "type": "paragraph",
            "text": "Users can find further detailed information about such purposes of processing and about the specific Personal Data used for each purpose in the respective sections of this document."
          }
        ]
      },
      {
        "heading": "Device permissions for Personal Data access",
        "level": 2,
        "blocks": [
          {
            "type": "paragraph",
            "text": "Depending on the User's specific device, the app may request certain permissions that allow it to access the User's device Data as described below."
          },
          {
            "type": "paragraph",
            "text": "By default, these permissions must be granted by the User before the respective information can be accessed. Once the permission has been given, it can be revoked by the User at any time. In order to revoke these permissions, Users may refer to the device settings or contact the Owner for support at the contact details provided in the present document."
          },
          {
            "type": "paragraph",
            "text": "The exact procedure for controlling app permissions may be dependent on the User's device and software."
          },
          {
            "type": "paragraph",
            "text": "Please note that the revoking of such permissions might impact the proper functioning of the app."
          },
          {
            "type": "paragraph",
            "text": "If User grants any of the permissions listed below, the respective Personal Data may be processed (i.e accessed to, modified or removed)."
          }
        ]
      },
      {
        "heading": "Mobile phone and SMS",
        "level": 3,
        "blocks": [
          {
            "type": "paragraph",
            "text": "Trip n'Touch offers the option to our customers to engage in conversations with travelers to provide trip informations. Message frequency varies. Message and data rates may apply. Text HELP to [Number] for help. Reply STOP to cancel. Carriers are not liable for any delays or undelivered messages. No mobile information will be shared with third parties/affiliates for marketing/promotional purposes. All the above categories exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties."
          }
        ]
      },
      {
        "heading": "Approximate location permission (non-continuous)",
        "level": 3,
        "blocks": [
          {
            "type": "paragraph",
            "text": "Used for accessing the User's approximate device location. The app may collect, use, and share User location Data in order to provide location-based services."
          },
          {
            "type": "paragraph",
            "text": "The geographic location of the User is determined in a manner that isn't continuous. This means that it is impossible for the app to derive the approximate position of the User on a continuous basis."
          }
        ]
      },
      {
        "heading": "Calendar permission",
        "level": 3,
        "blocks": [
          {
            "type": "paragraph",
            "text": "Used for accessing the calendar on the User's device, including the reading, adding and removing of entries."
          }
        ]
      },
      {
        "heading": "Camera permission",
        "level": 3,
        "blocks": [
          {
            "type": "paragraph",
            "text": "Used for accessing the camera or capturing images and video from the device."
          }
        ]
      },
      {
        "heading": "Phone permission",
        "level": 3,
        "blocks": [
          {
            "type": "paragraph",
            "text": "Used for accessing a host of typical features associated with telephony. This enables, for instance, read-only access to the “phone state”, which means it enables access to the phone number of the device, current mobile network information, or the status of any ongoing calls."
          }
        ]
      },
      {
        "heading": "Precise location permission (continuous)",
        "level": 3,
        "blocks": [
          {
            "type": "paragraph",
            "text": "Used for accessing the User's precise device location. The app may collect, use, and share User location Data in order to provide location-based services."
          }
        ]
      },
      {
        "heading": "Social media accounts permission",
        "level": 3,
        "blocks": [
          {
            "type": "paragraph",
            "text": "Used for accessing the User's social media account profiles, such as Facebook and Twitter."
          }
        ]
      },
      {
        "heading": "Storage permission",
        "level": 3,
        "blocks": [
          {
            "type": "paragraph",
            "text": "Used for accessing shared external storage, including the reading and adding of any items."
          }
        ]
      },
      {
        "heading": "Location Data",
        "level": 3,
        "blocks": [
          {
            "type": "paragraph",
            "text": "Location Data in this Applications uses precise location in background. The app collects location data to display the real-time risk alerts and personalized assistance notification features, even when the app is closed and not in use. This option can be changed later by going to the device settings and also managed within Settings in the Application."
          }
        ]
      },
      {
        "heading": "Detailed information on the processing of Location Data",
        "level": 2,
        "blocks": [
          {
            "type": "subheading",
            "text": "1. Why We Collect Location Data"
          },
          {
            "type": "paragraph",
            "text": "We collect precise location data to: Provide real-time risk alerts relevant to your location, such as safety hazards or emergencies. Send personalized assistance notifications based on your current or recent location."
          },
          {
            "type": "subheading",
            "text": "2. Background Location Collection"
          },
          {
            "type": "paragraph",
            "text": "The app collects your location data even when it is closed or not actively in use. Background location data is necessary to ensure that you receive timely alerts and notifications, especially during emergencies or critical events."
          },
          {
            "type": "subheading",
            "text": "3. How We Use Your Location Data"
          },
          {
            "type": "paragraph",
            "text": "Your location data is used solely for: Delivering real-time alerts and notifications. Improving the accuracy and relevance of our safety services."
          },
          {
            "type": "subheading",
            "text": "4. Data Storage and Retention"
          },
          {
            "type": "paragraph",
            "text": "Your location data is processed securely and stored only as long as necessary to provide the app's features. Historical location data may be retained for analysis to improve service functionality, but only in compliance with applicable laws."
          },
          {
            "type": "subheading",
            "text": "5. Sharing of Location Data"
          },
          {
            "type": "paragraph",
            "text": "We do not share your precise location data with third parties for marketing or advertising purposes. Location data may be shared with authorized emergency services or partners only to enhance your safety during critical situations."
          },
          {
            "type": "subheading",
            "text": "6. Your Choices and Control"
          },
          {
            "type": "paragraph",
            "text": "Opt-Out of Background Location: You can disable background location tracking at any time through your device’s settings. Please note that disabling this feature may limit the app's ability to provide timely alerts and notifications. Manage Location Permissions: You can adjust location permissions (e.g., \"Allow all the time,\" \"Allow only while using the app,\" or \"Deny\") in your device settings."
          }
        ]
      },
      {
        "heading": "Detailed information on the processing of Personal Data",
        "level": 2,
        "blocks": [
          {
            "type": "paragraph",
            "text": "Personal Data is collected for the following purposes and using the following services:"
          }
        ],
        "accordionItems": [
          {
            "title": "Analytics",
            "blocks": [
              {
                "type": "paragraph",
                "text": "The services contained in this section enable the Owner to monitor and analyze web traffic and can be used to keep track of User behavior."
              },
              {
                "type": "subheading",
                "text": "Google Analytics (Google Inc.)"
              },
              {
                "type": "paragraph",
                "text": "Google Analytics is a web analysis service provided by Google Inc. (“Google”). Google utilizes the Data collected to track and examine the use of the app, to prepare reports on its activities and share them with other Google services. Google may use the Data collected to contextualize and personalize the ads of its own advertising network."
              },
              {
                "type": "paragraph",
                "text": "Personal Data collected: Cookies and Usage Data."
              },
              {
                "type": "linked-paragraph",
                "parts": [
                  { "text": "Place of processing: United States - " },
                  { "text": "Privacy Policy", "href": "https://www.google.com/intl/en/policies/privacy/" },
                  { "text": " - " },
                  { "text": "Opt Out", "href": "https://tools.google.com/dlpage/gaoptout?hl=en" },
                  { "text": " ." }
                ]
              },
              {
                "type": "subheading",
                "text": "Google Analytics for Firebase (Google Inc.)"
              },
              {
                "type": "linked-paragraph",
                "parts": [
                  { "text": "Google Analytics for Firebase or Firebase Analytics is an analytics service provided by Google Inc. In order to understand Google's use of Data, consult " },
                  { "text": "Google's partner policy", "href": "https://www.google.com/policies/privacy/partners/" },
                  { "text": " ." }
                ]
              },
              {
                "type": "paragraph",
                "text": "Firebase Analytics may share Data with other tools provided by Firebase, such as Crash Reporting, Authentication, Remote Config or Notifications. The User may check this privacy policy to find a detailed explanation about the other tools used by the Owner."
              },
              {
                "type": "paragraph",
                "text": "The app uses identifiers for mobile devices (including Android Advertising ID or Advertising Identifier for iOS, respectively) and technologies similar to cookies to run the Firebase Analytics service."
              },
              {
                "type": "paragraph",
                "text": "Users may opt-out of certain Firebase features through applicable device settings, such as the device advertising settings for mobile phones or by following the instructions in other Firebase related sections of this privacy policy, if available."
              },
              {
                "type": "paragraph",
                "text": "Personal Data collected: Cookies, unique device identifiers for advertising (Google Advertiser ID or IDFA, for example) and Usage Data."
              },
              {
                "type": "linked-paragraph",
                "parts": [
                  { "text": "Place of processing: United States - " },
                  { "text": "Privacy Policy", "href": "https://www.google.com/policies/privacy/" },
                  { "text": " ." }
                ]
              }
            ]
          },
          {
            "title": "Device permissions for Personal Data access",
            "blocks": [
              {
                "type": "paragraph",
                "text": "The app requests certain permissions from Users that allow it to access the User's device Data as described below"
              },
              {
                "type": "subheading",
                "text": "Device permissions for Personal Data access"
              },
              {
                "type": "paragraph",
                "text": "The app requests certain permissions from Users that allow it to access the User's device Data as summarized here and described within this document."
              },
              {
                "type": "paragraph",
                "text": "Personal Data collected: Approximate location permission (non-continuous), Calendar permission, Camera permission, Phone permission, Precise location permission (continuous), Social media accounts permission and Storage permission."
              }
            ]
          },
          {
            "title": "Heat mapping and session recording",
            "blocks": [
              {
                "type": "paragraph",
                "text": "Heat mapping services are used to display the areas of a page where Users most frequently move the mouse or click. This shows where the points of interest are. These services make it possible to monitor and analyze web traffic and keep track of User behavior. Some of these services may record sessions and make them available for later visual playback."
              },
              {
                "type": "subheading",
                "text": "Inspectlet (Inspectlet Inc.)"
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
                  { "text": "Place of processing: United States - " },
                  { "text": "Privacy Policy", "href": "https://www.inspectlet.com/legal#privacy" },
                  { "text": " ." }
                ]
              }
            ]
          },
          {
            "title": "Hosting and backend infrastructure",
            "blocks": [
              {
                "type": "paragraph",
                "text": "This type of service has the purpose of hosting Data and files that enable the app to run and be distributed as well as to provide a ready-made infrastructure to run specific features or parts of the app. Some of these services work through geographically distributed servers, making it difficult to determine the actual location where the Personal Data are stored."
              },
              {
                "type": "subheading",
                "text": "Amazon Web Services (AWS) (Amazon)"
              },
              {
                "type": "paragraph",
                "text": "Amazon Web Services is a hosting and backend service provided by Amazon.com Inc."
              },
              {
                "type": "paragraph",
                "text": "Personal Data collected: various types of Data as specified in the privacy policy of the service."
              },
              {
                "type": "linked-paragraph",
                "parts": [{ "text": "Place of processing: See the Amazon privacy policy - " }, { "text": "Privacy Policy", "href": "https://aws.amazon.com/privacy/" }, { "text": " ." }]
              },
              {
                "type": "subheading",
                "text": "Engine Yard (Engine Yard, Inc.)"
              },
              {
                "type": "paragraph",
                "text": "Engine Yard is a hosting service provided by Engine Yard, Inc."
              },
              {
                "type": "paragraph",
                "text": "Personal Data collected: various types of Data as specified in the privacy policy of the service."
              },
              {
                "type": "linked-paragraph",
                "parts": [{ "text": "Place of processing: United States - " }, { "text": "Privacy Policy", "href": "https://www.engineyard.com/policies/privacy/" }, { "text": " ." }]
              },
              {
                "type": "subheading",
                "text": "Firebase Cloud Functions (Google Inc.)"
              },
              {
                "type": "paragraph",
                "text": "Firebase Cloud Functions is a hosting and backend service provided by Google Inc."
              },
              {
                "type": "paragraph",
                "text": "Personal Data collected: Usage Data and various types of Data as specified in the privacy policy of the service."
              },
              {
                "type": "linked-paragraph",
                "parts": [{ "text": "Place of processing: United States - " }, { "text": "Privacy Policy", "href": "https://www.google.com/intl/en/privacy/" }, { "text": " ." }]
              },
              {
                "type": "subheading",
                "text": "Firebase Cloud Storage (Google Inc.)"
              },
              {
                "type": "paragraph",
                "text": "Firebase Cloud Storage is a hosting service provided by Google Inc."
              },
              {
                "type": "paragraph",
                "text": "Personal Data collected: Usage Data and various types of Data as specified in the privacy policy of the service."
              },
              {
                "type": "linked-paragraph",
                "parts": [{ "text": "Place of processing: United States - " }, { "text": "Privacy Policy", "href": "https://www.google.com/policies/privacy/" }, { "text": " ." }]
              },
              {
                "type": "subheading",
                "text": "Firebase Realtime Database (Google Inc.)"
              },
              {
                "type": "paragraph",
                "text": "Firebase Realtime Database is a hosting and backend service provided by Google Inc."
              },
              {
                "type": "paragraph",
                "text": "Personal Data collected: Usage Data and various types of Data as specified in the privacy policy of the service."
              },
              {
                "type": "linked-paragraph",
                "parts": [{ "text": "Place of processing: United States - " }, { "text": "Privacy Policy", "href": "https://www.google.com/intl/en/privacy/" }, { "text": " ." }]
              }
            ]
          },
          {
            "title": "Infrastructure monitoring",
            "blocks": [
              {
                "type": "paragraph",
                "text": "This type of service allows the app to monitor the use and behavior of its components so its performance, operation, maintenance and troubleshooting can be improved. Which Personal Data are processed depends on the characteristics and mode of implementation of these services, whose function is to filter the activities of the app."
              },
              {
                "type": "subheading",
                "text": "Crashlytics (Google Inc.)"
              },
              {
                "type": "paragraph",
                "text": "Crashlytics is a monitoring service provided by Google Inc."
              },
              {
                "type": "paragraph",
                "text": "Personal Data collected: geographic position, unique device identifiers for advertising (Google Advertiser ID or IDFA, for example) and various types of Data as specified in the privacy policy of the service."
              },
              {
                "type": "linked-paragraph",
                "parts": [{ "text": "Place of processing: United States - " }, { "text": "Privacy Policy", "href": "https://try.crashlytics.com/terms/privacy-policy.pdf" }, { "text": " ." }]
              },
              {
                "type": "subheading",
                "text": "New Relic (New Relic)"
              },
              {
                "type": "paragraph",
                "text": "New Relic is a monitoring service provided by New Relic Inc. The way New Relic is integrated means that it filters all traffic of the app, i.e., communication between the Application and the User's browser or device, while also allowing analytical data on the app to be collected."
              },
              {
                "type": "paragraph",
                "text": "Personal Data collected: various types of Data as specified in the privacy policy of the service."
              },
              {
                "type": "linked-paragraph",
                "parts": [{ "text": "Place of processing: United States - " }, { "text": "Privacy Policy", "href": "https://newrelic.com/privacy" }, { "text": " ." }]
              }
            ]
          },
          {
            "title": "Interaction with external social networks and platforms",
            "blocks": [
              {
                "type": "paragraph",
                "text": "This type of service allows interaction with social networks or other external platforms directly from the pages of the app. The interaction and information obtained through the app are always subject to the User’s privacy settings for each social network. This type of service might still collect traffic data for the pages where the service is installed, even when Users do not use it."
              },
              {
                "type": "subheading",
                "text": "Facebook Like button and social widgets (Facebook, Inc.)"
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
                "parts": [{ "text": "Place of processing: United States - " }, { "text": "Privacy Policy", "href": "https://www.facebook.com/privacy/explanation" }, { "text": " ." }]
              }
            ]
          },
          {
            "title": "Interaction with online survey platforms",
            "blocks": [
              {
                "type": "paragraph",
                "text": "This type of service allows Users to interact with third-party online survey platforms directly from the pages of the app. If one of these services is installed, it may collect browsing and Usage Data in the pages where it is installed, even if the Users do not actively use the service."
              },
              {
                "type": "subheading",
                "text": "SurveyMonkey Widget (SurveyMonkey Inc.)"
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
                "parts": [{ "text": "Place of processing: United States - " }, { "text": "Privacy Policy", "href": "https://www.surveymonkey.com/mp/policy/privacy-policy/" }, { "text": " ." }]
              }
            ]
          },
          {
            "title": "Location-based interactions",
            "blocks": [
              {
                "type": "subheading",
                "text": "Geolocation"
              },
              {
                "type": "paragraph",
                "text": "The app may collect, use, and share User location Data in order to provide location-based services. Most browsers and devices provide tools to opt out from this feature by default. If explicit authorization has been provided, the User’s location data may be tracked by the app."
              },
              {
                "type": "paragraph",
                "text": "Personal Data collected: geographic position."
              },
              {
                "type": "subheading",
                "text": "Non-continuous geolocation"
              },
              {
                "type": "paragraph",
                "text": "The app may collect, use, and share User location Data in order to provide location-based services. Most browsers and devices provide tools to opt out from this feature by default. If explicit authorization has been provided, the User’s location data may be tracked by the app. The geographic location of the User is determined in a manner that isn't continuous, either at the specific request of the User or when the User doesn't point out its current location in the appropriate field and allows the application to detect the position automatically."
              },
              {
                "type": "paragraph",
                "text": "Personal Data collected: geographic position."
              }
            ]
          },
          {
            "title": "Managing contacts and sending messages",
            "blocks": [
              {
                "type": "paragraph",
                "text": "This type of service makes it possible to manage a database of email contacts, phone contacts or any other contact information to communicate with the User. These services may also collect data concerning the date and time when the message was viewed by the User, as well as when the User interacted with it, such as by clicking on links included in the message."
              },
              {
                "type": "subheading",
                "text": "Mandrill (The Rocket Science Group, LLC.)"
              },
              {
                "type": "paragraph",
                "text": "Mandrill is an email address management and message sending service provided by The Rocket Science Group, LLC."
              },
              {
                "type": "paragraph",
                "text": "Personal Data collected: email address and Usage Data."
              },
              {
                "type": "linked-paragraph",
                "parts": [{ "text": "Place of processing: United States - " }, { "text": "Privacy Policy", "href": "https://mailchimp.com/legal/privacy/" }, { "text": " ." }]
              },
              {
                "type": "subheading",
                "text": "Firebase Cloud Messaging (Google Inc.)"
              },
              {
                "type": "paragraph",
                "text": "Firebase Cloud Messaging is a message sending service provided by Google, Inc. Firebase Cloud Messaging allows the Owner to send messages and notifications to Users across platforms such as Android, iOS, and the web. Messages can be sent to single devices, groups of devices, or specific topics or User segments."
              },
              {
                "type": "paragraph",
                "text": "Personal Data collected: various types of Data as specified in the privacy policy of the service."
              },
              {
                "type": "linked-paragraph",
                "parts": [{ "text": "Place of processing: United States - " }, { "text": "Privacy Policy", "href": "https://www.google.com/policies/privacy/" }, { "text": " ." }]
              }
            ]
          },
          {
            "title": "Registration and authentication",
            "blocks": [
              {
                "type": "paragraph",
                "text": "By registering or authenticating, Users allow the app to identify them and give them access to dedicated services. Depending on what is described below, third parties may provide registration and authentication services. In this case, the app will be able to access some Data, stored by these third-party services, for registration or identification purposes."
              },
              {
                "type": "subheading",
                "text": "Direct registration"
              },
              {
                "type": "paragraph",
                "text": "The User registers by filling out the registration form and providing the Personal Data directly to the app."
              },
              {
                "type": "paragraph",
                "text": "Personal Data collected: email address, first name and last name."
              }
            ]
          },
          {
            "title": "SPAM protection",
            "blocks": [
              {
                "type": "paragraph",
                "text": "This type of service analyzes the traffic of the app, potentially containing Users' Personal Data, with the purpose of filtering it from parts of traffic, messages and content that are recognized as SPAM."
              },
              {
                "type": "subheading",
                "text": "Google reCAPTCHA (Google Inc.)"
              },
              {
                "type": "linked-paragraph",
                "parts": [{ "text": "Google reCAPTCHA is a SPAM protection service provided by Google Inc. The use of reCAPTCHA is subject to the Google " }, { "text": "privacy policy", "href": "https://www.google.com/policies/privacy/" }, { "text": " and " }, { "text": "terms of use", "href": "https://www.google.com/intl/en/policies/terms/" }, { "text": " ." }]
              },
              {
                "type": "paragraph",
                "text": "Personal Data collected: Cookies and Usage Data."
              },
              {
                "type": "linked-paragraph",
                "parts": [{ "text": "Place of processing: United States - " }, { "text": "Privacy Policy", "href": "https://www.google.com/intl/policies/privacy/" }, { "text": " ." }]
              }
            ]
          }
        ]
      },
      {
        "heading": "Further information about Personal Data",
        "level": 2,
        "blocks": [],
        "accordionItems": [
          {
            "title": "Push notifications",
            "blocks": [
              {
                "type": "paragraph",
                "text": "The app may send push notifications to the User."
              }
            ]
          },
          {
            "title": "Selling goods and services online",
            "blocks": [
              {
                "type": "paragraph",
                "text": "The Personal Data collected are used to provide the User with services or to sell goods, including payment and possible delivery. The Personal Data collected to complete the payment may include the credit card, the bank account used for the transfer, or any other means of payment envisaged. The kind of Data collected by the app depends on the payment system used."
              }
            ]
          },
          {
            "title": "The Service is not directed to children under the age of 13",
            "blocks": [
              {
                "type": "paragraph",
                "text": "Users declare themselves to be adult according to their applicable legislation. Minors may use the app only with the assistance of a parent or guardian. Under no circumstance persons under the age of 13 may use the app."
              }
            ]
          }
        ]
      },
      {
        "heading": "The rights of Users",
        "level": 2,
        "blocks": [
          {
            "type": "paragraph",
            "text": "Users may exercise certain rights regarding their Data processed by the Owner."
          },
          {
            "type": "paragraph",
            "text": "In particular, Users have the right to do the following:"
          },
          {
            "type": "bullets",
            "items": [
              "Withdraw their consent at any time. Users have the right to withdraw consent where they have previously given their consent to the processing of their Personal Data.",
              "Object to processing of their Data. Users have the right to object to the processing of their Data if the processing is carried out on a legal basis other than consent. Further details are provided in the dedicated section below.",
              "Access their Data. Users have the right to learn if Data is being processed by the Owner, obtain disclosure regarding certain aspects of the processing and obtain a copy of the Data undergoing processing.",
              "Verify and seek rectification. Users have the right to verify the accuracy of their Data and ask for it to be updated or corrected.",
              "Restrict the processing of their Data. Users have the right, under certain circumstances, to restrict the processing of their Data. In this case, the Owner will not process their Data for any purpose other than storing it.",
              "Have their Personal Data deleted or otherwise removed. Users have the right, under certain circumstances, to obtain the erasure of their Data from the Owner.",
              "Receive their Data and have it transferred to another controller. Users have the right to receive their Data in a structured, commonly used and machine readable format and, if technically feasible, to have it transmitted to another controller without any hindrance. This provision is applicable provided that the Data is processed by automated means and that the processing is based on the User's consent, on a contract which the User is part of or on pre-contractual obligations thereof.",
              "Lodge a complaint. Users have the right to bring a claim before their competent data protection authority."
            ]
          }
        ]
      },
      {
        "heading": "Details about the right to object to processing",
        "level": 3,
        "blocks": [
          {
            "type": "paragraph",
            "text": "Where Personal Data is processed for a public interest, in the exercise of an official authority vested in the Owner or for the purposes of the legitimate interests pursued by the Owner, Users may object to such processing by providing a ground related to their particular situation to justify the objection."
          },
          {
            "type": "paragraph",
            "text": "Users must know that, however, should their Personal Data be processed for direct marketing purposes, they can object to that processing at any time without providing any justification. To learn, whether the Owner is processing Personal Data for direct marketing purposes, Users may refer to the relevant sections of this document."
          }
        ]
      },
      {
        "heading": "How to exercise these rights",
        "level": 3,
        "blocks": [
          {
            "type": "paragraph",
            "text": "Any requests to exercise User rights can be directed to the Owner through the contact details provided in this document. These requests can be exercised free of charge and will be addressed by the Owner as early as possible and always within one month."
          }
        ]
      },
      {
        "heading": "Cookie Policy",
        "level": 2,
        "blocks": [
          {
            "type": "linked-paragraph",
            "parts": [{ "text": "The app uses Cookies. To learn more and for a detailed cookie notice, the User may consult the " }, { "text": "Cookie Policy", "href": "/privacy-policy/trip-n-touch/cookies" }, { "text": " ." }]
          }
        ]
      },
      {
        "heading": "Additional information about Data collection and processing",
        "level": 2,
        "blocks": []
      },
      {
        "heading": "Legal action",
        "level": 3,
        "blocks": [
          {
            "type": "paragraph",
            "text": "The User's Personal Data may be used for legal purposes by the Owner in Court or in the stages leading to possible legal action arising from improper use of the app or the related Services. The User declares to be aware that the Owner may be required to reveal personal data upon request of public authorities."
          }
        ]
      },
      {
        "heading": "Additional information about User's Personal Data",
        "level": 3,
        "blocks": [
          {
            "type": "paragraph",
            "text": "In addition to the information contained in this privacy policy, the app may provide the User with additional and contextual information concerning particular Services or the collection and processing of Personal Data upon request."
          }
        ]
      },
      {
        "heading": "System logs and maintenance",
        "level": 3,
        "blocks": [
          {
            "type": "paragraph",
            "text": "For operation and maintenance purposes, the app and any third-party services may collect files that record interaction with the app (System logs) use other Personal Data (such as the IP Address) for this purpose."
          }
        ]
      },
      {
        "heading": "Information not contained in this policy",
        "level": 3,
        "blocks": [
          {
            "type": "paragraph",
            "text": "More details concerning the collection or processing of Personal Data may be requested from the Owner at any time. Please see the contact information at the beginning of this document."
          }
        ]
      },
      {
        "heading": "How “Do Not Track” requests are handled",
        "level": 3,
        "blocks": [
          {
            "type": "paragraph",
            "text": "The app does not support “Do Not Track” requests. To determine whether any of the third-party services it uses honor the “Do Not Track” requests, please read their privacy policies."
          }
        ]
      },
      {
        "heading": "Changes to this privacy policy",
        "level": 3,
        "blocks": [
          {
            "type": "paragraph",
            "text": "The Owner reserves the right to make changes to this privacy policy at any time by giving notice to its Users on this page and possibly within the app and/or - as far as technically and legally feasible - sending a notice to Users via any contact information available to the Owner. It is strongly recommended to check this page often, referring to the date of the last modification listed at the bottom. If a User objects to any of the changes to the Policy, the User must cease using this Application and can request that the Owner remove the Personal Data. Unless stated otherwise, the then-current privacy policy applies to all Personal Data the Owner has about Users."
          }
        ],
        "accordionItems": [
          {
            "title": "Definitions and legal references",
            "blocks": [
              {
                "type": "subheading",
                "text": "Personal Data (or Data)"
              },
              {
                "type": "paragraph",
                "text": "Any information that directly, indirectly, or in connection with other information — including a personal identification number — allows for the identification or identifiability of a natural person."
              },
              {
                "type": "subheading",
                "text": "Usage Data"
              },
              {
                "type": "paragraph",
                "text": "Information collected automatically through the app (or third-party services employed in the app), which can include: the IP addresses or domain names of the computers utilized by the Users who use the app, the URI addresses (Uniform Resource Identifier), the time of the request, the method utilized to submit the request to the server, the size of the file received in response, the numerical code indicating the status of the server's answer (successful outcome, error, etc.), the country of origin, the features of the browser and the operating system utilized by the User, the various time details per visit (e.g., the time spent on each page within the Application) and the details about the path followed within the Application with special reference to the sequence of pages visited, and other parameters about the device operating system and/or the User's IT environment."
              },
              {
                "type": "subheading",
                "text": "User"
              },
              {
                "type": "paragraph",
                "text": "The individual using the app who, unless otherwise specified, coincides with the Data Subject."
              },
              {
                "type": "subheading",
                "text": "Data Subject"
              },
              {
                "type": "paragraph",
                "text": "The natural person to whom the Personal Data refers."
              },
              {
                "type": "subheading",
                "text": "Data Processor (or Data Supervisor)"
              },
              {
                "type": "paragraph",
                "text": "The natural or legal person, public authority, agency or other body which processes Personal Data on behalf of the Controller, as described in this privacy policy."
              },
              {
                "type": "subheading",
                "text": "Data Controller (or Owner)"
              },
              {
                "type": "paragraph",
                "text": "The natural or legal person, public authority, agency or other body which, alone or jointly with others, determines the purposes and means of the processing of Personal Data, including the security measures concerning the operation and use of the app. The Data Controller, unless otherwise specified, is the Owner of the app."
              },
              {
                "type": "subheading",
                "text": "This Application"
              },
              {
                "type": "paragraph",
                "text": "The means by which the Personal Data of the User is collected and processed."
              },
              {
                "type": "subheading",
                "text": "Service"
              },
              {
                "type": "paragraph",
                "text": "The service as described in the relative terms (if available) and on this site/application."
              },
              {
                "type": "subheading",
                "text": "European Union (or EU)"
              },
              {
                "type": "paragraph",
                "text": "Unless otherwise specified, all references made within this document to the European Union include all current member states to the European Union and the European Economic Area."
              },
              {
                "type": "subheading",
                "text": "Cookies"
              },
              {
                "type": "paragraph",
                "text": "Small sets of data stored in the User's device."
              },
              {
                "type": "subheading",
                "text": "Legal information"
              },
              {
                "type": "paragraph",
                "text": "This privacy statement has been prepared based on provisions of multiple legislations, including Art. 13/14 of Regulation (EU) 2016/679 (General Data Protection Regulation)."
              },
              {
                "type": "paragraph",
                "text": "This privacy policy relates solely to the app, if not stated otherwise within this document."
              },
              {
                "type": "subheading",
                "text": "Cookies"
              },
              {
                "type": "paragraph",
                "text": "This privacy statement has been prepared based on provisions of multiple legislations, including Art. 13/14 of Regulation (EU) 2016/679 (General Data Protection Regulation)."
              },
              {
                "type": "paragraph",
                "text": "This privacy policy relates solely to the app, if not stated otherwise within this document."
              }
            ]
          }
        ]
      },
      {
        "heading": "Data Processor",
        "level": 2,
        "blocks": [
          {
            "type": "paragraph",
            "text": "Travelworks Solution / PC Voyages: Data Protection Officer 368 Notre-Dame West, 4th floor Montreal (QC) H2Y 1T9 - Canada"
          },
          {
            "type": "linked-paragraph",
            "parts": [{ "text": "info [at] " }, { "text": "travelworkssolution.com", "href": "https://travelworkssolution.com/" }, { "text": " " }, { "text": "pcvoyages.com/", "href": "https://pcvoyages.com/" }]
          }
        ]
      },
      {
        "heading": "Data Controller",
        "level": 2,
        "blocks": [
          {
            "type": "paragraph",
            "text": "The Data Controller is the publisher of this mobile application / website"
          },
          {
            "type": "linked-paragraph",
            "parts": [{ "text": "To request a personal data access: " }, { "text": "Contact the Data Protection Officer", "href": "https://travelworkssolution.com/" }]
          }
        ]
      }
    ]
  },
  "fr": {
    "title": "Trip'n Touch - Politique de confidentialité",
    "metadataTitle": "Trip'n Touch - Politique de confidentialité",
    "metadataDescription": "Politique de confidentialité de Trip'n Touch.",
    "lastUpdatedLabel": "Derniere mise a jour :",
    "lastUpdatedDate": "24 avril 2024",
    "sections": [
      {
        "heading": "Types de Données collectées",
        "level": 2,
        "blocks": [
          {
            "type": "paragraph",
            "text": "Figurent parmi les types de Données personnelles que Trip n'touch collecte directement ou en recourant à des tiers : position géographique, Autorisation de stockage, Autorisation de l'agenda, Autorisation de la caméra, Autorisation de la localisation précise (continue), Autorisation de la localisation approximative (non continue), Autorisation du téléphone, Autorisation des comptes de médias sociaux, Cookies, Données d'utilisation, prénom, nom de famille, adresse électronique et identification unique du dispositif pour la publicité (identifiant publicitaire Google ou IDFA, par exemple)."
          },
          {
            "type": "paragraph",
            "text": "Les détails complets sur chaque type de Données personnelles collectées sont fournis dans les parties consacrées à la présente politique de confidentialité ou par des textes d’explication spécifiques publiés avant la collecte des Données. Les Données personnelles peuvent être librement fournies par l’Utilisateur, ou, en cas de Données d’utilisation, collectées automatiquement lorsque vous utilisez Trip n'touch."
          },
          {
            "type": "paragraph",
            "text": "Sauf indication contraire, toutes les Données demandées par Trip n'touch sont obligatoires et leur absence peut rendre impossible la fourniture des Services par Trip n'touch. Dans le cas où Trip n'touch précise que certaines Données ne sont pas obligatoires, les Utilisateurs sont libres de ne pas les communiquer sans entraîner de conséquences sur la disponibilité ou le fonctionnement du Service. Les Utilisateurs qui auraient des doutes sur les Données personnelles obligatoires sont invités à contacter le Propriétaire."
          },
          {
            "type": "paragraph",
            "text": "Toute utilisation des Cookies – ou d’autres outils de suivi – par Trip n'touch ou par les propriétaires de services tiers utilisés par Trip n'touch vise à fournir le Service demandé par l’Utilisateur, outre les autres finalités décrites dans le présent document et dans la Politique relative aux cookies, si elle est disponible."
          },
          {
            "type": "paragraph",
            "text": "Les Utilisateurs sont responsables de toute Donnée personnelle de tiers obtenue, publiée ou communiquée par l’intermédiaire de Trip n'touch et confirment qu’ils obtiennent le consentement du tiers pour fournir les Données au Propriétaire."
          }
        ]
      },
      {
        "heading": "Localisation précise en arrière-plan pour l'application Trip n'touch",
        "level": 3,
        "blocks": [
          {
            "type": "paragraph",
            "text": "L'application Trip n'touch collecte des données de localisation pour afficher les alertes de risque en temps réel et les fonctionnalités de notification d'assistance personnalisée, même lorsque l'application est fermée et non utilisée. Cette option peut être modifiée ultérieurement en accédant aux paramètres de l'appareil."
          }
        ]
      },
      {
        "heading": "Mode et lieu de traitement des Données",
        "level": 2,
        "blocks": []
      },
      {
        "heading": "Méthodes de traitement",
        "level": 3,
        "blocks": [
          {
            "type": "paragraph",
            "text": "Le Propriétaire prend les mesures de sécurité appropriées afin d’empêcher l’accès, la divulgation, la modification ou la destruction non autorisés des Données. Le traitement des Données est effectué à l’aide d’ordinateurs ou d’outils informatiques, en suivant les procédures et les modes organisationnels étroitement liés aux finalités indiquées. Outre le Propriétaire, les Données peuvent être accessibles, dans certains cas, à certaines catégories de personnes en charge du fonctionnement de Trip n'touch (administration, ventes, marketing, service juridique, administration du système) ou à des parties externes (telles que les fournisseurs tiers de services techniques, les services de messagerie, les fournisseurs d’hébergement, les entreprises informatiques, les agences de communication) désignées, le cas échéant, comme Sous-traitantes par le Propriétaire. La liste mise à jour de ces parties peut être demandée à tout moment au Propriétaire."
          }
        ]
      },
      {
        "heading": "Base juridique du traitement",
        "level": 3,
        "blocks": [
          {
            "type": "paragraph",
            "text": "Le Propriétaire peut traiter les Données personnelles relatives aux Utilisateurs si l'une des conditions suivantes s’applique :"
          },
          {
            "type": "bullets",
            "items": [
              "les Utilisateurs ont donné leur consentement pour une ou plusieurs finalités spécifiques ; A noter : Selon certaines législations, le Propriétaire peut être autorisé à traiter des Données personnelles jusqu'à ce que l'Utilisateur s'y oppose (« opt-out »), sans avoir à dépendre du consentement ou de l'une des bases juridiques suivantes. Cette condition ne s'applique toutefois pas lorsque le traitement des Données personnelles est soumis à la loi européenne sur la protection des données ;",
              "la fourniture de Données est nécessaire pour l'exécution d'un accord avec l'Utilisateur ou pour toute obligation précontractuelle de celui-ci ;",
              "le traitement est nécessaire pour se conformer à une obligation légale à laquelle le Propriétaire est soumis ;",
              "le traitement est lié à une tâche effectuée dans l'intérêt public ou dans l'exercice de l'autorité publique dévolue au Propriétaire ;",
              "le traitement est nécessaire aux fins des intérêts légitimes poursuivis par le Propriétaire ou par un tiers."
            ]
          },
          {
            "type": "paragraph",
            "text": "Dans tous les cas, le Propriétaire vous aidera volontiers à clarifier la base juridique spécifique qui s'applique au traitement, et en particulier si la fourniture de Données personnelles est une exigence légale ou contractuelle, ou une exigence nécessaire pour conclure un contrat."
          }
        ]
      },
      {
        "heading": "Lieu de traitement",
        "level": 3,
        "blocks": [
          {
            "type": "paragraph",
            "text": "Les Données sont traitées sont traitées au Etats-Unis ou au Royaume-Uni Selon la localisation de l’Utilisateur, les transferts de données peuvent entraîner le transfert des Données de ce dernier vers un pays autre que le sien. Pour en savoir plus sur le lieu de traitement de ces Données transférées, veuillez contacter le responsable du traitement des données mentionné en bas de page"
          },
          {
            "type": "paragraph",
            "text": "Les Utilisateurs ont également le droit de connaître la base juridique des transferts de Données vers un pays situé en dehors de l'Union européenne ou vers toute organisation internationale régie par le droit international public ou créée par deux pays ou plus, comme l'ONU, ainsi que les mesures de sécurité prises par le Propriétaire pour sauvegarder leurs Données. Si un tel transfert a lieu, les Utilisateurs peuvent en savoir plus en consultant les sections correspondantes du présent document ou se renseigner auprès du Propriétaire en utilisant les informations fournies dans la section de contact."
          }
        ]
      },
      {
        "heading": "Temps de conservation",
        "level": 3,
        "blocks": [
          {
            "type": "paragraph",
            "text": "Les Données personnelles sont traitées et conservées aussi longtemps que requis pour la finalité pour laquelle elles ont été collectées."
          },
          {
            "type": "paragraph",
            "text": "Par conséquent :"
          },
          {
            "type": "bullets",
            "items": [
              "Les Données personnelles collectées à des fins liées à l'exécution d'un contrat entre le Propriétaire et l'Utilisateur doivent être conservées jusqu'à la pleine exécution du contrat.",
              "Les Données personnelles collectées aux fins des intérêts légitimes du Propriétaire doivent être conservées aussi longtemps que nécessaire pour atteindre ces objectifs. Les Utilisateurs peuvent trouver des informations spécifiques concernant les intérêts légitimes poursuivis par le Propriétaire dans les sections correspondantes du présent document ou en contactant le Propriétaire."
            ]
          },
          {
            "type": "paragraph",
            "text": "Le Propriétaire peut être autorisé à conserver des Données personnelles plus longtemps chaque fois que l’Utilisateur a donné son consentement à un tel traitement, tant que ce consentement n’est pas retiré. En outre, le Propriétaire peut être obligé de conserver des Données personnelles plus longtemps chaque fois que cela est requis pour l'exécution d'une obligation légale ou sur ordre d'une autorité. Une fois la période de conservation expirée, les Données personnelles seront supprimées. Par conséquent, le droit d'accès, le droit d'effacement, le droit de rectification et le droit à la portabilité des données ne peuvent être appliqués après l'expiration de la période de conservation."
          }
        ]
      },
      {
        "heading": "Finalités du traitement",
        "level": 2,
        "blocks": [
          {
            "type": "paragraph",
            "text": "Les Données relatives à l’Utilisateur sont collectées afin de permettre au Propriétaire de fournir ses Services, ainsi que pour les finalités suivantes : Interactions basées sur la localisation, Autorisations du dispositif pour accéder aux Données personnelles, Analyses, Hébergement web et infrastructure de backend, Interaction avec des plate-formes de sondage en ligne, Inscription et authentification, Carte de chaleur et enregistrement de sessions, Surveillance de Trip n'touch, Échanges avec les réseaux sociaux et les plateformes externes, Protection anti-SPAM et Gestion des contacts et envoi de messages."
          },
          {
            "type": "paragraph",
            "text": "Les Utilisateurs peuvent trouver de plus amples informations sur les finalités de ce traitement et sur les Données personnelles spécifiques utilisées pour chaque finalité dans les sections respectives du présent document."
          }
        ]
      },
      {
        "heading": "Autorisations du dispositif pour accéder aux Données personnelles",
        "level": 2,
        "blocks": [
          {
            "type": "paragraph",
            "text": "Selon le dispositif particulier de l'Utilisateur, Trip n'touch pourrait demander certaines autorisations pour lui autoriser l'accès aux Données du dispositif de l'Utilisateur comme décrit ci-dessous."
          },
          {
            "type": "paragraph",
            "text": "Par défaut, ces autorisations doivent être accordées par l’Utilisateur avant que les informations respectives soient accessibles. Une fois que l’autorisation a été donnée, elle peut être révoquée par l’Utilisateur à tout moment. Afin de révoquer ces autorisations, les Utilisateurs peuvent consulter les paramètres du dispositif ou contacter le Propriétaire aux coordonnées fournies dans le présent document. La procédure exacte pour contrôler les permissions des applications peut dépendre du dispositif et du logiciel de l’Utilisateur."
          },
          {
            "type": "paragraph",
            "text": "Veuillez noter que la révocation de ces autorisations peut affecter le bon fonctionnement de Trip n'touch."
          },
          {
            "type": "paragraph",
            "text": "Si l’Utilisateur accorde l’une des autorisations répertoriées ci-dessous, ces Données personnelles respectives peuvent être traitées (c’est-à-dire accessibles, modifiées ou supprimées) par Trip n'touch."
          }
        ]
      },
      {
        "heading": "Autorisation de la caméra",
        "level": 3,
        "blocks": [
          {
            "type": "paragraph",
            "text": "Utilisée pour accéder à la caméra ou enregistrer des images et des vidéos avec le dispositif."
          }
        ]
      },
      {
        "heading": "Autorisation de la localisation approximative (non continue)",
        "level": 3,
        "blocks": [
          {
            "type": "paragraph",
            "text": "Utilisée pour accéder à la localisation approximative du dispositif de l’Utilisateur. Trip n'touch peut collecter, utiliser et partager les Données de localisation de l’Utilisateur aux fins de fournir des services basés sur la localisation. La localisation géographique de l’Utilisateur est déterminée de façon non continue. Cela signifie qu’il est impossible pour Trip n'touch d’obtenir la position approximative de l’Utilisateur de façon continue."
          }
        ]
      },
      {
        "heading": "Autorisation de la localisation précise (continue)",
        "level": 3,
        "blocks": [
          {
            "type": "paragraph",
            "text": "Utilisée pour accéder à la localisation précise du dispositif de l’Utilisateur. Trip n'touch peut collecter, utiliser et partager les Données de localisation de l’Utilisateur aux fins de fournir des services basés sur la localisation."
          }
        ]
      },
      {
        "heading": "Autorisation de l’agenda",
        "level": 3,
        "blocks": [
          {
            "type": "paragraph",
            "text": "Utilisée pour accéder à l’agenda sur le dispositif de l’Utilisateur, notamment la lecture, l’ajout et la suppression d’entrées."
          }
        ]
      },
      {
        "heading": "Autorisation de stockage",
        "level": 3,
        "blocks": [
          {
            "type": "paragraph",
            "text": "Utilisée pour accéder à un stockage externe partagé, notamment la lecture et l’ajout d’éléments."
          }
        ]
      },
      {
        "heading": "Autorisation des comptes de médias sociaux",
        "level": 3,
        "blocks": [
          {
            "type": "paragraph",
            "text": "Utilisée pour accéder aux profils de comptes des médias sociaux de l’Utilisateur, comme Facebook et Twitter."
          }
        ]
      },
      {
        "heading": "Autorisation du téléphone",
        "level": 3,
        "blocks": [
          {
            "type": "paragraph",
            "text": "Utilisée pour accéder à une multitude de fonctionnalités typiques liées à la téléphonie. Cela permet, par exemple, l’accès en lecture seule à l’« État du téléphone », ce qui signifie qu’elle autorise l’accès au numéro de téléphone du dispositif, aux actualités du réseau mobile actuel ou au statut des appels en cours."
          }
        ]
      },
      {
        "heading": "Données de localisation",
        "level": 3,
        "blocks": [
          {
            "type": "paragraph",
            "text": "Les données de localisation dans cette application utilisent une localisation précise en arrière-plan. L’application recueille des données de localisation pour afficher les alertes en temps réel et les fonctionnalités de notification d’assistance personnalisée, même lorsque l’application est fermée et non utilisée. Cette option peut être modifiée ultérieurement en allant dans les paramètres de l’appareil et également gérée dans les paramètres de l’application."
          }
        ]
      },
      {
        "heading": "Informations détaillées sur le traitement des données de localisation",
        "level": 2,
        "blocks": [
          {
            "type": "subheading",
            "text": "1. Pourquoi nous recueillons des données de localisation"
          },
          {
            "type": "paragraph",
            "text": "Nous recueillons des données précises sur l’emplacement pour : Fournir des alertes de risque en temps réel pertinentes à votre emplacement, comme les dangers pour la sécurité ou les urgences. Envoyer des notifications d’assistance personnalisées en fonction de votre emplacement actuel ou récent."
          },
          {
            "type": "subheading",
            "text": "2. Collection de l’emplacement d’arrière-plan"
          },
          {
            "type": "paragraph",
            "text": "L’application collecte vos données de localisation même lorsqu’elle est fermée ou non utilisée. Les données de localisation sont nécessaires pour vous assurer de recevoir des alertes et des notifications en temps opportun, surtout pendant les urgences ou les événements critiques."
          },
          {
            "type": "subheading",
            "text": "3. Comment nous utilisons vos données de localisation"
          },
          {
            "type": "paragraph",
            "text": "Vos données de localisation sont utilisées uniquement pour : Fournir des alertes et des notifications en temps réel. Améliorer la précision et la pertinence de nos services de sécurité."
          },
          {
            "type": "subheading",
            "text": "4. Stockage et conservation des données"
          },
          {
            "type": "paragraph",
            "text": "Vos données de localisation sont traitées en toute sécurité et stockées uniquement pendant la durée nécessaire pour fournir les fonctionnalités de l’application. Les données historiques de localisation peuvent être conservées pour analyse afin d’améliorer la fonctionnalité du service, mais uniquement dans le respect des lois applicables."
          },
          {
            "type": "subheading",
            "text": "5. Partage des données de localisation"
          },
          {
            "type": "paragraph",
            "text": "Nous ne partageons pas vos données de localisation précises avec des tiers à des fins de marketing ou de publicité. Les données de localisation peuvent être partagées avec des services d’urgence autorisés ou des partenaires uniquement pour améliorer votre sécurité lors de situations critiques."
          },
          {
            "type": "subheading",
            "text": "6. Vos choix et votre contrôle"
          },
          {
            "type": "paragraph",
            "text": "Désactiver la localisation en arrière-plan : vous pouvez désactiver le suivi de localisation en arrière-plan à tout moment via les paramètres de votre appareil. Veuillez noter que la désactivation de cette fonctionnalité peut limiter la capacité de l'application à fournir des alertes et des notifications en temps opportun. Gérer les autorisations de localisation : vous pouvez ajuster les autorisations de localisation (par exemple, « Autoriser tout le temps », « Autoriser uniquement pendant l'utilisation de l'application » ou « Refuser ») dans les paramètres de votre appareil."
          }
        ]
      },
      {
        "heading": "Informations détaillées sur le traitement des Données personnelles",
        "level": 2,
        "blocks": [
          {
            "type": "paragraph",
            "text": "Les Données personnelles sont collectées pour les finalités suivantes à l'aide de plusieurs services :"
          }
        ],
        "accordionItems": [
          {
            "title": "Analyses",
            "blocks": [
              {
                "type": "paragraph",
                "text": "Les services que contient cette partie permettent au Propriétaire de surveiller et d’analyser le trafic Web et de suivre l’évolution du comportement de l’Utilisateur."
              },
              {
                "type": "subheading",
                "text": "Google Analytics (Google Inc.)"
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
                "parts": [{ "text": "Lieu de traitement : États-Unis - " }, { "text": "Politique de confidentialité", "href": "https://www.google.com/intl/fr/policies/privacy/" }, { "text": " - " }, { "text": "Option de retrait", "href": "https://tools.google.com/dlpage/gaoptout?hl=fr" }, { "text": "." }]
              },
              {
                "type": "subheading",
                "text": "Google Analytics for Firebase (Google Inc.)"
              },
              {
                "type": "linked-paragraph",
                "parts": [{ "text": "Google Analytics pour Firebase ou Firebase Analytics est un service d’analyse fourni par Google Inc. Pour comprendre l’utilisation de Données par Google, consultez " }, { "text": "la politique de Google concernant ses partenaires", "href": "https://www.google.com/intl/fr/policies/privacy/partners/" }, { "text": " ." }]
              },
              {
                "type": "paragraph",
                "text": "Firebase Analytics peut partager des Données avec d’autres outils fournis par Firebase, comme le rapport d’accidents, l’authentification, la configuration à distance ou les notifications. L’Utilisateur peut consulter la présente politique de confidentialité afin de trouver une explication détaillée sur les autres outils utilisés par le Propriétaire."
              },
              {
                "type": "paragraph",
                "text": "Trip n'touch peut utiliser des identifiants pour les appareils mobiles (y compris l’identifiant publicitaire Android ou l’identifiant publicitaire pour iOS) et des technologies similaires aux cookies pour exécuter le service Firebase Analytics."
              },
              {
                "type": "paragraph",
                "text": "Les Utilisateurs peuvent exclure certaines fonctionnalités de Firebase par les paramètres appropriés de leur appareil, tels que les paramètres publicitaires pour les téléphones mobiles, ou en suivant les instructions fournies sur d’autres pages liées à Firebase de la présente politique de confidentialité, le cas échéant."
              },
              {
                "type": "paragraph",
                "text": "Données personnelles collectées : Cookies, Données d'utilisation et identification unique du dispositif pour la publicité (identifiant publicitaire Google ou IDFA, par exemple)."
              },
              {
                "type": "linked-paragraph",
                "parts": [{ "text": "Lieu de traitement : États-Unis - " }, { "text": "Politique de confidentialité", "href": "https://www.google.com/intl/fr/policies/privacy/" }, { "text": "." }]
              }
            ]
          },
          {
            "title": "Autorisations du dispositif pour accéder aux Données personnelles",
            "blocks": [
              {
                "type": "paragraph",
                "text": "Trip n'touch nécessite certaines autorisations des Utilisateurs qui lui permettent d’accéder aux Données du dispositif des Utilisateurs, présentées ci-après."
              },
              {
                "type": "subheading",
                "text": "Autorisations du dispositif pour accéder aux Données personnelles (Trip n'touch)"
              },
              {
                "type": "paragraph",
                "text": "Trip n'touch nécessite certaines autorisations des Utilisateurs qui lui permettent d’accéder aux Données du dispositif des Utilisateurs, présentées dans le présent document."
              },
              {
                "type": "paragraph",
                "text": "Données personnelles collectées : Autorisation de la caméra, Autorisation de la localisation approximative (non continue), Autorisation de la localisation précise (continue), Autorisation de l’agenda, Autorisation de stockage, Autorisation des comptes de médias sociaux et Autorisation du téléphone."
              }
            ]
          },
          {
            "title": "Carte de chaleur et enregistrement de sessions",
            "blocks": [
              {
                "type": "paragraph",
                "text": "Les services de cartes de chaleur sont utilisés pour afficher les endroits d'une page où les Utilisateurs bougent la souris ou cliquent le plus souvent. Ainsi les points d'intérêt sont localisés. Les services permettent de surveiller et d'analyser le trafic Web et de suivre l'évolution du comportement de l'Utilisateur. Certains de ces services peuvent enregistrer les sessions et les rendre disponibles pour une lecture visuelle ultérieure."
              },
              {
                "type": "subheading",
                "text": "Inspectlet (Inspectlet Inc.)"
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
                "parts": [{ "text": "Lieu de traitement : États-Unis - " }, { "text": "Politique de confidentialité", "href": "https://www.inspectlet.com/legal#privacy" }, { "text": "." }]
              }
            ]
          },
          {
            "title": "Gestion des contacts et envoi de messages",
            "blocks": [
              {
                "type": "paragraph",
                "text": "Ce type de services permet de gérer une base de données d’adresses électroniques, de numéros de téléphone ou de toutes autres coordonnées pour communiquer avec l’Utilisateur. Ces services peuvent aussi collecter des données concernant la date et l’heure auxquelles l’Utilisateur visionne le message, l’heure à laquelle il interagit avec ce message, par exemple en cliquant sur les liens inclus dans celui-ci."
              },
              {
                "type": "subheading",
                "text": "Mandrill (The Rocket Science Group, LLC.)"
              },
              {
                "type": "paragraph",
                "text": "Mandrill est un service de gestion d’adresses électroniques et d’envoi de messages fourni par The Rocket Science Group, LLC."
              },
              {
                "type": "paragraph",
                "text": "Données personnelles collectées : adresse électronique et Données d'utilisation."
              },
              {
                "type": "linked-paragraph",
                "parts": [{ "text": "Lieu de traitement : États-Unis - " }, { "text": "Politique de confidentialité", "href": "https://mailchimp.com/legal/privacy/" }, { "text": "." }]
              },
              {
                "type": "subheading",
                "text": "Firebase Cloud Messaging (Google Inc.)"
              },
              {
                "type": "paragraph",
                "text": "Firebase Cloud Messaging est un service d’envoi de messages fourni par Google Inc. Firebase Cloud Messaging permet au Propriétaire d’envoyer des messages et des notifications aux Utilisateurs à travers des plateformes comme Android, iOS et en ligne. Les messages peuvent être envoyés à des appareils uniques, des groupes d’appareils, ou des sujets ou des segments spécifiques de l’Utilisateur."
              },
              {
                "type": "paragraph",
                "text": "Données personnelles collectées : différents types de Données indiquées dans la politique de confidentialité du service."
              },
              {
                "type": "linked-paragraph",
                "parts": [{ "text": "Lieu de traitement : États-Unis - " }, { "text": "Politique de confidentialité", "href": "https://www.google.com/intl/fr/policies/privacy/" }, { "text": "." }]
              }
            ]
          },
          {
            "title": "Hébergement web et infrastructure de backend",
            "blocks": [
              {
                "type": "paragraph",
                "text": "Ces types de services ont pour objet d'héberger des données et des fichiers qui permettent à Trip n'touch de fonctionner et d’être distribuée et de fournir une infrastructure prête à l’emploi pour que des fonctions ou parties spécifiques de Trip n'touch fonctionnent. Certains de ces services fonctionnent par l’entremise de serveurs dispersés géographiquement, de sorte qu’il est difficile de déterminer l'emplacement réel où les Données Personnelles sont stockées."
              },
              {
                "type": "subheading",
                "text": "Amazon Web Services (AWS) (Amazon)"
              },
              {
                "type": "paragraph",
                "text": "Amazon Web Services est un service d’hébergement et de backend fourni par Amazon.com Inc."
              },
              {
                "type": "paragraph",
                "text": "Données personnelles collectées : différents types de Données indiquées dans la politique de confidentialité du service."
              },
              {
                "type": "linked-paragraph",
                "parts": [{ "text": "Lieu de traitement : Voir la Politique de confidentialité de Amazon - " }, { "text": "Politique de confidentialité", "href": "https://aws.amazon.com/fr/privacy/" }, { "text": "." }]
              },
              {
                "type": "subheading",
                "text": "Engine Yard (Engine Yard, Inc.)"
              },
              {
                "type": "paragraph",
                "text": "Engine Yard est un service d’hébergement fourni par Engine Yard, Inc."
              },
              {
                "type": "paragraph",
                "text": "Données personnelles collectées : différents types de Données indiquées dans la politique de confidentialité du service."
              },
              {
                "type": "linked-paragraph",
                "parts": [{ "text": "Lieu de traitement : États-Unis - " }, { "text": "Politique de confidentialité", "href": "https://www.engineyard.com/policies/privacy/" }, { "text": "." }]
              },
              {
                "type": "subheading",
                "text": "Firebase Cloud Functions (Google Inc.)"
              },
              {
                "type": "paragraph",
                "text": "Firebase Cloud Functions est un service d’hébergement et de backend fourni par Google Inc."
              },
              {
                "type": "paragraph",
                "text": "Données personnelles collectées : différents types de Données indiquées dans la politique de confidentialité du service et Données d'utilisation."
              },
              {
                "type": "linked-paragraph",
                "parts": [{ "text": "Lieu de traitement : États-Unis - " }, { "text": "Politique de confidentialité", "href": "https://www.google.com/intl/en/privacy/" }, { "text": "." }]
              },
              {
                "type": "subheading",
                "text": "Firebase Cloud Storage (Google Inc.)"
              },
              {
                "type": "paragraph",
                "text": "Firebase Cloud Storage est un service d’hébergement fourni par Google Inc."
              },
              {
                "type": "paragraph",
                "text": "Données personnelles collectées : différents types de Données indiquées dans la politique de confidentialité du service et Données d'utilisation."
              },
              {
                "type": "linked-paragraph",
                "parts": [{ "text": "Lieu de traitement : États-Unis - " }, { "text": "Politique de confidentialité", "href": "https://www.google.com/intl/fr/policies/privacy/" }, { "text": "." }]
              },
              {
                "type": "subheading",
                "text": "Firebase Realtime Database (Google Inc.)"
              },
              {
                "type": "paragraph",
                "text": "Firebase Realtime Database est un service d’hébergement et de backend fourni par Google Inc."
              },
              {
                "type": "paragraph",
                "text": "Données personnelles collectées : différents types de Données indiquées dans la politique de confidentialité du service et Données d'utilisation."
              },
              {
                "type": "linked-paragraph",
                "parts": [{ "text": "Lieu de traitement : États-Unis - " }, { "text": "Politique de confidentialité", "href": "https://www.google.com/intl/fr/policies/privacy/" }, { "text": "." }]
              }
            ]
          },
          {
            "title": "Inscription et authentification",
            "blocks": [
              {
                "type": "paragraph",
                "text": "L’inscription ou l’authentification de l’Utilisateur autorise Trip n'touch à l’identifier et lui donne accès à des services dédiés. Selon la description ci-après, les tiers peuvent fournir des services d’inscription et d’authentification. En ce cas, Trip n'touch pourra accéder à des Données stockées par ces tiers à des fins d’inscription ou d’identification."
              },
              {
                "type": "subheading",
                "text": "Inscription directe (Trip n'touch)"
              },
              {
                "type": "paragraph",
                "text": "L’Utilisateur s’inscrit en remplissant le formulaire d’inscription et en fournissant ses Données personnelles directement à Trip n'touch."
              },
              {
                "type": "paragraph",
                "text": "Données personnelles collectées : adresse électronique, nom de famille et prénom."
              }
            ]
          },
          {
            "title": "Interaction avec des plate-formes de sondage en ligne",
            "blocks": [
              {
                "type": "paragraph",
                "text": "Ces types de services permettent aux Utilisateurs d'interagir avec des plate-formes de sondage en ligne directement à partir des pages de Trip n'touch. Si l'un de ces services est installé, il peut collecter des données sur la navigation et des Données d'Utilisation sur les pages sur lesquelles il est installé, même si les Utilisateurs n'utilisent pas activement ce service."
              },
              {
                "type": "subheading",
                "text": "SurveyMonkey Widget (SurveyMonkey Inc.)"
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
                "parts": [{ "text": "Lieu de traitement : États-Unis - " }, { "text": "Politique de confidentialité", "href": "https://www.surveymonkey.com/mp/policy/privacy-policy/" }, { "text": "." }]
              }
            ]
          },
          {
            "title": "Interactions basées sur la localisation",
            "blocks": [
              {
                "type": "subheading",
                "text": "Géolocalisation (Trip n'touch)"
              },
              {
                "type": "paragraph",
                "text": "Trip n'touch peut collecter, utiliser et partager les Données de localisation de l’Utilisateur aux fins de fournir des services basés sur la localisation. La plupart des navigateurs et dispositifs fournissent des outils permettant de se retirer de cette fonction par défaut. Si une autorisation explicite a été accordée, les données de localisation de l’Utilisateur peuvent être suivies par Trip n'touch."
              },
              {
                "type": "paragraph",
                "text": "Données personnelles collectées : position géographique."
              },
              {
                "type": "subheading",
                "text": "Géolocalisation non continue (Trip n'touch)"
              },
              {
                "type": "paragraph",
                "text": "Trip n'touch peut collecter, utiliser et partager les Données de localisation de l’Utilisateur aux fins de fournir des services basés sur la localisation. La plupart des navigateurs et dispositifs fournissent des outils permettant de se retirer de cette fonction par défaut. Si une autorisation explicite a été accordée, les données de localisation de l’Utilisateur peuvent être suivies par Trip n'touch. La localisation géographique de l’Utilisateur est déterminée de façon non continue, soit à la demande spécifique de l’Utilisateur ou lorsque l’Utilisateur n’indique pas sa localisation actuelle dans le champ consacré et autorise l’application à automatiquement détecter sa position."
              },
              {
                "type": "paragraph",
                "text": "Données personnelles collectées : position géographique."
              }
            ]
          },
          {
            "title": "Protection anti-SPAM",
            "blocks": [
              {
                "type": "paragraph",
                "text": "Ces types de services analysent le trafic de Trip n'touch, contenant potentiellement les Données Personnelles de l'Utilisateur, aux fins de filtrer les messages et les contenus qui sont reconnus comme SPAM."
              },
              {
                "type": "subheading",
                "text": "Google reCAPTCHA (Google Inc.)"
              },
              {
                "type": "linked-paragraph",
                "parts": [{ "text": "Google reCAPTCHA est un service de protection anti-spam offert par Google Inc. L'utilisation de reCAPTCHA est soumise à la " }, { "text": "politique de confidentialité", "href": "https://www.google.com/intl/fr/policies/privacy/" }, { "text": " et aux " }, { "text": "conditions d'utilisations", "href": "https://www.google.com/intl/fr/policies/terms/" }, { "text": " de Google." }]
              },
              {
                "type": "paragraph",
                "text": "Données personnelles collectées : Cookies et Données d'utilisation."
              },
              {
                "type": "linked-paragraph",
                "parts": [{ "text": "Lieu de traitement : États-Unis - " }, { "text": "Politique de confidentialité", "href": "https://www.google.com/intl/fr/policies/privacy/" }, { "text": "." }]
              }
            ]
          },
          {
            "title": "Surveillance de Trip n'touch",
            "blocks": [
              {
                "type": "paragraph",
                "text": "Ces types de services permettent à Trip n'touch de surveiller l'utilisation et le comportement de ses composants de manière à ce que sa performance, son exploitation, sa maintenance et son dépannage soient améliorés. La question de savoir quelles Données Personnelles seront traitées dépend des caractéristiques et du mode de mise en œuvre de ces services, dont la fonction est de filtrer les activités de Trip n'touch."
              },
              {
                "type": "subheading",
                "text": "Crashlytics (Google Inc.)"
              },
              {
                "type": "paragraph",
                "text": "Crashlytics est un service de surveillance des applications offert par Google Inc."
              },
              {
                "type": "paragraph",
                "text": "Données personnelles collectées : différents types de Données indiquées dans la politique de confidentialité du service, identification unique du dispositif pour la publicité (identifiant publicitaire Google ou IDFA, par exemple) et position géographique."
              },
              {
                "type": "linked-paragraph",
                "parts": [{ "text": "Lieu de traitement : États-Unis - " }, { "text": "Politique de confidentialité", "href": "https://try.crashlytics.com/terms/privacy-policy.pdf" }, { "text": "." }]
              },
              {
                "type": "subheading",
                "text": "New Relic (New Relic)"
              },
              {
                "type": "paragraph",
                "text": "New Relic est un service de surveillance des applications offert par New Relic Inc. La façon dont New Relic est intégré signifie qu'il filtre l'ensemble du trafic de Trip n'touch, p. ex. la communication entre Trip n'touch et le navigateur ou le dispositif de l'Utilisateur tout en permettant aussi que les données analytiques de Trip n'touch soient collectées."
              },
              {
                "type": "paragraph",
                "text": "Données personnelles collectées : différents types de Données indiquées dans la politique de confidentialité du service."
              },
              {
                "type": "linked-paragraph",
                "parts": [{ "text": "Lieu de traitement : États-Unis - " }, { "text": "Politique de confidentialité", "href": "https://newrelic.com/privacy" }, { "text": "." }]
              }
            ]
          },
          {
            "title": "Échanges avec les réseaux sociaux et les plateformes externes",
            "blocks": [
              {
                "type": "paragraph",
                "text": "Ce type de services permet les échanges avec les réseaux sociaux ou d’autres plateformes externes directement à partir des pages de Trip n'touch. Les échanges et informations obtenus par Trip n'touch sont toujours régis par les paramètres de confidentialité définis par l’Utilisateur pour chaque réseau social. Si un tel service est installé, il peut toujours collecter les données relatives au trafic des pages, même si l’Utilisateur ne l’utilise pas."
              },
              {
                "type": "subheading",
                "text": "Bouton J’aime et widgets sociaux de Facebook (Facebook, Inc.)"
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
                "parts": [{ "text": "Lieu de traitement : États-Unis - " }, { "text": "Politique de confidentialité", "href": "https://www.facebook.com/privacy/explanation" }, { "text": "." }]
              }
            ]
          }
        ]
      },
      {
        "heading": "Autres informations sur les Données personnelles",
        "level": 2,
        "blocks": [],
        "accordionItems": [
          {
            "title": "Notifications push",
            "blocks": [
              {
                "type": "paragraph",
                "text": "Trip n'touch peut envoyer des notifications push à l'Utilisateur."
              }
            ]
          },
          {
            "title": "Participation au bouclier de protection des données : transferts de données de l’Union européenne vers les États-Unis",
            "blocks": [
              {
                "type": "paragraph",
                "text": "Le Propriétaire participe et se conforme au cadre instauré par le bouclier de protection des données entre l’UE et les États-Unis (Privacy Shield), comme indiqué par le ministère américain du Commerce, pour ce qui concerne la collecte, l’utilisation et la conservation des Données personnelles transférées de l’Union européenne vers les États-Unis. Le Propriétaire a déclaré au ministère américain du Commerce qu’il respecte les principes du bouclier de protection des données."
              },
              {
                "type": "linked-paragraph",
                "parts": [{ "text": "En cas de divergence entre les conditions de la présente politique de confidentialité et les principes du bouclier de protection des données, les principes de ce dernier prévalent. Pour obtenir plus d’informations sur le programme du bouclier de protection des données et afficher la certification du Propriétaire, veuillez consulter le site " }, { "text": "https://www.privacyshield.gov/", "href": "https://www.privacyshield.gov/" }, { "text": " (ou trouver le lien direct vers la liste de certifications des participants au bouclier de protection des données tenue par le ministère américain du Commerce " }, { "text": "https://www.privacyshield.gov/list", "href": "https://www.privacyshield.gov/list" }, { "text": ")." }]
              },
              {
                "type": "paragraph",
                "text": "Quelles sont les conséquences pour les Utilisateurs européens ?"
              },
              {
                "type": "paragraph",
                "text": "Le Propriétaire est responsable de l’ensemble du traitement des Données personnelles qu’il reçoit des personnes de l’Union européenne dans le cadre du bouclier de protection des données, et s’engage à soumettre les Données personnelles traitées aux principes du bouclier de protection des données."
              },
              {
                "type": "paragraph",
                "text": "Celui-ci comprend surtout le droit des personnes d’avoir accès à leurs données personnelles traitées par le Propriétaire."
              },
              {
                "type": "paragraph",
                "text": "Le Propriétaire se conforme également aux principes du bouclier de protection des données pour tous les transferts ultérieurs de Données personnelles depuis l’UE, autrement dit, il reste responsable en cas de transferts ultérieurs à des tiers."
              },
              {
                "type": "paragraph",
                "text": "En ce qui concerne les Données personnelles reçues ou transférées conformément au cadre du bouclier de protection des données, le Propriétaire est soumis aux pouvoirs d’enquête et d’application de la règlementation de la FTC (Commission fédérale américaine du commerce), en l’absence de stipulation contraire dans la présente politique de confidentialité."
              },
              {
                "type": "paragraph",
                "text": "Le Propriétaire est, en outre, tenu de divulguer les Données personnelles pour répondre aux demandes faites en vertu de la législation par les autorités publiques, notamment pour satisfaire aux exigences en matière de sécurité nationale ou de respect des lois."
              },
              {
                "type": "paragraph",
                "text": "Règlement des différends dans le cadre du bouclier de protection des données"
              },
              {
                "type": "paragraph",
                "text": "Conformément aux principes du bouclier de protection des données, le Propriétaire s’engage à résoudre les plaintes concernant la collecte ou l’utilisation des Données personnelles des Utilisateurs. Les personnes de l’Union européenne qui déposent des demandes ou des plaintes concernant la politique du bouclier de protection des données doivent en premier lieu contacter le Propriétaire aux coordonnées communiquées au début de ce document se référant à « Privacy Shield » et attendre que leur plainte soit traitée dans les 45 jours."
              },
              {
                "type": "paragraph",
                "text": "En cas de non présentation d’une réponse satisfaisante ou en temps opportun par le Propriétaire, l’Utilisateur a la possibilité d’associer un organe de règlement des différends indépendant, sans frais."
              },
              {
                "type": "paragraph",
                "text": "À cet égard, le Propriétaire a accepté de coopérer avec le comité mis en place par les autorités européennes chargées de la protection de données, et de se conformer à l’avis donné par le comité en ce qui concerne les données transférées depuis l’UE. L’Utilisateur peut donc contacter le Propriétaire à l’adresse électronique indiquée au début de ce document afin d’être orienté vers les contacts concernés de ces autorités."
              },
              {
                "type": "linked-paragraph",
                "parts": [{ "text": "Sous certaines conditions - disponibles pour l’Utilisateur dans leur intégralité sur le site du Privacy Shield (" }, { "text": "https://www.privacyshield.gov/article?id=How-to-Submit-a-Complaint", "href": "https://www.privacyshield.gov/article?id=How-to-Submit-a-Complaint" }, { "text": ") - l’Utilisateur peut invoquer un arbitrage contraignant lorsque les autres procédures de règlement des différends ont été épuisées." }]
              }
            ]
          },
          {
            "title": "Vendre des biens et services en ligne",
            "blocks": [
              {
                "type": "paragraph",
                "text": "Trip n'touch peut envoyer des notifications push à l'Utilisateur."
              }
            ]
          },
          {
            "title": "Le Service ne s’adresse pas aux enfants de moins de 13 ans.",
            "blocks": [
              {
                "type": "paragraph",
                "text": "Les Utilisateurs déclarent être majeurs en vertu de leur législation applicable. Les mineurs ne peuvent utiliser Trip n'touch qu’avec l’assistance d’un parent ou d’un gardien. Les personnes de moins de 13 ans ne peuvent en aucun cas utiliser Trip n'touch."
              }
            ]
          }
        ]
      },
      {
        "heading": "Droits des Utilisateurs",
        "level": 2,
        "blocks": [
          {
            "type": "paragraph",
            "text": "Les Utilisateurs peuvent exercer certains droits concernant leurs Données traitées par le Propriétaire."
          },
          {
            "type": "paragraph",
            "text": "En particulier, les Utilisateurs ont le droit de faire ce qui suit :"
          },
          {
            "type": "bullets",
            "items": [
              "Retirer leur consentement à tout moment. Les Utilisateurs ont le droit de retirer leur consentement s'ils ont déjà donné leur consentement au traitement de leurs Données personnelles.",
              "S'opposer au traitement de leurs Données. Les Utilisateurs ont le droit de s'opposer au traitement de leurs Données si le traitement est effectué sur une base juridique autre que le consentement. Des précisions sont ajoutées dans la section correspondante ci-dessous.",
              "Accéder à leurs Données. Les Utilisateurs ont le droit de savoir si les Données sont traitées par le Propriétaire, d'obtenir des informations sur certains aspects du traitement et d'obtenir une copie des Données en cours de traitement.",
              "Vérifier et obtenir une rectification. Les Utilisateurs ont le droit de vérifier l'exactitude de leurs Données et de demander qu'elles soient mises à jour ou corrigées.",
              "Limiter le traitement de leurs Données. Les Utilisateurs ont le droit, sous certaines conditions, de limiter le traitement de leurs Données. Dans ce cas, le Propriétaire traitera leurs Données uniquement pour les stocker.",
              "Faire supprimer ou effacer leurs Données personnelles. Les Utilisateurs ont le droit, sous certaines conditions, d'obtenir l'effacement de leurs Données auprès du Propriétaire.",
              "Récupérer leurs Données et les transférer à un autre responsable du traitement. Les Utilisateurs ont le droit de récupérer leurs Données dans un format structuré, couramment utilisé et lisible par machine et, si cela est techniquement possible, de les transmettre à un autre responsable du traitement sans obstacle d'aucune sorte. Cette disposition s’applique, sous réserve que les Données soient traitées par des moyens automatisés et que le traitement repose sur le consentement de l'Utilisateur, sur un contrat auquel l'Utilisateur est partie ou sur des obligations précontractuelles.",
              "Déposer plainte. Les Utilisateurs ont le droit de déposer une plainte auprès de leur autorité compétente en matière de protection des données."
            ]
          }
        ]
      },
      {
        "heading": "Informations concernant le droit d'opposition au traitement",
        "level": 3,
        "blocks": [
          {
            "type": "paragraph",
            "text": "Lorsque les Données personnelles sont traitées dans l'intérêt public, dans l'exercice d'une autorité officielle dévolue au Propriétaire ou aux fins des intérêts légitimes poursuivis par celui-ci, les Utilisateurs peuvent s'opposer à ce traitement en fournissant un motif lié à leur situation particulière devant justifier cette opposition."
          },
          {
            "type": "paragraph",
            "text": "Les Utilisateurs doivent cependant savoir que si leurs Données personnelles sont traitées à des fins de marketing direct, ils peuvent s'opposer à ce traitement à tout moment sans aucune justification. Pour savoir si le Propriétaire traite des Données personnelles à des fins de marketing direct, les Utilisateurs peuvent se reporter aux sections correspondantes du présent document."
          }
        ]
      },
      {
        "heading": "Comment exercer ces droits",
        "level": 3,
        "blocks": [
          {
            "type": "paragraph",
            "text": "Toute demande d'exercice des droits de l'Utilisateur peut être adressée au Propriétaire grâce aux coordonnées fournies dans le présent document. Ces demandes peuvent être exercées gratuitement et seront étudiées par le Propriétaire le plus tôt possible et toujours dans un délai d'un mois."
          }
        ]
      },
      {
        "heading": "Politique relative aux Cookies",
        "level": 2,
        "blocks": [
          {
            "type": "linked-paragraph",
            "parts": [{ "text": "Trip n'touch utilise des Cookies. Pour en savoir plus et obtenir une explication détaillée sur les cookies, l'Utilisateur peut consulter la " }, { "text": "Politique relative aux Cookies", "href": "/fr/politique-de-confidentialite/trip-n-touch/cookies" }, { "text": " ." }]
          }
        ]
      },
      {
        "heading": "Informations supplémentaires sur le traitement et la collecte des Données",
        "level": 2,
        "blocks": []
      },
      {
        "heading": "Action en justice",
        "level": 3,
        "blocks": [
          {
            "type": "paragraph",
            "text": "Les Données personnelles de l’Utilisateur peuvent être utilisées à des fins juridiques par le Propriétaire devant les tribunaux ou dans les étapes pouvant conduire à une action en justice résultant d’une utilisation inappropriée de Trip n'touch ou des Services connexes. L’Utilisateur est conscient du fait que le Propriétaire peut être amené à révéler des Données personnelles à la demande des autorités publiques."
          }
        ]
      },
      {
        "heading": "Informations supplémentaires concernant les Données personnelles de l’Utilisateur",
        "level": 3,
        "blocks": [
          {
            "type": "paragraph",
            "text": "Outre les informations contenues dans la présente politique de confidentialité, Trip n'touch peut fournir à l’Utilisateur des renseignements complémentaires et des informations contextuelles concernant des services particuliers ou la collecte et le traitement des Données personnelles."
          }
        ]
      },
      {
        "heading": "Journaux système et maintenance",
        "level": 3,
        "blocks": [
          {
            "type": "paragraph",
            "text": "À des fins d'exploitation et de maintenance, Trip n'touch et tout service tiers peuvent collecter des fichiers qui enregistrent les interactions avec Trip n'touch (journaux système) ou utiliser à cette fin d'autres Données personnelles (telles que l'adresse IP)."
          }
        ]
      },
      {
        "heading": "Informations non incluses dans la présente politique",
        "level": 3,
        "blocks": [
          {
            "type": "paragraph",
            "text": "De plus amples renseignements concernant la collecte ou le traitement des Données personnelles peuvent à tout moment être demandés au Propriétaire. Veuillez consulter les coordonnées figurant au début du présent document."
          }
        ]
      },
      {
        "heading": "Comment les demandes « Ne pas pister » sont traitées",
        "level": 3,
        "blocks": [
          {
            "type": "paragraph",
            "text": "Trip n'touch ne prend pas en charge les demandes « Ne pas pister ». Référez-vous à la politique de confidentialité des services tiers pour déterminer s’ils acceptent ou non aux demandes « Ne pas pister »."
          }
        ]
      },
      {
        "heading": "Modifications de la présente politique de confidentialité",
        "level": 3,
        "blocks": [
          {
            "type": "paragraph",
            "text": "Le Propriétaire se réserve le droit d'apporter des modifications à la présente politique de confidentialité, à tout moment, en informant ses Utilisateurs sur cette page et éventuellement dans Trip n'touch ou – pour autant que cela soit techniquement et légalement possible – en envoyant une notification aux Utilisateurs par l'intermédiaire des coordonnées disponibles pour le Propriétaire. Il est fortement recommandé de consulter cette page fréquemment, en se référant à la date de la dernière modification indiquée en bas. Si un Utilisateur s’oppose à une quelconque modification apportée à la présente Politique, il doit cesser d’utiliser Trip n'touch et peut demander au Propriétaire de supprimer ses Données personnelles. Sauf mention contraire, la politique de confidentialité alors en vigueur s’applique à toutes les Données personnelles que le Propriétaire détient sur les Utilisateurs."
          }
        ],
        "accordionItems": [
          {
            "title": "Définitions et références légales",
            "blocks": [
              {
                "type": "subheading",
                "text": "Données personnelles (ou Données)"
              },
              {
                "type": "paragraph",
                "text": "Toute information qui, directement, indirectement ou en relation avec d'autres informations – y compris un numéro d'identification personnel – permet l'identification ou l'identifiabilité d'une personne physique."
              },
              {
                "type": "subheading",
                "text": "Données d’utilisation"
              },
              {
                "type": "paragraph",
                "text": "Les informations collectées automatiquement par Trip n'touch (ou par des services tiers employés par Trip n'touch), qui peuvent inclure les adresses IP ou les noms de domaines des ordinateurs utilisés par les Utilisateurs qui utilisent Trip n'touch, les adresses URI (Uniform Resource Identifier ou identifiant uniforme de ressource), l’heure de la demande, la méthode utilisée pour soumettre la demande au serveur, la taille du fichier reçu en réponse, le code numérique indiquant le statut de la réponse du serveur (résultat favorable, erreur, etc.), le pays d’origine, les caractéristiques du navigateur et du système d’exploitation utilisés par l’Utilisateur, les différents détails relatifs au temps par visite (p. ex. temps passé sur chaque page dans l’Application) et les détails relatifs au chemin suivi dans l’Application avec une référence spéciale à la séquence des pages visitées, et d’autres paramètres concernant le système d’exploitation ou l’environnement informatique de l’Utilisateur."
              },
              {
                "type": "subheading",
                "text": "Utilisateur"
              },
              {
                "type": "paragraph",
                "text": "La personne utilisant Trip n'touch qui, sauf indication contraire, correspond à la Personne concernée."
              },
              {
                "type": "subheading",
                "text": "Personne concernée"
              },
              {
                "type": "paragraph",
                "text": "La personne physique à laquelle les Données personnelles font référence."
              },
              {
                "type": "subheading",
                "text": "Sous-traitant (ou Responsable des données)"
              },
              {
                "type": "paragraph",
                "text": "La personne physique ou morale, l'autorité publique, l'institution ou tout autre organisme qui traite les Données personnelles pour le compte du Responsable du traitement, tel que décrit dans la présente politique de confidentialité."
              },
              {
                "type": "subheading",
                "text": "Responsable du traitement (ou Propriétaire)"
              },
              {
                "type": "paragraph",
                "text": "La personne physique ou morale, l’autorité publique, l'institution ou toute autre organisme qui, seul ou conjointement avec d’autres, détermine les finalités et les moyens du traitement de Données personnelles, y compris les mesures de sécurité concernant le fonctionnement et l'utilisation de Trip n'touch. Sauf mention contraire, le Responsable du traitement est le Propriétaire de Trip n'touch."
              },
              {
                "type": "subheading",
                "text": "Trip n'touch (ou cette Application)"
              },
              {
                "type": "paragraph",
                "text": "Les moyens par lesquels les Données personnelles de l'Utilisateur sont collectées."
              },
              {
                "type": "subheading",
                "text": "Service"
              },
              {
                "type": "paragraph",
                "text": "Le service fourni par Trip n'touch comme décrit dans les conditions s'y rapportant (le cas échéant) et sur ce site/cette application."
              },
              {
                "type": "subheading",
                "text": "Union européenne (ou UE)"
              },
              {
                "type": "paragraph",
                "text": "Sauf indication contraire, toutes les références faites dans le présent document à l'Union européenne incluent tous les États membres actuels de l'Union européenne et de l'Espace économique européen."
              },
              {
                "type": "subheading",
                "text": "Cookies"
              },
              {
                "type": "paragraph",
                "text": "Petite pièce de donnée stockée dans l’appareil de l’Utilisateur."
              },
              {
                "type": "subheading",
                "text": "Informations légales"
              },
              {
                "type": "paragraph",
                "text": "La présente politique de confidentialité a été préparée en exécution des dispositions de plusieurs législations, notamment de l'article 13/14 du règlement européen 2016/679 (règlement général sur la protection des données)."
              },
              {
                "type": "paragraph",
                "text": "Cette politique de confidentialité concerne uniquement Trip n'touch, sauf indication contraire dans le présent document."
              }
            ]
          }
        ]
      },
      {
        "heading": "Responsable du traitement",
        "level": 2,
        "blocks": [
          {
            "type": "paragraph",
            "text": "Travelworks Solution / PC Voyages: Délégué à la protection des données 368 Notre-Dame Ouest, 4ème étage Montréal (QC) H2Y 1T9 - Canada"
          },
          {
            "type": "linked-paragraph",
            "parts": [{ "text": "Plus information: " }, { "text": "travelworkssolution.com", "href": "https://travelworkssolution.com/" }, { "text": " " }, { "text": "pcvoyages.com/", "href": "https://pcvoyages.com/" }]
          },
          {
            "type": "paragraph",
            "text": "Adresse e-mail de contact du Propriétaire : info@travelworkssolution.com"
          }
        ]
      },
      {
        "heading": "Propriétaire des données",
        "level": 2,
        "blocks": [
          {
            "type": "paragraph",
            "text": "Le propriétaire des données est l'éditeur de cette application ou ce site internet"
          },
          {
            "type": "paragraph",
            "text": "Pour plus d'informations, contactez: info@travelworkssolution.com"
          },
          {
            "type": "linked-paragraph",
            "parts": [{ "text": "Pour demander un accès aux données personnelles: " }, { "text": "Contacter le délégué à la protection des données", "href": "https://travelworkssolution.com/" }]
          }
        ]
      }
    ]
  }
};

function getPolicyContent(locale: string): PolicyContent { return policyContentByLocale[locale] ?? policyContentByLocale.default; }
function getLocalizedPath(locale: string, suffix = ''): string { const parent = locale === 'fr' ? '/fr/politique-de-confidentialite' : locale === 'en-au' ? '/en-au/privacy-policy' : '/privacy-policy'; return `${parent}/trip-n-touch${suffix}`; }

function PolicyBlocks({ blocks }: { blocks: PolicyBlock[] }) {
  return blocks.map((block, index) => {
    if (block.type === 'paragraph') return <p key={`paragraph-${index}`} className="mb-4 leading-7 text-slate-700">{block.text}</p>;
    if (block.type === 'linked-paragraph') return <p key={`linked-paragraph-${index}`} className="mb-4 leading-7 text-slate-700">{block.parts.map((part, partIndex) => part.href ? <a key={`link-${partIndex}`} href={part.href} target="_blank" rel="noreferrer" className="text-brand-blue underline underline-offset-2">{part.text}</a> : <span key={`text-${partIndex}`}>{part.text}</span>)}</p>;
    if (block.type === 'bullets') return <ul key={`bullets-${index}`} className="mb-4 list-disc space-y-2 pl-5 text-slate-700">{block.items.map((item, itemIndex) => <li key={`item-${itemIndex}`}>{item}</li>)}</ul>;
    return <h4 key={`subheading-${index}`} className="mb-3 text-base font-bold text-brand-blue">{block.text}</h4>;
  });
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const content = getPolicyContent(locale);
  return { title: content.metadataTitle, description: content.metadataDescription, alternates: getAlternates({ en: getLocalizedPath('en'), 'en-au': getLocalizedPath('en-au'), fr: getLocalizedPath('fr') }, locale) };
}

export default async function TripDetailsPrivacyPolicyPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const content = getPolicyContent(locale);
  const t = await getTranslations('pages.privacy-policy-tripntouch');
  const homeHref = locale === 'en' ? '/' : `/${locale}`;
  const breadcrumbItems: BreadcrumbItem[] = [{ label: t('breadcrumb.privacy-policy-label'), href: t('breadcrumb.privacy-policy-link') }, { label: t('breadcrumb.privacy-policy-label2'), href: '#' }];
  return <main className="select-none"><section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8"><Breadcrumb items={breadcrumbItems} homeHref={homeHref} /><h1 className="mt-10 mb-6 text-3xl font-bold text-brand-blue uppercase">{content.title}</h1><div className="mb-8 flex items-center rounded-md border-2 border-gray-200 bg-gray-100 px-5 py-3 text-sm font-semibold text-slate-600"><PenLine className="h-6 w-6 text-brand-blue" aria-hidden="true" /><span className="ml-2 uppercase text-brand-blue">{content.lastUpdatedLabel}</span><span className="ml-2">{content.lastUpdatedDate}</span></div>{content.sections.map((section, sectionIndex) => <article key={`section-${sectionIndex}`} className="mb-10">{section.level === 2 ? <h2 className="mb-4 text-2xl font-bold text-brand-blue">{section.heading}</h2> : <h3 className="mb-3 text-xl font-bold text-brand-blue">{section.heading}</h3>}<PolicyBlocks blocks={section.blocks} />{section.accordionItems?.map((item, itemIndex) => <details key={`accordion-${itemIndex}`} className="group mb-3 rounded-md border-2 border-slate-200 bg-white shadow-sm transition-colors open:border-brand-blue open:bg-slate-50 last:mb-0"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-bold text-brand-blue marker:hidden hover:bg-slate-100 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-blue"><span>{item.title}</span><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm bg-brand-blue text-white" aria-hidden="true"><Plus className="h-5 w-5 group-open:hidden" /><Minus className="hidden h-5 w-5 group-open:block" /></span></summary><div className="border-t-2 border-slate-200 bg-white px-5 py-5"><PolicyBlocks blocks={item.blocks} /></div></details>)}</article>)}</section></main>;
}
