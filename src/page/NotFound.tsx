import { createStyles } from "antd-style";
import type { FC } from "react";

const useStyles = createStyles(({ token, css }) => ({
  container: css`
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 160px;
    padding-left: 1rem;
    padding-right: 1rem;
  `,
  descText: css`
    color: ${token.colorTextSecondary};
    margin-bottom: 2rem;
  `,
  heading404: css`
    color: ${token.colorInfoBgHover};
    font-size: 12rem;
    font-weight: 700;
    line-height: 1;
    margin-bottom: 1rem;
  `,
  subHeading: css`
    margin-bottom: 0.5rem;
    font-size: 1.5rem;
    font-weight: 700;
    color: ${token.colorPrimaryBorderHover};
    @media (min-width: 768px) {
      font-size: 1.875rem;
    }
  `,
}));

const NotFound: FC = () => {
  const { styles } = useStyles();
  return (
    <div className={styles.container}>
      <h1 className={styles.heading404}>404</h1>
      <h2 className={styles.subHeading}>哎呀，页面走丢了</h2>
      <p className={styles.descText}>
        你访问的页面不存在、已被删除或网址输入错误，请返回首页重新探索。
      </p>
    </div>
  );
};

export default NotFound;
