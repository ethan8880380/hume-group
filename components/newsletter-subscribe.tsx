"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { track } from "@vercel/analytics";

interface NewsletterSubscribeProps {
  variant?: "inline" | "card";
  source?: string;
  className?: string;
  inputClassName?: string;
  buttonClassName?: string;
  buttonSize?: "default" | "sm" | "lg" | "icon";
}

export function NewsletterSubscribe({ 
  variant = "inline", 
  source = "Website",
  className = "",
  inputClassName = "",
  buttonClassName = "",
  buttonSize = "lg"
}: NewsletterSubscribeProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [subscribedEmail, setSubscribedEmail] = useState("");
  
  // Optional info form state
  const [optionalInfo, setOptionalInfo] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    gender: "",
    birthday: "",
  });
  const [isSubmittingInfo, setIsSubmittingInfo] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    if (!email || !email.includes("@")) {
      setStatus("error");
      setMessage("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    setStatus("idle");
    setMessage("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          source,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        track("form_submit", { form: "newsletter", source });
        setStatus("success");
        setMessage(data.message || "Successfully subscribed!");
        setSubscribedEmail(email);
        setEmail("");
        
        // Show the optional info dialog
        setShowDialog(true);
      } else {
        setStatus("error");
        setMessage(data.error || "Failed to subscribe. Please try again.");
      }
    } catch (error) {
      setStatus("error");
      setMessage("An error occurred. Please try again later.");
      console.error("Newsletter subscription error:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleOptionalInfoSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmittingInfo(true);

    try {
      const response = await fetch("/api/newsletter/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: subscribedEmail,
          firstName: optionalInfo.firstName,
          lastName: optionalInfo.lastName,
          phone: optionalInfo.phone,
          gender: optionalInfo.gender,
          birthday: optionalInfo.birthday || "",
          source,
        }),
      });

      if (response.ok) {
        // Close dialog and reset
        setShowDialog(false);
        setOptionalInfo({
          firstName: "",
          lastName: "",
          phone: "",
          gender: "",
          birthday: "",
        });
        
        // Reset success message after dialog closes
        setTimeout(() => {
          setStatus("idle");
          setMessage("");
        }, 2000);
      }
    } catch (error) {
      console.error("Error updating contact info:", error);
    } finally {
      setIsSubmittingInfo(false);
    }
  }

  function handleSkipOptionalInfo() {
    setShowDialog(false);
    
    // Reset success message
    setTimeout(() => {
      setStatus("idle");
      setMessage("");
    }, 2000);
  }

  if (variant === "card") {
    return (
      <>
        <div className={className}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting || status === "success"}
              className={`w-full h-11 ${inputClassName}`}
              required
            />
            <Button 
              type="submit"
              disabled={isSubmitting || status === "success"}
              className={`w-full ${buttonClassName}`}
              size={buttonSize}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Subscribing...
                </>
              ) : status === "success" ? (
                <>
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Subscribed!
                </>
              ) : (
                "Subscribe"
              )}
            </Button>
            
            {message && (
              <div className={`text-sm flex items-center gap-2 ${
                status === "success" ? "text-green-600" : "text-red-600"
              }`}>
                {status === "success" ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  <AlertCircle className="h-4 w-4" />
                )}
                {message}
              </div>
            )}
          </form>
        </div>
        <OptionalInfoDialog 
          open={showDialog}
          onOpenChange={setShowDialog}
          optionalInfo={optionalInfo}
          setOptionalInfo={setOptionalInfo}
          onSubmit={handleOptionalInfoSubmit}
          onSkip={handleSkipOptionalInfo}
          isSubmitting={isSubmittingInfo}
        />
      </>
    );
  }

  // Inline variant (default)
  return (
    <>
      <div className={className}>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 md:gap-4">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isSubmitting || status === "success"}
            className={`flex-1 w-full sm:w-auto ${inputClassName}`}
            required
          />
          <Button 
            type="submit"
            disabled={isSubmitting || status === "success"}
            className={buttonClassName}
            size={buttonSize}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Subscribing...
              </>
            ) : status === "success" ? (
              <>
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Subscribed!
              </>
            ) : (
              "Subscribe"
            )}
          </Button>
        </form>
        
        {message && (
          <div className={`text-sm mt-2 flex items-center gap-2 ${
            status === "success" ? "text-green-600" : "text-red-600"
          }`}>
            {status === "success" ? (
              <CheckCircle2 className="h-4 w-4" />
            ) : (
              <AlertCircle className="h-4 w-4" />
            )}
            {message}
          </div>
        )}
      </div>
      <OptionalInfoDialog 
        open={showDialog}
        onOpenChange={setShowDialog}
        optionalInfo={optionalInfo}
        setOptionalInfo={setOptionalInfo}
        onSubmit={handleOptionalInfoSubmit}
        onSkip={handleSkipOptionalInfo}
        isSubmitting={isSubmittingInfo}
      />
    </>
  );
}

// Dialog component for optional information
interface OptionalInfoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  optionalInfo: {
    firstName: string;
    lastName: string;
    phone: string;
    gender: string;
    birthday: string;
  };
  setOptionalInfo: React.Dispatch<React.SetStateAction<{
    firstName: string;
    lastName: string;
    phone: string;
    gender: string;
    birthday: string;
  }>>;
  onSubmit: (e: React.FormEvent) => void;
  onSkip: () => void;
  isSubmitting: boolean;
}

function OptionalInfoDialog({
  open,
  onOpenChange,
  optionalInfo,
  setOptionalInfo,
  onSubmit,
  onSkip,
  isSubmitting
}: OptionalInfoDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            Successfully Signed Up!
          </DialogTitle>
          <DialogDescription className="text-base">
            Thank you for subscribing! Would you like to share a bit more about yourself? 
            <span className="block mt-2 text-sm font-medium text-muted-foreground">
              All fields below are completely optional.
            </span>
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={onSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-sm">
                First Name <span className="text-muted-foreground">(optional)</span>
              </Label>
              <Input
                id="firstName"
                value={optionalInfo.firstName}
                onChange={(e) => setOptionalInfo(prev => ({ ...prev, firstName: e.target.value }))}
                placeholder="John"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-sm">
                Last Name <span className="text-muted-foreground">(optional)</span>
              </Label>
              <Input
                id="lastName"
                value={optionalInfo.lastName}
                onChange={(e) => setOptionalInfo(prev => ({ ...prev, lastName: e.target.value }))}
                placeholder="Doe"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm">
              Phone Number <span className="text-muted-foreground">(optional)</span>
            </Label>
            <Input
              id="phone"
              type="tel"
              value={optionalInfo.phone}
              onChange={(e) => setOptionalInfo(prev => ({ ...prev, phone: e.target.value }))}
              placeholder="(555) 123-4567"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="gender" className="text-sm">
                Gender <span className="text-muted-foreground">(optional)</span>
              </Label>
              <Select
                value={optionalInfo.gender}
                onValueChange={(value) => setOptionalInfo(prev => ({ ...prev, gender: value }))}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="birthday" className="text-sm">
                Birthday <span className="text-muted-foreground">(optional)</span>
              </Label>
              <Input
                id="birthday"
                type="date"
                value={optionalInfo.birthday}
                onChange={(e) => setOptionalInfo(prev => ({ ...prev, birthday: e.target.value }))}
              />
            </div>
          </div>
          
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onSkip}
              className="flex-1"
              disabled={isSubmitting}
            >
              Skip for Now
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Information"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

