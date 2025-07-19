import React, { useState, useEffect } from 'react';

const UpdateProfile: React.FC = () => {
  const [formData, setFormData] = useState({
    height: '',
    weight: '',
    bmi: '',
  });

  // Calculate BMI when height or weight changes
  useEffect(() => {
    const heightInMeters = parseFloat(formData.height) / 100;
    const weightInKg = parseFloat(formData.weight);

    if (heightInMeters > 0 && weightInKg > 0) {
      const bmi = (weightInKg / (heightInMeters * heightInMeters)).toFixed(2);
      setFormData((prev) => ({ ...prev, bmi }));
    } else {
      setFormData((prev) => ({ ...prev, bmi: '' }));
    }
  }, [formData.height, formData.weight]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Updated Profile:', formData);
    // Add API call logic here
  };

  const isFormValid = formData.height !== '' && formData.weight !== '' && formData.bmi !== '';

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">Update Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Height (cm)</label>
          <input
            type="number"
            name="height"
            value={formData.height}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Weight (kg)</label>
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">BMI</label>
          <input
            type="text"
            name="bmi"
            value={formData.bmi}
            readOnly
            className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <button
          type="submit"
          disabled={!isFormValid}
          className={`w-full py-2 px-4 font-semibold rounded-md transition duration-200 ${
            isFormValid
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-400 text-gray-200 cursor-not-allowed'
          }`}
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
