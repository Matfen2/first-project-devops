import { motion } from 'framer-motion'

const Hero = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="text-center mb-6"
    >
      <h1 className="text-5xl md:text-6xl font-bold text-white mb-2 tracking-tight">
        Premier Projet
      </h1>
      <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent tracking-tight">
        DevOps
      </h2>
      
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-6 text-slate-400 text-lg max-w-lg mx-auto"
      >
        Pipeline CI/CD avec GitHub Actions, tests automatisés et Docker.
      </motion.p>
    </motion.div>
  )
}

export default Hero
