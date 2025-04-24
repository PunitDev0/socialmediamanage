import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-blue-600 text-white py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Social Sync Privacy Policy</h1>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8 flex-grow">
        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p className="mb-4">
            Welcome to Social Sync ("we," "us," or "our"). We are committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services ("Services").
          </p>

          <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
          <p className="mb-4">We may collect the following types of information:</p>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Personal Information:</strong> Name, email address, and other contact details you provide when registering or contacting us.</li>
            <li><strong>Usage Data:</strong> Information about how you interact with our Services, such as IP address, browser type, pages visited, and time spent on the site.</li>
            <li><strong>Cookies:</strong> Small data files stored on your device to enhance your experience, such as remembering your preferences.</li>
          </ul>

          <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
          <p className="mb-4">We use your information to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Provide, operate, and improve our Services.</li>
            <li>Communicate with you, including sending updates or responding to inquiries.</li>
            <li>Analyze usage patterns to enhance user experience.</li>
            <li>Ensure the security of our Services.</li>
          </ul>

          <h2 className="text-2xl font-semibold mb-4">4. Sharing Your Information</h2>
          <p className="mb-4">
            We do not sell or rent your personal information. We may share your information with:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Service Providers:</strong> Third parties who assist with hosting, analytics, or customer support.</li>
            <li><strong>Legal Requirements:</strong> If required by law or to protect our rights and safety.</li>
          </ul>

          <h2 className="text-2xl font-semibold mb-4">5. Cookies and Tracking</h2>
          <p className="mb-4">
            We use cookies to improve your experience. You can manage cookie preferences through your browser settings. Disabling cookies may affect the functionality of our Services.
          </p>

          <h2 className="text-2xl font-semibold mb-4">6. Data Security</h2>
          <p className="mb-4">
            We implement reasonable security measures to protect your information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
          </p>

          <h2 className="text-2xl font-semibold mb-4">7. Your Rights</h2>
          <p className="mb-4">
            Depending on your location, you may have the right to:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Access or correct your personal information.</li>
            <li>Request deletion of your data.</li>
            <li>Opt out of marketing communications.</li>
          </ul>
          <p className="mb-4">
            To exercise these rights, contact us at <a href="mailto:privacy@socialsync.com" className="text-blue-600 hover:underline">privacy@socialsync.com</a>.
          </p>

          <h2 className="text-2xl font-semibold mb-4">8. Third-Party Links</h2>
          <p className="mb-4">
            Our Services may contain links to third-party websites. We are not responsible for their privacy practices, and we encourage you to review their policies.
          </p>

          <h2 className="text-2xl font-semibold mb-4">9. Changes to This Policy</h2>
          <p className="mb-4">
            We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the updated policy on our website with the effective date.
          </p>

          <h2 className="text-2xl font-semibold mb-4">10. Contact Us</h2>
          <p className="mb-4">
            If you have questions about this Privacy Policy, please contact us at:
          </p>
          <p className="mb-4">
            Email: <a href="mailto:privacy@socialsync.com" className="text-blue-600 hover:underline">privacy@socialsync.com</a><br />
            Address: Social Sync, 123 Privacy Lane, Data City, DC 12345
          </p>
        </section>
      </main>
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} Social Sync. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default PrivacyPolicy;