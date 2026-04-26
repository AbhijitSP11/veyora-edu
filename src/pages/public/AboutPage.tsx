import { GraduationCap, Target, Users, Heart } from 'lucide-react';
import { COMPANY } from '@/config/constants';

export function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center size-14 rounded-2xl bg-primary-light mx-auto mb-4">
          <GraduationCap className="size-7 text-primary" />
        </div>
        <h1 className="text-4xl font-bold font-display text-gray-950 mb-4">About {COMPANY.NAME}</h1>
        <p className="text-lg text-gray-500 max-w-xl mx-auto">{COMPANY.TAGLINE}</p>
      </div>

      <div className="prose prose-gray max-w-none">
        <div className="bg-white rounded-2xl border border-gray-100 p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 font-display mb-3 flex items-center gap-2">
            <Target className="size-5 text-primary" /> Our Mission
          </h2>
          <p className="text-gray-600 leading-relaxed">
            We build technology that makes school administration effortless for teachers and principals across India.
            From small private schools in Tier-3 cities to large coaching institutes, {COMPANY.PRODUCT_NAME} helps
            schools focus on what matters — educating students — while we handle the paperwork.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 font-display mb-3 flex items-center gap-2">
            <Users className="size-5 text-primary" /> Our Team
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Founded by <strong>{COMPANY.FOUNDER}</strong>, {COMPANY.NAME} was born from a deep understanding of
            the challenges faced by school administrators in India. Our team combines expertise in education technology,
            cloud infrastructure, and user experience design.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-8">
          <h2 className="text-xl font-bold text-gray-900 font-display mb-3 flex items-center gap-2">
            <Heart className="size-5 text-primary" /> Our Values
          </h2>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start gap-2"><span className="font-semibold text-primary mt-0.5">•</span> <span><strong>Simplicity:</strong> Every feature should be usable by a teacher with a basic smartphone.</span></li>
            <li className="flex items-start gap-2"><span className="font-semibold text-primary mt-0.5">•</span> <span><strong>Trust:</strong> Student data is sacred. We never share or monetize it.</span></li>
            <li className="flex items-start gap-2"><span className="font-semibold text-primary mt-0.5">•</span> <span><strong>Local-first:</strong> Built for Indian schools — ₹ currency, DD/MM/YYYY dates, regional languages coming soon.</span></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
