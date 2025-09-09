import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useBrowserDetection } from '@/hooks/useBrowserDetection';
import { CircleQuestionMark, FileText, Printer } from 'lucide-react';

interface PrintTipBarProps {
  onPrint: () => void;
  scale: number;
  onScaleChange: (value: number) => void;
  pageCount: number;
}

export const PrintTipBar = ({ onPrint, scale, onScaleChange, pageCount }: PrintTipBarProps) => {
  const { getPrintTip } = useBrowserDetection();
  const { tip, shortcut } = getPrintTip();

  return (
    <div className="bg-blue-600 text-white p-3 text-center print:hidden">
      <div className="flex items-center justify-center space-x-4">
        <span className="text-sm">
          {tip}
          {shortcut && <span className="ml-2 text-blue-200">({shortcut})</span>}
        </span>

        {/* 页数显示 */}
        <div className="flex items-center space-x-1">
          <FileText className="w-4 h-4 text-blue-200" />
          <span className="text-sm">
            A4纸约需 <span className="font-semibold">{pageCount}</span> 页
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-sm">缩放比例</span>
          <Tooltip>
            <TooltipTrigger>
              <CircleQuestionMark className="w-4 h-4 text-blue-200"></CircleQuestionMark>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                推荐把简历内容精简到一页纸，
                <br />
                通过修改缩放比例，可以控制简历内容的显示大小。
              </p>
            </TooltipContent>
          </Tooltip>
          <Slider
            defaultValue={[scale]}
            max={100}
            step={1}
            className="w-20"
            onValueChange={(value) => onScaleChange(value[0])}
          ></Slider>
          <span className="ml-1">{scale}%</span>
        </div>
        <Button
          onClick={onPrint}
          variant="outline"
          size="sm"
          className="bg-white text-blue-600 outline-none hover:bg-gray-100 focus:bg-gray-300"
        >
          <Printer className="h-4 w-4 mr-2" />
          打印简历
        </Button>
      </div>
    </div>
  );
};
