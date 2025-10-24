import React, { memo, useState, useEffect } from 'react';
import { FaPencil, FaFile } from 'react-icons/fa6';
import { useForm } from 'react-hook-form';
import { useUsers } from '../../hooks/useUsers';
import { v4 as uuidv4 } from 'uuid';

const ExperienceTab = memo(({ userId }) => {
  const { users, updateUser } = useUsers();
  const [user, setUser] = useState(null);
  const [isEditingLinkedIn, setIsEditingLinkedIn] = useState(false);
  const [isEditingResume, setIsEditingResume] = useState(false);
  const [editingExpId, setEditingExpId] = useState(null);

  const { register: registerExp, handleSubmit: handleSubmitExp, reset: resetExp } = useForm();
  const { register: registerLinkedIn, handleSubmit: handleSubmitLinkedIn, reset: resetLinkedIn } = useForm();

  useEffect(() => {
    const foundUser = users.find(u => u.id === userId);
    if (foundUser) {
      setUser(foundUser);
      setIsEditingLinkedIn(false);
      setIsEditingResume(false);
      setEditingExpId(null);
      resetLinkedIn({
        linkedinUrl: foundUser.linkedinUrl || '',
      });
    }
  }, [userId, users, resetLinkedIn]);

  const generateExperienceYears = () => {
    const years = [];
    for (let i = 1; i <= 50; i++) {
      years.push(i);
    }
    years.push('50+');
    return years;
  };

  const handleAddExperience = (data) => {
    if (user) {
      const newExperience = {
        id: uuidv4(),
        domain: data.domain || '',
        subDomain: data.subDomain || '',
        experience: data.experience || '',
      };
      const experiences = user.workExperience || [];
      updateUser(userId, {
        workExperience: [...experiences, newExperience],
      });
      resetExp({
        domain: '',
        subDomain: '',
        experience: '',
      });
      setEditingExpId(null);
    }
  };

  const handleEditExperience = (expId, data) => {
    if (user?.workExperience) {
      const updatedExperiences = user.workExperience.map(exp =>
        exp.id === expId ? { ...exp, ...data } : exp
      );
      updateUser(userId, { workExperience: updatedExperiences });
      setEditingExpId(null);
      resetExp();
    }
  };

  const handleLinkedInSubmit = (data) => {
    updateUser(userId, { linkedinUrl: data.linkedinUrl });
    setIsEditingLinkedIn(false);
  };

  const handleExperienceCancel = () => {
    resetExp();
    setEditingExpId(null);
  };

  const handleLinkedInCancel = () => {
    resetLinkedIn();
    setIsEditingLinkedIn(false);
  };

  if (!user) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  const inputClass = 'w-full px-3 py-2 bg-slate-50 border border-gray-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-violet-600';
  const inputClassView = 'text-gray-900 text-sm font-normal';
  const labelClass = 'block text-xs font-medium text-gray-700 mb-2';

  return (
    <div className="space-y-6">
      {/* Work Experience Heading - Only show once */}
      {user.workExperience && user.workExperience.length > 0 && (
        <h2 className="text-lg font-semibold text-gray-900">Work Experience</h2>
      )}

      {/* Work Experience Cards */}
      {user.workExperience && user.workExperience.length > 0 && (
        <div className="space-y-6">
          {user.workExperience.map((exp) => (
            <div key={exp.id} className="bg-white rounded-lg border border-gray-200">
              <div className="flex justify-end px-6 py-4 border-b border-gray-200 bg-gray-50">
                <button
                  onClick={() => {
                    if (editingExpId === exp.id) {
                      setEditingExpId(null);
                    } else {
                      setEditingExpId(exp.id);
                      resetExp(exp);
                    }
                  }}
                  className="p-2 rounded-md bg-violet-50 text-violet-600 hover:bg-violet-100 transition-colors"
                >
                  <FaPencil size={16} />
                </button>
              </div>

              {editingExpId !== exp.id ? (
                <div className="px-6 py-6 space-y-4">
                  <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-12">
                      <label className={labelClass}>Domain</label>
                      <p className={inputClassView}>{exp.domain || '-'}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-8">
                      <label className={labelClass}>Sub-domain</label>
                      <p className={inputClassView}>{exp.subDomain || '-'}</p>
                    </div>
                    <div className="col-span-4">
                      <label className={labelClass}>Experience</label>
                      <p className={inputClassView}>{exp.experience || '-'}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="px-6 py-6">
                  <form onSubmit={handleSubmitExp((data) => handleEditExperience(exp.id, data))} className="space-y-6">
                    <div className="grid grid-cols-12 gap-6">
                      <div className="col-span-12">
                        <label className={labelClass}>Domain</label>
                        <input
                          type="text"
                          placeholder="e.g. Technology"
                          defaultValue={exp.domain || ''}
                          {...registerExp('domain')}
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-12 gap-6">
                      <div className="col-span-8">
                        <label className={labelClass}>Sub-domain</label>
                        <input
                          type="text"
                          placeholder="e.g. MERN Stack"
                          defaultValue={exp.subDomain || ''}
                          {...registerExp('subDomain')}
                          className={inputClass}
                        />
                      </div>

                      <div className="col-span-4">
                        <label className={labelClass}>Experience</label>
                        <select
                          defaultValue={exp.experience || ''}
                          {...registerExp('experience')}
                          className={inputClass}
                        >
                          <option value="">Select experience</option>
                          {generateExperienceYears().map((year) => (
                            <option key={year} value={year}>
                              {year} {typeof year === 'number' ? 'year' : ''}{typeof year === 'number' && year > 1 ? 's' : ''}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="flex gap-3 pt-6 border-t border-gray-200">
                      <button
                        type="button"
                        onClick={handleExperienceCancel}
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
                  </form>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Add New Experience Card */}
      {(editingExpId === 'new' || !user.workExperience || user.workExperience.length === 0) && (
        <div>
          {(!user.workExperience || user.workExperience.length === 0) && (
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Work Experience</h2>
          )}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="flex justify-end px-6 py-4 border-b border-gray-200 bg-gray-50">
              {editingExpId !== 'new' && (
                <button
                  onClick={() => setEditingExpId('new')}
                  className="p-2 rounded-md bg-violet-50 text-violet-600 hover:bg-violet-100 transition-colors"
                >
                  <FaPencil size={16} />
                </button>
              )}
            </div>

            {editingExpId === 'new' && (
              <div className="px-6 py-6">
                <form onSubmit={handleSubmitExp(handleAddExperience)} className="space-y-6">
                  <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-12">
                      <label className={labelClass}>Domain</label>
                      <input
                        type="text"
                        placeholder="e.g. Technology"
                        {...registerExp('domain')}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-8">
                      <label className={labelClass}>Sub-domain</label>
                      <input
                        type="text"
                        placeholder="e.g. MERN Stack"
                        {...registerExp('subDomain')}
                        className={inputClass}
                      />
                    </div>

                    <div className="col-span-4">
                      <label className={labelClass}>Experience</label>
                      <select
                        {...registerExp('experience')}
                        className={inputClass}
                      >
                        <option value="">Select experience</option>
                        {generateExperienceYears().map((year) => (
                          <option key={year} value={year}>
                            {year} {typeof year === 'number' ? 'year' : ''}{typeof year === 'number' && year > 1 ? 's' : ''}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-6 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={handleExperienceCancel}
                      className="flex-1 py-2 px-4 border border-violet-600 text-violet-600 font-medium text-sm rounded hover:bg-violet-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2 px-4 bg-violet-600 text-white font-medium text-sm rounded hover:bg-violet-700 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Add More Button */}
      {user.workExperience && user.workExperience.length > 0 && editingExpId === null && (
        <button
          onClick={() => setEditingExpId('new')}
          className="w-full py-3 px-4 border border-violet-600 text-violet-600 font-medium text-sm rounded hover:bg-violet-50 transition-colors"
        >
          + Add More Experience
        </button>
      )}

      {/* LinkedIn & Resume Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4 bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-900">LinkedIn</h2>
            <button
              onClick={() => setIsEditingLinkedIn(!isEditingLinkedIn)}
              className="p-2 rounded-md bg-violet-50 text-violet-600 hover:bg-violet-100 transition-colors"
            >
              <FaPencil size={16} />
            </button>
          </div>

          <form onSubmit={handleSubmitLinkedIn(handleLinkedInSubmit)} className="px-6 py-6">
            <div className="space-y-6">
              <label className={labelClass}>Profile URL</label>
              {isEditingLinkedIn ? (
                <input
                  type="text"
                  placeholder="linkedin.com/in/yourprofile"
                  {...registerLinkedIn('linkedinUrl')}
                  className={inputClass}
                />
              ) : (
                <p className={inputClassView}>{user.linkedinUrl || '-'}</p>
              )}

              {isEditingLinkedIn && (
                <div className="flex gap-3 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={handleLinkedInCancel}
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

        <div className="bg-white rounded-lg border border-gray-200">
          <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4 bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-900">Resume</h2>
            <button
              onClick={() => setIsEditingResume(!isEditingResume)}
              className="p-2 rounded-md bg-violet-50 text-violet-600 hover:bg-violet-100 transition-colors"
            >
              <FaPencil size={16} />
            </button>
          </div>

          <div className="px-6 py-6">
            {isEditingResume ? (
              <div className="w-full">
                <label className={labelClass}>Upload Resume (.pdf, .doc, .docx)</label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      updateUser(userId, {
                        resume: file.name,
                      });
                      setIsEditingResume(false);
                    }
                  }}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-violet-600 cursor-pointer"
                />
              </div>
            ) : (
              <div>
                {user.resume ? (
                  <div className="flex items-center justify-between p-4 bg-slate-50 border border-gray-200 rounded">
                    <div className="flex items-center gap-3">
                      <FaFile size={20} className="text-violet-600" />
                      <p className="text-sm font-normal text-gray-900">{user.resume}</p>
                    </div>
                    <button className="px-4 py-1 text-sm font-medium text-violet-600 bg-violet-50 hover:bg-violet-100 rounded transition-colors">
                      View
                    </button>
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm text-center py-4">No resume uploaded</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

ExperienceTab.displayName = 'ExperienceTab';

export default ExperienceTab;
