import { z } from 'zod';

export const contactRequestSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters.'),
  email: z.string().email('Please enter a valid email address.'),
  phone: z
    .string()
    .min(7, 'Phone number is too short.')
    .regex(/^[+\d\s\-().]+$/, 'Phone number contains invalid characters.'),
  agencyName: z.string().min(2, 'Agency name must be at least 2 characters.'),
  country: z.string().min(1, 'Please select a country.'),
  topics: z.array(z.string()).min(1, 'Please select at least one topic.'),
  message: z.string().min(10, 'Message must be at least 10 characters.'),
});

export type ContactRequestFields = z.infer<typeof contactRequestSchema>;
export type ContactRequestErrors = Partial<Record<keyof ContactRequestFields, string>>;
