import { ResumeData } from '../ResumeBuilder';

interface MinimalTemplateProps {
  data: ResumeData;
}

export const MinimalTemplate = ({ data }: MinimalTemplateProps) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  return (
    <div className="p-8 min-h-[297mm] bg-white text-gray-800">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-light text-gray-900 mb-2">
          {data.personalInfo.fullName || 'Your Name'}
        </h1>
        {data.personalInfo.title && (
          <p className="text-lg text-gray-600 mb-4">{data.personalInfo.title}</p>
        )}
        <div className="text-sm text-gray-500 space-y-1">
          <div className="flex justify-center gap-6">
            {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
            {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
          </div>
          <div className="flex justify-center gap-6">
            {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
            {data.personalInfo.website && <span>{data.personalInfo.website}</span>}
          </div>
        </div>
      </div>

      {/* Summary */}
      {data.personalInfo.summary && (
        <div className="mb-8">
          <p className="text-gray-700 leading-relaxed text-center italic">
            {data.personalInfo.summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {data.experiences.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-light text-gray-900 mb-6 text-center">
            Experience
          </h2>
          <div className="space-y-6">
            {data.experiences.map((exp) => (
              <div key={exp.id} className="text-center">
                <h3 className="font-medium text-gray-900">{exp.position}</h3>
                <p className="text-gray-600 mb-1">{exp.company}</p>
                <p className="text-sm text-gray-500 mb-3">
                  {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                </p>
                {exp.description && (
                  <p className="text-gray-700 text-sm leading-relaxed max-w-2xl mx-auto">
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
          <h2 className="text-xl font-light text-gray-900 mb-6 text-center">
            Education
          </h2>
          <div className="space-y-4">
            {data.education.map((edu) => (
              <div key={edu.id} className="text-center">
                <h3 className="font-medium text-gray-900">
                  {edu.degree} in {edu.field}
                </h3>
                <p className="text-gray-600">{edu.institution}</p>
                <p className="text-sm text-gray-500">
                  {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  {edu.gpa && <span className="ml-2">GPA: {edu.gpa}</span>}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-light text-gray-900 mb-6 text-center">
            Skills
          </h2>
          <div className="text-center">
            <p className="text-gray-700">
              {data.skills.join(' • ')}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};