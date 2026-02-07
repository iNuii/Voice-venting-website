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
      betaTester: 'Beta Tester',
      earlySupporter: 'Early Supporter',
      communityMember: 'Community Member',
      ctaTitle: 'Be Among the First to Experience Trusted Space',
      ctaSubtitle: 'Join the waitlist and get exclusive early access when we launch',
      ctaButton: "Join the Waitlist - It's Free",
      specialPricing: '🎁 Early members get special launch pricing',
      footer: '© 2025 Trusted Space. All rights reserved.',
      footerTagline: 'Your mental wellbeing matters. 💙',
      joinWaitlistModal: 'Join the Waitlist',
    },
    th: {
      appName: 'พื้นที่วางใจ',
      joinWaitlist: 'ลงทะเบียนเข้าร่วม',
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
      betaTester: 'ผู้ทดสอบเบต้า',
      earlySupporter: 'ผู้สนับสนุนตั้งแต่แรก',
      communityMember: 'สมาชิกชุมชน',
      ctaTitle: 'เป็นหนึ่งในคนแรกที่ได้สัมผัส Trusted Space',
      ctaSubtitle: 'เข้าร่วมรายชื่อรอและรับสิทธิ์เข้าถึงก่อนใครเมื่อเราเปิดตัว',
      ctaButton: 'เข้าร่วมรายชื่อรอ - ฟรี',
      specialPricing: '🎁 สมาชิกตั้งแต่แรกได้ราคาพิเศษ',
      footer: '© 2025 พื้นที่วางใจ สงวนลิขสิทธิ์',
      footerTagline: 'สุขภาพจิตของคุณสำคัญ 💙',
      joinWaitlistModal: 'ลงทะเบียนเข้าร่วม',
    }
  };

  const t = translations[language];

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-purple-500/10 to-pink-500/20" />
        
        {/* Pattern Background */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        
        {/* Floating Orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-400/20 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      {/* Header */}
      <header className="border-b border-white/20 bg-white/70 backdrop-blur-xl sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 group">
              <div className="text-3xl transition-transform group-hover:scale-110 duration-300">💬</div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {t.appName}
              </h1>
            </div>
            <div className="flex items-center gap-4">
              {/* Language Toggle */}
              <div className="relative inline-flex items-center bg-white/50 backdrop-blur-sm rounded-full p-1 shadow-sm">
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                    language === 'en'
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLanguage('th')}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                    language === 'th'
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  TH
                </button>
              </div>
              <button
                onClick={() => setShowForm(true)}
                className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:shadow-xl transition-all duration-300 font-medium transform hover:scale-105"
              >
                {t.joinWaitlist}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-block mb-6 px-5 py-2.5 bg-white/80 backdrop-blur-sm text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-sm font-bold shadow-lg border border-white/50 animate-bounce">
            {t.comingSoon}
          </div>
          <h2 className="text-6xl md:text-7xl font-extrabold text-gray-900 mb-8 leading-tight">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
              {t.heroTitle}
            </span>
          </h2>
          <p className="text-2xl text-gray-700 mb-12 leading-relaxed font-light">
            {t.heroSubtitle}
          </p>
          <div className="flex gap-5 justify-center flex-wrap">
            <button
              onClick={() => setShowForm(true)}
              className="group px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:shadow-2xl transition-all duration-300 font-bold text-lg transform hover:scale-110 hover:-translate-y-1"
            >
              <span className="flex items-center gap-2">
                {t.getEarlyAccess}
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </button>
            <button 
              onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-10 py-5 bg-white/80 backdrop-blur-sm text-gray-800 border-2 border-gray-300 rounded-full hover:bg-white hover:shadow-xl transition-all duration-300 font-bold text-lg transform hover:scale-105"
            >
              {t.learnMore}
            </button>
          </div>
          <p className="mt-8 text-sm text-gray-600 flex items-center justify-center gap-2">
            <span className="animate-pulse">✨</span>
            {t.noCommitment}
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h3 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-16">
          {t.whyVoiceVenting}
        </h3>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="group bg-white/60 backdrop-blur-lg p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/50 hover:-translate-y-2">
            <div className="text-6xl mb-6 transition-transform duration-500 group-hover:scale-125 group-hover:rotate-12">🔒</div>
            <h4 className="text-2xl font-bold text-gray-900 mb-4">
              {t.anonymous}
            </h4>
            <p className="text-gray-600 leading-relaxed">
              {t.anonymousDesc}
            </p>
          </div>
          
          <div className="group bg-white/60 backdrop-blur-lg p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/50 hover:-translate-y-2">
            <div className="text-6xl mb-6 transition-transform duration-500 group-hover:scale-125 group-hover:rotate-12">⚡</div>
            <h4 className="text-2xl font-bold text-gray-900 mb-4">
              {t.instantConnection}
            </h4>
            <p className="text-gray-600 leading-relaxed">
              {t.instantDesc}
            </p>
          </div>
          
          <div className="group bg-white/60 backdrop-blur-lg p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/50 hover:-translate-y-2">
            <div className="text-6xl mb-6 transition-transform duration-500 group-hover:scale-125 group-hover:rotate-12">💰</div>
            <h4 className="text-2xl font-bold text-gray-900 mb-4">
              {t.payAsYouGo}
            </h4>
            <p className="text-gray-600 leading-relaxed">
              {t.payAsYouGoDesc}
            </p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="relative py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/30 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <h3 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-16">
            {t.pricing}
          </h3>
          <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { time: '5 min', price: '฿20', best: false },
              { time: '15 min', price: '฿50', best: false },
              { time: '30 min', price: '฿90', best: true },
              { time: '60 min', price: '฿160', best: false },
            ].map((plan) => (
              <div
                key={plan.time}
                className={`relative bg-white/70 backdrop-blur-lg p-8 rounded-2xl transition-all duration-500 ${
                  plan.best 
                    ? 'border-2 border-purple-400 shadow-2xl transform scale-105 hover:scale-110' 
                    : 'border border-gray-200 shadow-lg hover:shadow-xl hover:scale-105'
                }`}
              >
                {plan.best && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold rounded-full shadow-lg">
                    {t.mostPopular}
                  </div>
                )}
                <div className={`text-4xl font-extrabold mb-2 ${
                  plan.best ? 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent' : 'text-gray-900'
                }`}>
                  {plan.price}
                </div>
                <div className="text-gray-600 mb-6 font-medium">{plan.time}</div>
                <button
                  onClick={() => setShowForm(true)}
                  className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
                    plan.best
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg transform hover:scale-105'
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
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h3 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-16">
          {t.howItWorks}
        </h3>
        <div className="grid md:grid-cols-4 gap-8">
          {[
            { step: '1', icon: '📱', title: t.downloadApp, desc: t.downloadAppDesc },
            { step: '2', icon: '⏱️', title: t.chooseDuration, desc: t.chooseDurationDesc },
            { step: '3', icon: '🎧', title: t.getMatched, desc: t.getMatchedDesc },
            { step: '4', icon: '💬', title: t.startTalking, desc: t.startTalkingDesc },
          ].map((item) => (
            <div key={item.step} className="text-center group">
              <div className="text-7xl mb-6 transition-all duration-500 group-hover:scale-125 group-hover:-rotate-12">
                {item.icon}
              </div>
              <div className="relative inline-block mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto shadow-lg transition-all duration-500 group-hover:rotate-12 group-hover:scale-110">
                  {item.step}
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h4>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      
      {/* CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10" />
        <div className="max-w-4xl mx-auto text-center px-4 relative">
          <h3 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
            {t.ctaTitle}
          </h3>
          <p className="text-xl text-gray-700 mb-10 leading-relaxed">
            {t.ctaSubtitle}
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="group px-12 py-5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-full hover:shadow-2xl transition-all duration-500 font-bold text-xl transform hover:scale-110 hover:-translate-y-2 relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2 justify-center">
              {t.ctaButton}
              <span className="transition-transform group-hover:translate-x-2">✨</span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </button>
          <p className="mt-6 text-sm text-gray-600 flex items-center justify-center gap-2">
            <span className="animate-pulse">🎁</span>
            {t.specialPricing}
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/20 py-10 bg-gradient-to-b from-transparent to-gray-50/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600 font-medium">{t.footer}</p>
          <p className="mt-3 text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold">
            {t.footerTagline}
          </p>
        </div>
      </footer>

      {/* Registration Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-300">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-white/50 animate-in slide-in-from-bottom duration-500">
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6 flex items-center justify-between rounded-t-3xl">
              <h2 className="text-2xl font-bold text-white">
                {t.joinWaitlistModal}
              </h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-white hover:bg-white/20 rounded-full w-10 h-10 flex items-center justify-center text-3xl transition-all duration-300 hover:rotate-90"
              >
                ×
              </button>
            </div>
            <div className="p-8">
              <RegistrationForm onSuccess={() => setShowForm(false)} />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}