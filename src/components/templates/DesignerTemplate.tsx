import { ResumeData } from '../ResumeBuilder';

interface DesignerTemplateProps {
  data: ResumeData;
}

export const DesignerTemplate = ({ data }: DesignerTemplateProps) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  return (
    <div className="p-10 min-h-[297mm] bg-gradient-to-tr from-pink-100 via-white to-blue-100 text-gray-800 font-sans">
      <div className="grid grid-cols-4 gap-6">
        {/* Sidebar */}
        <aside className="col-span-1 bg-white p-6 rounded-lg shadow-xl">
          <h1 className="text-3xl font-bold text-pink-600 mb-1">{data.personalInfo.fullName}</h1>
          <p className="text-sm text-blue-500 mb-4">{data.personalInfo.title}</p>
          <div className="text-xs space-y-1">
            {data.personalInfo.email && <p><strong>Email:</strong> {data.personalInfo.email}</p>}
            {data.personalInfo.phone && <p><strong>Phone:</strong> {data.personalInfo.phone}</p>}
            {data.personalInfo.location && <p><strong>Location:</strong> {data.personalInfo.location}</p>}
            {data.personalInfo.website && <p><strong>Web:</strong> {data.personalInfo.website}</p>}
          </div>

          <div className="mt-6">
            <h2 className="text-sm font-bold text-pink-600 mb-2">Skills</h2>
            <ul className="flex flex-wrap gap-2">
              {data.skills.map((skill, index) => (
                <li key={index} className="bg-pink-200 text-pink-800 px-3 py-1 rounded-full text-xs">
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Main Content */}
        <section className="col-span-3 space-y-10">
          {data.personalInfo.summary && (
            <div>
              <h2 className="text-xl font-bold text-blue-600 border-b border-blue-300 pb-1 mb-2">Profile</h2>
              <p className="text-sm leading-relaxed text-gray-700">{data.personalInfo.summary}</p>
            </div>
          )}

          {data.experiences.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-blue-600 border-b border-blue-300 pb-1 mb-4">Experience</h2>
              <div className="space-y-4">
                {data.experiences.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between">
                      <div>
                        <h3 className="text-base font-semibold text-gray-900">{exp.position}</h3>
                        <p className="text-sm text-gray-600">{exp.company}</p>
                      </div>
                      <span className="text-xs text-gray-500">{formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}</span>
                    </div>
                    {exp.description && <p className="text-sm text-gray-700 mt-1">{exp.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.education.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-blue-600 border-b border-blue-300 pb-1 mb-4">Education</h2>
              <div className="space-y-4">
                {data.education.map((edu) => (
                  <div key={edu.id} className="flex justify-between">
                    <div>
                      <h3 className="text-base font-semibold text-gray-900">{edu.degree} in {edu.field}</h3>
                      <p className="text-sm text-gray-600">{edu.institution}</p>
                    </div>
                    <span className="text-xs text-gray-500">{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</span>
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
