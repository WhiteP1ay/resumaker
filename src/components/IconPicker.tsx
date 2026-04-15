/**
 * 预设图标选择器 - 替换自选图标功能，提升性能
 */
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  Award,
  Book,
  Briefcase,
  BriefcaseBusiness,
  Building,
  Calendar,
  Camera,
  Car,
  Cloud,
  Code,
  Coffee,
  Cpu,
  CreditCard,
  Database,
  Facebook,
  FileText,
  Folder,
  Gamepad2,
  Github,
  Globe,
  GraduationCap,
  Headphones,
  Heart,
  Home,
  Instagram,
  Link,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Monitor,
  Music,
  Palette,
  Phone,
  Plane,
  Rocket,
  Settings,
  Shield,
  ShoppingBag,
  Smartphone,
  Star,
  Target,
  Trophy,
  Tv,
  Twitter,
  User,
  Wifi,
  Youtube,
  Zap,
} from 'lucide-react';
import React, { useState } from 'react';

interface IconPickerProps {
  value: string;
  onChange: (iconName: string) => void;
  label?: string;
}

// 预设的常用图标 - 按分类组织
const PRESET_ICONS = [
  // 个人信息类
  { name: 'user', icon: User, label: '用户' },
  { name: 'mail', icon: Mail, label: '邮箱' },
  { name: 'phone', icon: Phone, label: '电话' },
  { name: 'map-pin', icon: MapPin, label: '位置' },
  { name: 'home', icon: Home, label: '家庭' },
  { name: 'car', icon: Car, label: '交通' },

  // 工作职业类
  { name: 'briefcase', icon: Briefcase, label: '工作' },
  { name: 'building', icon: Building, label: '公司' },
  { name: 'graduation-cap', icon: GraduationCap, label: '教育' },
  { name: 'award', icon: Award, label: '奖项' },
  { name: 'trophy', icon: Trophy, label: '成就' },
  { name: 'rocket', icon: Rocket, label: '创业' },

  // 技能技术类
  { name: 'code', icon: Code, label: '编程' },
  { name: 'database', icon: Database, label: '数据库' },
  { name: 'cloud', icon: Cloud, label: '云计算' },
  { name: 'cpu', icon: Cpu, label: '硬件' },
  { name: 'wifi', icon: Wifi, label: '网络' },
  { name: 'shield', icon: Shield, label: '安全' },
  { name: 'monitor', icon: Monitor, label: '前端' },
  { name: 'smartphone', icon: Smartphone, label: '移动端' },
  { name: 'settings', icon: Settings, label: '运维' },

  // 社交媒体类
  { name: 'github', icon: Github, label: 'GitHub' },
  { name: 'linkedin', icon: Linkedin, label: 'LinkedIn' },
  { name: 'twitter', icon: Twitter, label: 'Twitter' },
  { name: 'instagram', icon: Instagram, label: 'Instagram' },
  { name: 'youtube', icon: Youtube, label: 'YouTube' },
  { name: 'facebook', icon: Facebook, label: 'Facebook' },
  { name: 'message-circle', icon: MessageCircle, label: '微信' },
  { name: 'link', icon: Link, label: '链接' },
  { name: 'tv', icon: Tv, label: '电视' },

  // 兴趣爱好类
  { name: 'camera', icon: Camera, label: '摄影' },
  { name: 'music', icon: Music, label: '音乐' },
  { name: 'headphones', icon: Headphones, label: '音响' },
  { name: 'palette', icon: Palette, label: '设计' },
  { name: 'gamepad-2', icon: Gamepad2, label: '游戏' },
  { name: 'plane', icon: Plane, label: '旅行' },
  { name: 'book', icon: Book, label: '阅读' },
  { name: 'coffee', icon: Coffee, label: '咖啡' },

  // 通用常用类
  { name: 'globe', icon: Globe, label: '网站' },
  { name: 'calendar', icon: Calendar, label: '时间' },
  { name: 'file-text', icon: FileText, label: '文档' },
  { name: 'shopping-bag', icon: ShoppingBag, label: '购物' },
  { name: 'credit-card', icon: CreditCard, label: '金融' },
  { name: 'star', icon: Star, label: '收藏' },
  { name: 'heart', icon: Heart, label: '喜欢' },
  { name: 'target', icon: Target, label: '目标' },
  { name: 'zap', icon: Zap, label: '能量' },
  { name: 'folder', icon: Folder, label: '文件夹' },
  { name: 'briefcase-business', icon: BriefcaseBusiness, label: '商务' },
] as const;

export const IconPicker: React.FC<IconPickerProps> = ({ value, onChange, label = '图标' }) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedIcon = PRESET_ICONS.find((icon) => icon.name === value);

  return (
    <div className="space-y-2">
      {label && <Label className="text-sm font-medium text-gray-700">{label}</Label>}

      <div className="relative">
        <Button
          type="button"
          variant="outline"
          onClick={() => setIsOpen(true)}
          className="w-full justify-start h-10"
        >
          {selectedIcon ? (
            <div className="flex items-center gap-2">
              <selectedIcon.icon className="h-4 w-4" />
              <span>{selectedIcon.label}</span>
            </div>
          ) : (
            <span className="text-gray-500">选择图标</span>
          )}
        </Button>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="max-w-2xl p-0">
            <DialogHeader className="px-6 pt-6 pb-2">
              <DialogTitle className="text-base">选择图标</DialogTitle>
              <DialogDescription>点击图标即可应用到当前模块标题。</DialogDescription>
            </DialogHeader>
            <div className="max-h-[28rem] overflow-y-auto px-6 pb-6">
              <div className="grid grid-cols-7 gap-2">
                {PRESET_ICONS.map((iconItem) => (
                  <button
                    key={iconItem.name}
                    type="button"
                    onClick={() => {
                      onChange(iconItem.name);
                      setIsOpen(false);
                    }}
                    className={`flex flex-col items-center gap-1.5 p-2.5 rounded-md border transition-colors text-xs ${
                      value === iconItem.name
                        ? 'bg-blue-50 text-blue-600 border-blue-200'
                        : 'text-gray-600 border-gray-100 hover:bg-gray-50'
                    }`}
                    title={iconItem.label}
                  >
                    <iconItem.icon className="h-4 w-4" />
                    <span className="truncate text-[10px] leading-tight">{iconItem.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export const IconRenderer = ({
  iconName,
  className,
  onClick,
}: {
  iconName: string;
  className?: string;
  onClick?: () => void;
}) => {
  const IconComponent = PRESET_ICONS.find((item) => item.name === iconName)?.icon;
  return IconComponent ? <IconComponent className={className} onClick={onClick} /> : null;
};
