'use client'

import { Slide, toast } from "react-toastify";
import NotificationStructure from "./NotificationStructure";

const Notification = (content: string) => {
  toast(
    <NotificationStructure content={content} />,
    {
      autoClose: 3000,
      hideProgressBar: true,
      pauseOnHover: false,
      transition: Slide,
      style: {
        padding: '1rem',
        width: 'max-content',
        backgroundColor: 'var(--color-rect-bg)',
        border: '1px solid var(--color-rect-boder)',
        borderRadius: '0.5rem',
        backdropFilter: 'blur(10px)',
      },
    }
  );
};


export default Notification;