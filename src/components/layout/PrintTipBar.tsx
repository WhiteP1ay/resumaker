import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { usePrintScale } from '@/hooks/components/usePrintScale';
import { useBrowserDetection } from '@/hooks/useBrowserDetection';
import { CircleQuestionMark, Printer } from 'lucide-react';

interface PrintTipBarProps {
  onPrint: () => void;
}

export const PrintTipBar = ({ onPrint }: PrintTipBarProps) => {
  const { getPrintTip } = useBrowserDetection();
  const { tip: printTip } = getPrintTip();
  const { scale, onScaleChange } = usePrintScale();

  return (
    <div className="bg-gray-800 text-white p-3 text-center print:hidden">
      <div className="flex items-center justify-between space-x-4 max-w-4xl px-4 mx-auto">
        <div className="flex items-center space-x-2">
          <span className="text-sm">缩放比例</span>
          <Tooltip>
            <TooltipTrigger asChild>
              <CircleQuestionMark className="w-4 h-4 text-white/70 hover:text-white cursor-help" />
            </TooltipTrigger>
            <TooltipContent>
              <p>通过修改缩放比例，可以控制每页简历内容的显示大小。</p>
            </TooltipContent>
          </Tooltip>
          <Slider
            defaultValue={[scale]}
            max={100}
            step={1}
            className="w-20 cursor-pointer [&_[data-slot=slider-track]]:bg-white/30 [&_[data-slot=slider-range]]:bg-white [&_[data-slot=slider-thumb]]:border-white [&_[data-slot=slider-thumb]]:bg-white [&_[data-slot=slider-thumb]]:cursor-grab [&_[data-slot=slider-thumb]]:active:cursor-grabbing [&_[data-slot=slider-thumb]]:hover:ring-white/50"
            onValueChange={(value) => onScaleChange(value[0])}
          />
          {scale}%
        </div>
        <div className="flex items-center">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={onPrint}
                variant="default"
                size="sm"
                className="bg-white text-gray-900 hover:bg-gray-100 border border-white/80 shadow-sm"
              >
                <Printer className="h-4 w-4 mr-2" />
                打印简历
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{printTip}</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};
