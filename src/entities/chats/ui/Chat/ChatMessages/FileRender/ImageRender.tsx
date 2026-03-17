"use client";

import { useAppDispatch } from "@/app";
import { setChatImages, setIsImagesPreview } from "@/entities/chats/model";
import { FC } from "react";

interface Props {
  images: Array<string>;
  isMy: boolean;
}

const ImageRender: FC<Props> = ({ images, isMy }) => {
  const dispatch = useAppDispatch();

  const getRows = (length: number): Array<number> => {
    switch (length) {
      case 1:
        return [1];
      case 2:
        return [2];
      case 3:
        return [1, 2];
      case 4:
        return [1, 3];
      case 5:
        return [2, 3];
      case 6:
        return [3, 3];
      case 7:
        return [2, 2, 3];
      case 8:
        return [2, 3, 3];
      case 9:
        return [3, 3, 3];
      case 10:
        return [2, 2, 3, 3];
      default:
        const rows: number[] = [];
        let remaining = length;
        while (remaining > 0) {
          if (remaining <= 4) {
            rows.push(remaining);
            break;
          }
          rows.push(3);
          remaining -= 3;
        }
        return rows;
    }
  };

  const rows = getRows(images.length);
  let startSlice = 0;

  return (
    <div
      style={{
        gap: "2px",
      }}
      className={`flex flex-col rounded-2xl ${isMy ? "bg-accent-chat-bg-color" : "bg-chatui-bg"} overflow-hidden`}
    >
      {rows.map((count, i) => {
        const rowImages = images.slice(startSlice, startSlice + count);
        startSlice += count;
        return (
          <div
            key={i}
            style={{
              display: "flex",
              gap: "1px",
              height: `${400 / count}px`,
            }}
          >
            {rowImages.map((img) => (
              <img
                key={img}
                src={img}
                alt={img}
                onClick={() => {
                  dispatch(setIsImagesPreview(true));
                  dispatch(
                    setChatImages({
                      images,
                      startIndex: images.findIndex((el) => el === img),
                    }),
                  );
                }}
                className="flex-1 min-w-0 h-full object-cover aspect-square cursor-pointer"
              />
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default ImageRender;
