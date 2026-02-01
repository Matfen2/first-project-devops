import { motion } from 'framer-motion'

const TechTags = () => {
  const techTags = ['GitHub Actions', 'Docker', 'Node.js', 'ESLint', 'Vitest', 'Vite']

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="flex flex-wrap justify-center gap-2 mb-10"
    >
      {techTags.map((tag) => (
        <span
          key={tag}
          className="px-4 py-2 bg-slate-800/40 border border-slate-700/50 rounded-lg text-sm text-slate-300 hover:text-white hover:border-slate-600 transition-all duration-200 backdrop-blur-sm cursor-default"
        >
          {tag}
        </span>
      ))}
    </motion.div>
  )
}

export default TechTags
