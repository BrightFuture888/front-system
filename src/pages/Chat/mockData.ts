
export const ConversationOneItems: any = [
    {
        key: 'create',
        label: '新增对话框',
    },
    {
        key: 'coding',
        label: '代码生成',
    },
    {
        key: 'createImage',
        label: '创建图片',
    },
];
export const ConversationTwoItems: any = [
    {
        key: `item${1}`,
        label: `Conversation Item ${1}`,
        disabled: false,
    },
    {
        key: `item${2}`,
        label: `Conversation Item ${2}`,
        disabled: false,
    },
];
export const ConversationTwoItemsActionMenus: any =
    [
        {
            label: 'Rename',
            key: 'Rename',
            // icon: <EditOutlined />,
        },
        {
            label: 'Share',
            key: 'Share',
            // icon: <ShareAltOutlined />,
        },
        {
            type: 'divider',
        },
        {
            label: 'Archive',
            key: 'Archive',
            // icon: <StopOutlined />,
            disabled: true,
        },
        {
            label: 'Delete Chat',
            key: 'deleteChat',

            danger: true,
        },
    ]