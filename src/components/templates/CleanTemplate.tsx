import { ResumeData } from '../ResumeBuilder';

interface CleanTemplateProps {
  data: ResumeData;
}

export const CleanTemplate = ({ data }: CleanTemplateProps) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  return (
    <div className="min-h-[297mm] bg-white text-gray-800 font-sans p-10">
      <header className="mb-10 border-b border-gray-300 pb-4">
        <h1 className="text-3xl font-bold text-gray-900">{data.personalInfo.fullName}</h1>
        <p className="text-lg text-gray-600">{data.personalInfo.title}</p>
        <p className="text-sm text-gray-500 mt-1">
          {data.personalInfo.email} | {data.personalInfo.phone} | {data.personalInfo.website}
        </p>
      </header>

      {data.personalInfo.summary && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Summary</h2>
          <p className="text-sm leading-relaxed text-gray-600">{data.personalInfo.summary}</p>
        </section>
      )}

      {data.experiences.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-3">Experience</h2>
          <div className="space-y-5">
            {data.experiences.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-base font-semibold text-gray-900">{exp.position}</h3>
                    <p className="text-sm text-gray-500">{exp.company}</p>
                  </div>
                  <span className="text-sm text-gray-400">{formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}</span>
                </div>
                <p className="text-sm mt-1 text-gray-600">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.education.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-3">Education</h2>
          <div className="space-y-5">
            {data.education.map((edu) => (
              <div key={edu.id} className="flex justify-between">
                <div>
                  <h3 className="text-base font-semibold text-gray-900">{edu.degree} in {edu.field}</h3>
                  <p className="text-sm text-gray-500">{edu.institution}</p>
                </div>
                <span className="text-sm text-gray-400">{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.skills.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-3">Skills</h2>
          <ul className="flex flex-wrap gap-3">
            {data.skills.map((skill, index) => (
              <li key={index} className="bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-sm">
                {skill}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};
