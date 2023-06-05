import { atom } from "recoil";

const sideMenu = atom({
  key: "sideMenuF",
  default: {
    menu: [
      {
        icon: "LayoutDashboard",
        pathname: "/dashboard",
        title: "Dashboard",
      },
      {
        icon: "Layers",
        title: "My ad accounts",
        subMenu: [
          {
            icon: "Facebook",
            pathname: "/facebook-ad",
            title: "Facebook",
          },
          {
            icon: "Globe2",
            pathname: "/google-ad",
            title: "Google",
          },
          {
            icon: "Music",
            pathname: "/tiktok-ad",
            title: "Tik Tok",
          },
        ],
      },
      {
        icon: "Download", 
        pathname: "/top-ups",
        title: "Recharges",    
      },
      {
        icon: "Send",
        pathname: "/transferts",
        title: "Transferts",
      },
      {
        icon: "Share2",
        pathname: "/sharings",
        title: "Share ad account",
      },
      {
        icon: "Coins",
        pathname: "/business-accounts",
        title: "Business accounts",
        subMenu: [
          {
            icon: "Facebook",
            pathname: "/facebook-ad/business-manager",
            title: "Business manager",
          },
          {
            icon: "Globe2",
            pathname: "/google-ad/account-manager",
            title: "Google Account",
          },
          {
            icon: "Music",
            pathname: "/tiktok-ad/account-manager",
            title: "Business Center",
          },
        ],
      },
      {
        icon: "User",
        pathname: "/update-profile",
        title: " Profile",
      },
    ],
  },
});

export { sideMenu };

