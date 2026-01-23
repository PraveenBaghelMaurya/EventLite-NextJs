'use client'
export default function RefundPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Refund Policy</h1>

      <p className="mb-4 text-muted-foreground">
        This Refund Policy explains how refunds are handled on EventLite.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Ticket Refund Eligibility</h2>
      <p className="mb-4">
        Refunds are available only if the event organizer allows cancellation.
        Each event page clearly mentions whether refunds are applicable and the
        deadline for cancellation.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. Event Cancellation</h2>
      <p className="mb-4">
        If an event is canceled by the organizer, users will automatically
        receive a full refund to the original payment method.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Processing Time</h2>
      <p className="mb-4">
        Approved refunds are processed via Stripe and usually take 5–10
        business days to reflect in your bank account.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Non-Refundable Cases</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>Tickets purchased for non-refundable events</li>
        <li>Missed events or no-shows</li>
        <li>Refund requests after the allowed deadline</li>
      </ul>

      <p className="mt-6 text-sm text-muted-foreground">
        Last updated: January 2026
      </p>
    </div>
  );
}
