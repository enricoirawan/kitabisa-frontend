import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/png", "image/jpg", "image/jpeg"];

const today = new Date();

today.setHours(0, 0, 0, 0);
export const createCampaignSchema = z.object({
  headline: z.string().min(5, {
    message: "Headline harus menjelas gambaran singkat dari kampanye",
  }),
  description: z.string().min(10, {
    message: "Deskripsi harus menjelas gambaran singkat dari kampanye",
  }),
  targetFunding: z.number().min(100000, {
    message: "Target kampanye minimal Rp500.000",
  }),
  categoryId: z.string({ message: "Kategori wajib dipilih" }),
  dueTo: z.date().min(today, {
    message: "Tanggal berakhir kampanye minimal di hari ini",
  }),
  image: z
    .any()
    .refine((file) => file instanceof File, "File harus diunggah") // Pastikan input adalah File
    .refine((file) => file && ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: "Format harus PNG, JPG, atau JPEG",
    })
    .refine((file) => file && file.size <= MAX_FILE_SIZE, {
      message: "Ukuran maksimal 5MB",
    }),
});

export const editProfileSchema = z.object({
  username: z.string().min(5, {
    message: "Username minimal 5 karakter",
  }),
  email: z.string().min(5, {
    message: "Email minimal 5 karakter",
  }),
  image: z
    .any()
    .optional()
    .refine((file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: "Format harus PNG, JPG, atau JPEG",
    })
    .refine((file) => !file || file.size <= MAX_FILE_SIZE, {
      message: "Ukuran maksimal 5MB",
    }),
});
