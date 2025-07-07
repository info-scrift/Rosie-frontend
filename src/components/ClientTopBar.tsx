import { Bell, User, Search } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
const ClientTopBar = () => {
  return <motion.div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex justify-between items-center shadow-sm" initial={{
    y: -64
  }} animate={{
    y: 0
  }} transition={{
    duration: 0.3,
    ease: [0.4, 0, 0.2, 1]
  }}>
      <div className="flex items-center space-x-4">
        <motion.h1 className="text-2xl font-display font-semibold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent" initial={{
        opacity: 0,
        x: -20
      }} animate={{
        opacity: 1,
        x: 0
      }} transition={{
        delay: 0.1,
        duration: 0.5
      }}>
          Client Portal
        </motion.h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <motion.div whileHover={{
        scale: 1.05
      }} whileTap={{
        scale: 0.95
      }}>
          <Button variant="ghost" size="sm" className="relative text-black">
            <Bell className="h-5 w-5" />
            <motion.span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full" animate={{
            scale: [1, 1.2, 1]
          }} transition={{
            duration: 2,
            repeat: Infinity
          }} />
          </Button>
        </motion.div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <motion.div whileHover={{
            scale: 1.05
          }} whileTap={{
            scale: 0.95
          }}>
              <Button variant="ghost" size="sm" className="glass hover:bg-white/20 text-black">
                <User className="h-5 w-5 mr-2" />
                Account
              </Button>
            </motion.div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 glass border-white/20">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="hover:bg-white/10">Profile</DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-white/10">Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="hover:bg-white/10">Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </motion.div>;
};
export default ClientTopBar;