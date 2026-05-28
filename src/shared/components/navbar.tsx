import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { NavItem } from "./NavItem";

const links = [
  { text: "Work", href: "#work" },
  { text: "About", href: "#about" },
  { text: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  return (
    <nav className="w-full flex flex-row justify-between items-center text-gray-200">
      <div className="flex-1">
        <a href="/">
          <p>&copy; Niraj Shrestha</p>
        </a>
      </div>

      <ol className="hidden lg:flex max-w-60 flex-1 flex-row items-center justify-between">
        {links.map((l) => (
          <li key={l.href} className="flex-1 flex justify-center">
            <NavItem text={l.text} href={l.href} />
          </li>
        ))}
      </ol>

      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        className="lg:hidden p-2 cursor-pointer"
      >
        <Menu size={28} />
      </button>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: "0%" }}
                exit={{ x: "100%" }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="fixed inset-0 z-[100] bg-primary text-white flex flex-col"
              >
                <div className="flex justify-between items-center px-6 py-6">
                  <a href="/" onClick={() => setOpen(false)}>
                    <p>&copy; Niraj Shrestha</p>
                  </a>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label="Close menu"
                    className="p-2 cursor-pointer"
                  >
                    <X size={28} />
                  </button>
                </div>
                <ol className="flex flex-col gap-6 px-8 mt-20 text-6xl">
                  {links.map((l, i) => (
                    <motion.li
                      key={l.href}
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        duration: 0.7,
                        delay: 0.2 + i * 0.07,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      <a href={l.href} onClick={() => setOpen(false)}>
                        {l.text}
                      </a>
                    </motion.li>
                  ))}
                </ol>
                <div className="mt-auto px-8 py-10 text-gray-500 text-sm">
                  <p>&copy; {new Date().getFullYear()} Niraj Shrestha</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </nav>
  );
};
