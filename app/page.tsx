import { Sidebar } from "@/components/shared/sidebar";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-semibold text-slate-900">Admin panel</h1>
        <p className="mt-2 text-sm text-slate-600">
          Sidebar component hozir qayta ishlatiladigan va animatsiyali holatda
          ishlayapti.
        </p>
      </main>
    </div>
  );
}
