"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Calendar,
  MapPin,
  Ticket,
  Tag,
  Loader2,
  Image as ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { createEvent } from "@/services/api/event";
import { eventSchema } from "@/services/validation/event";
import { toast } from "react-toastify";

type EventFormValues = z.infer<typeof eventSchema>;

const CATEGORIES = [
  { label: "Health & Wellness", value: "health-and-wellness" },
  { label: "Science & Technology", value: "science-and-technology" },
  { label: "Business", value: "business" },
  { label: "Entertainment", value: "entertainment" },
  { label: "Education", value: "education" },
  { label: "Travel", value: "travel" },
];

const formatDate = (dateString: string) => {
  if (!dateString) return "Date";
  return new Date(dateString).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export default function CreateEventPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const defaultValues: Partial<EventFormValues> = {
    title: "",
    description: "",
    shortDescription: "",
    venue: "",
    street: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
    price: 0,
    capacity: 300,
    availableTickets: 300,
    status: "DRAFT",
    isFeatured: false,
    isPublic: true,
    categoryName: "",
    imageUrl:
      "https://ik.imagekit.io/praveenbaghelmaurya/EventLite/Event-Image/eventLite_logo.svg?updatedAt=1770990742773", // Default placeholder
  };

  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema) as any,
    defaultValues,
    mode: "onChange",
  });

  // Watch values for live preview
  const watchedValues = form.watch();

  async function onSubmit(data: any) {
    const values = data as EventFormValues;
    setIsSubmitting(true);
    console.log("Submitting Event Data:", data);

    try {
      const response = await createEvent(data);
      console.log("Event Created Successfully", response);
      if (response.success) {
        toast.success("Event created successfully");
        router.push("/organizer/dashboard");
      }
    } catch (error: any) {
      console.error("Failed to create event", error);
    }

    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    alert("Event Created Successfully (Simulated)");
    // router.push("/organizer/dashboard")
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Create New Event</h1>
        <p className="text-muted-foreground">
          Fill in the details to publish your event. Make it stand out!
        </p>
      </div>

      <Separator className="my-6" />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* LEFT COLUMN: FORM */}
        <div className="lg:col-span-8">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Section 1: Basic Info */}
            <div className="bg-card text-card-foreground space-y-6 rounded-xl border p-6 shadow-sm">
              <h2 className="flex items-center gap-2 text-xl font-semibold">
                <Tag className="text-primary h-5 w-5" /> Basic Information
              </h2>

              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Event Title</Label>
                  <Input
                    id="title"
                    placeholder="Ex: Holistic Healing & Meditation Camp 2025"
                    {...form.register("title")}
                    className={
                      form.formState.errors.title ? "border-red-500" : ""
                    }
                  />
                  {form.formState.errors.title && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.title.message}
                    </p>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="shortDescription">
                    Short Description (Summary)
                  </Label>
                  <Input
                    id="shortDescription"
                    placeholder="A catchy summary for the card view..."
                    {...form.register("shortDescription")}
                    className={
                      form.formState.errors.shortDescription
                        ? "border-red-500"
                        : ""
                    }
                  />
                  {form.formState.errors.shortDescription && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.shortDescription.message}
                    </p>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="description">Full Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Detailed information about the event..."
                    className={`min-h-[150px] ${form.formState.errors.description ? "border-red-500" : ""}`}
                    {...form.register("description")}
                  />
                  {form.formState.errors.description && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.description.message}
                    </p>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="categoryName">Category</Label>
                  <select
                    id="categoryName"
                    className="border-input placeholder:text-muted-foreground focus:ring-ring flex h-10 w-full rounded-md border bg-transparent px-3 py-2 text-sm focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                    {...form.register("categoryName")}
                  >
                    <option value="">Select Category</option>
                    {CATEGORIES.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                  {form.formState.errors.categoryName && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.categoryName.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Section 2: Date & Location */}
            <div className="bg-card text-card-foreground space-y-6 rounded-xl border p-6 shadow-sm">
              <h2 className="flex items-center gap-2 text-xl font-semibold">
                <Calendar className="text-primary h-5 w-5" /> Date & Location
              </h2>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                      id="startDate"
                      type="datetime-local"
                      {...form.register("startDate")}
                      className={
                        form.formState.errors.startDate ? "border-red-500" : ""
                      }
                    />
                    {form.formState.errors.startDate && (
                      <p className="text-sm text-red-500">
                        {form.formState.errors.startDate.message}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="endDate">End Date</Label>
                    <Input
                      id="endDate"
                      type="datetime-local"
                      {...form.register("endDate")}
                      className={
                        form.formState.errors.endDate ? "border-red-500" : ""
                      }
                    />
                    {form.formState.errors.endDate && (
                      <p className="text-sm text-red-500">
                        {form.formState.errors.endDate.message}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="doorTime">Door Time (Optional)</Label>
                    <Input
                      id="doorTime"
                      type="datetime-local"
                      {...form.register("doorTime")}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="venue">Venue Name</Label>
                    <Input
                      id="venue"
                      placeholder="e.g. Art of Living Centre"
                      {...form.register("venue")}
                      className={
                        form.formState.errors.venue ? "border-red-500" : ""
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="street">Street Address</Label>
                    <Input
                      id="street"
                      placeholder="Street name and number"
                      {...form.register("street")}
                      className={
                        form.formState.errors.street ? "border-red-500" : ""
                      }
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        placeholder="City"
                        {...form.register("city")}
                        className={
                          form.formState.errors.city ? "border-red-500" : ""
                        }
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="postalCode">Postal Code</Label>
                      <Input
                        id="postalCode"
                        placeholder="ZIP Code"
                        {...form.register("postalCode")}
                        className={
                          form.formState.errors.postalCode
                            ? "border-red-500"
                            : ""
                        }
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        placeholder="State"
                        {...form.register("state")}
                        className={
                          form.formState.errors.state ? "border-red-500" : ""
                        }
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="country">Country</Label>
                      <Input
                        id="country"
                        placeholder="Country"
                        {...form.register("country")}
                        className={
                          form.formState.errors.country ? "border-red-500" : ""
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: Tickets & Settings */}
            <div className="bg-card text-card-foreground space-y-6 rounded-xl border p-6 shadow-sm">
              <h2 className="flex items-center gap-2 text-xl font-semibold">
                <Ticket className="text-primary h-5 w-5" /> Tickets & Settings
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="price">Price (₹)</Label>
                    <Input
                      id="price"
                      type="number"
                      min="0"
                      step="0.01"
                      {...form.register("price")}
                      className={
                        form.formState.errors.price ? "border-red-500" : ""
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="capacity">Total Capacity</Label>
                    <Input
                      id="capacity"
                      type="number"
                      min="1"
                      {...form.register("capacity")}
                      className={
                        form.formState.errors.capacity ? "border-red-500" : ""
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="availableTickets">Available Tickets</Label>
                    <Input
                      id="availableTickets"
                      type="number"
                      min="0"
                      {...form.register("availableTickets")}
                      className={
                        form.formState.errors.availableTickets
                          ? "border-red-500"
                          : ""
                      }
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="status">Status</Label>
                    <select
                      id="status"
                      className="border-input placeholder:text-muted-foreground focus:ring-ring flex h-10 w-full rounded-md border bg-transparent px-3 py-2 text-sm focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                      {...form.register("status")}
                    >
                      <option value="DRAFT">Draft</option>
                      <option value="PUBLISHED">Published</option>
                      <option value="ARCHIVED">Archived</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-3 pt-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="isPublic"
                        className="text-primary focus:ring-primary h-4 w-4 rounded border-gray-300"
                        {...form.register("isPublic")}
                      />
                      <Label
                        htmlFor="isPublic"
                        className="cursor-pointer font-normal"
                      >
                        Public Event
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="isFeatured"
                        className="text-primary focus:ring-primary h-4 w-4 rounded border-gray-300"
                        {...form.register("isFeatured")}
                      />
                      <Label
                        htmlFor="isFeatured"
                        className="cursor-pointer font-normal"
                      >
                        Featured Event
                      </Label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                className="w-32"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-40 bg-sky-500 text-white hover:bg-sky-600"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>Create Event</>
                )}
              </Button>
            </div>
          </form>
        </div>

        {/* RIGHT COLUMN: PREVIEW */}
        <div className="hidden lg:col-span-4 lg:block">
          <div className="sticky top-8 space-y-4">
            <h3 className="text-muted-foreground flex items-center gap-2 text-lg font-semibold">
              <ImageIcon className="h-4 w-4" /> Live Preview
            </h3>

            {/* Card Preview Structure matching User Category Page */}
            <div className="group relative mx-auto h-full max-w-sm overflow-hidden rounded-xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
                <img
                  src={
                    watchedValues.imageUrl ||
                    "https://images.unsplash.com/photo-1544367563-12123d8c58da?q=80&w=2070&auto=format&fit=crop"
                  }
                  alt="Event Preview"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-2 right-2">
                  <Badge
                    variant="secondary"
                    className="bg-white/90 text-black backdrop-blur"
                  >
                    {Number(watchedValues.price) > 0
                      ? `₹${watchedValues.price}`
                      : "Free"}
                  </Badge>
                </div>
              </div>

              <div className="flex flex-col gap-2 p-3">
                <h3 className="line-clamp-1 text-base font-semibold">
                  {watchedValues.title || "Event Title"}
                </h3>

                <p className="line-clamp-2 text-xs text-gray-500">
                  {watchedValues.shortDescription ||
                    "Short description will appear here..."}
                </p>

                <div className="mt-2 space-y-1 border-t pt-2 text-xs text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3.5 w-3.5 text-sky-500" />
                    <span>
                      {formatDate(watchedValues.startDate || "")}
                      {watchedValues.endDate &&
                        ` - ${formatDate(watchedValues.endDate || "")}`}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-sky-500" />
                    <span>
                      {[
                        watchedValues.venue,
                        watchedValues.city,
                        watchedValues.state,
                      ]
                        .filter(Boolean)
                        .join(", ") || "Venue Location"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-muted-foreground mt-4 text-center text-xs">
              *This is how your event will appear in search results.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
