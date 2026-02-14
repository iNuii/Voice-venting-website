'use client';

import { youtube } from 'googleapis/build/src/apis/youtube';
import { useState } from 'react';

interface FormData {
  userType: 'user' | 'listener';
  fullName: string;
  email: string;
  phone: string;
  age: string;
  occupation: string;
  interests: string[];
  urgency: string;
  referral: string;
  notifyLaunch: boolean;
  // Listener-specific fields
  experience?: string;
  availability?: string[];
  languages?: string[];
  qualifications?: string;
  motivation?: string;
}

interface RegistrationFormProps {
  onSuccess: () => void;
}

type Language = 'th' | 'en';

const translations = {
  th: {
    userType: 'ประเภทการลงทะเบียน',
    user: 'ผู้ใช้งาน (User)',
    listener: 'ผู้รับฟัง (Listener)',
    earlyAccess: '✨ รับสิทธิ์เข้าถึงก่อนใครและราคาพิเศษเมื่อเราเปิดตัว!',
    earlyAccessListener: '✨ เข้าร่วมเป็นผู้รับฟังและช่วยเหลือผู้อื่นในชุมชนของเรา!',
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
    // Listener-specific fields
    experience: 'ประสบการณ์ในการรับฟัง',
    experiencePlaceholder: 'เลือกประสบการณ์ของคุณ...',
    experienceNone: 'ไม่มีประสบการณ์ (พร้อมเรียนรู้)',
    experienceSome: 'มีประสบการณ์บ้าง (1-2 ปี)',
    experienceModerate: 'ประสบการณ์ปานกลาง (3-5 ปี)',
    experienceExtensive: 'มีประสบการณ์มาก (5+ ปี)',
    experienceProfessional: 'มืออาชีพ (นักจิตวิทยา/นักปรึกษา)',
    availability: 'ช่วงเวลาที่สะดวก (เลือกได้มากกว่า 1 ข้อ)',
    availabilityMorning: 'เช้า (6:00-12:00)',
    availabilityAfternoon: 'บ่าย (12:00-18:00)',
    availabilityEvening: 'เย็น (18:00-22:00)',
    availabilityNight: 'กลางคืน (22:00-6:00)',
    availabilityWeekend: 'วันหยุดสุดสัปดาห์',
    availabilityFlexible: 'เวลายืดหยุ่น',
    languages: 'ภาษาที่สามารถสื่อสารได้ (เลือกได้มากกว่า 1 ข้อ)',
    languageThai: 'ไทย',
    languageEnglish: 'อังกฤษ',
    qualifications: 'คุณสมบัติ/การฝึกอบรม (ถ้ามี)',
    qualificationsPlaceholder: 'ระบุวุฒิการศึกษา ใบรับรอง หรือการฝึกอบรมที่เกี่ยวข้อง...',
    motivation: 'เหตุผลที่ต้องการเป็นผู้รับฟัง',
    motivationPlaceholder: 'บอกเราว่าทำไมคุณถึงอยากเป็นผู้รับฟังใน Trusted Space...',
    submit: 'ลงทะเบียนเข้าร่วม',
    submitting: 'กำลังลงทะเบียน...',
    terms: 'การลงทะเบียนหมายถึงคุณยอมรับข้อตกลงการใช้บริการและนโยบายความเป็นส่วนตัวของเรา',
    successMessage: '🎉 ขอบคุณที่ลงทะเบียนในรายชื่อผู้รอ! เราจะแจ้งเตือนคุณเมื่อเราเปิดตัว',
    required: '*',
  },
  en: {
    userType: 'Registration Type',
    user: 'User',
    listener: 'Listener',
    earlyAccess: '✨ Get early access and special launch pricing when we go live!',
    earlyAccessListener: '✨ Join as a listener and help others in our community!',
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
    // Listener-specific fields
    experience: 'Listening Experience',
    experiencePlaceholder: 'Select your experience level...',
    experienceNone: 'No experience (willing to learn)',
    experienceSome: 'Some experience (1-2 years)',
    experienceModerate: 'Moderate experience (3-5 years)',
    experienceExtensive: 'Extensive experience (5+ years)',
    experienceProfessional: 'Professional (psychologist/counselor)',
    availability: 'Available Time Slots (Select all that apply)',
    availabilityMorning: 'Morning (6:00-12:00)',
    availabilityAfternoon: 'Afternoon (12:00-18:00)',
    availabilityEvening: 'Evening (18:00-22:00)',
    availabilityNight: 'Night (22:00-6:00)',
    availabilityWeekend: 'Weekends',
    availabilityFlexible: 'Flexible',
    languages: 'Languages You Can Communicate In (Select all that apply)',
    languageThai: 'Thai',
    languageEnglish: 'English',
    qualifications: 'Qualifications/Training (if any)',
    qualificationsPlaceholder: 'List any relevant degrees, certifications, or training...',
    motivation: 'Why do you want to be a listener?',
    motivationPlaceholder: 'Tell us why you want to be a listener on Trusted Space...',
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
    userType: 'user',
    fullName: '',
    email: '',
    phone: '',
    age: '',
    occupation: '',
    interests: [],
    urgency: '',
    referral: '',
    notifyLaunch: true,
    // Listener-specific fields
    experience: '',
    availability: [],
    languages: [],
    qualifications: '',
    motivation: '',
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
      const submissionData = {
        ...formData,
        interests: formData.interests.join(', '),
        availability: formData.availability?.join(', ') || '',
        languages: formData.languages?.join(', ') || '',
        timestamp: new Date().toISOString(),
      };

      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData),
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

  const handleAvailabilityToggle = (slot: string) => {
    setFormData({
      ...formData,
      availability: formData.availability?.includes(slot)
        ? formData.availability.filter((s) => s !== slot)
        : [...(formData.availability || []), slot],
    });
  };

  const handleLanguageToggle = (lang: string) => {
    setFormData({
      ...formData,
      languages: formData.languages?.includes(lang)
        ? formData.languages.filter((l) => l !== lang)
        : [...(formData.languages || []), lang],
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

      {/* User Type Selector */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          {t.userType} {t.required}
        </label>
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => setFormData({ ...formData, userType: 'user' })}
            className={`px-6 py-4 rounded-lg border-2 transition-all duration-300 ${
              formData.userType === 'user'
                ? 'border-blue-600 bg-blue-50 text-blue-700 font-semibold shadow-md'
                : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
            }`}
          >
            <div className="text-2xl mb-2">👤</div>
            <div>{t.user}</div>
          </button>
          <button
            type="button"
            onClick={() => setFormData({ ...formData, userType: 'listener' })}
            className={`px-6 py-4 rounded-lg border-2 transition-all duration-300 ${
              formData.userType === 'listener'
                ? 'border-blue-600 bg-blue-50 text-blue-700 font-semibold shadow-md'
                : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
            }`}
          >
            <div className="text-2xl mb-2">👂</div>
            <div>{t.listener}</div>
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
          {formData.userType === 'user' ? t.earlyAccess : t.earlyAccessListener}
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

      {/* Listener-Specific Fields */}
      {formData.userType === 'listener' && (
        <>
          {/* Experience */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.experience} {t.required}
            </label>
            <select
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              required
              className={`w-full px-4 py-2 border border-gray-600 rounded-lg
    focus:ring-2 focus:ring-blue-500 focus:border-transparent
    ${formData.experience === "" ? "text-gray-400" : "text-gray-800"}`}
            >
              <option value="">{t.experiencePlaceholder}</option>
              <option value="none">{t.experienceNone}</option>
              <option value="some">{t.experienceSome}</option>
              <option value="moderate">{t.experienceModerate}</option>
              <option value="extensive">{t.experienceExtensive}</option>
              <option value="professional">{t.experienceProfessional}</option>
            </select>
          </div>

          {/* Availability */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.availability}
            </label>
            <div className="space-y-2">
              {[
                { value: 'morning', label: t.availabilityMorning },
                { value: 'afternoon', label: t.availabilityAfternoon },
                { value: 'evening', label: t.availabilityEvening },
                { value: 'night', label: t.availabilityNight },
                { value: 'weekend', label: t.availabilityWeekend },
                { value: 'flexible', label: t.availabilityFlexible },
              ].map((slot) => (
                <label key={slot.value} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.availability?.includes(slot.value) || false}
                    onChange={() => handleAvailabilityToggle(slot.value)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{slot.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.languages} {t.required}
            </label>
            <div className="space-y-2">
              {[
                { value: 'thai', label: t.languageThai },
                { value: 'english', label: t.languageEnglish },
              ].map((lang) => (
                <label key={lang.value} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.languages?.includes(lang.value) || false}
                    onChange={() => handleLanguageToggle(lang.value)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{lang.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Qualifications */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.qualifications}
            </label>
            <textarea
              name="qualifications"
              value={formData.qualifications}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 border border-gray-600 rounded-lg
             text-gray-800 placeholder:text-gray-400
             focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder={t.qualificationsPlaceholder}
            />
          </div>

          {/* Motivation */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.motivation} {t.required}
            </label>
            <textarea
              name="motivation"
              value={formData.motivation}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-4 py-2 border border-gray-600 rounded-lg
             text-gray-800 placeholder:text-gray-400
             focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder={t.motivationPlaceholder}
            />
          </div>
        </>
      )}

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