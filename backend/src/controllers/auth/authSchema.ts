import { z } from 'zod';

export const authSchema = z.object({
  name: z.string({ required_error: 'Name is required' }).min(2).max(100),
  email: z.string({ required_error: 'Email is required' }).email(),
  username: z.string({ required_error: 'Username is required' }).min(2).max(100),
  password: z.string({ required_error: 'Password is required' }).min(6).max(100),
  bio: z.string().max(160).optional(),
  profile: z.string().optional(),
  otp: z.number().optional(),
  otp_expiry: z.date().optional(),
  is_verified: z.boolean().optional(),
});

export const emailOTPSchema = authSchema.pick({
  email: true,
  otp: true,
});
