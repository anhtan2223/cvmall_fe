import tl from "@/utils/locallize";

export default [
  {
    title: tl("AccountProfile", "Account"),
    icon: 'UserFilled',
    permission: ['2', '3'],
    items: [
      {
        name: tl("AccountProfile", "AccountInfo"),
        pathName: 'AccountProfile', permission: ['2', '3'],
      },
      {
        name: tl("AccountProfile", "ChangePassword"),
        pathName: 'ChangePassWord', permission: ['2', '3'],
      },
    ],
  },
]
