import { BasicInfoEditor } from '@/components/editors';
import { Button } from '@/components/ui/button';
import { useBasicInfoSection } from '@/hooks/components/useBasicInfoSection';
import type { BasicInfo, ResumeSection } from '@/types/resume';
import { Edit3, Mail, Phone, User } from 'lucide-react';
import { AvatarDisplay } from '../../avatar/AvatarDisplay';
import { BasicInfoSectionItem } from '../BasicInfoSectionItem';

interface MinimalBasicInfoSectionProps {
  section: ResumeSection;
  isEditable: boolean;
  className?: string;
}

export const MinimalBasicInfoSection = ({
  section,
  isEditable,
  className,
}: MinimalBasicInfoSectionProps) => {
  const data = section.data as BasicInfo;
  const {
    isEditing,
    startEditing,
    closeEditing,
    handleSave,
    formatGenderAge,
    formatCustomFields,
    hasValue,
  } = useBasicInfoSection(section.id);

  return (
    <>
      <div
        className={`relative group px-8 pt-8 pb-6 border-b ${className || ''}`}
        style={{ borderColor: 'var(--minimal-timeline-title-border)' }}
      >
        {isEditable && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 h-8 w-8 print:hidden z-20"
            style={{ color: 'var(--minimal-timeline-title-accent)' }}
            onClick={startEditing}
          >
            <Edit3 className="h-4 w-4" />
          </Button>
        )}

        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 pr-2">
            <h1
              className="name text-4xl font-bold mb-2"
              style={{ color: 'var(--minimal-text-primary, #111827)' }}
            >
              {data.name || '姓名'}
            </h1>
            <div
              className="info-row flex flex-wrap items-center gap-x-5 gap-y-2 text-sm"
              style={{ color: 'var(--minimal-basic-info-text, #4b5563)' }}
            >
              {(data.gender || data.age) && (
                <BasicInfoSectionItem icon={User} className="item">
                  {formatGenderAge(data.gender, data.age)}
                </BasicInfoSectionItem>
              )}
              {hasValue(data.phone) && (
                <BasicInfoSectionItem icon={Phone} className="item">
                  {data.phone}
                </BasicInfoSectionItem>
              )}
              {hasValue(data.email) && (
                <BasicInfoSectionItem icon={Mail} className="item">
                  {data.email}
                </BasicInfoSectionItem>
              )}
            </div>
            {data.customFields && data.customFields.length > 0 && (
              <div
                className="info-row flex flex-wrap gap-x-5 gap-y-2 text-sm mt-2"
                style={{ color: 'var(--minimal-basic-info-text, #4b5563)' }}
              >
                {formatCustomFields(data.customFields)}
              </div>
            )}
          </div>

          <div className="avatar shrink-0 hidden md:block">
            <AvatarDisplay src={data.avatar} alt={data.name || '头像'} size="md" />
          </div>
        </div>
      </div>

      {isEditing && (
        <BasicInfoEditor
          isOpen={true}
          onClose={closeEditing}
          initialData={data}
          onSave={handleSave}
        />
      )}
    </>
  );
};
