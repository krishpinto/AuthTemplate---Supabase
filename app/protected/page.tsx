import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { InfoIcon } from "lucide-react";
import { PageReloadTrigger } from "@/components/page-reload-trigger";
import Navigation from "@/components/navbar";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/auth/login");
  }

  return (
     <><Navigation /><>
      <div className="flex-1 w-full flex flex-col gap-12">
        <div className="flex flex-col gap-2 items-start">
          <h1 className="text-4xl pt-5 font-bold">Protected Page/Dashboard</h1>
          <h2 className="font-bold text-2xl mb-4">Your user details</h2>
          <pre className="text-xs font-mono p-3 rounded border max-h-32 overflow-auto">
            {JSON.stringify(data.user, null, 2)}
          </pre>
        </div>
      </div>
    </></>
  );
}