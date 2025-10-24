import React, { memo, useMemo, useState, useEffect } from 'react';
import { FaPencil } from 'react-icons/fa6';
import { useForm } from 'react-hook-form';
import { useUsers } from '../../hooks/useUsers';

const EducationSkillsTab = memo(({ userId }) => {
  const { users, updateUser } = useUsers();
  const [isEditingEdu, setIsEditingEdu] = useState(false);
  const [isEditingSkills, setIsEditingSkills] = useState(false);
  const [user, setUser] = useState(null);

  const { register: registerEdu, handleSubmit: handleSubmitEdu, reset: resetEdu } = useForm();
  const { register: registerSkills, handleSubmit: handleSubmitSkills, reset: resetSkills } = useForm();

  // Get user data
  useEffect(() => {
    const foundUser = users.find(u => u.id === userId);
    if (foundUser) {
      setUser(foundUser);
      setIsEditingEdu(false);
      setIsEditingSkills(false);
      resetEdu({
        school: foundUser.school || '',
        degree: foundUser.degree || '',
        course: foundUser.course || '',
        yearOfCompletion: foundUser.yearOfCompletion || '',
        grade: foundUser.grade || '',
      });
      resetSkills({
        skills: foundUser.skills || '',
        projects: foundUser.projects || '',
      });
    }
  }, [userId, users, resetEdu, resetSkills]);

  const educationFields = useMemo(() => [
    { name: 'school', label: 'School / College', placeholder: 'e.g. Lincoln College' },
    { name: 'degree', label: 'Highest degree or equivalent', placeholder: 'e.g. Bachelors in Technology' },
    { name: 'course', label: 'Course', placeholder: 'e.g. Computer science engineering' },
    { name: 'yearOfCompletion', label: 'Year of completion', placeholder: 'YYYY' },
    { name: 'grade', label: 'Grade', placeholder: 'Enter here' },
  ], []);

  const skillsFields = useMemo(() => [
    { name: 'skills', label: 'Skills', placeholder: 'Enter here' },
    { name: 'projects', label: 'Projects', placeholder: 'Enter here' },
  ], []);

  const handleEduSubmit = (data) => {
    updateUser(userId, data);
    setIsEditingEdu(false);
  };

  const handleSkillsSubmit = (data) => {
    updateUser(userId, data);
    setIsEditingSkills(false);
  };

  const handleEduCancel = () => {
    resetEdu();
    setIsEditingEdu(false);
  };

  const handleSkillsCancel = () => {
    resetSkills();
    setIsEditingSkills(false);
  };

  if (!user) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  // Generate years from 1990 to 2030
  const generateYears = () => {
    const years = [];
    for (let year = 2030; year >= 1990; year--) {
      years.push(year);
    }
    return years;
  };

  const inputClassEditing = 'w-full px-3 py-2 bg-slate-50 border border-gray-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-violet-600';
  const inputClassView = 'text-gray-900 text-sm font-normal';
  const labelClass = 'block text-xs font-medium text-gray-700 mb-2';
  const textareaClass = 'w-full px-3 py-2 bg-slate-50 border border-gray-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-violet-600 resize-none';
  const selectClass = 'w-full px-3 py-2 bg-slate-50 border border-gray-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-violet-600';

  return (
    <div className="space-y-6">
      {/* Education Details Card */}
      <div className="bg-white rounded-lg border border-gray-200">
        {/* Card Header */}
        <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4 bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-900">Education Details</h2>
          <button
            onClick={() => setIsEditingEdu(!isEditingEdu)}
            className="p-2 rounded-md bg-violet-50 text-violet-600 hover:bg-violet-100 transition-colors"
          >
            <FaPencil size={16} />
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmitEdu(handleEduSubmit)} className="px-6 py-6">
          <div className="space-y-6">
            {/* Row 1: School & Degree (2 columns) */}
            <div className="grid grid-cols-12 gap-6">
              {/* School / College */}
              <div className="col-span-6">
                <label className={labelClass}>School / College</label>
                {isEditingEdu ? (
                  <input
                    type="text"
                    placeholder="e.g. Lincoln College"
                    {...registerEdu('school')}
                    className={inputClassEditing}
                  />
                ) : (
                  <p className={inputClassView}>{user.school || '-'}</p>
                )}
              </div>

              {/* Degree */}
              <div className="col-span-6">
                <label className={labelClass}>Highest degree or equivalent</label>
                {isEditingEdu ? (
                  <input
                    type="text"
                    placeholder="e.g. Bachelors in Technology"
                    {...registerEdu('degree')}
                    className={inputClassEditing}
                  />
                ) : (
                  <p className={inputClassView}>{user.degree || '-'}</p>
                )}
              </div>
            </div>

            {/* Row 2: Course, Year of Completion, Grade (3 columns) */}
            <div className="grid grid-cols-12 gap-6">
              {/* Course */}
              <div className="col-span-6">
                <label className={labelClass}>Course</label>
                {isEditingEdu ? (
                  <input
                    type="text"
                    placeholder="e.g. Computer science engineering"
                    {...registerEdu('course')}
                    className={inputClassEditing}
                  />
                ) : (
                  <p className={inputClassView}>{user.course || '-'}</p>
                )}
              </div>

              {/* Year of Completion */}
              <div className="col-span-3">
                <label className={labelClass}>Year of completion</label>
                {isEditingEdu ? (
                  <select
                    {...registerEdu('yearOfCompletion')}
                    className={selectClass}
                  >
                    <option value="">Select year</option>
                    {generateYears().map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                ) : (
                  <p className={inputClassView}>{user.yearOfCompletion || '-'}</p>
                )}
              </div>

              {/* Grade */}
              <div className="col-span-3">
                <label className={labelClass}>Grade</label>
                {isEditingEdu ? (
                  <input
                    type="text"
                    placeholder="Enter here"
                    {...registerEdu('grade')}
                    className={inputClassEditing}
                  />
                ) : (
                  <p className={inputClassView}>{user.grade || '-'}</p>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            {isEditingEdu && (
              <div className="flex gap-3 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={handleEduCancel}
                  className="flex-1 py-2 px-4 border border-violet-600 text-violet-600 font-medium text-sm rounded hover:bg-violet-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 px-4 bg-violet-600 text-white font-medium text-sm rounded hover:bg-violet-700 transition-colors"
                >
                  Save
                </button>
              </div>
            )}
          </div>
        </form>
      </div>

      {/* Skills & Projects Card */}
      <div className="bg-white rounded-lg border border-gray-200">
        {/* Card Header */}
        <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4 bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-900">Skills & Projects</h2>
          <button
            onClick={() => setIsEditingSkills(!isEditingSkills)}
            className="p-2 rounded-md bg-violet-50 text-violet-600 hover:bg-violet-100 transition-colors"
          >
            <FaPencil size={16} />
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmitSkills(handleSkillsSubmit)} className="px-6 py-6">
          <div className="space-y-6">
            {/* Skills & Projects (2 columns) */}
            <div className="grid grid-cols-12 gap-6">
              {/* Skills */}
              <div className="col-span-6">
                <label className={labelClass}>Skills</label>
                {isEditingSkills ? (
                  <textarea
                    placeholder="Enter here"
                    {...registerSkills('skills')}
                    rows="4"
                    className={textareaClass}
                  />
                ) : (
                  <p className={`${inputClassView} whitespace-pre-wrap`}>{user.skills || '-'}</p>
                )}
              </div>

              {/* Projects */}
              <div className="col-span-6">
                <label className={labelClass}>Projects</label>
                {isEditingSkills ? (
                  <textarea
                    placeholder="Enter here"
                    {...registerSkills('projects')}
                    rows="4"
                    className={textareaClass}
                  />
                ) : (
                  <p className={`${inputClassView} whitespace-pre-wrap`}>{user.projects || '-'}</p>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            {isEditingSkills && (
              <div className="flex gap-3 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={handleSkillsCancel}
                  className="flex-1 py-2 px-4 border border-violet-600 text-violet-600 font-medium text-sm rounded hover:bg-violet-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 px-4 bg-violet-600 text-white font-medium text-sm rounded hover:bg-violet-700 transition-colors"
                >
                  Save
                </button>
              </div>
            )}
          </div>
        </form>
      </div>

    </div>
  );
});

EducationSkillsTab.displayName = 'EducationSkillsTab';

export default EducationSkillsTab;