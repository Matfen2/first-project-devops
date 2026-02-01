import { motion } from 'framer-motion'

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="text-center"
    >
      <p className="text-white font-semibold mb-1">Mathieu FENOUIL</p>
      <p className="text-slate-500 text-sm">Apprenti DevOps • Portfolio Project</p>
    </motion.footer>
  )
}

export default Footer
