// app/contact/page.tsx
'use client';

import { useCallback } from 'react';
import ContactHero from '../../components/contact/ContactHero';
import ContactMethods from '../../components/contact/ContactMethods';
import ContactFormSection from '../../components/contact/ContactFormSection';
import ContactMapAndConditions from '../../components/contact/ContactMapAndConditions';
import ContactCTA from '../../components/contact/ContactCTA';

export default function ContactPage() {
  const handleScrollToForm = useCallback(() => {
    const formSection = document.getElementById('form');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleFormSubmit = useCallback((data: any) => {
    console.log('Form submitted:', data);
    // در اینجا می‌توانید منطق ارسال فرم را پیاده‌سازی کنید
    alert('پیام شما با موفقیت ارسال شد!');
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-b from-white via-emerald-50/30 to-white">
      <ContactHero onScrollToForm={handleScrollToForm} />
      <ContactMethods />
      <ContactFormSection onFormSubmit={handleFormSubmit} />
      <ContactMapAndConditions />
      <ContactCTA />
    </div>
  );
}