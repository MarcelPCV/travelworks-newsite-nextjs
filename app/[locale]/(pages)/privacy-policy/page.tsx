import { Metadata } from 'next';
import { Locale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { getAlternates } from '@/app/lib/SEO/getAlternates';
import TitleHero from '../../components/shared/title-hero/title-hero';
import { PenLine } from 'lucide-react';

type PolicySection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
};

type PolicyContent = {
  title: string;
  metadataTitle: string;
  metadataDescription: string;
  lastUpdatedLabel: string;
  lastUpdatedDate: string;
  introServicesLabel?: string;
  introContactLabel?: string;
  sections: PolicySection[];
};

const policyContentByLocale: Record<string, PolicyContent> = {
  fr: {
    title: 'Politique de confidentialite',
    metadataTitle: 'Politique de confidentialite - PcVoyages',
    metadataDescription:
      'Consultez la politique de confidentialite de PcVoyages pour comprendre comment nous collectons, utilisons, conservons et prote geons les renseignements personnels.',
    lastUpdatedLabel: 'Derniere mise a jour :',
    lastUpdatedDate: '30 mars 2026',
    introServicesLabel:
      'Cette politique s applique a tous les services fournis par PcVoyages, notamment :',
    introContactLabel:
      'Pour toute question au sujet de cette politique ou pour exercer vos droits, veuillez communiquer avec :',
    sections: [
      {
        heading: '1. Introduction',
        paragraphs: [
          'PcVoyages ("PcVoyages", "nous", "notre" ou "nos") s engage a proteger la confidentialite et la securite des renseignements personnels qui lui sont confies.',
          'La presente Politique de confidentialite explique comment nous recueillons, utilisons, communiquons, stockons, conservons et prote geons les renseignements personnels lorsque vous utilisez nos services.',
          'Selon le service que vous utilisez, nous pouvons recueillir differentes categories de renseignements personnels a des fins differentes. Cette politique explique quelles informations nous recueillons, pourquoi nous les recueillons, combien de temps nous les conservons, avec qui elles peuvent etre partagees et quels sont vos droits.',
          'PcVoyages ne recueille que les renseignements personnels raisonnablement necessaires pour fournir ses services, respecter ses obligations legales, ameliorer l experience utilisateur, maintenir la securite et exploiter ses activites.',
          'Nous nous engageons a traiter les renseignements personnels de maniere responsable et conformement :',
        ],
        bullets: [
          'Notre site web corporatif, y compris www.pcvoyages.com et tout site connexe, ou les visiteurs peuvent en apprendre davantage sur nos produits et services, nous contacter, demander une demonstration ou communiquer avec nous.',
          'La plateforme PcVoyages en mode logiciel-service (SaaS), qui permet aux agences de voyages et a d autres organisations autorisees de gerer leurs operations.',
          'a la Loi sur la protection des renseignements personnels dans le secteur prive (Loi 25) du Quebec ;',
          'aux lois canadiennes applicables en matiere de vie privee ;',
          'a toute autre loi applicable en matiere de protection des renseignements personnels la ou nos services sont offerts.',
          'En utilisant notre site web ou notre plateforme SaaS, vous reconnaissez avoir lu la presente Politique de confidentialite.',
        ],
      },
      {
        heading: '2. Personne responsable de la protection des renseignements personnels',
        paragraphs: [
          'Conformement a la Loi 25 du Quebec, PcVoyages a designe une personne responsable de la protection des renseignements personnels.',
          'Responsable de la protection des renseignements personnels : PcVoyages',
        ],
      },
      {
        heading: '3. Renseignements personnels que nous recueillons',
        paragraphs: [
          'Les categories de renseignements personnels que nous recueillons dependent des services que vous utilisez.',
        ],
        bullets: [
          'a) Informations que vous fournissez directement : prenom et nom, adresse courriel, nom de l entreprise, numero de telephone, identifiants de compte, informations de facturation, informations soumises via les formulaires de contact, informations saisies dans la plateforme SaaS et toute autre information que vous choisissez de fournir.',
          'b) Informations recueillies automatiquement : adresse IP, type et version du navigateur, informations sur l appareil, systeme d exploitation, pages visitees, date et heure des visites, statistiques d utilisation, informations de session, journaux de diagnostic et de securite, identifiants de temoins et technologies similaires.',
        ],
      },
      {
        heading: '4. Pourquoi nous recueillons des renseignements personnels',
        paragraphs: [
          'Nous recueillons et utilisons les renseignements personnels uniquement a des fins appropriees et necessaires, notamment pour :',
        ],
        bullets: [
          'fournir et maintenir notre site web et notre plateforme SaaS ;',
          'creer et gerer les comptes utilisateurs ;',
          'authentifier les utilisateurs ;',
          'fournir les services demandes ;',
          'offrir le soutien a la clientele ;',
          'traiter les demandes et les questions ;',
          'ameliorer nos produits et services ;',
          'analyser l utilisation du site web et de la plateforme ;',
          'maintenir la securite des systemes ;',
          'detecter la fraude ou les activites non autorisees ;',
          'respecter les obligations legales et reglementaires ;',
          'communiquer des mises a jour importantes concernant nos services.',
          'Nous n utiliserons pas les renseignements personnels a des fins incompatibles avec celles decrites dans cette politique sans obtenir le consentement lorsque requis par la loi.',
        ],
      },
      {
        heading: '5. Fournisseurs de services',
        paragraphs: [
          'Nous faisons appel a des fournisseurs de services tiers soigneusement selectionnes pour exploiter nos services.',
          'Ces fournisseurs peuvent traiter des renseignements personnels en notre nom uniquement dans la mesure necessaire a l execution de leurs services.',
          'Lorsque requis, nous nous assurons que ces fournisseurs sont lies par contrat pour proteger les renseignements personnels et les traiter uniquement selon nos instructions.',
        ],
        bullets: [
          'Microsoft Azure - hebergement et infrastructure pour la plateforme SaaS de PcVoyages',
          'Google Analytics - analyses du site web',
          'Fournisseurs de livraison de courriels',
          'Services de soutien a la clientele',
          'Services de securite et de surveillance',
        ],
      },
      {
        heading: '6. Consentement',
        paragraphs: [
          'Lorsque la loi l exige, nous obtenons votre consentement avant de recueillir, d utiliser ou de communiquer vos renseignements personnels.',
          'Selon les circonstances, le consentement peut etre exprès ou implicite, comme le permet la loi applicable.',
          'Vous pouvez retirer votre consentement en tout temps, sous reserve des restrictions legales ou contractuelles et d un preavis raisonnable.',
          'Le retrait du consentement n affecte pas les traitements deja effectues avant ce retrait.',
          'Veuillez noter que le retrait du consentement peut limiter notre capacite a fournir certains services.',
        ],
      },
      {
        heading: '7. Temoins et technologies similaires (site web)',
        paragraphs: ['Notre site web utilise des temoins et des technologies similaires afin de :'],
        bullets: [
          'assurer le bon fonctionnement du site web ;',
          'memoriser les preferences des utilisateurs ;',
          'ameliorer l experience utilisateur ;',
          'mesurer la performance du site web ;',
          'analyser le trafic du site web ;',
          'renforcer la securite du site web.',
          'Nous utilisons egalement des outils d analyse tels que Google Analytics pour mieux comprendre l utilisation de notre site web.',
          'Lorsque requis par la loi, une banniere de consentement aux temoins est presentee lors de votre premiere visite.',
          'Vous pouvez refuser ou desactiver les temoins non essentiels via les parametres de votre navigateur ou les preferences de temoins disponibles sur notre site web.',
        ],
      },
      {
        heading: '8. Utilisation des renseignements personnels dans la plateforme SaaS',
        paragraphs: [
          'La plateforme SaaS de PcVoyages permet a nos clients de gerer leurs operations.',
          'Lorsque les organisations clientes stockent des renseignements personnels dans la plateforme, PcVoyages traite generalement ces renseignements au nom de ses clients afin de fournir les services demandes.',
          'Nos clients demeurent responsables de s assurer qu ils disposent de l autorite necessaire pour recueillir et utiliser les renseignements personnels au sein de leur organisation.',
        ],
        bullets: [
          'fournir les fonctionnalites SaaS ;',
          'gerer les comptes utilisateurs et les permissions ;',
          'securiser la plateforme ;',
          'surveiller la performance ;',
          'diagnostiquer les problemes techniques ;',
          'ameliorer la fonctionnalite du produit.',
        ],
      },
      {
        heading: '9. Conservation des renseignements personnels',
        paragraphs: [
          'Nous conservons les renseignements personnels uniquement pendant la duree necessaire a la realisation des fins decrites dans cette politique ou au respect de nos obligations legales.',
          'Lorsque les renseignements personnels ne sont plus requis, ils sont supprimes, anonymises ou detruits de maniere securitaire conformement a nos pratiques de conservation.',
        ],
      },
      {
        heading: '10. Stockage et transferts internationaux de donnees',
        paragraphs: [
          'Les renseignements personnels peuvent etre traites ou stockes a l exterieur du Quebec ou du Canada.',
          'Certains de nos fournisseurs de services, y compris Google Analytics et des fournisseurs d hebergement infonuagique, peuvent traiter des renseignements dans d autres juridictions, y compris les Etats-Unis.',
          'Avant tout transfert de renseignements personnels hors Quebec lorsque requis, PcVoyages evalue les risques a la vie privee et met en place des garanties contractuelles, techniques et organisationnelles appropriees pour assurer un niveau de protection adequat, conformement a la Loi 25 du Quebec.',
        ],
      },
      {
        heading: '11. Vos droits en matiere de vie privee',
        paragraphs: ['Sous reserve de la loi applicable, vous avez le droit de :'],
        bullets: [
          'acceder a vos renseignements personnels ;',
          'demander la correction de renseignements inexacts ;',
          'demander la suppression de renseignements lorsque applicable ;',
          'retirer votre consentement lorsque le consentement est la base legale ;',
          'demander des informations sur le traitement de vos donnees ;',
          'demander la portabilite de vos renseignements personnels lorsque applicable ;',
          'soumettre une plainte liee a la vie privee.',
          'Nous pouvons demander une preuve d identite avant de repondre a votre demande.',
        ],
      },
      {
        heading: '12. Securite',
        paragraphs: [
          'Nous mettons en place des mesures administratives, techniques et physiques raisonnables visant a proteger les renseignements personnels contre l acces non autorise, la communication, la modification, l utilisation abusive ou la perte.',
          'Bien qu aucun systeme de securite ne puisse garantir une protection absolue, nous revoyons et ameliorons continuellement nos pratiques de securite.',
        ],
      },
      {
        heading: '13. Evaluations des facteurs relatifs a la vie privee',
        paragraphs: [
          'Lorsque requis par la Loi 25 du Quebec, PcVoyages realise des evaluations des facteurs relatifs a la vie privee avant la mise en oeuvre de projets impliquant des renseignements personnels ou le transfert de renseignements personnels a l exterieur du Quebec.',
        ],
      },
      {
        heading: '14. Enfants',
        paragraphs: [
          'Nos services sont destines aux utilisateurs d affaires et ne sont pas destines aux enfants de moins de 14 ans.',
          'Nous ne recueillons pas sciemment de renseignements personnels d enfants de moins de 14 ans sans le consentement requis par la loi applicable.',
        ],
      },
      {
        heading: '15. Prise de decision automatisee',
        paragraphs: [
          'PcVoyages ne prend pas de decisions fondees uniquement sur un traitement automatise produisant des effets juridiques ou des effets importants similaires sur les personnes.',
          'Si cette pratique change a l avenir, les personnes concernees en seront informees conformement a la loi applicable.',
        ],
      },
      {
        heading: '16. Modifications de la presente politique',
        paragraphs: [
          'Nous pouvons mettre a jour cette Politique de confidentialite de temps a autre afin de refleter les changements juridiques, operationnels ou technologiques.',
          'La version mise a jour sera publiee sur cette page avec une date de Derniere mise a jour revisee.',
          'Lorsque requis par la loi, nous fournirons un avis additionnel pour les modifications importantes.',
        ],
      },
      {
        heading: '17. Nous joindre',
        paragraphs: [
          'Si vous avez des questions concernant cette Politique de confidentialite ou nos pratiques en matiere de vie privee, veuillez communiquer avec notre responsable de la protection des renseignements personnels.',
        ],
      },
      {
        heading: '18. Plaintes',
        paragraphs: [
          'Si vous estimez que vos droits a la vie privee n ont pas ete respectes, veuillez d abord communiquer avec nous afin que nous puissions examiner vos preoccupations.',
          'Si vous demeurez insatisfait(e), vous pouvez deposer une plainte aupres de la Commission d acces a l information du Quebec (CAI).',
        ],
      },
    ],
  },
  default: {
    title: 'Privacy Policy',
    metadataTitle: 'Privacy Policy - TravelWorks',
    metadataDescription:
      'Read the TravelWorks Privacy Policy to understand how we collect, use, retain, and protect personal information.',
    lastUpdatedLabel: 'Last updated:',
    lastUpdatedDate: 'March 30, 2026',
    introServicesLabel: 'This Policy applies to all services provided by TravelWorks, including:',
    introContactLabel:
      'For any questions regarding this Privacy Policy or to exercise your privacy rights, please contact:',
    sections: [
      {
        heading: '1. Introduction',
        paragraphs: [
          'TravelWorks ("TravelWorks", "we", "us", or "our") is committed to protecting the privacy and security of the personal information entrusted to us.',
          'This Privacy Policy explains how we collect, use, disclose, store, retain, and protect personal information when you use our services.',
          'Depending on the service you use, we may collect different categories of personal information for different purposes. This Privacy Policy explains what information we collect, why we collect it, how long we keep it, with whom it may be shared, and the rights available to you regarding your personal information.',
          'TravelWorks collects only the personal information that is reasonably necessary to provide its services, fulfill legal obligations, improve user experience, maintain security, and operate its business.',
          'We are committed to handling personal information responsibly and in accordance with:',
        ],
        bullets: [
          'Our corporate website, including www.travelworkssolution.com and any related websites, where visitors can learn about our products and services, contact us, request demonstrations, or communicate with us.',
          'The TravelWorks Software as a Service (SaaS) platform, which enables travel agencies and other authorized organizations to manage their business operations.',
          "Quebec's Act respecting the protection of personal information in the private sector (Law 25);",
          'applicable Canadian privacy legislation; and',
          'any other applicable privacy laws where our services are offered.',
          'By using our website or our SaaS platform, you acknowledge that you have read this Privacy Policy.',
        ],
      },
      {
        heading: '2. Person Responsible for the Protection of Personal Information',
        paragraphs: [
          "In accordance with Quebec's Law 25, TravelWorks has designated a person responsible for the protection of personal information.",
          'Privacy Officer - TravelWorks',
        ],
      },
      {
        heading: '3. Personal Information We Collect',
        paragraphs: [
          'The categories of personal information we collect depend on the services you use.',
        ],
        bullets: [
          'a) Information you provide directly: first and last name, email address, company name, telephone number, account credentials, billing information, information submitted through contact forms, information entered into the TravelWorks SaaS platform, and any other information you choose to provide to us.',
          'b) Information collected automatically: IP address, browser type and version, device information, operating system, pages visited, date and time of visits, usage statistics, session information, diagnostic and security logs, and cookie identifiers and similar technologies.',
        ],
      },
      {
        heading: '4. Why We Collect Personal Information',
        paragraphs: [
          'We collect and use personal information only for purposes that are appropriate and necessary, including to:',
        ],
        bullets: [
          'provide and maintain our website and SaaS platform;',
          'create and manage user accounts;',
          'authenticate users;',
          'deliver requested services;',
          'provide customer support;',
          'process requests and inquiries;',
          'improve our products and services;',
          'analyze website and platform usage;',
          'maintain system security;',
          'detect fraud or unauthorized activity;',
          'meet legal and regulatory obligations;',
          'communicate important updates regarding our services.',
          'We will not use personal information for purposes that are incompatible with those described in this Policy without obtaining consent where required by law.',
        ],
      },
      {
        heading: '5. Service Providers',
        paragraphs: [
          'We rely on carefully selected third-party service providers to operate our services.',
          'These providers may process personal information on our behalf only as necessary to perform their services.',
          'Where required, we ensure these providers are contractually obligated to protect personal information and process it only according to our instructions.',
        ],
        bullets: [
          'Microsoft Azure - hosting and infrastructure for the TravelWorks SaaS platform',
          'Google Analytics - website analytics',
          'Email delivery providers',
          'Customer support services',
          'Security and monitoring services',
        ],
      },
      {
        heading: '6. Consent',
        paragraphs: [
          'Where required by law, we obtain your consent before collecting, using, or disclosing your personal information.',
          'Depending on the circumstances, consent may be express or implied, as permitted by applicable law.',
          'You may withdraw your consent at any time, subject to legal or contractual restrictions and reasonable notice.',
          'Withdrawal of consent will not affect processing already carried out before the withdrawal.',
          'Please note that withdrawing consent may limit our ability to provide certain services.',
        ],
      },
      {
        heading: '7. Cookies and Similar Technologies (Website)',
        paragraphs: ['Our website uses cookies and similar technologies to:'],
        bullets: [
          'ensure proper website functionality;',
          'remember user preferences;',
          'improve user experience;',
          'measure website performance;',
          'analyze website traffic;',
          'enhance website security.',
          'We also use analytics tools such as Google Analytics to better understand how visitors use our website.',
          'Where required by law, a cookie consent banner will be presented during your first visit.',
          'You may refuse or disable non-essential cookies through your browser settings or the cookie preferences available on our website.',
        ],
      },
      {
        heading: '8. Use of Personal Information in the SaaS Platform',
        paragraphs: [
          'The TravelWorks SaaS platform allows our customers to manage their business operations.',
          'When customer organizations store personal information within the platform, TravelWorks generally processes that information on behalf of its customers for the purpose of providing the requested services.',
          'Our customers remain responsible for ensuring they have the necessary authority to collect and use personal information within their own organizations.',
        ],
        bullets: [
          'provide SaaS functionality;',
          'manage user accounts and permissions;',
          'secure the platform;',
          'monitor performance;',
          'diagnose technical issues;',
          'improve product functionality.',
        ],
      },
      {
        heading: '9. Retention of Personal Information',
        paragraphs: [
          'We retain personal information only for as long as necessary to fulfill the purposes described in this Privacy Policy or to comply with legal obligations.',
          'When personal information is no longer required, it is securely deleted, anonymized, or destroyed in accordance with our retention practices.',
        ],
      },
      {
        heading: '10. Storage and International Data Transfers',
        paragraphs: [
          'Personal information may be processed or stored outside Quebec or Canada.',
          'Some of our service providers, including Google Analytics and cloud hosting providers, may process information in other jurisdictions, including the United States.',
          "Before transferring personal information outside Quebec where required, TravelWorks evaluates privacy risks and implements appropriate contractual, technical, and organizational safeguards to ensure an adequate level of protection, as required under Quebec's Law 25.",
        ],
      },
      {
        heading: '11. Your Privacy Rights',
        paragraphs: ['Subject to applicable law, you have the right to:'],
        bullets: [
          'access your personal information;',
          'request correction of inaccurate information;',
          'request deletion of information where applicable;',
          'withdraw consent where consent is the legal basis;',
          'request information regarding the processing of your data;',
          'request the portability of your personal information where applicable;',
          'submit a privacy-related complaint.',
          'We may request proof of identity before responding to your request.',
        ],
      },
      {
        heading: '12. Security',
        paragraphs: [
          'We implement reasonable administrative, technical, and physical safeguards designed to protect personal information against unauthorized access, disclosure, alteration, misuse, or loss.',
          'Although no security system can guarantee absolute protection, we continually review and improve our security practices.',
        ],
      },
      {
        heading: '13. Privacy Impact Assessments',
        paragraphs: [
          "Where required by Quebec's Law 25, TravelWorks conducts Privacy Impact Assessments (PIAs) before implementing projects involving personal information or transferring personal information outside Quebec.",
        ],
      },
      {
        heading: '14. Children',
        paragraphs: [
          'Our services are intended for business users and are not directed to children under the age of 14.',
          'We do not knowingly collect personal information from children under 14 without the consent required by applicable law.',
        ],
      },
      {
        heading: '15. Automated Decision-Making',
        paragraphs: [
          'TravelWorks does not make decisions based solely on automated processing that produce legal or similarly significant effects on individuals.',
          'Should this practice change in the future, affected individuals will be informed in accordance with applicable law.',
        ],
      },
      {
        heading: '16. Changes to this Privacy Policy',
        paragraphs: [
          'We may update this Privacy Policy from time to time to reflect legal, operational, or technological changes.',
          'The updated version will be published on this page together with a revised Last updated date.',
          'Where required by law, we will provide additional notice of significant changes.',
        ],
      },
      {
        heading: '17. Contact Us',
        paragraphs: [
          'If you have any questions about this Privacy Policy or our privacy practices, please contact our Privacy Officer.',
        ],
      },
      {
        heading: '18. Complaints',
        paragraphs: [
          'If you believe your privacy rights have not been respected, please contact us first so that we may investigate your concerns.',
          'If you remain dissatisfied, you may file a complaint with the Commission d acces a l information du Quebec (CAI).',
        ],
      },
    ],
  },
};

