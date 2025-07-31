import { ResumeData } from '../ResumeBuilder';

interface ElegantTemplateProps {
  data: ResumeData;
}

export const ElegantTemplate = ({ data }: ElegantTemplateProps) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  return (
    <div className="p-10 min-h-[297mm] bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900 font-sans">
      <div className="grid grid-cols-4 gap-10">
        {/* Sidebar */}
        <aside className="col-span-1 bg-white p-6 rounded-xl shadow-md">
          <div className="mb-6">
            <h1 className="text-3xl font-bold leading-tight">
              {data.personalInfo.fullName || 'Your Name'}
            </h1>
            {data.personalInfo.title && <p className="text-gray-500">{data.personalInfo.title}</p>}
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-purple-700 mb-2">Contact</h3>
            <ul className="text-sm space-y-1">
              {data.personalInfo.email && <li>{data.personalInfo.email}</li>}
              {data.personalInfo.phone && <li>{data.personalInfo.phone}</li>}
              {data.personalInfo.location && <li>{data.personalInfo.location}</li>}
              {data.personalInfo.website && <li>{data.personalInfo.website}</li>}
            </ul>
          </div>

          {data.skills.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-purple-700 mb-2">Skills</h3>
              <ul className="text-sm list-disc list-inside space-y-1">
                {data.skills.map((skill, idx) => <li key={idx}>{skill}</li>)}
              </ul>
            </div>
          )}

          {(data.personalInfo.linkedin || data.personalInfo.github) && (
            <div>
              <h3 className="text-lg font-semibold text-purple-700 mb-2">Social</h3>
              <ul className="text-sm space-y-1">
                {data.personalInfo.linkedin && <li>{data.personalInfo.linkedin}</li>}
                {data.personalInfo.github && <li>{data.personalInfo.github}</li>}
              </ul>
            </div>
          )}
        </aside>

        {/* Main Section */}
        <section className="col-span-3 space-y-10">
          {data.personalInfo.summary && (
            <div>
              <h2 className="text-2xl font-bold border-b-2 border-purple-600 inline-block mb-2">Profile</h2>
              <p className="text-gray-700 leading-relaxed">{data.personalInfo.summary}</p>
            </div>
          )}

          {data.experiences.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold border-b-2 border-purple-600 inline-block mb-4">Experience</h2>
              <div className="space-y-6">
                {data.experiences.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-semibold">{exp.position}</h3>
                        <p className="text-sm text-gray-500">{exp.company}</p>
                      </div>
                      <span className="text-sm text-gray-500">
                        {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                      </span>
                    </div>
                    {exp.description && (
                      <p className="mt-2 text-sm text-gray-600 leading-relaxed">{exp.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.education.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold border-b-2 border-purple-600 inline-block mb-4">Education</h2>
              <div className="space-y-4">
                {data.education.map((edu) => (
                  <div key={edu.id} className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">{edu.degree} in {edu.field}</h3>
                      <p className="text-sm text-gray-500">{edu.institution}</p>
                      {edu.gpa && <p className="text-sm text-gray-500">GPA: {edu.gpa}</p>}
                    </div>
                    <span className="text-sm text-gray-500">
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};
