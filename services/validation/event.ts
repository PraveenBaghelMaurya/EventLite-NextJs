import z from "zod"

export const eventSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  shortDescription: z.string().max(150, "Short description limit is 150 characters").min(10, "Short description needed"),
  venue: z.string().min(3, "Venue name required"),
  street: z.string().min(3, "Street address required"),
  city: z.string().min(2, "City required"),
  state: z.string().min(2, "State required"),
  country: z.string().min(2, "Country required"),
  postalCode: z.string().min(4, "Invalid postal code"),
  startDate: z.string().refine((val) => new Date(val) > new Date(), "Start date must be in the future"),
  endDate: z.string().refine((val) => val !== "", "End date is required"),
  doorTime: z.string().optional(),
  
  price: z.coerce.number().min(0, "Price cannot be negative"),
  capacity: z.coerce.number().min(1, "Capacity must be at least 1"),
  availableTickets: z.coerce.number().min(0),
  
  status: z.enum(["PUBLISHED", "DRAFT", "ARCHIVED"]),
  isFeatured: z.boolean().default(false),
  isPublic: z.boolean().default(true),
  
  categoryName: z.string().min(1, "Please select a category"),
  // Mock image field for preview (in real app, this would be a file upload)
  imageUrl: z.string().optional(), 
}).refine((data) => new Date(data.endDate) > new Date(data.startDate), {
  message: "End date must be after start date",
  path: ["endDate"],
});