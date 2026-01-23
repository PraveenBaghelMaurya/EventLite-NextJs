'use client'
export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

      <p className="mb-4 text-muted-foreground">
        Your privacy is important to us. This Privacy Policy explains how
        EventLite collects and uses your information.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>Name and email address (via Google OAuth)</li>
        <li>Booking and payment information</li>
        <li>Event preferences and activity logs</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. How We Use Your Data</h2>
      <p className="mb-4">
        We use your data to manage bookings, process payments, provide real-time
        updates, and improve our services.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Data Security</h2>
      <p className="mb-4">
        EventLite uses encrypted connections (HTTPS), secure authentication,
        and Stripe PCI-compliant payment processing.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Third-Party Services</h2>
      <p className="mb-4">
        We use trusted third-party services such as Google OAuth, Stripe, and
        Cloudinary. Your data is never sold to advertisers.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Your Rights</h2>
      <p className="mb-4">
        You can update your profile or request account deletion at any time by
        contacting support.
      </p>

      <p className="mt-6 text-sm text-muted-foreground">
        Last updated: January 2026
      </p>
    </div>
  );
}
