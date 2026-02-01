import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

const Pipeline = () => {
  const pipelineSteps = [
    { name: 'Lint', icon: '🔎' },
    { name: 'Security', icon: '🛡️' },
    { name: 'Test', icon: '🧪' },
    { name: 'Docker', icon: '🐳' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="mb-8"
    >
      <div className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-9 shadow-2xl">
        {/* Pipeline Header */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-5 h-5 rounded-full border-2 border-blue-400 flex items-center justify-center">
            <Check className="w-3 h-3 text-blue-400" />
          </div>
          <span className="text-white font-medium">Pipeline CI/CD</span>
        </div>

        {/* Pipeline Steps */}
        <div className="flex items-center justify-center gap-3 flex-wrap">
          {pipelineSteps.map((step, index) => (
            <div key={step.name} className="flex items-center">
              <motion.div
                whileHover={{ scale: 1.05, y: -4 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="flex flex-row items-center gap-2 p-4 rounded-xl bg-slate-900/60 border border-slate-700/50 hover:border-slate-600/80 transition-colors cursor-default min-w-[80px]"
              >
                <span className="text-2xl">{step.icon}</span>
                <span className="text-sm text-slate-300">{step.name}</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/50"></span>
              </motion.div>
              
              {/* Connector */}
              {index < pipelineSteps.length - 1 && (
                <div className="hidden sm:block w-6 h-px bg-slate-600 mx-1" />
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default Pipeline
