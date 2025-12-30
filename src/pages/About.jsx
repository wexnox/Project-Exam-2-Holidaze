import React, { useEffect } from 'react';

function About() {
  useEffect(() => {
    document.title = 'Holidaze | About';
  }, []);

  return (
    <section className="text-gray-800 body-font">
      <div className="container px-5 py-16 md:py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 tracking-tight">
            About Holidaze
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base md:text-lg">
            Holidaze is a simple and secure way to find, book, and manage stays—whether you're
            traveling as a guest or listing your own place as a host. We bring unique homes, cabins,
            and apartments together in one clear platform, with tools that make the entire
            experience seamless from the first search to checkout.
          </p>
          <p className="mt-8 text-lg italic text-gray-700">
            “With Holidaze, booking your favorite accommodation and managing venues has never been
            easier. Experience the difference today.”
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-10">
          <section className="mb-20">
            <h2 className="text-2xl font-semibold mb-3">What is Holidaze?</h2>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>
                A marketplace for stays where guests can discover places that fit their budget and
                style.
              </li>
              <li>
                A host dashboard to manage listings, calendar, pricing, and bookings—all in one
                place.
              </li>
              <li>Secure payments and clear communication between guest and host.</li>
            </ul>
          </section>

          <section className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-2">For guests</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>
                  Find the perfect place: Filter by location, price, amenities, and availability.
                </li>
                <li>Clear pricing: See the total price up front—no hidden surprises.</li>
                <li>
                  Smart search: Save favorites, get alerts when prices change or dates open up.
                </li>
                <li>
                  Easy check-in: Clear arrival instructions and a mobile-friendly trip overview.
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">For hosts</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>
                  Simple listing: Upload photos, set house rules, and choose your pricing strategy.
                </li>
                <li>
                  Calendar management: Block dates, sync with external calendars, and avoid double
                  bookings.
                </li>
                <li>Booking control: Approve requests manually or use instant booking.</li>
                <li>Insights: See stats for revenue, occupancy, and popular periods.</li>
              </ul>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-2">How it works</h3>
            <ol className="list-decimal list-inside space-y-1 text-gray-700">
              <li>
                Search and discover: Use maps, filters, and collections to find the right place.
              </li>
              <li>Choose dates: See real-time availability and total price before you book.</li>
              <li>Confirm and pay: Secure checkout—confirmation in seconds.</li>
              <li>Stay and review: Share your experience and help the next guest choose.</li>
            </ol>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-2">Why choose Holidaze?</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Modern, fast platform—mobile first.</li>
              <li>Honest reviews and verified profiles.</li>
              <li>Responsive customer support, even on weekends.</li>
              <li>Focus on safety, predictability, and great communication.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-2">Safety and trust</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Verified users: Email, phone, and payment method checks.</li>
              <li>Secure payments: Funds are held safely until after check-in.</li>
              <li>Damage and liability support: Clear procedures for incidents and disputes.</li>
              <li>Reporting center: Flag suspicious activity in one click.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-2">Flexible cancellation options</h3>
            <p className="text-gray-700">
              Choose between flexible, moderate, or strict cancellation—clearly labeled on every
              listing. You can review the rules and deadlines before you tap “Book now”.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-2">Sustainability in practice</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>
                Encourages energy-efficient choices and green transport information in listings.
              </li>
              <li>Badges for local experiences, seasonal food, and eco initiatives.</li>
              <li>Tips for guests to make their stay more sustainable.</li>
            </ul>
          </section>

          <section className="border-t pt-8">
            <h3 className="text-xl font-semibold mb-2">Frequently asked questions</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>
                How do I pay? Through secure checkout in the app/web—you’ll receive a receipt
                immediately.
              </li>
              <li>Are prices final? Yes, the total price is shown before you confirm.</li>
              <li>
                What if the host cancels? We’ll help you with a quick alternative or a full refund
                according to the policy.
              </li>
              <li>
                Can I contact the host before booking? Yes—send a message directly from the listing.
              </li>
            </ul>
          </section>

          <section className="text-center pt-4">
            <p className="text-lg font-medium">Ready to try?</p>
            <p className="text-gray-700">
              Discover your next stay or list your first place. With Holidaze, it’s easier to travel
              —and to host. Start today.
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}

export default About;
