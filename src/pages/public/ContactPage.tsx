import { Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { COMPANY } from '@/config/constants';

export function ContactPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-display text-gray-950 mb-4">Get in Touch</h1>
        <p className="text-lg text-gray-500">Book a free demo or ask us anything about {COMPANY.PRODUCT_NAME}.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Form */}
        <div className="bg-white rounded-2xl border border-gray-100 p-8">
          <h2 className="text-xl font-bold text-gray-900 font-display mb-6">Send us a message</h2>
          <form className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1.5">Name</label>
              <Input placeholder="Your name" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1.5">Email</label>
              <Input type="email" placeholder="you@school.edu" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1.5">School Name</label>
              <Input placeholder="ABC Public School" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1.5">Message</label>
              <textarea
                rows={4}
                placeholder="Tell us about your school and what you're looking for..."
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-none"
              />
            </div>
            <Button className="w-full">Send Message</Button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h3 className="text-base font-semibold text-gray-900 mb-4">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center size-9 rounded-lg bg-primary-light text-primary shrink-0">
                  <Mail className="size-4" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <a href={`mailto:${COMPANY.EMAIL}`} className="text-sm font-medium text-gray-900 hover:text-primary">
                    {COMPANY.EMAIL}
                  </a>
                </div>
              </div>
              {COMPANY.CONTACT_PHONES.map((phone) => (
                <div key={phone} className="flex items-start gap-3">
                  <div className="flex items-center justify-center size-9 rounded-lg bg-primary-light text-primary shrink-0">
                    <Phone className="size-4" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Phone / WhatsApp</p>
                    <a href={`tel:${phone}`} className="text-sm font-medium text-gray-900 hover:text-primary">
                      +91 {phone}
                    </a>
                  </div>
                </div>
              ))}
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center size-9 rounded-lg bg-primary-light text-primary shrink-0">
                  <MapPin className="size-4" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Support</p>
                  <a href={`mailto:${COMPANY.SUPPORT_EMAIL}`} className="text-sm font-medium text-gray-900 hover:text-primary">
                    {COMPANY.SUPPORT_EMAIL}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-primary-light rounded-2xl p-6">
            <h3 className="text-base font-semibold text-primary mb-2">Free Demo Available</h3>
            <p className="text-sm text-gray-600">
              We offer a free 30-minute demo tailored to your school's needs. Our team will walk you through
              the platform and answer all your questions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
