import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

function isNonEmptyString(v: unknown): v is string {
  return typeof v === 'string' && v.trim().length > 0;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      fullName,
      email,
      phone,
      agencyName,
      country,
      locale = 'en-us',
      formName = 'Demo Request Form',
    } = body ?? {};

    if (
      !isNonEmptyString(fullName) ||
      !isNonEmptyString(email) ||
      !isNonEmptyString(phone) ||
      !isNonEmptyString(agencyName) ||
      !isNonEmptyString(country)
    ) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 },
      );
    }

    const from = process.env.RESEND_FROM_EMAIL ?? 'Website <noreply@yourdomain.com>';
    const toEnv = process.env.RESEND_TO_EMAIL ?? 'sales@yourdomain.com';
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

    const { error: sendError } = await resend.emails.send({
      from,
      to,
      subject: `New Demo Request — ${String(formName)}`,
      html: `
        <h2>New Demo Request</h2>

        <p><strong>Form:</strong> ${String(formName)}</p>
        <p><strong>Language:</strong> ${String(locale)}</p>
        <p><strong>Name:</strong> ${String(fullName)}</p>
        <p><strong>Email:</strong> ${String(email)}</p>
        <p><strong>Phone:</strong> ${String(phone)}</p>
        <p><strong>Agency:</strong> ${String(agencyName)}</p>
        <p><strong>Country:</strong> ${countryName}</p>
      `,
    });

    if (sendError) {
      console.error('[demo API] Resend error:', sendError.message);
      return NextResponse.json({ success: false, error: sendError.message }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Server error';
    console.error('[demo API]', message);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
