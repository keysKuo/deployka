import { DeployProcess } from "../../components/Forms/deploy.process";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function HomePage() {
    const session = await getServerSession(authOptions);
    // console.log(session);
    if (!session) {
        redirect("/login"); // Chuyển hướng đến trang login
    }

    return (
        <div className="w-full min-h-[100svh] flex items-center justify-center">
            <div className="h[200px]">
                <DeployProcess session={session} />
            </div>
        </div>
    );
}
