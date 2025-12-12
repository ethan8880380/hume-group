"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Home } from "lucide-react";

interface HomeValuationDialogProps {
  trigger?: React.ReactNode;
  triggerClassName?: string;
}

interface ValuationResult {
  low: number;
  high: number;
  average: number;
  source?: string;
  isEstimate?: boolean;
}

export function HomeValuationDialog({ 
  trigger,
  triggerClassName 
}: HomeValuationDialogProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [valuation, setValuation] = useState<ValuationResult | null>(null);
  const [disclaimer, setDisclaimer] = useState<string>("");
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    state: "WA",
    zipCode: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/valuation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success && data.hasValuation) {
        setValuation(data.estimatedValue);
        setDisclaimer(data.disclaimer || "");
        setShowResults(true);
      } else {
        alert(data.error || 'Failed to get valuation. Please try again.');
      }
    } catch (error) {
      console.error('Valuation request error:', error);
      alert('Failed to get valuation. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleOpenChange(newOpen: boolean) {
    setOpen(newOpen);
    if (!newOpen) {
      // Reset state when dialog closes
      setTimeout(() => {
        setShowResults(false);
        setValuation(null);
        setDisclaimer("");
        setFormData({
          address: "",
          city: "",
          state: "WA",
          zipCode: "",
        });
      }, 300);
    }
  }

  function formatCurrency(value: number) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="lg" className={triggerClassName}>
            Free Home Valuation
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        {showResults && valuation ? (
          <div className="py-6">
            <div className="text-center mb-6">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Home className="w-8 h-8 text-primary" />
              </div>
              <DialogTitle className="text-2xl mb-2">Your Home Valuation</DialogTitle>
              <p className="text-sm text-muted-foreground">
                {formData.address}, {formData.city}, {formData.state} {formData.zipCode}
              </p>
            </div>

            {/* Valuation Range */}
            <div className="bg-primary/5 rounded-lg p-6 mb-6">
              <div className="text-center mb-4">
                <p className="text-sm text-muted-foreground mb-2">Estimated Value</p>
                <p className="text-4xl font-bold text-primary">{formatCurrency(valuation.average)}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-primary/10">
                <div className="text-center">
                  <p className="text-xs text-muted-foreground mb-1">Low Estimate</p>
                  <p className="text-lg font-semibold">{formatCurrency(valuation.low)}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground mb-1">High Estimate</p>
                  <p className="text-lg font-semibold">{formatCurrency(valuation.high)}</p>
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            {disclaimer && (
              <div className="bg-muted/50 rounded-lg p-4 mb-4">
                <p className="text-xs text-muted-foreground leading-relaxed">{disclaimer}</p>
              </div>
            )}

            {/* CTA */}
            <div className="space-y-3">
              <p className="text-sm text-center text-muted-foreground">
                Want a more accurate valuation? Our local experts can provide a detailed analysis.
              </p>
              <div className="flex gap-3">
                <Button 
                  size="lg" 
                  className="flex-1"
                  onClick={() => {
                    // TODO: Navigate to contact or schedule page
                    alert("Contact form coming soon!");
                  }}
                >
                  Talk to an Agent
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => setOpen(false)}
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl">Get Your Free Home Valuation</DialogTitle>
              <DialogDescription className="text-base">
                Enter your property address and get an instant estimate of your home&apos;s value.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {/* Address Field */}
          <div className="space-y-2">
            <Label htmlFor="address">
              Street Address <span className="text-destructive">*</span>
            </Label>
            <Input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              placeholder="123 Main Street"
              className="text-base"
            />
          </div>

          {/* City Field */}
          <div className="space-y-2">
            <Label htmlFor="city">
              City <span className="text-destructive">*</span>
            </Label>
            <Input
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              placeholder="Tacoma"
              className="text-base"
            />
          </div>

          {/* State and ZIP */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="state">
                State <span className="text-destructive">*</span>
              </Label>
              <Input
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
                placeholder="WA"
                maxLength={2}
                className="text-base uppercase"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="zipCode">
                ZIP Code <span className="text-destructive">*</span>
              </Label>
              <Input
                id="zipCode"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                required
                placeholder="98401"
                pattern="[0-9]{5}"
                maxLength={5}
                className="text-base"
              />
            </div>
          </div>

              {/* Submit Button */}
              <div className="flex gap-3 pt-4">
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="flex-1"
                >
                  {isSubmitting ? "Submitting..." : "Get My Free Valuation"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={() => setOpen(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

