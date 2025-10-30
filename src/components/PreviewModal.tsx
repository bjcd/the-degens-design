import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import type { Trait } from "./TraitCard";

interface PreviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  fid: string;
  selectedTraits: Trait[];
  onMint: () => void;
}

export const PreviewModal = ({ open, onOpenChange, fid, selectedTraits, onMint }: PreviewModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-card border-primary/50 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">
            Preview Your Degen
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* FID Display */}
          <div className="text-center p-6 rounded-lg bg-muted/30">
            <p className="text-sm text-muted-foreground mb-2">Farcaster ID</p>
            <p className="text-4xl font-bold gradient-primary bg-clip-text text-transparent">
              #{fid}
            </p>
          </div>
          
          {/* Placeholder for NFT preview */}
          <div className="aspect-square rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 flex items-center justify-center">
            <div className="text-center">
              <Sparkles className="w-16 h-16 mx-auto mb-4 text-primary opacity-50" />
              <p className="text-sm text-muted-foreground">Preview generating...</p>
            </div>
          </div>
          
          {/* Selected Traits */}
          <div>
            <h3 className="text-sm font-semibold mb-3 text-muted-foreground">Selected Traits</h3>
            <div className="flex flex-wrap gap-2">
              {selectedTraits.map((trait) => (
                <Badge key={trait.id} variant="secondary" className="text-xs">
                  {trait.name}
                </Badge>
              ))}
            </div>
          </div>
          
          {/* Mint Button */}
          <Button 
            variant="neon" 
            className="w-full h-12 text-base"
            onClick={onMint}
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Mint NFT
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
