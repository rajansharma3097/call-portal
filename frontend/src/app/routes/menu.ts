
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
            icon: 'icon-volume-1'
        },

        {
            text: 'Source',
            link: '/admin/source-list',
            icon: 'icon-tag'
       },

        {
            text: 'Email Template',
            link: '/admin/email-template-list',
            icon: 'icon-envelope'
        },

        {
            text: 'Plan',
            link: '/admin/plan-list',
            icon: 'icon-settings'
        },

    
    ]

};

const UserSettings = {
    text: 'Settings',
    link: '/User',
    icon: 'icon-settings',
    submenu:[{
         
        text:'Twilio Settings',
        link:'/user/settings',
        icon:'icon-phone'
    },

    {
         
        text:'Change Password',
        link:'/user/change-passowrd',
        icon:'icon-key'
    },

    {
         
        text:'Account',
        link:'/user/account',
        icon:'icon-user'
    },


  ]

}

const headingMain = {
    text: 'Main Navigation',
    heading: true
};

export const menu = [
    headingMain,
    Home,
    UserSettings,
    Admin,
    
];
