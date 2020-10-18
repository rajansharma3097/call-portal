
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
            // icon:' fa-file-audio'
        },

        {
            text: 'Source',
            link: '/admin/source-list',
            icon: 'icon-tag'
       },

        {
            text: 'Email Template',
            link: '/admin/email-template-list',
            // icon: 'icon-envelope'
        },

        {
            text: 'Plan',
            link: '/admin/plan-list',
            icon: 'icon-settings'
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
