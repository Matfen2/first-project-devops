import { motion } from 'framer-motion'
import { Github, ChevronDown } from 'lucide-react'

const CTAButtons = ({ isDockerOpen, setIsDockerOpen }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
    >
      <motion.a
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        href="https://github.com/Matfen2/premier-projet-devops"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 cursor-pointer bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg shadow-blue-600/20"
      >
        <Github className="w-5 h-5" />
        Voir le code
      </motion.a>
      
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsDockerOpen(!isDockerOpen)}
        className="flex items-center gap-2 cursor-pointer bg-slate-800/60 hover:bg-slate-800/80 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 border border-slate-700/50 hover:border-slate-600 backdrop-blur-sm"
      >
        <span className="text-xl">🐳</span>
        Docker
        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isDockerOpen ? 'rotate-180' : ''}`} />
      </motion.button>
    </motion.div>
  )
}

export default CTAButtons
