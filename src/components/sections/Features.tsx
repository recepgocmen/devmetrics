import { FEATURES } from "@/constants";
import { FeatureIcon } from "@/components/icons";
import type { FeatureBoxProps } from "@/types";

function FeatureBox({ title, desc, icon }: FeatureBoxProps) {
  return (
    <div className="bg-[#161b22] rounded-xl p-6 border border-[#21262d] hover:border-[#30363d] transition-colors">
      <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
        <FeatureIcon icon={icon} />
      </div>
      <h4 className="text-lg font-semibold text-white mb-2">{title}</h4>
      <p className="text-sm text-[#8b949e] leading-relaxed">{desc}</p>
    </div>
  );
}

export function Features() {
  return (
    <section className="py-16 px-6 border-t border-[#21262d]">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {FEATURES.map((f) => (
          <FeatureBox
            key={f.title}
            title={f.title}
            desc={f.desc}
            icon={f.icon}
          />
        ))}
      </div>
    </section>
  );
}
