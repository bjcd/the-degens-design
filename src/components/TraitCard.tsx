import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Trait {
  id: string;
  name: string;
  tier: string;
  requirement: string;
  eligible: boolean;
}

interface TraitCardProps {
  trait: Trait;
  isSelected: boolean;
  onToggle: () => void;
  disabled: boolean;
}

export const TraitCard = ({ trait, isSelected, onToggle, disabled }: TraitCardProps) => {
  return (
    <button
      onClick={onToggle}
      disabled={!trait.eligible || (disabled && !isSelected)}
      className={cn(
        "relative w-full text-left p-4 rounded-lg border transition-all duration-300",
        "glass-card hover:border-primary/50",
        isSelected && "border-primary glow-primary bg-primary/10",
        !trait.eligible && "opacity-50 cursor-not-allowed",
        disabled && !isSelected && "opacity-50 cursor-not-allowed"
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground mb-1">{trait.name}</h3>
          <p className="text-xs text-muted-foreground mb-2">{trait.requirement}</p>
          <Badge variant={trait.eligible ? "success" : "locked"} className="text-[10px]">
            {trait.tier}
          </Badge>
        </div>
        
        <div
          className={cn(
            "flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
            isSelected
              ? "border-primary bg-primary"
              : trait.eligible
              ? "border-border/50"
              : "border-muted"
          )}
        >
          {isSelected && <Check className="w-4 h-4 text-primary-foreground" />}
        </div>
      </div>
      
      {!trait.eligible && (
        <div className="absolute inset-0 rounded-lg bg-background/50 backdrop-blur-[2px] flex items-center justify-center">
          <Badge variant="locked">Not eligible</Badge>
        </div>
      )}
    </button>
  );
};
