import { ResumeData } from './ResumeBuilder';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Download, Eye, FileText } from 'lucide-react';

interface ResumePreviewProps {
  data: ResumeData;
}

export const ResumePreview = ({ data }: ResumePreviewProps) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-4">
      {/* Preview Controls */}
      <Card className="p-4 shadow-medium">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium text-foreground">Live Preview</span>
          </div>
          <div className="flex gap-2">
            <Button onClick={handlePrint} variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              Download PDF
            </Button>
          </div>
        </div>
      </Card>

      {/* Resume Preview */}
      <Card className="shadow-large bg-resume-bg">
        <div className="p-8 min-h-[297mm] bg-white" id="resume-content">
          {/* Header */}
          <div className="border-b-2 border-resume-accent pb-6 mb-6">
            <h1 className="text-3xl font-bold text-resume-text mb-2">
              {data.personalInfo.fullName || 'Your Name'}
            </h1>
            <div className="flex flex-wrap gap-4 text-sm text-resume-muted">
              {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
              {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
              {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
            </div>
          </div>

          {/* Summary */}
          {data.personalInfo.summary && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-resume-accent mb-3 uppercase tracking-wide">
                Professional Summary
              </h2>
              <p className="text-resume-text leading-relaxed">
                {data.personalInfo.summary}
              </p>
            </div>
          )}

          {/* Experience */}
          {data.experiences.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-resume-accent mb-4 uppercase tracking-wide">
                Professional Experience
              </h2>
              <div className="space-y-4">
                {data.experiences.map((exp) => (
                  <div key={exp.id} className="border-l-2 border-resume-accent pl-4">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-semibold text-resume-text">{exp.position}</h3>
                      <span className="text-sm text-resume-muted">
                        {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                      </span>
                    </div>
                    <p className="text-resume-accent font-medium mb-2">{exp.company}</p>
                    {exp.description && (
                      <p className="text-resume-text text-sm leading-relaxed">
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
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-resume-accent mb-4 uppercase tracking-wide">
                Education
              </h2>
              <div className="space-y-3">
                {data.education.map((edu) => (
                  <div key={edu.id} className="border-l-2 border-resume-accent pl-4">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-semibold text-resume-text">
                        {edu.degree} in {edu.field}
                      </h3>
                      <span className="text-sm text-resume-muted">
                        {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                      </span>
                    </div>
                    <p className="text-resume-accent font-medium">
                      {edu.institution}
                      {edu.gpa && <span className="text-resume-muted ml-2">GPA: {edu.gpa}</span>}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {data.skills.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-resume-accent mb-4 uppercase tracking-wide">
                Skills
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {data.skills.map((skill, index) => (
                  <div key={index} className="text-resume-text text-sm">
                    • {skill}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {!data.personalInfo.fullName && data.experiences.length === 0 && data.education.length === 0 && data.skills.length === 0 && (
            <div className="text-center py-16">
              <FileText className="h-16 w-16 text-resume-muted mx-auto mb-4" />
              <h3 className="text-xl font-medium text-resume-text mb-2">Your resume preview will appear here</h3>
              <p className="text-resume-muted">Start filling out the form to see your resume come to life</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};