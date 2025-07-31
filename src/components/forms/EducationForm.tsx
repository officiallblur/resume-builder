import { useState } from 'react';
import { Education } from '../ResumeBuilder';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent } from '../ui/card';
import { Plus, Trash2, GraduationCap } from 'lucide-react';

interface EducationFormProps {
  data: Education[];
  onUpdate: (data: Education[]) => void;
}

export const EducationForm = ({ data, onUpdate }: EducationFormProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);

  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      gpa: ''
    };
    onUpdate([...data, newEducation]);
    setEditingId(newEducation.id);
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    const updated = data.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    );
    onUpdate(updated);
  };

  const removeEducation = (id: string) => {
    onUpdate(data.filter(edu => edu.id !== id));
    if (editingId === id) {
      setEditingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Education</h2>
          <p className="text-muted-foreground">Add your educational background</p>
        </div>
        <Button onClick={addEducation} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Education
        </Button>
      </div>

      {data.length === 0 ? (
        <Card className="p-8 text-center border-dashed">
          <CardContent className="pt-6">
            <GraduationCap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No education added</h3>
            <p className="text-muted-foreground mb-4">Add your educational background to get started</p>
            <Button onClick={addEducation} variant="outline" className="gap-2">
              <Plus className="h-4 w-4" />
              Add Education
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {data.map((education) => (
            <Card key={education.id} className="transition-fast hover:shadow-medium">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    {editingId === education.id ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Institution</Label>
                            <Input
                              value={education.institution}
                              onChange={(e) => updateEducation(education.id, 'institution', e.target.value)}
                              placeholder="University Name"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Degree</Label>
                            <Input
                              value={education.degree}
                              onChange={(e) => updateEducation(education.id, 'degree', e.target.value)}
                              placeholder="Bachelor's, Master's, etc."
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Field of Study</Label>
                            <Input
                              value={education.field}
                              onChange={(e) => updateEducation(education.id, 'field', e.target.value)}
                              placeholder="Computer Science, Business, etc."
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>GPA (Optional)</Label>
                            <Input
                              value={education.gpa || ''}
                              onChange={(e) => updateEducation(education.id, 'gpa', e.target.value)}
                              placeholder="3.8"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Start Date</Label>
                            <Input
                              type="month"
                              value={education.startDate}
                              onChange={(e) => updateEducation(education.id, 'startDate', e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>End Date</Label>
                            <Input
                              type="month"
                              value={education.endDate}
                              onChange={(e) => updateEducation(education.id, 'endDate', e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button onClick={() => setEditingId(null)} variant="outline">
                            Done
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div onClick={() => setEditingId(education.id)} className="cursor-pointer">
                        <h3 className="font-medium text-foreground">{education.degree || 'Degree'} in {education.field || 'Field of Study'}</h3>
                        <p className="text-muted-foreground">{education.institution || 'Institution Name'}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {education.startDate} - {education.endDate}
                          {education.gpa && <span className="ml-2">GPA: {education.gpa}</span>}
                        </p>
                      </div>
                    )}
                  </div>
                  <Button
                    onClick={() => removeEducation(education.id)}
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};