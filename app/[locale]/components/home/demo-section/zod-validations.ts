import { z } from 'zod';

export const demoRequestSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters.'),
  email: z.string().email('Please enter a valid email address.'),
  phone: z
    .string()
    .min(7, 'Phone number is too short.')
    .regex(/^[+\d\s\-().]+$/, 'Phone number contains invalid characters.'),
  agencyName: z.string().min(2, 'Agency name must be at least 2 characters.'),
  country: z.string().min(1, 'Please select a country.'),
});

export type DemoRequestFields = z.infer<typeof demoRequestSchema>;
export type DemoRequestErrors = Partial<Record<keyof DemoRequestFields, string>>;