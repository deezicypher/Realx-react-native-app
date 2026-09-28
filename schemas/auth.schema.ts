import { z } from 'zod';

export const signinSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),

  password: z
    .string()
    .min(1, 'Password is required'),
});

export const signupSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, 'Please enter your full name'),

    email: z
      .string()
      .trim()
      .email('Please enter a valid email address'),

    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain an uppercase letter')
      .regex(/[a-z]/, 'Password must contain a lowercase letter')
      .regex(/\d/, 'Password must contain a number')
      .regex(
        /[@$!%*?&]/,
        'Password must contain a special character',
      ),

    confirmPassword: z
      .string()
      .min(1, 'Please confirm your password'),

    termsAccepted: z
      .boolean()
      .refine((value) => value === true, {
        message: 'You must accept the Terms and Privacy Policy',
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type SigninForm = z.infer<typeof signinSchema>;
export type SignupForm = z.infer<typeof signupSchema>;