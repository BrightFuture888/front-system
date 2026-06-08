import { fetchGetChatList, fetchSendMsg } from '@/store/chat/asyncRequest';
import { Conversations, Sender, Welcome } from '@ant-design/x';
import { Button, theme } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ConversationOneItems,
  ConversationTwoItemsActionMenus,
} from './mockData';

const ChatPage = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const conversationList = useSelector((state: any) => state.chat.conversation);

  const { token } = theme.useToken();

  const style = {
    width: 210,
    background: token.colorBgContainer,
    borderRadius: token.borderRadius,
  };

  const handleButtonClick = async (value: string) => {
    await dispatch(fetchSendMsg(value));
    setLoading(false);
  };

  // 获取聊天列表
  useEffect(() => {
    dispatch(fetchGetChatList());
  }, []);

  return (
    <div className="page flex gap-[12px] h-full">
      <div className="page-l h-full [border-right:1px_solid_#e4e7ed]">
        <Conversations items={ConversationOneItems} style={style} />
        <Conversations
          menu={{
            items: ConversationTwoItemsActionMenus,
            onClick: (itemInfo) => {
              itemInfo.domEvent.stopPropagation();
            },
          }}
          // items={ConversationTwoItems}
          items={conversationList.map((item: any) => ({
            label: item.title,
            key: item.uuid,
          }))}
          style={style}
        />
      </div>
      <div className="page-r flex-1 flex flex-col gap-5">
        <div className="page-t">
          <Welcome
            icon="https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*s5sNRo5LjfQAAAAAAAAAAAAADgCCAQ/fmt.webp"
            title="你好,欢迎使用AI智能助手"
            description="你好,欢迎使用AI智能助手"
          />
        </div>
        <div className="page-c  flex-1 flex flex-col gap-5  justify-between">
          <div className="content-conversation-list  flex-1 w-full">
            <Button type="primary" onClick={() => handleButtonClick('test')}>
              点击我测试接口
            </Button>
          </div>
          <div className="content-footer-sender">
            <Sender
              loading={loading}
              // ref={senderZhRef}
              // skill={slotConfig.zh_skill}
              // suffix={false}
              placeholder="请输入内容"
              onSubmit={(v, _, skill) => {
                setLoading(true);
                handleButtonClick(v);
              }}
              onCancel={() => {
                console.log('取消');
                setLoading(false);
              }}
              autoSize={{ minRows: 3, maxRows: 6 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
