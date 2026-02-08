'use client';

import { youtube } from 'googleapis/build/src/apis/youtube';
import { useState } from 'react';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  age: string;
  occupation: string;
  interests: string[];
  urgency: string;
  referral: string;
  notifyLaunch: boolean;
}

interface RegistrationFormProps {
  onSuccess: () => void;
}

type Language = 'th' | 'en';

const translations = {
  th: {
    earlyAccess: '✨ รับสิทธิ์เข้าถึงก่อนใครและราคาพิเศษเมื่อเราเปิดตัว!',
    fullName: 'ชื่อ-นามสกุล',
    fullNamePlaceholder: 'สมชาย ใจดี',
    email: 'อีเมล',
    emailPlaceholder: 'example@email.com',
    emailHelp: 'เราจะส่งการอัปเดตและการแจ้งเตือนการเปิดตัวมาที่นี่',
    phone: 'หมายเลขโทรศัพท์',
    age: 'อายุ',
    ageHelp: 'ต้องมีอายุ 18 ปีขึ้นไปเพื่อใช้ Trusted Space',
    occupation: 'อาชีพ',
    occupationPlaceholder: 'เลือกอาชีพของคุณ...',
    student: 'นักเรียน/นักศึกษา',
    employee: 'พนักงานบริษัท (ภาคเอกชน)',
    government: 'ข้าราชการ',
    businessOwner: 'เจ้าของธุรกิจ',
    freelancer: 'ฟรีแลนซ์',
    healthcare: 'บุคลากรทางการแพทย์',
    education: 'บุคลากรทางการศึกษา',
    itTech: 'นักเทคโนโลยี/ไอที',
    creative: 'นักสร้างสรรค์/ศิลปิน',
    unemployed: 'ว่างงาน',
    retired: 'เกษียณ',
    other: 'อื่นๆ',
    interests: 'หัวข้อที่คุณสนใจ? (เลือกได้มากกว่า 1 ข้อ)',
    interestGeneral: 'การสนับสนุนทางอารมณ์ทั่วไป',
    interestStress: 'ความเครียดและความวิตกกังวล',
    interestRelationship: 'ปัญหาความสัมพันธ์',
    interestWorkLife: 'สมดุลชีวิตและการงาน',
    interestLoneliness: 'ความเหงา',
    interestOther: 'อื่นๆ',
    urgency: 'คุณต้องการเริ่มใช้ Trusted Space เมื่อไหร่?',
    urgencyPlaceholder: 'เลือก...',
    urgencyAsap: 'เร็วที่สุดเท่าที่จะเป็นไปได้',
    urgencyWeek: 'ภายใน 1 สัปดาห์',
    urgencyMonth: 'ภายใน 1 เดือน',
    urgencyExploring: 'แค่อยากรู้จัก',
    referral: 'คุณรู้จักเราได้อย่างไร?',
    referralPlaceholder: 'คุณรู้จักเราได้อย่างไร? Facebook, เพื่อน, ค้นหาทาง Google ฯลฯ',
    facebook: 'Facebook',
    youtube: 'YouTube',
    friend: 'เพื่อน',
    google: 'ค้นหาทาง Google',
    website: 'เว็บไซต์',
    socialMedia: 'โซเชียลมีเดีย',
    advertisement: 'โฆษณา',
    otherReferral: 'อื่นๆ',
    submit: 'ลงทะเบียนเข้าร่วม',
    submitting: 'กำลังลงทะเบียน...',
    terms: 'การลงทะเบียนหมายถึงคุณยอมรับข้อตกลงการใช้บริการและนโยบายความเป็นส่วนตัวของเรา',
    successMessage: '🎉 ขอบคุณที่ลงทะเบียนในรายชื่อผู้รอ! เราจะแจ้งเตือนคุณเมื่อเราเปิดตัว',
    required: '*',
  },
  en: {
    earlyAccess: '✨ Get early access and special launch pricing when we go live!',
    fullName: 'Full Name',
    fullNamePlaceholder: 'John Doe',
    email: 'Email',
    emailPlaceholder: 'john@example.com',
    emailHelp: 'We\'ll send you updates and launch notifications here',
    phone: 'Phone Number',
    age: 'Age',
    ageHelp: 'Must be 18 or older to use Trusted Space',
    occupation: 'Occupation',
    occupationPlaceholder: 'Select your occupation...',
    student: 'Student',
    employee: 'Employee (Private Sector)',
    government: 'Government Employee',
    businessOwner: 'Business Owner',
    freelancer: 'Freelancer',
    healthcare: 'Healthcare Professional',
    education: 'Education Professional',
    itTech: 'IT/Tech Professional',
    creative: 'Creative/Artist',
    unemployed: 'Currently Unemployed',
    retired: 'Retired',
    other: 'Other',
    interests: 'What topics interest you? (Select all that apply)',
    interestGeneral: 'General emotional support',
    interestStress: 'Stress and anxiety',
    interestRelationship: 'Relationship issues',
    interestWorkLife: 'Work/life balance',
    interestLoneliness: 'Loneliness',
    interestOther: 'Other',
    urgency: 'When would you like to start using Trusted Space?',
    urgencyPlaceholder: 'Select...',
    urgencyAsap: 'As soon as possible',
    urgencyWeek: 'Within a week',
    urgencyMonth: 'Within a month',
    urgencyExploring: 'Just exploring',
    referral: 'How did you hear about us?',
    referralPlaceholder: 'How did you hear about us? Facebook, friends, Google search, etc.',
    facebook: 'Facebook',
    youtube: 'YouTube',
    friend: 'Friend',
    google: 'Google Search',
    website: 'Website',
    socialMedia: 'Social Media',
    advertisement: 'Advertisement',
    otherReferral: 'Other',
    submit: 'Join the Waitlist',
    submitting: 'Joining...',
    terms: 'By joining, you agree to our Terms of Service and Privacy Policy',
    successMessage: '🎉 Thank you for joining the waitlist! We\'ll notify you when we launch.',
    required: '*',
  },
};

