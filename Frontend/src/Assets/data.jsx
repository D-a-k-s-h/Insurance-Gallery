export const sidebarLinks = [
  {
    id: 1,
    name: "Dashboard",
    path: "/",
    expansion: null,
    icon: "VscAccount",
  },
  {
    id: 2,
    name: "Data Entry",
    expansion: [
      {
        id: 1,
        name: "Motor Entry",
        path: "/data-entry/motor-entry"
      },
      {
        id: 2,
        name: "Non-Motor Entry",
        path: "/data-entry/non-motor-entry"
      }
    ],
    path: "/data-entry",
    icon: "VscDashboard",
  },
  {
    id: 3,
    name: "Add On Entry",
    expansion: [
      {
        id: 1,
        name: "Motor Addon Entry",
        path: "/add-on-entry/motor-addon-entry"
      },
      {
        id: 2,
        name: "Motor Renewal Entry",
        path: "/add-on-entry/motor-renewal-entry"
      },
      {
        id: 3,
        name: "Non-Motor Addon Entry",
        path: "/add-on-entry/non-motor-addon-entry"
      }
    ],
    path: "/add-on-entry",
    icon: "VscCodeOss",
  },
  {
    id: 4,
    name: "Manage User",
    expansion: [
      {
        id: 1,
        name: "Add Agent",
        path: "/manage-user/add-agent"
      },
      {
        id: 2,
        name: "View Agent",
        path: "/manage-user/view-agent"
      },
      {
        id: 3,
        name: "Manage RM",
        path: "/manage-user/manage-rm"
      },
      {
        id: 4,
        name: "Manage Company",
        path: "/manage-user/manage-company"
      },
      {
        id: 5,
        name: "Manage Make",
        path: "/manage-user/manage-make"
      },
      {
        id: 6,
        name: "Manage Modal",
        path: "/manage-user/manage-model"
      }
    ],
    path: "/manage-user",
    icon: "VscClippy",
  },
  {
    id: 5,
    name: "Reporting",
    expansion: [
      {
        id: 1,
        name: "Motor Report",
        path: "/reporting/motor-report"
      },
      {
        id: 2,
        name: "Non-Motor Report",
        path: "/reporting/non-motor-report"
      },
      {
        id: 3,
        name: "RM Sales Report",
        path: "/reporting/rm-sales-report"
      }
    ],
    path:"/reporting",
    icon: "VscMortarBoard",
  },
  {
    id:6,
    name: "Export Data",
    expansion: [
      {
        id:1,
        name:"Export Data",
        path: "/export/export-data"
      },
      {
        id:2,
        name:"Export Report",
        path:"/export/export-report"
      }
    ],
    path: "/export",
    icon: "VscCloudDownload"
  }
];