import { ResumeData } from '../ResumeBuilder';

interface CreativeTemplateProps {
  data: ResumeData;
}

export const CreativeTemplate = ({ data }: CreativeTemplateProps) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  return (
    <div className="p-8 min-h-[297mm] bg-white">
      <div className="grid grid-cols-3 gap-8 h-full">
        {/* Left Sidebar */}
        <div className="col-span-1 bg-purple-600 text-white p-6 -m-8 mr-0">
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2">
              {data.personalInfo.fullName || 'Your Name'}
            </h1>
            {data.personalInfo.title && (
              <p className="text-purple-200">{data.personalInfo.title}</p>
            )}
          </div>

          {/* Contact */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 text-purple-200">Contact</h3>
            <div className="space-y-2 text-sm">
              {data.personalInfo.email && <p>{data.personalInfo.email}</p>}
              {data.personalInfo.phone && <p>{data.personalInfo.phone}</p>}
              {data.personalInfo.location && <p>{data.personalInfo.location}</p>}
              {data.personalInfo.website && <p>{data.personalInfo.website}</p>}
            </div>
          </div>

          {/* Social Links */}
          {(data.personalInfo.linkedin || data.personalInfo.github || data.personalInfo.twitter || data.personalInfo.portfolio) && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 text-purple-200">Social</h3>
              <div className="space-y-2 text-sm">
                {data.personalInfo.linkedin && <p>{data.personalInfo.linkedin}</p>}
                {data.personalInfo.github && <p>{data.personalInfo.github}</p>}
                {data.personalInfo.twitter && <p>{data.personalInfo.twitter}</p>}
                {data.personalInfo.portfolio && <p>{data.personalInfo.portfolio}</p>}
              </div>
            </div>
          )}

          {/* Skills */}
          {data.skills.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4 text-purple-200">Skills</h3>
              <div className="space-y-2">
                {data.skills.map((skill, index) => (
                  <div key={index} className="text-sm bg-purple-700 p-2 rounded">
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="col-span-2 text-gray-800">
          {/* Summary */}
          {data.personalInfo.summary && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-purple-600 mb-4">About Me</h2>
              <p className="text-gray-700 leading-relaxed">
                {data.personalInfo.summary}
              </p>
            </div>
          )}

          {/* Experience */}
          {data.experiences.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-purple-600 mb-4">Experience</h2>
              <div className="space-y-6">
                {data.experiences.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{exp.position}</h3>
                        <p className="text-purple-600 font-medium">{exp.company}</p>
                      </div>
                      <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded">
                        {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                      </span>
                    </div>
                    {exp.description && (
                      <p className="text-gray-700 text-sm leading-relaxed">
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
            <div>
              <h2 className="text-2xl font-bold text-purple-600 mb-4">Education</h2>
              <div className="space-y-4">
                {data.education.map((edu) => (
                  <div key={edu.id}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {edu.degree} in {edu.field}
                        </h3>
                        <p className="text-purple-600 font-medium">{edu.institution}</p>
                        {edu.gpa && <p className="text-gray-600 text-sm">GPA: {edu.gpa}</p>}
                      </div>
                      <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded">
                        {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};