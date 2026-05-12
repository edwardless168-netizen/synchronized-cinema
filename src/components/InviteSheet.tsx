import { QRCodeSVG } from "qrcode.react";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger,
  SheetDescription
} from "./ui/sheet";
import { Button } from "./ui/button";
import { Share2, Copy, UserPlus, Link2 } from "lucide-react";
import { toast } from "sonner";

export function InviteSheet() {
  const sessionUrl = window.location.href;

  const copyLink = () => {
    navigator.clipboard.writeText(sessionUrl);
    toast.success("Link copied to clipboard!");
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="border-white/20 bg-white/5 backdrop-blur-md hover:bg-white/10 rounded-xl px-4 flex items-center gap-2">
          <UserPlus className="w-4 h-4" /> Invite
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-zinc-950 border-white/10 text-white w-full sm:max-w-md">
        <SheetHeader className="mb-8">
          <SheetTitle className="text-2xl font-black text-white flex items-center gap-2">
            <Share2 className="w-6 h-6 text-rose-500" /> Invite Others
          </SheetTitle>
          <SheetDescription className="text-gray-400">
            Scan the QR code or share the link to let friends join your watch party.
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-8">
          <div className="flex flex-col items-center justify-center gap-4 p-8 bg-white rounded-3xl shadow-2xl shadow-rose-900/20">
            <QRCodeSVG 
              value={sessionUrl} 
              size={200}
              fgColor="#000000"
              level="H"
              includeMargin
            />
            <div className="text-center">
              <p className="text-black font-bold text-sm">Scan to Join</p>
              <p className="text-gray-500 text-[10px] uppercase tracking-widest mt-1">CineSync Watch Party</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">Party Link</label>
              <div className="flex gap-2">
                <div className="flex-1 bg-white/5 border border-white/10 rounded-xl p-3 text-xs font-mono text-gray-400 truncate flex items-center gap-2">
                  <Link2 className="w-3 h-3" /> {sessionUrl}
                </div>
                <Button 
                  onClick={copyLink}
                  className="bg-rose-600 hover:bg-rose-700 text-white rounded-xl aspect-square p-3"
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div className="pt-4 grid grid-cols-2 gap-3">
              <Button variant="outline" className="border-white/10 hover:bg-white/5 rounded-xl text-xs py-6">
                Share to Twitter
              </Button>
              <Button variant="outline" className="border-white/10 hover:bg-white/5 rounded-xl text-xs py-6">
                Share to Discord
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}