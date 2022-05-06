import {
  CameraIcon,
  MenuAlt2Icon,
  MenuIcon,
  XIcon,
} from "@heroicons/react/outline";
import { useState } from "react";
import Input from "~components/form/input";
import TextArea from "~components/form/textarea";

interface EmbedMessage {
  author?: {
    icon_url?: string;
    name?: string;
    url: string | null;
  };
  description?: string;
  color: string;
  fields?: Array<{
    inline: boolean;
    name: string;
    value: string;
  }>;
  footer?: {
    icon_url: string;
    text: string;
  };
  image?: { url: string };
  thumbnail?: { url: string };
  title?: string;
  url?: string;
}

export const DashboardPage = () => {
  const [embed, setEmbed] = useState<EmbedMessage>({
    author: {
      icon_url:
        "https://cdn-longterm.mee6.xyz/plugins/embeds/images/950392901047828521/1c0f84b3e5d588c467c677aa138fe5afb6188402e4494c79e48ec09fdc566023.png",
      name: "test",
      url: null,
    },
    color: "#5acff5",
    title: "dinhcao",
    description: "message",
    fields: [
      { inline: true, name: "1", value: "hehe" },
      { inline: true, name: "2", value: "hhe" },
      { inline: false, name: "dinhcao", value: "lmao" },
    ],
    footer: {
      icon_url:
        "https://cdn-longterm.mee6.xyz/plugins/embeds/images/950392901047828521/879ba67c8283357eb387a8a363dd3b22fee55250f264797b1a994d7345b56616.jpeg",
      text: "wyzu",
    },
    image: {
      url: "https://cdn-longterm.mee6.xyz/plugins/embeds/images/950392901047828521/bfcab63aedbd261c09dbdd44217ce5386dccbca6c05c2d7e1edad9d7f613cc28.gif",
    },
    thumbnail: {
      url: "https://cdn-longterm.mee6.xyz/plugins/embeds/images/950392901047828521/24bcd05fe3cc2d7c8ec9f556777c5a1e74f20a1bb41a0f20106fc8833cfc9327.jpeg",
    },
    url: "https://www.google.com/",
  });

  return (
    <div className="px-6 py-9">
      <h2 className="mb-6 text-xl font-semibold">Embeds</h2>
      <div className="grid gap-4 xl:grid-cols-2">
        <div className="border-gray-100 shadow-xl rounded-xl shadow-gray-100 bg-gray-50">
          <div className="p-6">
            <div className="p-4 bg-gray-100 border-l-4 rounded border-l-mochi-500">
              <p className="mb-2 text-xs font-medium text-gray-500">
                Stripe color
              </p>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-4 h-4 bg-white border border-gray-500 rounded-full" />
                <div className="w-4 h-4 rounded-full bg-mochi" />
                <div className="w-4 h-4 bg-yellow-500 rounded-full" />
                <div className="w-4 h-4 rounded-full bg-lime-500" />
                <div className="w-4 h-4 rounded-full bg-cyan-500" />
                <div className="w-4 h-4 bg-blue-500 rounded-full" />
                <div className="w-4 h-4 bg-indigo-500 rounded-full" />
              </div>
              <div className="flex gap-3 mb-4">
                <div className="pt-6">
                  <div className="flex items-center justify-center border border-gray-400 border-dashed rounded-full h-9 w-9">
                    <CameraIcon className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
                <div className="flex-1">
                  <p className="mb-2 text-xs font-medium text-gray-500">
                    Author
                  </p>
                  <Input
                    value={embed.author?.name}
                    changeValue={(value) => {}}
                    placeholder="Author name"
                  />
                </div>
              </div>
              <div className="mb-4">
                <p className="mb-2 text-xs font-medium text-gray-500">Title</p>
                <Input
                  value={embed.title}
                  changeValue={(value) => {}}
                  placeholder="Title text"
                />
              </div>
              <div className="mb-4">
                <p className="mb-2 text-xs font-medium text-gray-500">
                  Message
                </p>
                <TextArea
                  value={embed.description}
                  changeValue={(value) => {}}
                  placeholder="Title text"
                  maxLength={2000}
                />
              </div>
              <div className="mb-4">
                <p className="mb-2 text-xs font-medium text-gray-500">Fields</p>
                {embed.fields?.map((field, key) => (
                  <div
                    className="flex p-1 mb-4 bg-gray-200 rounded bg-opacity-40"
                    key={key}
                  >
                    <div className="flex-1">
                      <Input
                        value={field.name}
                        changeValue={(value) => {}}
                        placeholder="Field name"
                        className="mb-1"
                      />
                      <Input
                        value={field.value}
                        changeValue={(value) => {}}
                        placeholder="Field value"
                      />
                    </div>
                    <div className="pl-1">
                      <button className="flex items-center justify-center m-1.5 rounded-full bg-mochi-200">
                        <XIcon className="w-4 h-4 m-1 text-mochi-600" />
                      </button>
                      <div className="h-1.5" />
                      <button className="flex items-center justify-center m-1.5 bg-gray-300 rounded">
                        {field.inline ? (
                          <MenuAlt2Icon className="w-4 h-4 m-1 text-gray-700" />
                        ) : (
                          <MenuIcon className="w-4 h-4 m-1 text-gray-700" />
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mb-4">
                <div className="flex items-center justify-center w-full h-32 border border-gray-400 border-dashed rounded-lg">
                  <CameraIcon className="w-6 h-6 text-gray-400" />
                </div>
              </div>
              <div className="flex gap-3 mb-4">
                <div className="pt-6">
                  <div className="flex items-center justify-center border border-gray-400 border-dashed rounded-full h-9 w-9">
                    <CameraIcon className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
                <div className="flex-1">
                  <p className="mb-2 text-xs font-medium text-gray-500">
                    Footer
                  </p>
                  <Input
                    value={embed.footer?.text}
                    changeValue={(value) => {}}
                    placeholder="Footer text"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-gray-100 shadow-xl rounded-xl shadow-gray-100 bg-gray-50">
          <div className="p-6">
            <h3 className="mb-4 font-semibold text-md">Preview</h3>
          </div>
        </div>
      </div>
    </div>
  );
};
