import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const AnimatedIcons = () => {
  const [icons, setIcons] = useState(["icon1", "icon2", "icon3"]);
  const [newIcons, setNewIcons] = useState(["icon4", "icon5", "icon6"]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIcons((prev) => {
        const next = [...newIcons];
        setNewIcons(prev);
        return next;
      });
    }, 5000); // Change icons every 5 seconds
    return () => clearInterval(interval);
  }, [newIcons]);

  const iconVariants = {
    hidden: { opacity: 0, x: -200 },
    visible: { opacity: 1, x: 0, transition: { duration: 1 } },
    exit: { opacity: 0, x: 100, transition: { duration: 1 } },
    throughText: { 
      x: 0, 
      scale: [1, 1.5, 1], 
      transition: { duration: 1, times: [0, 0.5, 1] }
    },
  };

  return (
    <div className="relative flex items-center justify-center h-screen bg-gray-900 text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold">
          Discover community-made libraries, plugins, icon sets, and more
        </h1>
        <div className="relative mt-4">
          <AnimatePresence>
            {icons.map((icon, index) => (
              <motion.div
                key={icon}  
                className="absolute inline-block text-2xl"
                style={{ left: `${index * 50}px` }}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={iconVariants}
              >
                <motion.span
                  className="inline-block"
                  animate="throughText"
                  variants={iconVariants}
                >
                  {icon === "icon1" ? "📚" : icon === "icon2" ? "🔌" : "🎨"}
                </motion.span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AnimatedIcons;