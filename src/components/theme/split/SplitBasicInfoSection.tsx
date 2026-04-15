import { BasicInfoEditor } from '@/components/editors';
import { Button } from '@/components/ui/button';
import { useBasicInfoSection } from '@/hooks/components/useBasicInfoSection';
import type { BasicInfo, ResumeSection } from '@/types/resume';
import { Edit3, Mail, Phone, User } from 'lucide-react';
import { AvatarDisplay } from '../../avatar/AvatarDisplay';
import { BasicInfoSectionItem } from '../BasicInfoSectionItem';

interface SplitBasicInfoSectionProps {
  section: ResumeSection;
  isEditable: boolean;
  className?: string;
}

export const SplitBasicInfoSection = ({ section, isEditable, className }: SplitBasicInfoSectionProps) => {
  const data = section.data as BasicInfo;
  const { isEditing, startEditing, closeEditing, handleSave, formatGenderAge, formatCustomFields, hasValue } =
    useBasicInfoSection(section.id);

  return (
    <>
      <section className={`relative group ${className || ''}`}>
        {isEditable && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-slate-200/40 h-8 w-8 print:hidden z-20"
            onClick={startEditing}
          >
            <Edit3 className="h-4 w-4 text-slate-600" />
          </Button>
        )}

        <div className="flex flex-col items-start text-left">
          <div className="avatar mb-5">
            <AvatarDisplay src={data.avatar} alt={data.name || '头像'} size="lg" />
          </div>
          <h1 className="name text-[2rem] font-bold leading-tight text-slate-900">{data.name || '姓名'}</h1>
          <p className="mt-2 text-sm text-slate-500">{formatGenderAge(data.gender, data.age) || '个人信息'}</p>

          <div className="mt-6 space-y-2.5 text-sm text-slate-700 w-full">
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
              <BasicInfoSectionItem icon={Mail} className="item break-all">
                {data.email}
              </BasicInfoSectionItem>
            )}
          </div>

          {data.customFields && data.customFields.length > 0 && (
            <div className="mt-7 w-full space-y-4">
              <div
                className="rounded-md px-3 py-2.5 border-l-2"
                style={{
                  backgroundColor: 'var(--split-info-card-bg)',
                  borderColor: 'var(--split-title-prefix)',
                }}
              >
                <h3 className="text-lg font-semibold text-slate-900">补充信息</h3>
              </div>
              <div className="text-sm text-slate-700 space-y-2 w-full">{formatCustomFields(data.customFields)}</div>
            </div>
          )}
        </div>
      </section>

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
