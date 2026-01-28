import { useAppSelector } from "@/app";
import {
  EditContact,
  getOtherProfileStatus,
  OtherUsersProfile,
} from "@/entities";
import { AnimatePresence, motion } from "framer-motion";

const ChatUIUserProfileComponent = () => {
  const isOpenOtherOsersProfile = useAppSelector(getOtherProfileStatus);

  return (
    <AnimatePresence mode="wait">
      {!!isOpenOtherOsersProfile.component && (
        <>
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.25 }}
            layout
            className="fixed right-0 top-0 z-12313 h-screen max-w-100 w-full bg-chatui-bg overflow-y-auto text-default-text-color scrollbar-thin otherprofile:border-l border-line-color shadow-[0_0px_30px_-8px_rgba(0,0,0,0.8)]"
          >
            {(() => {
              switch (isOpenOtherOsersProfile.component) {
                case "userProfile":
                  return (
                    <OtherUsersProfile
                      username={"durov"}
                    />
                  );
                case "editContact":
                  return <EditContact username={"durov"} />;
                default:
                  return null;
              }
            })()}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ChatUIUserProfileComponent;
