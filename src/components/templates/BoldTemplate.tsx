import { ResumeData } from '../ResumeBuilder';

interface BoldTemplateProps {
  data: ResumeData;
}

export const BoldTemplate = ({ data }: BoldTemplateProps) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  return (
    <div className="p-10 min-h-[297mm] bg-black text-white font-bold">
      <header className="mb-8 border-b-4 border-yellow-400 pb-4">
        <h1 className="text-5xl uppercase tracking-wide">{data.personalInfo.fullName}</h1>
        <p className="text-2xl text-yellow-400 mt-2">{data.personalInfo.title}</p>
        <div className="mt-4 space-x-4 text-sm">
          <span>{data.personalInfo.email}</span>
          <span>{data.personalInfo.phone}</span>
          <span>{data.personalInfo.website}</span>
        </div>
      </header>

      {data.personalInfo.summary && (
        <section className="mb-10">
          <h2 className="text-xl text-yellow-300 mb-2">Summary</h2>
          <p className="text-sm font-normal leading-relaxed text-gray-300">{data.personalInfo.summary}</p>
        </section>
      )}

      {data.experiences.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl text-yellow-300 mb-4">Experience</h2>
          {data.experiences.map((exp) => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between">
                <div>
                  <h3 className="text-lg">{exp.position}</h3>
                  <p className="text-sm text-gray-400">{exp.company}</p>
                </div>
                <span className="text-sm">{formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}</span>
              </div>
              <p className="text-sm text-gray-400 mt-1 font-normal">{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      {data.education.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl text-yellow-300 mb-4">Education</h2>
          {data.education.map((edu) => (
            <div key={edu.id} className="mb-4">
              <div className="flex justify-between">
                <div>
                  <h3 className="text-lg">{edu.degree} in {edu.field}</h3>
                  <p className="text-sm text-gray-400">{edu.institution}</p>
                </div>
                <span className="text-sm">{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</span>
              </div>
              {edu.gpa && <p className="text-sm text-gray-400">GPA: {edu.gpa}</p>}
            </div>
          ))}
        </section>
      )}

      {data.skills.length > 0 && (
        <section>
          <h2 className="text-xl text-yellow-300 mb-4">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <span key={index} className="bg-yellow-400 text-black px-3 py-1 rounded-full text-xs">
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
