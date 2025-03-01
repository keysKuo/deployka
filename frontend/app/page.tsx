import { DeployProcess } from "./components/Forms/deploy.process";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function HomePage() {
    redirect("/login");

    return (
        <div className="w-full min-h-[100svh] flex items-center justify-center">
            
        </div>
    );
}
