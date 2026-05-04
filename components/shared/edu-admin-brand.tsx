export function EduAdminBrand({ collapsed = false }: { collapsed?: boolean }) {
  return (
    <div
      className={`flex items-center py-5 ${
        collapsed ? "justify-center gap-0 px-0" : "gap-3 px-4"
      }`}
    >
      <div className="grid h-10 w-10 place-items-center rounded-xl bg-blue-600 text-sm font-bold text-white">
        BA
      </div>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          collapsed ? "w-0 opacity-0" : "w-32 opacity-100"
        }`}
      >
        <p className="whitespace-nowrap text-lg font-semibold text-slate-900 dark:text-white">BilimgohAdmin</p>
        <p className="whitespace-nowrap text-xs text-slate-500 dark:text-slate-300">Boshqaruv paneli</p>
      </div>
    </div>
  );
}
