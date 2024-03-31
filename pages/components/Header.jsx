import Link from 'next/link';
import { useRouter } from 'next/router';

const Header = () => {
  const router = useRouter();

  // リンクのスタイルを更新: テキストの色を黒に設定
  const linkStyle = {
    marginRight: 100,
    textDecoration: "none",
    color: 'black', // 色を黒に変更
  };

  // ヘッダーのスタイルを更新: コンテンツを中央に配置
  const headerStyle = {
    backgroundColor: '#49CDBD',
    padding: '40px',
    display: 'flex', // フレックスボックスを使用
    justifyContent: 'center', // 水平方向の中央に配置
    alignItems: 'center', // 垂直方向の中央に配置
  };

  return (
    <div style={headerStyle}>
      <Link href="/" legacyBehavior>
        <a style={{ ...linkStyle, textDecoration: router.pathname === "/" ? "underline" : "none" }}>HOME</a>
      </Link>
      <Link href="/ranking-page" legacyBehavior>
        <a style={{ ...linkStyle, textDecoration: router.pathname === "/ranking-page" ? "underline" : "none" }}>Ranking</a>
      </Link>
      <Link href="/simulation" legacyBehavior>
        <a style={{ ...linkStyle, textDecoration: router.pathname === "/simulation" ? "underline" : "none" }}>Simulation</a>
      </Link>
      <Link href="/trend" legacyBehavior>
        <a style={{ ...linkStyle, textDecoration: router.pathname === "/trend" ? "underline" : "none" }}>Trend</a>
      </Link>
    </div>
  );
};

export default Header;