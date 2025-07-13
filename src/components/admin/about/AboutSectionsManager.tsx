
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { FileText } from 'lucide-react';

interface AboutSection {
  id: string;
  title: string;
  content: string;
  isPublished: boolean;
  order: number;
}

interface AboutSectionsManagerProps {
  aboutSections: AboutSection[];
  onSectionUpdate: (id: string, field: keyof AboutSection, value: string | boolean | number) => void;
}

const AboutSectionsManager = ({ aboutSections, onSectionUpdate }: AboutSectionsManagerProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          About Sections
        </CardTitle>
        <CardDescription>Manage the main content sections of your about page</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {aboutSections.sort((a, b) => a.order - b.order).map((section) => (
          <div key={section.id} className="space-y-4 p-4 border rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Input
                  value={section.title}
                  onChange={(e) => onSectionUpdate(section.id, 'title', e.target.value)}
                  className="font-semibold text-lg"
                />
                {/* <div className="flex items-center space-x-2">
                  <Label htmlFor={`order-${section.id}`} className="text-sm">Order:</Label>
                  {/* <Input
                    id={`order-${section.id}`}
                    type="number"
                    value={section.order}
                    onChange={(e) => onSectionUpdate(section.id, 'order', parseInt(e.target.value))}
                    className="w-20"
                    min="1"
                  /> */}
                {/* </div> */}
              </div>
              {/* <div className="flex items-center space-x-2">
                <Switch
                  checked={section.isPublished}
                  onCheckedChange={(checked) => onSectionUpdate(section.id, 'isPublished', checked)}
                />
                <span className={`text-sm ${section.isPublished ? 'text-green-600' : 'text-gray-400'}`}>
                  {section.isPublished ? 'Published' : 'Draft'}
                </span>
              </div> */}
            </div>
            <Textarea
              value={section.content}
              onChange={(e) => onSectionUpdate(section.id, 'content', e.target.value)}
              className="min-h-[100px]"
              placeholder="Enter section content..."
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default AboutSectionsManager;
