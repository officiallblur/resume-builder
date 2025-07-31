import { ResumeData } from '../ResumeBuilder';

interface ProfessionalTemplateProps {
  data: ResumeData;
}

export const ProfessionalTemplate = ({ data }: ProfessionalTemplateProps) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  return (
    <div className="p-8 min-h-[297mm] bg-white text-gray-900">
      {/* Header */}
      <div className="bg-gray-900 text-white p-6 -m-8 mb-8">
        <h1 className="text-3xl font-bold mb-2">
          {data.personalInfo.fullName || 'Your Name'}
        </h1>
        {data.personalInfo.title && (
          <p className="text-xl text-gray-300 mb-4">{data.personalInfo.title}</p>
        )}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            {data.personalInfo.email && <p>✉ {data.personalInfo.email}</p>}
            {data.personalInfo.phone && <p>📱 {data.personalInfo.phone}</p>}
          </div>
          <div>
            {data.personalInfo.location && <p>📍 {data.personalInfo.location}</p>}
            {data.personalInfo.website && <p>🌐 {data.personalInfo.website}</p>}
          </div>
        </div>
      </div>

      {/* Summary */}
      {data.personalInfo.summary && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-gray-300 pb-2">
            EXECUTIVE SUMMARY
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {data.personalInfo.summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {data.experiences.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-gray-300 pb-2">
            PROFESSIONAL EXPERIENCE
          </h2>
          <div className="space-y-6">
            {data.experiences.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{exp.position}</h3>
                    <p className="text-gray-700 font-semibold">{exp.company}</p>
                  </div>
                  <span className="text-sm text-gray-600 font-medium">
                    {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                  </span>
                </div>
                {exp.description && (
                  <p className="text-gray-700 text-sm leading-relaxed ml-4">
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-gray-300 pb-2">
            EDUCATION
          </h2>
          <div className="space-y-4">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      {edu.degree} in {edu.field}
                    </h3>
                    <p className="text-gray-700 font-semibold">{edu.institution}</p>
                    {edu.gpa && <p className="text-gray-600 text-sm">GPA: {edu.gpa}</p>}
                  </div>
                  <span className="text-sm text-gray-600 font-medium">
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-gray-300 pb-2">
            CORE COMPETENCIES
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {data.skills.map((skill, index) => (
              <div key={index} className="text-gray-700 text-sm font-medium bg-gray-100 p-2 rounded">
                {skill}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};