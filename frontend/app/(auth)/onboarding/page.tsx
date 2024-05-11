import Image from "next/image";
import AuthCard from "@/components/auth/auth-card"
import {OrSeparator} from "@/components/ui/or-separator"
import {ProviderLoginButtons} from "@/components/auth/provider-login-buttons"
import OnboardingCard from "@/components/user/onboarding/onboarding-card";


export default function Page() {
    
  

    return (
        <div className="form-page-container flex flex-col">
        
        <OnboardingCard/>
        
        
        </div>
    );
}
