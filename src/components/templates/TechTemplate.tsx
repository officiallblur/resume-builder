import { ResumeData } from '../ResumeBuilder';

interface TechTemplateProps {
  data: ResumeData;
}

export const TechTemplate = ({ data }: TechTemplateProps) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  return (
    <div className="p-10 min-h-[297mm] bg-gray-950 text-white font-mono">
      <header className="mb-8 border-b border-gray-700 pb-4">
        <h1 className="text-4xl font-bold text-cyan-400">{data.personalInfo.fullName}</h1>
        <p className="text-xl text-gray-300">{data.personalInfo.title}</p>
        <p className="text-sm text-gray-400 mt-1">
          {data.personalInfo.email} | {data.personalInfo.phone} | {data.personalInfo.website}
        </p>
      </header>

      {data.personalInfo.summary && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-cyan-400 mb-2">Tech Profile</h2>
          <p className="text-sm text-gray-300 leading-relaxed">{data.personalInfo.summary}</p>
        </section>
      )}

      {data.experiences.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-cyan-400 mb-3">Experience</h2>
          {data.experiences.map((exp) => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between">
                <div>
                  <p className="text-base text-white font-bold">{exp.position}</p>
                  <p className="text-sm text-gray-400">{exp.company}</p>
                </div>
                <span className="text-sm text-gray-400">{formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}</span>
              </div>
              <p className="text-sm text-gray-300 mt-1">{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      {data.skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-cyan-400 mb-3">Skills & Technologies</h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <span key={index} className="bg-cyan-700 text-white px-3 py-1 rounded-full text-xs">
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {data.education.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold text-cyan-400 mb-3">Education</h2>
          {data.education.map((edu) => (
            <div key={edu.id} className="mb-3">
              <div className="flex justify-between">
                <div>
                  <p className="text-base font-semibold text-white">{edu.degree} in {edu.field}</p>
                  <p className="text-sm text-gray-400">{edu.institution}</p>
                </div>
                <span className="text-sm text-gray-400">{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</span>
              </div>
              {edu.gpa && <p className="text-sm text-gray-400">GPA: {edu.gpa}</p>}
            </div>
          ))}
        </section>
      )}
    </div>
  );
};
