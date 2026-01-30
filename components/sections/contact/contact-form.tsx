"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, CheckCircle2 } from "lucide-react";
import { track } from "@vercel/analytics";

// reCAPTCHA site key - loaded from environment variable
const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

// Extend window type for grecaptcha
declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  
  // Anti-bot: Honeypot field (should remain empty)
  const [honeypot, setHoneypot] = useState("");
  
  // Anti-bot: Track when form was rendered
  const formLoadTime = useRef<number>(Date.now());
  
  // Load reCAPTCHA script
  useEffect(() => {
    formLoadTime.current = Date.now();
    
    // Only load if site key is configured
    if (!RECAPTCHA_SITE_KEY) {
      console.warn("reCAPTCHA site key not configured");
      return;
    }
    
    // Check if already loaded
    if (window.grecaptcha) {
      setRecaptchaLoaded(true);
      return;
    }
    
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      window.grecaptcha.ready(() => {
        setRecaptchaLoaded(true);
      });
    };
    document.head.appendChild(script);
    
    return () => {
      // Cleanup script on unmount if needed
      const existingScript = document.querySelector(`script[src*="recaptcha"]`);
      if (existingScript) {
        // Don't remove - other components might use it
      }
    };
  }, []);

  // Get reCAPTCHA token
  const getRecaptchaToken = useCallback(async (): Promise<string | null> => {
    if (!RECAPTCHA_SITE_KEY || !recaptchaLoaded) {
      return null;
    }
    
    try {
      const token = await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, {
        action: "contact_form",
      });
      return token;
    } catch (err) {
      console.error("reCAPTCHA error:", err);
      return null;
    }
  }, [recaptchaLoaded]);

  function formatPhoneNumber(value: string): string {
    // Remove all non-digits
    const digits = value.replace(/\D/g, "");
    
    // Format as XXX-XXX-XXXX
    if (digits.length <= 3) {
      return digits;
    } else if (digits.length <= 6) {
      return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    } else {
      return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
    }
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    
    if (name === "phone") {
      setFormData((prev) => ({ ...prev, phone: formatPhoneNumber(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Anti-bot: Check honeypot (should be empty)
    if (honeypot) {
      // Silently "succeed" to not tip off bots
      setIsSubmitted(true);
      setTimeout(() => {
        setFormData({ firstName: "", lastName: "", email: "", phone: "", message: "" });
        setIsSubmitted(false);
      }, 3000);
      setIsSubmitting(false);
      return;
    }

    // Anti-bot: Check submission time (minimum 3 seconds to fill form)
    const timeElapsed = Date.now() - formLoadTime.current;
    if (timeElapsed < 3000) {
      // Too fast, likely a bot - silently "succeed"
      setIsSubmitted(true);
      setTimeout(() => {
        setFormData({ firstName: "", lastName: "", email: "", phone: "", message: "" });
        setIsSubmitted(false);
      }, 3000);
      setIsSubmitting(false);
      return;
    }

    try {
      // Get reCAPTCHA token
      const recaptchaToken = await getRecaptchaToken();
      
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          _hp: honeypot, // Send honeypot for server-side check
          _ts: formLoadTime.current, // Send timestamp for server-side check
          _recaptcha: recaptchaToken, // reCAPTCHA v3 token
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      track("form_submit", { form: "contact" });
      setIsSubmitted(true);

      // Reset form after delay
      setTimeout(() => {
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: "",
        });
        setIsSubmitted(false);
      }, 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-xl mx-auto">
          {/* Section Header */}
          <div className="mb-10 text-left sm:text-center">
            <span className="text-primary font-medium text-sm uppercase tracking-wider">
              Contact us
            </span>
            <h2 className="text-3xl font-semibold mt-3 mb-4">Get in touch</h2>
            <p className="text-muted-foreground">
              We&apos;d love to hear from you. Please fill out this form.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Honeypot field - hidden from humans, bots will fill it */}
            <div className="absolute -left-[9999px]" aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input
                type="text"
                id="website"
                name="website"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>
            
            {/* Name Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  placeholder="First name"
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Last name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  placeholder="Last name"
                  className="h-11"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="hello@email.com"
                className="h-11"
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone">Phone number</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="555-123-4567"
                className="h-11"
                maxLength={12}
              />
            </div>

            {/* Message */}
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Leave us a message..."
                rows={5}
                className="resize-none"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting || isSubmitted}
              className="w-full h-12"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : isSubmitted ? (
                <>
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Message Sent!
                </>
              ) : (
                "Send message"
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
