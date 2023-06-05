import { atom } from "recoil";

var  sideMenu = atom({
  key: "sideMenu",
  default: {
    menu: [
      {
        icon: "Gauge",
        pathname: "/back-office/report",
        title: "Report",
      },
      {
        icon: "Clock3",
        title: "Ad accounts openning requests",
        subMenu: [
          {
            icon: "Facebook",
            pathname: "/back-office/facebook-ad",
            title: "Facebook",
          },
          {
            icon: "Globe2",
            pathname: "/back-office/google-ad",
            title: "Google",
          },
          {
            icon: "Music",
            pathname: "/back-office/tiktok-ad",
            title: "Tik Tok",
          },
        ],
      },
      {
        icon: "Download", 
        pathname: "/back-office/top-ups",
        title: "Recharges Management",    
      },
      {
        icon: "Forward",
        pathname: "/back-office/transferts",
        title: "Transfers Management",
      },
      {
        icon: "Share2",
        pathname: "/back-office/sharings",
        title: "Ad account share Management",
      },
      {
        icon: "Coins",
        pathname: "/business_accounts",
        title: "Business accounts",
        subMenu: [
          {
            icon: "Facebook",
            pathname: "/back-office/business-manager",
            title: "Business manager",
          },
          {
            icon: "Globe2",
            pathname: "/back-office/account-manager",
            title: "Google Account",
          },
          {
            icon: "Music",
            pathname: "/back-office/business-center",
            title: "Business Center",
          },
        ],
      },
      {
        icon: "Contact",
        pathname: "/back-office/business-accounts",
        title: "Users management",
        subMenu: [
          {
            icon: "ClipboardList",
            pathname: "/back-office/staff-management",
            title: "Staff members",
          },
          {
            icon: "Users",
            pathname: "/back-office/front-office-client",
            title: "Front office clients",
          },
        ],
      },
      {
        icon: "User",
        pathname: "/back-office/update-profile",
        title: " Profile",
      },
    ],
  },
})

  export { sideMenu} ;

