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
  };
};

function isNonEmptyString(v: unknown): v is string {
  return typeof v === 'string' && v.trim().length > 0;
}

function isFrenchLocale(locale: string): boolean {
  return locale.toLowerCase().startsWith('fr');
}

function getDemoMessages(locale: string): DemoMessages {
  if (isFrenchLocale(locale)) {
    return {
      missingRequiredFields: 'Champs obligatoires manquants.',
      sendFailed: "Impossible d'envoyer la demande pour le moment.",
      serverError: 'Erreur serveur.',
      subjectPrefix: 'Nouvelle demande de demo',
      heading: 'Nouvelle demande de demo',
      labels: {
        form: 'Formulaire',
        language: 'Langue',
        name: 'Nom',
        email: 'Courriel',
        phone: 'Telephone',
        agency: 'Agence',
        country: 'Pays',
      },
    };
  }

  return {
    missingRequiredFields: 'Missing required fields.',
    sendFailed: 'Unable to send the request right now.',
    serverError: 'Server error.',
    subjectPrefix: 'New Demo Request',
    heading: 'New Demo Request',
    labels: {
      form: 'Form',
      language: 'Language',
      name: 'Name',
      email: 'Email',
      phone: 'Phone',
      agency: 'Agency',
      country: 'Country',
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

    const {
      fullName,
      email,
      phone,
      agencyName,
      country,
      formName,
    } = body ?? {};

    const safeFormName = isNonEmptyString(formName) ? formName : 'Footer Demo Request';

    if (
      !isNonEmptyString(fullName) ||
      !isNonEmptyString(email) ||
      !isNonEmptyString(phone) ||
      !isNonEmptyString(agencyName) ||
      !isNonEmptyString(country)
    ) {
      return NextResponse.json(
        { success: false, error: messages.missingRequiredFields },
        { status: 400 },
      );
    }

    const from = process.env.RESEND_FROM_EMAIL ?? 'Travelworks <noreply@travelworkssolution.com>';
    const toEnv = process.env.RESEND_TO_EMAIL ?? 'sales@travelworkssolution.com, mandreazza@pcvoyages.com';
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
      `,
    });

    const sendId = sendResult.data?.id;
    const sendError = sendResult.error;

    // Resend can report partial recipient issues while still accepting the send.
    // If we got an id, treat the request as successful so client redirect can proceed.
    if (sendId) {
      return NextResponse.json({ success: true, id: sendId });
    }

    if (sendError) {
      console.error('[demo API] Resend error:', sendError.message);
      return NextResponse.json({ success: false, error: messages.sendFailed }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Server error';
    const messages = getDemoMessages(localeForMessages);
    console.error('[demo API]', message);
    return NextResponse.json({ success: false, error: messages.serverError }, { status: 500 });
  }
}
