import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AssistantContent from "@/components/Assistant/AssistantContent";
import { useIsMobile } from "@/hooks/use-mobile";

const AlChatbot = () => {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <AnimatePresence>
        {!open && (
          <DialogTrigger asChild>
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="fixed right-4 z-40 bottom-[5.5rem] md:bottom-6 rounded-full shadow-lg"
              aria-label="Otvori AI Assistant"
            >
              <span className="flex items-center gap-2 rounded-full border border-border bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90">
                <Bot size={18} />
                <span>AI Assistant</span>
                <Sparkles size={16} />
              </span>
            </motion.button>
          </DialogTrigger>
        )}
      </AnimatePresence>

      <DialogContent
        className={isMobile
          ? "h-dvh w-screen max-w-none translate-x-[-50%] translate-y-[-50%] rounded-none border-0 p-0"
          : "max-w-5xl p-0 overflow-hidden"
        }
      >
        <div className="flex h-full max-h-[90dvh] flex-col bg-background">
          <DialogHeader className="border-b border-border px-6 py-4 text-left">
            <DialogTitle className="flex items-center gap-2 text-xl font-heading font-bold text-foreground">
              <Bot size={20} /> Asistent za izbor profila
            </DialogTitle>
            <DialogDescription>
              Odgovorite na nekoliko pitanja i dobićete preporuku sistema.
            </DialogDescription>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto px-4 py-6 md:px-6">
            <AssistantContent embedded />
          </div>

          <div className="border-t border-border px-4 py-3 md:px-6">
            <Button variant="outline" className="w-full md:w-auto" onClick={() => setOpen(false)}>
              Zatvori
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AlChatbot;
