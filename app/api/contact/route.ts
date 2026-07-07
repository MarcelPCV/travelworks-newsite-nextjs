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
      topics = [],
      message,
      locale = 'en-us',
      formName = 'Contact Form',
    } = body ?? {};

    if (
      !isNonEmptyString(fullName) ||
      !isNonEmptyString(email) ||
      !isNonEmptyString(phone) ||
      !isNonEmptyString(agencyName) ||
      !isNonEmptyString(country) ||
      !isNonEmptyString(message)
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

    const topicsList = Array.isArray(topics)
      ? topics
          .map((topic) => String(topic).trim())
          .filter(Boolean)
          .join(', ')
      : '';

    const { error: sendError } = await resend.emails.send({
      from,
      to,
      subject: `New Contact Request - ${String(formName)}`,
      html: `
        <h2>New Contact Request</h2>

        <p><strong>Form:</strong> ${String(formName)}</p>
        <p><strong>Language:</strong> ${String(locale)}</p>
        <p><strong>Name:</strong> ${String(fullName)}</p>
        <p><strong>Email:</strong> ${String(email)}</p>
        <p><strong>Phone:</strong> ${String(phone)}</p>
        <p><strong>Agency:</strong> ${String(agencyName)}</p>
        <p><strong>Country:</strong> ${String(country)}</p>
        <p><strong>Topics:</strong> ${topicsList || 'Not specified'}</p>
        <p><strong>Message:</strong></p>
        <p>${String(message).replace(/\n/g, '<br/>')}</p>
      `,
    });

    if (sendError) {
      console.error('[contact API] Resend error:', sendError.message);
      return NextResponse.json({ success: false, error: sendError.message }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Server error';
    console.error('[contact API]', message);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
