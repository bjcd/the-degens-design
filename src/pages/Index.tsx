import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TraitCard, type Trait } from "@/components/TraitCard";
import { PreviewModal } from "@/components/PreviewModal";
import { Eye, Sparkles } from "lucide-react";
import { toast } from "sonner";
import degenExample from "@/assets/degen-example.png";

const TRAITS: Trait[] = [
  {
    id: "orb",
    name: "Floating Companion Orb",
    tier: "Followers Tier 1",
    requirement: "Follower ratio ≥ 4.0",
    eligible: true,
  },
  {
    id: "teeth",
    name: "Golden Teeth",
    tier: "Trust Tier 1",
    requirement: "Neynar score ≥ 0.6",
    eligible: true,
  },
  {
    id: "sword",
    name: "Sword",
    tier: "Trust Tier 2",
    requirement: "Neynar score ≥ 0.4",
    eligible: true,
  },
  {
    id: "jetpack",
    name: "Jetpack",
    tier: "Followers Tier 3",
    requirement: "Follower ratio ≥ 1.2",
    eligible: true,
  },
  {
    id: "display",
    name: "Holographic Display",
    tier: "Followers Tier 2",
    requirement: "Follower ratio ≥ 2.0",
    eligible: true,
  },
  {
    id: "golden-hands",
    name: "Golden Hands",
    tier: "DEGEN Tier 2",
    requirement: ">20k DEGEN",
    eligible: true,
  },
  {
    id: "diamond-hands",
    name: "Diamond Hands",
    tier: "DEGEN Tier 1",
    requirement: ">100k DEGEN",
    eligible: false,
  },
  {
    id: "shoulder-pads",
    name: "Mechanical Shoulder Pads",
    tier: "Badges Tier 2",
    requirement: "Neynar score ≥ 0.8 + power badge",
    eligible: true,
  },
  {
    id: "laser-eyes",
    name: "Laser Eyes",
    tier: "Badges Tier 1",
    requirement: "Neynar score ≥ 0.9 + pro badge",
    eligible: true,
  },
];

const MAX_TRAITS = 4;

const Index = () => {
  const [fid] = useState("123456"); // FID will be automatically fetched
  const [selectedTraits, setSelectedTraits] = useState<Set<string>>(new Set());
  const [previewOpen, setPreviewOpen] = useState(false);
  const [hasGeneratedPreview, setHasGeneratedPreview] = useState(false);

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
    if (selectedTraits.size === 0) {
      toast.error("Please select at least one trait");
      return;
    }
    setHasGeneratedPreview(true);
    setPreviewOpen(true);
  };

  const handleMint = () => {
    if (!hasGeneratedPreview) {
      toast.error("Please generate a preview first");
      return;
    }
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
        {/* Degen character showcase */}
        <div className="absolute top-1/2 right-8 -translate-y-1/2 hidden lg:block opacity-30 hover:opacity-50 transition-opacity duration-500">
          <img 
            src={degenExample} 
            alt="Example Degen NFT" 
            className="w-80 h-80 object-contain animate-float"
          />
        </div>
      </div>

      <div className="relative z-10 container max-w-2xl mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary-glow bg-clip-text text-transparent animate-fade-in drop-shadow-[0_0_30px_rgba(168,85,247,0.4)]">
            The Degens
          </h1>
          <p className="text-foreground/90 text-base md:text-lg mb-4 font-medium">
            Customize and mint your unique The Degens NFT
          </p>
          <Badge variant="outline" className="text-sm px-4 py-2">
            FID #{fid}
          </Badge>
        </div>

        {/* Description */}
        <div className="mb-6 p-4 glass-card rounded-lg space-y-3">
          <p className="text-foreground/80 text-sm md:text-base leading-relaxed">
            Each Degen NFT is born from your social graph and profile picture. Want to make yours rarer? Boost your standing before minting: engagement, followers, DEGEN holdings, Farcaster badges, and Neynar score all unlock special traits.
          </p>
          <p className="text-foreground/80 text-sm md:text-base leading-relaxed">
            Will you settle for a common, or chase legendary status? The rarity game is yours to play.
          </p>
          <p className="text-muted-foreground text-xs md:text-sm italic">
            Note: Common Degens mirror your profile picture most faithfully. Trait eligibility updates in real time — you can keep improving your odds until you start your generation.
          </p>
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
        <div className="grid grid-cols-2 gap-3 mb-8">
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
        <div className="grid gap-4">
          <Button
            variant="neon"
            size="lg"
            onClick={handleGeneratePreview}
            className="h-12 text-base w-full"
          >
            <Eye className="w-5 h-5 mr-2" />
            Generate Preview
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={handleMint}
            disabled={!hasGeneratedPreview}
            className="h-12 text-base w-full"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Mint NFT
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
