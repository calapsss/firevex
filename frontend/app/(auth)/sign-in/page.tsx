import Image from "next/image";
import AuthCard from "../../../components/auth/auth-card"
import {OrSeparator} from "../../../components/ui/or-separator"
import {ProviderLoginButtons} from "../../../components/auth/provider-login-buttons"
export default function Page() {
  return (
    <div className="form-page-container flex flex-col">
      
      <AuthCard/>
      <div className="w-80 items-center ml-10 mr-10 mt-0">
      <OrSeparator />
      <div className="flex flex-col gap-3 items-center ml-10 mr-10 mt-3">
      <ProviderLoginButtons />
      </div>
      
      </div>
      
    </div>
  );
}
