import { useState } from 'react';
import { Experience } from '../ResumeBuilder';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Checkbox } from '../ui/checkbox';
import { Card, CardContent } from '../ui/card';
import { Plus, Trash2, Briefcase } from 'lucide-react';

interface ExperienceFormProps {
  data: Experience[];
  onUpdate: (data: Experience[]) => void;
}

export const ExperienceForm = ({ data, onUpdate }: ExperienceFormProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);

  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    };
    onUpdate([...data, newExperience]);
    setEditingId(newExperience.id);
  };

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    const updated = data.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    );
    onUpdate(updated);
  };

  const removeExperience = (id: string) => {
    onUpdate(data.filter(exp => exp.id !== id));
    if (editingId === id) {
      setEditingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Work Experience</h2>
          <p className="text-muted-foreground">Add your professional work history</p>
        </div>
        <Button onClick={addExperience} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Experience
        </Button>
      </div>

      {data.length === 0 ? (
        <Card className="p-8 text-center border-dashed">
          <CardContent className="pt-6">
            <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No work experience added</h3>
            <p className="text-muted-foreground mb-4">Add your first work experience to get started</p>
            <Button onClick={addExperience} variant="outline" className="gap-2">
              <Plus className="h-4 w-4" />
              Add Experience
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {data.map((experience) => (
            <Card key={experience.id} className="transition-fast hover:shadow-medium">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    {editingId === experience.id ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Company</Label>
                            <Input
                              value={experience.company}
                              onChange={(e) => updateExperience(experience.id, 'company', e.target.value)}
                              placeholder="Company Name"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Position</Label>
                            <Input
                              value={experience.position}
                              onChange={(e) => updateExperience(experience.id, 'position', e.target.value)}
                              placeholder="Job Title"
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Start Date</Label>
                            <Input
                              type="month"
                              value={experience.startDate}
                              onChange={(e) => updateExperience(experience.id, 'startDate', e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>End Date</Label>
                            <Input
                              type="month"
                              value={experience.endDate}
                              onChange={(e) => updateExperience(experience.id, 'endDate', e.target.value)}
                              disabled={experience.current}
                            />
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={`current-${experience.id}`}
                            checked={experience.current}
                            onCheckedChange={(checked) => {
                              updateExperience(experience.id, 'current', checked);
                              if (checked) {
                                updateExperience(experience.id, 'endDate', '');
                              }
                            }}
                          />
                          <Label htmlFor={`current-${experience.id}`}>I currently work here</Label>
                        </div>

                        <div className="space-y-2">
                          <Label>Description</Label>
                          <Textarea
                            value={experience.description}
                            onChange={(e) => updateExperience(experience.id, 'description', e.target.value)}
                            placeholder="Describe your responsibilities and achievements..."
                            className="min-h-[100px]"
                          />
                        </div>

                        <div className="flex gap-2">
                          <Button onClick={() => setEditingId(null)} variant="outline">
                            Done
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div onClick={() => setEditingId(experience.id)} className="cursor-pointer">
                        <h3 className="font-medium text-foreground">{experience.position || 'Untitled Position'}</h3>
                        <p className="text-muted-foreground">{experience.company || 'Company Name'}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {experience.startDate} - {experience.current ? 'Present' : experience.endDate || 'End Date'}
                        </p>
                      </div>
                    )}
                  </div>
                  <Button
                    onClick={() => removeExperience(experience.id)}
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