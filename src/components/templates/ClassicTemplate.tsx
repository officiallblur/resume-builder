import { ResumeData } from '../ResumeBuilder';

interface ClassicTemplateProps {
  data: ResumeData;
}

export const ClassicTemplate = ({ data }: ClassicTemplateProps) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  return (
    <div className="p-10 font-serif bg-white text-black min-h-[297mm]">
      <div className="border-b border-black pb-4 mb-6">
        <h1 className="text-4xl font-bold uppercase">{data.personalInfo.fullName}</h1>
        <p className="text-lg italic">{data.personalInfo.title}</p>
        <p className="text-sm mt-1">{data.personalInfo.email} | {data.personalInfo.phone} | {data.personalInfo.location}</p>
      </div>

      {data.personalInfo.summary && (
        <section className="mb-6">
          <h2 className="text-xl font-bold border-b border-gray-700 mb-2">Professional Summary</h2>
          <p className="leading-relaxed text-sm">{data.personalInfo.summary}</p>
        </section>
      )}

      {data.experiences.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold border-b border-gray-700 mb-2">Work Experience</h2>
          <ul className="space-y-4">
            {data.experiences.map((exp) => (
              <li key={exp.id}>
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-base font-semibold">{exp.position}</h3>
                    <p className="text-sm">{exp.company}</p>
                  </div>
                  <span className="text-sm">
                    {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                  </span>
                </div>
                {exp.description && <p className="text-sm mt-1">{exp.description}</p>}
              </li>
            ))}
          </ul>
        </section>
      )}

      {data.education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold border-b border-gray-700 mb-2">Education</h2>
          <ul className="space-y-4">
            {data.education.map((edu) => (
              <li key={edu.id}>
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-base font-semibold">{edu.degree} in {edu.field}</h3>
                    <p className="text-sm">{edu.institution}</p>
                  </div>
                  <span className="text-sm">{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</span>
                </div>
                {edu.gpa && <p className="text-sm">GPA: {edu.gpa}</p>}
              </li>
            ))}
          </ul>
        </section>
      )}

      {data.skills.length > 0 && (
        <section>
          <h2 className="text-xl font-bold border-b border-gray-700 mb-2">Skills</h2>
          <p className="text-sm">{data.skills.join(', ')}</p>
        </section>
      )}
    </div>
  );
};
