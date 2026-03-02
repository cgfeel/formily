import { FC, useEffect } from "react";
import { useNavigate } from "react-router";

const RedirectHandler: FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 解析URL中的redirect参数
    const urlParams = new URLSearchParams(window.location.search);
    const redirectPath = urlParams.get("redirect");

    if (redirectPath) {
      // 移除redirect参数，跳转到原路由（保留其他查询参数）
      urlParams.delete("redirect");
      const params = urlParams.toString();
      const newSearch = params ? `?${params}` : "";
      navigate(`${redirectPath}${newSearch}`, { replace: true });
    }
  }, [navigate]);

  return null; // 无UI渲染，仅处理逻辑
};

export default RedirectHandler;
