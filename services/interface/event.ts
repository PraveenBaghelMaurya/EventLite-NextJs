export interface EventFilters {
  searchQuery?: string
  categoryType?: number | string
  timeRange?: string
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: "asc" | "desc"
}

export interface Pagination {
  currentPage: number
  totalPages: number
  totalEvents: number
  hasNextPage: boolean
  hasPrevPage: boolean
  limit: number
  sortBy: string
  sortOrder: "asc" | "desc"
}

export interface Category {
  id: number
  name: string
  description: string
  slug: string
  image: string
  createdAt: string
  updatedAt: string
}

export interface Organizer {
  id: number
  name: string
  email: string
}
export interface ticketStatistics {
  tickets: number
  bookings: number
}

export interface Event {
  id: number
  title: string
  description: string
  shortDescription: string
  venue: string
  street: string | null
  city: string
  state: string
  country: string
  postalCode: string | null
  startDate: string
  endDate: string
  doorTime: string | null
  image: string | null
  imageFileId: string | null
  images: string[]
  imagesFileIds: string[]
  price: number
  capacity: number
  availableTickets: number
  status: string
  isFeatured: boolean
  isPublic: boolean
  organizerId: number
  categoryId: number
  createdAt: string
  updatedAt: string
  publishedAt: string | null
  category : Category
  organizer : Organizer
  ticketStatistics : ticketStatistics
  _count : ticketStatistics
  pagination : Pagination
}

export interface singleEvent {
  id: number
  title: string
  description: string
  shortDescription: string
  venue: string
  street: string | null
  city: string
  state: string
  country: string
  postalCode: string | null
  startDate: string
  endDate: string
  doorTime: string | null
  image: string | null
  imageFileId: string | null
  images: string[]
  imagesFileIds: string[]
  price: number
  capacity: number
  availableTickets: number
  status: string
  isFeatured: boolean
  isPublic: boolean
  organizerId: number
  categoryId: number
  createdAt: string
  updatedAt: string
  publishedAt: string | null
  category : Category
  organizer : Organizer
}
export interface ApiEvent {
  success: boolean;
  message: string;
  data: Event[];
}

export interface ApiErrorResponse{
    message: string;
    status: number;
}

export interface EventById {
    success: boolean;
    message: string;
    data: singleEvent;
}

export interface getUpcomingEventsRequest{
  page: number;
  limit: number;
}

export interface getUpcomingEventsResponse{
  success: boolean;
  message: string;
  data: singleEvent[];
}
