import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin } from "lucide-react";
import Image from "next/image";

interface EventCardProps {
  item: any;
}

const formatDate = (dateString: string) => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

export default function EventCard({ item }: EventCardProps) {
  return (
    <div className="group relative h-full overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      {/* Image Section */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-gray-100">
        <img
          src={item.image || "/placeholder-event.jpg"}
          alt={item.title || "Event Image"}
          width={500}
          height={500}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-2 right-2">
          <Badge
            variant="secondary"
            className="bg-white/90 font-semibold text-black shadow-sm backdrop-blur-md"
          >
            {Number(item.price) > 0 ? `₹${item.price}` : "Free"}
          </Badge>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col gap-2 p-3">
        <h3 className="group-hover:text-primary line-clamp-1 text-base font-bold text-gray-900 transition-colors">
          {item.title}
        </h3>

        <p className="line-clamp-2 min-h-[2.5em] text-xs leading-relaxed text-gray-500">
          {item.shortDescription ||
            item.description ||
            "No description available."}
        </p>

        <div className="mt-2 flex flex-col gap-1.5 border-t border-gray-50 pt-2">
          {/* Date */}
          <div className="flex items-start gap-2 text-xs text-gray-600">
            <Calendar className="text-primary/70 mt-0.5 h-3.5 w-3.5 shrink-0" />
            <span className="leading-tight">
              {formatDate(item.startDate)}
              {item.endDate && ` - ${formatDate(item.endDate)}`}
            </span>
          </div>

          {/* Location */}
          <div className="flex items-start gap-2 text-xs text-gray-600">
            <MapPin className="text-primary/70 mt-0.5 h-3.5 w-3.5 shrink-0" />
            <span className="line-clamp-1 leading-tight">
              {[item.venue, item.street, item.city, item.state]
                .filter(Boolean)
                .join(", ")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