export default function RegistrationForm({ onSuccess }: RegistrationFormProps) {
  const [language, setLanguage] = useState<Language>('th');
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    age: '',
    occupation: '',
    interests: [],
    urgency: '',
    referral: '',
    notifyLaunch: true,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const t = translations[language];

  const interestOptions = [
    { value: 'general', label: { th: t.interestGeneral, en: translations.en.interestGeneral } },
    { value: 'stress', label: { th: t.interestStress, en: translations.en.interestStress } },
    { value: 'relationship', label: { th: t.interestRelationship, en: translations.en.interestRelationship } },
    { value: 'worklife', label: { th: t.interestWorkLife, en: translations.en.interestWorkLife } },
    { value: 'loneliness', label: { th: t.interestLoneliness, en: translations.en.interestLoneliness } },
    { value: 'other', label: { th: t.interestOther, en: translations.en.interestOther } },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          interests: formData.interests.join(', '),
          timestamp: new Date().toISOString(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Submission failed');
      }

      alert(t.successMessage);
      onSuccess();
    } catch (err: any) {
      setError(err.message || 'Failed to submit');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleInterestToggle = (interest: string) => {
    setFormData({
      ...formData,
      interests: formData.interests.includes(interest)
        ? formData.interests.filter((i) => i !== interest)
        : [...formData.interests, interest],
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Language Switcher */}
      <div className="flex justify-end">
        <div className="relative inline-flex items-center bg-white/80 backdrop-blur-sm rounded-full p-1 shadow-sm border border-gray-200">
          <button
            type="button"
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
            type="button"
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
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-lg">
        <p className="text-sm">
          {t.earlyAccess}
        </p>
      </div>

      {/* Full Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t.fullName} {t.required}
        </label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-600 rounded-lg
             text-gray-800 placeholder:text-gray-400
             focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder={t.fullNamePlaceholder}
        />

      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t.email} {t.required}
        </label>
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-600 rounded-lg
             text-gray-800 placeholder:text-gray-400
             focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder={t.emailPlaceholder}
        />
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t.phone} {t.required}
        </label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-600 rounded-lg
             text-gray-800 placeholder:text-gray-400
             focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="08X-XXX-XXXX"
        />
      </div>

      {/* Age */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t.age} {t.required}
        </label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          required
          min="18"
          className="w-full px-4 py-2 border border-gray-600 rounded-lg
             text-gray-800 placeholder:text-gray-400
             focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="25"
        />
        <p className="text-xs text-gray-500 mt-1">
          {t.ageHelp}
        </p>
      </div>

      {/* Occupation */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t.occupation} {t.required}
        </label>
        <select
          name="occupation"
          value={formData.occupation}
          onChange={handleChange}
          required
          className={`w-full px-4 py-2 border border-gray-600 rounded-lg
    focus:ring-2 focus:ring-blue-500 focus:border-transparent
    ${formData.occupation === "" ? "text-gray-400" : "text-gray-800"}`}
        >
          <option value="">{t.occupationPlaceholder}</option>
          <option value="student">{t.student}</option>
          <option value="employee">{t.employee}</option>
          <option value="government">{t.government}</option>
          <option value="business-owner">{t.businessOwner}</option>
          <option value="freelancer">{t.freelancer}</option>
          <option value="healthcare">{t.healthcare}</option>
          <option value="education">{t.education}</option>
          <option value="it-tech">{t.itTech}</option>
          <option value="creative">{t.creative}</option>
          <option value="unemployed">{t.unemployed}</option>
          <option value="retired">{t.retired}</option>
          <option value="other">{t.other}</option>
        </select>
      </div>

      {/* Interests */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t.interests}
        </label>
        <div className="space-y-2">
          {interestOptions.map((interest) => (
            <label key={interest.value} className="flex items-center">
              <input
                type="checkbox"
                checked={formData.interests.includes(interest.value)}
                onChange={() => handleInterestToggle(interest.value)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">{interest.label[language]}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Urgency */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t.urgency} {t.required}
        </label>
        <select
          name="urgency"
          value={formData.urgency}
          onChange={handleChange}
          required
          className={`w-full px-4 py-2 border border-gray-600 rounded-lg
    focus:ring-2 focus:ring-blue-500 focus:border-transparent
    ${formData.urgency === "" ? "text-gray-400" : "text-gray-800"}`}
        >
          <option value="">{t.urgencyPlaceholder}</option>
          <option value="asap">{t.urgencyAsap}</option>
          <option value="week">{t.urgencyWeek}</option>
          <option value="month">{t.urgencyMonth}</option>
          <option value="exploring">{t.urgencyExploring}</option>
        </select>
      </div>

      {/* Referral */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t.referral}
        </label>
        <select
          name="referral"
          value={formData.referral}
          onChange={handleChange}
          required
          className={`w-full px-4 py-2 border border-gray-600 rounded-lg
    focus:ring-2 focus:ring-blue-500 focus:border-transparent
    ${formData.referral === "" ? "text-gray-400" : "text-gray-800"}`}
        >
          <option value="">{t.referralPlaceholder}</option>
          <option value="Facebook">{t.facebook}</option>
          <option value="YouTube">{t.youtube}</option>
          <option value="Friend">{t.friend}</option>
          <option value="Google Search">{t.google}</option>
          <option value="Website">{t.website}</option>
          <option value="Social Media">{t.socialMedia}</option>
          <option value="Advertisement">{t.advertisement}</option>
          <option value="other">{t.other}</option>
        </select>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium text-lg"
      >
        {loading ? t.submitting : t.submit}
      </button>

      <p className="text-sm text-gray-500 text-center">
        {t.terms}
      </p>
    </form>
  );
}