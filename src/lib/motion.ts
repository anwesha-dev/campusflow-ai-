import { motion as _motion, AnimatePresence as _AnimatePresence } from "framer-motion";

// framer-motion types can be strict in some setups — expose a thin any-typed proxy
const motion: any = _motion;
const AnimatePresence: any = _AnimatePresence;

export { motion, AnimatePresence };
