import { Plus } from "lucide-react";
import Link from "next/link";

interface EmptyStateProps {
  title: string;
  adminHref?: string;
  icon?: React.ReactNode;
}

export default function EmptyState({ title, adminHref = "/admin", icon }: EmptyStateProps) {
  return (
    <div className="rounded-xl border-2 border-dashed border-stone-200 bg-[#fafaf8]/50 py-12">
      <div className="flex flex-col items-center text-center">
        {icon && (
          <div className="w-12 h-12 rounded-lg bg-stone-100 flex items-center justify-center mb-3">
            {icon}
          </div>
        )}
        <p className="text-stone-800 font-display font-semibold text-lg">
          {title}
        </p>
        <Link
          href={adminHref}
          className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-stone-500 hover:text-[#2e5b32] transition"
        >
          <Plus className="w-3.5 h-3.5" />
          Tambah via Admin Panel
        </Link>
      </div>
    </div>
  );
}
