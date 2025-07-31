import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';
import { Plus, X, Award } from 'lucide-react';

interface SkillsFormProps {
  data: string[];
  onUpdate: (data: string[]) => void;
}

export const SkillsForm = ({ data, onUpdate }: SkillsFormProps) => {
  const [newSkill, setNewSkill] = useState('');

  const addSkill = () => {
    if (newSkill.trim() && !data.includes(newSkill.trim())) {
      onUpdate([...data, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    onUpdate(data.filter(skill => skill !== skillToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  const suggestedSkills = [
    'JavaScript', 'React', 'Node.js', 'Python', 'TypeScript', 'CSS', 'HTML',
    'Project Management', 'Communication', 'Leadership', 'Problem Solving',
    'Data Analysis', 'Marketing', 'Sales', 'Design', 'Adobe Creative Suite'
  ];

  const availableSuggestions = suggestedSkills.filter(skill => !data.includes(skill));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-2">Skills</h2>
        <p className="text-muted-foreground">Add your key skills and competencies</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="skill-input">Add Skill</Label>
          <div className="flex gap-2">
            <Input
              id="skill-input"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter a skill..."
              className="flex-1"
            />
            <Button onClick={addSkill} disabled={!newSkill.trim()}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {data.length === 0 ? (
          <Card className="p-8 text-center border-dashed">
            <CardContent className="pt-6">
              <Award className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No skills added</h3>
              <p className="text-muted-foreground mb-4">Start adding your skills to showcase your expertise</p>
            </CardContent>
          </Card>
        ) : (
          <Card className="p-6">
            <CardContent className="pt-0">
              <h3 className="font-medium text-foreground mb-3">Your Skills</h3>
              <div className="flex flex-wrap gap-2">
                {data.map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="px-3 py-1 gap-2 transition-fast hover:bg-destructive/10"
                  >
                    {skill}
                    <button
                      onClick={() => removeSkill(skill)}
                      className="hover:text-destructive transition-fast"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {availableSuggestions.length > 0 && (
          <Card className="p-6">
            <CardContent className="pt-0">
              <h3 className="font-medium text-foreground mb-3">Suggested Skills</h3>
              <div className="flex flex-wrap gap-2">
                {availableSuggestions.slice(0, 10).map((skill) => (
                  <Badge
                    key={skill}
                    variant="outline"
                    className="cursor-pointer transition-fast hover:bg-primary hover:text-primary-foreground"
                    onClick={() => onUpdate([...data, skill])}
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};