
const Home = {
    text: 'Home',
    link: '/home',
    icon: 'icon-home'
};

const Admin = {
  text: 'Admin',
  link: '/admin',
  icon: 'icon-user',
  submenu: [
      {
          text: 'Audio',
          link: '/admin/audio-list',
          // icon: 'icon-music-tone'
      },
      {
          text: 'Source',
          link: '/admin/source-list',
          // icon: 'icon-tag'
    },
  ]
};

const headingMain = {
    text: 'Main Navigation',
    heading: true
};

export const menu = [
    headingMain,
    Home,
    Admin
];
