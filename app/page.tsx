'use client';

import { useState, useEffect } from 'react';
import RegistrationForm from './components/RegistrationForm';

type Language = 'th' | 'en';

const translations = {
  th: {
    appName: 'Trusted Space',
    joinWaitlist: 'ลงทะเบียนเข้าร่วม',
    comingSoon: '🚀 เปิดตัวเร็วๆ นี้',
    heroTitle: 'พื้นที่ปลอดภัย สำหรับการระบายอารมณ์',
    heroSubtitle: 'เชื่อมต่อกับผู้ฟังที่เข้าใจคุณผ่านการโทรด้วยเสียง ไม่เก็บข้อมูลส่วนตัว ไม่มีการบันทึก แค่คุยก็พอ',
    getEarlyAccess: 'รับสิทธิ์เข้าถึงก่อนใคร',
    learnMore: 'เรียนรู้เพิ่มเติม',
    noCommitment: '✨ ไม่มีค่าใช้จ่าย ไม่ผูกพัน แค่ลงทะเบียนเพื่อรับการแจ้งเตือน',
    whyTitle: 'ทำไมต้อง Trusted Space?',
    anonymous: 'ไม่มีใครรู้จักคุณ',
    anonymousDesc: 'ไม่ต้องเปิดเผยตัวตน คุยได้โดยไม่กังวล',
    instantConnection: 'เชื่อมต่อทันที',
    instantDesc: 'หาคู่สนทนาได้ภายในไม่กี่วินาที',
    payAsYouGo: 'จ่ายตามการใช้งาน',
    payAsYouGoDesc: 'ไม่มีค่าสมัคร จ่ายเฉพาะเวลาที่ใช้',
    pricing: '💰 ราคาเปิดตัวพิเศษ',
    mostPopular: '⭐ ยอดนิยม',
    getNotified: 'แจ้งเตือนฉัน',
    howItWorks: 'วิธีใช้งาน',
    downloadApp: 'ดาวน์โหลดแอป',
    downloadAppDesc: 'ติดตั้งฟรีบน iOS หรือ Android',
    chooseDuration: 'เลือกระยะเวลา',
    chooseDurationDesc: 'เลือกความยาวการสนทนาที่เหมาะกับคุณ',
    getMatched: 'รอจับคู่',
    getMatchedDesc: 'ระบบจะหาผู้ฟังที่เหมาะสมให้อัตโนมัติ',
    startTalking: 'เริ่มคุย',
    startTalkingDesc: 'คุยได้เลย ไม่มีการบันทึก',
    testimonials: '💬 ผู้ใช้งานพูดถึงเรา',
    testimonial1: 'รู้สึกโล่งใจมากที่มีคนรับฟัง โดยไม่ต้องกลัวถูกตัดสิน',
    betaTester: 'ผู้ทดสอบระบบ',
    testimonial2: 'ไม่ต้องกังวลเรื่องข้อมูลส่วนตัว สะดวกและปลอดภัย',
    earlySupporter: 'ผู้สนับสนุนตั้งแต่แรก',
    testimonial3: 'การมีพื้นที่ที่ปลอดภัยแบบนี้ สำคัญมาก',
    communityMember: 'สมาชิกชุมชน',
    ctaTitle: 'พร้อมที่จะเริ่มต้นแล้วหรือยัง?',
    ctaSubtitle: 'เข้าร่วมรายชื่อผู้รอและรับราคาพิเศษเมื่อเราเปิดตัว',
    ctaButton: 'ลงทะเบียนตอนนี้',
    specialPricing: '🎁 ผู้ลงทะเบียนก่อนเปิดตัว รับส่วนลด 50%',
    footer: '© 2026 Trusted Space - พื้นที่ปลอดภัยสำหรับทุกคน',
    footerTagline: 'เพราะทุกคนสมควรได้รับการรับฟัง',
    joinWaitlistModal: 'ลงทะเบียนเข้าร่วมรายชื่อผู้รอ',
  },
  en: {
    appName: 'Trusted Space',
    joinWaitlist: 'Join Waitlist',
    comingSoon: '🚀 Coming Soon',
    heroTitle: 'A Safe Space for Venting',
    heroSubtitle: 'Connect with understanding listeners through voice calls. No data stored, no recordings, just talk.',
    getEarlyAccess: 'Get Early Access',
    learnMore: 'Learn More',
    noCommitment: '✨ No cost, no commitment. Just sign up for notifications.',
    whyTitle: 'Why Trusted Space?',
    anonymous: 'Complete Anonymity',
    anonymousDesc: 'No need to reveal your identity. Talk freely.',
    instantConnection: 'Instant Connection',
    instantDesc: 'Find a conversation partner within seconds.',
    payAsYouGo: 'Pay As You Go',
    payAsYouGoDesc: 'No subscription fees. Pay only for the time you use.',
    pricing: '💰 Special Launch Pricing',
    mostPopular: '⭐ Most Popular',
    getNotified: 'Notify Me',
    howItWorks: 'How It Works',
    downloadApp: 'Download App',
    downloadAppDesc: 'Free install on iOS or Android',
    chooseDuration: 'Choose Duration',
    chooseDurationDesc: 'Select the conversation length that works for you',
    getMatched: 'Get Matched',
    getMatchedDesc: 'System automatically finds a suitable listener',
    startTalking: 'Start Talking',
    startTalkingDesc: 'Talk freely, no recordings',
    testimonials: '💬 What Our Users Say',
    testimonial1: 'Felt so relieved having someone listen without fear of judgment.',
    betaTester: 'Beta Tester',
    testimonial2: 'No privacy concerns. Convenient and secure.',
    earlySupporter: 'Early Supporter',
    testimonial3: 'Having a safe space like this is so important.',
    communityMember: 'Community Member',
    ctaTitle: 'Ready to Get Started?',
    ctaSubtitle: 'Join the waitlist and get special pricing when we launch',
    ctaButton: 'Sign Up Now',
    specialPricing: '🎁 Early signups get 50% off',
    footer: '© 2026 Trusted Space - A Safe Space for Everyone',
    footerTagline: 'Because everyone deserves to be heard',
    joinWaitlistModal: 'Join the Waitlist',
  },
};

