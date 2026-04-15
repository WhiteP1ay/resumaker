/**
 * 基本信息区域 - 简洁版本
 */
import { BasicInfoEditor } from '@/components/editors';
import { Button } from '@/components/ui/button';
import { useBasicInfoSection } from '@/hooks/components/useBasicInfoSection';
import type { BasicInfo, ResumeSection } from '@/types/resume';
import { Edit3, Mail, Phone, User } from 'lucide-react';
import { AvatarDisplay } from '../avatar/AvatarDisplay';
import { BasicInfoSectionItem } from './BasicInfoSectionItem';

interface BasicInfoSectionProps {
  section: ResumeSection;
  isEditable: boolean;
  className?: string;
}

export const BasicInfoSection = ({ section, isEditable, className }: BasicInfoSectionProps) => {
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
      {/* 简约风格头部区域 */}
      <div className={`relative group px-8 pt-8 pb-6 print:px-6 print:pt-6 print:pb-4 ${className || ''}`}>
        {/* 编辑按钮 */}
        {isEditable && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-gray-100 h-8 w-8 print:hidden z-20"
            onClick={startEditing}
          >
            <Edit3 className="h-4 w-4 text-gray-600" />
          </Button>
        )}

        {/* 头部布局：左侧信息 + 右侧头像 */}
        <div className="flex items-start justify-between">
          {/* 左侧：姓名和基本信息 */}
          <div className="flex-1 pr-6 flex flex-col items-center px-[3rem]">
            {/* 姓名 */}
            <h1 className="text-4xl font-bold text-gray-900 mb-3 print:mb-2 name">
              {data.name || '姓名'}
            </h1>

            {/* 基本信息行 */}
            <div className="info-row flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-600 print:gap-x-4">
              {/* 性别和年龄 */}
              {(data.gender || data.age) && (
                <BasicInfoSectionItem icon={User} className="item">
                  {formatGenderAge(data.gender, data.age)}
                </BasicInfoSectionItem>
              )}

              {/* 电话 */}
              {hasValue(data.phone) && (
                <BasicInfoSectionItem icon={Phone} className="item">
                  {data.phone}
                </BasicInfoSectionItem>
              )}

              {/* 邮箱 */}
              {hasValue(data.email) && (
                <BasicInfoSectionItem icon={Mail} className="item">
                  {data.email}
                </BasicInfoSectionItem>
              )}
            </div>

            {/* 第二行：自定义字段 */}
            {data.customFields && data.customFields.length > 0 && (
              <div className="info-row flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600 mt-2 print:mt-1">
                {formatCustomFields(data.customFields)}
              </div>
            )}
          </div>

          {/* 右侧：头像 */}
          <div className="avatar shrink-0 hidden md:block print:block">
            <AvatarDisplay src={data.avatar} alt={data.name || '头像'} size="md" />
          </div>
        </div>
      </div>

      {/* 编辑器 */}
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
