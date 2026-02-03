import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Copy, Check } from 'lucide-react'

const DockerSection = ({ isOpen }) => {
  const [copied, setCopied] = useState(false)

  const dockerfileContent = `FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5173
`

  const copyDockerfile = () => {
    navigator.clipboard.writeText(dockerfileContent)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const getLineColor = (line) => {
    if (line.startsWith('FROM')) return 'text-purple-400'
    if (line.startsWith('WORKDIR')) return 'text-blue-400'
    if (line.startsWith('COPY')) return 'text-emerald-400'
    if (line.startsWith('RUN')) return 'text-yellow-400'
    if (line.startsWith('EXPOSE')) return 'text-cyan-400'
    if (line.startsWith('CMD')) return 'text-orange-400'
    return 'text-slate-300'
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden mb-8"
        >
          <div className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-2xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-slate-900/50 border-b border-slate-700/50">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
                  <span className="w-3 h-3 rounded-full bg-green-500/80"></span>
                </div>
                <span className="text-slate-400 text-sm font-mono">Dockerfile</span>
              </div>
              <button
                onClick={copyDockerfile}
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400">Copié !</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copier</span>
                  </>
                )}
              </button>
            </div>

            {/* Code */}
            <pre className="p-4 overflow-x-auto text-sm font-mono">
              {dockerfileContent.split('\n').map((line, index) => (
                <div key={index} className="flex hover:bg-slate-700/20 -mx-4 px-4 transition-colors">
                  <span className="text-slate-600 select-none w-6 text-right mr-4">{index + 1}</span>
                  <span className={getLineColor(line)}>
                    {line || ' '}
                  </span>
                </div>
              ))}
            </pre>

            {/* Footer */}
            <div className="px-4 py-3 bg-slate-900/30 border-t border-slate-700/50 flex flex-wrap justify-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="text-cyan-400">📦</span> node:20-alpine
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-cyan-400">🌐</span> nginx:alpine
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-cyan-400">🚪</span> Port 80
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default DockerSection
