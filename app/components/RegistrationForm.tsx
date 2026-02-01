'use client';

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

export default function RegistrationForm({ onSuccess }: RegistrationFormProps) {
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

  const interestOptions = [
    'General emotional support',
    'Stress and anxiety',
    'Relationship issues',
    'Work/life balance',
    'Loneliness',
    'Other',
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

      alert('🎉 Thank you for joining the waitlist! We\'ll notify you when we launch.');
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
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-lg">
        <p className="text-sm">
          ✨ Get early access and special launch pricing when we go live!
        </p>
      </div>

      {/* Full Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Full Name *
        </label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="John Doe"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email *
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="john@example.com"
        />
        <p className="text-xs text-gray-500 mt-1">
          We'll send you updates and launch notifications here
        </p>
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Phone Number *
        </label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="08X-XXX-XXXX"
        />
      </div>

      {/* Age */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Age *
        </label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          required
          min="18"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="25"
        />
        <p className="text-xs text-gray-500 mt-1">
          Must be 18 or older to use Voice Venting
        </p>
      </div>

      {/* Occupation */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Occupation *
        </label>
        <select
          name="occupation"
          value={formData.occupation}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Select your occupation...</option>
          <option value="student">Student</option>
          <option value="employee">Employee (Private Sector)</option>
          <option value="government">Government Employee</option>
          <option value="business-owner">Business Owner</option>
          <option value="freelancer">Freelancer</option>
          <option value="healthcare">Healthcare Professional</option>
          <option value="education">Education Professional</option>
          <option value="it-tech">IT/Tech Professional</option>
          <option value="creative">Creative/Artist</option>
          <option value="unemployed">Currently Unemployed</option>
          <option value="retired">Retired</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Interests */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          What topics interest you? (Select all that apply)
        </label>
        <div className="space-y-2">
          {interestOptions.map((interest) => (
            <label key={interest} className="flex items-center">
              <input
                type="checkbox"
                checked={formData.interests.includes(interest)}
                onChange={() => handleInterestToggle(interest)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">{interest}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Urgency */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          When would you like to start using Voice Venting? *
        </label>
        <select
          name="urgency"
          value={formData.urgency}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Select...</option>
          <option value="asap">As soon as possible</option>
          <option value="week">Within a week</option>
          <option value="month">Within a month</option>
          <option value="exploring">Just exploring</option>
        </select>
      </div>

      {/* Referral */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          How did you hear about us?
        </label>
        <input
          type="text"
          name="referral"
          value={formData.referral}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Facebook, Friend, Search, etc."
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium text-lg"
      >
        {loading ? 'Joining...' : 'Join the Waitlist'}
      </button>

      <p className="text-sm text-gray-500 text-center">
        By joining, you agree to our Terms of Service and Privacy Policy
      </p>
    </form>
  );
}