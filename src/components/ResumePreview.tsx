import { ResumeData } from './ResumeBuilder';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Download, Eye, FileText, Palette } from 'lucide-react';
import { ModernTemplate } from './templates/ModernTemplate';
import { MinimalTemplate } from './templates/MinimalTemplate';
import { CreativeTemplate } from './templates/CreativeTemplate';
import { ProfessionalTemplate } from './templates/ProfessionalTemplate';
import {ElegantTemplate } from './templates/ElegantTemplate';
import { AcademicTemplate } from './templates/AcademicTemplate';
import { DesignerTemplate } from './templates/DesignerTemplate';
import { ClassicTemplate } from './templates/ClassicTemplate';
import { BoldTemplate } from './templates/BoldTemplate';
import {CleanTemplate } from './templates/CleanTemplate';
import { ExecutiveTemplate } from './templates/ExecutiveTemplate';
import { TechTemplate } from './templates/TechTemplate';



interface ResumePreviewProps {
  data: ResumeData;
  onTemplateChange: (template: string) => void;
}

export const ResumePreview = ({ data, onTemplateChange }: ResumePreviewProps) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  const handlePrint = () => {
    window.print();
  };

  const templates = [
    { id: 'modern', name: 'Modern' },
    { id: 'minimal', name: 'Minimal' },
    { id: 'creative', name: 'Creative' },
    { id: 'professional', name: 'Professional' },
    { id: 'classic', name: 'Classic' },
    { id: 'elegant', name: 'Elegant' },
    { id: 'bold', name: 'Bold' },
    { id: 'clean', name: 'Clean' },
    { id: 'executive', name: 'Executive' },
    { id: 'tech', name: 'Tech' },
    { id: 'academic', name: 'Academic' },
    { id: 'designer', name: 'Designer' }
  ];

  const renderTemplate = () => {
    switch (data.selectedTemplate) {
      case 'minimal':
        return <MinimalTemplate data={data} />;
      case 'creative':
        return <CreativeTemplate data={data} />;
      case 'professional':
        return <ProfessionalTemplate data={data} />;
        case 'elegant':
        return <ElegantTemplate data={data} />;
        case 'academic':
        return <AcademicTemplate data={data} />;
        case 'designer':
        return <DesignerTemplate data={data} />;
        case 'classic':
        return <ClassicTemplate data={data} />;
        case 'bold':
        return <BoldTemplate data={data} />;
        case 'clean':
        return <CleanTemplate data={data} />;
        case 'executive':
        return <ExecutiveTemplate data={data} />;
        case 'tech':
        return <TechTemplate data={data} />;
      default:
        return <ModernTemplate data={data} />;
    }
  };

  return (
    <div className="space-y-4">
      {/* Preview Controls */}
      <Card className="p-4 shadow-medium">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium text-foreground">Live Preview</span>
            </div>
            <Button onClick={handlePrint} variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              Download PDF
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            <Palette className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Template:</span>
            <Select value={data.selectedTemplate} onValueChange={onTemplateChange}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {templates.map((template) => (
                  <SelectItem key={template.id} value={template.id}>
                    {template.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Resume Preview */}
      <Card className="shadow-large bg-resume-bg">
        <div id="resume-content">
          {renderTemplate()}
          
          {/* Empty State */}
          {!data.personalInfo.fullName && data.experiences.length === 0 && data.education.length === 0 && data.skills.length === 0 && (
            <div className="text-center py-16 p-8 bg-white min-h-[297mm]">
              <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">Your resume preview will appear here</h3>
              <p className="text-gray-600">Start filling out the form to see your resume come to life</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};