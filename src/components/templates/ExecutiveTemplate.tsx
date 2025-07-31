import { ResumeData } from '../ResumeBuilder';

interface ExecutiveTemplateProps {
  data: ResumeData;
}

export const ExecutiveTemplate = ({ data }: ExecutiveTemplateProps) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  return (
    <div className="p-12 bg-white min-h-[297mm] text-gray-900 font-serif">
      <header className="mb-10 border-b-2 border-gray-400 pb-4">
        <h1 className="text-5xl font-bold tracking-wide uppercase">{data.personalInfo.fullName}</h1>
        <p className="text-2xl text-gray-700 italic mt-2">{data.personalInfo.title}</p>
        <p className="text-sm mt-2">{data.personalInfo.email} | {data.personalInfo.phone} | {data.personalInfo.website}</p>
      </header>

      {data.personalInfo.summary && (
        <section className="mb-10">
          <h2 className="text-2xl font-semibold border-l-4 border-gray-800 pl-3 mb-2">Executive Summary</h2>
          <p className="text-sm leading-relaxed text-gray-700">{data.personalInfo.summary}</p>
        </section>
      )}

      {data.experiences.length > 0 && (
        <section className="mb-10">
          <h2 className="text-2xl font-semibold border-l-4 border-gray-800 pl-3 mb-4">Professional Experience</h2>
          {data.experiences.map((exp) => (
            <div key={exp.id} className="mb-6">
              <div className="flex justify-between">
                <div>
                  <h3 className="text-lg font-bold">{exp.position}</h3>
                  <p className="text-sm text-gray-600">{exp.company}</p>
                </div>
                <span className="text-sm text-gray-600">{formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}</span>
              </div>
              {exp.description && <p className="text-sm mt-1 text-gray-700">{exp.description}</p>}
            </div>
          ))}
        </section>
      )}

      {data.education.length > 0 && (
        <section className="mb-10">
          <h2 className="text-2xl font-semibold border-l-4 border-gray-800 pl-3 mb-4">Education</h2>
          {data.education.map((edu) => (
            <div key={edu.id} className="mb-4">
              <div className="flex justify-between">
                <div>
                  <h3 className="text-lg font-bold">{edu.degree} in {edu.field}</h3>
                  <p className="text-sm text-gray-600">{edu.institution}</p>
                </div>
                <span className="text-sm text-gray-600">{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</span>
              </div>
              {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
            </div>
          ))}
        </section>
      )}

      {data.skills.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold border-l-4 border-gray-800 pl-3 mb-4">Key Skills</h2>
          <ul className="flex flex-wrap gap-3">
            {data.skills.map((skill, index) => (
              <li key={index} className="bg-gray-200 px-4 py-2 rounded-full text-sm text-gray-800">
                {skill}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};
