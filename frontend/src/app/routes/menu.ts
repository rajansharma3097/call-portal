
const Home = {
    text: 'Home',
    link: '/home',
    icon: 'icon-home'
};

const Company = {
    text: 'Companies',
    link: '/company',
    icon: 'fa fas fa-building',
    submenu: [
        {
            text: 'All Companies',
            link: '/company/company-list'
        },
        {
            text: 'All Campaigns',
            link: '/company/campaign-list'
        },
    ]
}

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

        {
            text: 'Manage User',
            link: '/admin/user-list',
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
    Company,
    UserSettings,
    Admin,

];