function getPolicyContent(locale: string): PolicyContent {
  return policyContentByLocale[locale] ?? policyContentByLocale.default;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const content = getPolicyContent(locale);

  return {
    title: content.metadataTitle,
    description: content.metadataDescription,
    alternates: getAlternates(
      {
        en: '/privacy-policy',
        'en-ca': '/en-ca/privacy-policy',
        'en-au': '/en-au/privacy-policy',
        fr: '/fr/politique-de-confidentialite',
      },
      locale,
    ),
  };
}

export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale: routeLocale } = await params;
  setRequestLocale(routeLocale);
  const content = getPolicyContent(routeLocale);

  return (
    <main>
      <TitleHero title={content.title} imageSrc="/images/pages/privacy-policy/privacy-policy.png" />

      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex items-center justify-baseline mb-8 text-sm font-semibold text-slate-600 bg-gray-100 rounded-md border-2 border-gray-200 px-5 py-3">
          <PenLine className="h-6 w-6 text-brand-blue" aria-hidden="true" />
          <span className="ml-2 text-brand-blue uppercase">{content.lastUpdatedLabel} </span>
          <span className="ml-2">{content.lastUpdatedDate}</span>
        </div>

        {content.introServicesLabel ? (
          <p className="mb-4 text-slate-700">{content.introServicesLabel}</p>
        ) : null}

        {content.sections.map((section) => (
          <article key={section.heading} className="mb-10">
            <h2 className="mb-4 text-2xl font-bold text-brand-blue">{section.heading}</h2>

            {section.paragraphs?.map((paragraph) => (
              <p key={paragraph} className="mb-4 leading-7 text-slate-700">
                {paragraph}
              </p>
            ))}

            {section.bullets && section.bullets.length > 0 ? (
              <ul className="mb-4 list-disc space-y-2 pl-5 text-slate-700">
                {section.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}

            {(section.heading.startsWith('2.') ||
              section.heading.startsWith('11.') ||
              section.heading.startsWith('17.')) && (
              <p className="text-slate-700">
                <a
                  className="font-semibold text-brand-blue hover:underline"
                  href="mailto:info@travelworkssolution.com"
                >
                  info@travelworkssolution.com
                </a>
              </p>
            )}
          </article>
        ))}
      </section>
    </main>
  );
}
