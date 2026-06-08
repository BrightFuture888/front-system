import Guide from '@/components/Guide';
import { trim } from '@/utils/format';
import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import styles from './index.less';
// import { Button  } from '@perison/admin-ui';

const HomePage: React.FC = () => {
  const { name } = useModel('global');
  console.log(localStorage.getItem('name'), '我是来读取数据的-localStorage');
  console.log(
    sessionStorage.getItem('inputValue'),
    '我是来读取数据的-sessionStorage',
  );

  return (
    <PageContainer>
      <div className={styles.container}>
        <Guide name={trim(name)} />
        {/* <Button></Button> */}
      </div>
    </PageContainer>
  );
};

export default HomePage;
