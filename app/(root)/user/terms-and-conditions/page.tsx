'use client'
export default function TermsAndConditionsPage() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Terms & Conditions</h1>

      <p className="mb-4 text-muted-foreground">
        By using EventLite, you agree to the following terms and conditions.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. User Responsibilities</h2>
      <p className="mb-4">
        Users must provide accurate information during booking and must not
        misuse the platform for fraudulent activities.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. Ticket Usage</h2>
      <p className="mb-4">
        Tickets are valid only for the specified event and are non-transferable
        unless stated otherwise.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Payments</h2>
      <p className="mb-4">
        All payments are processed securely through Stripe. EventLite does not
        store your card details.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Organizer Responsibility</h2>
      <p className="mb-4">
        Event organizers are solely responsible for event execution, content,
        and compliance with local laws.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Account Termination</h2>
      <p className="mb-4">
        EventLite reserves the right to suspend or terminate accounts that
        violate these terms.
      </p>

      <p className="mt-6 text-sm text-muted-foreground">
        Last updated: January 2026
      </p>
    </div>
  );
}
