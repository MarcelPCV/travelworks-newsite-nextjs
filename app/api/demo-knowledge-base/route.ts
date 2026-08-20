import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

type DemoMessages = {
  missingRequiredFields: string;
  sendFailed: string;
  serverError: string;
  subjectPrefix: string;
  heading: string;
  labels: {
    form: string;
    language: string;
    name: string;
    email: string;
    phone: string;
    agency: string;
    country: string;
    pageUrl: string;
    paidPromotion: string;
  };
};

function isNonEmptyString(v: unknown): v is string {
  return typeof v === 'string' && v.trim().length > 0;
}

function isFrenchLocale(locale: string): boolean {
  return locale.toLowerCase().startsWith('fr');
}

function getThankYouPath(locale: string): string {
  const normalizedLocale = locale.toLowerCase();

  if (normalizedLocale.startsWith('fr')) {
    return '/fr/merci';
  }

  if (normalizedLocale === 'en-au') {
    return '/en-au/thank-you';
  }

  return '/thank-you';
}

function getDemoMessages(locale: string): DemoMessages {
  if (isFrenchLocale(locale)) {
    return {
      missingRequiredFields: 'Champs obligatoires manquants.',
      sendFailed: "Impossible d'envoyer la demande pour le moment.",
      serverError: 'Erreur serveur.',
      subjectPrefix: 'Nouvelle demande de demo base de connaissances - PcVoyages',
      heading: 'Nouvelle demande de demo base de connaissances - PcVoyages',
      labels: {
        form: 'Formulaire',
        language: 'Langue',
        name: 'Nom',
        email: 'Courriel',
        phone: 'Telephone',
        agency: 'Agence',
        country: 'Pays',
        pageUrl: 'URL',
        paidPromotion: 'Promu',
      },
    };
  }

  return {
    missingRequiredFields: 'Missing required fields.',
    sendFailed: 'Unable to send the request right now.',
    serverError: 'Server error.',
    subjectPrefix: 'New Knowledge Base Demo Request - TravelWorks',
    heading: 'New Knowledge Base Demo Request - TravelWorks',
    labels: {
      form: 'Form',
      language: 'Language',
      name: 'Name',
      email: 'Email',
      phone: 'Phone',
      agency: 'Agency',
      country: 'Country',
      pageUrl: 'URL',
      paidPromotion: 'Promoted',
    },
  };
}

export async function POST(request: Request) {
  let localeForMessages = 'en-us';

  try {
    const body = await request.json();

    const locale = isNonEmptyString(body?.locale) ? body.locale : 'en-us';
    localeForMessages = locale;
    const messages = getDemoMessages(locale);

    const { fullName, email, phone, agencyName, country, formName, pageUrl, paidPromotion } =
      body ?? {};

    const safeFormName = isNonEmptyString(formName)
      ? formName
      : isFrenchLocale(locale)
        ? 'Demande demo base de connaissances'
        : 'Knowledge Base Demo Request';

    if (
      !isNonEmptyString(fullName) ||
      !isNonEmptyString(email) ||
      !isNonEmptyString(phone) ||
      !isNonEmptyString(agencyName) ||
      !isNonEmptyString(country) ||
      !isNonEmptyString(pageUrl) ||
      !isNonEmptyString(paidPromotion)
    ) {
      return NextResponse.json(
        { success: false, error: messages.missingRequiredFields },
        { status: 400 },
      );
    }

    const from = process.env.RESEND_FROM_EMAIL ?? 'Travelworks <noreply@travelworkssolution.com>';
    const toEnv =
      process.env.RESEND_TO_EMAIL ?? 'sales@travelworkssolution.com, mandreazza@pcvoyages.com';
    const to = toEnv
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const countryName = (() => {
      try {
        const parts = String(locale).split('-');
        const bcp47 =
          parts.length === 1
            ? parts[0].toLowerCase()
            : `${parts[0].toLowerCase()}-${parts[1].toUpperCase()}`;
        return (
          new Intl.DisplayNames([bcp47], { type: 'region' }).of(String(country)) ?? String(country)
        );
      } catch {
        return String(country);
      }
    })();

    const sendResult = await resend.emails.send({
      from,
      to,
      subject: `${messages.subjectPrefix} - ${safeFormName}`,
      html: `
				<h2>${messages.heading}</h2>
				<p><strong>${messages.labels.form}:</strong> ${safeFormName}</p>
				<p><strong>${messages.labels.language}:</strong> ${String(locale)}</p>
				<p><strong>${messages.labels.name}:</strong> ${String(fullName)}</p>
				<p><strong>${messages.labels.email}:</strong> ${String(email)}</p>
				<p><strong>${messages.labels.phone}:</strong> ${String(phone)}</p>
				<p><strong>${messages.labels.agency}:</strong> ${String(agencyName)}</p>
				<p><strong>${messages.labels.country}:</strong> ${countryName}</p>
				<p><strong>${messages.labels.pageUrl}:</strong> ${String(pageUrl)}</p>
				<p><strong>${messages.labels.paidPromotion}:</strong> ${String(paidPromotion)}</p>
			`,
    });

    const sendId = sendResult.data?.id;
    const sendError = sendResult.error;

    if (sendId) {
      return NextResponse.json({ success: true, id: sendId, redirectTo: getThankYouPath(locale) });
    }

    if (sendError) {
      console.error('[demo-knowledge-base API] Resend error:', sendError.message);
      return NextResponse.json({ success: false, error: messages.sendFailed }, { status: 502 });
    }

    return NextResponse.json({ success: true, redirectTo: getThankYouPath(locale) });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Server error';
    const messages = getDemoMessages(localeForMessages);
    console.error('[demo-knowledge-base API]', message);
    return NextResponse.json({ success: false, error: messages.serverError }, { status: 500 });
  }
}
