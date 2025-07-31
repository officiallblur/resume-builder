import { useState } from 'react';
import { PersonalInfoForm } from './forms/PersonalInfoForm';
import { ExperienceForm } from './forms/ExperienceForm';
import { EducationForm } from './forms/EducationForm';
import { SkillsForm } from './forms/SkillsForm';
import { ResumePreview } from './ResumePreview';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { User, Briefcase, GraduationCap, Award, FileText } from 'lucide-react';

export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  experiences: Experience[];
  education: Education[];
  skills: string[];
}

const ResumeBuilder = () => {
  const [activeSection, setActiveSection] = useState('personal');
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      summary: ''
    },
    experiences: [],
    education: [],
    skills: []
  });

  const sections = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'skills', label: 'Skills', icon: Award }
  ];

  const updatePersonalInfo = (info: PersonalInfo) => {
    setResumeData(prev => ({ ...prev, personalInfo: info }));
  };

  const updateExperiences = (experiences: Experience[]) => {
    setResumeData(prev => ({ ...prev, experiences }));
  };

  const updateEducation = (education: Education[]) => {
    setResumeData(prev => ({ ...prev, education }));
  };

  const updateSkills = (skills: string[]) => {
    setResumeData(prev => ({ ...prev, skills }));
  };

  const renderActiveForm = () => {
    switch (activeSection) {
      case 'personal':
        return (
          <PersonalInfoForm
            data={resumeData.personalInfo}
            onUpdate={updatePersonalInfo}
          />
        );
      case 'experience':
        return (
          <ExperienceForm
            data={resumeData.experiences}
            onUpdate={updateExperiences}
          />
        );
      case 'education':
        return (
          <EducationForm
            data={resumeData.education}
            onUpdate={updateEducation}
          />
        );
      case 'skills':
        return (
          <SkillsForm
            data={resumeData.skills}
            onUpdate={updateSkills}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-bg">
      {/* Header */}
      <header className="bg-card shadow-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-primary rounded-lg">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Resume Builder</h1>
              <p className="text-muted-foreground">Create your professional resume in minutes</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            {/* Section Navigation */}
            <Card className="p-2 shadow-medium">
              <div className="flex flex-wrap gap-1">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <Button
                      key={section.id}
                      variant={activeSection === section.id ? "default" : "ghost"}
                      onClick={() => setActiveSection(section.id)}
                      className="flex-1 justify-start gap-2 h-auto py-3 px-4"
                    >
                      <Icon className="h-4 w-4" />
                      <span className="hidden sm:inline">{section.label}</span>
                    </Button>
                  );
                })}
              </div>
            </Card>

            {/* Active Form */}
            <Card className="p-6 shadow-medium">
              {renderActiveForm()}
            </Card>
          </div>

          {/* Preview Section */}
          <div className="lg:sticky lg:top-8 lg:max-h-screen lg:overflow-y-auto">
            <ResumePreview data={resumeData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;