export default function Home() {
  const [showForm, setShowForm] = useState(false);
  const [language, setLanguage] = useState<Language>('th');
  const [currentFeature, setCurrentFeature] = useState(0);
  
  const t = translations[language];

  // features carousel menu
  const features = [
    { icon: '🔒', title: t.anonymous, desc: t.anonymousDesc },
    { icon: '⚡', title: t.instantConnection, desc: t.instantDesc },
    { icon: '💰', title: t.payAsYouGo, desc: t.payAsYouGoDesc },
  ];

  // next carousel function
  const nextFeature = () => {
    setCurrentFeature((prev) => (prev + 1) % features.length);
  };

  // previous carousel function
  const prevFeature = () => {
    setCurrentFeature((prev) => (prev - 1 + features.length) % features.length);
  };

  // Auto-carousel: เปลี่ยน feature อัตโนมัติทุก 5 วินาที
  useEffect(() => {
    const interval = setInterval(() => {
      nextFeature();
    }, 5000); // 5000ms = 5 วินาที

    // Cleanup: ลบ interval เมื่อ component ถูก unmount
    return () => clearInterval(interval);
  }, [currentFeature]); // Re-run เมื่อ currentFeature เปลี่ยน

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* 🎬 Video Background */}
      <div className="fixed inset-0 -z-10">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/16508241-hd_1080_1920_30fps.mp4" type="video/mp4" />
        </video>
        
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/75 to-white/70 backdrop-blur-[2px]" />
      </div>

      {/* Header */}
      <header className="border-b border-white/30 bg-white/70 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">💬</span>
              <h1 className="text-xl font-bold text-gray-900">{t.appName}</h1>
            </div>
            <div className="flex items-center gap-4">
              {/* Language Toggle */}
              <div className="relative inline-flex items-center bg-white/80 backdrop-blur-sm rounded-full p-1 shadow-sm border border-gray-200">
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                    language === 'en'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLanguage('th')}
                  className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                    language === 'th'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  TH
                </button>
              </div>
              <button
                onClick={() => setShowForm(true)}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-md hover:shadow-lg"
              >
                {t.joinWaitlist}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-block mb-4 px-4 py-2 bg-blue-100/90 backdrop-blur-sm text-blue-700 rounded-full text-sm font-semibold shadow-md">
            {t.comingSoon}
          </div>
          <h2 className="text-5xl font-bold text-gray-900 mb-6 drop-shadow-sm">
            {t.heroTitle}
          </h2>
          <p className="text-xl text-gray-700 mb-8 drop-shadow-sm">
            {t.heroSubtitle}
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => setShowForm(true)}
              className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 font-semibold text-lg shadow-xl"
            >
              {t.getEarlyAccess}
            </button>
            <button 
              onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-white/90 backdrop-blur-sm text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-white transition-colors font-semibold text-lg shadow-lg"
            >
              {t.learnMore}
            </button>
          </div>
          <p className="mt-6 text-sm text-gray-600">
            {t.noCommitment}
          </p>
        </div>
      </section>

      {/* Features Carousel */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h3 className="text-3xl font-bold text-center text-gray-900 mb-12 drop-shadow-sm">
          {t.whyTitle}
        </h3>
        
        {/* Carousel Container */}
        <div className="relative max-w-2xl mx-auto">
          {/* Main Card with smooth transitions */}
          <div className="bg-white/80 backdrop-blur-md p-12 rounded-2xl shadow-2xl min-h-[300px] flex flex-col items-center justify-center text-center overflow-hidden">
            <div 
              key={currentFeature}
              className="flex flex-col items-center animate-fade-in"
            >
              <div className="text-6xl mb-6 transition-all duration-500 ease-in-out transform hover:scale-110">
                {features[currentFeature].icon}
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-4 transition-all duration-300">
                {features[currentFeature].title}
              </h4>
              <p className="text-lg text-gray-700 max-w-md transition-all duration-300">
                {features[currentFeature].desc}
              </p>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevFeature}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 bg-white/90 backdrop-blur-sm hover:bg-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 active:scale-95"
            aria-label="Previous feature"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={nextFeature}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 bg-white/90 backdrop-blur-sm hover:bg-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 active:scale-95"
            aria-label="Next feature"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {features.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentFeature(index)}
                className={`transition-all duration-500 ease-in-out ${
                  index === currentFeature
                    ? 'w-8 h-3 bg-blue-600 rounded-full shadow-md'
                    : 'w-3 h-3 bg-gray-300 rounded-full hover:bg-gray-400 hover:scale-125'
                }`}
                aria-label={`Go to feature ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12 drop-shadow-sm">
            {t.pricing}
          </h3>
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { time: '5 min', price: '฿20', best: false },
              { time: '15 min', price: '฿50', best: false },
              { time: '30 min', price: '฿90', best: true },
              { time: '60 min', price: '฿160', best: false },
            ].map((plan) => (
              <div
                key={plan.time}
                className={`bg-white/85 backdrop-blur-md p-6 rounded-xl border-2 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 ${
                  plan.best ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'
                }`}
              >
                {plan.best && (
                  <div className="text-xs font-semibold text-blue-600 mb-2">
                    {t.mostPopular}
                  </div>
                )}
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {plan.price}
                </div>
                <div className="text-gray-600 mb-4">{plan.time}</div>
                <button
                  onClick={() => setShowForm(true)}
                  className={`w-full py-2 rounded-lg font-medium transition-all ${
                    plan.best
                      ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {t.getNotified}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h3 className="text-3xl font-bold text-center text-gray-900 mb-12 drop-shadow-sm">
          {t.howItWorks}
        </h3>
        <div className="grid md:grid-cols-4 gap-8">
          {[
            { step: '1', icon: '📱', title: t.downloadApp, desc: t.downloadAppDesc },
            { step: '2', icon: '⏱️', title: t.chooseDuration, desc: t.chooseDurationDesc },
            { step: '3', icon: '🎧', title: t.getMatched, desc: t.getMatchedDesc },
            { step: '4', icon: '💬', title: t.startTalking, desc: t.startTalkingDesc },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className="text-5xl mb-4">{item.icon}</div>
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3 shadow-lg">
                {item.step}
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h4>
              <p className="text-gray-700 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h3 className="text-3xl font-bold text-gray-900 mb-4 drop-shadow-sm">
            {t.ctaTitle}
          </h3>
          <p className="text-xl text-gray-700 mb-8">
            {t.ctaSubtitle}
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 font-semibold text-lg shadow-xl"
          >
            {t.ctaButton}
          </button>
          <p className="mt-4 text-sm text-gray-600">
            {t.specialPricing}
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/30 py-8 bg-white/60 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-700">
          <p className="font-medium">{t.footer}</p>
          <p className="mt-2 text-sm">{t.footerTagline}</p>
        </div>
      </footer>

      {/* Registration Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-2xl font-bold text-gray-900">
                {t.joinWaitlistModal}
              </h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl hover:bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center transition-all"
              >
                ×
              </button>
            </div>
            <div className="p-6">
              <RegistrationForm onSuccess={() => setShowForm(false)} />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}