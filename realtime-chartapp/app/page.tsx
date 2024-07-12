import RealtimeChart from "@/components/RealtimeChart";
import { Card,CardContent } from "@/components/ui/card";
import ReloadButton from "@/components/ReloadButton";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-4">
      <div className="flex flex-row justify-items-center items-center justify-between">
        <h1 className="text-xl font-semibold">Realtime Library Users</h1>
        <ReloadButton/>
      </div>
      <div className="w-100 h-[200px] mt-4">
        <Card>
          <CardContent className="justify-items-center justify-center items-center p-4">
            <RealtimeChart/>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
