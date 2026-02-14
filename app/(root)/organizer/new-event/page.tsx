"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import EventsForm from "@/components/eventsForm";
import { useRouter } from "next/navigation";
import { createEvent } from "@/services/api/event";
import { eventSchema } from "@/services/validation/event";
import { toast } from "react-toastify";
import { CATEGORIES } from "@/services/utils/eventCategories";

type EventFormValues = z.infer<typeof eventSchema>;

export default function CreateEventPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [imageFile, setImageFile] = React.useState<File | null>(null);

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

    // Find the selected category to get its description
    const selectedCategory = CATEGORIES.find(
      (c) => c.value === values.categoryName
    );

    // Transform date strings to ISO strings
    const startDateISO = values.startDate
      ? new Date(values.startDate).toISOString()
      : new Date().toISOString();
    const endDateISO = values.endDate
      ? new Date(values.endDate).toISOString()
      : new Date().toISOString();
    const doorTimeISO = values.doorTime
      ? new Date(values.doorTime).toISOString()
      : undefined;

    // Construct the payload structure expected by the backend
    const payloadEvent = {
      title: values.title,
      description: values.description,
      shortDescription: values.shortDescription,
      venue: values.venue,
      street: values.street,
      city: values.city,
      state: values.state,
      country: values.country,
      postalCode: values.postalCode,
      startDate: startDateISO,
      endDate: endDateISO,
      doorTime: doorTimeISO,
      price: Number(values.price),
      capacity: Number(values.capacity),
      availableTickets: Number(values.availableTickets),
      status: values.status,
      isFeatured: values.isFeatured,
      isPublic: values.isPublic,
      image: values.imageUrl,
    };

    const payloadCategory = {
      name: values.categoryName,
      description: selectedCategory?.description || "General category",
    };

    const formData = new FormData();
    formData.append("event", JSON.stringify(payloadEvent));
    formData.append("category", JSON.stringify(payloadCategory));
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const response = await createEvent(formData);
      if (response.success) {
        toast.success("Event created successfully");
        router.push("/organizer/events");
      }
    } catch (error: any) {
      console.error("Failed to create event", error);
      toast.error(error.response?.data?.message || "Failed to create event");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <EventsForm
      form={form}
      onSubmit={onSubmit}
      isSubmitting={isSubmitting}
      watchedValues={watchedValues}
      setImageFile={setImageFile}
      onCancel={() => router.back()}
    />
  );
}
