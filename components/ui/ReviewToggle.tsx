import { Label } from "@/components/ui/Label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/ToggleGroup";

interface ReviewToggleProps {
  label: string;
  subtitle?: string;
  onValueChange: (value: string) => void;
}

const ReviewToggle = ({
  label,
  subtitle,
  onValueChange,
}: ReviewToggleProps) => {
  return (
    <div>
      <Label>{label}</Label>
      {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
      <div className="flex pt-2">
        <ToggleGroup
          type="single"
          variant="outline"
          onValueChange={onValueChange}
        >
          <ToggleGroupItem value="1" aria-label={`${label} 1`}>
            1
          </ToggleGroupItem>
          <ToggleGroupItem value="2" aria-label={`${label} 2`}>
            2
          </ToggleGroupItem>
          <ToggleGroupItem value="3" aria-label={`${label} 3`}>
            3
          </ToggleGroupItem>
          <ToggleGroupItem value="4" aria-label={`${label} 4`}>
            4
          </ToggleGroupItem>
          <ToggleGroupItem value="5" aria-label={`${label} 5`}>
            5
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  );
};

export { ReviewToggle };
