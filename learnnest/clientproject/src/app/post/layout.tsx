export default function PostLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      post 文件夹下的 Layout
      {children}
    </div>
  );
}
