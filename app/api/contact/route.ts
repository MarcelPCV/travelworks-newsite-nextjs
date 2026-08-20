import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

type ContactMessages = {
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
    topics: string;
    message: string;
    pageUrl: string;
    paidPromotion: string;
  };
};

function isNonEmptyString(v: unknown): v is string {
  return typeof v === 'string' && v.trim().length > 0;
}

function isStringArray(v: unknown): v is string[] {
  return Array.isArray(v) && v.every((item) => typeof item === 'string');
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

function getContactMessages(locale: string): ContactMessages {
  if (isFrenchLocale(locale)) {
    return {
      missingRequiredFields: 'Champs obligatoires manquants.',
      sendFailed: "Impossible d'envoyer la demande pour le moment.",
      serverError: 'Erreur serveur.',
      subjectPrefix: 'Nouveau message de contact - PcVoyages',
      heading: 'Nouveau message de contact - PcVoyages',
      labels: {
        form: 'Formulaire',
        language: 'Langue',
        name: 'Nom',
        email: 'Courriel',
        phone: 'Telephone',
        agency: 'Agence',
        country: 'Pays',
        topics: 'Sujets',
        message: 'Message',
        pageUrl: 'URL',
        paidPromotion: 'Promu',
      },
    };
  }

  return {
    missingRequiredFields: 'Missing required fields.',
    sendFailed: 'Unable to send the request right now.',
    serverError: 'Server error.',
    subjectPrefix: 'New Contact Message - TravelWorks',
    heading: 'New Contact Message - TravelWorks',
    labels: {
      form: 'Form',
      language: 'Language',
      name: 'Name',
      email: 'Email',
      phone: 'Phone',
      agency: 'Agency',
      country: 'Country',
      topics: 'Topics',
      message: 'Message',
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
    const messages = getContactMessages(locale);

    const {
      fullName,
      email,
      phone,
      agencyName,
      country,
      topics,
      message,
      formName,
      pageUrl,
      paidPromotion,
    } = body ?? {};

    const safeFormName = isNonEmptyString(formName) ? formName : 'Contact Form';

    if (
      !isNonEmptyString(fullName) ||
      !isNonEmptyString(email) ||
      !isNonEmptyString(phone) ||
      !isNonEmptyString(agencyName) ||
      !isNonEmptyString(country) ||
      !isNonEmptyString(message) ||
      !isStringArray(topics) ||
      !isNonEmptyString(pageUrl) ||
      !isNonEmptyString(paidPromotion) ||
      topics.length === 0 ||
      topics.some((topic) => topic.trim().length === 0)
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

    const topicsHtml = topics.map((topic) => `<li>${topic}</li>`).join('');

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
				<p><strong>${messages.labels.topics}:</strong></p>
				<ul>${topicsHtml}</ul>
				<p><strong>${messages.labels.message}:</strong></p>
				<p>${String(message)}</p>
				<p><strong>${messages.labels.pageUrl}:</strong> ${String(pageUrl)}</p>
				<p><strong>${messages.labels.paidPromotion}:</strong> ${String(paidPromotion)}</p>
			`,
    });

    const sendId = sendResult.data?.id;
    const sendError = sendResult.error;

    // Resend can report partial recipient issues while still accepting the send.
    // If we got an id, treat the request as successful.
    if (sendId) {
      return NextResponse.json({ success: true, id: sendId, redirectTo: getThankYouPath(locale) });
    }

    if (sendError) {
      console.error('[contact API] Resend error:', sendError.message);
      return NextResponse.json({ success: false, error: messages.sendFailed }, { status: 502 });
    }

    return NextResponse.json({ success: true, redirectTo: getThankYouPath(locale) });
  } catch (error) {
    const outputMessage = error instanceof Error ? error.message : 'Server error';
    const messages = getContactMessages(localeForMessages);
    console.error('[contact API]', outputMessage);
    return NextResponse.json({ success: false, error: messages.serverError }, { status: 500 });
  }
}
