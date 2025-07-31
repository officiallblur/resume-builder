import { ResumeData } from '../ResumeBuilder';

interface AcademicTemplateProps {
  data: ResumeData;
}

export const AcademicTemplate = ({ data }: AcademicTemplateProps) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  return (
    <div className="p-12 bg-white text-gray-900 font-serif min-h-[297mm]">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold uppercase">{data.personalInfo.fullName}</h1>
        <p className="text-xl text-gray-600 italic">{data.personalInfo.title}</p>
        <p className="text-sm mt-2">{data.personalInfo.email} | {data.personalInfo.phone} | {data.personalInfo.website}</p>
      </header>

      {data.personalInfo.summary && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold border-b border-gray-400 mb-2">Research Summary</h2>
          <p className="text-sm leading-relaxed text-gray-700">{data.personalInfo.summary}</p>
        </section>
      )}

      {data.education.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold border-b border-gray-400 mb-2">Academic Background</h2>
          {data.education.map((edu) => (
            <div key={edu.id} className="mb-4">
              <div className="flex justify-between">
                <div>
                  <p className="text-base font-medium">{edu.degree} in {edu.field}</p>
                  <p className="text-sm text-gray-600">{edu.institution}</p>
                  {edu.gpa && <p className="text-sm text-gray-500">GPA: {edu.gpa}</p>}
                </div>
                <span className="text-sm text-gray-600">{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</span>
              </div>
            </div>
          ))}
        </section>
      )}

      {data.experiences.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold border-b border-gray-400 mb-2">Teaching & Research Experience</h2>
          {data.experiences.map((exp) => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between">
                <div>
                  <p className="text-base font-medium">{exp.position}</p>
                  <p className="text-sm text-gray-600">{exp.company}</p>
                </div>
                <span className="text-sm text-gray-600">{formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      {data.skills.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold border-b border-gray-400 mb-2">Academic Skills</h2>
          <ul className="list-disc list-inside text-sm">
            {data.skills.map((skill, idx) => (
              <li key={idx}>{skill}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};
