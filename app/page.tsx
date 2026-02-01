'use client';

import { useState } from 'react';
import RegistrationForm from './components/RegistrationForm';

type Language = 'en' | 'th';

export default function Home() {
  const [showForm, setShowForm] = useState(false);
  const [language, setLanguage] = useState<Language>('en');

  const translations = {
    en: {
      appName: 'Trusted Space',
      joinWaitlist: 'Join Waitlist',
      comingSoon: '🎉 Coming Soon - Early Access Available',
      heroTitle: 'Someone Is Ready to Listen 💙',
      heroSubtitle: 'Talk to someone who cares. Get emotional support through anonymous voice calls, anytime you need it.',
      getEarlyAccess: 'Get Early Access',
      learnMore: 'Learn More',
      noCommitment: '✨ No commitment required. Be the first to know when we launch!',
      whyVoiceVenting: 'Why Voice Venting?',
      anonymous: '100% Anonymous',
      anonymousDesc: 'No names, no judgments. Just someone who listens. Your privacy is our priority.',
      instantConnection: 'Instant Connection',
      instantDesc: 'Get matched with a listener instantly. No scheduling, no waiting rooms.',
      payAsYouGo: 'Pay As You Go',
      payAsYouGoDesc: 'From ฿20 for 5 minutes. Choose your session length and pay only for what you need.',
      pricing: 'Simple, Transparent Pricing',
      mostPopular: 'MOST POPULAR',
      getNotified: 'Get Notified',
      howItWorks: 'How It Works',
      downloadApp: 'Download App',
      downloadAppDesc: 'Get the app when we launch',
      chooseDuration: 'Choose Duration',
      chooseDurationDesc: 'Pick 5, 15, 30, or 60 minutes',
      getMatched: 'Get Matched',
      getMatchedDesc: 'Connect instantly with a listener',
      startTalking: 'Start Talking',
      startTalkingDesc: "Share what's on your mind",
      testimonials: 'What People Are Saying',
      testimonial1: 'Sometimes you just need someone to listen without judgment. This app will be a game-changer.',
      testimonial2: "The idea of anonymous voice support is exactly what I've been looking for.",
      testimonial3: "Can't wait for the launch. Mental health support should be this accessible.",
      betaTester: 'Beta Tester',
      earlySupporter: 'Early Supporter',
      communityMember: 'Community Member',
      ctaTitle: 'Be Among the First to Experience Voice Venting',
      ctaSubtitle: 'Join the waitlist and get exclusive early access when we launch',
      ctaButton: "Join the Waitlist - It's Free",
      specialPricing: '🎁 Early members get special launch pricing',
      footer: '© 2025 Voice Venting. All rights reserved.',
      footerTagline: 'Your mental wellbeing matters. 💙',
      joinWaitlistModal: 'Join the Waitlist',
    },
    th: {
      appName: 'พื้นที่วางใจ',
      joinWaitlist: 'เข้าร่วมรายชื่อรอ',
      comingSoon: '🎉 เร็วๆ นี้ - เปิดให้เข้าถึงก่อนใคร',
      heroTitle: 'มีคนพร้อมรับฟังคุณ 💙',
      heroSubtitle: 'พูดคุยกับคนที่ใส่ใจ รับการสนับสนุนทางอารมณ์ผ่านการโทรเสียงแบบไม่เปิดเผยตัวตน เมื่อไหร่ก็ได้ที่คุณต้องการ',
      getEarlyAccess: 'เข้าถึงก่อนใคร',
      learnMore: 'เรียนรู้เพิ่มเติม',
      noCommitment: '✨ ไม่มีข้อผูกมัด เป็นคนแรกที่รู้เมื่อเราเปิดตัว!',
      whyVoiceVenting: 'ทำไมต้องระบายด้วยเสียง?',
      anonymous: '100% ไม่เปิดเผยตัวตน',
      anonymousDesc: 'ไม่มีชื่อ ไม่มีการตัดสิน มีแค่คนรับฟัง ความเป็นส่วนตัวของคุณคือสิ่งสำคัญของเรา',
      instantConnection: 'เชื่อมต่อทันที',
      instantDesc: 'จับคู่กับผู้รับฟังได้ทันที ไม่ต้องนัดหมาย ไม่ต้องรอ',
      payAsYouGo: 'จ่ายตามการใช้',
      payAsYouGoDesc: 'เริ่มต้น ฿20 สำหรับ 5 นาที เลือกระยะเวลาและจ่ายเท่าที่ใช้',
      pricing: 'ราคาที่เรียบง่าย โปร่งใส',
      mostPopular: 'ยอดนิยม',
      getNotified: 'รับการแจ้งเตือน',
      howItWorks: 'วิธีการใช้งาน',
      downloadApp: 'ดาวน์โหลดแอป',
      downloadAppDesc: 'รับแอปเมื่อเราเปิดตัว',
      chooseDuration: 'เลือกระยะเวลา',
      chooseDurationDesc: 'เลือก 5, 15, 30, หรือ 60 นาที',
      getMatched: 'จับคู่',
      getMatchedDesc: 'เชื่อมต่อกับผู้รับฟังทันที',
      startTalking: 'เริ่มพูดคุย',
      startTalkingDesc: 'แบ่งปันสิ่งที่อยู่ในใจคุณ',
      testimonials: 'ผู้คนพูดถึงเรา',
      testimonial1: 'บางครั้งคุณแค่ต้องการคนรับฟังโดยไม่ตัดสิน แอปนี้จะเปลี่ยนเกม',
      testimonial2: 'ไอเดียการสนับสนุนด้วยเสียงแบบไม่เปิดเผยตัวตนคือสิ่งที่ฉันกำลังมองหา',
      testimonial3: 'รอไม่ไหวแล้วสำหรับการเปิดตัว การสนับสนุนสุขภาพจิตควรเข้าถึงได้แบบนี้',
      betaTester: 'ผู้ทดสอบเบต้า',
      earlySupporter: 'ผู้สนับสนุนตั้งแต่แรก',
      communityMember: 'สมาชิกชุมชน',
      ctaTitle: 'เป็นหนึ่งในคนแรกที่ได้สัมผัสการระบายด้วยเสียง',
      ctaSubtitle: 'เข้าร่วมรายชื่อรอและรับสิทธิ์เข้าถึงก่อนใครเมื่อเราเปิดตัว',
      ctaButton: 'เข้าร่วมรายชื่อรอ - ฟรี',
      specialPricing: '🎁 สมาชิกตั้งแต่แรกได้ราคาพิเศษ',
      footer: '© 2025 วอยซ์ เวนติ้ง สงวนลิขสิทธิ์',
      footerTagline: 'สุขภาพจิตของคุณสำคัญ 💙',
      joinWaitlistModal: 'เข้าร่วมรายชื่อรอ',
    }
  };

  const t = translations[language];

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">💬</span>
              <h1 className="text-xl font-bold text-gray-900">{t.appName}</h1>
            </div>
            <div className="flex items-center gap-4">
              {/* Language Toggle */}
              <div className="relative inline-flex items-center bg-gray-100 rounded-full p-1">
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                    language === 'en'
                      ? 'bg-white text-blue-600 shadow-md'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLanguage('th')}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                    language === 'th'
                      ? 'bg-white text-blue-600 shadow-md'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  TH
                </button>
              </div>
              <button
                onClick={() => setShowForm(true)}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
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
          <div className="inline-block mb-4 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
            {t.comingSoon}
          </div>
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            {t.heroTitle}
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            {t.heroSubtitle}
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => setShowForm(true)}
              className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 font-semibold text-lg shadow-lg"
            >
              {t.getEarlyAccess}
            </button>
            <button 
              onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-white text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-semibold text-lg"
            >
              {t.learnMore}
            </button>
          </div>
          <p className="mt-6 text-sm text-gray-500">
            {t.noCommitment}
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
          {t.whyVoiceVenting}
        </h3>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div className="text-4xl mb-4">🔒</div>
            <h4 className="text-xl font-semibold text-gray-900 mb-2">
              {t.anonymous}
            </h4>
            <p className="text-gray-600">
              {t.anonymousDesc}
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div className="text-4xl mb-4">⚡</div>
            <h4 className="text-xl font-semibold text-gray-900 mb-2">
              {t.instantConnection}
            </h4>
            <p className="text-gray-600">
              {t.instantDesc}
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div className="text-4xl mb-4">💰</div>
            <h4 className="text-xl font-semibold text-gray-900 mb-2">
              {t.payAsYouGo}
            </h4>
            <p className="text-gray-600">
              {t.payAsYouGoDesc}
            </p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
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
                className={`bg-white p-6 rounded-xl border-2 ${
                  plan.best ? 'border-blue-500 shadow-lg' : 'border-gray-200'
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
                  className={`w-full py-2 rounded-lg font-medium transition-colors ${
                    plan.best
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
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
        <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
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
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">
                {item.step}
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h4>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center mb-12">
            {t.testimonials}
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                text: t.testimonial1,
                name: t.betaTester,
              },
              {
                text: t.testimonial2,
                name: t.earlySupporter,
              },
              {
                text: t.testimonial3,
                name: t.communityMember,
              },
            ].map((testimonial, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                <p className="text-lg mb-4 italic">"{testimonial.text}"</p>
                <p className="font-semibold">- {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            {t.ctaTitle}
          </h3>
          <p className="text-xl text-gray-600 mb-8">
            {t.ctaSubtitle}
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 font-semibold text-lg shadow-lg"
          >
            {t.ctaButton}
          </button>
          <p className="mt-4 text-sm text-gray-500">
            {t.specialPricing}
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600">
          <p>{t.footer}</p>
          <p className="mt-2 text-sm">{t.footerTagline}</p>
        </div>
      </footer>

      {/* Registration Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                {t.joinWaitlistModal}
              </h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
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