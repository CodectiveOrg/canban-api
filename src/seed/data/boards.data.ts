import { DeepPartial } from "typeorm";

import { SeedBoardType } from "@/seed/types/seed-board.type";

import { BoardColor } from "@/types/board-color.type";

const boardsDataWithoutPosition = [
  {
    title: "Sprint Tasks",
    description:
      "A board to keep track of the team's work during each sprint. Tasks move from To Do through In Progress until they reach Done.",
    color: "blue",
    lists: [
      {
        title: "🔜 To Do",
        description: "",
        items: [
          {
            title: "Implement Landing Page",
            description: "Build hero, features, and footer for marketing site.",
            dueDate: "2025-09-20",
          },
          {
            title: "Implement Search Page",
            description: "Create search UI and data fetching for results page.",
            dueDate: "2025-09-27",
          },
          {
            title: "Navbar Component",
            description:
              "Reusable navigation with responsive menu and active states.",
            dueDate: "",
          },
          {
            title: "Toaster Provider",
            description:
              "Global toast notifications with variants and queueing.",
            dueDate: "",
          },
          {
            title: "Carousel Component",
            description: "Image slider with autoplay and swipe gestures.",
            dueDate: "",
          },
          {
            title: "User API",
            description: "Define CRUD endpoints and types for users.",
            dueDate: "",
          },
        ],
      },
      {
        title: "🔨 Doing",
        description: "",
        items: [
          {
            title: "Root Layout",
            description: "Scaffold shell, header, and main content regions.",
            dueDate: "",
          },
          {
            title: "Icon Component",
            description: "Generic icon wrapper with size and color props.",
            dueDate: "",
          },
          {
            title: "Authentication",
            description: "Login, register, and session handling with tokens.",
            dueDate: "2025-09-18",
          },
          {
            title: "Design Landing Page",
            description: "Wireframe and UI kit for landing sections.",
            dueDate: "2025-09-22",
          },
        ],
      },
      {
        title: "🎉 Done",
        description: "",
        items: [
          {
            title: "Find a Good Name for the Project",
            description: "Brainstorm and shortlist memorable names.",
            dueDate: "",
          },
          {
            title: "Setup Frontend Project",
            description: "Initialize project with Vite, TS, and ESLint.",
            dueDate: "",
          },
          {
            title: "Setup Backend Project",
            description: "Set up service skeleton and folder structure.",
            dueDate: "",
          },
          {
            title: "Typography",
            description: "Type scale and font pairing established.",
            dueDate: "",
          },
          {
            title: "Colors",
            description: "Color palette and semantic tokens added.",
            dueDate: "",
          },
          {
            title: "Setup API Connection",
            description: "HTTP client and base URL configured.",
            dueDate: "",
          },
        ],
      },
    ],
  },
  {
    title: "Content Calendar",
    description:
      "Plan and manage posts, blogs, or videos ahead of time. Items flow from Idea to Draft and finally to Published for a smooth content pipeline.",
    color: "green",
    lists: [
      {
        title: "💡 Idea",
        description: "",
        items: [
          {
            title: "September blog ideas",
            description: "Collect topics for September posts.",
            dueDate: "",
          },
          {
            title: "Q4 video series concept",
            description: "Outline theme and episode ideas.",
            dueDate: "",
          },
          {
            title: "Interview guest shortlist",
            description: "List potential guests and contact info.",
            dueDate: "2025-10-01",
          },
          {
            title: "SEO pillar topics",
            description: "Define 3-5 pillar pages to target.",
            dueDate: "",
          },
        ],
      },
      {
        title: "✍️ Draft",
        description: "",
        items: [
          {
            title: "How to use our Kanban app",
            description: "Write first draft with screenshots.",
            dueDate: "",
          },
          {
            title: "Newsletter #12",
            description: "Draft copy and CTA.",
            dueDate: "",
          },
          {
            title: "YouTube script: Productivity tips",
            description: "Script intro and key points.",
            dueDate: "2025-09-25",
          },
        ],
      },
      {
        title: "📢 Published",
        description: "",
        items: [
          {
            title: "Blog: Getting started guide",
            description: "Published on docs and blog.",
            dueDate: "",
          },
          {
            title: "Tweet thread: Release notes",
            description: "Posted with visuals.",
            dueDate: "",
          },
          {
            title: "Case study: Team Alpha",
            description: "Edited and live on site.",
            dueDate: "",
          },
        ],
      },
    ],
  },
  {
    title: "Personal Goals",
    description: "Organize personal or professional goals into small tasks.",
    color: "yellow",
    lists: [
      {
        title: "🔜 To Do",
        description: "",
        items: [
          {
            title: "Set weekly fitness plan",
            description: "Plan 3 workouts and stretch sessions.",
            dueDate: "",
          },
          {
            title: "Read one book",
            description: "Choose title and reading schedule.",
            dueDate: "",
          },
          {
            title: "Start savings tracker",
            description: "Set monthly goal and sheet.",
            dueDate: "",
          },
          {
            title: "Learn TypeScript generics",
            description: "Study patterns and practice tasks.",
            dueDate: "2025-10-05",
          },
        ],
      },
      {
        title: "🔨 Doing",
        description: "",
        items: [
          {
            title: "Morning routine",
            description: "Track wake time and journaling.",
            dueDate: "",
          },
          {
            title: "Online course: React",
            description: "Complete hooks and context modules.",
            dueDate: "",
          },
          {
            title: "Meal prep",
            description: "Prepare lunches for weekdays.",
            dueDate: "",
          },
        ],
      },
      {
        title: "🎉 Done",
        description: "",
        items: [
          {
            title: "Declutter workspace",
            description: "Clean desk and organize cables.",
            dueDate: "",
          },
          {
            title: "Set personal OKRs",
            description: "Define 3 objectives for the quarter.",
            dueDate: "",
          },
          {
            title: "Plan weekend hike",
            description: "Choose trail and invite friends.",
            dueDate: "",
          },
        ],
      },
    ],
  },
] satisfies DeepPartial<SeedBoardType>[];

export const boardsData: SeedBoardType[] = boardsDataWithoutPosition.map(
  (board) => ({
    ...board,
    color: board.color as BoardColor,
    lists: board.lists.map((list, listIndex) => ({
      ...list,
      position: listIndex + 1,
      items: list.items.map((item, itemIndex) => ({
        ...item,
        position: itemIndex + 1,
      })),
    })),
  }),
);
