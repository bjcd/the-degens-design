import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TraitCard, type Trait } from "@/components/TraitCard";
import { PreviewModal } from "@/components/PreviewModal";
import { Eye, Sparkles } from "lucide-react";
import { toast } from "sonner";

const TRAITS: Trait[] = [
  {
    id: "orb",
    name: "Floating Companion Orb",
    tier: "Engagement Tier 3",
    requirement: "21 days active",
    eligible: true,
  },
  {
    id: "teeth",
    name: "Golden Teeth",
    tier: "Engagement Tier 2",
    requirement: "21 days active",
    eligible: true,
  },
  {
    id: "sword",
    name: "Sword",
    tier: "Engagement Tier 1",
    requirement: "21 days active",
    eligible: true,
  },
  {
    id: "jetpack",
    name: "Jetpack",
    tier: "Followers Tier 2",
    requirement: "≥1k followers",
    eligible: true,
  },
  {
    id: "display",
    name: "Holographic Display",
    tier: "Followers Tier 1",
    requirement: "≥10k followers",
    eligible: true,
  },
  {
    id: "golden-hands",
    name: "Golden Hands",
    tier: "DEGEN Tier 2",
    requirement: ">2k DEGEN",
    eligible: true,
  },
  {
    id: "diamond-hands",
    name: "Diamond Hands",
    tier: "DEGEN Tier 1",
    requirement: ">20k DEGEN",
    eligible: false,
  },
  {
    id: "shoulder-pads",
    name: "Mechanical Shoulder Pads",
    tier: "Flags Tier 2",
    requirement: "score≥0.6 + power",
    eligible: true,
  },
  {
    id: "laser-eyes",
    name: "Laser Eyes",
    tier: "Flags Tier 1",
    requirement: "score≥0.8 + pro",
    eligible: true,
  },
];

const MAX_TRAITS = 4;

const Index = () => {
  const [fid, setFid] = useState("");
  const [selectedTraits, setSelectedTraits] = useState<Set<string>>(new Set());
  const [previewOpen, setPreviewOpen] = useState(false);

  const handleTraitToggle = (traitId: string) => {
    setSelectedTraits((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(traitId)) {
        newSet.delete(traitId);
      } else if (newSet.size < MAX_TRAITS) {
        newSet.add(traitId);
      } else {
        toast.error(`Maximum ${MAX_TRAITS} traits allowed`);
      }
      return newSet;
    });
  };

  const handleGeneratePreview = () => {
    if (!fid) {
      toast.error("Please enter your FID");
      return;
    }
    if (selectedTraits.size === 0) {
      toast.error("Please select at least one trait");
      return;
    }
    setPreviewOpen(true);
  };

  const handleMint = () => {
    toast.success("Minting your Degen NFT...", {
      description: `FID #${fid} with ${selectedTraits.size} traits`,
    });
    setPreviewOpen(false);
  };

  const selectedTraitsList = TRAITS.filter((t) => selectedTraits.has(t.id));
  const canSelectMore = selectedTraits.size < MAX_TRAITS;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated background gradient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/20 rounded-full blur-[120px] animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 container max-w-2xl mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 gradient-primary bg-clip-text text-transparent">
            The Degens
          </h1>
          <p className="text-muted-foreground text-sm md:text-base">
            Customize and mint your unique Degen NFT
          </p>
        </div>

        {/* FID Input */}
        <div className="mb-8">
          <label htmlFor="fid" className="block text-sm font-medium mb-2 text-muted-foreground">
            Farcaster ID (FID)
          </label>
          <Input
            id="fid"
            type="number"
            placeholder="Enter your FID..."
            value={fid}
            onChange={(e) => setFid(e.target.value)}
            className="h-12 text-base glass-card"
          />
        </div>

        {/* Trait Selection Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Select Up to 4 Traits</h2>
          <Badge
            variant={selectedTraits.size === MAX_TRAITS ? "default" : "outline"}
            className="text-sm px-3 py-1"
          >
            Selected: {selectedTraits.size}/{MAX_TRAITS}
          </Badge>
        </div>

        {/* Traits Grid */}
        <div className="grid gap-3 mb-8">
          {TRAITS.map((trait) => (
            <TraitCard
              key={trait.id}
              trait={trait}
              isSelected={selectedTraits.has(trait.id)}
              onToggle={() => handleTraitToggle(trait.id)}
              disabled={!canSelectMore}
            />
          ))}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Button
            variant="outline"
            size="lg"
            onClick={handleGeneratePreview}
            className="h-12 text-base"
          >
            <Eye className="w-5 h-5 mr-2" />
            Generate Preview
          </Button>
          <Button
            variant="neon"
            size="lg"
            onClick={handleGeneratePreview}
            className="h-12 text-base"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Preview & Mint
          </Button>
        </div>
      </div>

      {/* Preview Modal */}
      <PreviewModal
        open={previewOpen}
        onOpenChange={setPreviewOpen}
        fid={fid}
        selectedTraits={selectedTraitsList}
        onMint={handleMint}
      />
    </div>
  );
};

export default Index;
