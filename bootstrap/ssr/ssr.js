import { jsx, Fragment, jsxs } from "react/jsx-runtime";
import { useForm, Link, usePage, router, createInertiaApp } from "@inertiajs/react";
import { toast } from "react-toastify";
import { useState, useMemo, useEffect, useCallback } from "react";
import { MdOutlinePostAdd, MdOutlineFileUpload, MdEditSquare } from "react-icons/md";
import { FaEdit, FaUserCircle, FaUserLock, FaSignOutAlt, FaBold, FaItalic, FaStrikethrough, FaParagraph, FaListUl, FaListOl, FaQuoteLeft, FaLink, FaImage, FaVideo, FaCamera, FaMinusCircle, FaLinkedinIn } from "react-icons/fa";
import { TiUserAdd } from "react-icons/ti";
import ReactQuill from "react-quill";
import { AiOutlineLoading } from "react-icons/ai";
import { mergeAttributes, Extension, EditorProvider, useCurrentEditor } from "@tiptap/react";
import Heading from "@tiptap/extension-heading";
import Image from "@tiptap/extension-image";
import Link$1 from "@tiptap/extension-link";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Youtube from "@tiptap/extension-youtube";
import HardBreak from "@tiptap/extension-hard-break";
import { createLowlight, common } from "lowlight";
import StarterKit from "@tiptap/starter-kit";
import { BiCodeBlock, BiUndo, BiRedo } from "react-icons/bi";
import Placeholder from "@tiptap/extension-placeholder";
import moment from "moment";
import { debounce } from "lodash";
import { FaCircleArrowRight, FaSquareXTwitter } from "react-icons/fa6";
import { LuDot } from "react-icons/lu";
import { IoIosAdd } from "react-icons/io";
import { CiEdit, CiFacebook } from "react-icons/ci";
import createServer from "@inertiajs/react/server";
import ReactDOMServer from "react-dom/server";
const Input = (props) => {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: props.className, children: [
    props.label !== null ? /* @__PURE__ */ jsx("label", { htmlFor: "username", className: " block text-sm tracking-wide font-semibold", children: props.label }) : null,
    /* @__PURE__ */ jsx("input", { ...props, className: `w-full border ${props.error ? "border-red-500 focus:outline-red-500" : "border-[#415A77] focus:outline-[#778DA9]"} bg-[#0D1B2A] outline-none p-2 text-xs rounded-md` }),
    props.error && /* @__PURE__ */ jsx("p", { className: " text-xs text-red-500 mt-1", children: props.error })
  ] }) });
};
const __vite_glob_0_6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Input
}, Symbol.toStringTag, { value: "Module" }));
const accessImg = "/build/assets/access-g0P4JTw7.jpg";
const Login = () => {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: "",
    password: ""
  });
  const create = (e) => {
    e.preventDefault();
    post("/authenticate");
  };
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("main", { className: " grid grid-cols-2 h-auto min-h-screen w-full bg-[#1b263b]", children: [
    /* @__PURE__ */ jsxs("div", { className: " h-screen flex flex-col items-center justify-center px-32", children: [
      /* @__PURE__ */ jsxs("div", { className: " mb-6", children: [
        /* @__PURE__ */ jsx("h1", { className: " text-center font-bold text-3xl tracking-wide", children: "Login Account" }),
        /* @__PURE__ */ jsx("p", { className: " text-center text-sm tracking-wide", children: "Login you account to access your and create your blog" })
      ] }),
      /* @__PURE__ */ jsxs("form", { className: " w-full", onSubmit: create, children: [
        /* @__PURE__ */ jsxs("div", { className: " flex flex-col gap-4", children: [
          /* @__PURE__ */ jsx(Input, { label: "Email Address", error: errors.email, type: "email", placeholder: "example@email.com", value: data.email, onChange: (e) => setData("email", e.target.value) }),
          /* @__PURE__ */ jsx(Input, { label: "Password", type: "password", placeholder: "Minimum of 8 character", value: data.password, onChange: (e) => setData("password", e.target.value) }),
          /* @__PURE__ */ jsx("div", { className: " flex items-center justify-end", children: /* @__PURE__ */ jsx("button", { type: "submit", className: "w-full font-bold bg-[#415A77] py-2 text-sm rounded px-3 text-light tracking-wide", children: "Signin" }) })
        ] }),
        /* @__PURE__ */ jsxs("p", { className: " text-xs text-right tracking-wide mt-2", children: [
          "Don't have an account? ",
          /* @__PURE__ */ jsx(Link, { href: "/register", className: "hover:underline", children: "Register" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("div", { className: "h-screen w-full", children: /* @__PURE__ */ jsx("img", { className: " w-full h-full object-cover", src: accessImg, alt: "Frredom" }) }) })
  ] }) });
};
const __vite_glob_0_0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Login
}, Symbol.toStringTag, { value: "Module" }));
const freedomImg = "/build/assets/freedom-B92aBvEg.jpg";
const Register = () => {
  const { data, setData, post, processing, errors, reset } = useForm({
    username: "",
    email: "",
    password: "",
    retypePassword: ""
  });
  const create = (e) => {
    e.preventDefault();
    post("/create-account", {
      onSuccess: (e2) => {
        toast.success("Account created successful!");
        reset();
      }
    });
  };
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("main", { className: " grid grid-cols-2 h-auto min-h-screen w-full bg-[#1b263b]", children: [
    /* @__PURE__ */ jsxs("div", { className: " h-screen flex flex-col items-center justify-center px-32", children: [
      /* @__PURE__ */ jsxs("div", { className: " mb-6", children: [
        /* @__PURE__ */ jsx("h1", { className: " text-center font-bold text-3xl tracking-wide", children: "Create Account" }),
        /* @__PURE__ */ jsx("p", { className: " text-center text-sm tracking-wide", children: "Signup now and unlock exclusive access!" })
      ] }),
      /* @__PURE__ */ jsxs("form", { className: " w-full", onSubmit: create, children: [
        /* @__PURE__ */ jsxs("div", { className: " flex flex-col gap-4", children: [
          /* @__PURE__ */ jsx(Input, { label: "Username", error: errors.username, type: "text", placeholder: "Create unique username", value: data.username, onChange: (e) => setData("username", e.target.value) }),
          /* @__PURE__ */ jsx(Input, { label: "Email Address", error: errors.email, type: "email", placeholder: "example@email.com", value: data.email, onChange: (e) => setData("email", e.target.value) }),
          /* @__PURE__ */ jsx(Input, { label: "Password", error: errors.password, type: "password", placeholder: "Minimum of 8 character", value: data.password, onChange: (e) => setData("password", e.target.value) }),
          /* @__PURE__ */ jsx(Input, { label: "Retype Password", error: errors.retypePassword, type: "password", placeholder: "Minimum of 8 character", value: data.retypePassword, onChange: (e) => setData("retypePassword", e.target.value) }),
          /* @__PURE__ */ jsx("div", { className: " flex items-center justify-end", children: /* @__PURE__ */ jsx("button", { type: "submit", className: "w-full font-bold bg-[#415A77] py-2 text-sm rounded px-3 text-light tracking-wide", children: "Signup" }) })
        ] }),
        /* @__PURE__ */ jsxs("p", { className: " text-xs text-right tracking-wide mt-2", children: [
          "Already have a account? ",
          /* @__PURE__ */ jsx(Link, { href: "/login", className: "hover:underline", children: "Signin" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("div", { className: "h-screen w-full", children: /* @__PURE__ */ jsx("img", { className: " w-full h-full object-cover", src: freedomImg, alt: "Frredom" }) }) })
  ] }) });
};
const __vite_glob_0_1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Register
}, Symbol.toStringTag, { value: "Module" }));
const altImage = "/build/assets/image-placeholder-DJW2cZ8R.webp";
const knowl = "/build/assets/knowl-logo-DY6vcT7o.png";
const Navigation = (props) => {
  const { url, component } = usePage();
  const [openMenu, setOpenMenu] = useState(false);
  const open = () => {
    setOpenMenu((prevState) => !prevState);
  };
  const logout = (e) => {
    e.preventDefault();
    router.post("/logout");
  };
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: " bg-[#0d1b2a] fixed top-0 left-0 right-0 z-50 border-b border-[#415A77]", children: /* @__PURE__ */ jsxs("nav", { className: " flex items-center justify-between py-3 max-w-[1500px] w-[90%] mx-auto relative", children: [
    /* @__PURE__ */ jsx(Link, { href: "/", children: /* @__PURE__ */ jsx("img", { className: " w-28", src: knowl, alt: "knowl" }) }),
    /* @__PURE__ */ jsxs("ul", { className: " flex items-center gap-8", children: [
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { href: "/blog-list", className: `${url.startsWith("/blog-list") ? "text-red-400 font-bold" : "text-[#E0E1DD]"} flex items-center gap-2 text-xs tracking-wide`, children: "Blogs" }) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { href: "/about", className: `${url === "/about" ? "text-red-400 font-bold" : "text-[#E0E1DD]"} flex items-center gap-2 text-xs tracking-wide`, children: "About" }) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { href: "/contact", className: `${url === "/contact" ? "text-red-400 font-bold" : "text-[#E0E1DD]"} flex items-center gap-2 text-xs tracking-wide`, children: "Contact" }) })
    ] }),
    /* @__PURE__ */ jsxs("ul", { className: " flex items-center gap-7", children: [
      url.startsWith("/blog-list/blog") || url.startsWith("/blog/list") ? /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Input, { placeholder: "Search...", value: props.search, onChange: props.setSearch }) }) : "",
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(Link, { href: "/blog/create", className: "flex items-center shadow gap-2 text-xs bg-[#415a77] text-light py-2 px-3 rounded-md", children: [
        /* @__PURE__ */ jsx(FaEdit, { className: " text-sm fill-light" }),
        "Write"
      ] }) }),
      /* @__PURE__ */ jsxs("li", { children: [
        /* @__PURE__ */ jsx("button", { onClick: open, className: " border border-secondary rounded-full", children: props.user ? /* @__PURE__ */ jsx(
          "img",
          {
            src: (props.user.upload && props.user.upload.path) ?? altImage,
            alt: (props.user.upload && props.user.upload.filename) ?? "user",
            className: "relative inline-block object-cover object-center w-8 h-8 rounded-full cursor-pointer"
          }
        ) : /* @__PURE__ */ jsx("img", { src: altImage, alt: "user", className: "relative inline-block object-cover object-center w-8 h-8 rounded-full cursor-pointer" }) }),
        /* @__PURE__ */ jsxs(
          "ul",
          {
            className: `${openMenu ? "flex" : "hidden"} absolute z-10 flex min-w-[180px] right-0 top-13 flex-col gap-2 overflow-auto rounded-md border border-[#415A77] bg-[#1b263b] p-3 font-sans text-sm font-normal text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-none`,
            children: [
              props.user ? /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsxs(
                  Link,
                  {
                    href: "/profile",
                    className: "flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-3 pt-[9px] pb-2 text-start leading-tight outline-none transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900",
                    children: [
                      /* @__PURE__ */ jsx(FaUserCircle, { className: " text-lg" }),
                      /* @__PURE__ */ jsx("p", { className: "block font-sans text-xs antialiased font-medium leading-normal text-inherit", children: "My Profile" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs(
                  Link,
                  {
                    href: "/blog/list",
                    className: "flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-3 pt-[9px] pb-2 text-start leading-tight outline-none transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900",
                    children: [
                      /* @__PURE__ */ jsx(MdOutlinePostAdd, { className: " text-lg" }),
                      /* @__PURE__ */ jsx("p", { className: "block font-sans text-xs antialiased font-medium leading-normal text-inherit", children: "Blog Post" })
                    ]
                  }
                )
              ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsxs(
                  Link,
                  {
                    href: "/login",
                    className: "flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-3 pt-[9px] pb-2 text-start leading-tight outline-none transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900",
                    children: [
                      /* @__PURE__ */ jsx(FaUserLock, { className: " text-lg" }),
                      /* @__PURE__ */ jsx("p", { className: "block font-sans text-xs antialiased font-medium leading-normal text-inherit", children: "Signin" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs(
                  Link,
                  {
                    href: "/register",
                    className: "flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-3 pt-[9px] pb-2 text-start leading-tight outline-none transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900",
                    children: [
                      /* @__PURE__ */ jsx(TiUserAdd, { className: " text-lg" }),
                      /* @__PURE__ */ jsx("p", { className: "block font-sans text-xs antialiased font-medium leading-normal text-inherit", children: "Create Account" })
                    ]
                  }
                )
              ] }),
              props.user ? /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx("hr", { className: "my-2 border-[#415A77]", role: "menuitem" }),
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    onClick: logout,
                    className: "flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-3 pt-[9px] pb-2 text-start leading-tight outline-none transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900",
                    children: [
                      /* @__PURE__ */ jsx(FaSignOutAlt, { className: " text-lg" }),
                      /* @__PURE__ */ jsx("p", { className: "block font-sans text-xs antialiased font-medium leading-normal text-inherit", children: "Sign Out" })
                    ]
                  }
                )
              ] }) : null
            ]
          }
        )
      ] })
    ] })
  ] }) }) });
};
const __vite_glob_0_10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Navigation
}, Symbol.toStringTag, { value: "Module" }));
const MainLayout = (props) => {
  const { auth } = usePage().props;
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("main", { className: " bg-[#1b263b] h-auto min-h-screen", children: /* @__PURE__ */ jsxs("main", { className: " max-w-[1500px] w-[90%] mx-auto", children: [
    /* @__PURE__ */ jsx(Navigation, { setSearch: props.setSearch, search: props.search, user: auth.user }),
    /* @__PURE__ */ jsx("section", { className: "pt-[65px] pb-10", children: props.children })
  ] }) }) });
};
const RteEditor = (props) => {
  const toolbarOptions = useMemo(() => ({
    syntax: true,
    toolbar: {
      container: [
        [{ "header": [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        ["blockquote", "code-block"],
        [{ "list": "ordered" }, { "list": "bullet" }, { "list": "check" }],
        [{ "script": "sub" }, { "script": "super" }],
        [{ "indent": "-1" }, { "indent": "+1" }],
        [{ "color": [] }, { "background": [] }],
        ["link", "image", "video"]
      ]
    }
  }), []);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: `${props.error ? "border-red-500 border rounded-md p-1" : ""}`, children: /* @__PURE__ */ jsx(
      ReactQuill,
      {
        theme: "snow",
        value: props.rteValue,
        onChange: (e) => props.setRteValue("content", e),
        placeholder: "Write your blog content here...",
        modules: { ...toolbarOptions }
      }
    ) }),
    props.error && /* @__PURE__ */ jsx("p", { className: " text-xs text-red-500", children: props.error })
  ] });
};
const __vite_glob_0_8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: RteEditor
}, Symbol.toStringTag, { value: "Module" }));
const Select = (props) => {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: " w-full", children: [
    /* @__PURE__ */ jsxs("select", { ...props, className: `w-full border ${props.error ? "border-red-500 focus:outline-red-500" : "border-[#415A77]  focus:outline-[#778DA9]"} bg-[#0D1B2A] outline-none p-2 text-xs rounded-md`, children: [
      /* @__PURE__ */ jsx("option", { value: "", children: "---Choose category---" }),
      props.data.map((item, index) => {
        return /* @__PURE__ */ jsx("option", { value: item.id, children: item.name }, item.id);
      })
    ] }),
    props.error && /* @__PURE__ */ jsx("p", { className: " text-xs text-red-500 mt-1", children: props.error })
  ] }) });
};
const __vite_glob_0_7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Select
}, Symbol.toStringTag, { value: "Module" }));
const Button = (props) => {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(
    "button",
    {
      type: "button",
      onClick: props.event,
      className: `font-bold bg-[#415A77] py-2 flex items-center gap-1 text-sm rounded px-3 text-[#E0E1DD] tracking-wide ${props.className}`,
      children: [
        props.children,
        props.loading ? /* @__PURE__ */ jsx(AiOutlineLoading, { className: "animate-spin" }) : null
      ]
    }
  ) });
};
const __vite_glob_0_5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Button
}, Symbol.toStringTag, { value: "Module" }));
const lowlight = createLowlight(common);
const MenuBar = () => {
  const { editor } = useCurrentEditor();
  const [openHeading, setOpenHeading] = useState(false);
  const openHeadingMenu = () => {
    setOpenHeading((prevState) => !prevState);
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const src = e.target.result;
        editor.chain().focus().setImage({ src }).run();
      };
      reader.readAsDataURL(file);
    }
  };
  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);
    if (url === null) {
      return;
    }
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);
  const addYoutubeVideo = () => {
    const url = prompt("Enter YouTube URL");
    if (url) {
      editor.commands.setYoutubeVideo({
        src: url
      });
    }
  };
  if (!editor) {
    return null;
  }
  return /* @__PURE__ */ jsx("div", { className: "mb-2", children: /* @__PURE__ */ jsxs("div", { className: "button-group flex items-center justify-between", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxs("div", { className: " relative", children: [
        /* @__PURE__ */ jsx("button", { type: "button", onClick: openHeadingMenu, className: " py-1 px-3 border border-secondary text-sm rounded-md", children: "Heading" }),
        /* @__PURE__ */ jsxs("ul", { className: `${openHeading ? "block" : "hidden"} absolute z-[60] bottom-8 border border-[#415A77] bg-[#1B263B] rounded-md mt-1 shadow w-[130px]`, children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
              className: `${editor.isActive("heading", { level: 2 }) ? "bg-[#415A77] text-[#E0E1DD]" : ""} py-1 px-2 text-left hover:bg-[#415A77] hover:text-light w-full`,
              children: "Heading 2"
            }
          ) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
              className: `${editor.isActive("heading", { level: 3 }) ? "bg-[#415A77] text-[#E0E1DD]" : ""} py-1 px-2 text-left hover:bg-[#415A77] hover:text-light w-full`,
              children: "Heading 3"
            }
          ) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => editor.chain().focus().toggleHeading({ level: 4 }).run(),
              className: `${editor.isActive("heading", { level: 4 }) ? "bg-[#415A77] text-[#E0E1DD]" : ""} py-1 px-2 text-left hover:bg-[#415A77] hover:text-light w-full`,
              children: "Heading 4"
            }
          ) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => editor.chain().focus().toggleHeading({ level: 5 }).run(),
              className: `${editor.isActive("heading", { level: 5 }) ? "bg-[#415A77] text-[#E0E1DD]" : ""} py-1 px-2 text-left hover:bg-[#415A77] hover:text-light w-full`,
              children: "Heading 5"
            }
          ) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => editor.chain().focus().toggleHeading({ level: 6 }).run(),
              className: `${editor.isActive("heading", { level: 6 }) ? "bg-[#415A77] text-[#E0E1DD]" : ""} py-1 px-2 text-left hover:bg-[#415A77] hover:text-light w-full`,
              children: "Heading 6"
            }
          ) })
        ] })
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          title: "Bold",
          onClick: () => editor.chain().focus().toggleBold().run(),
          disabled: !editor.can().chain().focus().toggleBold().run(),
          className: `${editor.isActive("bold") ? "bg-[#415A77] text-[#E0E1DD] group" : ""} p-1 rounded`,
          children: /* @__PURE__ */ jsx(FaBold, { className: "group-[.bg-secondary]:fill-light text-sm" })
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          title: "Italic",
          onClick: () => editor.chain().focus().toggleItalic().run(),
          disabled: !editor.can().chain().focus().toggleItalic().run(),
          className: `${editor.isActive("italic") ? "bg-[#415A77] text-[#E0E1DD] group" : ""} p-1 rounded`,
          children: /* @__PURE__ */ jsx(FaItalic, { className: "group-[.bg-secondary]:fill-light text-sm" })
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          title: "Strike",
          onClick: () => editor.chain().focus().toggleStrike().run(),
          disabled: !editor.can().chain().focus().toggleStrike().run(),
          className: `${editor.isActive("strike") ? "bg-[#415A77] text-[#E0E1DD] group" : ""} p-1 rounded`,
          children: /* @__PURE__ */ jsx(FaStrikethrough, { className: "group-[.bg-secondary]:fill-light text-sm" })
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          title: "Paragraph",
          onClick: () => editor.chain().focus().setParagraph().run(),
          className: `${editor.isActive("paragraph") ? "bg-[#415A77] text-[#E0E1DD] group" : ""} p-1 rounded`,
          children: /* @__PURE__ */ jsx(FaParagraph, { className: "group-[.bg-secondary]:fill-light text-sm" })
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          title: "Bullet List",
          onClick: () => editor.chain().focus().toggleBulletList().run(),
          className: `${editor.isActive("bulletList") ? "bg-[#415A77] text-[#E0E1DD] group" : ""} p-1 rounded`,
          children: /* @__PURE__ */ jsx(FaListUl, { className: "group-[.bg-secondary]:fill-light text-sm" })
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          title: "Order List",
          onClick: () => editor.chain().focus().toggleOrderedList().run(),
          className: `${editor.isActive("orderedList") ? "bg-[#415A77] text-[#E0E1DD] group" : ""} p-1 rounded`,
          children: /* @__PURE__ */ jsx(FaListOl, { className: "group-[.bg-secondary]:fill-light text-sm" })
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          title: "Code Block",
          onClick: () => editor.chain().focus().toggleCodeBlock().run(),
          className: `${editor.isActive("codeBlock") ? "bg-[#415A77] text-[#E0E1DD] group" : ""} p-1 rounded`,
          children: /* @__PURE__ */ jsx(BiCodeBlock, { className: "group-[.bg-secondary]:fill-light text-sm" })
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          title: "Qoute",
          onClick: () => editor.chain().focus().toggleBlockquote().run(),
          className: `${editor.isActive("blockquote") ? "bg-[#415A77] text-[#E0E1DD] group" : ""} p-1 rounded`,
          children: /* @__PURE__ */ jsx(FaQuoteLeft, { className: "group-[.bg-secondary]:fill-light text-sm" })
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          title: "Link",
          onClick: setLink,
          className: `${editor.isActive("blockquote") ? "bg-[#415A77] text-[#E0E1DD] group" : ""} p-1 rounded`,
          children: /* @__PURE__ */ jsx(FaLink, { className: "group-[.bg-secondary]:fill-light text-sm" })
        }
      ),
      /* @__PURE__ */ jsxs(
        "label",
        {
          htmlFor: "image",
          title: "Image",
          className: `p-1 rounded cursor-pointer`,
          children: [
            /* @__PURE__ */ jsx("input", { type: "file", hidden: true, id: "image", onChange: handleFileChange }),
            /* @__PURE__ */ jsx(FaImage, {})
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          title: "Video",
          onClick: addYoutubeVideo,
          className: `${editor.isActive("blockquote") ? "bg-[#415A77] text-[#E0E1DD] group" : ""} p-1 rounded`,
          children: /* @__PURE__ */ jsx(FaVideo, { className: "group-[.bg-secondary]:fill-light text-sm" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: " flex items-center gap-2", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          title: "Undo",
          onClick: () => editor.chain().focus().undo().run(),
          disabled: !editor.can().chain().focus().undo().run(),
          children: /* @__PURE__ */ jsx(BiUndo, { className: " text-lg" })
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          title: "Redo",
          onClick: () => editor.chain().focus().redo().run(),
          disabled: !editor.can().chain().focus().redo().run(),
          className: " text-lg",
          children: /* @__PURE__ */ jsx(BiRedo, {})
        }
      )
    ] })
  ] }) });
};
const Tiptap = (props) => {
  const [value, setValue] = useState(props.rteValue);
  const extensions = useMemo(() => {
    return [
      StarterKit.configure({
        heading: false,
        codeBlock: false,
        hardBreak: false
      }),
      Heading.configure({ levels: [1, 2] }).extend({
        levels: [1, 2],
        renderHTML({ node, HTMLAttributes }) {
          const level = this.options.levels.includes(node.attrs.level) ? node.attrs.level : this.options.levels[0];
          const classes = {
            2: "text-3xl",
            3: "text-2xl",
            4: "text-xl",
            5: "text-lg",
            6: "text-base"
          };
          return [
            `h${level}`,
            mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
              class: `${classes[level]}`
            }),
            0
          ];
        }
      }),
      Image.configure({
        inline: true,
        allowBase64: true
      }),
      Link$1.configure({
        autolink: true,
        openOnClick: true,
        defaultProtocol: "https",
        HTMLAttributes: {
          class: "cursor-pointer text-blue-500 hover:underline"
        }
      }),
      CodeBlockLowlight.configure({
        lowlight,
        HTMLAttributes: {
          class: "rounded-md"
        }
      }),
      Youtube.configure({
        inline: false,
        width: 480,
        height: 320,
        nocookie: true,
        allowFullscreen: true,
        ccLanguage: "es",
        disableKBcontrols: true,
        loop: true
      }),
      HardBreak.extend({
        addKeyboardShortcuts() {
          return {
            Enter: () => this.editor.commands.setHardBreak()
          };
        }
      }),
      Placeholder.configure({
        placeholder: "Write your blog content here...",
        considerAnyAsEmpty: true
      }),
      Extension.create({
        onUpdate({ editor }) {
          let value2 = editor.getHTML();
          value2 = value2.replace(/<p>\s*<\/p>/g, "");
          setValue(value2);
        }
      })
    ];
  }, []);
  useEffect(() => {
    props.setRteValue === null ? null : props.setRteValue("content", value);
  }, [value]);
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: ` ${props.error ? "border border-red-500 p-2 rounded-md" : ""}`, children: [
    /* @__PURE__ */ jsx(
      EditorProvider,
      {
        extensions,
        content: props.rteValue,
        editorProps: {
          attributes: {
            class: `${props.styleContainer == null ? "border-[#415A77] h-[300px] border" : props.styleContainer}`
          }
        },
        editable: props.editable == null ? true : false,
        slotBefore: props.disableMenuBar ? null : /* @__PURE__ */ jsx(MenuBar, {})
      }
    ),
    props.error && /* @__PURE__ */ jsx("p", { className: " text-xs text-red-500 mt-1", children: props.error })
  ] }) });
};
const __vite_glob_0_9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Tiptap
}, Symbol.toStringTag, { value: "Module" }));
const CreateBlog = (props) => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { data, setData, post, errors, progress, reset } = useForm({
    title: "",
    description: "",
    category: "",
    is_publish: false,
    content: null,
    image: null
  });
  const store = (e) => {
    e.preventDefault();
    post(`/blog/store`, {
      onSuccess: () => {
        setData({
          title: "",
          description: "",
          category: "",
          is_publish: false,
          content: null,
          image: null
        });
        setImage(null);
        toast.success("New blog successfully uploaded!");
      },
      onStart: () => {
        setLoading(true);
      },
      onFinish: () => {
        setLoading(false);
      }
    });
  };
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
      setData("image", event.target.files[0]);
    }
  };
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(MainLayout, { children: [
    /* @__PURE__ */ jsx("div", { className: " mb-8 py-4 border-b", children: /* @__PURE__ */ jsx("h1", { className: " text-xl font-bold", children: "Get Started on Your New Blog Today📒" }) }),
    /* @__PURE__ */ jsx("div", { className: "pb-8", children: /* @__PURE__ */ jsxs("form", { children: [
      /* @__PURE__ */ jsxs("div", { className: " grid grid-cols-[70%_27%] gap-[3%] mb-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Input, { error: errors.title, type: "text", label: "Title", value: data.title, onChange: (e) => setData("title", e.target.value), placeholder: "Create your unique title of your blog here...", className: "mb-5" }),
          /* @__PURE__ */ jsx(Input, { error: errors.description, type: "text", label: "Description", value: data.description, onChange: (e) => setData("description", e.target.value), placeholder: "Add description of your blog here...", className: "mb-5" }),
          /* @__PURE__ */ jsxs("div", { className: " flex items-center justify-start gap-6", children: [
            /* @__PURE__ */ jsx("div", { className: "", children: /* @__PURE__ */ jsx(Select, { error: errors.category, data: props.category, value: data.category, onChange: (e) => setData("category", e.target.value), className: "w-full" }) }),
            /* @__PURE__ */ jsxs("div", { className: " flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("label", { htmlFor: "is_publish", className: " text-sm", children: "Make this public" }),
              /* @__PURE__ */ jsx("input", { type: "checkbox", id: "is_publish", checked: data.is_publish, onChange: (e) => setData("is_publish", e.target.checked) })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: `${errors.image ? "border-red-500 p-1" : "border-[#415A77] bg-[#0D1B2A] "} w-full h-[200px] p-2  flex  border-dashed border-2  rounded-md items-center mx-auto text-center cursor-pointer`, children: [
            /* @__PURE__ */ jsx("input", { id: "upload", type: "file", className: "hidden", accept: "image/*", onChange: onImageChange }),
            /* @__PURE__ */ jsx("label", { htmlFor: "upload", className: "cursor-pointer w-full h-[200px] py-2 flex items-center justify-center", children: image === null ? /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { className: " flex items-center justify-center", children: /* @__PURE__ */ jsx(MdOutlineFileUpload, { className: " text-4xl" }) }),
              /* @__PURE__ */ jsx("h5", { className: "mb-2 text-xl font-bold tracking-tight text-[#E0E1DD]", children: "Upload picture" }),
              /* @__PURE__ */ jsxs("p", { className: "font-normal text-sm text-[#778DA9] md:px-6", children: [
                "Choose photo size should be less than ",
                /* @__PURE__ */ jsx("b", { className: "text-[#E0E1DD]", children: "8mb" })
              ] }),
              /* @__PURE__ */ jsxs("p", { className: "font-normal text-sm text-[#778DA9] md:px-6", children: [
                "and should be in ",
                /* @__PURE__ */ jsx("b", { className: "text-[#E0E1DD]", children: "JPG, PNG, or WEBP" }),
                " format."
              ] }),
              /* @__PURE__ */ jsx("span", { id: "filename", className: "text-gray-500 bg-gray-200 z-50" })
            ] }) : /* @__PURE__ */ jsx("img", { className: " w-full h-full object-cover rounded-md", src: image, alt: "" }) })
          ] }),
          errors.image && /* @__PURE__ */ jsx("p", { className: " text-xs text-red-500", children: errors.image })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: " mb-2", children: /* @__PURE__ */ jsx(Tiptap, { error: errors.content, rteValue: data.content, setRteValue: setData }) }),
      /* @__PURE__ */ jsxs("div", { className: " flex items-center justify-end gap-2", children: [
        /* @__PURE__ */ jsx(Link, { href: "/", className: " font-bold border border-[#415A77]  py-2 text-sm rounded px-3 text-[#E0E1DD] tracking-wide", children: "Back" }),
        /* @__PURE__ */ jsx(Button, { event: store, loading, children: "Save" })
      ] })
    ] }) })
  ] }) });
};
const __vite_glob_0_2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: CreateBlog
}, Symbol.toStringTag, { value: "Module" }));
const EditBlog = (props) => {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState((props.blog.upload && props.blog.upload.path) ?? null);
  const { data, setData, post, errors, progress, reset } = useForm({
    id: props.blog.id,
    title: props.blog.title,
    description: props.blog.description,
    category: props.blog.category_reference_id,
    content: props.blog.content,
    is_publish: props.blog.is_published,
    image: null
  });
  const store = (e) => {
    e.preventDefault();
    post(`/blog/save-edit`, {
      onSuccess: () => {
        toast.success("blog successfully updated!");
      },
      onStart: () => {
        setLoading(true);
      },
      onFinish: () => {
        setLoading(false);
      }
    });
  };
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
      setData("image", event.target.files[0]);
    }
  };
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(MainLayout, { children: [
    /* @__PURE__ */ jsx("div", { className: " mb-8 py-4 border-b", children: /* @__PURE__ */ jsx("h1", { className: " text-xl font-bold", children: "Update Blog" }) }),
    /* @__PURE__ */ jsx("div", { className: "pb-8", children: /* @__PURE__ */ jsxs("form", { children: [
      /* @__PURE__ */ jsxs("div", { className: " grid grid-cols-[70%_27%] gap-[3%] mb-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Input, { error: errors.title, type: "text", label: "Title", value: data.title, onChange: (e) => setData("title", e.target.value), placeholder: "Create your unique title of your blog here...", className: "mb-5" }),
          /* @__PURE__ */ jsx(Input, { error: errors.description, type: "text", label: "Description", value: data.description, onChange: (e) => setData("description", e.target.value), placeholder: "Add description of your blog here...", className: "mb-5" }),
          /* @__PURE__ */ jsxs("div", { className: " flex items-center justify-start gap-6", children: [
            /* @__PURE__ */ jsx("div", { className: "", children: /* @__PURE__ */ jsx(Select, { error: errors.category, data: props.category, value: data.category, onChange: (e) => setData("category", e.target.value), className: "w-full" }) }),
            /* @__PURE__ */ jsxs("div", { className: " flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("label", { htmlFor: "is_publish", className: " text-sm", children: "Make this public" }),
              /* @__PURE__ */ jsx("input", { type: "checkbox", id: "is_publish", checked: data.is_publish, onChange: (e) => setData("is_publish", e.target.checked) })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: `${errors.image ? "border-red-500 p-1" : "border-[#415A77] bg-[#0D1B2A] "} w-full h-[200px] p-2  flex border-dashed border-2  rounded-md items-center mx-auto text-center cursor-pointer`, children: [
            /* @__PURE__ */ jsx("input", { id: "upload", type: "file", className: "hidden", accept: "image/*", onChange: onImageChange }),
            /* @__PURE__ */ jsx("label", { htmlFor: "upload", className: "cursor-pointer w-full h-[200px] py-2 flex items-center justify-center", children: image === null ? /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { className: " flex items-center justify-center", children: /* @__PURE__ */ jsx(MdOutlineFileUpload, { className: " text-4xl" }) }),
              /* @__PURE__ */ jsx("h5", { className: "mb-2 text-xl font-bold tracking-tight text-[#E0E1DD]", children: "Upload picture" }),
              /* @__PURE__ */ jsxs("p", { className: "font-normal text-sm text-[#778DA9] md:px-6", children: [
                "Choose photo size should be less than ",
                /* @__PURE__ */ jsx("b", { className: "text-[#E0E1DD]", children: "8mb" })
              ] }),
              /* @__PURE__ */ jsxs("p", { className: "font-normal text-sm text-[#778DA9] md:px-6", children: [
                "and should be in ",
                /* @__PURE__ */ jsx("b", { className: "text-[#E0E1DD]", children: "JPG, PNG, or WEBP" }),
                " format."
              ] }),
              /* @__PURE__ */ jsx("span", { id: "filename", className: "text-gray-500 bg-gray-200 z-50" })
            ] }) : /* @__PURE__ */ jsx("img", { className: " w-full h-full object-cover rounded-md", src: image, alt: "" }) })
          ] }),
          errors.image && /* @__PURE__ */ jsx("p", { className: " text-xs text-red-500", children: errors.image })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: " mb-2", children: /* @__PURE__ */ jsx(Tiptap, { error: errors.content, rteValue: data.content, setRteValue: setData }) }),
      /* @__PURE__ */ jsxs("div", { className: " flex items-center justify-end gap-2", children: [
        /* @__PURE__ */ jsx(Link, { href: "/", className: " font-bold border border-[#415A77]  py-2 text-sm rounded px-3 text-[#E0E1DD] tracking-wide", children: "Back" }),
        /* @__PURE__ */ jsx(Button, { event: store, loading, children: "Save" })
      ] })
    ] }) })
  ] }) });
};
const __vite_glob_0_3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: EditBlog
}, Symbol.toStringTag, { value: "Module" }));
const imagePlaceholder = "/build/assets/placeholder-C6l5eRrS.jpg";
const empty = "/build/assets/empty-DnJmQ4MH.webp";
const NoDataFound = ({ content }) => {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: " flex flex-col items-center justify-center", children: [
    /* @__PURE__ */ jsx("img", { src: empty, alt: "empty" }),
    /* @__PURE__ */ jsx("h1", { className: " text-3xl font-bold tracking-wide", children: content })
  ] }) });
};
const __vite_glob_0_11 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: NoDataFound
}, Symbol.toStringTag, { value: "Module" }));
const BlogList = (props) => {
  const [search, setSearch] = useState("");
  const searchBlog = (e) => {
    setSearch(e.target.value);
  };
  useEffect(() => {
    const searchDeb = debounce(() => {
      router.get("/blog/list", {
        search
      }, {
        preserveState: true
      });
    }, 300);
    searchDeb();
    return () => searchDeb.cancel();
  }, [search]);
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(MainLayout, { setSearch: searchBlog, search, children: /* @__PURE__ */ jsxs("div", { className: " pt-3", children: [
    /* @__PURE__ */ jsx("div", { className: " flex items-center justify-between mb-2", children: /* @__PURE__ */ jsx("h2", { className: " text-2xl font-bold tracking-wide mb-2", children: "Blog post" }) }),
    props.blogs.length > 0 ? /* @__PURE__ */ jsx("div", { className: " grid grid-cols-3 gap-2", children: props.blogs.map((blog) => /* @__PURE__ */ jsxs("div", { className: "", children: [
      /* @__PURE__ */ jsx("div", { className: "h-[250px] overflow-hidden rounded-t-md mb-2 border border-[#415A77] rounded-md", children: /* @__PURE__ */ jsx("img", { className: " w-full h-full object-cover rounded-t-md", src: (blog.upload && blog.upload.path) ?? imagePlaceholder, alt: "" }) }),
      /* @__PURE__ */ jsxs("div", { className: " py-2", children: [
        /* @__PURE__ */ jsxs("div", { className: " flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { className: " flex items-center gap-1", children: [
            /* @__PURE__ */ jsx("div", { className: " bg-[#415A77] rounded py-1 px-2 inline-block text-xs text-light mb-2", children: blog.category.name }),
            /* @__PURE__ */ jsx("div", { className: `${blog.is_published === 1 ? "bg-green-500 text-[#1B263B]" : "bg-red-500 text-[#E0E1DD]"}  rounded py-1 px-2 inline-block text-xs  font-bold mb-2`, children: blog.is_published === 1 ? "Published" : "Draft" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: " flex items-center gap-3", children: /* @__PURE__ */ jsx(Link, { title: "Edit", href: `/blog/edit/${blog.id}`, children: /* @__PURE__ */ jsx(MdEditSquare, { className: " text-lg fill-[#E0E1DD]" }) }) })
        ] }),
        /* @__PURE__ */ jsx("p", { className: " font-bold mb-1 text-lg", children: blog.title }),
        /* @__PURE__ */ jsx("p", { className: " text-xs", children: moment(blog.created_at).format("LL") })
      ] })
    ] }, blog.id)) }) : /* @__PURE__ */ jsx(NoDataFound, { content: "Uh-oh! No data found." })
  ] }) }) });
};
const __vite_glob_0_4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: BlogList
}, Symbol.toStringTag, { value: "Module" }));
const Blogs = (props) => {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(MainLayout, { pageTitle: "Blogs", children: [
    props.latest_blog.length > 0 ? /* @__PURE__ */ jsxs("main", { className: " grid grid-cols-2 gap-1 mb-10", children: [
      /* @__PURE__ */ jsxs("section", { className: " flex items-center relative border border-[#778DA9] rounded-md overflow-hidden p-1", children: [
        /* @__PURE__ */ jsxs("div", { className: " rounded relative w-full h-full", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              className: " w-full h-full object-cover rounded",
              src: (props.latest_blog[0].upload && props.latest_blog[0].upload.path) ?? imagePlaceholder,
              alt: (props.latest_blog[0].upload && props.latest_blog[0].upload.filename) ?? "No image available"
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-secondary bg-opacity-40 rounded" })
        ] }),
        /* @__PURE__ */ jsx(Link, { href: `/blog-list/read/${props.latest_blog[0].user.username}/${props.latest_blog[0].slug}`, children: /* @__PURE__ */ jsxs("div", { className: " absolute bottom-4 left-4", children: [
          /* @__PURE__ */ jsx("div", { className: " bg-light rounded py-1 px-2 inline-block text-xs text-primary mb-1", children: props.latest_blog[0].category.name }),
          /* @__PURE__ */ jsx("p", { className: " font-bold mb-1 text-light text-3xl", children: props.latest_blog[0].title }),
          /* @__PURE__ */ jsxs("p", { className: " text-xs text-light", children: [
            (props.latest_blog[0].user.user_detail && props.latest_blog[0].user.full_name) ?? props.latest_blog[0].user.username,
            " | ",
            moment(props.latest_blog[0].created_at).format("ll")
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsx("section", { className: " flex items-start ", children: /* @__PURE__ */ jsx("ul", { className: " flex flex-col gap-2", children: props.latest_blog.map((blog) => /* @__PURE__ */ jsx(Link, { href: `/blog-list/read/${blog.user.username}/${blog.slug}`, children: /* @__PURE__ */ jsxs("li", { className: "grid grid-cols-2 gap-2", children: [
        /* @__PURE__ */ jsx("div", { className: " w-full h-[170px] rounded border p-1 border-[#415A77]", children: /* @__PURE__ */ jsx(
          "img",
          {
            className: " w-full h-full object-cover rounded",
            src: (blog.upload && blog.upload.path) ?? imagePlaceholder,
            alt: (blog.upload && blog.upload.filename) ?? "No image available"
          }
        ) }),
        /* @__PURE__ */ jsx("div", { className: "inline-flex justify-center flex-col", children: /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: " bg-[#415a77] rounded py-1 px-2 inline-block text-xs text-light mb-1", children: blog.category.name }),
          /* @__PURE__ */ jsx("p", { className: " font-bold mb-1 text-xl text-[#E0E1DD]", children: blog.title }),
          /* @__PURE__ */ jsxs("p", { className: " text-xs text-[#E0E1DD]", children: [
            (blog.user.user_detail && blog.user.full_name) ?? blog.user.username,
            " | ",
            moment(blog.created_at).format("ll")
          ] })
        ] }) })
      ] }) }, blog.id)) }) })
    ] }) : /* @__PURE__ */ jsx(NoDataFound, { content: "Uh-oh! No data found. Please be the first to share." }),
    props.latest_blog.length > 0 ? /* @__PURE__ */ jsx("div", { className: "mb-10 flex items-center gap-2", children: props.categories.map((category) => /* @__PURE__ */ jsx(Link, { href: `/blog-list/blog/${category.name.toLowerCase()}`, className: "flex items-center shadow gap-2 text-xs border border-[#415a77] hover:bg-[#415a77] text-light py-2 px-3 rounded-md", children: category.name }, category.id)) }) : null,
    props.blogs.filter((blog) => blog.category.name === "Technology" || blog.category.name === "Programming").length > 0 ? /* @__PURE__ */ jsxs("div", { className: " border-b border-secondary pb-5 mb-5", children: [
      /* @__PURE__ */ jsxs("div", { className: " flex items-center justify-between mb-1", children: [
        /* @__PURE__ */ jsx("h2", { className: " text-2xl font-bold tracking-wide text-[#E0E1DD]", children: "Technology" }),
        /* @__PURE__ */ jsx(Link, { href: "/blog-list/blog/technology", className: "text-sm text-[#E0E1DD] hover:underline", children: "See all" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: " grid grid-cols-3 gap-2", children: props.blogs.filter((blog) => blog.category.name === "Technology" || blog.category.name === "Programming").slice(0, 6).map((blog) => /* @__PURE__ */ jsx(Link, { href: `/blog-list/read/${blog.user.username}/${blog.slug}`, children: /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: " h-[250px] overflow-hidden rounded mb-2 border border-[#415A77]", children: /* @__PURE__ */ jsx(
          "img",
          {
            className: " w-full h-full object-cover rounded",
            src: (blog.upload && blog.upload.path) ?? imagePlaceholder,
            alt: (blog.upload && blog.upload.filename) ?? "No image available"
          }
        ) }),
        /* @__PURE__ */ jsxs("div", { className: " mb-1", children: [
          /* @__PURE__ */ jsx("div", { className: " bg-[#415a77] rounded py-1 px-2 inline-block text-xs text-light mb-1", children: blog.category.name }),
          /* @__PURE__ */ jsx("p", { className: " font-bold mb-1 text-xl text-[#E0E1DD]", children: blog.title }),
          /* @__PURE__ */ jsxs("p", { className: " text-xs text-[#E0E1DD]", children: [
            (blog.user.user_detail && blog.user.full_name) ?? blog.user.username,
            " | ",
            moment(blog.created_at).format("ll")
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("p", { className: " font-normal mb-1  text-sm text-gray-400", children: blog.description }) })
      ] }) }, blog.id)) })
    ] }) : null,
    props.blogs.length > 0 ? /* @__PURE__ */ jsx("div", { className: "border-b border-secondary pb-5 mb-5", children: /* @__PURE__ */ jsx("div", { className: " grid grid-cols-3 gap-3", children: props.blogs.map((blog) => /* @__PURE__ */ jsx(Link, { href: `/blog-list/read/${blog.user.username}/${blog.slug}`, children: /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("div", { className: "h-[250px] overflow-hidden rounded mb-2 border border-[#415A77]", children: /* @__PURE__ */ jsx(
        "img",
        {
          className: " w-full h-full object-cover rounded",
          src: (blog.upload && blog.upload.path) ?? imagePlaceholder,
          alt: (blog.upload && blog.upload.filename) ?? "No image available"
        }
      ) }),
      /* @__PURE__ */ jsxs("div", { className: " mb-1", children: [
        /* @__PURE__ */ jsx("div", { className: " bg-[#415a77] rounded py-1 px-2 inline-block text-xs text-light mb-1", children: blog.category.name }),
        /* @__PURE__ */ jsx("p", { className: " font-bold mb-1 text-xl text-[#E0E1DD]", children: blog.title }),
        /* @__PURE__ */ jsxs("p", { className: " text-xs text-[#E0E1DD]", children: [
          (blog.user.user_detail && blog.user.full_name) ?? blog.user.username,
          " | ",
          moment(blog.created_at).format("ll")
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("p", { className: " font-normal mb-1 text-gray-400 text-base", children: blog.description }) })
    ] }) }, blog.id)) }) }) : null
  ] }) });
};
const __vite_glob_0_12 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Blogs
}, Symbol.toStringTag, { value: "Module" }));
const BlogsListByCategory = (props) => {
  const [search, setSearch] = useState("");
  const searchBlog = (e) => {
    setSearch(e.target.value);
  };
  useEffect(() => {
    const searchDeb = debounce(() => {
      router.get(`/blog-list/blog/${props.category}`, {
        search
      }, {
        preserveState: true
      });
    }, 300);
    searchDeb();
    return () => searchDeb.cancel();
  }, [search]);
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(MainLayout, { setSearch: searchBlog, search, children: /* @__PURE__ */ jsx("main", { className: " pt-2", children: props.blogs.length > 0 ? /* @__PURE__ */ jsx("div", { className: " grid grid-cols-3 gap-2", children: props.blogs.map((blog) => /* @__PURE__ */ jsx(Link, { href: `/blog-list/read/${blog.user.username}/${blog.slug}`, children: /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("div", { className: "h-[250px] overflow-hidden rounded mb-2 border border-[#415A77]", children: /* @__PURE__ */ jsx(
      "img",
      {
        className: " w-full h-full object-cover rounded",
        src: (blog.upload && blog.upload.path) ?? imagePlaceholder,
        alt: (blog.upload && blog.upload.filename) ?? "No image available"
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: " mb-1", children: [
      /* @__PURE__ */ jsx("div", { className: " bg-[#415a77] rounded py-1 px-2 inline-block text-xs text-light mb-1", children: props.category }),
      /* @__PURE__ */ jsx("p", { className: " font-bold mb-1 text-xl", children: blog.title }),
      /* @__PURE__ */ jsxs("p", { className: " text-xs", children: [
        (blog.user.user_detail && blog.user.full_name) ?? blog.user.username,
        " | ",
        moment(blog.created_at).format("ll")
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("p", { className: " font-normal mb-1 text-gray-400 text-base", children: blog.description }) })
  ] }) }, blog.id)) }) : /* @__PURE__ */ jsx(NoDataFound, { content: "Uh-oh! No data found." }) }) }) });
};
const __vite_glob_0_13 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: BlogsListByCategory
}, Symbol.toStringTag, { value: "Module" }));
const Home = (props) => {
  const { auth } = usePage().props;
  useEffect(() => {
    if (props.email_verified_at == 0) {
      toast.warn("Please verify your account to access the page!");
    } else {
      return;
    }
  }, []);
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: " w-full h-auto min-h-screen bg-homepage bg-cover bg-center", children: [
    /* @__PURE__ */ jsx(Navigation, { user: auth.user }),
    /* @__PURE__ */ jsx("div", { className: "bg-[#1B263B] bg-opacity-80 w-full h-auto min-h-screen  flex items-center justify-center", children: /* @__PURE__ */ jsx("main", { className: "pt-[65px] pb-10", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[1500px] w-[90%] mx-auto", children: [
      /* @__PURE__ */ jsx("h1", { className: " text-7xl font-bold mb-5", children: "Informative Tips, News and Stories for Every Day" }),
      /* @__PURE__ */ jsxs("h3", { className: " text-2xl tracking-wide leading-9 mb-5", children: [
        "Welcome to",
        " ",
        /* @__PURE__ */ jsx("span", { className: "font-bold", children: "KNOWL" }),
        ", your ultimate destination for sharing and gaining knowledge and experiences across a wide range of categories. From the latest technology to news, health, and more, we cover it all. Our mission is to provide you with valuable insights and experiences that enhance your daily life. Dive into a diverse collection of articles, guides, and stories crafted by experts and enthusiasts alike."
      ] }),
      /* @__PURE__ */ jsx("div", { className: " inline-block", children: /* @__PURE__ */ jsxs(
        Link,
        {
          href: "/blog-list",
          className: "w-full inline-flex items-center gap-2 font-bold bg-[#415A77] py-2 text-sm rounded px-3 text-light tracking-wide",
          children: [
            "Start Reading",
            /* @__PURE__ */ jsx(FaCircleArrowRight, {})
          ]
        }
      ) })
    ] }) }) })
  ] }) });
};
const __vite_glob_0_14 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Home
}, Symbol.toStringTag, { value: "Module" }));
const ViewBlog = (props) => {
  console.log(props);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(MainLayout, { children: /* @__PURE__ */ jsxs("main", { className: " max-w-[1000px] mx-auto", children: [
      /* @__PURE__ */ jsx("div", { className: " pt-5 mb-6", children: /* @__PURE__ */ jsx("h1", { className: " text-5xl font-bold tracking-wide", children: props.blog.title }) }),
      /* @__PURE__ */ jsxs("div", { className: " pb-7", children: [
        /* @__PURE__ */ jsxs("div", { className: " flex items-center gap-2 mb-5", children: [
          /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-full p-[2px] border border-[#415A77] flex items-center justify-center", children: /* @__PURE__ */ jsx(
            "img",
            {
              src: (props.blog.user.upload && props.blog.user.upload.path) ?? altImage,
              alt: (props.blog.user.upload && props.blog.user.upload.filename) ?? "user",
              className: " object-center w-full h-full rounded-full cursor-pointer"
            }
          ) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: " text-[#E0E1DD] text-sm", children: props.blog.user.full_name != " " && props.blog.user.full_name != null ? /* @__PURE__ */ jsx("span", { children: props.blog.user.full_name + " | " + props.blog.user.username }) : /* @__PURE__ */ jsx("span", { children: props.blog.user.username }) }),
            /* @__PURE__ */ jsxs("p", { className: " text-gray-400 text-xs flex items-center", children: [
              moment(props.blog.created_at).startOf("hour").fromNow(),
              /* @__PURE__ */ jsx(LuDot, {}),
              moment(props.blog.created_at).format("ll")
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          Tiptap,
          {
            rteValue: props.blog.content,
            setRteValue: null,
            disableMenuBar: true,
            styleContainer: "h-auto line-hieght",
            editable: false
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: " w-full py-8 h-auto bg-[#0D1B2A]", children: /* @__PURE__ */ jsxs("div", { className: "mb-5 max-w-[1000px] mx-auto", children: [
      /* @__PURE__ */ jsx("div", { className: "w-14 h-14 rounded-full p-[2px] mb-3 border border-[#415A77] flex items-center justify-center", children: /* @__PURE__ */ jsx(
        "img",
        {
          src: (props.blog.user.upload && props.blog.user.upload.path) ?? altImage,
          alt: (props.blog.user.upload && props.blog.user.upload.filename) ?? "user",
          className: " object-center w-full h-full rounded-full cursor-pointer"
        }
      ) }),
      /* @__PURE__ */ jsxs("div", { className: " mb-5", children: [
        /* @__PURE__ */ jsxs("p", { className: " text-[#E0E1DD] text-base font-bold flex items-center gap-1 mb-1", children: [
          "Written by",
          props.blog.user.full_name != " " && props.blog.user.full_name != null ? /* @__PURE__ */ jsx("span", { children: props.blog.user.full_name + " | " + props.blog.user.username }) : /* @__PURE__ */ jsx("span", { children: props.blog.user.username })
        ] }),
        /* @__PURE__ */ jsx("p", { className: " text-[#778DA9] text-xs flex items-center mb-3", children: props.blog.user.user_detail ? props.blog.user.user_detail.experiences.map((experience, index) => /* @__PURE__ */ jsxs("span", { className: "flex items-center", children: [
          /* @__PURE__ */ jsx("span", { className: "  bg-[#415A77] py-1 px-2 rounded-md", children: experience }),
          index !== props.blog.user.user_detail.experiences.length - 1 && /* @__PURE__ */ jsx(LuDot, { className: " text-base" })
        ] }, index)) : null }),
        /* @__PURE__ */ jsx("p", { className: " text-sm tracking-wide", children: props.blog.user.user_detail && props.blog.user.user_detail.about })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: " pt-5 mb-6", children: [
        /* @__PURE__ */ jsxs("h1", { className: " text-base font-bold tracking-wide flex items-center gap-1 mb-3", children: [
          "More from",
          props.blog.user.full_name != " " && props.blog.user.full_name != null ? /* @__PURE__ */ jsx("span", { children: props.blog.user.full_name + " | " + props.blog.user.username }) : /* @__PURE__ */ jsx("span", { children: props.blog.user.username })
        ] }),
        props.more_blogs.length > 0 ? /* @__PURE__ */ jsx("div", { className: " grid grid-cols-3 gap-3", children: props.more_blogs.map((blog) => /* @__PURE__ */ jsx(Link, { href: `/blog-list/read/${blog.user.username}/${blog.slug}`, children: /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "h-[250px] overflow-hidden rounded mb-2 border border-[#415A77]", children: /* @__PURE__ */ jsx(
            "img",
            {
              className: " w-full h-full object-cover rounded",
              src: (blog.upload && blog.upload.path) ?? imagePlaceholder,
              alt: (blog.upload && blog.upload.filename) ?? "No image available"
            }
          ) }),
          /* @__PURE__ */ jsxs("div", { className: " mb-1", children: [
            /* @__PURE__ */ jsx("div", { className: " bg-[#415a77] rounded py-1 px-2 inline-block text-xs text-light mb-1", children: blog.category.name }),
            /* @__PURE__ */ jsx("p", { className: " font-bold mb-1 text-xl", children: blog.title }),
            /* @__PURE__ */ jsxs("p", { className: " text-xs", children: [
              (blog.user.user_detail && blog.user.full_name) ?? blog.user.username,
              " | ",
              moment(blog.created_at).format("ll")
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("p", { className: " font-normal mb-1 text-gray-400 text-base", children: blog.description }) })
        ] }) }, blog.id)) }) : /* @__PURE__ */ jsx(NoDataFound, { content: "No more post." })
      ] })
    ] }) })
  ] });
};
const __vite_glob_0_15 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ViewBlog
}, Symbol.toStringTag, { value: "Module" }));
const Edit = (props) => {
  const [loading, setLoading] = useState(false);
  const [datas, setDatas] = useState({
    image: null,
    username: props.user.username,
    email: props.user.email,
    password: "",
    first_name: (props.user.user_detail && props.user.user_detail.first_name) ?? "",
    middle_name: (props.user.user_detail && props.user.user_detail.middle_name) ?? "",
    last_name: (props.user.user_detail && props.user.user_detail.last_name) ?? "",
    address: (props.user.user_detail && props.user.user_detail.address) ?? "",
    experience: (props.user.user_detail && props.user.user_detail.experiences) ?? [""],
    soc_fb: (props.user.user_detail && props.user.user_detail.soc_fb) ?? "",
    soc_linkedin: (props.user.user_detail && props.user.user_detail.soc_linkedin) ?? "",
    soc_twitter: (props.user.user_detail && props.user.user_detail.soc_twitter) ?? "",
    about: (props.user.user_detail && props.user.user_detail.about) ?? ""
  });
  const [imagePreview, setImagePreview] = useState((props.user.upload && props.user.upload.path) ?? null);
  const addExperience = () => {
    setDatas({
      ...datas,
      experience: [...datas.experience, ""]
    });
  };
  const addExp = (index, value) => {
    const updatedExperience = [...datas.experience];
    updatedExperience[index] = value;
    setDatas({
      ...datas,
      experience: updatedExperience
    });
  };
  const handleChange = (e) => {
    setDatas({
      ...datas,
      [e.target.name]: e.target.value
    });
  };
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImagePreview(URL.createObjectURL(event.target.files[0]));
      setDatas({
        ...datas,
        image: event.target.files[0]
      });
    }
  };
  const removeExperience = (index) => {
    datas.experience.splice(index, 1);
    setDatas({
      ...datas,
      experience: datas.experience
    });
  };
  const store = () => {
    router.post("/profile/store", datas, {
      onSuccess: () => {
        toast.success("Profile updated successfully");
      },
      onStart: () => {
        setLoading(true);
      },
      onFinish: () => {
        setLoading(false);
      }
    });
  };
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(MainLayout, { children: [
    /* @__PURE__ */ jsx("div", { className: " pt-2", children: /* @__PURE__ */ jsx("h1", { className: " font-bold text-xl mb-5", children: "Edit profile" }) }),
    /* @__PURE__ */ jsxs("main", { className: " grid grid-cols-[40%_59%] gap-[1%]", children: [
      /* @__PURE__ */ jsx("div", { className: " ", children: /* @__PURE__ */ jsxs("div", { className: "pt-5 pb-10 px-3 rounded-md border border-[#0D1B2A]", children: [
        /* @__PURE__ */ jsx("h4", { className: " font-bold text-base mb-7", children: "Account Details" }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: " flex flex-col items-center justify-center", children: /* @__PURE__ */ jsxs("div", { className: " relative rounded-full inline-block mb-5", children: [
            /* @__PURE__ */ jsx("input", { id: "upload", type: "file", className: "hidden", accept: "image/*", onChange: onImageChange }),
            /* @__PURE__ */ jsx("div", { className: " w-32 h-32 overflow-hidden rounded-full shadow-md ", children: imagePreview === null ? /* @__PURE__ */ jsx("img", { className: "h-full w-full object-cover", src: altImage, alt: "image-placeholder" }) : /* @__PURE__ */ jsx("img", { className: "h-full w-full object-cover", src: imagePreview, alt: "" }) }),
            /* @__PURE__ */ jsx("label", { htmlFor: "upload", className: " bg-secondary shadow p-2 rounded-full cursor-pointer inline-block absolute bottom-0 right-2", children: /* @__PURE__ */ jsx("div", { className: "", children: /* @__PURE__ */ jsx(FaCamera, { className: " fill-white text-base" }) }) })
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: " px-10 flex flex-col gap-3", children: [
            /* @__PURE__ */ jsx(Input, { name: "username", type: "text", label: "Username", value: datas.username, onChange: handleChange }),
            /* @__PURE__ */ jsx(Input, { name: "email", type: "email", label: "Email address", value: datas.email, onChange: handleChange }),
            /* @__PURE__ */ jsx(Input, { name: "password", type: "password", label: "Password", onChange: handleChange })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: " py-5 px-3 rounded-md border border-[#0D1B2A]", children: /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { className: "", children: [
          /* @__PURE__ */ jsx("h4", { className: " font-bold text-base mb-7", children: "Personal Information" }),
          /* @__PURE__ */ jsxs("div", { className: " grid grid-cols-3 gap-2 mb-5", children: [
            /* @__PURE__ */ jsx(Input, { label: "First Name", name: "first_name", value: datas.first_name, onChange: handleChange }),
            /* @__PURE__ */ jsx(Input, { label: "Middle Name(Optional)", name: "middle_name", value: datas.middle_name, onChange: handleChange }),
            /* @__PURE__ */ jsx(Input, { label: "Last Name", name: "last_name", value: datas.last_name, onChange: handleChange })
          ] }),
          /* @__PURE__ */ jsx("div", { className: " mb-5", children: /* @__PURE__ */ jsx(Input, { label: "Address", name: "address", value: datas.address, onChange: handleChange }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("div", { className: " flex items-center justify-between mb-1", children: [
              /* @__PURE__ */ jsx("h4", { className: " text-sm", children: "Experience" }),
              /* @__PURE__ */ jsx("button", { type: "button", onClick: addExperience, className: " bg-secondary p-[2px] rounded-md", children: /* @__PURE__ */ jsx(IoIosAdd, { className: " fill-white" }) })
            ] }),
            /* @__PURE__ */ jsx("div", { className: " mb-5", children: datas.experience.map((data, index) => {
              return /* @__PURE__ */ jsxs("div", { className: " mb-2 relative", children: [
                /* @__PURE__ */ jsx(Input, { name: `exp_${index}`, value: data, onChange: (e) => addExp(index, e.target.value) }),
                /* @__PURE__ */ jsx("button", { onClick: () => removeExperience(index), className: " absolute right-2 top-1/2 transform -translate-y-1/2", children: /* @__PURE__ */ jsx(FaMinusCircle, { className: " fill-red-700" }) })
              ] }, index);
            }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h4", { className: " text-sm", children: "Social Media Links(Optional)" }),
            /* @__PURE__ */ jsxs("div", { className: " grid grid-cols-3 gap-2 mb-5", children: [
              /* @__PURE__ */ jsx(Input, { placeholder: "Facebook", name: "soc_fb", value: datas.soc_fb, onChange: handleChange }),
              /* @__PURE__ */ jsx(Input, { placeholder: "Linkedin", name: "soc_linkedin", value: datas.soc_linkedin, onChange: handleChange }),
              /* @__PURE__ */ jsx(Input, { placeholder: "Twitter", name: "soc_twitter", value: datas.soc_twitter, onChange: handleChange })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h4", { className: " text-sm", children: "About" }),
            /* @__PURE__ */ jsx("div", { className: " mb-5", children: /* @__PURE__ */ jsx("textarea", { rows: 6, name: "about", value: datas.about, onChange: handleChange, placeholder: "Tell something about yourself...", id: "", className: `w-full border border-[#415A77] focus:outline-[#778DA9] bg-[#0D1B2A] outline-none p-2 text-xs rounded-md` }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: " border-t border-light-gray pt-2 mb-5", children: [
          /* @__PURE__ */ jsx("h4", { className: " text-lg font-bold", children: "Delete your account?" }),
          /* @__PURE__ */ jsx("p", { className: " text-xs mb-2", children: "Deleting your account will remove your access. This action cannot be undone." }),
          /* @__PURE__ */ jsx("button", { className: " border border-red-600 rounded-md px-3 py-2 text-xs text-red-600", children: "Delete your account" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-2", children: [
          /* @__PURE__ */ jsx(Link, { href: "/", className: " border border-[#415A77] rounded-md px-3 py-2 text-xs text-[#E0E1DD]", children: "Back" }),
          /* @__PURE__ */ jsx(Button, { event: store, loading, children: "Save Changes" })
        ] })
      ] }) })
    ] })
  ] }) });
};
const __vite_glob_0_16 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Edit
}, Symbol.toStringTag, { value: "Module" }));
const Profile = (props) => {
  console.log(props);
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(MainLayout, { children: /* @__PURE__ */ jsxs("main", { className: " grid grid-cols-[79%_20%] gap-[1%]", children: [
    /* @__PURE__ */ jsxs("section", { children: [
      /* @__PURE__ */ jsx("div", { className: " h-60 w-full overflow-hidden rounded-t-md", children: /* @__PURE__ */ jsx("img", { className: " h-full w-full object-cover", src: "https://images.pexels.com/photos/956981/milky-way-starry-sky-night-sky-star-956981.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", alt: "" }) }),
      /* @__PURE__ */ jsxs("div", { className: " px-4 pb-8 pt-5 rounded-b-md border-b border-l border-r border-[#0D1B2A] mb-4 flex items-start justify-between", children: [
        /* @__PURE__ */ jsxs("div", { className: " flex gap-2 items-start", children: [
          /* @__PURE__ */ jsx("div", { className: " -mt-24 w-32 h-32 overflow-hidden rounded-full shadow-md ", children: /* @__PURE__ */ jsx(
            "img",
            {
              className: "h-full w-full object-cover",
              src: (props.user.upload && props.user.upload.path) ?? altImage,
              alt: (props.user.upload && props.user.upload.filename) ?? "image-placeholder"
            }
          ) }),
          /* @__PURE__ */ jsxs("div", { className: "", children: [
            /* @__PURE__ */ jsx("h2", { className: " text-3xl font-bold tracking-wide mb-1", children: (props.user.user_detail && props.user.full_name) ?? props.user.username }),
            /* @__PURE__ */ jsx("p", { className: " text-xs tracking-wide mb-4", children: (props.user.user_detail && props.user.user_detail.address) ?? "N/A" }),
            /* @__PURE__ */ jsx("div", { children: props.user.user_detail && props.user.user_detail.experiences.length > 0 ? props.user.user_detail.experiences.map((experience, index) => /* @__PURE__ */ jsx("span", { className: "bg-light text-primary text-xs font-medium me-2 px-2.5 py-0.5 rounded ", children: experience }, index)) : /* @__PURE__ */ jsx("p", { children: "N/A" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: " flex items-center gap-2", children: /* @__PURE__ */ jsxs(Link, { href: "/profile/edit", className: " px-3 py-2 border bg-primary text-light rounded-md text-xs tracking-wide font-semibold flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(CiEdit, { className: " text-base fill-light" }),
          "Edit Profile"
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: " px-4 pb-8 pt-5 rounded-md border border-[#0D1B2A]", children: [
        /* @__PURE__ */ jsxs("h2", { className: " text-base font-bold tracking-wide mb-1", children: [
          "About ",
          (props.user.user_detail && props.user.user_detail.first_name) ?? props.user.username
        ] }),
        /* @__PURE__ */ jsx("p", { className: " text-xs tracking-wide mb-4", children: (props.user.user_detail && props.user.user_detail.about) ?? "N/A" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("section", { children: /* @__PURE__ */ jsxs("div", { className: " px-4 py-5 rounded-md border border-[#0D1B2A]", children: [
      /* @__PURE__ */ jsx("h2", { className: " text-lg font-bold tracking-wide mb-2", children: "Connect" }),
      /* @__PURE__ */ jsxs("ul", { className: " flex flex-col gap-3 text-xs tracking-wide", children: [
        /* @__PURE__ */ jsxs("li", { className: " flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(CiFacebook, { className: " text-lg" }),
          /* @__PURE__ */ jsx(Link, { href: (props.user.user_detail && props.user.user_detail.soc_fb) ?? "#", className: " hover:underline", children: (props.user.user_detail && props.user.user_detail.soc_fb) ?? "N/A" })
        ] }),
        /* @__PURE__ */ jsxs("li", { className: " flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(FaLinkedinIn, { className: " text-lg" }),
          /* @__PURE__ */ jsx(Link, { href: (props.user.user_detail && props.user.user_detail.soc_linkedin) ?? "#", className: " hover:underline", children: (props.user.user_detail && props.user.user_detail.soc_linkedin) ?? "N/A" })
        ] }),
        /* @__PURE__ */ jsxs("li", { className: " flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(FaSquareXTwitter, { className: " text-lg" }),
          /* @__PURE__ */ jsx(Link, { href: (props.user.user_detail && props.user.user_detail.soc_twitter) ?? "#", className: " hover:underline", children: (props.user.user_detail && props.user.user_detail.soc_twitter) ?? "N/A" })
        ] })
      ] })
    ] }) })
  ] }) }) });
};
const __vite_glob_0_17 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Profile
}, Symbol.toStringTag, { value: "Module" }));
createServer(
  (page) => createInertiaApp({
    page,
    render: ReactDOMServer.renderToString,
    resolve: (name) => {
      const pages = /* @__PURE__ */ Object.assign({ "./Pages/Auth/Login.jsx": __vite_glob_0_0, "./Pages/Auth/Register.jsx": __vite_glob_0_1, "./Pages/Blog/Create.jsx": __vite_glob_0_2, "./Pages/Blog/Edit.jsx": __vite_glob_0_3, "./Pages/Blog/Index.jsx": __vite_glob_0_4, "./Pages/Components/Forms/Button.jsx": __vite_glob_0_5, "./Pages/Components/Forms/Input.jsx": __vite_glob_0_6, "./Pages/Components/Forms/Select.jsx": __vite_glob_0_7, "./Pages/Components/Markdown/Rte.jsx": __vite_glob_0_8, "./Pages/Components/Markdown/Tiptap.jsx": __vite_glob_0_9, "./Pages/Components/Navigation.jsx": __vite_glob_0_10, "./Pages/Components/Nodatafound.jsx": __vite_glob_0_11, "./Pages/Home/Blogs.jsx": __vite_glob_0_12, "./Pages/Home/Category.jsx": __vite_glob_0_13, "./Pages/Home/Index.jsx": __vite_glob_0_14, "./Pages/Home/View.jsx": __vite_glob_0_15, "./Pages/Profile/Edit.jsx": __vite_glob_0_16, "./Pages/Profile/Index.jsx": __vite_glob_0_17 });
      return pages[`./Pages/${name}.jsx`];
    },
    setup: ({ App, props }) => /* @__PURE__ */ jsx(App, { ...props })
  })
);
