import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Mail } from "lucide-react";

interface EmailVerificationPopupProps {
  email: string;
  isOpen: boolean;
  onClose: () => void;
}

const EmailVerificationPopup = ({ email, isOpen, onClose }: EmailVerificationPopupProps) => {
  const navigate = useNavigate();
  const [isResending, setIsResending] = useState(false);

  const handleResendEmail = async () => {
    try {
      setIsResending(true);
      const response = await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        // Show success message
        alert('Verification email has been resent!');
      } else {
        throw new Error('Failed to resend verification email');
      }
    } catch (error) {
      console.error('Error resending verification email:', error);
      alert('Failed to resend verification email. Please try again.');
    } finally {
      setIsResending(false);
    }
  };

  const handleGoToLogin = () => {
    onClose();
    navigate('/login');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-primary" />
            Verify Your Email
          </DialogTitle>
          <DialogDescription>
            We've sent a verification link to <span className="font-semibold">{email}</span>
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Please check your email and click the verification link to activate your account.
            If you don't see the email, check your spam folder.
          </p>
          <div className="flex flex-col gap-2">
            <Button
              variant="outline"
              onClick={handleResendEmail}
              disabled={isResending}
            >
              {isResending ? "Sending..." : "Resend Verification Email"}
            </Button>
            <Button onClick={handleGoToLogin}>
              Go to Login
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmailVerificationPopup; 