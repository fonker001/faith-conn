import { useRouter } from 'next/router';
import { SystemUser } from '@/types/types';

export function redirectByRole(user: SystemUser | null): string {
  if (!user) return '/login';
  
  switch (user.role) {  // Use user.role, not just "role"
    case "priest":
      return "/priest/home";  // Return string, don't push directly
    case "leader":
      return "/leaders/home";
    case "catechist":
      return "/catechist/home";
    default:
      return "/member/home";
  }
}