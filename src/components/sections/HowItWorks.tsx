import { STEPS } from "@/constants";
import type { StepBoxProps } from "@/types";

function StepBox({ step, title, desc }: StepBoxProps) {
  return (
    <div className="text-center">
      <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm mx-auto mb-3">
        {step}
      </div>
      <h4 className="text-base font-semibold text-white mb-1">{title}</h4>
      <p className="text-sm text-[#8b949e] leading-relaxed">{desc}</p>
    </div>
  );
}

export function HowItWorks() {
  return (
    <section id="how-to-use" className="py-16 px-6 border-t border-[#21262d]">
      <div className="max-w-4xl mx-auto">
        <h3 className="text-3xl font-bold text-white mb-10 text-center">
          How It Works
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((s) => (
            <StepBox
              key={s.step}
              step={s.step}
              title={s.title}
              desc={s.desc}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
